/**
 * SubStageSelectScene.js
 */
var SubStageSelectScene = enchant.Class.create(BaseSubScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {
		BaseSubScene.call(this, scene);

		console.log("サブステージセレクトコンストラクタ");

		// 背景
		var scale = global.gameScreen.h / 16;
		var background = new BaseObject(scene, 16, 16, global.gameScreen.w / 2, global.gameScreen.h / 2, 'map0.png');
		background.frame = 3;
		background.scale(scale);
		background.drawEnable();
		this.background = background;

		// 各ステージボタンを表示
		this.stageButtonArray = new Array();// 16
		var stageImage = 'font2.png';
		var stageFrame = 17;


		var posX = 70;
		var posY = 30;

		for(var i = 0; i < 9; i++) {

			var h = i % 5;
			if(!h) {
				posX = 70;
				posY += 100;
			}

			var stage = new BaseObject(scene, 16, 15, posX, posY, stageImage);
			stage.frame = stageFrame;
			stage.scale(2);
			stage.drawEnable();
			this.stageButtonArray[i] = stage;

			posX += 70;
			stageFrame ++;
		}

		// タイトルに戻るボタン
		this.titleButton = new BaseObject(scene, 236, 48, global.gameScreen.w / 2, global.gameScreen.h / 2 + 48 * 3, null);
		this.titleButton.drawEnable();

		this.title = new Label('タイトルへ');
		this.title.font = "64px Tahoma";
		this.title.color = 'rgb(255, 0, 0)';
		this.title.x = (global.gameScreen.w / 2) - (64 * 2);	// X座標
		this.title.y = global.gameScreen.h / 2 + 48 * 2;	// Y座標
		this.scene.addChild(this.title);
		this.title.tl.fadeOut(60).fadeIn(80).loop();

		this.collision = global.collision;

	},

	/**
	 * 解放
	 */
	destroy : function() {

		this.background.drawDisable();
		this.background.baseDestroy();

		for(var i = 0, len = this.stageButtonArray.length; i < len; i++) {
			var stage = this.stageButtonArray[i];
			stage.drawDisable();
			stage.baseDestroy();
		}

		this.titleButton.drawDisable();
		this.titleButton.baseDestroy();
		this.scene.removeChild(this.title);
	},

	/**
	 * 更新
	 */
	update : function() {

		var isTouched = this.virtualController.isTouched();// 離された瞬間か
		var touchPos = this.virtualController.getTouch();
		var collCheck = false;


		// ステージ番号
		for(var i = 0, len = this.stageButtonArray.length; i < len; i++) {
			var stage = this.stageButtonArray[i];

			collCheck = stage.collisionCheck(TOUCH_WIDTH, TOUCH_HEIGHT, touchPos.x, touchPos.y);

			if(collCheck) {
				// 初期化して、次のマップをロードする
				this.scene.init();
				this.scene.mapLoad(i + 1);
				// プレイ中にする
//				var nextScene = new SubDummyScene(this.scene);
//				this.change(nextScene);
			}
		}

		collCheck = this.titleButton.collisionCheck(TOUCH_WIDTH, TOUCH_HEIGHT, touchPos.x, touchPos.y);

		if(collCheck) {
			var nextScene = new TitleScene(this.scene);
			this.scene.change(nextScene);
		}
	},

});
