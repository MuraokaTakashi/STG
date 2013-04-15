/**
 * VirtualContoller.js
 */

var VirtualController = enchant.Class.create({
	// コンストラクタ
	initialize: function() {

		console.log("仮想コントローラコンストラクタ");

		// ゲームを取得
		this.game = Game.instance;
		// シーンを取得
		this.scene = this.game.rootScene;
		// タッチ
		this.touchFlag = false;
		// 前タッチ
		this.preTouchFlag = false;
		// タッチ移動
		this.touchMoveFlag = false;
		// タッチ座標
		this.touch = { x : 0, y : 0 };
		// 前タッチ座標
		this.preTouch = { x : 0, y : 0 };
		// 距離
		this.FLICK_DIR = 50;
		// タッチ保存数
		this.TOUCH_SAVE_NUM_MAX = 5;
		// タッチ座標保存
		this.touchSave = new Array(this.TOUCH_SAVE_NUM_MAX);

		for(var i = 0; i < this.TOUCH_SAVE_NUM_MAX; i++) {
			this.touchSave[i] = { x : 0, y : 0 };
		}

		// タッチイベント用
		this.touchEvent = { x : 0, y : 0, startX : 0, startY : 0, touchFlag : false, touchMoveFlag : false };

		// デバッグ
		this.debug = '仮想コントローラ';

	},

	// タッチしたとき
	touchStart : function(event) {
		this.touchEvent.touchFlag = true;
		this.touchEvent.x = Math.floor(event.localX);
		this.touchEvent.y = Math.floor(event.localY);
		this.touchEvent.startX = Math.floor(event.localX);
		this.touchEvent.startY = Math.floor(event.localY);
	},

	// 離したとき
	touchEnd : function(event) {
		this.touchEvent.touchFlag = false;
		this.touchEvent.touchMoveFlag = false;
	},

	// 動かしたとき
	touchMove : function(event) {
		this.touchEvent.touchMoveFlag = true;
		this.touchEvent.x = Math.floor(event.localX);
		this.touchEvent.y = Math.floor(event.localY);
	},

	// 更新
	update : function() {

		this.preTouch.x = this.touch.x;
		this.preTouch.y = this.touch.y;

		this.touch.x = this.touchEvent.x;
		this.touch.y = this.touchEvent.y;

		var i;
		for(i = this.TOUCH_SAVE_NUM_MAX - 1; i > -1; i--) {
			if(i != 0) {
				this.touchSave[i].x = this.touchSave[i - 1].x;
				this.touchSave[i].y = this.touchSave[i - 1].y;
			}
			else {
				this.touchSave[0].x = this.touchEvent.x;
				this.touchSave[0].y = this.touchEvent.y;
			}
		}

		this.preTouchFlag = this.touchFlag;

		this.touchFlag = this.touchEvent.touchFlag;

		this.touchMoveFlag = this.touchEvent.touchMoveFlag;
	},

	// タッチされているか
	isTouch : function() {
		return this.touchFlag;
	},

	// 離された瞬間か
	isTouched : function() {
		return ( !this.touchFlag &&  this.preTouchFlag );
	},

	// タッチトリガー
	isTouchTrriger : function() {
		return ( this.isTouched() &&
				(this.touchEvent.startX - 10 < this.preTouch.x && this.touchEvent.startX + 10 > this.preTouch.x) &&
				(this.touchEvent.startY - 10 < this.preTouch.y && this.touchEvent.startY + 10 > this.preTouch.y) );
	},

	// フリックされたか
	isFlick : function() {
		var touchEnd = this.touchSave[0];
		var touchStart = this.touchSave[this.TOUCH_SAVE_NUM_MAX - 1];
		var touchVec = this.getVector(touchEnd, touchStart);
		var length = this.getLenght(touchVec);
		var isTouched = this.isTouched();

		if((isTouched) && (length > this.FLICK_DIR)) {
			return true;
		}

		return false;
	},

	// ベクトルを求める
	getVector : function(v, v1) {
		var v2 = { x : 0, y : 0 };

		v2.x = v.x - v1.x;
		v2.y = v.y - v1.y;

		return v2;
	},

	// 距離を求める
	getLenght : function(v) {
		var length;

		length = (v.x * v.x) + (v.y * v.y);
		length = Math.sqrt(length);

		return length;
	},

	// フリック方向を渡す
	getFlickDir : function() {
		var touchEnd = this.touchSave[0];
		var touchStart = this.touchSave[this.TOUCH_SAVE_NUM_MAX - 1];
		var touchVec = this.getVector(touchEnd, touchStart);
		var length = this.getLenght(touchVec);

		touchVec.x /= length;
		touchVec.y /= length;

		return touchVec;
	},

	// タッチ方向を決める
	getTouchDir : function() {

		var dir = { up : false, down : false, left : false, right : false };
		var vec = { x : 0, y : 0 };
		var scal = { x : 0, y : 0 };

		if(!this.isTouched()) {
			return dir;
		}

		vec.x = this.preTouch.x - this.touchEvent.startX;
		vec.y = this.preTouch.y - this.touchEvent.startY;

		// 大きさ
		scal.x = Math.sqrt(vec.x * vec.x);
		scal.y = Math.sqrt(vec.y * vec.y);

		// 横移動
		if(scal.x > scal.y) {

			// 右移動
			if(vec.x > 0) {
				dir.right = true;
			}
			// 左移動
			else {
				dir.left = true;
			}
		}
		// 縦移動
		else if(scal.x < scal.y) {

			// 下移動
			if(vec.y > 0) {
				dir.down = true;
			}
			// 上移動
			else {
				dir.up = true;
			}
		}

		return dir;
	},

	// タッチ座標取得
	getTouch : function() {
		var touch = { x : this.touch.x, y : this.touch.y };
		return touch;
	},

	// 前タッチ座標
	getPreTouch : function() {
		var preTouch = { x : this.preTouch.x, y : this.preTouch.y };
		return preTouch;
	},

	// デバッグ
	toString : function() {
		this.debug = '仮想コントローラ :' +
					' タッチ座標 = ' + '(' + this.touch.x + ', ' + this.touch.y + ')' +
					' 前タッチ座標 = ' + '(' + this.preTouch.x + ', ' + this.preTouch.y + ')' +
					' 押した座標 = ' + '(' +  this.touchEvent.startX + ', ' +  this.touchEvent.startY + ')' +
					' タッチフラグ = ' + ( this.touchFlag ? '有効' : '無効' ) +
					' 前タッチフラグ = ' + ( this.preTouchFlag ? '有効' : '無効' );

		console.log(this.debug);
	},

});
