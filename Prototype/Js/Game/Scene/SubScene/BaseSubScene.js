/**
 * BaseSubScene.js
 */

var BaseSubScene = enchant.Class.create(BaseScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		BaseScene.call(this);

		// 現在のシーンを取得
		this.scene = scene;

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

	},

	/**
	 * 変更
	 */
	change : function(nextScene) {
		if(nextScene == null) {
			return;
		}

		var subSceneManager = this.getSubSceneManager();
		subSceneManager.change(nextScene);

	},

	/**
	 * サブシーンマネージャを取得
	 */
	getSubSceneManager : function() {
		return this.scene.subSceneManager;
	},

});
