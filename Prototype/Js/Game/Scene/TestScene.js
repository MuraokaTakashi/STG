/**
 * テストシーン
 */
var TestScene = enchant.Class.create(BaseScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function() {


		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("テストシーンコンストラクタ");


		// 背景色
		this.backgroundColor = 'rgb(50, 50, 50)';


		/**
		 * 乱数
		 * @param numMin 最小数
		 * @param numMax 最大数
		 */
		this.random = function(numMin, numMax) {
			var rnd = Math.random();
			return rnd * (numMax - numMin) + numMin;
		};


		// visible
		var sprite = new enchant.Sprite(32, 32);
		sprite.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
	//	sprite.visible = true;
		this.addChild(sprite);

		var text = sprite.visible ? '有効' : '無効';
		console.log(text);


		// pool



		// background


		/*
		// block
		this.blockMapList = new BlockMapList();
		var bmd = this.blockMapList[0];
		this.blockManager = new BlockManager(this);
		this.blockManager.load(bmd, 19, 25);


		// enemy
		this.enemyMapList = new EnemyMapList();
		var emd = this.enemyMapList[0];
		this.enemyManager = new EnemyManager(this);
		this.enemyManager.load(emd, 10, 25);


		// player Weapon
		this.playerWeaponManager = new PlayerWeaponManager();


		// player
		this.player = new Player(this);
		*/


	},

	/**
	 * 解放
	 */
	destroy : function() {

	},

	/**
	 * 更新
	 */
	update : function() {

		// player controller
		this.playerController();

		// pool update

		// background update

		/*
		// block update
		this.blockManager.update();

		// enemy update
		this.enemyManager.update();

		// player weapon update
		this.playerWeaponManager.update();

		// player update
		this.player.update();
		*/

		// collision

	},

	/**
	 * プレイヤー操作
	 */
	playerController : function() {

		var isTouch = virtualController.isTouch();// タッチされているか
		var isFlick = virtualController.isFlick();// フリックされたか
		var touchPos = virtualController.getTouch();// タッチ座標を取得
		var flickDir = virtualController.getFlickDir();// フリック方向を取得


		// オブジェクトなら、ワープ
		// それ以外は、移動
		if(isTouch) {

		}

	},

	/**
	 * プレイヤーとエネミーの当たり判定
	 */
	playerAndEnemyCollision : function() {

	},

});


