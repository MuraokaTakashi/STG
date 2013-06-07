/**
 * SceneManager.js
 */

var SceneManager = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		// 現在シーン
		this.currentScene = scene;
		// 次のシーン
		this.nextScene = null;
		// 初期化フラグ
		this.initFlag = true;

	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.currentScene.destroy();
		this.currentScene = null;
	},

	/**
	 * 更新
	 */
	update : function() {

		if(!this.initFlag) {
			this.currentScene.destroy();
			this.currentScene = this.nextScene;
			this.nextScene = null;
			this.initFlag = true;

		}

		// 更新
		this.currentScene.update();

	},

	/**
	 * 変更
	 *
	 * @param nextScene : 次のシーン
	 */
	change : function(nextScene) {
		this.nextScene = nextScene;
		this.initFlag = false;
	},

});
