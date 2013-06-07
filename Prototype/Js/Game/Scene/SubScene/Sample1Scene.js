/**
 * Sample1Scene.js
*/

var Sample1Scene = enchant.Class.create(BaseSubScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {
		// 親クラスのコンストラクタ
		BaseSubScene.call(this, scene);
		console.log("サンプルシーンコンストラクタ");


		/*
		// グループを生成
		this.group = new Group();
		// グループにクマスプライトを追加
		var num = 16;
		var r = 32 * 4;
		var d = 360 / num;
		for (var i=0; i < num; i++) {
			var rad = ((d * i) * Math.PI) / 180;
		    var x = Math.cos(rad) * r + r;
		    var y = Math.sin(rad) * r + r;
		    var sprite = new Sprite(32, 32);
		    sprite.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
		    sprite.x = x;
		    sprite.y = y;
		    this.group.addChild(sprite);
		}
		this.group.originX = r + 16;
		this.group.originY = r + 16;
		this.group.x = 00;
		this.group.y = 00;
		// 中央に移動
		this.addChild(this.group);

		var len = this.group.childNodes.length;

		this.group.on('enterframe', function() {
            this.rotation += 10;
            this.x += 1;
    		this.y += 1;
        });
		var bear = new Sprite(32, 32);
        bear.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
        bear.frame = 1;
        bear.x = 32;
        bear.y = 0;

        var white = new Sprite(32, 32);
        white.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
        white.x = 32*2;
        white.y = 32;
        white.frame = 5;

        var bear1 = new Sprite(32, 32);
        bear1.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
        bear1.frame = 1;
        bear1.x = 32;
        bear1.y = 32*2;

        var white1 = new Sprite(32, 32);
        white1.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
        white1.x = 0;
        white1.y = 32;
        white1.frame = 5;

        var group1 = new enchant.Group();
        // 位置座標
        group1.x = 200;
        group1.y = 200;

        group1.addChild(white);
        group1.addChild(bear1);
        group1.addChild(bear);
        group1.addChild(white1);
        // 中心座標
        group1.originX = 32 + 16;
        group1.originY = 32 + 16;

        this.addChild(group1);
        group1.on('enterframe', function() {
            this.rotation += 0;
        });
        */


		// 96 256 fire1
		// 16 16 effect0
		// 96 96 baria
		// 96 96 circle
		// 192 192 bomb1
		// 32 51.2 bomb2
		var effect = new enchant.Sprite(32, 32);
		effect.image = this.game.assets[DIR_IMAGES + 'effect/effect_bomb2.png'];
		effect.x = 100;
		effect.y = 100;
		effect.scale(3);
		effect.time = 0;
		scene.addChild(effect);
		effect.on(enchant.Event.ENTER_FRAME, function() {
			this.time++;
			if(this.time > 1) {
				this.frame += 2;
				this.frame = this.frame % (8 * 5);
				this.time = 0;
			}
		});


		var group = new enchant.Group();
		group.addChild(effect);


	},

	/**
	 * 開放
	 */
	destroy : function() {

	},

	/**
	 * 更新
	 */
	update : function() {

	},

});