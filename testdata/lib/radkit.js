/*

Radkit.js by [ow;d]

*/


function Radkit(){
	this.rotate = 0;
	this.cos = false;
	this.sin = false;
	this.angle = 0;
	this.shapeRatio = {x:1,y:1};
}

Radkit.prototype.setAngle = function(angle){
	
	this.angle = (angle %= 360);
	this.rad = angle * Math.PI / 180; 
	this.cos = Math.cos(this.rad);
	this.sin = Math.sin(this.rad);
	
	return {
		rad:this.rad,
		cos:this.cos,
		sin:this.sin,
		angle:this.angle
	}
}

Radkit.prototype.setShapeRatio = function(w,h){
	this.shapeRatio = {x:w,y:h};
}

Radkit.prototype.getPosition = function(x,y,strength){
	if(this.cos){
		return {
			x : this.cos * (strength * this.shapeRatio.y) *-1  + x,
			y : this.sin * (strength * this.shapeRatio.x) + y
		}
	}else{
		return false
	}
}