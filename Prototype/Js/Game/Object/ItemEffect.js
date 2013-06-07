/**
 * ItemEffect.js
 */
var ItemEffect =  enchant.Class.create(enchant.Sprite, {

	/**
	 * コンストラクタ
	 *
	 * @param scene	: 描画するシーン
	 * @param x		: X座標
	 * @param y		: Y座標
	 */
	initialize : function(scene, x, y) {

		// 親コンストラクタ
		enchant.Sprite.call(this);
		this.game = Game.instance;
		this.scene = scene;
		this.width = ITEM_GET_EFFECT_WIDTH;
		this.height = ITEM_GET_EFFECT_HEIGHT;
		this.x = x - (this.width / 2);
		this.y = y - (this.height / 2);
		this.image = this.game.assets[DIR_IMAGES + ITEM_GET_EFFECT_IMAGE];
		this.scale(ITEM_GET_EFFECT_SCALE);
		this.frameTime = 0;
		this.scene.addChild(this);

		this.on(Event.ENTER_FRAME, function() {
			this.frameTime ++;
			var animationFrame = this.frameTime % ITEM_GET_EFFECT_FRAME_SPEED;

			if(this.frameTime && animationFrame == 0) {
				this.frame ++;

				var animationFrameEnd = this.frame % ITEM_GET_EFFECT_FRAME_NUM_MAX;
				if(!animationFrameEnd) {
					this.scene.removeChild(this);
				}
			}
		});
	},

	/**
	 * 更新
	 */
	update : function() {

		this.frameTime ++;
		var animationFrame = this.frameTime % ITEM_GET_EFFECT_FRAME_SPEED;

		if(this.frameTime && animationFrame == 0) {
			this.frame ++;

			var animationFrameEnd = this.frame % ITEM_GET_EFFECT_FRAME_NUM_MAX;
			if(!animationFrameEnd) {
				this.scene.removeChild(this);
			}
		}
	},

});