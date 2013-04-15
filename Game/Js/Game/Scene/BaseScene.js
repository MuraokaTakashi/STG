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
	},

	// 開放
	destroy : function() {
	},

	// 更新
	update : function() {
		return -1;
	}
});

