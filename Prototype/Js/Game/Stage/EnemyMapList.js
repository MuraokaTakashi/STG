
var EnemyMapList = function() {

	/**
	 * ステージリスト
	 */
	var mapList = [];

	//0ボスとスライム
	mapList[0] = [
	              [0,0,0,0,0,0,0,4,0,0,0,0,0,0],

	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,3,0,0,0,0,3,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  ];
	//1,2スライム
	mapList[1] = [
	              [0,0,0,0,0,0,0,4,0,0,0,0,0,0],

	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

					// △
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				// △
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				// △
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				// △
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				// △
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				// △
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				];

	mapList[2] = [
	               [0,0,0,0,0,0,0,4,0,0,0,0,0,0],

	               [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

	               // 円
	               [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,3,3,3,3,3,3,0,0,0,0],
				   [0,0,3,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,3,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,3,0,0,0,3,0,0,0,0,3,0,0],
				   [0,0,3,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,3,0,0,0,0,0,0,3,0,0,0],
				   [0,0,0,0,3,3,3,3,3,3,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [0,0,0,0,3,3,3,3,3,3,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,3,3,3,3,3,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,3,3,3,3,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,3,3,3,3,3,0,0,3,3,3,3,3,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   //
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,3,3,3,3,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,3,3,3,3,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,3,3,3,3,3,3,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,3,3,3,3,0,0,0,0,3,3,3,3,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,3,3,3,3,3,3,0,0,0,0],

				   // △
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   // △
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   // △
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,3,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,3,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				];

	//3,4スライムと黒魔術
	mapList[3] = [
	               [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

	               [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,7,7,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,7,7,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,7,7,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

			   ];

	//簡単モード
	mapList[4] = [
	               [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

				   [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,0,7,7,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,7,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,7,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],


				   [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,0,7,7,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,7,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,7,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [0,0,0,0,0,0,0,0,0,0,0,3,0,0],
				   [0,0,0,0,0,0,0,0,7,7,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,7,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,7,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],

			   ];

	//5,6スライムと黒魔術とコウモリ
	mapList[5] = [
	               [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

	               [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

	               [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

	               [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

	               [3,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				];

	//普通モード
	mapList[6] = [
	               [0,0,0,0,0,0,0,4,0,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,7,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,7,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,7,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,7,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,7,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,7,0,7,0,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,7,0,7,0,7,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				];

	//7,8,9スライムと黒魔術とコウモリと誘導スライム
	mapList[7] = [
	               [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],


				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],


				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],


				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,0,0,7,7,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,7,7,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				];

	mapList[8] = [
	               [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,0,7,0,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,0,7,0,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,0,7,0,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,0,7,0,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,0,7,0,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,0,7,0,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,0,7,0,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,0,7,0,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,0,7,0,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,0,7,0,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,0,7,0,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,6,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,0,7,0,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				];

	//難しいモード
	mapList[9] = [
	               [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

	               [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,7,7,7,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,7,7,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],


				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,7,7,7,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,7,7,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,7,7,7,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,7,7,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],


				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,7,7,7,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,7,7,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,7,7,7,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,7,7,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],


				   [3,0,0,0,0,0,0,5,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			       [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,3],
				   [0,0,7,7,7,7,7,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,5,0,0,0,0,0,0,0],
				   [0,0,0,0,3,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,7,7,7,7,7,0,0],
				   [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				   [0,0,0,0,0,0,0,0,3,0,0,0,0,0],

				];

	//10ボス
	mapList[10] = [
	              [0,0,0,0,0,0,0,6,0,0,0,0,0,0],

	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	              [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,3,3,0,0,0],
				  ];



	/**
	 * 返す
	 */
	return mapList;

}