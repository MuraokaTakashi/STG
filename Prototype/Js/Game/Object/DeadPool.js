/**
 * DeadPool.js
 */
var DeadPool = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		this.objectArray = new ArrayList();
	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.objectArray.destroy();
	},

	/**
	 * 更新
	 */
	update : function(livePool) {

		var obj;
		var isUnde;
		for(var i = 0, len = this.objectArray.getLength(); i < len; i++) {
			obj = this.objectArray.getObject(i);
			isUnde = global.isUndefined(obj);

			if(isUnde) {
				continue;
			}

			obj.baseReset();
			livePool.add(obj);
			this.objectArray.deleteOne(i);
		}

	},

	/**
	 * オブジェクトを取得
	 */
	getObject : function() {
		var len = this.objectArray.getLength() - 1;
		if(len < 0) {
			return false;
		}

		var obj = this.objectArray.getObject(len);
		if(global.isUndefined(obj)) {
			return false;
		}

		this.objectArray.deleteOne(len);
		this.objectArray.sort(len);

		return obj;
	},

	/**
	 * オブジェクトをセット
	 */
	add : function(object) {
		this.objectArray.add(object);
	},

});
