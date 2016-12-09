function distance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

function codeGenerationTextArea(coordinates) {
    var max_x = coordinates.max_x;
    var max_y = coordinates.max_y;
    var min_x = coordinates.min_x;
    var min_y = coordinates.min_y;
    var width = max_x - min_x;
    var height = max_y - min_y;
    return [width, height];
}