/**
 * SubPlayCountScene.js
 */

var SubPlayCountScene = enchant.Class.create(BaseSubScene , {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		BaseSubScene.call(this, scene);

		console.log("サブプレイカウントシーンコンストラクタ");

		var subScene = this;

		const WIDTH = 236;
		const HEIGHT = 48;

		this.start = new BaseObject(scene, WIDTH, HEIGHT, WIDTH * -1,  global.gameScreen.h / 2, 'start.png');
		this.start.drawEnable();
		this.start.tl.moveTo(global.gameScreen.w / 2 - WIDTH / 2, global.gameScreen.h / 2 - HEIGHT / 2, 80, enchant.Easing.BACK_EASEOUT).
					  delay(1).
					  moveTo(global.gameScreen.w + WIDTH / 2, global.gameScreen.h / 2 - HEIGHT / 2, 50, enchant.Easing.SWING).
					  then(function() {
						  var nextScene = new SubDummyScene(this.scene);
						  subScene.change(nextScene);
					  });

	},

	/**
	 * 解放
	 */
	destroy : function() {

		this.start.drawDisable();
		this.start.baseDestroy();
	},

	/**
	 * 更新
	 */
	update : function() {

	},

});
