/**
 * 破片エフェクト
 */
var Splinter = enchant.Class.create({

	/**
	 * コンストラクタ
	 *
	 * @param scene		: 描画するシーン
	 * @param x			: X座標
	 * @param y			: Y座標
	 */
	initialize : function(scene, x, y) {

		var collision = global.collision;
		var csl = collision.getSplinterList();

		// 中心座標
		var centerPos = { x : x, y : y };

		// 破片
		var splinter = global.splinterArray;
		for(var i = 0; i < 5; i++) {
			var deg = i * (360 / 5);
			var rad = deg * Math.PI / 180;
			var radius = 5;
			var posX = radius * Math.cos(rad);
			var posY = radius * Math.sin(rad);

			var moveDir = { x : posX / radius, y : posY / radius };

			posX += centerPos.x;
			posY += centerPos.y;

			var obj = new Block(scene, posX, posY);
			obj.moveDir = moveDir;

			// 画面外ほどの距離まで行くようにする
			moveDir.x *= global.gameScreen.h * 2;
			moveDir.y *= global.gameScreen.h * 2;

			// 今までの、行動を全削除する
			obj.tl.clear();

			// 以下の、移動をする
			obj.tl.moveBy(moveDir.x, moveDir.y, 60, enchant.Easing.CUBIC_EASEIN);
			//enchant.Easing.QUINT_EASEINOUT,
			//enchant.Easing.CUBIC_EASEIN

			// 追加
			splinter.add(obj);
			csl.add(obj);
		}
	},

	/**
	 * 更新
	 */
	update : function() {

	},

	/**
	 * ヒット
	 */
	hit : function(player) {

	},

});