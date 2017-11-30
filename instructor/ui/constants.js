/**
 * Canvas parameters for FACS sketching tool
 **/
X_ORIGIN = 60;
Y_ORIGIN = 320;

X_AXIS_LAST_VALUE = 360;
Y_AXIS_LAST_VALUE = 20;

/* Last point on the axis in the direction of the arrow */
X_AXIS_LENGTH_PX = X_AXIS_LAST_VALUE - X_ORIGIN;
Y_AXIS_LENGTH_PX = Y_ORIGIN - Y_AXIS_LAST_VALUE;

function addNoise(points, factor) {
  var factor = factor || 0.05;
  var noisy_points = [];
  _.each(points, function (point) {
    noisy_points.push([point[0], point[1] * (1 - factor + 2 * factor * Math.random())]);
  });
  return noisy_points;
}

function getNoisyPoints(points, rpix) {
  var i, len, pt1, pt2, x, y, dx, dy, l, ux, uy, s,
      noisyPoints = [], spix = 2, yrand;
  for (i = 0, len = points.length-1; i < len; i++) {
    pt1 = points[i];
    pt2 = points[i+1];
    dx = pt2[0] - pt1[0];
    dy = pt2[1] - pt1[1];
    // Length of line segment between points
    l = Math.sqrt(dx*dx + dy*dy);
    // Coordinates of unit vector on that line segment
    ux = dx/l;
    uy = dy/l;
    s = 0;
    // Introduce new points every spix on the line segment and add randomness to y
    while (s < l) {
      yrand = Math.floor(rpix *(2*Math.random() - 1)); // Random integer in [-rpix, rpix]
      x = pt1[0] + s*ux;
      y = clipToYBounds(pt1[1] + s*uy + yrand);
      noisyPoints.push([x, y]);
      s += spix;
    }
  }
  return noisyPoints;
}

function clipToYBounds(y) {
    return y > Y_ORIGIN ? Y_ORIGIN : (y < Y_AXIS_LAST_VALUE ? Y_AXIS_LAST_VALUE : y);
}

FILTERS = ['red', 'blue', 'green', 'merge'];
FLUORESCENT_TYPES = ['IF', 'DYE-FLU', 'FLUOR'];
