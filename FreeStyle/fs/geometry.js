/*------------------------------------------------------------
	Geometric Objects for Recognizing and Using Shapes
	-- Point, BoundingBox, ComplexShape
------------------------------------------------------------*/

// returns object with an x and y value
function Point(x, y){
	p = new Object();
	p.x = x;
	p.y = y;
	return p;
}

// returns object with data about bouding box (different than the convex hull)
// inlc. extremes, midpoint, width, height, fatness, area
function BoundingBox(stroke){
	BB = new Object();
	BB.extremes = getExtremes(stroke); // returns object with max/min x/y
	var xmid = (BB.extremes.max.x + BB.extremes.min.x)/2;
	var ymid = (BB.extremes.max.y + BB.extremes.min.y)/2;
	BB.midpoint = Point(xmid, ymid);
	BB.width = BB.extremes.max.x - BB.extremes.min.x;
	BB.height = BB.extremes.max.y - BB.extremes.min.y;
	// fatness: 1 is square, < 1 is narrow/fat, > 1 is tall
	BB.fatness = BB.width / BB.height;
	BB.area = BB.width * BB.height;
	return BB;
}

// returns an object with data about the shape including...
// shape (string), startPoint, and bounding box
// returns null if stroke is empty
function ComplexShape(stroke){
	if (!stroke || stroke.length == 0) return;
	var object = new Object();
	object.shape = recognize(stroke);
	if (object.shape == "line"){
	    object.slope = getSlope(stroke);
	}
	object.startx = stroke[0].getX();
	object.starty = stroke[0].getY();
	object.BB = BoundingBox(stroke);
	return object;
}

/*------------------------------------------------------------
	Geometric Functions for Recognizing and Using Shapes
	-- posRight, distance, getExtremes, getSlope
------------------------------------------------------------*/

// gives how far right the inner object is right of the left side of the outer
// returns a decimal (0-1 if inside the outer)
// .5 represents the middle
function posRight(inner, outer){
	return ((inner.BB.midpoint.x - outer.BB.extremes.min.x) / outer.BB.width);
}


function distance(x1, x2, y1, y2) {
	return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}


function getExtremes(stroke){
	if (stroke.length == 0) return;
	var maxx = Number.MIN_VALUE; var maxy = Number.MIN_VALUE;
	var minx = Number.MAX_VALUE; var miny = Number.MAX_VALUE;
	for (var i=0; i<stroke.length; i++){
		var p = stroke[i];
		minx = Math.min(p.getX(), minx);
		miny = Math.min(p.getY(), miny);
		maxx = Math.max(p.getX(), maxx);
		maxy = Math.max(p.getY(), maxy);
	}
	return {"min":Point(minx, miny), "max":Point(maxx, maxy)}
}

var getSlope = function (points) {
	var rise = Math.abs(points[points.length - 1].y-points[0].y);
	var run = Math.abs(points[points.length - 1].x-points[0].x);
	var slope = Math.atan(rise/run);
	return slope;
}