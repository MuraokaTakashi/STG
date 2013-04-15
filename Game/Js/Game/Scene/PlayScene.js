/*
PlayScene.js
*/

// プレイシーン
var PlayScene = enchant.Class.create(BaseScene, {
	// コンストラクタ
	initialize : function() {

		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("プレイシーンコンストラクタ");

		// シーン取得
		this.scene = this.game.rootScene;



		// プレイヤ
		this.player = new Sprite(32, 32);
		this.player.x = 100;
		this.player.y = 350;
		this.player.speed = 5;
		this.player.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
		this.player.frame = 0;
		this.player.enable = true;
		this.scene.addChild(this.player);

		// エネミ
		this.enemy = new Sprite(32, 32);
		this.enemy.speed = 5;
		this.enemy.image = this.game.assets[DIR_IMAGES + 'chara6.png'];
		this.enemy.frame = 0;
		this.enemy.enable = true;
		this.scene.addChild(this.enemy);

		// ブロック
		this.block = new Sprite(16, 16);
		this.block.x = 100;
		this.block.y = 100;
		this.block.speed = 5;
		this.block.dir = { x : 0, y : 0 };
		this.block.image = this.game.assets[DIR_IMAGES + 'map0.png'];
		this.block.frame = 3;
		this.block.enable = true;
		this.scene.addChild(this.block);
		this.block.update = function() {

			// 移動
			this.x += this.dir.x * this.speed;
			this.y += this.dir.y * this.speed;
		};

		// スプライトから座標を取得
		this.getSpritePos = function(sprite, w, h) {
			var p = { x : 0, y : 0 };
			p.x = sprite.x + w / 2;
			p.y = sprite.y + h / 2;
			return p;
		};

		// 当たり判定
		this.collision = function(p1, w1, h1, p2, w2, h2) {

			if(p1.x - w1 / 2 > p2.x + w2 / 2) { return false; }
			if(p1.x + w1 / 2 < p2.x - w2 / 2) { return false; }
			if(p1.y - h1 / 2 > p2.y + h2 / 2) { return false; }
			if(p1.y + h1 / 2 < p2.y - h2 / 2) { return false; }

			return true;
		};
	},

	// 開放
	destroy : function() {

	},

	// 更新
	update : function() {

		// 仮想コントローラの更新
		virtualController.update();

		var isTouch = virtualController.isTouch();// タッチされているか
		var isFlick = virtualController.isFlick();// フリックされたか
		var collisionFlag = false;

		var touchPos = virtualController.getTouch();
		var flickDir;
		var playerPos = this.getSpritePos(this.player, 32, 32);
		var enemyPos = this.getSpritePos(this.enemy, 32, 32);
		var blockPos = this.getSpritePos(this.block, 16, 16);


		// タッチされているとき
		if(isTouch) {
			//this.block.x = touchPos.x;
			//this.block.y = touchPos.y;

			console.log('タッチ');

			// ブロックにタッチされているか
			collisionFlag = this.collision(touchPos, 0, 0, blockPos, 16, 16);

			// タッチされていた場合
			if(collisionFlag) {

				// タッチ方向を取得
				var vec = virtualController.getVector(touchPos, playerPos);
				var length = virtualController.getLenght(vec);
				vec.x /= length;
				vec.y /= length;

				this.player.x += vec.x * this.player.speed;
				this.player.y += vec.y * this.player.speed;

				console.log('接触');
				console.log('タッチ座標 = ' + '(' + touchPos.x + ', ' + touchPos.y + ')');
				console.log('ブロック座標 = ' + '(' + blockPos.x + ', ' + blockPos.y + ')');
				//console.log('ブロック座標 = ' + '(' + this.block.x + ', ' + this.block.y + ')');

			}
		}

		// フリックされたとき
		if(isFlick) {

			console.log('フリック = ' + (isFlick ? '有効' : '無効'));

			// フリック方向
			var flickDir = virtualController.getFlickDir();

			console.log('フリック方向 :' + '(' + flickDir.x + ', ' + flickDir.y + ')');

			// 当たり判定
			collisionFlag = this.collision(playerPos, 32, 32, blockPos, 16, 16);

			if(collisionFlag) {

				// ブロックをフリック方向に移動する
				flickDir = virtualController.getFlickDir();
				this.block.dir.x = flickDir.x;
				this.block.dir.y = flickDir.y;

			}
		}

		this.block.update();

		// 当たり判定
		collisionFlag = this.collision(enemyPos, 32, 32, blockPos, 16, 16);

		if(collisionFlag) {
			console.log('衝突');
			if(this.enemy.enable) {
				this.scene.removeChild(this.enemy);
				this.enemy.enable = false;
			}
		}



		return SCENE.PLAY;
	}

});

