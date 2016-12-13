/*global $*/


function pos(left, top, w, h){
	var position = ' style=" position:absolute; left:' + left
		+ 'px; top:' + top + 'px; width:' + w + 'px; height:' + h + 'px;" ';
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
					+ pos(left, top, w, h) + "></img>")
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
					+  pos(left, top, w, h) + ">")
}

var addCheckBox = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<input type='checkbox' name='' value=''" 
					+ pos(left, top, w, h) + ">Lorem Ipsum")
}

var addRadioButton = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<input type='radio' name='' value=''"	
					+ pos(left, top, w, h) + ">Lorem Ipsum")
	
}