/*------------------------------------------------------------
	Recognize Element and Insert HTML For It
	-- identifyElement, insertElement
------------------------------------------------------------*/



// returns null if no conditions are met
function identifyElement(inner, outer){
	
	console.log("Outer: " + outer.shape)
	console.log("Inner: " + (inner ? inner.shape : "none"))
	// if outer shape with no inner shape, then identify as radio button
	// radio button size is constant (so put 1, 1 for width and height)
	if ((outer.shape == "rectangle" || outer.shape == "circle") 
		&& outer.BB.area < 400 && !inner) {
		return addRadioButton;
	}

	if (outer.shape == "circle" && outer.BB.area > 800 && !inner) {
		editElem(outer.BB);
		return addDummy;
	}
	
	if (outer.shape == "squigly"){
		deleteElem(outer.BB.midpoint);
		// must not return null so return a function that does nothing
		return addDummy; 
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

/*............ Element Insertion ............*/
function insertElement(combined_stroke) {
	// returns specs that represent data about outer shape
	var outer = ComplexShape(combined_stroke["outer_shape"]);
	// there needs to at least be an out["r shape... "]if not then exit function
	if (!outer) return;
	// need to adjust or else elem will jump when replaced
	outer.startx -= 5; outer.starty += 25;
	// returns specs that represent data about inner shape
	var inner = ComplexShape(combined_stroke["inner_shape"]);
	// returns a function based whatever element was identified (null if none)
	var addFunc = identifyElement(inner, outer);
	// if there was an addFunc, run it, else, report Unknown Element
	addFunc ? 
		addFunc(outer.BB.width, outer.BB.height, outer.startx, outer.starty) :
		console.log("Unknown Element.");
	
	// add jquery functions to new elements
	add_jquery();
	// canvas and global arrays cleanup
}