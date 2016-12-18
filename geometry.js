// ...... GEOMETRIC FUNCTIONS .......
function distance(x1, x2, y1, y2) {
	return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}


var getExtremes = function(stroke){
	if (stroke.length == 0) return;
	var minx = Number.MAX_VALUE; var maxx = Number.MIN_VALUE;
	var miny = Number.MAX_VALUE; var maxy = Number.MIN_VALUE;
	for (var i=0; i<stroke.length; i++){
		var p = stroke[i];
		minx = Math.min(p.getX(), minx);
		miny = Math.min(p.getY(), miny);
		maxx = Math.max(p.getX(), maxx);
		maxy = Math.max(p.getY(), maxy);
	}
	var width = maxx - minx;
	var height = maxy - miny;
	var inner_box_minx = minx + width*0.2;
	var inner_box_maxx = maxx - width*0.2;
	var inner_box_miny = miny + height*0.2;
	var inner_box_maxy = maxy - height*0.2;
	
	return {"min_x":minx, "max_x":maxx, "min_y":miny, "max_y":maxy, "inner_box_minx":inner_box_minx, 
	"inner_box_maxx": inner_box_maxx, "inner_box_miny":inner_box_miny,"inner_box_maxy":inner_box_maxy };
}

var getInnerPoints = function (stroke, coordinates) {
	var inner_points = [];
	for (var i=0; i<stroke.length; i++){
		var p = stroke[i];
		if (p.getX() > coordinates.inner_box_minx && p.getX() < coordinates.inner_box_maxx 
		&& p.getY() > coordinates.inner_box_miny && p.getY() < coordinates.inner_box_maxy){
			inner_points.push(p);
		}
	}
	return inner_points;
}

var range = function(sketch){
	var extreme =  getExtremes(sketch);
	var xrange = extreme["max_x"]-extreme["min_x"];
	var yrange = extreme["max_y"]-extreme["min_y"];
	return {"x":xrange, "y":yrange};
}

var getSlope = function (points) {
	var rise = Math.abs(points[points.length - 1].y-points[0].y);
	var run = Math.abs(points[points.length - 1].x-points[0].x);
	var slope = Math.atan(rise/run);
	return slope;
}