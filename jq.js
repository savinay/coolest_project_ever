/*global $*/
/*global $elements*/

// have to add jquerry each time a new element is added
// add_jquerry function is called by the mouse_up

// get current settings for position
function get_pos(element){
	var top  = $(element).css("top");
	var left = $(element).css("left");
	var h    = $(element).css("height");
	var w    = $(element).css("width");
	var position = ' style=" position:absolute; left:' + left
		+ 'px; top:' + top + 'px; width:' + w + 'px; height:' + h + 'px;" ';
	return position;
}

var add_jquery = function(){
    $("#picture").mouseover(function(){
    	$(this).fadeTo(500, 1);
    });
    $("#picture").mouseleave(function(){
    	$(this).fadeTo(500, .25);
    });
    $("#picture").click(function(){
    	var path = prompt("Insert picture url.");
    	if (path != "")
        	$(this).css("content", "url("+ path +")");
    });
    
    //---------------------------------------------------
    
    $("#vid_placeholder").click(function(){
    	var path = prompt("Insert youtube url. (or use https://www.youtube.com/embed/XGSy3_Czz8k)");
    	// insert video 
    	if (path != "")
    		$elements.append("<div" 
    		    + get_pos(this) + ">"
    		    + "<iframe src='" + path +"></iframe>"
    		    + "</div>");
		// remove the placeholder
		$(this).remove();
    });
    
    //----------------------------------------------------
    
    $("#button_placeholder").click(function(){
    	var path = prompt("Insert Button link url. (or use https://github.com/josiahcoad)");
        var onclick = "location.href = 'www.youtube.com';"
    	// insert video 
    	if (path != "")
        	var click_action = " onclick=" + onclick;
    		$elements.after("<button class='btn btn-primary'" + get_pos(this) + click_action + ">BUTTON</button>");
		// remove the placeholder
		$(this).remove();
    });
    
    // trying to make elems draggable... not working
    // the element doesn't get "unselected" when the mouse is released
    $("#draggable").mousedown(function(event){
    	$this = $(this);
    	$this.css("box-shadow", "10px 10px grey");
    	var init_X = event.pageX; // mouse init X
    	var init_Y	= event.pageY; // mouse init Y
    	var elem = $this.offset(); // element init position
    	$(document).mousemove(function(event){
    		var xmove = elem.left + (event.pageX - init_X);
    		var ymove = elem.top + (event.pageY - init_Y);
    		$this.css('top',ymove+"px");
    		$this.css('left',xmove+"px");
    		$(document).mouseup(function(){
    			$this.css("box-shadow", "");
    		});
    	});
    });
}