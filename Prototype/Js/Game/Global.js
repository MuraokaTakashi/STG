/**
 * Global.js
 */

// グローバル変数
var Global = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize: function() {

		// ゲーム画面
		this.gameScreen = {
				w : GAME_SCREEN_WIDTH_DEFAULT, h : GAME_SCREEN_HEIGHT_DEFAULT,
				x : GAME_SCREEN_POS_X, y : GAME_SCREEN_POS_Y
		};

		// 仮想コントローラ
		this.virtualController = new VirtualController();

		// 二次ベクトル
		this.vector2 = new Vector2();

		// コリジョン
		this.collision = new Collision();

		// ゲームクリア
		this.gameClearFlag = false;
		// ゲームオーバー
		this.gameOverFlag = false;

		// デバッグテキスト
		this.debugTextId = {};
		this.debugTextArray = new ArrayList();

		// 画像リスト
		this.imageList = [
			'chara1.png',
			'map0.png',
			'chara5.png',
			'chara6.png',
			'start.png',
			'clear.png',
			'gameover.png',
			'effect/effect_baria.png',
			'effect/effect_circle.png',
			'effect/effect_fire1.png',
			'effect/effect0.png',
			'effect/effect_bomb.png',
			'effect/effect_bomb1.png',
			'effect/effect_bomb2.png',
			'effect/pipo-btleffect009.png',
			'effect/pipo-btleffect022.png',
			'effect/item_get_effect.png',
			'effect/item_get_effect1.png',
			'monster/monster3.gif',
			'monster/monster4.gif',
			'a.png',
			'font2.png',
			'icon0.png'
		];
		
		//音声リスト
		this.soundList = [
			'bomb.wav',
			'boss1.mp3',
			'bullet.wav',
			'select1.mp3',
			'stage1.mp3',
			'title1.mp3',
			'warp1.mp3',
			'warp2.mp3',
			'warp3.mp3',
			'up.mp3'
		];

	},

	/**
	 * ランダムな数値を生成
	 * @param min
	 * @param max
	 * @returns
	 */
	randint : function(min,max) {
	  return window.Math.floor( Math.random()*(max-min+1))+min;
	},

	/**
	 * 乱数
	 * @param numMin 最小数
	 * @param numMax 最大数
	 */
	random : function(numMin, numMax) {
		var rnd = Math.random();
		return rnd * (numMax - numMin) + numMin;
	},

	/**
	 * 角度からラジアンに変換
	 */
	degreeToRadian : function(degree) {
		var radian = degree * Math.PI / 180.0;
		return radian;
	},

	/**
	 * ラジアンから角度に変換
	 */
	radianToDegree : function(radian) {
		var degree = rad * 180.0 / Math.PI;
		return degree;
	},

	/**
	 * isUndefined チェック
	 * @param object
	 * @returns {Boolean}
	 */
	isUndefined : function(object) {
		if(typeof object === 'undefined') {
			return true;
		}

		return false;
	},

	/**
	 * 生きているか
	 * @param object
	 * @returns {Boolean}
	 */
	isLive : function(object) {
		var isUnde = this.isUndefined(object);
		if(isUnde) {
			return false;
		}
		var isDraw = object.isDrawEnable();
		if(!isDraw) {
			return false;
		}

		return true;
	},

	/**
	 * デバッグテキストを生成
	 */
	createDebugText : function(scene, textArray, tag) {
		var len = textArray.getLength();
		var text = new Label();
		text.tag = tag;
		text.x = this.gameScreen.w + 25;
		text.y = len * 20;
		text.color = 'white';
		scene.addChild(text);
		textArray.add(text);
		return len;
	},

	/**
	 * 解放
	 */
	destroyDebugText : function(scene, textArray) {
		for(var i = 0, len = textArray.getLength(); i < len; i++) {
			var t = textArray.getObject(i);
			var isUnde = this.isUndefined(t);
			if(!isUnde) {
				scene.removeChild(t);
				textArray.deleteOne(i);
			}
		}
		textArray.sortAll();
	},

	/**
	 *
	 * @param text
	 * @param str
	 */
	setText : function(text, str) {
		text.text = text.tag + ' ' + str;
	},
});

