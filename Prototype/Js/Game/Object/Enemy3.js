//敵4
var Enemy3 = enchant.Class.create(BaseObject, {

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
						ENEMY3_WIDTH, ENEMY3_HEIGHT,
						x, y,
						ENEMY3_IMAGE);
		// フレーム
		this.frame = ENEMY3_IMAGE_FRAME;

		// ライフ
		this.setLife(ENEMY3_LIFE_MAX);

		this.collision = global.collision;

		// 描画する
		this.drawEnable();
	//	this.opacity = 0;

	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.baseDestroy();
	},

	/**
	 * 更新
	 */
	update : function() {
		var d = { x : 0, y : ENEMY3_MOVE_SPEED};

		this.move(d);
	},

	/**
	 * ヒット
	 */
	hit : function() {

		return this.baseHit();
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = '敵４ :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
