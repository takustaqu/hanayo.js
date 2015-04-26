/*
|| stagekit.js by [ow;d]
|| HTML5 canvas API helper
*/

var stagekit = {};

(function($s){


//ステージを定義
$s.Stage = function(){

	this.layers = [];
	this.casts = {};
}

$s.Stage.prototype.render = function(){
}

$s.Stage.prototype.addCasts = function(casts){
	var i=0,il=0;
	if(!!casts){

		for(var i=0,il=casts.length; i<il; i++){
			this.layers.push(casts[i]);
		}//for

	}//if

	this.sortLayers();
}

$s.Stage.prototype.sortLayers = function(){
	this.layers.sort(
		function(a,b){
			console.log();
			if( a.layer < b.layer ) return -1;
			if( a.layer > b.layer ) return 1;
			return 0;
		}
	);

	this.casts = {};

	for(var i=0,il=this.layers.length; i<il; i++){
		console.log(this.layers[i].name)
		this.casts[this.layers[i].name] = this.layers[i];
	}
}

$s.Rig = function(){
}

/*
castの仕様
	source : イメージのソース(puddingとの連携はどうする？) -> function引数のサポートで、ctxとcastの設定値を引き渡す？その場合transform系のOptionをどう扱うか。
	size : [w,h]
	position : [x,y]
	translate : [0,0] <- default
	rotate : 0 <- default
	scale: 0 
*/


})(stagekit);

$s = stagekit;

