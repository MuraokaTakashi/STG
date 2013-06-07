/**
 * SubGameClearScene.js
*/

var SubGameClearScene = enchant.Class.create(BaseSubScene , {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		BaseSubScene.call(this, scene);

		console.log("サブゲームクリアシーンコンストラクタ");

		this.clear = new BaseObject(scene, 267, 48, gameScreen.w / 2, 0, 'clear.png');
		this.clear.drawEnable();
		this.clear.tl.moveTo(global.gameScreen.w / 2 - this.clear.width / 2, global.gameScreen.h / 2 - this.clear.height / 2, 100, enchant.Easing.CUBIC_EASEOUT);
		this.clear.tl.fadeOut(20).fadeIn(10).loop();

		//BGM
		this.game.assets[DIR_SOUND + 'boss1.mp3'].stop();
	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.clear.drawDisable();
	},

	/**
	 * 更新
	 */
	update : function() {

		var isTouched = this.scene.virtualController.isTouched();// 離された瞬間か

		if(isTouched) {
			// プレイ中にする
//			var nextScene = new SubDummyScene(this.scene);
//			this.change(nextScene);

			this.destroy();
			//SE
			this.game.assets[DIR_SOUND + 'bullet.wav'].play();
			var nextScene = new SubStageSelectScene(this.scene);
			this.change(nextScene);
		}

	},

});
