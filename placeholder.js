/*global $*/
/*global elements*/

// have to add jquerry each time a new element is added
// add_jquerry function is called by the mouse_up

// get current settings for position
function get_pos(element){
	var top  = $(element).css("top");
	var left = $(element).css("left");
	var h    = $(element).css("height");
	var w    = $(element).css("width");
	var position = ' position:absolute; left:' + left
		+ '; top:' + top + '; width:' + w + '; height:' + h + '; ';
	return position;
}

var add_jquery = function(){
    
    //---------------- PICTURE ----------------
    
    $("#picture").click(function(){
    	var path = prompt("Insert picture url.");
    	if (path != "")
        	$(this).css("content", "url("+ path +")");
    });
    
    //---------------- VIDEO ----------------
    
    $("#vid_placeholder").click(function(){
    	var path = prompt("Insert youtube url. (or use https://www.youtube.com/embed/apyPURp2FFY)");
    	// insert video 
    	if (path){
    	    var height = $(this).css("height");
    	    var width = $(this).css("width");
    		$(".elem_container").append("<div id='vid'"
    		    + " style= '" + get_pos(this) + "'>"
    		    + "<iframe src='" + path 
    		    + "' height='"+ height +"'></iframe>"
    		    + "</div>");
    		// remove the placeholder
    		$(this).remove();
    		var top = $(this).css("top");
    		var code = "&lt;iframe src='" +path + "'&gt;&lt;/iframe&gt;"
            addCode(top, code);
    	}
    });
    
    //---------------- BUTTON ----------------
    
    $("#button_placeholder").click(function(){
    	var path = prompt("Insert Button link url. (or use https://github.com/josiahcoad)");
    	var message = prompt("What should the button say?");
    	// insert video 
    	if (path && message){
    	    var strH = $(this).css("height");
    	    var boxH = parseFloat( strH.substring(0,strH.length-2) )
    	    var txtH = (7/10)*boxH;
    		$(".elem_container").append("<a href='" + path + "'"
    		    + " style= '" + get_pos(this) 
    		    + " font-size:"+ txtH +"px; line-height: "+ txtH +"px'"
    		    + " class='btn btn-info' >"
    		    + message + "</a>");
		    // remove the placeholder
		    $(this).remove();
		    var top = $(this).css("top");
		    var code = "&lt;a href=" + path + " class='btn btn-info'&gt;" + message + "&lt;/button&gt;";
            addCode(top, code);
    	}
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