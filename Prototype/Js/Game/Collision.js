/**
 * Collision.js
 */

var Collision = enchant.Class.create({

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		// プレイヤー
		this.playerList = new ArrayList();

		// プレイヤーショットリスト
		this.playerShotList = new ArrayList();

		// エネミーリスト
		this.enemyList = new ArrayList();

		// エネミーショットリスト
		this.enemyShotList = new ArrayList();

		// ブロックリスト
		this.blockList = new ArrayList();

		// 破片リスト
		this.splinterList = new ArrayList();

		// アイテム
		this.itemList = new ArrayList();

	},

	/**
	 * 開放
	 */
	destroy : function() {

	},

	/**
	 * 初期化
	 */
	init : function() {

		// プレイヤー
		this.playerList.destroy();

		// プレイヤーショットリスト
		this.playerShotList.destroy();

		// エネミーリスト
		this.enemyList.destroy();

		// エネミーショットリスト
		this.enemyShotList.destroy();

		// ブロックリスト
		this.blockList.destroy();

		// 破片リスト
		this.splinterList.destroy();

		// アイテム
		this.itemList.destroy();

	},

	/**
	 * 更新
	 */
	update : function() {

	},


	/**
	 * 各当たり判定
	 */


	/**
	 * タッチとブロックの当たり判定
	 *
	 * @return false / 接触なし
	 * 			true / 接触あり 接触した番号を渡す 要素数は i-1
	 */
	touchAndBlockCollisionCheck : function(touch) {
		var block;
		var isLive;
		var collCheck;
		for(var i = 0, len = this.blockList.getLength(); i < len; i++) {

			block = this.blockList.getObject(i);
			isLive = global.isLive(block);

			if(!isLive) {
				continue;
			}

			collCheck = block.collisionCheck(TOUCH_WIDTH, TOUCH_HEIGHT, touch.x, touch.y);

			if(collCheck) {

				// ゲームを取得
				this.game = Game.instance;
				//SE
				this.game.assets[DIR_SOUND + 'warp1.mp3'].play();
				return i + 1;
			}
		}

		return false;
	},

	/**
	 * プレイヤーとブロックの当たり判定
	 *
	 * @return false / 接触なし
	 * 			true / 接触あり 接触した番号を渡す 要素数は i-1
	 */
	playerAndBlockCollisionCheck : function() {

//		var player;
//		var block;
//		var isCollCheck;
//		var collCheck;
//
//		for(var i = 0, iLen = this.playerList.length; i < iLen; i++) {
//
//			player = this.playerList[i];
//
//			if(typeof player === 'undefined') {
//				continue;
//			}
//
//			isCollCheck = player.isCollisionCheck();
//
//			if(!isCollCheck) {
//				continue;
//			}
//
//			for(var j = 0, jLen = this.blockList.length; j < jLen; j++) {
//
//				block = this.blockList[j];
//
//				if(typeof block === 'undefined') {
//					continue;
//				}
//
//				isCollCheck = block.isCollisionCheck();
//
//				if(!isCollCheck) {
//					continue;
//				}
//
//				collCheck = block.collisionCheckObject(player);
//
//				if(collCheck) {
//
//					player.setShot(block);
//					block.baseHit();
//
//					this.deleteCollisionList(this.blockList, j);
//				}
//			}
//		}
//
//		this.sortCollisionList(this.blockList);

	},

	/**
	 * プレイヤーとエネミーの当たり判定
	 */
	playerAndEnemyCollisionCheck : function(scene, effect) {
		var player;
		var playerMode;
		var playerDmageFlag;
		var playerModeAttach;
		var enemy;
		var isLive;
		var collCheck;

		player = this.playerList.getObject(0);
		playerMode = player.getMode();
		playerDmageFlag = player.dmageFlag;
		playerModeAttach = player.getModeAttach();

		if(playerMode == PLAYER_MODE_WARP || playerDmageFlag) {
			return;
		}

		for(var j = 0, jLen = this.enemyList.getLength(); j < jLen; j++) {

			enemy = this.enemyList.getObject(j);
			isLive = global.isLive(enemy);

			if(!isLive) {
				continue;
			}

			if(playerModeAttach == PLAYER_MODE_ATTACH_BARIA) {

				collCheck = player.collisionCheckObject(enemy);

				if(collCheck) {

					var ePos = enemy.getPos();

					// エフェクト発生
					var e = new effect(scene, ePos.x, ePos.y);

					enemy.hit(j);

					// ゲームを取得
					this.game = Game.instance;
					//SE
					this.game.assets[DIR_SOUND + 'bullet.wav'].play();
					break;
				}

			}
			else {

				collCheck = player.collisionCheckObject(enemy);

				if(collCheck) {

					var ePos = enemy.getPos();

					// エフェクト発生
					var e = new effect(scene, ePos.x, ePos.y);

					player.hit();
					enemy.hit(j);

					// ゲームを取得
					this.game = Game.instance;
					//SE
					this.game.assets[DIR_SOUND + 'bullet.wav'].play();
					break;
				}
			}
		}
	},

	/**
	 * プレイヤーとアイテムの当たり判定
	 */
	playerAndItemCollisionCheck : function(scene, effect) {
		var player;
		var playerMode;
		var playerDmageFlag;
		var item;
		var isLive;
		var collCheck;

		player = this.playerList.getObject(0);
		playerMode = player.getMode();
		playerDmageFlag = player.dmageFlag;

		if(playerMode == PLAYER_MODE_WARP || playerDmageFlag) {
			return;
		}

		for(var j = 0, jLen = this.itemList.getLength(); j < jLen; j++) {

			item = this.itemList.getObject(j);
			isLive = global.isLive(item);

			if(!isLive) {
				continue;
			}

			collCheck = player.collisionCheckObject(item);

			if(collCheck) {

				var pPos = player.getPos();
				pPos = player.getCenterPoint(pPos);

				// エフェクト発生
				var e = new effect(scene, pPos.x, pPos.y);

				//player.hit();
				item.hit(scene, BariaEffect, player);

				this.itemList.deleteOne(j);

				// ゲームを取得
				this.game = Game.instance;
				//SE
				this.game.assets[DIR_SOUND + 'warp2.mp3'].play();
				break;
			}
		}
	},


	/**
	 * プレイヤーショットとエネミーの当たり判定
	 */
	playerShotAndEnemyCollisionCheck : function(scene, Effect) {
		var pShot;
		var enemy;
		var isLive;
		var collCheck;
		for(var i = 0, iLen = this.playerShotList.getLength(); i < iLen; i++) {

			pShot = this.playerShotList.getObject(i);
			isLive = global.isLive(pShot);

			if(!isLive) {
				continue;
			}

			for(var j = 0, jLen = this.enemyList.getLength(); j < jLen; j++) {

				enemy = this.enemyList.getObject(j);
				isLive = global.isLive(enemy);

				if(!isLive) {
					continue;
				}

				collCheck = pShot.collisionCheckObject(enemy);
//				intersect
				if(collCheck) {

					var ePos = enemy.getPos();
					var e = new Effect(scene, ePos.x, ePos.y);

					// 破片の発生とコリジョンに追加
					var s = new Splinter(scene, ePos.x, ePos.y);

					pShot.baseHit();
					var enemyDeadFlag = enemy.hit();

					if(enemyDeadFlag) {
						// アイテムを発生
						var item = new Item(scene, ePos.x + ITEM_WIDTH, ePos.y + ITEM_HEIGHT);
						this.enemyList.deleteOne(j);
					}

					this.playerShotList.deleteOne(i);

					// ゲームを取得
					this.game = Game.instance;
					//SE
					this.game.assets[DIR_SOUND + 'bullet.wav'].play();
					break;
				}
			}
		}
	},

	/**
	 * 破片とエネミーの当たり判定
	 */
	splinterAndEnemy : function(scene, effect) {

		var splinter;
		var enemy;
		var isLive;
		var collCheck;

		for(var i = 0, iLen = this.splinterList.getLength(); i < iLen; i++) {

			splinter = this.splinterList.getObject(i);
			isLive = global.isLive(splinter);

			if(!isLive) {
				continue;
			}

			for(var j = 0, jLen = this.enemyList.getLength(); j < jLen; j++) {

				enemy = this.enemyList.getObject(j);
				isLive = global.isLive(enemy);

				if(!isLive) {
					continue;
				}

				collCheck = splinter.collisionCheckObject(enemy);

				if(collCheck) {

					var ePos = enemy.getPos();
					var e = new effect(scene, ePos.x, ePos.y);

					splinter.baseHit();
					enemy.hit(j);

					this.splinterList.deleteOne(i);
					//this.enemyList.deleteOne(j);

					// ゲームを取得
					this.game = Game.instance;
					//SE
					this.game.assets[DIR_SOUND + 'bullet.wav'].play();
					break;
				}
			}
		}
	},



	/**
	 * 共通処理
	 */

	/**
	 * 画面制限
	 */
	screen : function(collList) {
		var object;
		var isLive;
		var screen = global.gameScreen;
		for(var i = 0, len = collList.getLength(); i < len; i++) {

			object = collList.getObject(i);
			isLive = global.isLive(object);
			if(!isLive) {
				continue;
			}

			// 移動制限
			var screenOut = object.screenCheck(screen.w, screen.h, screen.x, screen.y);

			if(screenOut) {
				object.drawDisable();
				collList.deleteOne(i);
			}
		}
	},


	/**
	 * プレイヤーリストを渡す
	 */
	getPlayerList : function() {
		return this.playerList;
	},

	/**
	 * プレイヤーを渡す
	 */
	getPlayer : function(i) {
		return this.playerList.getObject(i);
	},

	/**
	 * プレイヤーショットリストを渡す
	 */
	getPlayerShotList : function() {
		return this.playerShotList;
	},

	/**
	 * プレイヤーショットを渡す
	 */
	getPlayerShot : function(i) {
		return this.playerShotList.getObject(i);
	},

	/**
	 * エネミーリストを渡す
	 */
	getEnemyList : function() {
		return this.enemyList;
	},

	/**
	 * エネミーを渡す
	 */
	getEnemy : function(i) {
		return this.enemyList[i];
	},

	/**
	 * エネミーショットリストを渡す
	 */
	getEnemyShotList : function() {
		return this.enemyShotList;
	},

	/**
	 * エネミーショットを渡す
	 */
	getEnemyShot : function(i) {
		return this.enemyShotList[i];
	},

	/**
	 * ブロックリストを渡す
	 */
	getBlockList : function() {
		return this.blockList;
	},

	/**
	 * ブロックを渡す
	 */
	getBlock : function(i) {
		return this.blockList.getObject(i);
	},

	/**
	 * 破片リストを渡す
	 */
	getSplinterList : function() {
		return this.splinterList;
	},

	/**
	 * 破片を渡す
	 */
	getSplinter : function(i) {
		return this.splinterList.getObject(i);
	},


	/**
	 * デバッグ出力
	 */
	debugLogBlockList : function() {
		this.blockList.debugLog();
	},

	/**
	 * アイテムリストを渡す
	 */
	getItemList : function() {
		return this.itemList;
	},

	/**
	 * アイテムを渡す
	 */
	getItem : function(i) {
		return this.itemList[i];
	},

});
