/*
|| stagekit.js by [ow;d]
|| HTML5 canvas API helper
*/

var stagekit = {};

(function($s){


function isElement(obj) {
　//referred this article.
　//-> http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object/384380#384380
  try {
    return obj instanceof HTMLElement;
  }
  catch(e){
    return false;
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

		var cast = this.layers[i];

		if(cast.show){ // Check cast has not set hidden.

			//save canvas transform state.
			ctx.save();		

			//set position
			var tls = [cast.translate[0] + cast.position[0] , cast.translate[0] + cast.position[0]]
			ctx.translate(tls[0],tls[1]);

			//transparent 
			ctx.globalAlpha = cast.opacity;

			//rotateing
			if(!!cast.rotate){
				ctx.translate((cast.size[0]/2) ,  (cast.size[1]/2));
				ctx.rotate(cast.rotate * Math.PI / 180 );
				ctx.translate(-1*(cast.size[0]/2) ,-1*(cast.size[1]/2));
			}

			//scaling
			if(!!cast.scale){
				ctx.translate((cast.size[0]/2) ,  (cast.size[1]/2));
				ctx.scale(cast.scale,cast.scale);
				ctx.translate(-1*(cast.size[0]/2) ,-1*(cast.size[1]/2));
			}

			//Layer mode(canvas)
			if(!!cast.layerMode){
				ctx.globalCompositeOperation = cast.layerMode;
			}
			
			if(cast.sourceType == "image"){
			//IMG要素であることを確認出来ている場合は、drawImageの対象とする。

				ctx.drawImage( cast.source ,
					0,0, 
					cast.source.width , cast.source.height ,
					0,0, 
					cast.source.width , cast.source.height );

			}else if(cast.sourceType == "function"){
			//Sourceに関数が渡されている場合、第1引数にctx,第1引数にcastの内容が引き渡される。

			};

			ctx.restore();

		}//isShown

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
	this.show = arg.show === false ? false : true;
	this.scale = !!arg.scale ? arg.scale : 1 ;
	this.layerMode = !!arg.layerMode ? arg.layerMode : false ;
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

