<script type="text/paperscript" canvas="canvas">
	var elements=$(".elem_container");
	$("button").toggleClass("btn btn-primary");
	// add a button for switching between drawing text and images
   	function toggleRecognizer() {
		var recognizer = $("#recognitionOnButton");
		recognizer.toggleClass("on");
		if (recognizer.hasClass("on"))
			recognizer.text("Turn Recognizer OFF");
		else
			recognizer.text("Turn Recognizer ON");
	}

	function toggleRectangleType(){
		var rectangleType = $("#drawTypeButton");
		rectangleType.toggleClass("picture");
		if (rectangleType.hasClass("picture"))
			rectangleType.text("Text Areas!");
		else
			rectangleType.text("Pictures!");
	}
	
	$("#drawTypeButton").click(function(){
		toggleRectangleType();
	});
	
	$("#recognitionOnButton").click(function(){
		toggleRecognizer()
	});
	
	$("#recognizeFigure").click(function() {
		recognizeShape();	
	});
	$("#reset").click(function() {
		resetAll();
	})
	
	var resetAll = function () {
		sketch = new srlib.core.data.container.Sketch();
		console.log(sketch);
	}
	

	$(document).on("keypress", function (e) {
		// console.log(e.which);
    	if (e.which == 32) //space bar pressed
    		toggleRecognizer();
    	if (e.which == 114) // r pressed
    		toggleRectangleType();
	});
	// Global variables for detecting start and end points of a line
	// really bad right?? oops
	var startPoint;
	var EndPoint;
	// more globals
	var starttime;
	var endtime;
	var countMouseDown = 0;
	var combined_stroke = {};
	combined_stroke["outer_shape"] = [];
	combined_stroke["inner_shape"] = []; 
	
	// ...... GEOMETRIC FUNCTIONS .......
	function distance(x1, x2, y1, y2) {
    	return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
	}
	
	var recognizeShape = function () {
		// var combined_stroke = [];
		var all_strokes = sketch.getStrokes();
		console.log(combined_stroke);
		path.removeSegments();
		endPoint = event.point;
		console.log(combined_stroke["outer_shape"]);
		var shape = recognize(combined_stroke["outer_shape"]); //stroke.getPoints() 
		console.log("stroke: ", stroke);
		if (shape == "line") addLine();
		console.log("outer_shape: ", shape);
		if (shape == "rectangle"){
			var coordinates = getExtremes(combined_stroke["outer_shape"]);
			var inner_points = getInnerPoints(combined_stroke["outer_shape"], coordinates);
			var width = codeGenerationTextArea(coordinates)[0];
			var height = codeGenerationTextArea(coordinates)[1];
			console.log("area: ", (coordinates.max_x - coordinates.min_x) * (coordinates.max_y - coordinates.min_y));
			var area = (coordinates.max_x - coordinates.min_x) * (coordinates.max_y - coordinates.min_y);
			if (area > 2000) {
				if (combined_stroke["inner_shape"].length > 0) {
					var inner_shape = recognize(combined_stroke["inner_shape"]);
					console.log(inner_shape);
					if (inner_shape == "triangle") {
						var coordinates_inner_shape = getExtremes(combined_stroke["inner_shape"]);
						var mid_point = (coordinates.max_x + coordinates.min_x)/2;
						console.log("inner_shape: ", mid_point, coordinates_inner_shape.max_x, coordinates_inner_shape.min_x);
						if (coordinates_inner_shape.max_x < mid_point * 1.1 && coordinates_inner_shape.min_x > mid_point * 0.9)
							addVideo(width, height, startPoint_x_outer, startPoint_y_outer);
						else if (coordinates_inner_shape.max_x > mid_point * 1.1)
							addDropdown(width, height, startPoint_x_outer, startPoint_y_outer);
					}
					else if (inner_shape == "rectangle")
						addImage(width, height, startPoint_x_outer, startPoint_y_outer);
					else if (inner_shape == "line")
						addButton(width, height, startPoint_x_outer, startPoint_y_outer);
					else if (inner_shape == "circle")
						addSearchBar(width, height, startPoint_x_outer, startPoint_y_outer);
					
				} else
					addTextArea(width, height, startPoint_x_outer, startPoint_y_outer);
			} else {
				addCheckBox(width, height, startPoint_x_outer, startPoint_y_outer);
			}
		}
		
		if (shape == "circle") {
			addRadioButton(width, height, startPoint_x_outer, startPoint_y_outer);
		}
		paper.project.clear();
		add_jquery();
	}

	var getExtremes = function(stroke){
		console.log("strokes: ", stroke);
		var minx = Number.MAX_VALUE; var maxx = Number.MIN_VALUE;
		var miny = Number.MAX_VALUE; var maxy = Number.MIN_VALUE;
		for (i=0; i<stroke.length; i++){
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
		for (i=0; i<stroke.length; i++){
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
		xrange = extreme["max_x"]-extreme["min_x"];
		yrange = extreme["max_y"]-extreme["min_y"];
		return {"x":xrange, "y":yrange};
	}
	
	function codeGenerationTextArea(coordinates) {
	    var max_x = coordinates.max_x;
	    var max_y = coordinates.max_y;
	    var min_x = coordinates.min_x;
	    var min_y = coordinates.min_y;
	    var width = max_x - min_x;
	    var height = max_y - min_y;
	    return [width, height];
	}

	// ...... CODE FOR ADDING ELEMENTS TO DOM .......
	// ...... PAPER JS CODE FOR ADDING POINTS ON MOUSE DRAGGING .......
	function onMouseDown(event) {
		// PaperJS add a new Path object and initial starting point
		countMouseDown += 1;
		endtime = new Date().getTime();
		// var old_path = path;
		path = new Path();
		
		
		path.strokeColor = 'blue';
		path.strokeWidth = 2;
		path.add(event.point);
		startPoint = event.point;
		sketch = new srlib.core.data.container.Sketch();
		
		// SRLlib add a new Stroke object and initial starting point
		stroke = new srlib.core.data.container.Stroke();
		point = new srlib.core.data.container.Point(event.point.x,event.point.y)
		if (countMouseDown==1) {
			startPoint_x_outer = point.x;
			startPoint_y_outer = point.y;
		}
		if (countMouseDown == 2) {
			startPoint_x_inner = point.x;
			startPoint_y_inner = point.y;
		}
		
		console.log(Math.abs(endtime-starttime));
		if (Math.abs(endtime-starttime) > 2000 || typeof sketch == "undefined"){
			sketch = new srlib.core.data.container.Sketch();
		}
		sketch.addStroke(stroke);
		sketch.addPoint(point);
		stroke.addPoint(point);
	}

	function onMouseDrag(event) {
		// PaperJS add points to Path object on mouse drag
		path.add(event.point);
		point = new srlib.core.data.container.Point(event.point.x,event.point.y)
		sketch.addPoint(point);
		stroke.addPoint(point);
	}

	function onMouseUp(event) {
		starttime = new Date().getTime();
		var all_strokes = sketch.getStrokes();
		if(countMouseDown == 1) {
			for (var key in all_strokes)
				combined_stroke["outer_shape"] = combined_stroke["outer_shape"].concat(all_strokes[key].getPoints());
		}
		if (countMouseDown == 2) {
			var coordinates = getExtremes(combined_stroke["outer_shape"]);
			var inner_points = getInnerPoints(combined_stroke["outer_shape"], coordinates);
			console.log(inner_points);
			for (var key in all_strokes)
				combined_stroke["inner_shape"] = combined_stroke["inner_shape"].concat(all_strokes[key].getPoints());
		}
		
		console.log(combined_stroke, countMouseDown);
		
	}
	</script>	
	
<canvas id="canvas" rezise="true"></canvas>
