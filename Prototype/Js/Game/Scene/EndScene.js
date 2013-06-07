/**
 * EndScene.js
 */

// 終了シーン
var EndScene = enchant.Class.create(BaseScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("終了シーンコンストラクタ");
		// 背景色
		this.backgroundColor = 'rgb(50, 50, 50)';

		// 64 / 2
		//タイトル
		this.titleButton = new Label('戻る');
		this.titleButton.font = "64px Tahoma";
		this.titleButton.color = 'rgb(255, 0, 0)';
		this.titleButton.x = (global.gameScreen.w / 2) - (64 * 2 / 2);	// X座標
		this.titleButton.y = 50;	// Y座標
		this.addChild(this.titleButton);
	},

	/**
	 * 解放
	 */
	destroy : function() {

		// スタートボタンの解放
		this.removeChild(this.titleButton);

	},

	/**
	 * 更新
	 */
	update : function() {

	},

});
