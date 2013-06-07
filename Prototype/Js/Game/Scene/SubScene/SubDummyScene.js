/**
 * SubDummyScene.js
 */

var SubDummyScene = enchant.Class.create(BaseSubScene , {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		BaseSubScene.call(this, scene);
		console.log("サブダミーコンストラクタ");
	},

	/**
	 * 解放
	 */
	destroy : function() {

	},

	/**
	 * 更新
	 */
	update : function() {
		// プレイ中に戻す
		this.game.currentScene.playing = true;
	},

});