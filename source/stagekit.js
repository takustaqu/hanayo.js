/*
|| stagekit.js by [ow;d]
|| HTML5 canvas API helper
*/

var stagekit = {};

(function($s){


function isElement(obj) {
  try {
    //Using W3 DOM2 (Firefox, Opera , Google Chrome)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have. (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}



//ステージを定義
$s.Stage = function(canvasElem){
	this.canvas = canvasElem;
	this.canvasSize = [canvasElem.width,canvasElem.height];
	this.ctx = canvasElem.getContext("2d");
	this.layers = [];
	this.casts = {};
}

$s.Stage.prototype.render = function(){
	var ctx = this.ctx;

	ctx.clearRect(0, 0, this.canvasSize[0],this.canvasSize[1]);

	for(var i=0,il=this.layers.length; i<il; i++){
		ctx.save();
		var cast = this.layers[i];

		//位置指定
		var tls = [cast.translate[0] + cast.position[0] , cast.translate[0] + cast.position[0]]
		ctx.translate(tls[0],tls[1]);

		//α
		ctx.globalAlpha = cast.opacity;

		//回転処理
		if(!!cast.rotate){
			ctx.translate((cast.size[0]/2) ,  (cast.size[1]/2));
			ctx.rotate(cast.rotate * Math.PI / 180 );
			ctx.translate(-1*(cast.size[0]/2) ,-1*(cast.size[1]/2));
		}

		if(!!cast.scale){
			ctx.translate((cast.size[0]/2) ,  (cast.size[1]/2));
			ctx.scale(cast.scale,cast.scale);
			ctx.translate(-1*(cast.size[0]/2) ,-1*(cast.size[1]/2));
		}

		if(cast.sourceType == "image"){
			ctx.drawImage( cast.source ,
				0,0, 
				cast.source.width , cast.source.height ,
				0,0, 
				cast.source.width , cast.source.height )
		}

		ctx.restore();
	};

}

$s.Stage.prototype.addCasts = function(casts){
	var i=0 , il=0;
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
		this.layers[i] = new $s.Cast(this.layers[i]);
		console.log(this.layers[i].name)
		this.casts[this.layers[i].name] = this.layers[i];
	}
}

$s.Cast = function(arg){
	this.name = arg.name;
	this.size = arg.size;
	this.position = arg.position;
	this.layer = arg.layer;
	this.source = arg.source;
	this.sourceType = this.detectSourceType(arg.source);
	this.translate = !!arg.translate ? arg.translate : [0,0] ;
	this.rotate = !!arg.rotate ? arg.rotate : 0 ;
	this.opacity = !!arg.opacity ? arg.opacity : 1 ;
	this.scale = !!arg.scale ? arg.scale : 1 ;
}

$s.Cast.prototype.detectSourceType = function(){
	if(isElement(this.source)){
		if(this.source.tagName == "IMG"){
			return "image"
		}
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

