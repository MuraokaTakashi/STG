/**
 * BlockManager.js
 */

var BlockManager = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		this.scene = scene;

		// ブロック
		this.blockArray = new Array();

		// 移動方向
		this.moveDir = { x : 0, y : BLOCK_MOVE_DIR_SPEED };

	},

	/**
	 * 解放
	 */
	destroy : function() {
		var block = null;
		for(var i = 0; i < this.blockArray.length; i++) {
			block = this.blockArray[i];
			if(block) {
				block.destroy();
				block = null;
			}
		}
	},

	/**
	 * 更新
	 */
	update : function() {

		var block = null;
		var isDraw;
		for(var i = 0, len = this.blockArray.length; i < len; i++) {

			// ブロックを取得
			block = this.blockArray[i];

			if(!block) {
				continue;
			}

			isDraw = block.isDrawEnable();

			if(!isDraw) {
				this.blockDelete(i);
				i--;
				len = this.blockArray.length;
			}
			else {
				// 移動
				block.move(this.moveDir);
			}
		}
	},

	/**
	 * 読み込み
	 */
	load : function(data, iMax, jMax) {

		var type;
		for(var i = 0; i < iMax; i++) {
			for(var j = 0; j < jMax; j++) {

				type = data[i][j];

				if(!type) {
					continue;
				}

				var x = j * BLOCK_WIDTH + (BLOCK_WIDTH / 2);
				var y = i * BLOCK_HEIGHT + (BLOCK_HEIGHT / 2);
				var block = new Block(this.scene, x, y);

				this.blockAdd(block);
			}
		}

	},

	/**
	 * 追加
	 *
	 * @param block : 追加するブロック
	 */
	blockAdd : function(block) {
		if( (!block) || (this.blockArray.length >= BLOCK_NUM_MAX) ) {
			return;
		}

		var i = this.blockArray.length;
		this.blockArray[i] = block;

	},

	/**
	 * 削除
	 *
	 * @param i : 削除する要素番目
	 */
	blockDelete : function(i) {
		if( (i < 0) || (this.blockArray.length <= i) ) {
			return;
		}

		this.blockArray[i].destroy();

		// 削除する
		// 要素番目から
		// 何個まで
		// 削除された以降は、要素が削除された個数分ズレる
		this.blockArray.splice(i, 1);
	},

	/**
	 * 全部ブロックを渡す
	 */
	getBlockArray : function() {
		return this.blockArray;
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {
		console.log('ブロックマネージャ：' +
					' ブロック数 = ' + this.blockArray.length
				);
	},

});
