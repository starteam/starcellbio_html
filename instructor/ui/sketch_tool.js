/**
 * Sketching tool
 */

var AXIS_MARK_WIDTH = 4;
var xMax, yMax, xAxisScale, dataPoints = [],
    minNoise = 0, maxNoise = 20, noise = 10;

function drawGraphBackground(xUpperBound, yUpperBound, scale) {
    var x, y, dx, dy, xAxisTicks, yAxisTicks;
     // grid
    for (x = X_ORIGIN; x <= X_AXIS_LAST_VALUE; x += 10) {
        drawLine(x, Y_ORIGIN, x, Y_AXIS_LAST_VALUE, 'lavender');
    }
    for (y = Y_ORIGIN; y >= Y_AXIS_LAST_VALUE; y -= 10) {
        drawLine(X_ORIGIN, y, X_AXIS_LAST_VALUE, y, 'lavender');
    }
    // x-axis
    drawLine(X_ORIGIN, Y_ORIGIN, X_AXIS_LAST_VALUE, Y_ORIGIN);
    // y-axis
    drawLine(X_ORIGIN, Y_ORIGIN, X_ORIGIN, Y_AXIS_LAST_VALUE);
    // x-axis can be linear or logarithmic
    xAxisScale = scale;
    // Calculating x-axis and y-axis labels.
    xMax = parseInt(xUpperBound);
    yMax = parseInt(yUpperBound);
    // Origin tick and label for x-axis an y-axis
    drawXTickLabel(0, 0);
    drawYTickLabel(0, 0);
    // Generate x ticks and labels automatically
    if (xAxisScale === 'log') {
        xMax = log10(xMax);
        for (i = 1; i <= xMax; i++) {
            drawXTickLabel(i);
        }
    }
    else {
        dx = xMax/10;
        for (i = 1; i <= 10; i++) {
            drawXTickLabel(i*dx);
        }
    }
    // Generate y ticks and labels automatically
    dy = yMax/10;
    for (i = 1; i <= 10; i++) {
        drawYTickLabel(i*dy);
    }
    drawYAxisName();
    paper.view.update();
}

function getXPix(value) {
    return X_ORIGIN + (value * X_AXIS_LENGTH_PX / xMax);
}

function getYPix(value) {
    return Y_ORIGIN - (value * Y_AXIS_LENGTH_PX / yMax);
}

function drawLine(x1 ,y1 ,x2 ,y2, color){
    color = color || 'black';
    var path = new Path.Line(new Point(x1, y1), new Point(x2, y2));
    path.strokeColor = color;
}

function drawText(x, y, value, justification){
    justification = (typeof justification !== 'undefined') ? justification : 'center';
    var text_obj = new PointText(new Point(x, y));
    text_obj.content = value;
    // adjusting for the height of the text
    text_obj.position.y += 5;
    text_obj.style = {
        fontSize: 12,
        justification: justification
    };
    return text_obj;
}

function drawXTickLabel(x) {
    var xp, yp, str;
    xp = getXPix(x);
    yp = Y_ORIGIN + 12;
    str = x.toFixed(0);
    if (xAxisScale === 'log' && x !== 0) {
        str = '10^' + str;
    }
    drawLine(xp, Y_ORIGIN, xp, Y_ORIGIN + AXIS_MARK_WIDTH);
    drawText(xp, yp, str);
}

function drawYTickLabel(y) {
    var xp, yp;
    xp = X_ORIGIN - 7;
    yp = getYPix(y);
    drawLine(X_ORIGIN, yp, X_ORIGIN - AXIS_MARK_WIDTH, yp);
    drawText(xp, yp, y, 'right');
}

function drawXAxisName(condition) {
    drawText(X_ORIGIN + X_AXIS_LENGTH_PX / 2, Y_ORIGIN + 30, condition);
    paper.view.update();
}

function drawYAxisName() {
    var text = drawText(X_ORIGIN - 45, Y_ORIGIN - Y_AXIS_LENGTH_PX / 2, 'Number of cells (thousands)');
    // rotate clockwise
    text.rotate(270);
}

function log10(val) {
    return Math.log(val) / Math.LN10;
}

