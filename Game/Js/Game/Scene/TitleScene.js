/*
TitleScene.js
*/

// タイトルシーン
var TitleScene = enchant.Class.create(BaseScene, {
	// コンストラクタ
	initialize : function() {
		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("タイトルシーンコンストラクタ");
	
	},
	
	// 開放
	destroy : function() {
	},
	
	// 更新
	update : function() {
	
		
		return SCENE.PLAY;
	
	}
	
});


