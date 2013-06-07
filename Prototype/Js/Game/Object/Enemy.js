/**
 * エネミー（スライム）
 */
var Enemy = enchant.Class.create(BaseObject, {

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
						ENEMY_WIDTH, ENEMY_HEIGHT,
						x, y,
						ENEMY_IMAGE);
		// フレーム
		this.frame = ENEMY_IMAGE_FRAME;

		// ライフ
		this.setLife(ENEMY_LIFE_MAX);

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
	 * 更新
	 */
	update : function() {

		var d = { x : ENEMY_MOVE_SPEED * 0, y : ENEMY_MOVE_SPEED * 1 };
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

			this.debug.text = 'エネミー :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
