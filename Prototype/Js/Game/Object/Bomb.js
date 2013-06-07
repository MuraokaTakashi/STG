/**
 * Bomb.js
 */

var Bomb =  enchant.Class.create(enchant.Sprite, {

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
		this.width = BOMB_EFFECT_WIDTH;
		this.height = BOMB_EFFECT_HEIGHT;
		this.x = x - ((BOMB_EFFECT_WIDTH * BOMB_EFFECT_SCALE) / 2);
		this.y = y - ((BOMB_EFFECT_HEIGHT * BOMB_EFFECT_SCALE) / 2);
		this.image = this.game.assets[DIR_IMAGES + BOMB_EFFECT_IMAGE];
		this.scale(BOMB_EFFECT_SCALE);
		this.frameTime = 0;
		this.scene.addChild(this);

		this.on(Event.ENTER_FRAME, function() {
			this.update();
		});
	},

	/**
	 * 更新
	 */
	update : function() {

		this.frameTime ++;
		var animationFrame = this.frameTime % BOMB_EFFECT_ANIMATION_TIMER;

		if(this.frameTime && animationFrame == 0) {
			this.frame ++;

			var animationFrameEnd = this.frame % BOMB_EFFECT_FRAME_NUM_MAX;
			if(!animationFrameEnd) {
				this.scene.removeChild(this);
			}
		}

	},
});