/**
 * Canvas parameters for FACS sketching tool
 **/
X_ORIGIN = 60;
Y_ORIGIN = 260;

X_AXIS_LAST_VALUE = 560;
Y_AXIS_LAST_VALUE = 20;

/* Last point on the axis in the direction of the arrow */
X_AXIS_LENGTH_PX = X_AXIS_LAST_VALUE - X_ORIGIN;
Y_AXIS_LENGTH_PX = Y_ORIGIN - Y_AXIS_LAST_VALUE;

Y_AXIS_TICKS = [20, 40, 60, 80];
Y_AXIS_LENGTH_VALUE = 100;

CANVAS_NOISE_WIDTH = 450;
CANVAS_NOISE_HEIGHT = 250;

CANVAS_SKETCH_WIDTH = 600;
CANVAS_SKETCH_HEIGHT = 300;

function addNoise(points, factor) {
  var factor = factor || 0.05;
  var noisy_points = [];
  _.each(points, function (point) {
    noisy_points.push([point[0], point[1] * (1 - factor + 2 * factor * Math.random())]);
  });
  return noisy_points;
}
