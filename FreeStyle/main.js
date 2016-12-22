/*............ GLOBALS ............*/
// GLOBAL for jQuery to know where to insert the elements
// used in clickAction and addElems
var elements=$(".elem_container");
// GLOBAL that keeps track of the state of the recognizerButton
// manipulated in this file only 
var recognizerOn = true;
// GLOBAL keeps track of current number of buttonDownPresses
// manipulated in this file only by mouse events
var countMouseDown = 0;
// GLOBAL keeps track of time between clicks
// manipulated in this file only by mouse events
var clicktimer;
// GLOBAL to keep hold strokes points for recognizer
// manipulated by mouse events and reset_globals()
var combined_stroke = {};
combined_stroke["outer_shape"] = [];
combined_stroke["inner_shape"] = []; 


/*------------------------------------------------------------
	Provides Controls Through Button Presses and KeyPresses
	- 4 Buttons: ToggleRecognizer, download, clear, Recognize
	- Keyboard shortcuts: r-reset, c-clear, t-toggle
								 backspace - remove last DOM element
------------------------------------------------------------*/

/*............ Keyboard shortcuts ............*/
$(document).on("keypress", function (e) {
	if (e.which == 114){ // 'r' pressed
		recogAndRst();
	}
	else if (e.which == 99){ // 'c' pressed
		$(".elem_container").empty();
		$(".code_container").empty();
	}
	else if (e.which == 116) // 't' pressed
		toggleRecognizer();
});

// backspaces can only be caught with mouse up
$(document).keyup( function(e){
	if (e.keyCode == 8){ // backspace pressed
		$(".elem_container > :last").fadeOut();
		$(".code_container > :last").fadeOut();
	}
}); 


/*............ Functions Triggered by Button Presses ............*/

// lets the user choose between annotation and element inserstion
function toggleRecognizer() {
	if (recognizerOn)
		newstate = "OFF";
	else
		newstate = "ON";
	$("#recognitionOnButton").text("Turn Recognizer " + newstate);
	recognizerOn = !recognizerOn;
}

// download the HTML DOM for the created website
function download(filename, text) {
	var head = $("head").html();
	head = "<head>" + head + "</head><body>";
	var body = $(".elem_container").html();
	var tail = "</body>";
	var code = head + body + tail;
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	
	element.style.display = 'none';
	document.body.pushChild(element);
	element.click();
	document.body.removeChild(element);
}


/*............ jQuery for button presses ............*/
$("#recognitionOnButton").click(function(){ toggleRecognizer() });

$("#recognizeFigure").click(function() { recogAndRst(); });

$("#clear").click(function() { $(".elem_container").empty() });

$("#download").click(function(code) { download("myFreeStyle.html", code) });

// show bootstrap buttons as depressed when mouseup
$(".btn").mouseup(function(){ $(this).blur(); })




/*------------------------------------------------------------
	Manipulate Globals and Perform Mouse-Related events
	- recogAndRst(), resetGlobals()
	- onMouseDown, onMouseDrag, onMouseUp
------------------------------------------------------------*/

/*......... Recognize and Reset .........*/
function recogAndRst(){
	insertElement(combined_stroke);
	resetGlobals();
}

/*......... Clean Up After Insertion .........*/
function resetGlobals(){
	clearTimeout(clicktimer);
	countMouseDown = 0;
	var combined_stroke = {};
	combined_stroke["outer_shape"] = [];
	combined_stroke["inner_shape"] = []; 
	paper.project.clear();
	path = new Path();
}	

/*......... Mouse Events .........*/
function onMouseDown(event) {
	clearTimeout(clicktimer);
	countMouseDown += 1;
	
	// path is the freehand path you draw.. a paper JS object
	path = new Path();
	path.strokeColor = 'gray';
	path.strokeWidth = 2;
	path.add(event.point);
	
	// starting point
	stroke = [];
	point = new srlib.core.data.container.Point(event.point.x,event.point.y)
	stroke.push(point);
}

function onMouseDrag(event) {
	path.add(event.point);
	point = new srlib.core.data.container.Point(event.point.x,event.point.y)
	stroke.push(point);
}

function onMouseUp(event) {
	if (countMouseDown == 1){
		combined_stroke["outer_shape"] = stroke;
		clicktimer = setTimeout(function(){
			insertElement(combined_stroke);
			resetGlobals();
		}, 2000);
	}
	else if (countMouseDown == 2) {
		combined_stroke["inner_shape"] = stroke;
		insertElement(combined_stroke);
		resetGlobals();
	}
}
