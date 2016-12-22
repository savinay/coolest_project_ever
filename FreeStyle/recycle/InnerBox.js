// not used right now
function InnerRectangle(stroke){
	var width = maxx - minx;
	var height = maxy - miny;
	var inner_box_minx = minx + width*0.2;
	var inner_box_maxx = maxx - width*0.2;
	var inner_box_miny = miny + height*0.2;
	var inner_box_maxy = maxy - height*0.2;
	
	var min = Point(inner_box_minx, inner_box_miny)
	var min = Point(inner_box_maxx, inner_box_maxy)
	return {"min":min, "max":max}
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
