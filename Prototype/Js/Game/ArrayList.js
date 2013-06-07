/**
 * ArrayList.js
 */

var ArrayList = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		// 配列
		this.objectArray = new Array();

		// 削除した回数
		this.deleteCnt = 0;

	},

	destroy : function() {
		this.deleteAll();
		this.sortAll();
	},

	/**
	 * 追加
	 */
	add : function(object) {
		var len = this.objectArray.length;
		this.objectArray[len] = object;

		return len;
	},

	/**
	 * 削除
	 */
	deleteOne : function(i) {
		delete this.objectArray[i];
		this.deleteCnt ++;
	},

	/**
	 * 全削除
	 */
	deleteAll : function() {
		for(var i = 0, len = this.objectArray.length; i < len; i++) {
			var object = this.objectArray[i];
			var isUnde = global.isUndefined(object);
			if(!isUnde) {
				this.deleteOne(i);
			}
		}
	},

	/**
	 * 整理
	 */
	sort : function(i) {
		var object = this.objectArray[i];
		var isUndefiend = global.isUndefined(object);
		if(isUndefiend) {
			this.objectArray.splice(i, 1);
			this.deleteCnt --;
		}
	},

	/**
	 * 全部
	 */
	sortAll : function() {
		for(var i = this.objectArray.length - 1; -1 < i; i--) {
			if(!this.deleteCnt) {
				return;
			}

			this.sort(i);
		}
	},

	/**
	 * 配列を渡す
	 * @returns {Array}
	 */
	getArray : function() {
		return this.objectArray;
	},

	/**
	 * オブジェクトを渡す
	 * @param i
	 * @returns
	 */
	getObject : function(i) {
		return this.objectArray[i];
	},

	/**
	 * 配列の長さを渡す
	 * @returns
	 */
	getLength : function() {
		return this.objectArray.length;
	},

	/**
	 * デバッグログ
	 */
	debugLog : function() {
		console.log('配列の長さ : ' + this.objectArray.length
				+ '　削除した数 : ' + this.deleteCnt);
	}
});