/*
BaseScene.js
*/

// ベースシーン
var BaseScene = enchant.Class.create(enchant.Scene, {
	// コンストラクタ
	initialize: function() {
		// 親クラスのコンストラクタ
		enchant.Scene.call(this);
		console.log("ベースシーンコンストラクタ");

		// ゲームを取得
		this.game = Game.instance;

		// 仮想コントローラを取得
		this.virtualController = global.virtualController;

		// タッチしたとき
		this.addEventListener('touchstart', function(event) {
			this.virtualController.touchStart(event);
		});
		// 離したとき
		this.addEventListener('touchend', function(event) {
			this.virtualController.touchEnd(event);
		});
		// 動かしたとき
		this.addEventListener('touchmove', function(event) {
			this.virtualController.touchMove(event);
		});

		this.addEventListener('enterframe', function() { //イベントリスナーを追加する
			//enterframeイベントのイベントリスナー

			this.virtualController.update();

			this.update();

		});

	},

	// 開放
	destroy : function() {

	},

	// 更新
	update : function() {

	},

	// シーン移行
	change : function(nextScene) {
		var scene = this.game.currentScene;
		scene.destroy();
		this.game.replaceScene(nextScene);
	},

});

