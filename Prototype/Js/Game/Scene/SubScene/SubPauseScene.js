/**
 * SubPauseScene.js
 */

var SubPauseScene = enchant.Class.create(BaseSubScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		BaseSubScene.call(this, scene);

		console.log("サブポーズシーンコンストラクタ");

		// サーフェイスの画像
		const BACKGROUND_WIDTH = gameScreen.w;
		const BACKGROUND_HEIGHT = gameScreen.h;
		var src = this.game.assets[DIR_IMAGES + 'start.png'];
		var surfaceImage = new enchant.Surface(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);

		/*
		surfaceImage.draw(src,
				0, 0, 236, 48,// 画像から切り取り部分
				0, 0, 236, 48);// 画像に張り付け部分
		*/

		// 背景
		this.background = new enchant.Sprite(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
		this.background.image = surfaceImage;

		this.scene.addChild(this.background);

	},

	/**
	 * 解放
	 */
	destroy : function() {

		this.scene.removeChild(this.background);

	},

	/**
	 * 更新
	 */
	update : function() {

		var isTouched = this.virtualController.isTouched();// 離された瞬間か

		if(isTouched) {
			// プレイ中にする
			var nextScene = new SubDummyScene(this.scene);
			this.change(nextScene);
		}

	},

});
