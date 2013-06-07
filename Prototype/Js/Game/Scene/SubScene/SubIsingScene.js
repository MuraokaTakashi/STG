/**
 * SampleScene.js
*/

var SubIsingScene = enchant.Class.create(BaseSubScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function(scene) {

		// 親クラスのコンストラクタ
		BaseSubScene.call(this, scene);

		console.log("イージングシーンコンストラクタ");

		this.inputPre = [];

		// イージング
		this.easing = [
		               enchant.Easing.LINEAR,
		               enchant.Easing.SWING,
		               enchant.Easing.QUAD_EASEIN,
		               enchant.Easing.QUAD_EASEOUT,
		               enchant.Easing.QUAD_EASEINOUT,
		               enchant.Easing.CUBIC_EASEIN,
		               enchant.Easing.CUBIC_EASEOUT,
		               enchant.Easing.CUBIC_EASEINOUT,
		               enchant.Easing.QUART_EASEIN,
		               enchant.Easing.QUART_EASEOUT,
		               enchant.Easing.QUART_EASEINOUT,
		               enchant.Easing.QUINT_EASEIN,
		               enchant.Easing.QUINT_EASEOUT,
		               enchant.Easing.QUINT_EASEINOUT,
		               enchant.Easing.SIN_EASEIN,
		               enchant.Easing.SIN_EASEOUT,
		               enchant.Easing.SIN_EASEINOUT,
		               enchant.Easing.CIRC_EASEIN,
		               enchant.Easing.CIRC_EASEOUT,
		               enchant.Easing.CIRC_EASEINOUT,
		               enchant.Easing.ELASTIC_EASEIN,
		               enchant.Easing.ELASTIC_EASEOUT,
		               enchant.Easing.ELASTIC_EASEINOUT,
		               enchant.Easing.BOUNCE_EASEOUT,
		               enchant.Easing.BOUNCE_EASEIN,
		               enchant.Easing.BOUNCE_EASEINOUT,
		               enchant.Easing.BACK_EASEIN,
		               enchant.Easing.BACK_EASEOUT,
		               enchant.Easing.BACK_EASEINOUT,
		               enchant.Easing.EXPO_EASEIN,
		               enchant.Easing.EXPO_EASEOUT,
		               enchant.Easing.EXPO_EASEINOUT,
		               ];

		this.esingIndex = 0;


		var sprite = new enchant.Sprite(32, 32);
		sprite.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
		sprite.x = 50; sprite.y = 50;
		sprite.esingEndFlag = false;
		sprite.tl.moveTo(global.gameScreen.w, 50, 50, this.easing[0]).then(function() {
			this.esingEndFlag = true;
			console.log('イージング終了');
		});
		scene.addChild(sprite);
		this.sprite = sprite;


//		var sprite1 = new enchant.Sprite(32, 32);
//		sprite1.image = this.game.assets[DIR_IMAGES + 'chara1.png'];
//		sprite1.x = 50; sprite1.y = 50;
//		sprite1.esingEndFlag = false;
//		sprite1.tl.moveBy(10, 0, GAME_SPEED, this.easing[15]);//.loop();
//		scene.addChild(sprite1);
//		this.sprite1 = sprite1;

	},


	destroy : function() {

	},


	update : function() {

		// 連想配列のfor文
		// key 要素
		// 入力の更新
		for(var key in this.game.input) {
			var currFlag = this.game.input[key];
			var preFlag = this.inputPre[key];

			if(!currFlag & preFlag) {

				if(key == 'up') {

					this.esingIndex ++;

					if(this.esingIndex > this.easing.length - 1) {
						this.esingIndex --;
					}

					console.log('上');
					console.log('現在のイージング番号 = ' + this.esingIndex);

					if(this.sprite.esingEndFlag) {
						var esing = this.easing[this.esingIndex];

						this.sprite.x = 50; this.sprite.y = 50;
						this.sprite.esingEndFlag = false;
						this.sprite.tl.moveTo(global.gameScreen.w, 50, 50, esing).then(function() {
							this.esingEndFlag = true;
							console.log('イージング終了');
						});
					}

				}
				else if(key == 'down') {

					this.esingIndex --;

					if(this.esingIndex < 0) {
						this.esingIndex = 0;
					}

					console.log('下');

					console.log('現在のイージング番号 = ' + this.esingIndex);

					if(this.sprite.esingEndFlag) {

						var esing = this.easing[this.esingIndex];

						this.sprite.x = 50; this.sprite.y = 50;
						this.sprite.esingEndFlag = false;
						this.sprite.tl.moveTo(global.gameScreen.w, 50, 50, esing).then(function() {
							this.esingEndFlag = true;
							console.log('イージング終了');
						});
					}
				}
			}

			this.inputPre[key] = this.game.input[key];
		}

	},

});