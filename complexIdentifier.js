

// returns object with data about bouding box (different than the convex hull)
// inlc. extremes, midpoint, width, height, area
function bounding(stroke){
	BB = new Object();
	BB.extremes = getExtremes(stroke); // returns object with max/min x/y
	BB.midpoint = (BB.extremes.max_x + BB.extremes.min_x)/2;
	BB.width = BB.extremes.max_x - BB.extremes.min_x;
	BB.height = BB.extremes.max_y - BB.extremes.min_y;
	// fatness: 1 is square, < 1 is narrow/fat, > 1 is tall
	BB.fatness = BB.width / BB.height;
	BB.area = BB.width * BB.height;
	return BB;
}

// returns an object with data about the shape including...
// shape (string), startPoint, and bounding box
// returns null if stroke is empty
function getSpecs(stroke){
	if (stroke.length == 0) return;
	var object = new Object();
	object.shape = recognize(stroke);
	if (object.shape == "line"){
	    object.slope = getSlope(stroke);
	}
	object.startx = stroke[0].getX();
	object.starty = stroke[0].getY();
	object.BB = bounding(stroke);
	return object;
}

// gives how far right the inner object is right of the left side of the outer
// returns a decimal (0-1 if inside the outer)
// .5 represents the middle
function posRight(inner, outer){
	return ((inner.BB.midpoint - outer.BB.extremes.min_x) / outer.BB.width);
}

function identifyElement(inner, outer){
	// if outer shape with no inner shape, then identify as radio button
	// radio button size is constant (so put 1, 1 for width and height)
	if ((outer.shape == "rectangle" || outer.shape == "circle") 
		&& outer.BB.area < 400 && !inner) {
		return addRadioButton;
	}
	if (outer.shape == "rectangle"){
		// if it is a rectangle with no inner shape, it is a text box
		if (!inner){
			return addTextArea;
		}
		// identify elements that have a rectangle as out shape and something inside them
		else {
			var rel_pos = posRight(inner, outer);
			// if its a small outer rectangle with something inside, it is a check box
			console.log(outer.BB.area);
			if (outer.BB.area < 500)
				return addCheckBox;
			else {
				if (inner.shape == "triangle") {
					// if the triangle is near the middle
					if (rel_pos > .4 && rel_pos < .6){
						return addVideo;
					}
					// if the triangle is near the side and the BB is fat
					else if (rel_pos > .7 && outer.BB.fatness > 2.5){
						// should be fixed height for now (40)
						return addDropdown;
					}
				}
				else if ((inner.shape == "circle" || inner.shape == "rectangle")
						&& rel_pos > .6               // if inner shape on the right hand side
						&& outer.BB.fatness > 2.5 ) { // if the bounding box was drawn narrow
					return addSearchBar;
				}
				// crossed lines will be interpreted as a rectangle through the convex hull method
				else if (inner.shape == "rectangle"){
					return addImage;
				}
				else if (inner.shape == "line") {
					if (inner.slope <= 0.1) // horizontal line
						return addButton;
					else if (inner.slope >= 0.9) // verticle line
						return addNavbar;
				}
			}
		}
	}
}
