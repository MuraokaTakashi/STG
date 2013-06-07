/**
 * Vector2.js
 */

var Vector2 = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize: function() {

		// 座標
		this.x = 0;
		this.y = 0;
		// デバッグ
		this.debug = { text : '', flag : true };

		if(this.debug.flag) {
			//console.log("ベクター２コンストラクタ");
		}

	},

	/**
	 * ベクターから、連想配列に変換
	 *
	 * @param vec : ベクトル
	 *
	 * @returns 連想配列
	 */
	vector2Convert : function(vec) {
		var array = { x : 0, y : 0 };
		array.x = vec.x;
		array.y = vec.y;

		return array;
	},

	/**
	 * 連想配列から、Vector2型に変換
	 *
	 * @param array : 連想配列
	 *
	 * @returns ベクトル
	 */
	arrayConvert : function(array) {
		var vec = new Vector2();
		vec.x = array.x;
		vec.y = array.y;

		return vec;
	},

	/**
	 * コピー
	 *
	 * @param vec	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 */
	Vector2Copy : function(vec, vec1) {
		vec.x = vec1.x;
		vec.y = vec1.y;
	},

	/**
	 * コピー
	 *
	 * @param vec : 入力用ベクトル
	 */
	copy : function(vec) {
		this.x = vec.x;
		this.y = vec.y;
	},

	/**
	 * 角度から、ベクトルを求める
	 */
	getVector2ToRadian : function(rad, length) {
		var vec = new Vector2();

		vec.x = length * Math.cos(rad);
		vec.y = length * Math.sin(rad);

		return vec;
	},

	/**
	 * ベクトルから、角度を求める
	 */
	getRadianToVector2 : function(vec) {
		var rad = 0;



		return rad;
	},

	/**
	 * 加算
	 *
	 * @param vec 	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 * @param vec2	: 入力用ベクトル
	 */
	Vector2Add : function(vec, vec1, vec2) {
		vec.x = vec1.x + vec2.x;
		vec.y = vec1.y + vec2.y;
	},

	/**
	 * 加算
	 *
	 * @param vec 	: 入力用ベクトル
	 */
	add : function(vec) {
		this.x += vec.x;
		this.y += vec.y;
	},

	/**
	 * 減算
	 *
	 * @param vec 	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 * @param vec2	: 入力用ベクトル
	 */
	Vector2Sub : function(vec, vec1, vec2) {
		vec.x = vec1.x - vec2.x;
		vec.y = vec1.y - vec2.y;
	},

	/**
	 * 減算
	 *
	 * @param vec 	: 入力用ベクトル
	 */
	sub : function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
	},

	/**
	 * 掛け算
	 *
	 * @param vec 	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 * @param vec2	: 入力用ベクトル
	 */
	Vector2Mul : function(vec, vec1, scal) {
		vec.x = vec1.x * scal;
		vec.y = vec1.y * scal;
	},

	/**
	 * 掛け算
	 *
	 * @param vec 	: 入力用ベクトル
	 */
	mul : function(scal) {
		this.x *= scal;
		this.y *= scal;
	},

	/**
	 * 割り算
	 *
	 * @param vec 	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 * @param vec2	: 入力用ベクトル
	 */
	Vector2Dev : function(vec, vec1, scal) {
		vec.x = vec1.x / scal;
		vec.y = vec1.y / scal;
	},

	/**
	 * 割り算
	 *
	 * @param vec 	: 入力用ベクトル
	 */
	dev : function(scal) {
		this.x /= scal;
		this.y /= scal;
	},


	/**
	 * 内積
	 *
	 * a * b = x1 * x2 + y1 * y2 + z1 * z2
	 * cosθ = a * b / |a||b|
	 */
	Vector2Dot : function(vec1, vec2) {
		var rad = 0.0;
		var vec1Len = vec1.getLength();
		var vec2Len = vec2.getLength();

		rad = (vec1.x * vec2.x + vec1.y * vec2.y) / (vec1Len * vec2Len);

		return rad;
	},


	// TODO 外積


	/**
	 * 正規化
	 *
	 * @param vec 	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 */
	Vector2Normalize : function(vec, vec1) {
		var lenght = vec1.getLength();

		vec.x = vec1.x / lenght;
		vec.y = vec1.y / lenght;
	},

	/**
	 * 正規化
	 */
	normalize : function() {
		var lenght = this.getLength();

		this.x /= lenght;
		this.y /= lenght;
	},

	/**
	 * ベクトルの長さを取得
	 *
	 * @returns ベクトルの長さ
	 */
	getLength : function() {
		var lenght = 0.0;

		lenght = Math.sqrt( (this.x * this.x) + (this.y * this.y) );

		return lenght;
	},

	/**
	 * 自分自身を渡す
	 *
	 * @returns 自分自身
	 */
	get : function() {
		return this;
	},

	/**
	 * ベクトルをセット
	 *
	 * @param vec	: 出力用ベクトル
	 * @param vec1	: 入力用ベクトル
	 */
	Vector2Set : function(vec, vec1) {
		vec.x = vec1.x;
		vec.y = vec1.y;
	},

	/**
	 * ベクトルをセット
	 *
	 * @param vec	: 入力用ベクトル
	 */
	set : function(vec) {
		this.x = vec.x;
		this.y = vec.y;
	},

	/**
	 * ログ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = 'ベクター２ :' +
			 ' (' + this.x + ', ' + this.y + ')';

			console.log(this.debug.text);
		}
	},

});

