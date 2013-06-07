/**
 * LoadScene.js
 */
var LoadScene = enchant.Class.create(BaseScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("ロードシーンコンストラクタ");
		// 背景色
		this.backgroundColor = 'rgb(50, 50, 50)';

		// フェード
		this.fade = new Sprite(global.gameScreen.w, global.gameScreen.h);
		this.fade.backgroundColor = "rgb(0, 0, 0)";
		this.fade.tl.hide();
		this.addChild(this.fade);

		// 画像の読み込み
		for(var i = 0, len = global.imageList.length; i < len; i++) {
			var imgFileName = global.imageList[i];
			game.preload(DIR_IMAGES + imgFileName);
		}
	},

	/**
	 * 解放
	 */
	destroy : function() {

		this.removeChild(this.fade);

	},

	/**
	 * 更新
	 */
	update : function() {

	},

});
