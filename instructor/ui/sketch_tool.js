/**
 * Sketching tool
 */
X_ORIGIN = 60;
Y_ORIGIN = 260;

X_AXIS_LAST_VALUE = 560;
Y_AXIS_LAST_VALUE = 20;

/* Last point on the axis in the direction of the arrow */
X_AXIS_LENGTH_PX = X_AXIS_LAST_VALUE - X_ORIGIN;
Y_AXIS_LENGTH_PX = Y_ORIGIN - Y_AXIS_LAST_VALUE;

Y_AXIS_TICKS = [20, 40, 60, 80];

function draw_graph_background(x_upper_bound, tick_values){
    var x, y, x_axis_ticks;
     /* grid */
    for (x = 0.5; x < 600; x += 20) {
        draw_line(x, 0, x, 300, '#eee');
    }
    for (y = 0.5; y < 300; y += 20) {
        draw_line(0, y, 600, y, '#eee');
    }
    /* x axis */
    draw_line(X_ORIGIN, Y_ORIGIN, X_AXIS_LAST_VALUE, Y_ORIGIN);
    /* y axis */
    draw_line(X_ORIGIN, Y_ORIGIN - Y_AXIS_LENGTH_PX, X_ORIGIN, Y_ORIGIN);
    /* y axis arrows */
    draw_line(X_ORIGIN, Y_ORIGIN - Y_AXIS_LENGTH_PX, X_ORIGIN - 10, Y_AXIS_LAST_VALUE + 10);
    draw_line(X_ORIGIN, Y_ORIGIN - Y_AXIS_LENGTH_PX, X_ORIGIN + 10, Y_AXIS_LAST_VALUE + 10);
    /* x axis arrows */
    draw_line(X_AXIS_LAST_VALUE - 10, Y_ORIGIN - 10, X_AXIS_LAST_VALUE, Y_ORIGIN);
    draw_line(X_AXIS_LAST_VALUE - 10, Y_ORIGIN + 10, X_AXIS_LAST_VALUE, Y_ORIGIN);

    /* Calculating axis labels */
    x_axis_ticks = tick_values.split(",").map(function(x){
        return parseInt(x)
    });
    x_upper_bound = parseInt(x_upper_bound);
    var x_coor, y_coor;
    _.each(x_axis_ticks, function(value){
        x_coor = X_AXIS_LENGTH_PX * value / x_upper_bound + X_ORIGIN;
        y_coor = Y_ORIGIN + 13;
        printText(x_coor, y_coor, value);
    });
    _.each(Y_AXIS_TICKS, function(value){
        x_coor = X_ORIGIN - 10;
        y_coor = Y_ORIGIN - (Y_AXIS_LENGTH_PX * value / 100) + 5;
        printText(x_coor, y_coor, value);
    });
    nameYAxis();
    paper.view.update();
}

function load_sketch_tool(x_upper_bound, tick_values) {
    paper.setup('myCanvas');

    draw_graph_background(x_upper_bound, tick_values);

    var path;
    var tool = new Tool();
    undostack = [];

    var drawvector = new Path.Line({
        strokeColor: 'lightgrey',
        strokeWidth: 2,
        visible: false
    });


    function mouseDownEvent (event) {
        path = new Path();

        undostack.push(path);
        path.strokeColor = 'blue';
        path.strokeWidth = '3';
        path.add(event.point);
        data_points = [];
        data_points.push([event.point.x, event.point.y]);
    }
    function mouseDragEvent(event) {
        $('#myCanvas').css('cursor', 'none');
        var thedistance = 25;
        var lastPoint = path.lastSegment.point;

        drawvector.segments[0].point = lastPoint;
        drawvector.segments[1].point = event.point;
        drawvector.visible = true;

        var vector = event.point.subtract(lastPoint);
        var new_point;
        if (vector.length > thedistance) {
            new_point = lastPoint.add(vector.normalize().multiply(vector.length - thedistance));
            path.add(new_point);
            data_points.push([new_point.x, new_point.y]);
        }
    }
    function mouseUpEvent(event) {
        $('#myCanvas').css('cursor', 'inherit');
        path.simplify(5);
        drawvector.visible = false;
        tool.off('mousedown', mouseDownEvent);
        tool.off('mousedrag', mouseDragEvent);
        tool.off('mouseup', mouseUpEvent);
    }
    tool.onMouseDown = mouseDownEvent;
    tool.onMouseDrag = mouseDragEvent;
    tool.onMouseUp = mouseUpEvent;

    /* Reset histogram button */
    $('.reset_histogram').click(function(){
        reset_canvas();
    });
    /* Close draw histogram dialog */
    $('.scb_ab_f_close_dialog').click(function () {
        $('.scb_ab_s_histogram_dialog').css('visibility', 'hidden');
        reset_canvas();
    });
    /* Remove drawn graph, enable graphing */
    function reset_canvas(){
        if (undostack.length > 0) {
            undostack.pop().remove();
            data_points = [];
        }
        tool.on('mousedown', mouseDownEvent);
        tool.on('mousedrag', mouseDragEvent);
        tool.on('mouseup', mouseUpEvent);
        paper.view.update();

    }
}


function draw_line(x1 ,y1 ,x2 ,y2, color){
    color = color || 'black';
    var path = new Path.Line(new Point(x1, y1), new Point(x2, y2));
    path.strokeColor = color;

}

function nameXAxis(condition){
    printText(X_ORIGIN + X_AXIS_LENGTH_PX, Y_ORIGIN + 25, condition);
    paper.view.update();
}
function nameYAxis(){
    var text = printText(X_ORIGIN - 45, Y_ORIGIN - Y_AXIS_LENGTH_PX / 2, "Number of cells (thousands)");
    /* rotate clockwise */
    text.rotate(270);
}
/* Print PointText */
function printText(x, y, value){
    var text_obj = new paper.PointText(new paper.Point(x, y));
    text_obj.content = value;
    // need to subtract half of the width from x
    text_obj.position.x -= text_obj.bounds.width / 2;
    return text_obj;
}

/* Translate data points to normal coordinate system */
function getDataPoints(){
    var correct_points = [];
    _.each(data_points, function(point) {
        correct_points.push([point[0] - X_ORIGIN , Y_ORIGIN - point[1]]);
    });
    return correct_points;
}
/*Converts normal points to Canvas's point of reference
* where origin is at top-left */
function convertToCanvas(data) {
    return _.map(data, function (point) {
        var canvas_point=[];
        canvas_point[0] = point[0] + X_ORIGIN;
        canvas_point[1] = Y_ORIGIN - point[1];
        return canvas_point;
    });
}
