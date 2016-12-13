/*global $*/

// have to add jquerry each time a new element is added
// so this function is called by the mouse_up
$("button").toggleClass("btn btn-primary");


var add_jquery = function(){
    $("#picture").mouseover(function(){
    	$(this).fadeTo(500, 1);
    });
    $("#picture").mouseleave(function(){
    	$(this).fadeTo(500, .25);
    });
    $("#picture").click(function(){
    	var path = prompt("Insert picture url.");
    	$(this).css("content", "url("+ path +")");
    });
    
    
    $("#vid_placeholder").click(function(){
    	var path = prompt("Insert youtube url. (or use https://www.youtube.com/embed/XGSy3_Czz8k)");
    	var top = $(this).css("top");
    	var left = $(this).css("left");
    	var height = $(this).css("height");
        $(this).remove();
		$('.sketchProject').after("<div" 
		    + " style='position:absolute; top:"+top+"; left:"+left+"; '>"
		    + "<iframe src='" + path + "' height="+height+"></iframe>"
		    + "</div>");
    });
    
    $("#button_placeholder").click(function(){
    	var path = prompt("Insert Button link url. (or use https://github.com/josiahcoad)");
        var onclick = "location.href = 'www.youtube.com';"
        // "location.href = " + "'" + path + "' ";
    	var click_action = " onclick=" + onclick;
    	console.log(click_action);
    	var top = $(this).css("top");
    	var left = $(this).css("left");
    	var h = $(this).css("height");
    	var w = $(this).css("width");
		var position = ' style=" position:absolute; left:' + left
    	+ '; top:' + top + '; width:' + w + '; height:' + h + ';" ';
        $(this).remove();
		$('.sketchProject').after("<button " + position + click_action + ">BUTTON</button>");
    });

    $("button").toggleClass("btn btn-primary");
    
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
