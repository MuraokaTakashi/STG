/**
 * Player.js
*/

var Player = enchant.Class.create(BaseObject, {

	/**
	 * コンストラクタ
	 *
	 * @param scene : 描画シーン
	 */
	initialize : function(scene) {

		// 親コンストラクタ
		BaseObject.call(this,
						scene,
						PLAYER_WIDTH, PLAYER_HEIGHT,
						PLAYER_FIRST_POS_X, PLAYER_FIRST_POS_Y,
						PLAYER_IMAGE);
		// 画像フレーム
		this.frame = PLAYER_IMAGE_FRAME;
		// 速度
		this.vel = { x : PLAYER_MOVE_SPEED, y : PLAYER_MOVE_SPEED };

		// 状態なし
		this.mode = PLAYER_MODE_NOT;

		// 追加状態
		this.modeAttach = PLAYER_MODE_ATTACH_NOT;

		// 移動ターゲットオブジェクト
		this.moveTargetObject = new BaseObject(scene, PLAYER_MOVE_TARGET_OBJECT_WIDTH, PLAYER_MOVE_TARGET_OBJECT_HEIGHT, 0, 0, '');
		// タッチ座標
		this.moveTargetPos = { x : 0, y : 0 };

		// ワープ座標
		this.warpPos = { x : 0, y : 0 };

		// ワープエフェクト
		this.warpEffect = new BaseObject(scene, PLAYER_WARP_EFFECT_WIDTH, PLAYER_WARP_EFFECT_HEIGHT, 0, 0, PLAYER_WARP_EFFECT_IMAGE);
		this.warpEffect.animationTime = 0;
		this.warpEffect.animationEnd = true;
		this.warpEffect.scale(PLAYER_WARP_EFFECT_SCALE);

		// プレイヤーの弾数表示
		this.shotNumArray = new ArrayList();

		// プレイヤーの弾
		this.shotArray = new ArrayList();

		// レベルに合わせたショットの形
		this.shotLevel = new Array();

		// レベル１
		var shotLevel1 = new Array();
		shotLevel1[0] = { x : 0, y : 0, dirX : 0, dirY : 0 };

		// レベル２
		var shotLevel2 = new Array();
		shotLevel2[0] = { x : 0, y : 0, dirX : 0, dirY : 0 };// 左
		shotLevel2[1] = { x : 0, y : 0, dirX : 0, dirY : 0 };// 右

		this.shotLevel[0] = shotLevel1;
		this.shotLevel[1] = shotLevel2;


		// ダメージ状態
		this.dmageFlag = false;
		this.dmageTimer = 0;

		// プレイヤーレベル
		this.level = 0;

		// 経験値
		this.ex = 0;

		this.life = PLAYER_LIFE_MAX;

		// ライフ
		this.lifeArray = new ArrayList();
		for(var i = 0, len = this.life; i < len; i++) {
			var posX = PLAYER_LIFE_WIDTH * i + (PLAYER_LIFE_WIDTH / 2);
			var posY = PLAYER_LIFE_HEIGHT;
			var life = new BaseObject(scene, PLAYER_LIFE_WIDTH, PLAYER_LIFE_HEIGHT, posX, posY, PLAYER_LIFE_IMAGE);
			life.frame = PLAYER_LIFE_IMAGE_FRAME;
			life.drawEnable();

			this.lifeArray.add(life);
		}

		// あたり判定
		this.collision = global.collision;

		// 描画する
		this.drawEnable();
	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.moveTargetObject.baseDestroy();
		this.moveTargetObject = null;
		this.warpObject = null;

		this.shotNumArray.destroy();

		this.shotArray.destroy();

		this.baseDestroy();
	},

	/**
	 * 初期化
	 */
	init : function(scene) {

		this.x = PLAYER_FIRST_POS_X;
		this.y = PLAYER_FIRST_POS_Y;

		// 状態なし
		this.mode = PLAYER_MODE_NOT;

		// 追加状態
		this.modeAttach = PLAYER_MODE_ATTACH_NOT;

		// ダメージ状態
		this.dmageFlag = false;
		this.dmageTimer = 0;

		// プレイヤーレベル
		this.level = 0;

		// 経験値
		this.ex = 0;

		this.drawEnable();

		// ライフ
		this.life = PLAYER_LIFE_MAX;

		// ライフの表示を生成
		for(var i = 0, len = this.life; i < len; i++) {
			var posX = PLAYER_LIFE_WIDTH * i + (PLAYER_LIFE_WIDTH / 2);
			var posY = PLAYER_LIFE_HEIGHT;
			var life = new BaseObject(scene, PLAYER_LIFE_WIDTH, PLAYER_LIFE_HEIGHT, posX, posY, PLAYER_LIFE_IMAGE);
			life.frame = PLAYER_LIFE_IMAGE_FRAME;
			life.drawEnable();

			this.lifeArray.add(life);
		}

		// ワープエフェクト
		this.warpEffect.drawDisable();
		this.warpEffect.animationTime = 0;
		this.warpEffect.animationEnd = true;

		// アクション
		this.tl.clear();
		this.tl.show();

		// ショットの初期化
		this.initShots();

	},

	/**
	 * 更新
	 */
	update : function() {

		// 弾の移動更新
		this.updateShots();

		// 存在していない場合
		if(!this.enable) {
			return;
		}

		if(this.dmageFlag) {
			this.dmage();
		}


		switch(this.mode) {
		case PLAYER_MODE_NOT: // なし
			break;
		case PLAYER_MODE_TARGET_MOVE:// ターゲット移動
			this.targetMove();
			this.mode = PLAYER_MODE_NOT;
			break;
		case PLAYER_MODE_WARP:// ワープ
			this.warpMove();
			break;
		}
	},


	/**
	 * 移動
	 */
	targetMove : function() {
		var dir = new Vector2();
		var playerPos = { x : this.x, y : this.y };
		var collisionFlag = false;

		// 当たり判定
		//collisionFlag = this.collisionCheck(50, 50, this.touchPos.x, this.touchPos.y);
		collisionFlag = this.collisionCheckObject(this.moveTargetObject);

		if(!collisionFlag) {

			vector2.Vector2Sub(dir, this.moveTargetPos, playerPos);
			dir.normalize();

			this.x += (dir.x * this.vel.x);
			this.y += (dir.y * this.vel.y);
		}
		else {
			this.moveTargetObject.drawDisable();
		}
	},

	/**
	 * 移動目標をセット
	 *
	 * @param touchPos : タッチ座標
	 */
	setMoveTarget : function(touchPos) {
		this.moveTargetPos.x = touchPos.x;
		this.moveTargetPos.y = touchPos.y;
		this.mode = PLAYER_MODE_TARGET_MOVE;

		this.moveTargetObject.setPos(touchPos);
		this.moveTargetObject.x -= (PLAYER_MOVE_TARGET_OBJECT_WIDTH / 2);
		this.moveTargetObject.y -= (PLAYER_MOVE_TARGET_OBJECT_HEIGHT / 2);
		this.moveTargetObject.drawEnable();
	},

	/**
	 * ワープ移動
	 */
	warpMove : function() {
		var cp = this.getDrawCenterPoint(this.warpPos);

		this.setPos(cp);

		this.warpEffect.animationTime ++;

		var animetionFrame = this.warpEffect.animationTime % PLAYER_WARP_EFFECT_ANIMATION_TIMER;

		// TODO ワープのアニメーションを更新
		if(!this.warpEffect.animationEnd) {

			if(this.warpEffect.animationTime && animetionFrame == 0) {
				this.warpEffect.frame ++;

				var animationFrameEnd = this.warpEffect.frame % PLAYER_WARP_EFFECT_FRAME_NUM_MAX;
				if(!animationFrameEnd) {
					this.warpEffect.animationEnd = true;
					this.warpEffect.drawDisable();
				}
				else if(animationFrameEnd == PLAYER_WARP_EFFECT_FRAME_NUM_MAX - 2) {
					this.drawEnable();
				}
			}
		}
		else {
			this.drawEnable();
			this.warpEffect.animationEnd = false;
			this.mode = this.PLAYER_MODE_NOT;
		}
	},

	/**
	 * ワープをセット
	 *
	 * @param warpObject : ワープする目標のオブジェクト
	 */
	setWarpMove : function(warpObject) {
		this.drawDisable();
		this.warpPos.x = warpObject.x;
		this.warpPos.y = warpObject.y;
		var wfp = this.warpEffect.getDrawCenterPoint(warpObject);
		this.warpEffect.setPos(wfp);
		this.warpEffect.animationTime = 0;
		this.warpEffect.animationEnd = false;
		this.warpEffect.drawEnable();
		this.mode = PLAYER_MODE_WARP;
	},

	/**
	 * 無限状態
	 */
	dmage : function() {

//		console.log('無敵');

		this.dmageTimer --;

		if(this.dmageTimer < 0) {
			this.mode = PLAYER_MODE_NOT;
			this.dmageFlag = false;
			this.tl.show();
//			console.log('終わり');
		}
		else if(this.dmageTimer < PLAYER_DMAGE_FADE_SPEED) {
			this.tl.unloop();
		}
	},

	/**
	 * ヒット
	 */
	hit : function() {

		var lifeLen = this.lifeArray.getLength() - 1;

		if(lifeLen < 0) {
			// ゲームオーバー
			if(!global.gameClearFlag) {
				global.gameOverFlag = true;
			}
			return;
		}

		this.dmageFlag = true;
		this.dmageTimer = PLAYER_DMAGE_TIMER_MAX;

		var life = this.lifeArray.getObject(lifeLen);
		life.baseHit();
		this.lifeArray.deleteOne(lifeLen);
		this.lifeArray.sort(lifeLen);

		this.tl.fadeIn(PLAYER_DMAGE_FADE_SPEED).fadeOut(PLAYER_DMAGE_FADE_SPEED).fadeIn(PLAYER_DMAGE_FADE_SPEED).loop();

	},

	/**
	 * プレイヤーのモードを渡す
	 */
	getMode : function() {
		return this.mode;
	},

	/**
	 * プレイヤーのモードを渡す
	 */
	setMode : function(mode) {
		this.mode = mode;
	},

	/**
	 * プレイヤーのモード追加を渡す
	 */
	getModeAttach : function() {
		return this.modeAttach;
	},

	/**
	 * プレイヤーのモード追加を渡す
	 */
	setModeAttach : function(modeAttach) {
		this.modeAttach = modeAttach;
	},

	/**
	 * プレイイヤーショットの初期化
	 */
	initShots : function() {

		var shot;
		for(var i = 0, len = this.shotArray.getLength(); i < len; i++) {

			shot = this.shotArray.getObject(i);
			var isUnde = global.isUndefined(shot);

			if(isUnde) {
				continue;
			}

			// 削除 プール廃棄に渡す
			shot.drawDisable();
			this.shotArray.deleteOne(i);
		}
		this.shotArray.sortAll();
	},

	/**
	 * プレイヤーショットの更新
	 */
	updateShots : function() {

		var shot;
		for(var i = 0, len = this.shotArray.getLength(); i < len; i++) {

			shot = this.shotArray.getObject(i);
			var isUnde = global.isUndefined(shot);

			if(isUnde) {
				continue;
			}
			else if(!shot.isDrawEnable()) {
				// 削除 プール廃棄に渡す
				this.shotArray.deleteOne(i);
				continue;
			}
			else {
				// 更新
				var moveDir = shot.moveDir;
				shot.move(moveDir);
			}
		}
	},

	/**
	 * プレイヤーショット
	 */
	shot : function(flickDir) {

		// レベルに合わせて、ショットの形を変える
		var shots = this.shotLevel[this.level];

		for(var shot_i = 0, shot_len = shots.length; shot_i < shot_len; shot_i++) {

			var ls = shots[shot_i];

			this.localShot(ls, flickDir);
		}
	},

	/**
	 * ショットの準備
	 */
	localShot : function(shot, flickDir) {

		var playerPos = this.getPos();
		var shotNum;
//		var shotLen = this.shotArray.getLength();
		var shotObject = new BaseObject(this.scene, 5, 5, 0, 0, '');
		var isLive;
		var cpsl = global.collision.getPlayerShotList();

		var moveDir = { x : flickDir.x * PLAYER_SHOT_SPEED, y : flickDir.y * PLAYER_SHOT_SPEED };

		for(var i = 0, iLen = this.shotNumArray.getLength(); i < iLen; i++) {

			shotNum = this.shotNumArray.getObject(i);
			isLive = global.isLive(shotNum);

			if(!isLive) {
				continue;
			}

			var pos = { x : playerPos.x, y : playerPos.y };

			pos.x += shot.x;
			pos.y += shot.y;

			moveDir.x += shot.dirX;
			moveDir.y += shot.dirY;

			shotObject.copy(shotNum);
			shotObject.setPos(pos);
			shotObject.moveDir = moveDir;
			shotObject.drawEnable();

			this.shotArray.add(shotObject);

			// 当たり判定に追加
			cpsl.add(shotObject);

			// ショット表示を消す
			shotNum.baseHit();
			this.shotNumArray.deleteOne(i);
			this.shotNumArray.sort(i);
			// ショット表示をずらす
			for(var j = 0, jLen = this.shotNumArray.getLength(); j < jLen; j++) {
				shotNum = this.shotNumArray.getObject(j);
				isLive = global.isLive(shotNum);

				if(isLive) {
					shotNum.y = j * shotNum.height;
				}
			}

			break;
		}
	},

	/**
	 * ショットをセット
	 */
	setShot : function(object) {

		var shotNumObject = new BaseObject(this.scene, 5, 5, 0, 0, '');
		var len = this.shotNumArray.getLength();

		if(len > PLAYER_SHOT_NUM_MAX) {
			return;
		}

		shotNumObject.copy(object);

		// 位置座標
		shotNumObject.x = global.gameScreen.w - shotNumObject.width;
		shotNumObject.y = len * shotNumObject.height;

		shotNumObject.drawEnable();

		this.shotNumArray.add(shotNumObject);

	},

	/**
	 * プレイヤーショットを渡す
	 */
	getShots : function() {
		return this.shotArray;
	},

	/**
	 * ライフを取得
	 */
	getLife : function() {
		return this.lifeArray.getLength();
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = 'プレイヤ :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