function loadSketchTool(xUpperBound, yUpperBound, scale) {
    var tool, curve, noisyCurve, points,
        ADD_POINT = 0, SELECT_POINT = 1, mode = ADD_POINT, ptIndex = -1;

    mypapers[2].setup('histogramCanvas');
    drawGraphBackground(xUpperBound, yUpperBound, scale);

    tool = new Tool();
    noisyCurve = new Path({
        strokeColor: 'lightslategray',
        strokeWidth: 1
    });
    curve = new Path({
        strokeColor: 'dodgerblue',
        strokeWidth: 3
    });
    points = new Group();

    tool.onMouseDown = mouseDownEvent;
    tool.onMouseDrag = mouseDragEvent;
    tool.onMouseUp = mouseUpEvent;

    // Noise slider
    $('.scb_ab_s_noise_slider').slider({
        orientation: 'horizontal',
        range: 'min',
        min: minNoise,
        max: maxNoise,
        value: noise,
        slide: setNoise,
        change: setNoise,
        create: setAriaAttributes
    })
    // Show points checkbox
    $('.scb_ab_s_show_points').on('click', function(){
        showPoints($(this).is(':checked'));
    });
    // Add point radio
    $('.scb_ab_s_add_point').on('click', function(){
        mode = ADD_POINT;
    });
    // Select point radio
    $('.scb_ab_s_select_point').on('click', function(){
        mode = SELECT_POINT;
    });
    // Reset histogram button
    $('.reset_histogram').on('click', function(){
        resetCanvas();
    });
    // Close draw histogram dialog
    $('.scb_ab_f_close_dialog').click(function () {
        $(".scb_ab_s_preview_canvas_div").hide();
        $('.scb_ab_s_analyze_dialog').css('visibility', 'hidden');
        resetCanvas();
    });

    function mouseDownEvent (event) {
        mousePoint = clipToBounds(event.point);
        if (mode === ADD_POINT) {
            points.addChild(new Path.Circle({
                center: mousePoint,
                radius: 3,
                fillColor: 'darkblue'
            }));
            curve.add(mousePoint);
            dataPoints.push([mousePoint.x, mousePoint.y]);
            ptIndex = dataPoints.length - 1;
        }
        else if (mode === SELECT_POINT) {
            var min = Number.MAX_VALUE, dist;
            ptIndex = -1;
            _.each(points.children, function(point, index) {
                dist = point.position.getDistance(mousePoint);
                if (dist < min) {
                    min = dist;
                    ptIndex = index;
                }
            });
            if (ptIndex >= 0) {
                points.children[ptIndex].position = mousePoint;
                curve.segments[ptIndex].point = mousePoint;
                dataPoints[ptIndex][0] = mousePoint.x;
                dataPoints[ptIndex][1] = mousePoint.y;
            }
        }
    }

    function mouseDragEvent(event) {
        mousePoint = clipToBounds(event.point);
        if (ptIndex >= 0) {
            points.children[ptIndex].position = mousePoint;
            curve.segments[ptIndex].point = mousePoint;
            dataPoints[ptIndex][0] = mousePoint.x;
            dataPoints[ptIndex][1] = mousePoint.y;
        }
    }

    function mouseUpEvent(event) {
        mousePoint = clipToBounds(event.point);
        if (ptIndex >= 0) {
            points.children[ptIndex].position = mousePoint;
            curve.segments[ptIndex].point = mousePoint;
            dataPoints[ptIndex][0] = mousePoint.x;
            dataPoints[ptIndex][1] = mousePoint.y;
        };
        noisyCurve.removeSegments();
        var noisyPoints = getNoisyPoints(dataPoints, noise);
        _.each(noisyPoints, function(point) {
            noisyCurve.add(point);
        });
    }

    function setNoise(event, ui) {
        noise = ui.value;
        noisyCurve.removeSegments();
        var noisyPoints = getNoisyPoints(dataPoints, noise);
        _.each(noisyPoints, function(point) {
            noisyCurve.add(point);
        });
        paper.view.update();
    }

    function setAriaAttributes(event, ui) {
        $('.scb_ab_s_noise_slider').attr('role', 'slider');
        $('.scb_ab_s_noise_slider .ui-slider-handle').attr({
          'aria-labelledby': "scb_s_wb_exposure_time_value",
          'aria-valuemin': "0",
          'aria-valuemax': "50",
          'aria-valuenow': "25",
          // 'aria-valuetext': ""
        });
      }

    // Clear canvas
    function resetCanvas() {
        curve.removeSegments();
        noisyCurve.removeSegments();
        points.removeChildren();
        dataPoints.length = 0;
        paper.view.update();
    }
    // Remove drawn graph, enable graphing
    function showPoints(visible) {
        curve.visible = visible;
        points.visible = visible;
        paper.view.update();
    }

    function clipToBounds(point) {
        var x, y;
        x = point.x < X_ORIGIN
            ? X_ORIGIN
            : (point.x > X_AXIS_LAST_VALUE ? X_AXIS_LAST_VALUE : point.x);
        y = point.y > Y_ORIGIN
            ? Y_ORIGIN
            : (point.y < Y_AXIS_LAST_VALUE ? Y_AXIS_LAST_VALUE : point.y);
        return new Point(x, y);
    }
}

/* Translate data points to normal coordinate system */
function getDataPoints(){
    var correctPoints = [];
    _.each(getNoisyPoints(dataPoints, noise), function(point) {
        correctPoints.push([point[0] - X_ORIGIN , Y_ORIGIN - point[1]]);
    });
    return correctPoints;
}
/*Converts normal points to Canvas's point of reference
* where origin is at top-left */
function convertToCanvas(data) {
    return _.map(data, function (point) {
        var canvasPoint=[];
        canvasPoint[0] = point[0] + X_ORIGIN;
        canvasPoint[1] = Y_ORIGIN - point[1];
        return canvasPoint;
    });
}
