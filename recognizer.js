function avg_vals(old, newer){
	var avg_array = [];
	for (var i=0; i<old.length; i++){
		var avg = ((old[i] + newer[i]) / 2).toFixed(3);
		avg_array.push(avg);
	}
	return avg_array;
}


// converts DOM values to array
function str_array_to_int(string_array){
	var str_vals = string_array.split(" ");
	// lil error check
	if (str_vals.length != 4) alert("vals not read");
	var int_vals = [];
	for (var i=0; i<str_vals.length; i++)
		int_vals.push(parseFloat(str_vals[i]));
	return int_vals;
}

function float_array_to_str(float_array){
	var str_array = "";
	var len = float_array.length;
	for (var i=0; i<len; i++)
		str_array += (float_array[i] + (i != len-1 ? " ":""));
	return str_array;
}

function unit_vector(dimensions){
	var tot = 0;
	for (var i=0; i<dimensions.length; i++)
		tot += dimensions[i]
		// tot += dimensions[i]*dimensions[i];
		
	// tot = Math.sqrt(tot);
	for (var i=0; i< dimensions.length; i++)
		dimensions[i] = dimensions[i] / tot;
	return dimensions;
}

function compare(stored_unit, new_unit){
	// gives percentage similarity between two units
	// (experimental - theoretical) / theoretical * 100
	var difference = 0;
	for (var i=0;i<new_unit.length; i++)
		difference += Math.abs((new_unit[i] - stored_unit[i]));
	return difference;
}

function get_stored_units(){
	// get user's trained experimental data
	var circle = $("#elementlist #circle span").text();
	circle = str_array_to_int(circle);
	var triangle = $("#elementlist #triangle span").text();
	triangle = str_array_to_int(triangle);
	var rectangle = $("#elementlist #rectangle span").text();
	rectangle = str_array_to_int(rectangle);
	var line = $("#elementlist #line span").text();
	line = str_array_to_int(line);
	return {"circle": circle, "triangle": triangle, "rectangle": rectangle, "line": line};
}

// compares new unit against each stored units
// identifies based on similarity to each
// return "circle" or whatever || or could return a normalized confidence

function identify(new_unit, possible_shapes){
	var differences = {};
	var min_diff = 1;
	var prediction = "";
	for (var shape in possible_shapes){
		var diff = compare(possible_shapes[shape], new_unit);
		differences[shape] = diff;
		if (diff < min_diff){
			prediction = shape;
			min_diff = diff;
		}
	}
	return prediction;
}

function verify(prediction, new_unit, shapes){
	// gets the result from idetify() and asks user if correct
	// writes the average(shape_unit, new_unit) back to the file
	if (prediction == ""){ // meaning there was no previous data
		var updated = float_array_to_str(new_unit);
		prediction = "circle";
	}
	else {
		var averaged = avg_vals(shapes[prediction], new_unit);
		var updated = float_array_to_str(averaged);
	}
	var place = "#elementlist #"+ prediction +" span";
	$(place).html(updated);
	console.log("prediction: " + prediction);
	
}

function arclen(figure){
	var n = figure.length;
	var arclength = 0;
    for (var i=0; i< n-1; i++) {
    	arclength = arclength + Distance(figure[i].x,figure[i].y,
    				figure[i+1].x,figure[i+1].y);
    }
    return arclength;
}


