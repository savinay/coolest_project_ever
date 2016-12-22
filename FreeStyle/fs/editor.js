/*------------------------------------------------------------
	Edit the DOM Elements Once Placed
	- deleteElem
------------------------------------------------------------*/

// deletes an element which the squigly overlaps
// by removing it from the elem_container
// takes a Point object
// return element jq object; if element not found, will return null
function deleteElem(squigly_mid){
	var int = function(str){
		return parseInt(str.substring(0, str.length-2));
	}
	var elements = $(".elem_container").children()
	for (var i=0; i<elements.length; ++i) {
		var elem = elements.eq(i);
		var top  = int(elem.css("top"));
		var left = int(elem.css("left"));
		var h    = int(elem.css("height"));
		var w    = int(elem.css("width"));
		if (inRange(squigly_mid.x, left, left+w)
			&& inRange(squigly_mid.y, top, top+h)){
			elem.remove();
			$(".code_container").children().eq(i).remove();
			return elem;
		}
	}
}
