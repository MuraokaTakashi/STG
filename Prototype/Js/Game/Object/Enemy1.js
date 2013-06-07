/**
 * エネミー１（コウモリ）
 */
var Enemy1 = enchant.Class.create(BaseObject, {

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
						ENEMY1_WIDTH, ENEMY1_HEIGHT,
						x, y,
						ENEMY1_IMAGE);
		// フレーム
		this.frame = ENEMY1_IMAGE_FRAME;

		// 角度
		this.degree = 0;

		// ライフ
		this.setLife(ENEMY1_LIFE_MAX);

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

		if(!this.enable) {
			return ;
		}

		var dir = { x : 0, y : ENEMY1_MOVE_SPEED };

		// 回転
		this.degree += ENEMY1_ANGLE_ADD;

		// ラジアン変換
		var rad = this.degree * Math.PI / 180;

		// 円運動
		this.moveCircle(rad, ENEMY1_MOVE_RADIUS);

		this.move(dir);

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

			this.debug.text = '敵２ :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