function recognize(figure) {
    var n = figure.length;
    var arclength = arclen(figure);
    var identified = "...oh I don't know."; // string of shape identified.
    // If the distance between consecutive points is within 10 points
    //for (var i = 0; i < n-1; i++) {
    //	if (Distance(figure[i].x, figure[i].y, figure[i+1].x, figure[i+1].y) <= 10) {
    		// part of the first shape
    		// figure1 = figure   // keep appending the figures to figure1 
    //		figure[-1].append(figure[i]);
    //	}

    //	else {
    		// part of second shape
    		//figure2 =   // consider objects from figure[i+1] to figure[n-1]
    //		figure.append();
    //	}

    //}

    var CV = convexHull(figure,n);

    // Area of the convex hull
    var areaCV = CV[0];
    
    // Perimeter of the convex hull
    var perimCV = CV[1];
    
    // Area of the bounding box
    var areaER = enclosingRectangle(figure)[0];

    // Perimeter of the bounding box
    var perimER = enclosingRectangle(figure)[1];
    
    var description = [areaCV, arclen(perimCV), areaER, perimER];
    var sketch_unit = unit_vector(description);
    for (var i=0;i<sketch_unit.length;++i)
    	sketch_unit[i] = parseFloat(sketch_unit[i].toFixed(3));
    console.log("Area of Convex Hull :" + sketch_unit[0] + "%");
    console.log("Perimeter of Convex Hull :" + sketch_unit[1] + "%");
    console.log("Area of Enclosing Rect :" + sketch_unit[2] + "%");
    console.log("Perimeter Enclosing Rect :" + sketch_unit[3] + "%");
    
    
    // Identifying a rectangle - WORKING
    if (areaCV/areaER > 0.85 && areaCV/areaER <= 1) {
    	identified = "rectangle";
    	// insert the condition to identify text area and images 
    }

    // Identifying a line
    else if (Distance(figure[0].x,figure[0].y,figure[n-1].x,figure[n-1].y)/arclength > 0.9){
    	// alert("it's a line");
    	identified = "line";
    }

    // Identifying a circle - WORKING
    else if (areaCV/areaER >= 0.7 && areaCV/areaER <= 0.85) {
    	identified = "circle";
    }

    // Identifying a triangle - WORKING
    else if (areaCV/areaER > 0.4 && areaCV/areaER < 0.7 
    && Distance(figure[0].x,figure[0].y,figure[n-1].x,figure[n-1].y)/arclength < 0.05) {
    	identified = "triangle";
    }

	
	$("#prediction").html(identified);
	var possible_shapes = get_stored_units();
	var prediction = identify(sketch_unit, possible_shapes);
	// verify(identified, sketch_unit, possible_shapes);
	return(identified);
    // Identifying a wavyline
   // else if (CV[1].length/n <= 0.3 ) {
   // 	alert("it's a wavyline");
   // }

}

//=====================================================================================
//=====================================================================================

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

////////////////////////////////////////////////////////
//   
//   JJJJJJJJ    AA      RRRRRR
//      JJ      AA A     RR    R
//      JJ     AA   A    RRRRRR 
//      JJ    AAAAAAAA   RR  R     VIS MARCH
//   JJJJ    AA       A  RR   R
//   
////////////////////////////////////////////////////////

// Returns the convex hull of a set of n points
function convexHull(figure, n) {
	// There must be atleast 3 points
	if (n<3) {
		return null;
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
	
	return [area, hull];
}

//================================================================================================
//================================================================================================

// FINDING THE ENCLOSING RECTANGLE/ BOUNDING BOX

// Find the extreme values from among the set of points
// i.e. find the maximum x, maximum y, minimum x, minimum y
// The corners of the rectangle will be:
// 1. (min x, min y)
// 2. (max x, min y)
// 3. (max x, max y)
// 4. (min x, max y)

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
	//return [min_x, min_y, max_x, max_y];
}

// Calculate the Euclidean distance
function Distance(x1, y1, x2, y2) {
	var dist = Math.sqrt(((x1-x2)*(x1-x2)) + (y1-y2)*(y1-y2));
	return dist;
}

// Compute the area of a trinagle when the 3 points
// of the traingle (p, q, r) are provided
function AreaTriangle(p, q, r) { 
    var ar = 0.5*Math.abs(p.x*(q.y - r.y) + q.x*(r.y - p.y) + r.x*(p.y - q.y));
    return ar;    
}

function AreaEnclosingRectangle(min_x, min_y, max_x, max_y) {
	return Distance(min_x, min_y, max_x, min_y)*Distance(max_x, min_y, max_x, max_y);
}

function PerimeterEnclosingRectangle(min_x, min_y, max_x, max_y) {
	var height = Distance(max_x, min_y, max_x, max_y);
	var length = Distance(min_x, min_y, max_x, min_y);
	return (2*(length+height));
}




