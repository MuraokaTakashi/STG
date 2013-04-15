/*
EndScene.js
*/

// 終了シーン
var EndScene = enchant.Class.create(BaseScene, {
	// コンストラクタ
	initialize : function() {
		// 親クラスのコンストラクタ
		BaseScene.call(this);
		console.log("終了シーンコンストラクタ");
	
	},
	
	// 開放
	destroy : function() {
	},
	
	// 更新
	update : function() {
	
		return SCENE.END;
	
	}
	
});

