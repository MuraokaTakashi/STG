/**
 * Define.js
 */


/**
 * その他
 */
const GAME_DEBUG_MODE = 0;
const GAME_SCREEN_WIDTH_DEFAULT = 400;
const GAME_SCREEN_HEIGHT_DEFAULT = 400;
const GAME_SCREEN_WIDTH = GAME_SCREEN_WIDTH_DEFAULT + 400;
const GAME_SCREEN_HEIGHT = GAME_SCREEN_HEIGHT_DEFAULT;
const GAME_SCREEN_POS_X = 0;
const GAME_SCREEN_POS_Y = 0;
const GAME_FPS = 60;
const DIR_IMAGES = 'Images/';// 画像ディレクトリ
const DIR_TXT = 'Txt/';// テキストディレクトリ
const DIR_SOUND = 'Sound/';// 音声ディレクトリ
const GAME_SCROLL = 1;
const GAME_SPEED = GAME_FPS;


/**
 * タッチ
 */
const TOUCH_WIDTH = 25;
const TOUCH_HEIGHT = 25;


/**
 * 仮想コントローラ
 */
const VC_FLICK_DIR = 50;// フリック判定距離
const VC_TOUCH_SAVE_NUM_MAX = 5;// タッチ保存数


/**
 * プレイシーン
 */
// 368 : 341 = 400 : 400
// 368 * x = 400  x = 400 / 368
// 341 * y = 400  y = 400 / 341
const PLAYSCENE_BACKGROUND_WIDTH = 368;
const PLAYSCENE_BACKGROUND_HEIGHT = 341;
const PLAYSCENE_BACKGROUND_IMAGE = 'a.png';
const PLAYSCENE_BACKGROUND_SPEED = 1;



/**
 * オブジェクト識別用 タイプ
 */
const OBJ_TYPE_NOT 			= -1;
const OBJ_TYPE				= 0;
const OBJ_TYPE_PLAYER 		= 1;
const OBJ_TYPE_PLAYER_SHOT 	= 2;
const OBJ_TYPE_ENEMY 		= 3;
const OBJ_TYPE_ENEMY_BOSS 	= 4;
const OBJ_TYPE_ENEMY1 		= 5;
const OBJ_TYPE_ENEMY1_BOSS 	= 6;
const OBJ_TYPE_ENEMY2 		= 7;
const OBJ_TYPE_ENEMY3 		= 8;
const OBJ_TYPE_NUM_MAX		= 9;


/**
 * コリジョン識別用 ID
 */
const COLL_ID_PLAYER 		= 0;
const COLL_ID_PLAYER_SHOT 	= 1;
const COLL_ID_ENEMY 		= 2;
const COLL_ID_ENEMY_SHOT 	= 3;
const COLL_ID_BLOCK 		= 4;
const COLL_ID_SPLINTER 		= 5;
const COLL_ID_ITEM 			= 6;
const COLL_ID_NUM_MAX 		= 7;


/**
 * エネミー識別用 ID
 */
const ENEMY_ID_SRAIM 	= 0;// スライム
const ENEMY_ID_KOUMORI 	= 1;// コウモリ
const ENEMY_ID_METARU 	= 2;// メタルスライム
const ENEMY_ID_KURO 	= 3;// 黒魔術
const ENEMY_ID_NUM_MAX 	= 4;


/**
 * プール識別用 ID
 */
const POOL_ID_BLOCK = 0;
const POOL_ID_ENEMY_SRAIM = 1;
const POOL_ID_ENEMY_KOUMORI = 2;
const POOL_ID_ENEMY_METARU = 3;
const POOL_ID_ENEMY_KURO = 4;
const POOL_ID_NUM_MAX = 5;


/**
 * プレイヤー用定数定義
 */
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;
const PLAYER_FIRST_POS_X = 200;
const PLAYER_FIRST_POS_Y = 300;
//画像
const PLAYER_IMAGE = 'chara1.png';
// 画像フレーム
const PLAYER_IMAGE_FRAME = 0;
// 移動速度
const PLAYER_MOVE_SPEED = 5;
//プレイヤーの状態
const PLAYER_MODE_NOT = -1; // なし
const PLAYER_MODE_TARGET_MOVE = 1;// 移動
const PLAYER_MODE_WARP = 2;// ワープ
const PLAYER_MODE_DMAGE = 3; // ダメージ
// プレイヤーの追加状態
const PLAYER_MODE_ATTACH_NOT = -1;
const PLAYER_MODE_ATTACH_BARIA = 1; //バリア
// 移動ターゲットオブジェクト
const PLAYER_MOVE_TARGET_OBJECT_WIDTH = 25;
const PLAYER_MOVE_TARGET_OBJECT_HEIGHT = 25;
// ワープ
const PLAYER_WARP_WAIT_TIMER = 20;// 待ち時間
// ワープエフェクト
const PLAYER_WARP_EFFECT_WIDTH = 120;
const PLAYER_WARP_EFFECT_HEIGHT = 120;
const PLAYER_WARP_EFFECT_IMAGE = 'effect/pipo-btleffect009.png';
const PLAYER_WARP_EFFECT_SCALE = 0.7;
const PLAYER_WARP_EFFECT_ANIMATION_TIMER = 3;
const PLAYER_WARP_EFFECT_FRAME_NUM_MAX = 8;
// ショット
const PLAYER_SHOT_NUM_MAX = 10;// 最大数6
const PLAYER_SHOT_SPEED = 5;
// ダメージ
const PLAYER_DMAGE_TIMER_MAX = 100;
const PLAYER_DMAGE_FADE_SPEED = 5;

