var addHereTextArea = function(w, h, left, top){
	// if ($("#gridOnButton").hasClass("gridOn")){
		// var position=' style="width:' + w + 'px; height:' + h + 'px;" ';
		// $insertion=$('.col-md-12');
	// }
	// else{
		var position = ' style=" position:absolute; left:' + left
		+ 'px; top:' + top + 'px; width:' + w + 'px; height:' + h + 'px;" ';
		$insertion=$('.sketchProject');
	// }
	var id = " id=drawnObject ";
	$insertion.after("<textarea id='draggable' placeholder='You can add text here!'"
							+ id + position + "></textarea>");
}

var addHereVideo = function(w, h, left, top){
	var position = ' style=" position:absolute; left:' + left
	+ 'px; top:' + top + 'px; width:' + w + 'px; height:' + h + 'px;" ';
	$insertion=$('.sketchProject');
	var id = " id=vid ";
	$insertion.after("<div" + id + "> <iframe src=''"
							 + position + "></iframe></div>");
}

var addHereImage = function(w, h, left, top){
	var position = ' style=" position:absolute; left:' + left
		+ 'px; top:' + top + 'px; width:' + w + 'px; height:' + h + 'px;" ';
	var id = " id=drawnObject ";
	$('.sketchProject').after("<img id='draggable' src=https://getuikit.com/docs/images/placeholder_600x400.svg "
							+ id + position + "></img>");
}
