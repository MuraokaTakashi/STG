
var EnemyManager = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		// エネミーの最大数
		this.ENEMY_NUM_MAX = 1000;

		this.scene = scene;

		// エネミー
		this.enemyArray = new Array();

	},

	/**
	 * 解放
	 */
	destroy : function() {
		var enemy = null;
		for(var i = 0, len = this.enemyArray.length; i < len; i++) {
			enemy = this.enemyArray[i];
			if(enemy) {
				enemy.destroy();
				enemy = null;
			}
		}
	},

	/**
	 * 更新
	 */
	update : function() {

		var enemy = null;
		var moveDir = { x : 0, y : 2 };
		for(var i = 0, len = this.enemyArray.length; i < len; i++) {

			// エネミーを取得
			enemy = this.enemyArray[i];

			if(!enemy) {
				continue;
			}

			// 移動
			enemy.move(moveDir);

		}
	},

	/**
	 * 読み込み
	 */
	load : function(data, iMax, jMax) {

		var w = 32;
		var h = 32;
		var type;
		for(var i = 0; i < iMax; i++) {
			for(var j = 0; j < jMax; j++) {

				type = data[i][j];

				if(!type) {
					continue;
				}

				var x = (j * w) + (w / 2);
				var y = (i * h) + (h / 2);
				var enemy = new Enemy(this.scene, x, y);

				this.enemyAdd(enemy);
			}
		}
	},

	/**
	 * 追加
	 *
	 * @param block : 追加するブロック
	 */
	enemyAdd : function(enemy) {
		if( (!enemy) || (this.enemyArray.length >= this.ENEMY_NUM_MAX) ) {
			return;
		}

		var i = this.enemyArray.length;
		this.enemyArray[i] = enemy;

	},

	/**
	 * 削除
	 *
	 * @param i : 削除する要素番目
	 */
	enemyDelete : function(i) {
		if( (i < 0) || (this.enemyArray.length <= i) ) {
			return;
		}

		this.enemyArray[i].destroy();

		// 削除する
		// 要素番目から
		// 何個まで
		// 削除された以降は、要素が削除された個数分ズレる
		this.enemyArray.splice(i, 1);
	},

	/**
	 * 全部ブロックを渡す
	 */
	getEnemys : function() {
		return this.enemyArray;
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {
		console.log('エネミーマネージャ：' +
					' エネミー数 = ' + this.enemyArray.length
				);
	},

});
