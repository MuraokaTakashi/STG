/*
Main.js
*/

// エンチャントを開始
enchant();

// 定数
var SCENE = { 'NOT' : -1, 'TITLE' : 0, 'PLAY' : 1, 'END' : 2, 'NUM' : 3 };// シーン番号

// static変数
const DIR_IMAGES = 'Images/';// 画像ディレクトリ
const DIR_TXT = 'Txt/';// テキストディレクトリ
var currentScene = null;// 現在のシーン番号
var nextScene = SCENE.TITLE;// 次のシーン番号
var sceneManager = new Array();// シーン配列


// gameUtillty
//var game_screen = { 'w' : 480, 'h' : 800 };// ゲーム画面のサイズ
var game_screen = { 'w' : 480, 'h' : 400 };// ゲーム画面のサイズ
var virtualController = null;//仮想コントローラ



// エントリーポイント
function main() {

	console.log("エントリーポイント");

	// ゲーム設定
	var game = new Game(game_screen.w, game_screen.h);
	// デフォルトシーン
	var scene = game.rootScene;

	game.fps = 24;

	// 画像の読み込み
	game.preload(DIR_IMAGES + 'chara1.png');
	game.preload(DIR_IMAGES + 'map0.png');
	game.preload(DIR_IMAGES + 'chara5.png');
	game.preload(DIR_IMAGES + 'chara6.png');


	game.onload = function() {

		// 初期化
		virtualController = new VirtualController();// 仮想コントローラ


		// タッチしたとき
		scene.addEventListener('touchstart', function(event) {
			virtualController.touchStart(event);
		});
		// 離したとき
		scene.addEventListener('touchend', function(event) {
			virtualController.touchEnd(event);
		});
		// 動かしたとき
		scene.addEventListener('touchmove', function(event) {
			virtualController.touchMove(event);
		});

		scene.addEventListener('enterframe', function(){ //イベントリスナーを追加する
			//enterframeイベントのイベントリスナー

			// シーン
			if(currentScene != nextScene) {
				if(currentScene != null) {
					sceneManager[currentScene].destroy();// 開放

				}

				currentScene = nextScene;

				switch(currentScene) {
					case SCENE.TITLE: sceneManager[SCENE.TITLE] = new TitleScene(); break;
					case SCENE.PLAY: sceneManager[SCENE.PLAY] = new PlayScene(); break;
					case SCENE.END: sceneManager[SCENE.END] = new EndScene(); break;
				};
			}

			// 更新
			nextScene = sceneManager[currentScene].update();

  		});

	};

	// ゲーム開始
	game.start();

}

