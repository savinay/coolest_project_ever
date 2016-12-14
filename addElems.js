/*global $*/


function pos(left, top, w, h){
	var position = ' style=" position:absolute; left:' + left
		+ 'px; top:' + top + 'px; width:' + w + 'px; height:' + h + 'px;" ';
	return position;
}

function posCode(top){
	var position = ' style=" position:absolute; top:' + top + '" ';
	return position;
}

var addTextArea = function(w, h, left, top){
	var elements=$(".elem_container");
	var id = " id=drawnObject ";
	elements.append("<textarea placeholder='You can add text here!'"
					+ id
					+ pos(left, top, w, h) + "></textarea>");
}

var addVideo = function(w, h, left, top){
	var elements=$(".elem_container");
	var id = " id=vid_placeholder ";
 	elements.append("<img src=http://cliparts.co/cliparts/qTB/oq9/qTBoq959c.png "
					+ id 
					+ pos(left, top, w, h) + "></img>");
}

var addDropdown = function(w, h, left, top){
	var elements=$(".elem_container");
	elements.append("<select" 
					+ pos(left, top, w, h)
					+ "><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='opel'>Opel</option><option value='audi'>Audi</option></select>")
}

var addButton = function(w, h, left, top){
	var elements=$(".elem_container");
	var defaultImg = "http://www.downloadclipart.net/large/11034-small-button-design.png";
	var id = " id=button_placeholder ";
	elements.append("<img src="
					+ defaultImg
					+ id
					+ pos(left, top, w, h) + "></img>");
}

var addImage = function(w, h, left, top){
	var elements=$(".elem_container");
	var id = " id=drawnObject ";
	var defaultImg = "https://getuikit.com/docs/images/placeholder_600x400.svg";
	elements.append("<img id='picture' src= "
					+ defaultImg
					+ id
					+ pos(left, top, w, h) + "></img>");
}

var addSearchBar = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<input type='text' name='search' placeholder='Search..'" 
					+  pos(left, top, w, h) + " class='form-control'>")
}

var addCheckBox = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<div style='position:absolute; "
					+ "top: "+ top +"px; left:"+ left +"px; '>"
					+ "<input type='checkbox'> Lorem Ipsum</div>");
}

var addRadioButton = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<div style='position:absolute; "
					+ "top: "+ top +"px; left:"+ left +"px; '>"
					+ "<input type='radio'> Lorem Ipsum</div>");
}

var addNavbar = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<nav class='navbar navbar-default'" + pos(left, top, w) + "><div class='container-fluid'><div class='navbar-header'><a class='navbar-brand' href='#'>Brand</a></div><div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'><ul class='nav navbar-nav'><li class='active'><a href='#'>Home <span class='sr-only'>(current)</span></a></li><li><a href='#'>About Us</a></li></ul></div></div></nav>")
}

var addCode = function (top,code) {
	var elements = $("#code");
	elements.append("<pre" + posCode(top) + "><code>" + code + "</code></pre>")
}