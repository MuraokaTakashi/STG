/**
 * Boss1.js
 */
/**
 * エネミーボス1（コウモリの親玉）
 */
var Boss1 = enchant.Class.create(BaseObject, {

	/**
	 * コンストラクタ
	 *
	 * @param scene : 描画するシーン
	 * @param x	: X座標
	 * @param y : Y座標
	 */
	initialize : function(scene, x, y) {

		// 親コンストラクタ
		BaseObject.call(this,
						scene,
						BOSS1_WIDTH, BOSS1_HEIGHT,
						x, y,
						BOSS1_IMAGE);
		// フレーム
		this.frame = BOSS1_IMAGE_FRAME;
		this.scale(BOSS1_SCALE);


		// 行動 → モードが変わる

		// 行動パターン
		this.AIPatarn = [ 4, 2, 0 ];
		this.AIPatarnTimer = [ 1000, 50, 50 ];
		this.AIPatarnIndex = 0;
		this.AITime = 0;
		this.AIUpdateFlag = false;


		// 状態
		this.mode = 0;
		this.modeTimer = 0;
		this.modeInitFlag = false;

		// エネミーショット
		this.enemyShotList = new ArrayList();

		// ライフ
		this.setLife(BOSS1_LIFE_MAX);

		// 当たり判定
		this.collision = global.collision;

		// 描画する
		this.drawEnable();

	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.baseDestroy();
	},

	/**
	 * 初期化
	 */
	init : function() {

		// 行動パターン
		this.AIPatarnIndex = 0;
		this.AITime = 0;
		this.AIUpdateFlag = false;

		// 状態
		this.mode = 0;
		this.modeTimer = 0;
		this.modeInitFlag = false;

		// ライフ
		this.setLife(BOSS1_LIFE_MAX);

		// 存在
		this.enable = true;

		this.drawDisable();

		// エネミーショットを初期化
		for(var i = 0, len = this.enemyShotList.getLength(); i < len; i++) {
			var shot = this.enemyShotList.getObject(i);
			if(global.isUndefined(shot)) {
				continue;
			}
			// 削除
			shot.drawDisable();
			global.enemy1DeadPool.add(shot);
			this.enemyShotList.deleteOne(i);
		}
		this.enemyShotList.sortAll();

	},

	/**
	 * 更新
	 */
	update : function() {

		this.enemyShotListUpdate();

		this.modeTimer --;

		// モードの切り替え
		if(this.modeTimer < 0) {
			var m = this.AIPatarn[this.AIPatarnIndex];
			var mt = this.AIPatarnTimer[this.AIPatarnIndex];
			this.setMode(m, mt);
		}

		switch(this.mode) {
		case 0:
			this.wait();
			break;
		case 1:
			this.dmage();
			break;
		case 2:
			this.moveShot();
			break;
		case 3:
			this.circleMoveShot();
			break;
		case 4:
			this.shotThree();
			break;
		}
	},

	/**
	 * エネミーショットリストの更新
	 */
	enemyShotListUpdate : function() {

		for(var i = 0, len = this.enemyShotList.getLength(); i < len; i++) {
			var shot = this.enemyShotList.getObject(i);
			var isUnde = global.isUndefined(shot);

			if(isUnde) {
				continue;
			}
			else if(!shot.isDrawEnable()) {
				// 削除
				global.enemy1DeadPool.add(shot);
				this.enemyShotList.deleteOne(i);
				continue;
			}
			else {
				// 更新
				var d = shot.moveDir;
				shot.move(d);
			}
		}

		this.enemyShotList.sortAll();
	},

	/**
	 * ショット
	 */
	enemyShot : function(x, y, dirX, dirY) {
		var list = global.enemy1LivePool.getList();
		var len = list.getLength() - 1;
		var cel = this.collision.getEnemyList();

		if(len < 0) {
			console.log('エネミ1ープールがない');
		}
		else {
			var e = global.enemy1LivePool.getObject(len);
			if(!global.isUndefined(e)) {
				e.x = this.x;
				e.y = this.y;
				e.moveDir = { x : dirX, y : dirY };
				this.enemyShotList.add(e);
				// 当たり判定に追加
				cel.add(e);
				list.deleteOne(len);
			}
		}
	},

	/**
	 * 待機
	 */
	wait : function() {

		// 初期化処理
		if(!this.modeInitFlag) {

			this.modeInitFlag = true;
		}

		// 更新処理
		this.AITime ++;

		if(this.AITime > 50) {
			this.modeTimer = 0;
			this.AIPatarnIndex = 0;
		}

	},

	/**
	 * 横移動＋ショット
	 */
	moveShot : function() {

		// 初期化処理
		if(!this.modeInitFlag) {

			// 横移動
			this.tl.moveTo(global.gameScreen.w / 2, 50, 70).
					moveTo(0, 50, 70).
					moveTo(global.gameScreen.w, 50, 70).
					then(function() {

						// リセット
						this.modeTimer = 0;
						this.AIPatarnIndex ++;
						});

			this.modeInitFlag = true;
		}

		this.AITime ++;

		if(this.AITime == 70 || this.AITime == 140 || this.AITime == 210) {
			this.enemyShot(this.x, this.y, 0, 2);
		}

	},

	/**
	 * 円運動＋ショット
	 */
	circleMoveShot : function() {

		// 初期化
		if(!this.modeInitFlag) {

			const CIRCLE_SPEED = 20;
			// 円運動
			this.tl.moveTo(global.gameScreen.w / 2, 50, 20).
					moveBy(CIRCLE_SPEED * -1 / 4, CIRCLE_SPEED * -1 / 4, 20).
					moveBy(CIRCLE_SPEED * -1, CIRCLE_SPEED, 20).
					moveBy(CIRCLE_SPEED, CIRCLE_SPEED, 20).
					moveBy(CIRCLE_SPEED, 0, 20).
					moveBy(CIRCLE_SPEED, CIRCLE_SPEED * -1, 20).
					moveBy(CIRCLE_SPEED * -1, CIRCLE_SPEED * -1, 20).
					then(function() {

						this.AIUpdateFlag = true;
					});

			this.modeInitFlag = true;
		}

		if(this.AIUpdateFlag) {

			this.AITime ++;

			var frame = this.AITime % 10;

			if(!frame) {
				var deg = this.AITime;
				var rad = deg * Math.PI / 180;
				var dirX = 2 * Math.cos(rad);
				var dirY = 2 * Math.sin(rad);

				this.enemyShot(this.x, this.y, dirX, dirY);
			}

			if(this.AITime > 160) {
				this.modeTimer = 0;
				this.AIPatarnIndex ++;
			}
		}
	},

	/**
	 * ３方向の攻撃をする
	 */
	shotThree : function() {

		// 初期化処理
		if(!this.modeInitFlag) {

			// 発射モーション
			this.AIUpdateFlag = true;
		}

		// 更新処理
		if(this.AIUpdateFlag) {

			this.AITime ++;

			var frame = this.AITime % 10;

			if(!frame) {

				var dirX = 0;
				var dirY = 0;
				var degree = 0.0;

				frame = this.AITime % 40;

				if(!frame) {

					for(var j = 0; j < 3; j++) {

						degree += 45.0;
						var rad = global.degreeToRadian(degree);

						dirX = 2 * Math.cos(rad);
						dirY = 2 * Math.sin(rad);

						this.enemyShot(this.x, this.y, dirX, dirY);
					}
				}
			}

			if(this.AITime > 160) {
				this.modeTimer = 0;
				this.AIPatarnIndex = 1;
			}
		}

	},

	/**
	 * ダメージ
	 */
	dmage : function() {

		var deadFlag = false;

		// 初期化処理
		if(!this.modeInitFlag) {

			deadFlag = this.baseHit();

			this.tl.fadeIn(PLAYER_DMAGE_FADE_SPEED).
					fadeOut(PLAYER_DMAGE_FADE_SPEED).
					fadeIn(PLAYER_DMAGE_FADE_SPEED).
					fadeOut(PLAYER_DMAGE_FADE_SPEED).
					fadeIn(PLAYER_DMAGE_FADE_SPEED).
					fadeOut(PLAYER_DMAGE_FADE_SPEED).
					fadeIn(PLAYER_DMAGE_FADE_SPEED).
					then(function() {

						this.setMode(0, 100);
					});

			if(this.life < 0) {
				var cel = this.collision.getEnemyList();
				cel.deleteOne(i);
			}

			this.modeInitFlag = true;
		}

		// 更新処理

		return deadFlag;

	},

	/**
	 * ヒット
	 */
	hit : function() {

		if(this.mode == 1) {
			return;
		}

		this.setMode(1, 100);

		return this.dmage();
	},

	/**
	 * 出現
	 */
	bring : function(posX, posY) {
		this.init();
		this.drawEnable();
		this.x = posX - this.width / 2;
		this.y = posY - this.height / 2;
	},


	/**
	 * モードをセット
	 */
	setMode : function(mode, modeTimer) {
		this.mode = mode;
		this.modeTimer = modeTimer;
		this.AITime = 0;
		this.AIUpdate = false;
		this.modeInitFlag = false;
	},

	/**
	 * モードを取得
	 */
	getMode : function() {
		return this.mode;
	},


	/**
	 * デバッグ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = 'ボス :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
