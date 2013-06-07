/**
 * SampleScene.js
*/

var SampleScene = enchant.Class.create(BaseSubScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		// 親クラスのコンストラクタ
		BaseSubScene.call(this, scene);

		console.log("サンプルシーンコンストラクタ");


		// 物理シミュレーションサンプル

		// 世界の重力
		this.world = new PhysicsWorld(0, 9.8 / 2.0);

		// 物理演算の描画クラス

		// 半径
		// タイプ = (ダイナミック 物理を受ける) (スタティック 物理を受けない)
		// 自分の解釈 : 重力の影響を受けるか受けないか
		// スプライトの密度 = 物質の質量
		// スプライトの摩擦 = 物質の摩擦
		// スプライトの反発 = 物質の反発
	    this.bear = new PhyCircleSprite(32 / 2, enchant.box2d.DYNAMIC_SPRITE, 0, 0.5, 0, true);
	    // 位置座標
	    this.bear.position = { x : 160, y : 64 };
	    this.bear.positionPre = { x : 0, y : 0 };
	    // 画像データ
	    this.bear.image = this.game.assets['Images/chara1.png'];
	    // 画像フレーム
	    this.bear.frame = 0;
	    // デバッグ
	    this.bear.debug = true;

	    // 描画
	    scene.addChild(this.bear);

	    // 更新処理
	    this.bear.update = function() {

	    	if(this.debug) {
	    		console.log('クマ:' +
	    					' 座標 = ' + '(' + this.position.x + ', ' + this.position.y + ')' +
	    					//' 座標 = ' + '(' + this.positionPre.x + ', ' + this.positionPre.y + ')' +
	    					' 差分 = ' + '(' + (this.position.x - this.positionPre.x) + ', ' + (this.position.y - this.positionPre.y) + ')'
	    				);
	    	}
	    };

	    this.bear.positionUpdate = function() {

	    	this.positionPre.x = this.position.x;
	    	this.positionPre.y = this.position.y;

	    };


	    this.bear1 = new PhyBoxSprite(32, 32, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.5, true);
	    // 位置座標
	    this.bear1.position = { x : 140, y : 0 };
	    // 画像データ
	    this.bear1.image = this.game.assets['Images/chara1.png'];
	    // 画像フレーム
	    this.bear1.frame = 0;
	    // 描画
	    scene.addChild(this.bear1);


	    // 地面を追加
	    this.floor = new PhyBoxSprite(600, 16, enchant.box2d.STATIC_SPRITE, 1.0, 0.5, 0.1, true);
	    this.floor.image = new Surface(16, 16);
	    //this.floor.image = this.game.assets['Images/chara1.png'];
	    //this.floor.image.draw = game.assets['images/map2.png'], 0, 0, 16, 16, 0, 0, 16, 16;
	    this.floor.position = { x : 300, y : 300 };
	    scene.addChild(this.floor);

	},

	// 開放
	destroy : function() {
		this.scene.removeChild(this.bear);
		this.scene.removeChild(this.bear1);
		this.scene.removeChild(this.floor);

	},

	// 更新
	update : function() {

		var isTouch = this.virtualController.isTouch();// タッチされているか
		var isTouched = this.virtualController.isTouched();// 離された瞬間か
		var isFlick = this.virtualController.isFlick();// フリックされたか
		var collisionFlag = false;

		var touchPos = this.virtualController.getTouch();
		var touchDir = this.virtualController.getTouchDir();
		var flickDir;



		if(isTouch) {
			this.bear.positionUpdate();


			// クマ１の移動
			this.bear1.setAwake(false);
			var bear1Move = { x : 0, y : 0 };
			var touchDirVec = vector2.arrayConvert(touchDir);
			//vector2.Vector2Normalize(bear1Move, touchDirVec);
			//this.bear1.applyImpulse(bear1Move);
		}
		else {
			this.bear1.setAwake(true);
			this.bear.debug = false;
		}

		this.world.step(this.game.fps);

		this.bear.update();

	}

});


