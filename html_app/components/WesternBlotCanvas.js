if (typeof (scb.components) == 'undefined') {
  scb.components = {};
}

scb.components.WesternBlot = function scb_components_WesternBlot(state, context) {
  var self = this;

  self.initialize_bias = function() {
    var background = [];
    var height = 2000;
    var up = 0;
    var down = 0;
    var dump_factor_slope = -.2;
    var dump_factor_intercept = 0.6;
    var rnd_multiplier = 32;
    var rnd_trim = .007;

    // clear background array
    for (var h = 0; h < height; h++) {
      background[h] = 0;
    }

    if (_.find(context.template.primary_anti_body[state.gel.primary_anti_body].secondary, function(e) {
        return e == state.gel.secondary_anti_body;
      })) {

      // move background up or down
      var trigger = 0;
      for (var h = 50; h < height; h++) {
        var rnd2 = Math.random();
        var rnd3 = Math.random();
        if (rnd2 < rnd_trim || rnd3 < rnd_trim) {
          trigger++;
          if (trigger > 2) {
            rnd_trim = rnd_trim * .5;
          }
        }
        up = up * (dump_factor_intercept + Math.random() * dump_factor_slope) + (rnd2 < rnd_trim ? rnd_multiplier : 0) + Math.random() * 2 / 3;
        down = down * (dump_factor_intercept + Math.random() * dump_factor_slope) + (rnd3 < rnd_trim ? rnd_multiplier : 0) + Math.random() * 2 / 3;
        background[h] += up;
        background[height - h] += down;
      }

    }
    var lane_yslope = [];
    var lanes = state.lanes_length;
    var yyslope = (Math.random() - .5) * 2;
    var yslope = yyslope;
    var middle = 5 + Math.round(Math.random() * 3);
    if (Math.random() < .5) {
      for (var lane = 0; lane < lanes; lane++) {
        yslope = (lane - middle) * (lane - middle) * yyslope / 400;
        yslope = yslope > .04 ? yslope * .75 : yslope;
        yslope = yslope < -.04 ? yslope * .75 : yslope;
        lane_yslope[lane] = yslope;
      }
    } else {
      for (var lane = 0; lane < lanes; lane++) {
        yslope = (lane - middle) * (lane - middle) * yyslope / 400 * ((lane - middle) < 0 ? -1 : 1);
        yslope = yslope > .04 ? yslope * .75 : yslope;
        yslope = yslope < -.04 ? yslope * .75 : yslope;
        lane_yslope[lane] = yslope;
      }
    }

    self.background = background;
    self.lane_yslope = lane_yslope;

  }

  self.build_one_tab = function(state) {
    var tab = {};
    tab.exposure = state.time;
    tab.name = scb.Utils.print_time(state.time);
    tab.gel = state.gel.id;

    tab.lanes = [];
    var lanes_list = state.gel.marks;
    for (var lane_index in lanes_list) {
      var lane = {};
      var lane_item = lanes_list[lane_index];
      lane.marks = [];
      for (var mark_index in lane_item.marks) {
        var mark = {};
        //TODO: need marks
        var sample_mark = lane_item.marks[mark_index];
        mark.position = sample_mark.weight;
        mark.intensity = 0.04 * sample_mark.intensity * tab.exposure * parseFloat(lane_item.amount_of_protein_loaded);
        lane.marks.push(mark);
        console.info("Mark intensity: " + mark.intensity + " " + tab.exposure + " " + sample_mark.intensity);
      }
      if (_.find(context.template.primary_anti_body[state.gel.primary_anti_body].secondary, function(e) {
          return e == state.gel.secondary_anti_body;
        })) {

        var bg_marks = context.template.primary_anti_body[state.gel.primary_anti_body].marks;
        for (var mark_index in bg_marks) {
          var mark = {};
          //TODO: need marks
          var sample_mark = bg_marks[mark_index];
          mark.position = sample_mark.weight;
          mark.intensity = 0.04 * sample_mark.intensity * tab.exposure * parseFloat(lane_item.amount_of_protein_loaded);
          lane.marks.push(mark);
          console.info("BG Mark intensity: " + mark.intensity + " " + tab.exposure + " " + sample_mark.intensity);
        }
      }
      var consolidated_lane = {};
      _.each(lane.marks, function(elem) {
        if (consolidated_lane[elem.position]) {
          consolidated_lane[elem.position] += elem.intensity;
        } else {
          consolidated_lane[elem.position] = elem.intensity;
        }
      });
      lane.marks = [];
      _.each(consolidated_lane, function(value, key) {
        lane.marks.push({
          position: parseFloat(key),
          intensity: value
        });
      });
      tab.lanes.push(lane);
    }
    var round_number = 100000;
    for (var index = 0; index < self.background.length; index++) {
      self.background[index] = Math.round(self.background[index] * round_number) / round_number;
    }
    tab.background = self.background;
    for (var index = 0; index < self.lane_yslope.length; index++) {
      self.lane_yslope[index] = Math.round(self.lane_yslope[index] * round_number) / round_number;
    }
    tab.lane_yslope = self.lane_yslope;

    self.tab = tab;
    return tab;
  }

  self.paint_blot = function(canvas_id, tab) {

    var LANE_OFFSET_0 = 15.25; //14.50;
    var LANE_OFFSET_0A = 15.0;
    var LANE_OFFSET_1 = .12 + .75;
    var LANE_OFFSET_1A = .15 + .75;
    var LANE_OFFSET_2 = .88 + .75;
    var LANE_OFFSET_2A = .85 + .75;

    var canvas = document.getElementById(canvas_id);
    var width = canvas.width;
    var height = canvas.height;
    if (width != canvas.clientWidth) {
      canvas.width = canvas.clientWidth;
      width = canvas.width;
    }
    if (height != canvas.clientHeight) {
      canvas.height = canvas.clientHeight;
      height = canvas.height;
    }

    var g = canvas.getContext('2d');
    self.clear_canvas(canvas, width, height, g);
    g.strokeStyle = '#ffffff';
    g.shadowColor = '#ffffff';

    var lanes = 15;
    var lane_width = width / (lanes + 1);
    lanes = tab.lanes.length > 15 ? lanes : tab.lanes.length;

    var background = tab.background;
    var lane_yslope = tab.lane_yslope;

    // paint background lane
    yslope_offset = {};
    var exposure = parseInt(tab.exposure);
    if (exposure < 1) {
      exposure = 1;
    }
    for (var lane = 0; lane < lanes; lane++) {
      var yslope = lane_yslope[lane];
      yslope_offset[lane] = yslope;
    // for(var h = 0; h < height; h++) {
    // var v = 255 - 4 - Math.round(background[h + xoffset] * Math.log(exposure / 50));
    // var v2 = 255 - Math.round(background[h + xoffset] * 8);
    // var color = 'rgb(' + v + ',' + v + ',' + v + ')';
    // var scolor = 'rgb(' + v2 + ',' + v2 + ',' + v2 + ')';
    //
    // g.strokeStyle = color;
    // g.shadowColor = scolor;
    // g.shadowBlur = Math.round(Math.log(exposure / 20));
    // g.lineWidth = 2;
    //
    // g.beginPath();
    // g.moveTo(lane_width * (lane + LANE_OFFSET_1), h);
    // g.lineTo(lane_width * (lane + LANE_OFFSET_2), h + yslope);
    // g.closePath();
    // g.stroke();
    // //						g.fillRect(lane_width * (lane + .15), h, lane_width * .7, 1);
    // }
    }

    var h = 10;
    if (tab.exposure != 0) {
      g.save();
      var yoffset = 0;
      var yoffset_next = 0;
      for (var lane = 0; lane < lanes; lane++) {
        var h = 10;

        g.lineCap = 'round';
        g.lineJoin = 'miter';
        g.shadowColor = '#b0b0b0';
        g.shadowBlur = 5;

        var cnt = 0;
        var blurs = tab.lanes[lane].marks;
        var yslope = yslope_offset[lane];
        yoffset = yoffset_next;
        yoffset_next = yoffset + yslope * lane_width;
        for (var i = 0; i < blurs.length; i++) {
          var blur = blurs[i].position;
          var intensity = blurs[i].intensity;
          cnt++;
          if (intensity <= 0) {
            continue;
          }
          // if(intensity < 10) {
          // intensity = 12;
          // }
          if (state.gel.parent.parent.gel_type == '.10') {
            var blur_position = h + 26 / (blur + 10) * (height - h);
          } else if (state.gel.parent.parent.gel_type == '.12') {
            var blur_position = 930 * Math.pow(blur, -0.582);
          } else if (state.gel.parent.parent.gel_type == '.15') {
            var blur_position = 1385.1 * Math.pow(blur, -0.765);
          }


          //var blur_position = h + 26 / (blur + 10) * (height - h);
          var lineWidth = Math.log(intensity / 10);
          g.strokeStyle = '#c0c0c0';
          g.shadowBlur = 2;
          g.globalAlpha = 1;
          if (lineWidth < .5) {
            var alpha = 1;
            alpha = intensity / 12;
            g.globalAlpha = alpha;
            console.info("ALPHA " + alpha + " " + g.strokeStyle);
            g.shadowBlur = 0;
          }
          g.lineWidth = lineWidth > .25 ? lineWidth : .25;
          console.info("DISPL " + blurs[i].intensity + " " + Math.log(intensity / 10) + " " + g.lineWidth);
          g.beginPath();
          g.moveTo((lane_width * (lane + LANE_OFFSET_1A) - g.lineWidth / 2) - 10, blur_position + yoffset);
          g.lineTo((lane_width * (lane + LANE_OFFSET_2A) + g.lineWidth / 2) - 10, blur_position + yoffset_next);
          g.closePath();
          g.stroke();
          g.stroke();
          g.stroke();
          g.stroke();
        }
        g.globalAlpha = 1;

      }
      g.restore();
    }
    g.save();
    g.strokeStyle = '#000000';
    g.lineWidth = .5;
    g.shadowBlur = 0;
    g.fillStyle = '#000000';
    self.h = h ;
    self.height = height;
    if (state.gel.parent.parent.marker_loaded) {
      var weights = [10, 15, 20, 25, 37, 50, 75, 100, 150, 250];
      for (var weigth_index in weights) {
        if (state.gel.parent.parent.gel_type == '.10' && weights[weigth_index] <= 20) {
        } else {
          var weight = weights[weigth_index];
          var position = self.weight_to_position(weight);
          //                h + 26 / (weight + 10) * (height - h);
          g.font = "9px Arial";
          g.fillText("" + weight, lane_width * (LANE_OFFSET_0) + 1, position + 3);
          g.beginPath();
          g.moveTo((lane_width * (LANE_OFFSET_0) - g.lineWidth / 2) + 1, position);
          g.lineTo((lane_width * (LANE_OFFSET_0A) + g.lineWidth / 2) + 1, position);
          g.closePath();
          g.stroke();
        }
      }
      g.fillText("kDa", lane_width * (LANE_OFFSET_0), 10);
    //		for(var lane = 0; lane < lanes; lane++) {
    //			g.fillText("Lane " + (lane + 1), lane_width * (lane + LANE_OFFSET_1A ) - g.lineWidth / 2, 15);
    //		}
    } else {
      // g.fillText("marker was not loaded", 5, 15);
    }
    g.restore();
  }

  self.weight_to_position = function(weight) {
    var h = self.h;
    var height = self.height;
    if (state.gel.parent.parent.gel_type == '.10') {
      var position = h + 26 / (weight + 10) * (height - h);
    } else if (state.gel.parent.parent.gel_type == '.12') {
      var position = 930 * Math.pow(weight, -0.582);
    } else if (state.gel.parent.parent.gel_type == '.15') {
      var position = 1385.1 * Math.pow(weight, -0.765);
    }
    return position;
  }

  self.position_to_weight = function(position) {
    var h = self.h;
    var height = self.height;
    if (position != h) {
      if (state.gel.parent.parent.gel_type == '.10') {
        var weight = 26 * (height - h) / (position - h) - 10;
      } else if (state.gel.parent.parent.gel_type == '.12') {
        var weight = Math.pow(930 / position, 1 / 0.582);
      } else if (state.gel.parent.parent.gel_type == '.15') {
        var weight = Math.pow(1385.1 / position, 1 / 0.765);
      }
      return weight;
    } else {
      return "N/A";
    }
  }

  self.clear_canvas = function(canvas, width, height, g) {
    g.clearRect(0, 0, width, height);
    g.fillStyle = 'white';
    g.fillRect(0, 0, width, height);
    g.fillStyle = '#ecedf3';
    g.fillRect(0, 0, width, height);
    g.fillStyle = 'white';
    //g.fillRect(0, 0, width, 20);
    g.fillRect(width - 22, 0, width, height);

  }
}