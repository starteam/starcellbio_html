scb.components = scb.components || {};

scb.components.FACSModelFactory = function scb_components_FACSModelFactory(model, template) {
  var self = this;

  if(model.is_ab){
    model = model.ab_parser;
  }

  if (scb.utils.isDefined(model.dna)) {
    self.dna = function(state) {
      var m = model.dna;
      if (template.model.facs.is_ab) {
        if (m.parser_simple) {
          var facs_lane = state.facs_lane;
          var cell_treatment = facs_lane.cell_treatment;
          var facs_state = {
            identifier: function (str) {
              return str == cell_treatment.identifier;
            },
            treatment: function (str) {
              return str == facs_lane.live;
            },
            analysis: function (str) {
              return str == facs_lane.kind;
            },
            condition: function (str) {
              return str == facs_lane.conditions;
            }
          };
          /* Iterating over the rules */
          var matching_rule = _.find(m.parser_simple, function (rule) {

            var matches = true;
            _.each(facs_state, function (matchFunc, property) {
              matches &= matchFunc(rule[property]);
            });
            return matches;

          });
          state.data_points = template.facs_histograms[matching_rule.histogram_id];
          state.shape = 'ab';
          self.shape_to_data(state);
        }
      } else {
        if (m.parser_simple) {
          facs_lane = state.facs_lane;
          cell_treatment = facs_lane.cell_treatment;
          var drug_treatments = cell_treatment.treatment_list.list;
          var duration = drug_treatments[0].duration;
          var shape = '';
          facs_state = {
            cell_line: function (str) {
              return str == cell_treatment.cell_line
            },
            temperature: function (str) {
              return str == drug_treatments[0].temperature
            },
            condition: function (str) {
              return str == facs_lane.conditions;
            },
            duration: function (str) {
              return str == duration;
            },
            drug_id: function (str) {
              var any = false;
              _.each(drug_treatments, function (dt) {
                _.each(dt.drug_list.list, function (drug) {
                  any |= (drug.drug_id == str);
                });
              });
              return any;
            }
          }

          _.each(m.parser_simple, function (rule) {
            if (rule.match.length == 0) {
              shape = rule.shape;
            } else {
              var matches = true;
              _.each(rule.match, function (property) {
                if (facs_state[property]) {
                  matches &= facs_state[property](rule[property]);
                } else {
                  console.info("UNDEFINED PROPERTY: " + property);
                }
              });
              if (matches) {
                shape = rule.shape;
              }
            }
          });
          state.shape = shape;
          self.shape_to_data(state);
        }
      }
    // here we need to compute how this actually works
    /* I think:
     - Model will initiate random stuff when it starts
     - Here we will move model depending on drugs
     - And finish with collection time
     - Visualizer will count from here and draw DNA curve
     */
    }
    self.shape_to_data = function(state) {
      var shape = ('' + state.shape).toLowerCase();

      function g0g1(x) {
        return 4 * Math.exp(-((x - 1) * (x - 1)) * 30);
      }

      function near_zero(x) {
        return 1 / 2 * (x > 0 && x < 1 ? (.08 - x / 50) : 0);
      }

      function s(x) {
        return .05 * (5 * (x > .8 && x < 1 ? x - .8 : 0) + (x > 1 & x < 2 ? (.8 + (2 - x) / 5) : 0) / .6 + 1.3 * (x > 2 & x < 2.3 ? (2.3 - x) / .3 : 0));
      }

      function g2m(x) {
        return 1 / 2 * Math.exp(-((x - 2) * (x - 2) * 15));
      }

      function s_block(x) {
        return Math.exp(-((2 - x) * Math.exp(2 - x) - .9) * ((2 - x) * Math.exp(2 - x) - .9) / .4);
      }

      function peak2g1(x) {
        return normal_dist(x, 0.78, 0.08, 4, false) * 2;
      }

      function peak2g2(x) {
        return normal_dist(x, 0.39, 0.08, 1, false) * 3;
      }

      function peak2Ug1(x) {
        return normal_dist(x, 0.83, 0.165, 3, true) * 4.1;
      }

      function peak2Ug2(x) {
        return normal_dist(x, 0.31, 0.14, -2, true) * 6;
      }

      /*
      *The following 3 functions describe the asynchronous image
      * with a tall peak at 50 and a small bump at 100, and flat
      * middle ground.
      */
      function bump100(x) {
        return normal_dist(x, 1.1, 0.2, -2, true) * 0.2;
      }
      function bigpeak50(x) {
        return normal_dist(x, 0.5, 0.1, -3, true);
      }
      function middlenoise(x) {
        var y = -Math.pow(x - 0.9, 2) + 0.25;
        return (y > 0) ? y : 0;

      }
      /* These two functions are added for graph B */
      /* The peak is between 0 an 1, trailing background noise from the right */
      function peak021(x) {
        return normal_dist(x, 0.15, 0.25, -3, true);
      }
      function tail(x) {
        return normal_dist(x, 0.45, 0.3, -2, true) * 0.2;
      }

      /* graph C */
      function graph_C(x, mean) {
        return normal_dist(x, mean, 0.2, 0.5, false);
      }
      /*Single narrow peak */
      function scaled_peak(x, mean) {
        return normal_dist(x, mean, 0.13, 0.5, false);
      }



      function g1(x) {
        // return normal_dist(x, 0.2, 0.27, -25, true)* 0.7;
        return normal_dist(x, 0.15, 0.22, -26, true) * 0.3;
      }

      function g2(x) {
        return normal_dist(x, 0.38, 0.09, 1, false) * 0.85;
      }

      function g3(x) {
        return normal_dist(x, 0.85, 0.14, 3, true) * 0.5;
      }

      function g4(x) {
        return normal_dist(x, 1, 0.32, 1, false) * 0.77;
      }
      /* Four peaks for Unequal segregation image */
      function h1(x) {
        return normal_dist(x, 0.3, 0.22, -26, true) * 0.3;
      }

      function h2(x) {
        return normal_dist(x, 0.6, 0.11, 1, false);
      }

      function h3(x) {
        return normal_dist(x, 1.2, 0.17, 3, true) * 0.6;
      }

      function h4(x) {
        return normal_dist(x, 1.4, 0.45, 1, false) * 0.8;
      }

      function sblockg1(x) {
        return normal_dist(x, 0.24, 0.2, -6, true) - 0.17;
      }

      function peak100(x) {
        return normal_dist(x, 0.8, 0.05, 0.5, false);
      }

      function peak50(x) {
        return normal_dist(x, 0.4, 0.05, 0.5, false);
      }

      ////////////////////
      ////////////////////
      ////////////////////
      var number_of_curves = 1;

      function erfc(x) {
        // save the sign of x
        var sign = (x >= 0) ? 1 : -1;
        x = Math.abs(x);

        // constants
        var a1 = 0.254829592;
        var a2 = -0.284496736;
        var a3 = 1.421413741;
        var a4 = -1.453152027;
        var a5 = 1.061405429;
        var p = 0.3275911;

        // A&S formula 7.1.26
        var t = 1.0 / (1.0 + p * x);
        var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        return sign * y + 1; // erf(-x) = -erf(x);
      }

      var parameters = template.model.facs.is_ab? template.model.facs.ab_parser : template.model.facs;
      function roundData(input) {
        var round_number = 10000;
        for (var index = 0; index < input.length; index++) {
          input[index][0] = Math.round(input[index][0] * round_number) / round_number;
          input[index][1] = Math.round(input[index][1] * round_number) / round_number;
        }
        return input;
      }
      function normal_dist(x_val, location, scale, shape, haserror) {
        var term1 = Math.exp(-((x_val - location) * (x_val - location)) / (2 * scale * scale));
        var term2 = haserror ? erfc(-(shape * (x_val - location)) / (Math.sqrt(2) * scale)) : 1;
        var term3 = Math.sqrt(Math.PI * 2) * scale;
        return (term1 * term2) / term3;
      }

      function normalize(data, big_const, factor, y_scale) {
        var factor = factor || .05;
        var big_const = big_const || 2750;
        var sum = 0;
        _.each(data, function(s) {
          sum += s[1];
        });
        var normalized_data = addNoise(data, factor);
        _.each(normalized_data, function(s) {
          // y= y/ sum(y_i)
          s[1] = s[1] / sum;
        });

        sum = 0;
        _.each(normalized_data, function(s) {
          sum += s[1];
        });
        if (sum != 0) { /*normalizing the y values*/
          _.each(normalized_data, function(point) {
            if (template.model.facs.scale) {
              point[1] = point[1] / sum * big_const;
            } else {
              point[1] = point[1] / sum * (template.model.facs.max ? ((big_const * 100) / template.model.facs.max) * number_of_curves : 2750);
            }
          });
        }

        _.each(normalized_data, function(point) { /*normalizing x values*/
          /* new exercises will now have attribute 'scale' */
          /* Using scale to distinguish old exercises and preserve the old normalization way*/
          if (template.model.facs.scale) {
            /*this is assuming that the start point is 0 */
            point[0] = template.model.facs.max * point[0] / normalized_data[data.length - 1][0];
          } else { /*to preserve the old exercise scaling, keeping old code*/
            point[0] = point[0] * (template.model.facs.max ? ((template.model.facs.max * 50) / 100) : 50);
          }

        });
        return normalized_data;

      }

      /**
       * Take data point from drawn graph in px
       * and rescale according to coordinate system values
       * @param input - List of points
       */
      function rescaleData(input){
        return _.map(input, function(point) {
          var new_point = [];
          new_point[0] = point[0] * parameters.max / X_AXIS_LENGTH_PX;
          new_point[1] = point[1] * Y_AXIS_LENGTH_VALUE / Y_AXIS_LENGTH_PX;
          return new_point;
        });
      }

      var options = {
        series: {
          lines: {
            show: true,
            fill: true,
            steps: true,
            lineWidth: 1
          },
          points: {
            show: false,
            radius: .5,
            fill: false
          },
          color: '#808080'
        },
        xaxis: {
          show: true,
          color: '#000000',
          min: 0,
          max: parameters.max ? parameters.max : 150,
          ticks: parameters.ticks ? parameters.ticks : [50, 100],
          tickLength: 0,
          transform: function(v) {
            if (parameters.scale && parameters.scale.indexOf('log') > -1) {
              return Math.log(v + 0.0001) / Math.LN10; /*move away from zero*/
            } else {
              return v;
            }
          },

          tickFormatter: function(v, axis) {
            if (parameters.scale && parameters.scale.indexOf('pseudo') > -1) {
              return "10^" + Math.round(v / parameters.ticks[0]);
            } else if (parameters.scale && parameters.scale.indexOf('log') > -1) {
              return "10^" + (Math.round(Math.log(v) / Math.LN10)).toString(); //(Math.round( Math.log(v)/Math.LN10)).toString().sup();},
            } else {
              return v;
            }

          },

          font: {
            family: 'sourcesanspro-regular',
            size: 11,
          }
        },
        yaxis: {
          show: true,
          color: '#000000',
          min: parameters.max ? 0 : -1,
          max: 100,
          tickLength: 0,
          font: {
            family: 'sourcesanspro-regular',
            size: 11
          }


        },
        //                '': { ticks: [0.001,0.01,0.1,1,10,100],
        //                        transform:  function(v) {return Math.log(v+0.0001); /*move away from zero*/} , tickDecimals: 3 ,
        //                 tickFormatter: function (v, axis) {return "10" + (Math.round( Math.log(v)/Math.LN10)).toString().sup();}
        //                },
        legend: {
          show: false
        },
        grid: {
          clickable: true,
          hoverable: true,
          borderWidth: 0,
          aboveData: true,
          autoHighlight: false,
          markings: [{
            xaxis: {
              from: 0,
              to: parameters.max ? parameters.max : 150
            },
            yaxis: {
              from: 0,
              to: 0
            },
            color: "#000"
          },
            {
              xaxis: {
                from: 0,
                to: 0
              },
              yaxis: {
                from: 0,
                to: 100
              },
              color: "#000"
            }]
        },
      };
      /* Old assignments do not have ticks */
      var step = template.model.facs.ticks ? (template.model.facs.ticks[1] - template.model.facs.ticks[0]) : 50;

      if (shape == 'normal') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = g0g1(x + bias) + 3 * g2m(x + bias) + near_zero(x + bias) + s(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },
          ],
          options: options
        };
      }
      if (shape == 'graph-c') {
        var data = [];
        /* 2 is location of the peak in terms of steps*/
        var mean = 3 / (template.model.facs.max / step) * 2;
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = graph_C(x + bias, mean);
          data.push([x, y]);
        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            }
          ],
          options: options
        };
      }
      if (shape == 'graph-b') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = peak021(x + bias) + tail(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            }
          ],
          options: options
        };
      }

      if (shape == 'ab') {
        roundData(state.data_points);
        var scaled_points = addNoise(rescaleData(state.data_points));

        state.data = {
          data: [
            {
              data: scaled_points
            }
          ],
          options: options
        };
      }
      if (shape == 's-block') {
        var data = [];
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = s_block(x);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            }
          ],
          options: options
        };
      }

      if (shape == 'g2-block') {
        var data = [];
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = g2m(x);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            }
          ],
          options: options
        };
      }
      if (shape == 'alpha-block') {
        var data = [];
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = g0g1(x);
          data.push([x, y]);
        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            }
          ],
          options: options
        };
      }


      if (shape == '2-peak-normal-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 2;
          var y = peak2g1(x + bias) + peak2g2(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }

      if (shape == 'peak-100-normal-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = peak100(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }
      /* Single thin peak function scaled according to max value*/
      /* can locate peaks at any multiple of 'step' (so far has been always 50)*/
      if (shape.indexOf('scaled-peak') > -1) {
        var data = [];
        var mean = 0;

        /*assuming that 150 is the third point on the scale*/
        if (shape.indexOf('3') > -1) {
          mean = 3 / (template.model.facs.max / step) * 3;
        } else if (shape.indexOf('2') > -1) {
          mean = 3 / (template.model.facs.max / step) * 2;
        } else if (shape.indexOf('1') > -1) {
          mean = 3 / (template.model.facs.max / step);
        }
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = scaled_peak(x + bias, mean);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }
      if (shape == '2-peak-uneven-normal-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 2;
          var y = peak2Ug1(x + bias) + peak2Ug2(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }
      if (shape == '1-peak-normal-1-flatbump-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 2;
          var y = bigpeak50(x + bias) + bump100(x + bias) + middlenoise(x + bias);
          data.push([x, y]);

        }
        normalize(data, 1700);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }
      if (shape == 'peak-50-normal-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = peak50(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }

      if (shape == '4-peak-normal-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 4;
          var y = g1(x + bias) + g2(x + bias) + g3(x + bias) + g4(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }
      if (shape == 'unequal-segregation') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 4;
          var y = h1(x + bias) + h2(x + bias) + h3(x + bias) + h4(x + bias);
          data.push([x, y]);

        }
        normalize(data, 4000);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }

      if (shape == 's-block-normal-400') {
        var data = [];
        var bias = (Math.random() - .5) * .10;
        for (var x = 0; x < 3; x += .01) {
          number_of_curves = 1;
          var y = sblockg1(x + bias);
          data.push([x, y]);

        }
        data = normalize(data);
        roundData(data);
        state.data = {
          data: [
            {
              data: data
            },

          ],
          options: options
        };

      }



    }
  }

  self.compute = function(state) {
    return self.dna(state);
  }
}