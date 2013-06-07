/**
 * Block.js
 */

var Block = enchant.Class.create(BaseObject, {

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
						BLOCK_WIDTH, BLOCK_HEIGHT,
						x, y,
						BLOCK_IMAGE);
		// フレーム
		this.frame = BLOCK_IMAGE_FRAME;
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
	 * 更新
	 */
	update : function() {

		var d = { x : BLOCK_MOVE_SPEED * 0, y : BLOCK_MOVE_SPEED * 1 };
		this.move(d);

	},

	/**
	 * リセット
	 */
	reset : function() {
		this.x = 0;
		this.y = 0;
		this.enable = true;
		this.drawEnable();
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = 'ブロック :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
