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
	var code = "&lt;textarea placeholder='You can add text here!'"
					+ id
					+ pos(left, top, w, h) + "&gt;&lt;/textarea&gt;";
	addCode(top, code);
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
					+ "><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='opel'>Opel</option><option value='audi'>Audi</option></select>");
	var code = "&lt;select" 
					+ pos(left, top, w, h)
					+ "&gt;&lt;option value='volvo'&gt;Volvo&lt;/option&gt;&lt;option value='saab'&gt;Saab&lt;/option&gt;&lt;option value='opel'&gt;Opel&lt;/option&gt;&lt;option value='audi'&gt;Audi&lt;/option&gt;&lt;/select&gt;";
	addCode(top, code);
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
	var string = "<img id='picture' src= "
					+ defaultImg
					+ id
					+ pos(left, top, w, h) + "></img>";
	// var code = string.replace(/\</g,"&lt;");
	// code = string.replace(/\>/g,"&gt;");
	var code = "&lt;img id='picture' src= "
					+ defaultImg
					+ id
					+ pos(left, top, w, h) + "&gt;&lt;/img&gt;"
	elements.append(string);
	addCode(top, code);
}

var addSearchBar = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<input type='text' name='search' placeholder='Search..'" 
					+  pos(left, top, w, h) + " class='form-control'>")
	var code = "&lt;input type='text' name='search' placeholder='Search..'" 
					+  pos(left, top, w, h) + " class='form-control'&gt;";
	addCode(top, code);
}

var addCheckBox = function (w, h, left, top) {
	var elements=$(".elem_container");

	elements.append("<div style='position:absolute; "
					+ "top: "+ top +"px; left:"+ left +"px; '>"
					+ "<input type='checkbox'> Lorem Ipsum</div>");

	var code = "&lt;input type='checkbox' name='' value=''" 
					+ pos(left, top, w, h) + "&gt;Lorem Ipsum";
	addCode(top, code);
}

var addRadioButton = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<div style='position:absolute; "
					+ "top: "+ top +"px; left:"+ left +"px; '>"
					+ "<input type='radio'> Lorem Ipsum</div>");

	var code = "&lt;input type='radio' name='' value=''"	
					+ pos(left, top, w, h) + "&gt;Lorem Ipsum";
	addCode(top, code);
	
}

var addNavbar = function (w, h, left, top) {
	var elements=$(".elem_container");
	elements.append("<nav class='navbar navbar-default'" + pos(left, top, w) + "><div class='container-fluid'><div class='navbar-header'><a class='navbar-brand' href='#'>Brand</a></div><div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'><ul class='nav navbar-nav'><li class='active'><a href='#'>Home <span class='sr-only'>(current)</span></a></li><li><a href='#'>About Us</a></li></ul></div></div></nav>")
	var code = "&lt;nav class='navbar navbar-default'&gt;&lt;div class='container-fluid'&gt;&lt;div class='navbar-header'&gt;&lt;a class='navbar-brand' href='#'&gt;Brand&lt;/a&gt;&lt;/div&gt;&lt;div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'&gt;&lt;ul class='nav navbar-nav'&gt;&lt;li class='active'&gt;&lt;a href='#'&gt;Home &lt;span class='sr-only'&gt;(current)&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;&lt;li&gt;&lt;a href='#'&gt;About Us&lt;/a&gt;&lt;/li&gt;&lt;li&gt;&lt;a href='#'&gt;Services&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;&lt;/div&gt;&lt;/nav&gt;";
	addCode(top, code);
}

var addCode = function (top,code) {
	var elements = $("#code");
	elements.append("<pre" + posCode(top) + "><code>" + code + "</code></pre>")
}