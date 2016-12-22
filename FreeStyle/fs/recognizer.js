function recognize(figure) {
    var n = figure.length;
    if (n == 0) return;

    /*.......ArcLength / Distance.......*/
    var arclength = arclen(figure);
    // distance between the first and last point
    var endpointsDist = distance(figure[0].x,figure[0].y,figure[n-1].x,figure[n-1].y);
    
    /*.......Convex Hull.......*/
    var CV = convexHull(figure);
    var areaCV = CV[0];
    var perimCV = CV[1];
    
    /*.....Enclosing Rectangle.....*/
    var ER = enclosingRectangle(figure);
    var areaER = ER[0];
    var perimER = ER[1];
    

    console.log("..........REPORT..........")
    console.log("dist: " + endpointsDist)
    console.log("ACV/AER: " + areaCV/areaER)
    console.log("PCV/AL: " + perimCV/arclength)

    
    /*.....RECOGNIZING.....*/
    // string of shape identified that will be returned.
    var identified = "unknown";
    var areaRatio = areaCV/areaER;
    
    // Identifying a squigly
    if (perimCV/arclength < 0.6) {
    	identified = "squigly";
    }

    // Identifying a rectangle
    if (inRange(areaRatio, 0.85, 1.0)) {
    	identified = "rectangle";
    }

    // Identifying a line
    else if (endpointsDist/arclength > 0.9){
    	identified = "line";
    }

    // Identifying a circle
    else if (inRange(areaRatio, 0.7, 0.85)) {
    	identified = "circle";
    }

    // Identifying a triangle
    else if (inRange(areaRatio, 0.4, 0.7) && endpointsDist/arclength < 0.05) {
    	identified = "triangle";
    }
	
	return(identified);

}



/*=====================================================================================
	ARC LENGTH / DISTANCE
=====================================================================================*/

// returns true if val is in range (low, high)
function inRange(val, low, high){
	return (val > low && val < high)
}

function arclen(figure){
	var n = figure.length;
	var arclength = 0;
    for (var i=0; i< n-1; i++) {
    	arclength = arclength + distance(figure[i].x,figure[i].y,
    				figure[i+1].x,figure[i+1].y);
    }
    return arclength;
}

// Calculate the Euclidean distance with 2 point objects
// function distance(P1, P2) {
// 	var dist = Math.sqrt(((P1.x-P2.x)*(P1.x-P2.x)) + (P1.y-P2.y)*(P1.y-P2.y));
// 	return dist;
// }

// Calculate the Euclidean distance with 4 floats
function distance(x1, y1, x2, y2) {
	var dist = Math.sqrt(((x1-x2)*(x1-x2)) + (y1-y2)*(y1-y2));
	return dist;
}

/*=====================================================================================
	CONVEX HULL
=====================================================================================*/

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {
	var val = (q.y - p.y)*(r.x - q.x) - (q.x - p.x)*(r.y - q.y);

	if (val == 0) {
		return 0;         // Points are collinear
	}
	else if (val > 0) {  // Clockwise
		return 1;   
	}
	else {              // Counterclockwise
		return 2; 
	}
}

// Returns the area and perimeter of the convex hull of a set of points
function convexHull(figure) {
	var n = figure.length;
	// There must be atleast 3 points
	if (n<3) {
		return;
	}

	// Initialize Result
	var hull = [];

	// Intialize the Area
	var area = 0;

	// Find the leftmost point
	var l = 0;
	var i = 1;
	for (i = 1; i < n; i++) {
		if (figure[i].x < figure[l].x) {
			l = i;
		}
	}

	// Start from the leftmost point, keep moving CCW
	//until we reach the start point again
	var p = l;
	var q;

	do {   // while we don't reach the start point
		hull.push(figure[p]);

	// Search for a point 'q' such that orientation(p, x,
    // q) is counterclockwise for all points 'x'. The idea
    // is to keep track of last visited most counterclock-
    // wise point in q. If any point 'i' is more counterclock-
    // wise than q, then update q.
    q = (p+1)%n;

    for (var j = 0; j < n; j++) {
    	// If i is more counterclockwise than current q, then
        // update q
        if (orientation(figure[p], figure[j], figure[q]) == 2) {
        	q = j;

        // Compute the area of triangle formed by the 3 points
        // (l, p, q)
        	       
        }
    } 
    
    area = area + AreaTriangle(figure[l], figure[p], figure[q]);

    // Now q is then most counterclockwise with respect to p
    // Set p as q for next iteration, so that q is added to
    // result 'hull'
    p = q;
	} while(p != l);
	
	var perim = arclen(hull);
	return [area, perim];
}

// Compute the area of a trinagle when the 3 points
// of the traingle (p, q, r) are provided
function AreaTriangle(p, q, r) { 
    return 0.5*Math.abs(p.x*(q.y - r.y) + q.x*(r.y - p.y) + r.x*(p.y - q.y));
}


/*=====================================================================================
	ENCLOSING RECTANGLE / BOUNDING BOX
=====================================================================================*/

// Find the extreme values from among the set of points
// i.e. find the maximum x, maximum y, minimum x, minimum y

function enclosingRectangle(figure) {
	var min_x = Number.MAX_VALUE;
	var min_y = Number.MAX_VALUE;
	var max_x = Number.MIN_VALUE;
	var max_y = Number.MIN_VALUE;

	for (var key1=0; key1 < figure.length; key1++) {
		if (figure[key1].x < min_x) {
			min_x = figure[key1].x;
		}

		if (figure[key1].y < min_y) {
			min_y = figure[key1].y;
		}

		if (max_x < figure[key1].x) {
			max_x = figure[key1].x;
		}

		if (max_y < figure[key1].y) {
			max_y = figure[key1].y;	
		}
	
	}
	var areaBB = AreaEnclosingRectangle(min_x, min_y, max_x, max_y);
	var periBB = PerimeterEnclosingRectangle(min_x, min_y, max_x, max_y);
	return [areaBB,periBB];
}

function AreaEnclosingRectangle(min_x, min_y, max_x, max_y) {
	return distance(min_x, min_y, max_x, min_y)*distance(max_x, min_y, max_x, max_y);
}

function PerimeterEnclosingRectangle(min_x, min_y, max_x, max_y) {
	var height = distance(max_x, min_y, max_x, max_y);
	var length = distance(min_x, min_y, max_x, min_y);
	return (2*(length+height));
}