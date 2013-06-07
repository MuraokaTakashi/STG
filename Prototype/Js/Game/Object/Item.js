/**
 * Item.js
 */

var Item = enchant.Class.create(BaseObject, {

	/**
	 * コンストラクタ
	 *
	 * @param scene : 描画するシーン
	 * @param x	: X座標
	 * @param y : Y座標
	 */
	initialize : function(scene, x, y) {

		// 親コンストラクタ
		BaseObject.call(this,
						scene,
						ITEM_WIDTH, ITEM_HEIGHT,
						x, y,
						ITEM_IMAGE);
		// フレーム
		this.frame = ITEM_IMAGE_FRAME;
		// 移動量
		this.moveDir = { x : 0, y : ITEM_MOVE_SPEED };

		// 当たり判定に追加
		global.itemArray.add(this);
		var cil = global.collision.getItemList();
		cil.add(this);
		// 描画する
		this.drawEnable();
	},

	/**
	 * 解放
	 */
	destroy : function() {
		this.baseDestroy();
	},

	/**
	 * ヒット
	 */
	hit : function(scene, effect, player) {

		// アイテムを消す
		this.baseHit();

		player.setModeAttach(PLAYER_MODE_ATTACH_BARIA);

		// バリアを発生させる
		var pPos = player.getPos();
		var effect = new effect(scene, pPos.x, pPos.y);
		effect.setCenterObject(player);
	},

	/**
	 * デバッグ出力
	 */
	debugLog : function() {

		if(this.debug.flag) {

			this.debug.text = 'アイテム :';

    		console.log(this.debug.text);

    		this.baseDebugLog();
    	}
	}

});
