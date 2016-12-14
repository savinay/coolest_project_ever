/*global $*/

$("#recognitionOnButton").click(function(){
	toggleRecognizer();
});

$("#recognizeFigure").click(function() {
	recognizeShape();	
});

$("#reset").click(function() {
	resetAll();
});


	// add a button for switching between drawing text and images
   	function toggleRecognizer() {
		if (recognizerOn)
			newstate = "OFF";
		else
			newstate = "ON";
		$("#recognitionOnButton").text("Turn Recognizer " + newstate);
		recognizerOn = !recognizerOn;
	}

	// use keyboard shortcuts
	$(document).on("keypress", function (e) {
		if (e.which == 32) // space bar pressed
			toggleRecognizer();
		if (e.which == 82) // 'R' pressed
			location.reload();
		if (e.which == 114) // 'r' pressed
			recognizeShape();
	});