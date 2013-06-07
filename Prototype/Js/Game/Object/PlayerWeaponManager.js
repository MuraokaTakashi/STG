/**
 * PlayerWeaponManager.js
 */

var PlayerWeaponManager = enchant.Class.create({

	/**
	 * コンストラクタ
	 *
	 * @param scene : 描画するシーン
	 */
	initialize : function(scene) {

		// 最大数
		this.NUM_MAX = 8;
		// 半径
		this.WEAPON_HAVE_RADIUS = 32 * 1.5;
		// 回転数
		this.WEAPON_HAVE_ROTATION = 5;
		// 速度
		this.WEAPON_VEL = 5;

		// ベースの弾保持位置
		this.baseWeaponsPos = new Array(this.NUM_MAX);
		for(var i = 0, len = this.NUM_MAX; i < len; i++) {
			var deg = i * (360 / this.NUM_MAX);
			var rad = deg * Math.PI / 180;
			var x = this.WEAPON_HAVE_RADIUS * Math.cos(rad);
			var y = this.WEAPON_HAVE_RADIUS * Math.sin(rad);

			this.baseWeaponsPos[i] = { x : x, y : y };
		}

		// 弾所持
		this.weaponsHave = {
				weapons : new Array(),

				numMax : this.NUM_MAX,
		};

		// 発射
		this.weaponsShot = {
				shots : new Array(),

				numMax : this.NUM_MAX,
		};

	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.weaponsHaveAllDelete();
		this.weaponsShotAllDelete();
	},

	/**
	 * 更新
	 *
	 * @param pos : 位置座標
	 */
	update : function(pos) {

		// 弾保持リストの更新
		var have;
		for(var i = 0, len = this.weaponsHave.weapons.length; i < len; i++) {
			var hPos = this.baseWeaponsPos[i];
			have = this.weaponsHave.weapons[i];
			have.x = hPos.x + pos.x;
			have.y = hPos.y + pos.y;
			have.rotate(5);
		}


		// 弾発射リストの更新
		var shot;
		var screenCheck;
		for(var i = 0, len = this.weaponsShot.shots.length; i < len; i++) {
			shot = this.weaponsShot.shots[i];
			shot.move(shot.moveDir);
			screenCheck = shot.screenCheck(gameScreen.w, gameScreen.h, gameScreen.x, gameScreen.y);

			// 画面外
			if(screenCheck) {
				this.weaponsShotDelete(i);
				// 削除したズレを修正
				i--;
				len = this.weaponsShot.shots.length;
			}
		}
	},

	/**
	 * 弾保持をセット
	 *
	 * @param object : オブジェクト
	 */
	setWeapon : function(scene, object) {
		if( (!object) || (this.weaponsHave.weapons.length >= this.weaponsHave.numMax) ) {
			return;
		}

		var i = this.weaponsHave.weapons.length;
		var pos = this.baseWeaponsPos[i];
		var weapon = new BaseObject(32, 32, 0, 0, '');
		var origin = { x : 0, y : 0 };

		var o = new Vector2();
		var p = vector2.arrayConvert(pos);
		var t = new Vector2();

		vector2.Vector2Sub(t, p, o);
		t.mul(-1);

		origin.x = t.x + (object.width / 2);
		origin.y = t.y + (object.height / 2);

		weapon.copy(object);
		weapon.x = pos.x;
		weapon.y = pos.y;
		weapon.originX = origin.x;
		weapon.originY = origin.y;
		weapon.drawFlag = false;
		weapon.drawEnable(scene);
		weapon.setEnable(true);
		this.weaponsHave.weapons[i] = weapon;
	},


	/**
	 * 弾保持の削除
	 */
	weaponsHaveDelete : function(i) {
		if( (i < 0) || (this.weaponsHave.weapons.length <= i) ) {
			return;
		}

		this.weaponsHave.weapons[i].baseDestroy();
		//this.weaponsHave.weapons[i] = null;
		this.weaponsHave.weapons.splice(i, 1);
	},

	/**
	 * 弾保持の全削除
	 */
	weaponsHaveAllDelete : function() {
		for(var i = 0, len = this.weaponsHave.weapons.length; i < len; i++) {
			this.weaponsHave.weapons[i].baseDestroy();
			this.weaponsHave.weapons[i] = null;
		}
	},

	/**
	 * 弾保持を渡す
	 */
	getWeaponsHave : function() {
		return this.weaponsHave;
	},

	/**
	 * 弾を発射させる
	 *
	 * @param scene		: 描画するシーン
	 * @param flickDir	: フリック方向
	 */
	weaponShot : function(scene, flickDir) {
		if( (this.weaponsShot.shots.legth >= this.weaponsShot.numMax) || this.weaponsHave.weapons.length < 1) {
			return;
		}

		var shotIndex = this.weaponsShot.shots.length;
		var haveIndex = this.weaponsHave.weapons.length - 1;
		var have = this.weaponsHave.weapons[haveIndex];

		have.originX = 0;
		have.originY = 0;

		var shot = new BaseObject(32, 32, 0, 0, '');
		shot.copy(have);
		shot.drawFlag = false;
		shot.drawEnable(scene);
		shot.setEnable(true);
		shot.moveDir = { x : flickDir.x * this.WEAPON_VEL, y : flickDir.y * this.WEAPON_VEL };
		this.weaponsShot.shots[shotIndex] = shot;
		this.weaponsHaveDelete(haveIndex);
	},

	/**
	 * 弾発射オブジェクトを削除
	 */
	weaponsShotDelete : function(i) {
		if( (i < 0) || (this.weaponsShot.shots.length <= i) ) {
			return;
		}

		this.weaponsShot.shots[i].baseDestroy();
		this.weaponsShot.shots.splice(i, 1);
	},

	/**
	 * 弾発射オブジェクトを全削除
	 */
	weaponsShotAllDelete : function() {
		for(var i = 0, len = this.weaponsShot.shots.length; i < len; i++) {
			this.weaponsShot.shots[i].baseDestroy();
			this.weaponsShot.shots[i] = null;
		}
	},

	/**
	 * 弾発射を渡す
	 */
	getWeaponsShot : function() {
		return this.weaponsShot;
	},

});
