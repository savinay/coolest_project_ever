/* global $ */
var addhere = function(x, y){
	var style = 'style="position:absolute; left:' +x+'px; top: '+y+'px"';
	$('.hello').after("<p "+style+">x"+x+" y"+y+" </p>");
	
}
$('document').ready(function(){
	var x = parseInt(prompt("enter x ([50, 500]): "), 10);
	var y = parseInt(prompt("enter y ([50, 500]): "), 10);
	addhere(x, y);
});
