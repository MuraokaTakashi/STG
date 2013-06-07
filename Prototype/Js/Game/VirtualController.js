/**
 * VirtualContoller.js
 */

var VirtualController = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize: function() {

		// ゲームを取得
		this.game = Game.instance;
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
		// タッチ座標保存
		this.touchSave = new Array(VC_TOUCH_SAVE_NUM_MAX);

		for(var i = 0, len = this.touchSave.length; i < len; i++) {
			this.touchSave[i] = { x : 0, y : 0 };
		}

		// タッチイベント用
		this.touchEvent = { x : 0, y : 0, startX : 0, startY : 0, touchFlag : false, touchMoveFlag : false };

		// デバッグ
		this.debug = { text : '仮想コントローラ', flag : true };


		if(this.debug.flag) {
			console.log("仮想コントローラコンストラクタ");
		}

	},

	/**
	 * タッチしたとき
	 *
	 * @param event : イベント
	 */
	touchStart : function(event) {
		this.touchEvent.touchFlag = true;
		this.touchEvent.x = Math.floor(event.localX);
		this.touchEvent.y = Math.floor(event.localY);
		this.touchEvent.startX = Math.floor(event.localX);
		this.touchEvent.startY = Math.floor(event.localY);
	},

	/**
	 * 離したとき
	 *
	 * @param event : イベント
	 */
	touchEnd : function(event) {
		this.touchEvent.touchFlag = false;
		this.touchEvent.touchMoveFlag = false;
	},

	/**
	 * 動かしたとき
	 *
	 * @param event : イベント
	 */
	touchMove : function(event) {
		this.touchEvent.touchMoveFlag = true;
		this.touchEvent.x = Math.floor(event.localX);
		this.touchEvent.y = Math.floor(event.localY);
	},

	/**
	 * 更新
	 */
	update : function() {

		this.preTouch.x = this.touch.x;
		this.preTouch.y = this.touch.y;

		this.touch.x = this.touchEvent.x;
		this.touch.y = this.touchEvent.y;

		// 0:現在 ～ TOUCH_SAVE_NUM_MAX:　フレーム前の
		var i;
		for(i = this.touchSave.length - 1; i > -1; i--) {
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

	/**
	 * タッチされているか
	 *
	 * @returns タッチフラグ
	 */
	isTouch : function() {
		return this.touchFlag;
	},

	/**
	 * 離された瞬間か
	 *
	 * @returns 離されたフラグ
	 */
	isTouched : function() {
		return ( (!this.touchFlag) & this.preTouchFlag );
	},

	/**
	 * タッチトリガー
	 *
	 * @returns {Boolean}
	 */
	isTouchTrriger : function() {
		return ( this.isTouched() &&
				(this.touchEvent.startX - 10 < this.preTouch.x && this.touchEvent.startX + 10 > this.preTouch.x) &&
				(this.touchEvent.startY - 10 < this.preTouch.y && this.touchEvent.startY + 10 > this.preTouch.y) );
	},

	/**
	 * フリックされたか
	 *
	 * @returns {Boolean}
	 */
	isFlick : function() {
		var tslen = this.touchSave.length;
		var touchEnd = vector2.arrayConvert(this.touchSave[0]);
		var touchStart = vector2.arrayConvert(this.touchSave[tslen - 1]);
		var touchVec = new Vector2();
		vector2.Vector2Sub(touchVec, touchEnd, touchStart);
		var length = touchVec.getLength();
		var isTouched = this.isTouched();

		if((isTouched) && (length > VC_FLICK_DIR)) {
			return true;
		}

		return false;
	},

	/**
	 * フリック方向を渡す
	 *
	 * @returns 方向ベクトル
	 */
	getFlickDir : function() {
		var dir;
		var tslen = this.touchSave.length;
		var touchEnd = vector2.arrayConvert(this.touchSave[0]);
		var touchStart = vector2.arrayConvert(this.touchSave[tslen - 1]);
		var touchVec = new Vector2();
		vector2.Vector2Sub(touchVec, touchEnd, touchStart);
		touchVec.normalize();

		dir = vector2.vector2Convert(touchVec);

		return dir;
	},

	/**
	 * フリック速度を求める
	 *
	 * @returns 方向ベクトル
	 */
	getFlickSpeed : function() {
		var speed;// 大きさ
		var vec = new Vector2();
		/*
		var endVec = vector2.arrayConvert(this.touchSave[this.TOUCH_SAVE_NUM_MAX - 1]);
		var startVec = vector2.arrayConvert(this.touchSave[this.TOUCH_SAVE_NUM_MAX - 2]);
		*/
		var endVec = vector2.arrayConvert(this.touchSave[0]);
		var startVec = vector2.arrayConvert(this.touchSave[1]);
		var length;

		vector2.Vector2Sub(vec, endVec, startVec);
		length = vec.getLength();
		vec.normalize();
		vec.mul(length);

		speed = vector2.vector2Convert(vec);

		return speed;
	},

	/**
	 * タッチ方向を決める
	 *
	 * @returns 方向ベクトル
	 */
	getTouchDir : function() {
		var dir;
		var dirVec = new Vector2();
		var touchVec = vector2.arrayConvert(this.touch);
		var preTouchVec = vector2.arrayConvert(this.preTouch);

		vector2.Vector2Sub(dirVec, touchVec, preTouchVec);

		dir = vector2.vector2Convert(dirVec);

		return dir;
	},

	/**
	 * タッチ座標取得
	 *
	 * @returns 座標
	 */
	getTouch : function() {
		var touch = { x : this.touch.x, y : this.touch.y };
		return touch;
	},

	/**
	 * 前タッチ座標
	 *
	 * @returns 座標
	 */
	getPreTouch : function() {
		var preTouch = { x : this.preTouch.x, y : this.preTouch.y };
		return preTouch;
	},

	/**
	 * ログ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = '仮想コントローラ :' +
						 	' タッチ座標 = ' + '(' + this.touch.x + ', ' + this.touch.y + ')' +
							' 前タッチ座標 = ' + '(' + this.preTouch.x + ', ' + this.preTouch.y + ')' +
							' 押した座標 = ' + '(' +  this.touchEvent.startX + ', ' +  this.touchEvent.startY + ')' +
							' タッチフラグ = ' + ( this.touchFlag ? '有効' : '無効' ) +
							' 前タッチフラグ = ' + ( this.preTouchFlag ? '有効' : '無効' ) +
							' フリックフラグ = ' + (this.isFlick() ? '有効' : '無効');

			console.log(this.debug.text);
		}
	}

});
