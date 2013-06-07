/**
 * SubGameOverScene.js
*/

var SubGameOverScene = enchant.Class.create(BaseSubScene , {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		BaseSubScene.call(this, scene);

		console.log("サブゲームオーバーシーンコンストラクタ");

		this.gameover = new BaseObject(scene, 189, 97, gameScreen.w / 2, 0, 'gameover.png');
		this.gameover.drawEnable();
		this.gameover.tl.moveTo(global.gameScreen.w / 2 - this.gameover.width / 2, global.gameScreen.h / 2 - this.gameover.height / 2, 100, enchant.Easing.CUBIC_EASEOUT);
		this.gameover.tl.fadeOut(20).fadeIn(10).loop();

		//BGM
		this.game.assets[DIR_SOUND + 'stage1.mp3'].stop();
		this.game.assets[DIR_SOUND + 'boss1.mp3'].stop();
	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.gameover.drawDisable();
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
