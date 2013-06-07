/**
 * エネミー２（メタルスライム）
 */
var Enemy2 = enchant.Class.create(BaseObject, {

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
						ENEMY2_WIDTH, ENEMY2_HEIGHT,
						x, y,
						ENEMY2_IMAGE);
		// フレーム
		this.frame = ENEMY2_IMAGE_FRAME;

		// ライフ
		this.setLife(ENEMY2_LIFE_MAX);

		this.targetObject = null;

		this.collision = global.collision;

		// 描画する
		this.drawEnable();

	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.targetObject = null;
		this.baseDestroy();
	},

	/**
	 * 更新
	 */
	update : function() {

		var targetPos = this.targetObject.getPos();

		if(targetPos) {

			this.move3(targetPos.x, targetPos.y, ENEMY2_MOVE_SPEED);
		}
	},

	/**
	 * ヒット
	 */
	hit : function() {

		return this.baseHit();
	},

	/**
	 * ターゲットをセット
	 */
	setTargetObject : function(targetObject) {
		this.targetObject = targetObject;
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = '敵３ :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
