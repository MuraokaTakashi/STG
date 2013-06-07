/**
 * BaseObject.js
 */

var BaseObject = enchant.Class.create(enchant.Sprite, {

	/**
	 * コンストラクタ
	 *
	 * @param w 	: テクスチャ幅
	 * @param h 	: テクスチャ高さ
	 * @param x 	: X座標
	 * @param y 	: Y座標
	 * @param image : 画像
	 */
	initialize : function(scene, w, h, x, y, image) {

		// 親コンストラクタ
		enchant.Sprite.call(this, w, h);

		// ゲームを取得
		this.game = Game.instance;
		// シーン
		this.scene = scene;
		// スプライト情報
		// 大きさ
		this.width = w;
		this.height = h;
		// 座標
		this.x = (x - w / 2);
		this.y = (y - h / 2);
//		this.x = (x);
//		this.y = (y);
		// 画像フレーム
		this.frame = 0;
		if(image) {
			// 画像
			this.image = this.game.assets[DIR_IMAGES + image];
		}
		// ライフ
		this.life = 1;
		this.lifeMax = 1;
		// オブジェクト情報
		// 存在
		this.enable = true;
		// 描画されているフラグ
		this.visible = false;
		// デバッグ
		this.debug = { text : '', flag : true };

		// シーンに追加
		this.scene.addChild(this);

		if(this.debug.flag) {
			//console.log('ベースオブジェクトコンストラクタ');
		}
    },

    /**
     * 解放
     */
    baseDestroy : function() {

    	this.scene.removeChild(this);
    	this.setEnable(false);
    },

    /**
     * コピーコンストラクタ
     *
     * @param object : オブジェクト
     */
    copyConstractor : function(object) {
    	var obj = new BaseObject(object.scene,
    						  object.width, object.height,
    						  object.x, object.y,
    						  '');

    	obj.copy(object);

    	return obj;
    },

    /**
     * コピー
     *
     * @param object : オブジェクト
     */
    copy : function(object) {
    	//this.scene = object.scene;
    	this.width = object.width;
    	this.height = object.height;
    	this.x = object.x;
    	this.y = object.y;
    	this.frame = object.frame;
    	this.image = object.image;
    	this.enable = object.enable;
    	this.drawFlag = object.drawFlag;
    	this.debug.text = object.debug.text;
    	this.debug.flag = object.debug.flag;
    },

   /**
    * 更新
    */
    update : function() {

    },


   /**
    * 移動
    *
    * @param dir : 移動方向
    */
    move : function(dir) {
    	this.x += dir.x;
    	this.y += dir.y;
    },

    //螺旋移動
    moveCircle : function(rad,radius)
    {
    	//オブジェクトに関する情報ならここでも反映できる
		//螺旋運動
		this.x += radius * Math.cos(rad); // 中心点 + (半径 * cos(ラジアン))
    	this.y += radius * Math.sin(rad); // 中心点 + (半径 * sin(ラジアン))
     },

     //誘導弾
     move3 : function(mx,my,speed)
     {
    	// 目標までの距離dを求める
    	 var d=Math.sqrt((mx-this.x)*(mx-this.x)+(my-this.y)*(my-this.y));
    	// 弾の速度(vx, vy)を求める：
    	// 速さが一定値speedになるようにする。
    	// 目標までの距離dが0のときには速度を下方向にする。
    	var vx = 0;
    	var vy = 0;
    	if (d) {
    		vx=(mx-this.x)/d*speed;
    		vy=(my-this.y)/d*speed;
    	} else {
    		vx=0;
    		vy=speed;
    	}
    	// 弾の座標(x,y)を更新して，弾を移動させる
    	this.x+=vx;
    	this.y+=vy;
    },

    //点滅
    move4 : function(opacity)
    {
		//オパシティーが0.1より上ならば
		if(this.opacity > 0.1)
		{
			//透過処理
			this.opacity -= opacity;
		}
	},
	//点滅
    move5 : function(opacity)
    {
		//オパシティーが0.1より上ならば
	//	if(this.opacity > 0.1)
		{
			//透過処理
			this.opacity = opacity;
		}
	},

    /**
     * 描画しているか
     *
     * @returns : 描画フラグ
     */
    isDrawEnable : function() {
    	return this.visible;
    },

    /**
     * 描画させる
     */
    drawEnable : function() {
    	if(this.visible) {
    		return;
    	}

    	this.visible = true;
    },

    /**
     * 描画を消す
     */
    drawDisable : function() {
    	if(!this.visible) {
    		return;
    	}

    	this.visible = false;
    },

    /**
     * 画面制限
     *
     * @param w : 画面の横幅
     * @param h : 画面の高さ
     * @param x : X座標
     * @param y : Y座標
     *
     * @return : true / 画面外
     * 			false / 画面内
     */
    screenCheck : function(w, h, x, y) {
    	var isCollision = false;
		var collisionFlag = false;

		// 画面制限
		isCollision = this.isCollisionCheck();

		if(isCollision) {

			collisionFlag = this.collisionCheck(w, h, x, y);

			if(!collisionFlag) {
				return true;
			}
		}

		return false;
    },

    /**
     * 当たり判定を行えるか
     *
     * return : true / 当たり判定可能
     * 			false / 当たり判定不可
     */
    isCollisionCheck : function() {
    	return (this.getEnable() & this.isDrawEnable());
    },

   /**
    * 当たり判定
    *
    * @returns {Boolean}
    */
    collisionCheckObject : function(object) {

    	/*
    	// 中心
    	if(this.x - this.width / 2 > object.x + object.width / 2) { return false; }
		if(this.x + this.width / 2 < object.x - object.width / 2) { return false; }
		if(this.y - this.height / 2 > object.y + object.height / 2) { return false; }
		if(this.y + this.height / 2 < object.y - object.height / 2) { return false; }
		*/

    	// 左上
    	if(this.x > object.x + object.width) { return false; }
		if(this.x + this.width < object.x) { return false; }
		if(this.y > object.y + object.height) { return false; }
		if(this.y + this.height < object.y) { return false; }

		return true;
    },

    /**
     * 当たり判定
     *
     * @returns {Boolean}
     */
     collisionCheck : function(w, h, x, y) {

     	/*
     	// 中心
     	if(this.x - this.width / 2 > object.x + object.width / 2) { return false; }
 		if(this.x + this.width / 2 < object.x - object.width / 2) { return false; }
 		if(this.y - this.height / 2 > object.y + object.height / 2) { return false; }
 		if(this.y + this.height / 2 < object.y - object.height / 2) { return false; }
 		*/

     	// 左上
     	if(this.x > x + w) { return false; }
 		if(this.x + this.width < x) { return false; }
 		if(this.y > y + h) { return false; }
 		if(this.y + this.height < y) { return false; }

 		return true;
     },

     /**
      * ベースヒット
      */
     baseHit : function() {

    	 this.life --;

    	 if(this.life <= 0) {

	    	 this.tl.clear();
	    	 this.drawDisable();
	    	 this.setEnable(false);

	    	 return true;
    	 }

    	 return false;
     },

     /**
 	 * ベースリセット
 	 */
 	baseReset : function() {
 		this.x = 0;
 		this.y = 0;
 		this.life = this.lifeMax;
 		this.enable = true;
 		this.drawEnable();
 	},

    /**
     * 位置座標を中心座標にした座標を取得
     *
     * @returns 座標
     */
    getCenterPoint : function(pos) {
    	var localPos = { x : 0, y : 0 };

    	localPos.x = pos.x + this.width / 2;
    	localPos.y = pos.y + this.height / 2;

    	return localPos;
    },

    /**
     * 描画位置を中心にした座標を取得
     *
     * @returns 座標
     */
    getDrawCenterPoint : function(pos) {
    	var localPos = { x : 0, y : 0 };

    	localPos.x = pos.x - this.width / 2;
    	localPos.y = pos.y - this.height / 2;

    	return localPos;
    },

    /**
     * 座標を取得
     *
     * @returns 座標
     */
    getPos : function() {
    	var pos = { x : this.x, y : this.y };

    	return pos;
    },
	/**
	 * 座標をセット
	 *
	 * @param pos	: 座標
	 */
    setPos : function(pos) {
    	this.x = pos.x;
    	this.y = pos.y;
    },

    /**
     * 存在を取得
     *
     * @returns 存在
     */
    getEnable : function() {
    	return this.enable;
    },

    /**
     * 存在をセット
     *
     * @param enable : 存在
     */
    setEnable : function(enable) {
    	this.enable = enable;
    },

    /**
     * 画像をセット
     *
     * @param image : 画像
     */
    setImage : function(image) {
    	this.image = image;
    },

    /**
     * ライフをセット
     */
    setLife : function(life) {
    	this.life = life;
    	this.lifeMax = life;
    },

    /**
     * デバッグ出力
     */
    baseDebugLog : function() {

    	if(this.debug.flag) {

			this.debug.text = 'オブジェクト :' +
							' 大きさ = ' + '( ' + this.width + ', ' + this.height + ')' +
							' 位置 = ' + '( ' + this.x + ', ' + this.y + ')' +
							' 存在 = ' + (this.enable ? '有効' : '無効') +
							' 描画 = ' + (this.drawEnable ? '有効' : '無効');

			console.log(this.debug.text);
    	}
    }
});
