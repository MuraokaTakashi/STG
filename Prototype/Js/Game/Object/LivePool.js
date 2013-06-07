/**
 * LivePool.js
 */
var LivePool = enchant.Class.create({

	/**
	 * コンストラクタ
	 *
	 * @param scene : 描画するシーン
	 * @param x	: X座標
	 * @param y : Y座標
	 */
	initialize : function(scene, createNum, Obj) {

		// オブジェクト最大数
		this.DEFINE_OBJ_NUM_MAX = createNum;

		this.objectArray = new ArrayList();

		for(var i = 0; i < this.DEFINE_OBJ_NUM_MAX; i++) {
			var obj = new Obj(scene, 0, 0);
			obj.x -= obj.width;
			obj.y -= obj.height;
			this.objectArray.add(obj);
		}

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
	update : function() {

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
		var len = this.objectArray.getLength();
		if(len > this.DEFINE_OBJ_NUM_MAX) {
			return false;
		}

		object.x -= object.width;
		object.y -= object.height;

		this.objectArray.add(object);
	},

	/**
	 * 渡す
	 */
	getList : function() {
		return this.objectArray;
	},

});
