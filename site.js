/* global $ */
$(document).ready(function(){
    $(".target div").click(function(){
        $(this).css("height", "100px");
    });
    $(".snap").click(function(){
        $(".target").children().toggleClass("col-md-4");
    });
});