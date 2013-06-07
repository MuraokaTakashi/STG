/**
* PlayScene.js
*/

// プレイシーン
var PlayScene = enchant.Class.create(BaseScene, {

	/**
	 * コンストラクタ
	 */
	initialize : function() {

		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("プレイシーンコンストラクタ");

		// デバッグ
		this.debugLogFlag = false;
		var key_number = [ 'zero', 'one', 'tow', 'three', 'fr', 'five', 'six', 'seven', 'eit', 'nain' ];
		// 前回のキー
		this.inputPre = {};
		// キーボードのキー設定
		for(var i = 0; i < 10; i++) {
			var key = key_number[i];
			this.game.keybind(48 + i, key);
			this.game.input[key] = false;
			this.inputPre[key] = false;
		}

		// デバッグテキスト
		this.dTextId = global.debugTextId;
		this.dText = global.debugTextArray;
		this.debugTextSetup();


		// 背景色
		this.backgroundColor = 'rgb(50, 50, 50)';

		// グローバルの初期化
		global.gameClearFlag = false;
		global.gameOverFlag = false;

		// プレイ中
//		this.playing = true;
		this.playing = false;
		this.gameEndTime = 0;

		this.collision = global.collision;


		// 背景
		// スケール計算
		var scaleX = global.gameScreen.w / PLAYSCENE_BACKGROUND_WIDTH;
		var scaleY = global.gameScreen.h / PLAYSCENE_BACKGROUND_HEIGHT;
		var scale = scaleY / scaleX;

		this.backgroundArray = new Array();
		this.backgroundArray[0] = new BaseObject(this,
				PLAYSCENE_BACKGROUND_WIDTH, PLAYSCENE_BACKGROUND_HEIGHT,
				global.gameScreen.w / 2, global.gameScreen.h / 2,
				PLAYSCENE_BACKGROUND_IMAGE);
		this.backgroundArray[0].scale(scaleY);
//		this.backgroundArray[0].drawEnable();

		this.backgroundArray[1] = new BaseObject(this,
				PLAYSCENE_BACKGROUND_WIDTH, PLAYSCENE_BACKGROUND_HEIGHT,
				global.gameScreen.w / 2, global.gameScreen.h / 2 * -1,
				PLAYSCENE_BACKGROUND_IMAGE);
		this.backgroundArray[1].scale(scaleY);
//		this.backgroundArray[1].drawEnable();


		// プレイヤー
		this.player = new Player(this);
		// コリジョンリストに追加
		var cpl = this.collision.getPlayerList();
		cpl.add(this.player);


		// 各プールの生成
		this.livesPool = new Array();
		this.deadsPool = new Array();

		for(var i = 0; i < POOL_ID_NUM_MAX; i++) {

			switch(i) {

			case POOL_ID_BLOCK:
				// block pool
				this.livesPool[i] = new LivePool(this, BLOCK_NUM_MAX, Block);
				this.deadsPool[i] = new DeadPool();

				// グローバルに追加
				global.blockLivePool = this.livesPool[i];
				global.blockDeadPool = this.deadsPool[i];
				break;

			case POOL_ID_ENEMY_SRAIM:
				// エネミー（スライム）
				this.livesPool[i] = new LivePool(this, ENEMY_NUM_MAX, Enemy);
				this.deadsPool[i] = new DeadPool();

				// グローバルに追加
				global.enemyLivePool = this.livesPool[i];
				global.enemyDeadPool = this.deadsPool[i];
				break;

			case POOL_ID_ENEMY_KOUMORI:
				// エネミー１（コウモリ）
				this.livesPool[i] = new LivePool(this, ENEMY1_NUM_MAX, Enemy1);
				this.deadsPool[i] = new DeadPool();

				// グローバルに追加
				global.enemy1LivePool = this.livesPool[i];
				global.enemy1DeadPool = this.deadsPool[i];
				break;

			case POOL_ID_ENEMY_METARU:
				// エネミー２（メタルスライム）
				this.livesPool[i] = new LivePool(this, ENEMY2_NUM_MAX, Enemy2);
				this.deadsPool[i] = new DeadPool();

				// グローバルに追加
				global.enemy2LivePool = this.livesPool[i];
				global.enemy2DeadPool = this.deadsPool[i];
				break;

			case POOL_ID_ENEMY_KURO:
				// エネミー３（黒魔術）
				this.livesPool[i] = new LivePool(this, ENEMY3_NUM_MAX, Enemy3);
				this.deadsPool[i] = new DeadPool();

				// グローバルに追加
				global.enemy3LivePool = this.livesPool[i];
				global.enemy3DeadPool = this.deadsPool[i];
				break;

				default: break;
			}
		}


		// blockManager
		this.blockCreateTime = 0;
		this.blockArray = new ArrayList();


		// enemyManager
		this.enemyCreateTime = 0;
		this.enemys = new Array(ENEMY_ID_NUM_MAX);
		for(var i = 0, len = this.enemys.length; i < len; i++) {
			this.enemys[i] = new ArrayList();
		}


		// boss
		this.bossArray = new Array();
		for(var i = 0, len = 2; i < len; i++) {
			var boss = null;
			switch(i) {
			case 0: boss = new Boss(this, 0, 0); break;
			case 1: boss = new Boss1(this, 0, 0); break;
			default: break;
			}

			// 追加
			boss.drawDisable();
			this.bossArray[i] = boss;
		}
		this.boss = null;


		// eplinter
		this.splinterArray = new ArrayList();
		global.splinterArray = this.splinterArray;

		// itemManager
		this.itemArray = new ArrayList();
		global.itemArray = this.itemArray;

		this.blockMapList = new BlockMapList();
		this.blockBringMap = new BaseMap(0, 0);
		// エネミー出現マップ
		this.enemyMapList = new EnemyMapList();
		this.enemyBringMap = new BaseMap(0, 0);

		this.mapLoad(0);


		// サブシーン
		//var subScene = new SubPlayCountScene(this);
		//var subScene = new SubDummyScene(this);
		var subScene = new BaseSubScene(this);
		// サブシーンマネージャ
		this.subSceneManager = new SceneManager(subScene);


		// フェード
		this.fade = new Sprite(gameScreen.w, gameScreen.h);
		this.fade.backgroundColor = "rgb(0,0,0)";
		this.fade.tl.show();
		this.addChild(this.fade);

		// 終了時に変更する構造体
		var struct = { playing : this.playing, currentScene : this, subSceneManager : this.subSceneManager };
		this.fade.tl.fadeOut(5).delay(this.game.fps).then(function() {
			// フェードアウト終了時に行う
			struct.playing = false;
			subScene = new SubPlayCountScene(struct.currentScene);
			struct.subSceneManager.change(subScene);
		});

		//BGM
		this.game.assets[DIR_SOUND + 'stage1.mp3'].play();
		this.timer = 0;
	},

	/**
	 * 開放
	 */
	destroy : function() {
		this.removeChild(this.fade);
		this.subSceneManager.destroy();
		// 当たり判定のリストを削除
		var cllList = null;
		cllList = this.collision.getPlayerList();
		cllList.destroy();
		cllList = this.collision.getPlayerShotList();
		cllList.destroy();
		cllList = this.collision.getBlockList();
		cllList.destroy();
		cllList = this.collision.getEnemyList();
		cllList.destroy();
		cllList = this.collision.getEnemyShotList();
		cllList.destroy();
		cllList = this.collision.getSplinterList();
		cllList.destroy();

		// デバッグテキストの解放
		global.destroyDebugText(this, this.dText);

		// 各オブジェクトの解放
		this.player.destroy();
		if(this.boss) {
			this.boss.destroy();
		}

		// 各プールの解放
		for(var i = 0; i < POOL_ID_NUM_MAX; i++) {

			this.livesPool[i].destroy();
			this.deadsPool[i].destroy();
		}
	},

	/**
	 * 初期化
	 */
	init : function() {

//		console.log('初期化');

		global.gameClearFlag = false;
		global.gameOverFlag = false;

		this.playing = false;
		this.gameEndTime = 0;

		// collision
		this.collision.init();

		// player
		this.player.init(this);
		// コリジョンリストに追加
		var cpl = this.collision.getPlayerList();
		cpl.add(this.player);

		// block
		this.objReset(this.blockArray);

		// item
		this.objDelete(this.itemArray);

		// enemy
		for(var i = 0, len = this.enemys.length; i < len; i++) {
			this.objReset(this.enemys[i]);
		}

		// boss
//		for(var i = 0, len = this.bossArray.length; i < len; i++) {
//			var boss = this.bossArray[i];
//			boss.init();
//		}
		if(this.boss) {
			this.boss.init();
			this.boss.drawDisable();
			this.boss = null;
		}

		// pool
		var livePool;
		var deadPool;
		for(var i = 0, len = this.deadsPool.length; i < len; i++) {
			livePool = this.livesPool[i];
			deadPool = this.deadsPool[i];
			deadPool.update(livePool);
		}

		// 出現マップの初期化
		this.blockBringMap.init();
		// エネミー出現マップ
		this.enemyBringMap.init();

		var subScene = new BaseSubScene(this);
		this.subSceneManager.change(subScene);

		// 終了時に変更する構造体
		var struct = { playing : this.playing, currentScene : this, subSceneManager : this.subSceneManager };
		this.fade.tl.fadeOut(5).delay(this.game.fps).then(function() {
			// フェードアウト終了時に行う
			struct.playing = false;
			subScene = new SubPlayCountScene(struct.currentScene);
			struct.subSceneManager.change(subScene);
		});
	},

	/**
	 * 更新
	 */
	update : function() {

		// デバッグ用
		this.debugSceneChangeKey();


		if(!this.playing) {

			// サブシーンマネージャ更新
			this.subSceneManager.update();

		}
		else {

			this.timer ++;
			if(this.timer > 2000)
			{
				this.game.assets[DIR_SOUND + 'stage1.mp3'].stop();
				this.game.assets[DIR_SOUND + 'boss1.mp3'].play();
			}

// ---------------------------------------------------------------------------------
// プレイ中の処理
// ---------------------------------------------------------------------------------

			// ゲームクリア条件
			// ボスを倒したら
			if(global.gameClearFlag) {

				this.gameEndTime ++;

				if(this.gameEndTime > 50) {
					var subScene = new SubGameClearScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
				}
			}

			// ゲームオーバー条件
			// プレイヤーが死んだら
			if(global.gameOverFlag) {

				this.gameEndTime ++;

				if(this.gameEndTime > 50) {
					var subScene = new SubGameOverScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
				}
			}


			var isTouch = this.virtualController.isTouch();// タッチされているか
			var isFlick = this.virtualController.isFlick();// フリックされたか
			var touchPos = this.virtualController.getTouch();// タッチ座標を取得
			var flickDir = this.virtualController.getFlickDir();// フリック方向を取得


			// プレイヤーの情報
			var playerPos = this.player.getPos();
			var playerMode = this.player.getMode();
			var playerDmageFlag = this.player.dmageFlag;
			var playerMoveOrWarp = (playerMode == PLAYER_MODE_WARP);
//			var playerWarp = (playerMode == PLAYER_MODE_WARP);
//			var playerDmage = (playerMode == PLAYER_MODE_DMAGE);

			if(isTouch && (!playerMoveOrWarp)) {

				var bIndex;
				var block;

				// タッチとブロックのコリジョンチェック
				bIndex = this.collision.touchAndBlockCollisionCheck(touchPos);

				// 触れているとき、ワープを開始する
				// 触れていないとき、移動
				if(bIndex && (!playerDmageFlag)) {
					var cbl = this.collision.getBlockList();
					bIndex--;
					block = this.collision.getBlock(bIndex);

					// 接触処理
					this.player.setWarpMove(block);
					this.player.setShot(block);
					block.baseHit();

					// 削除
					cbl.deleteOne(bIndex);
					cbl.sort(bIndex);
				}
				else {
					this.player.setMoveTarget(touchPos);
				}
			}

			// フリックしたら、ショットを発射する
			if(isFlick) {

				// radian = degree * PI / 180
				// degree = 180 * radian / PI

//				var flickVec = global.vector2.arrayConvert(flickDir);
//				var flickVec = new Vector2(); flickVec.x = 0; flickVec.y = 1;
//				var normalVec = global.vector2.getVector2ToRadian(0.0, 1);
//				var flickRad = global.vector2.Vector2Dot(flickVec, normalVec);
//
//				var degree = 180.0 * flickRad / Math.PI;

				this.player.shot(flickDir);
			}


// -----------------------------------------------------------
// 背景の更新
// -----------------------------------------------------------
			this.backgroundArray[0].y += PLAYSCENE_BACKGROUND_SPEED;
			this.backgroundArray[1].y += PLAYSCENE_BACKGROUND_SPEED;

			if(this.backgroundArray[0].y > global.gameScreen.h) {
				this.backgroundArray[0].y = global.gameScreen.h / 2 * -1;
			}
			if(this.backgroundArray[1].y > global.gameScreen.h) {
				this.backgroundArray[1].y = global.gameScreen.h / 2 * -1;
			}

// -----------------------------------------------------------
// プレイヤーの更新
// -----------------------------------------------------------
			this.player.update();

// ----------------------------------------------------------
// ブロックの更新
// ----------------------------------------------------------

			// ブロックの発生をマップでするかランダムでやるか

//			if(this.blockBringMap.getFinishFlag()) {
//				// 生成時間の更新
//				this.blockCreateTime ++;
//				if(this.blockCreateTime > 150) {
//					var rpx = global.random(0, global.gameScreen.w);
//					var rpy = 0;
//					var len = this.blockLivePool.getLength() - 1;
//					if(len < 0) {
//						console.log('ブロックプールがない');
//					}
//					else {
//						//var nb = new Block(this, rpx, rpy);
//						var nb = this.blockLivePool.getObject(len);
//						nb.x = rpx;
//						nb.y = rpy;
//						this.blockArray.add(nb);
//						// あたり判定リストに追加
//						cbl = this.collision.getBlockList();
//						cbl.add(nb);
//						this.blockLivePool.deleteOne(len);
//						this.blockLivePool.sort(len);
//						this.blockCreateTime = 0;
//					}
//					this.blockCreateTime = 0;
//				}
//			}
//			else {
//
//				var checkData = this.blockBringMap.bringCheck();
//
//				this.blockBringMap.scroll(0, GAME_SCROLL);
//
//				if(checkData) {
//
//					for(var j = 0, jLen = checkData.length; j < jLen; j++) {
//
//						var obj = checkData[j];
//
//						var rpx = obj.pos.x;
//						var rpy = obj.pos.y;
//						var len = this.blockLivePool.getLength() - 1;
//						if(len < 0) {
//							console.log('ブロックプールがない');
//						}
//						else {
//							//var nb = new Block(this, rpx, rpy);
//							var nb = this.blockLivePool.getObject(len);
//							if(!global.isUndefined(nb)) {
//								nb.x = rpx;
//								nb.y = rpy;
//								this.blockArray.add(nb);
//								// あたり判定リストに追加
//								var cbl = this.collision.getBlockList();
//								cbl.add(nb);
//								this.blockLivePool.deleteOne(len);
//								this.blockLivePool.sort(len);
//							}
//						}
//					}
//				}
//			}


			// ランダムの座標に発生させる
			this.blockCreateTime ++;
			if(this.blockCreateTime > 50) {
				var rpx = global.random(0, global.gameScreen.w);
				var rpy = 0;
				var result = this.addUpdate(rpx, rpy, this.blockArray, this.livesPool[POOL_ID_BLOCK], this.collision.getBlockList());

				if(result) {
					this.blockCreateTime = 0;
				}
			}

// ------------------------------------------------------------------
// ブロックの更新
// ------------------------------------------------------------------
			this.objUpdate(this.blockArray, this.deadsPool[POOL_ID_BLOCK]);

// ------------------------------------------------------------------
// エネミーの更新
// ------------------------------------------------------------------

			// エネミーの発生
//			this.enemyCreateTime ++;
//			if(this.enemyCreateTime > 50) {
//				var rpx = global.random(0, global.gameScreen.w);
//				var rpy = 0;
//				var len = this.enemyLivePool.getLength() - 1;
//				var cel = this.collision.getEnemyList();
//
//				if(len < 0) {
//					console.log('エネミープールがない');
//				}
//				else {
//					var e = this.enemyLivePool.getObject(len);
//					if(!global.isUndefined(e)) {
//						e.x = rpx;
//						e.y = rpy;
//						this.enemyArray.add(e);
//						// 当たり判定に追加
//						cel.add(e);
//						this.enemyLivePool.deleteOne(len);
//						this.enemyCreateTime = 0;
//					}
//				}
//			}

			// マップの終了フラグ
			var enemyMapFinishFlag = this.enemyBringMap.getFinishFlag();

			if(!enemyMapFinishFlag) {

				var checkData = this.enemyBringMap.bringCheck();

				this.enemyBringMap.scroll(0, GAME_SCROLL);

				if(checkData) {

					for(var j = 0, jLen = checkData.length; j < jLen; j++) {

						// オブジェクトの取得
						var obj = checkData[j];

						// オブジェクトの設定
						var rpx = obj.pos.x;
						var rpy = obj.pos.y;
						var enemyCollList = this.collision.getEnemyList();
						var enemyList;
						var livePoolList;


						if(obj.type == OBJ_TYPE_ENEMY_BOSS) {
							var localY = ENEMY_HEIGHT * BOSS_SCALE;
							var ne = this.bossArray[0];
							ne.x = rpx;
							ne.y = rpy + localY;
							ne.drawEnable();
							this.boss = ne;
							// あたり判定リストに追加
							var cel = this.collision.getEnemyList();
							cel.add(ne);
						}
						else if(obj.type == OBJ_TYPE_ENEMY) {
							enemyList = this.enemys[ENEMY_ID_SRAIM];
							livePoolList = this.livesPool[POOL_ID_ENEMY_SRAIM];
							this.addUpdate(rpx, rpy, enemyList, livePoolList, enemyCollList);

						}
						else if(obj.type == OBJ_TYPE_ENEMY1_BOSS) {
							var localY = ENEMY_HEIGHT * BOSS1_SCALE;
							var ne = this.bossArray[1];
							ne.x = rpx;
							ne.y = rpy + localY;
							ne.drawEnable();
							this.boss = ne;
							// あたり判定リストに追加
							var cel = this.collision.getEnemyList();
							cel.add(ne);
						}
						else if(obj.type == OBJ_TYPE_ENEMY1) {
							enemyList = this.enemys[ENEMY_ID_KOUMORI];
							livePoolList = this.livesPool[POOL_ID_ENEMY_KOUMORI];
							this.addUpdate(rpx, rpy, enemyList, livePoolList, enemyCollList);

						}
						else if(obj.type == OBJ_TYPE_ENEMY2) {
							enemyList = this.enemys[ENEMY_ID_METARU];
							livePoolList = this.livesPool[POOL_ID_ENEMY_METARU];
							var handle = this.addUpdate(rpx, rpy, enemyList, livePoolList, enemyCollList);
							var enemy = enemyList.getObject(handle);
							enemy.setTargetObject(this.player);

						}
						else if(obj.type == OBJ_TYPE_ENEMY3) {
							enemyList = this.enemys[ENEMY_ID_KURO];
							livePoolList = this.livesPool[POOL_ID_ENEMY_KURO];
							this.addUpdate(rpx, rpy, enemyList, livePoolList, enemyCollList);
						}
					}
				}
			}

			// 全エネミーの更新処理
			var enemyList = null;
			var deadPoolList = null;
			for(var i = 0, len = this.enemys.length; i < len; i++) {

				enemyList = this.enemys[i];
				deadPoolList = this.deadsPool[i + 1].objectArray;

				this.objUpdate(enemyList, deadPoolList);
			}

// ------------------------------------------------------------------
// ボスの更新
// ------------------------------------------------------------------
			if(this.boss != null) {
				var isDraw = this.boss.isDrawEnable();
				if(!isDraw) {
					// ゲームクリア
					if(!global.gameOverFlag) {
						global.gameClearFlag = true;
					}
				}
				else {
					this.boss.update();
				}
			}

// ------------------------------------------------------------------
// 破片の更新
// ------------------------------------------------------------------
			var s;
			var isUnde;
			for(var i = 0, len = this.splinterArray.getLength(); i < len; i++) {
				s = this.splinterArray.getObject(i);
				isUnde = global.isUndefined(s);
				if(isUnde) {
					continue;
				}
				else if(!s.isDrawEnable()) {
					// 削除
					this.splinterArray.deleteOne(i);
					continue;
				}
				else {
//					var moveDir = s.moveDir;
//					s.move(moveDir);
				}
			}

// ------------------------------------------------------------------
// アイテムの更新
// ------------------------------------------------------------------
			var item;
			var isUnde;
			for(var i = 0, len = this.itemArray.getLength(); i < len; i++) {
				item = this.itemArray.getObject(i);
				isUnde = global.isUndefined(item);
				if(isUnde) {
					continue;
				}
				else if(!item.isDrawEnable()) {
					// 削除
					this.itemArray.deleteOne(i);
					continue;
				}
				else {
					var moveDir = item.moveDir;
					item.move(moveDir);
				}
			}

// -------------------------------------------------------------------
// プールの更新
// -------------------------------------------------------------------
			var livePool;
			var deadPool;
			for(var i = 0, len = this.deadsPool.length; i < len; i++) {
				livePool = this.livesPool[i];
				deadPool = this.deadsPool[i];
				deadPool.update(livePool);
			}

// ------------------------------------------------------------------
// 当たり判定
// ------------------------------------------------------------------

			// プレイヤーとブロックの当たり判定
			// プレイヤー弾を取得し、ブロックを消す
			this.collision.playerAndBlockCollisionCheck();

			// プレイヤーとエネミーの当たり判定
			this.collision.playerAndEnemyCollisionCheck(this, Bomb);

			// プレイヤーとアイテムの当たり判定
			this.collision.playerAndItemCollisionCheck(this, ItemEffect);

			// プレイヤーショットとエネミーの当たり判定
			this.collision.playerShotAndEnemyCollisionCheck(this, Bomb);

			// 破片とエネミーの当たり判定
			this.collision.splinterAndEnemy(this, Bomb);

			// プレイヤーショットの画面制限
			var cpsl = this.collision.getPlayerShotList();
			this.collision.screen(cpsl);

			// ブロックの画面制限
			var cbl = this.collision.getBlockList();
			this.collision.screen(cbl);

			// エネミーの画面制限
			var cel = this.collision.getEnemyList();
			this.collision.screen(cel);

			// 破片の画面制限
			var csl = this.collision.getSplinterList();
			this.collision.screen(csl);

			// アイテムの画面制限
			var cil = this.collision.getItemList();
			this.collision.screen(cil);


			if(this.debugLogFlag) {
				//virtualController.debugLog();
//				this.collision.debugLogBlockList();

				//console.log('ブロック数 :' + this.blockArray.length);
			}

//--------------------------------------------------------------------------
// ソートの更新
//--------------------------------------------------------------------------

			// player shot
			var psl = this.player.getShots();
			psl.sortAll();
			var cpsl = this.collision.getPlayerShotList();
			cpsl.sortAll();

			var livePool;
			var deadPool;
			for(var i = 0, len = this.livesPool.length; i < len; i++) {
				livePool = this.livesPool[i];
				deadPool = this.deadsPool[i];

				livePool.objectArray.sortAll();
				deadPool.objectArray.sortAll();
			}

			this.blockArray.sortAll();
			var cbl = this.collision.getBlockList();
			cbl.sortAll();

			var enemy;
			for(var i = 0, len = this.enemys.length; i < len; i++) {
				enemy = this.enemys[i];
				enemy.sortAll();
			}
			var cel = this.collision.getEnemyList();
			cel.sortAll();

			// splinter
			this.splinterArray.sortAll();
			var csl = this.collision.getSplinterList();
			csl.sortAll();

			// item
			this.itemArray.sortAll();
			var cil = this.collision.getItemList();
			cil.sortAll();


//--------------------------------------------------------------------------
// デバッグの更新
//--------------------------------------------------------------------------

			if(this.debugLogFlag) {
			}

			if(GAME_DEBUG_MODE) {

				this.debugTextCollUpdate();
				this.debugTextPoolUpdate();
			}


		}// playing

	},// update

	/**
	 * 更新に追加
	 */
	addUpdate : function(posX, posY, objArray, livePool, collList) {

		var objLive = livePool.getObject();

		if(!objLive) {
			console.log('プールがない');
			return false;
		}

		objLive.x = posX;
		objLive.y = posY;
		var objHandle = objArray.add(objLive);
		collList.add(objLive);

		return objHandle;
	},

	/**
	 * オブジェクトの更新
	 */
	objUpdate : function(objArray, deadPool) {

		for(var i = 0, len = objArray.getLength(); i < len; i++) {
			var obj = objArray.getObject(i);
			var isUnde = global.isUndefined(obj);

			if(isUnde) {
				continue;
			}
			else if(!obj.isDrawEnable()) {
				// 削除
				deadPool.add(obj);
				objArray.deleteOne(i);
				continue;
			}
			else {
				// 更新
				obj.update();
			}
		}
	},

	/**
	 * オブジェクトのリセット
	 */
	objReset : function(objArray) {
		for(var i = 0, len = objArray.getLength(); i < len; i++) {
			var obj = objArray.getObject(i);
			var isUnde = global.isUndefined(obj);

			if(isUnde) {
				continue;
			}

			obj.drawDisable();
		}
	},

	/**
	 * オブジェクトの解放
	 */
	objDelete : function(objArray) {
		for(var i = 0, len = objArray.getLength(); i < len; i++) {
			var obj = objArray.getObject(i);
			var isUnde = global.isUndefined(obj);

			if(isUnde) {
				continue;
			}

			obj.drawDisable();
			obj.destroy();
			objArray.deleteOne(i);
		}
		objArray.sortAll();
	},

	/**
	 * マップロード
	 */
	mapLoad : function(stage) {
		var blockMap = this.blockMapList[stage];
		// ブロック出現マップ
		this.blockBringMap.load(blockMap, BLOCK_WIDTH, BLOCK_HEIGHT);

		// エネミー出現マップ
		var enemyMap = this.enemyMapList[stage];
		// ブロック出現マップ
		this.enemyBringMap.load(enemyMap, ENEMY_WIDTH, ENEMY_HEIGHT);
	},


	/**
	 * デバッグでシーン移行
	 */
	debugSceneChangeKey : function() {

		// デバッグ用シーン切り替え
		for(var key in this.game.input) {
			var currFlag = this.game.input[key];
			var preFlag = this.inputPre[key];
			var subScene = null;

			// 押された後
			if(!currFlag && preFlag) {

				switch(key) {
				case 'one':// 開始カウント
					subScene = new SubPlayCountScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
					break;
				case 'tow':// ポーズ
					subScene = new SubPauseScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
					break;
				case 'three':// クリア
					subScene = new SubGameClearScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
					break;
				case 'fr':// ゲームオーバー
					subScene = new SubGameOverScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
					break;
				case 'five':// サンプル
					subScene = new SubStageSelectScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
					break;
				case 'six':// サンプル１
//					subScene = new Sample1Scene(this);
//					this.subSceneManager.change(subScene);
//					this.playing = false;
					subScene = new SubIsingScene(this);
					this.subSceneManager.change(subScene);
					this.playing = false;
					break;
				case 'seven':
					break;
				case 'eit':// デバッグログ出力
					this.debugLogFlag = (this.debugLogFlag ? false : true);
					break;
				case 'nain':// プレイ中に戻る
					if(!this.playing) {
						subScene = new SubDummyScene(this);
						this.subSceneManager.change(subScene);
					}
					break;
				case 'zero':// プレイ中
					this.playing = (this.playing ? false : true);
					if(!this.playing) {
						subScene = new BaseSubScene(this);
						this.subSceneManager.change(subScene);
					}
					else {
						subScene = new SubDummyScene(this);
						this.subSceneManager.change(subScene);
					}
					break;

				case 'up':
					var e = new Enemy(this, 200, 200);
					var cel = this.collision.getEnemyList();
					cel.add(e);
					break;
				case 'down':
					var eList = collision.getEnemyList();
					var eIndex = eList.length - 1;
					if(eIndex >= 0) {
						var e = collision.getEnemy(eIndex);
						var ePos = e.getPos();
						var effect = new this.Bomb(this, ePos.x, ePos.y);
						e.baseHit();
						collision.deleteCollisionList(eList, eIndex);
						collision.sortCollisionList(eList);
					}
					break;
				case 'right':
					var e = new this.BariaEffect(this, 100, 100);
					break;
				case 'left':
					var bpx = global.random(0, global.gameScreen.w);
					var bpy = 0;
					var collBlockList = collision.getBlockList();
					var block = new Block(this, bpx, bpy);
					collision.addCollisionList(collBlockList, block);
					this.blockManager.blockAdd(block);
					break;

				default:
					break;
				}
			}
		}

		// 連想配列のfor文
		// key 要素
		// 入力の更新
		for(var key in this.game.input) {
			this.inputPre[key] = this.game.input[key];
		}

	},//

	/**
	 * デバッグテキストのセットアップ
	 */
	debugTextSetup : function() {

		this.dTextId.Coll = global.createDebugText(this, this.dText, 'Coll');
		global.setText(this.dText.getObject(this.dTextId.Coll), '一覧');
		// player
		this.dTextId.Player = global.createDebugText(this, this.dText, 'Player Coll');
		global.setText(this.dText.getObject(this.dTextId.Player), 'テスト');
		// player shot
		this.dTextId.PlayerShot = global.createDebugText(this, this.dText, 'PlayerShot Coll');
		global.setText(this.dText.getObject(this.dTextId.PlayerShot), 'テスト');
		// block
		this.dTextId.Block = global.createDebugText(this, this.dText, 'Block Coll');
		global.setText(this.dText.getObject(this.dTextId.Block), 'テスト');
		// enemy
		this.dTextId.Enemy = global.createDebugText(this, this.dText, 'Enemy Coll');
		global.setText(this.dText.getObject(this.dTextId.Enemy), 'テスト');
		// enemy shot
		this.dTextId.EnemyShot = global.createDebugText(this, this.dText, 'EnemyShot Coll');
		global.setText(this.dText.getObject(this.dTextId.EnemyShot), 'テスト');
		// splinter
		this.dTextId.Splinter = global.createDebugText(this, this.dText, 'Splinter Coll');
		global.setText(this.dText.getObject(this.dTextId.Splinter), 'テスト');
		// item
		this.dTextId.Item = global.createDebugText(this, this.dText, 'Item Coll');
		global.setText(this.dText.getObject(this.dTextId.Item), 'テスト');

		this.dTextId.Pool = global.createDebugText(this, this.dText, 'Pool');
		global.setText(this.dText.getObject(this.dTextId.Pool), '一覧');

		// blockPool
		this.dTextId.BlockPoolLive = global.createDebugText(this, this.dText, 'Block Pool Live');
		global.setText(this.dText.getObject(this.dTextId.BlockPoolLive), 'テスト');

		this.dTextId.BlockPoolDead = global.createDebugText(this, this.dText, 'Block Pool Dead');
		global.setText(this.dText.getObject(this.dTextId.BlockPoolDead), 'テスト');

		// enemyPool
		this.dTextId.EnemyPoolLive = global.createDebugText(this, this.dText, 'Enemy Pool Live');
		global.setText(this.dText.getObject(this.dTextId.EnemyPoolLive), 'テスト');

		this.dTextId.EnemyPoolDead = global.createDebugText(this, this.dText, 'Enemy Pool Dead');
		global.setText(this.dText.getObject(this.dTextId.EnemyPoolDead), 'テスト');

		// enemy1Pool
		this.dTextId.Enemy1PoolLive = global.createDebugText(this, this.dText, 'Enemy1 Pool Live');
		global.setText(this.dText.getObject(this.dTextId.Enemy1PoolLive), 'テスト');

		this.dTextId.Enemy1PoolDead = global.createDebugText(this, this.dText, 'Enemy1 Pool Dead');
		global.setText(this.dText.getObject(this.dTextId.Enemy1PoolDead), 'テスト');

		// enemy2Pool
		this.dTextId.Enemy2PoolLive = global.createDebugText(this, this.dText, 'Enemy2 Pool Live');
		global.setText(this.dText.getObject(this.dTextId.Enemy2PoolLive), 'テスト');

		this.dTextId.Enemy2PoolDead = global.createDebugText(this, this.dText, 'Enemy2 Pool Dead');
		global.setText(this.dText.getObject(this.dTextId.Enemy2PoolDead), 'テスト');

		// enemy3Pool
		this.dTextId.Enemy3PoolLive = global.createDebugText(this, this.dText, 'Enemy3 Pool Live');
		global.setText(this.dText.getObject(this.dTextId.Enemy3PoolLive), 'テスト');

		this.dTextId.Enemy3PoolDead = global.createDebugText(this, this.dText, 'Enemy3 Pool Dead');
		global.setText(this.dText.getObject(this.dTextId.Enemy3PoolDead), 'テスト');
	},

	/**
	 * デバッグテキストのコリジョン更新
	 */
	debugTextCollUpdate : function() {
		var str;
		var cl;

		// player
		cl = this.collision.getPlayerList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.Player), str);

		// player shot
		cl = this.collision.getPlayerShotList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.PlayerShot), str);

		// block
		cl = this.collision.getBlockList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.Block), str);

		// enemy
		cl = this.collision.getEnemyList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.Enemy), str);

		// enemy shot
		cl = this.collision.getEnemyShotList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.EnemyShot), str);

		// splinter
		cl = this.collision.getSplinterList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.Splinter), str);

		// item
		cl = this.collision.getItemList();
		str = '数 ' + cl.getLength();
		global.setText(this.dText.getObject(this.dTextId.Item), str);
	},

	/**
	 * デバッグテキストのプール更新
	 */
	debugTextPoolUpdate : function() {

		var str;
		var poolList;

		for(var i = 0, len = this.livesPool.length; i < len; i++) {

			switch(i) {

			case POOL_ID_BLOCK:
				// block pool
				poolList = this.livesPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.BlockPoolLive), str);

				poolList = this.deadsPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.BlockPoolDead), str);
				break;

			case POOL_ID_ENEMY_SRAIM:
				// エネミー（スライム）
				poolList = this.livesPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.EnemyPoolLive), str);

				poolList = this.deadsPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.EnemyPoolDead), str);
				break;

			case POOL_ID_ENEMY_KOUMORI:
				// エネミー１（コウモリ）
				poolList = this.livesPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.Enemy1PoolLive), str);

				poolList = this.deadsPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.Enemy1PoolDead), str);
				break;

			case POOL_ID_ENEMY_METARU:
				// エネミー２（メタルスライム）
				poolList = this.livesPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.Enemy2PoolLive), str);

				poolList = this.deadsPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.Enemy2PoolDead), str);
				break;

			case POOL_ID_ENEMY_KURO:
				// エネミー３（黒魔術）
				poolList = this.livesPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.Enemy3PoolLive), str);

				poolList = this.deadsPool[i].objectArray;
				str = '数 ' + poolList.getLength();
				global.setText(this.dText.getObject(this.dTextId.Enemy3PoolDead), str);
				break;

				default: break;
			}
		}
	},

});

