/**
 * BariaEffect.js
 */
var BariaEffect =  enchant.Class.create(enchant.Sprite, {

	/**
	 * コンストラクタ
	 *
	 * @param scene		: 描画するシーン
	 * @param x			: X座標
	 * @param y			: Y座標
	 */
	initialize : function(scene, x, y) {

		// 親コンストラクタ
		enchant.Sprite.call(this);
		this.game = Game.instance;
		this.scene = scene;
		this.width = 96;
		this.height = 96;
		this.x = x - (this.width / 2);
		this.y = y - (this.height / 2);
		this.image = this.game.assets[DIR_IMAGES + 'effect/effect_circle.png'];
		this.scale(1);
		this.frameTime = 0;
		this.scene.addChild(this);

		// 中心オブジェクト
		this.centerObject = null;

		// アニメーション
		this.animaType = 0;
		this.animaIndex = 0;
		this.startAnima = new Array(0,1,2,3);
		this.updateAnima = new Array(4,5,6,7,8);
		this.endAnima = new Array(9,10,11,12,13,14);
		this.updateAnimaTime = 0;

		this.on(Event.ENTER_FRAME, function() {

			this.update();
		});
	},

	/**
	 * 更新
	 */
	update : function() {

		// 位置座標の更新
		var centerPos = this.centerObject.getCenterPoint(this.centerObject.getPos());
		centerPos.x -= this.width / 2;
		centerPos.y -= this.height / 2;
		this.x = centerPos.x;
		this.y = centerPos.y;

		// アニメーションの更新
		this.frameTime ++;
		var animationFrame = this.frameTime % 1;

		if(this.frameTime && animationFrame == 0) {
			this.frame ++;

			if(this.animaType == 0) {
				this.animaIndex = this.frame % this.startAnima.length;
				this.frame = this.startAnima[this.animaIndex];
				if(this.animaIndex == this.startAnima.length - 1) {
					this.animaType ++;
					this.animaIndex = 0;
				}
			}
			else if(this.animaType == 2) {
				this.animaIndex = this.frame % this.endAnima.length;
				this.frame = this.endAnima[this.animaIndex];
				if(this.animaIndex == this.endAnima.length - 1) {
					this.centerObject.setModeAttach(PLAYER_MODE_ATTACH_NOT);
					this.centerObject = null;
					this.scene.removeChild(this);
				}
			}
			else {
				this.updateAnimaTime ++;
				this.animaIndex = this.updateAnimaTime % this.updateAnima.length;
				this.frame = this.updateAnima[this.animaIndex];
				if( (this.animaIndex == this.updateAnima.length - 1) && (this.updateAnimaTime > 100) ) {
					this.animaType ++;
					this.animaIndex = 0;
				}

			}
		}
	},

	/**
	 *
	 * @param object
	 */
	setCenterObject : function(object) {
		this.centerObject = object;
	},
});