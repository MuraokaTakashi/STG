/**
* Main.js
*/

// グローバル
global = null;

// gameUtillty
var gameScreen = { w : 400, h : 400, x : 0, y : 0 };// ゲーム画面のサイズ
//var virtualController = null;//仮想コントローラ
var vector2 = null;// ベクター２
var collision = null;// 当たり判定

console.log('サイズ' + '(' + gameScreen.w + ', ' + gameScreen.h + ')');



// エントリーポイント
function main() {

	console.log("エントリーポイント");

	// エンチャントを開始
	enchant();

	global = new Global();

	// ゲーム設定
	var game;
	if(GAME_DEBUG_MODE) {
		game = new Game(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
	}
	else {
		game = new Game(global.gameScreen.w, global.gameScreen.h);
	}
	game.fps = GAME_FPS;

	// 画像の読み込み
	for(var i = 0, len = global.imageList.length; i < len; i++) {
		var imgFileName = global.imageList[i];
		game.preload(DIR_IMAGES + imgFileName);
	}
	
	//音声の読み込み
	for(var i = 0, len = global.soundList.length; i < len; i++) {
		var soundFileName = global.soundList[i];
		game.preload(DIR_SOUND + soundFileName);
	}


	game.onload = function() {

		// 初期化
		//virtualController = new VirtualController();// 仮想コントローラ
		vector2 = new Vector2();
		collision = new Collision();


		var scene = new TitleScene();
//		var scene = new PlayScene();
//		var scene = new TestScene();
		game.pushScene(scene);


/*
		//独自のロード画面作成
		game.loadingScene = new enchant.Scene();
		game.loadingScene.backgroundColor = '#FFF'; //白背景
		var label = new enchant.Label(); //読み込み量表示ラベル
		label.moveTo(120, 220);
		label.color = "black";

		game.addEventListener('progress', function(e) {
		  label.text = '読込中：' +  e.loaded + '/' + e.total;
		  console.log(label.text)
		});
		game.loadingScene.addChild(label);
*/


	};

	// ゲーム開始
	if(GAME_DEBUG_MODE) {
		game.debug();
	}
	else {
		game.start();
	}

}