// レベル
const PLAYER_LEVEL_NUM_MAX = 5;

// ライフ
const PLAYER_LIFE_WIDTH = 16;
const PLAYER_LIFE_HEIGHT = 16;
const PLAYER_LIFE_IMAGE = 'icon0.png';
const PLAYER_LIFE_IMAGE_FRAME = 70;
const PLAYER_LIFE_SCALE = 1;
const PLAYER_LIFE_MAX = 5;




/**
 * エネミー用定数定義（スライム）
 */
const ENEMY_WIDTH = 32;
const ENEMY_HEIGHT = 32;
const ENEMY_IMAGE = 'chara6.png';
const ENEMY_IMAGE_FRAME = 0;
const ENEMY_MOVE_SPEED = GAME_SCROLL;
const ENEMY_LIFE_MAX = 1;
const ENEMY_NUM_MAX = 100;



/**
 * ボス用定数定義（スライムの親玉）
 */
const BOSS_WIDTH = 32;
const BOSS_HEIGHT = 32;
const BOSS_SCALE = 3;
const BOSS_IMAGE = 'chara6.png';
const BOSS_IMAGE_FRAME = 0;
const BOSS_MOVE_SPEED = GAME_SCROLL;
const BOSS_LIFE_MAX = 10;



/**
 * エネミ１ー用定数定義（コウモリ）
 */
const ENEMY1_WIDTH = 50;
const ENEMY1_HEIGHT = 50;
const ENEMY1_IMAGE = 'monster/monster3.gif';
const ENEMY1_IMAGE_FRAME = 2;
const ENEMY1_ANGLE_ADD = 5;
const ENEMY1_MOVE_RADIUS = 3;
const ENEMY1_MOVE_SPEED = GAME_SCROLL;
const ENEMY1_LIFE_MAX = 2;
const ENEMY1_NUM_MAX = 100;


/**
 * ボス1用定数定義（コウモリの親玉）
 */
const BOSS1_WIDTH = 50;
const BOSS1_HEIGHT = 50;
const BOSS1_SCALE = 3;
const BOSS1_IMAGE = 'monster/monster3.gif';
const BOSS1_IMAGE_FRAME = 2;
const BOSS1_MOVE_SPEED = GAME_SCROLL;
const BOSS1_LIFE_MAX = 20;


/**
 * エネミー２用定数定義（メタルスライム）
 */
const ENEMY2_WIDTH = 50;
const ENEMY2_HEIGHT = 50;
const ENEMY2_IMAGE = 'monster/monster4.gif';
const ENEMY2_IMAGE_FRAME = 2;
const ENEMY2_MOVE_SPEED = GAME_SCROLL;
const ENEMY2_LIFE_MAX = 3;
const ENEMY2_NUM_MAX = 100;



/**
 * エネミー３用定数定義（黒魔術）
 */
const ENEMY3_WIDTH = 32;
const ENEMY3_HEIGHT = 32;
const ENEMY3_IMAGE = 'chara6.png';
const ENEMY3_IMAGE_FRAME = 3;
const ENEMY3_MOVE_SPEED = GAME_SCROLL;
const ENEMY3_LIFE_MAX = 4;
const ENEMY3_NUM_MAX = 100;



/**
 * ブロック用定数定義
 */
const BLOCK_WIDTH = 16;
const BLOCK_HEIGHT = 16;
const BLOCK_IMAGE = 'map0.png';
const BLOCK_IMAGE_FRAME = 5;
const BLOCK_MOVE_SPEED = GAME_SCROLL;
const BLOCK_NUM_MAX = 100;// 最大数


/**
 * アイテム用定数定義
 */
const ITEM_WIDTH = 16;
const ITEM_HEIGHT = 16;
const ITEM_IMAGE = 'icon0.png';
const ITEM_IMAGE_FRAME = 64;
const ITEM_MOVE_SPEED = GAME_SCROLL;


/**
 * 炎エフェクト用定数定義
 */
const BOMB_EFFECT_WIDTH = 120;
const BOMB_EFFECT_HEIGHT = 120;
const BOMB_EFFECT_ANIMATION_TIMER = 3;
const BOMB_EFFECT_FRAME_NUM_MAX = 8;
//const BOMB_EFFECT_IMAGE = 'effect/pipo-btleffect022.png';
const BOMB_EFFECT_IMAGE = 'effect/pipo-btleffect022.png';
const BOMB_EFFECT_SCALE = 0.7;


/**
 * アイテム取得エフェクト用定数定義
 */
const ITEM_GET_EFFECT_WIDTH = 256;
const ITEM_GET_EFFECT_HEIGHT = 256;
const ITEM_GET_EFFECT_IMAGE = 'effect/item_get_effect.png';
const ITEM_GET_EFFECT_FRAME_NUM_MAX = 30;
const ITEM_GET_EFFECT_FRAME_SPEED = 1;
const ITEM_GET_EFFECT_SCALE = 0.5;



/**
 * 破片用定数定義
 */
const SPLINTER_WIDTH = 16;
const SPLINTER_HEIGHT = 16;
const SPLINTER_IMAGE = 'map0.png';
const SPLINTER_IMAGE_FRAME = 5;



