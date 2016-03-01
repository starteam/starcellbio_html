/**
 * Sketching tool
 */
function draw_graph_background(){
    var x, y;
     /* grid */
    for (x = 0.5; x < 600; x += 20) {
        draw_line(x, 0, x, 300, '#eee');
    }
    for (y = 0.5; y < 300; y += 20) {
        draw_line(0, y, 600, y, '#eee');
    }
    /* x axis */
    draw_line(40, 260, 560, 260);
    /* y axis */
    draw_line(40, 20, 40, 260);
    /* arrows */
    draw_line(40, 20, 30, 30);
    draw_line(40, 20, 50, 30);

    draw_line(550, 250, 560, 260);
    draw_line(550, 270, 560, 260);
    paper.view.update();
}

function load_sketch_tool() {
    paper.setup('myCanvas');

    draw_graph_background();

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