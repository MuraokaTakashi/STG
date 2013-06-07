/**
 * TitleScene.js
 */

// タイトルシーン
var TitleScene = enchant.Class.create(BaseScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("タイトルシーンコンストラクタ");

		// 背景色
		this.backgroundColor = 'rgb(50, 50, 200)';

		// 236 48
		// サーフェイスの画像
		var src = this.game.assets[DIR_IMAGES + 'start.png'];
		this.surfaceImage = new enchant.Surface(236, 48);
		this.surfaceImage.draw(src,
				0, 0, 236, 48,// 画像から切り取り部分
				0, 0, 236, 48);// 画像に張り付け部分

		// スタートボタン
		this.startButton = new BaseObject(this, 236, 48, global.gameScreen.w / 2, global.gameScreen.h / 2 + 48 * 1, null);
		this.startButton.setImage(this.surfaceImage);
		this.startButton.drawEnable();

		// 終了ボタン
		//this.finishButton = new BaseObject(this, 236, 48, global.gameScreen.w / 2, global.gameScreen.h / 2 + 48 * 3, null);
		//this.finishButton.drawEnable();

		// 64 / 2
		//タイトル
		this.title = new Label('STG');
		this.title.font = "64px Tahoma";
		this.title.color = 'rgb(255, 0, 0)';
		this.title.x = (global.gameScreen.w / 2) - (64 * 2 / 2);	// X座標
		this.title.y = 50;	// Y座標
		this.addChild(this.title);
		this.title.tl.fadeOut(60).fadeIn(80).loop();

		// フェード
		this.fade = new Sprite(global.gameScreen.w, global.gameScreen.h);
		this.fade.backgroundColor = 'black';//"rgb(0, 0, 0)";
		this.fade.tl.hide();
		this.addChild(this.fade);

		//BGM
		this.game.assets[DIR_SOUND + 'title1.mp3'].play();
	},

	/**
	 * 解放
	 */
	destroy : function() {

		// スタートボタンの解放
		this.startButton.baseDestroy();
		//this.finishButton.baseDestroy();
		//this.fade.tl.clear();
		this.removeChild(this.title);
		this.removeChild(this.fade);

	},

	/**
	 * 更新
	 */
	update : function() {
		var isTouched = this.virtualController.isTouched();
		var touchPos = this.virtualController.getTouch();//getPreTouch
		var startbtnColl = this.startButton.collisionCheck(20, 20, touchPos.x, touchPos.y);
		//var finishbtnColl = this.finishButton.collisionCheck(20, 20, touchPos.x, touchPos.y);

		if(isTouched) {
			// フェード
			var currentScene = this;

			if(startbtnColl) {
				//BGM
				this.game.assets[DIR_SOUND + 'title1.mp3'].stop();
				//SE
				this.game.assets[DIR_SOUND + 'bullet.wav'].play();
				this.fade.tl.fadeIn(20).then(function() {
					var scene = new PlayScene();
					currentScene.change(scene);
				});
			}
			//else if(finishbtnColl) {
			//	//BGM
			//	this.game.assets[DIR_SOUND + 'title1.mp3'].stop();
			//	//SE
			//	this.game.assets[DIR_SOUND + 'bullet.wav'].play();
			//	this.fade.tl.fadeIn(20).then(function() {
			//		var scene = new EndScene();
			//		currentScene.change(scene);
			//	});
			//}
		}
		else {
			if(startbtnColl) {
				if(!this.startButton.tl.looped) {
					this.startButton.tl.fadeOut(20).fadeIn(40).loop();
				}
			}
			else if(this.startButton.tl.looped) {
				this.startButton.tl.unloop();
				this.startButton.tl.fadeIn(5);
			}

			//if(finishbtnColl) {
			//	if(!this.finishButton.tl.looped) {
			//		this.finishButton.tl.fadeOut(20).fadeIn(40).loop();
			//	}
			//}
			//else if(this.finishButton.tl.looped) {
			//	this.finishButton.tl.unloop();
			//	this.finishButton.tl.fadeIn(5);
			//}
		}
	},

});
