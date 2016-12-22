/*------------------------------------------------------------
	Edit the DOM Elements Once Placed
	- deleteElem
------------------------------------------------------------*/


// returns an array of objects containing info about the top,
// left, bottom and right of the elems in elem_container along 
// with the jquery object
function getElemRanges(){
	var int = function(str){
		return parseInt(str.substring(0, str.length-2));
	}
	var jqObjects = $(".elem_container").children()
	var DOMs = []
	for (var i=0; i<jqObjects.length; ++i) {
		DOM = new Object();
		var jqObj = jqObjects.eq(i);
		DOM.jqObj = jqObj
		DOM.top   = int(jqObj.css("top"));
		DOM.left  = int(jqObj.css("left"));
		DOM.bottom= int(jqObj.css("height")) + DOM.top;
		DOM.right = int(jqObj.css("width")) + DOM.left;
		DOMs.push(DOM);
	}
	return DOMs;
}


// takes a Point object
// returns an jq object which the point overlaps
// if element not found, will return null
function getElemContainingPoint(point){
	var elems = getElemRanges();
	for (var i=0; i<elems.length; ++i) {
		var elem = elems[i];
		if (inRange(point.x, elem.left, elem.right)
			&& inRange(point.y, elem.top, elem.bottom)){
			return elem.jqObj;
		}
	}
}


// takes a BoundingBox
// return the element which is inside that Bounding Box
// if element not found, will return null
function getElemInsideBB(BB){
	var bb = BB.extremes;
	var elems = getElemRanges();
	for (var i=0; i<elems.length; ++i) {
		var elem = elems[i];
		if (inRange(elem.left, bb.min.x, bb.max.x)
			&& inRange(elem.right, bb.min.x, bb.max.x)
			&& inRange(elem.top, bb.min.y, bb.max.y)
			&& inRange(elem.bottom, bb.min.y, bb.max.y)){
			return elem.jqObj;
		}
	}
}

// deletes an element which the midpoint of the squigly overlaps
// by removing it from the elem_container
// takes the center Point of the squigly line
// returns the element; if element not found, will do nothing
function deleteElem(squigly_mid){
	var overlappedElem = getElemContainingPoint(squigly_mid);
	if (overlappedElem) {
			overlappedElem.fadeOut();
			return overlappedElem;
	}
}

// gives the user the option to edit an element which they circled
// takes a the BoundingBox of the circle and sees if that BB contains any elem
function editElem(circleBB){
	var overlappedElem = getElemInsideBB(circleBB);
	if (overlappedElem)
		overlappedElem.addClass("selected")
}
