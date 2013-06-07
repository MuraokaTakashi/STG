/**
 * BaseMap.js
 */

var BaseMap = enchant.Class.create({

	/**
	 * コンストラクタ
	 *
	 * @param x : 起点X座標
	 * @param y : 起点Y座標
	 */
	initialize : function(originX, originY) {

		// 起点
		this.originPos = { x : originX, y : originY };

		// オブジェクトリスト
		this.objList = new ArrayList();

		// 終了
		this.finishFlag = false;

	},

	/**
	 *
	 */
	init : function() {
		this.originPos.x = 0;
		this.originPos.y = 0;
		this.finishFlag = false;
		for(var i = 0, len = this.objList.getLength(); i < len; i++) {
			var list = this.objList.getObject(i);
			list.deleteAll();
			list.sortAll();
		}
		this.objList.deleteAll();
		this.objList.sortAll();
	},

	/**
	 * 読み込み
	 *
	 * @param data		: 読み込みデータ
	 * @param width		: 幅
	 * @param height	: 高さ
	 */
	load : function(data, width, height) {

		var iLen = data.length;

		this.originPos.y = this.originPos.y - (iLen * height);

		var type;
		for(var i = 0; i < iLen; i++) {

			var jArray = new ArrayList();

			if(!jArray) {
				continue;
			}

			for(var j = 0, jLen = data[0].length; j < jLen; j++) {

				type = data[i][j];

				if(!type) {
					continue;
				}

				var x = j * width + (width / 2);
				var y = i * height + (height / 2);
				var pos = { x : x, y : y };
				var object = {};
				object.pos = pos;
				object.type = type;
				jArray.add(object);
			}

			if(jArray.getLength()) {
				this.objList.add(jArray);
			}
		}
	},

	/**
	 * 出現チェック
	 *
	 * @return : false / なし
	 * 			struct / 構造体
	 */
	bringCheck : function() {
		var localPosList = [];
		var localPosLen = 0;

		var iLen = this.objList.getLength() - 1;
		var jArray = this.objList.getObject(iLen);
		if(!jArray) {
			return false;
		}

		var jLen = jArray.getLength();

		for(var j = 0; j < jLen; j++) {
			var obj = jArray.getObject(j);
			if(!obj) {
				continue;
			}

			// 画面出現ラインに来たかチェック
			var posX = obj.pos.x;
			var posY = obj.pos.y;

			// 起点からの距離
			posX += this.originPos.x;
			posY += this.originPos.y;

			var screenY = global.gameScreen.y;
			if(posY > screenY) {
				var o = {};
				o.pos = { x : posX, y : posY };
				o.type = obj.type;
				localPosList[localPosLen] = o;
				localPosLen ++;

				jArray.deleteOne(j);
			}
		}

		if(localPosLen) {
			jArray.sortAll();
			this.objList.deleteOne(iLen);
			this.objList.sort(iLen);
			return localPosList;
		}

		return false;
	},

	/**
	 * スクロール
	 *
	 * @param x : X移動
	 * @param y : Y移動
	 */
	scroll : function(x, y) {
		this.originPos.x += x;
		this.originPos.y += y;

		if(this.originPos.y > 0) {
			this.finishFlag = true;
		}
	},

	/**
	 * 終了フラグ
	 *
	 * @returns {Boolean}
	 */
	getFinishFlag : function() {
		return this.finishFlag;
	},

});
