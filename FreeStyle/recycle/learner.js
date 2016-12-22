/*--------------------------------------------------------------------
	First Try at making an algorithm which would learn from scratch
	how to identify and learn from its mistakes.
	Not currently implimented.
--------------------------------------------------------------------*/

<html>
	<div style="border-style: outset; position:absolute; left: 10; top: 50; background-color: lightgreen; visibility:hidden " >
		<h3>[CVA, CVP, ERA, ERP]</h3>
		<ul id="elementlist">
			<li id="rectangle">Rectangle...[<span>0 0 0 0</span>]</li>
			<li id="circle">Circle.........[<span>0 0 0 0</span>]</li>
			<li id="triangle">Triangle.....[<span>0 0 0 0</span>]</li>
			<li id="line">Line...........[<span>0 0 0 0</span>]</li>
		</ul>
		<center style="font-family: 'Montserrat', sans-serif;">I think its a
						<span id="prediction">...nothing yet.</span></center>
	</div>
</html>

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
