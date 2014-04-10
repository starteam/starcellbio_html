scb.components = scb.components || {};

scb.components.FACSModelFactory = function scb_components_FACSModelFactory(model, template) {
    var self = this;

    if (scb.utils.isDefined(model.dna)) {
        self.dna = function (state) {
            var t = template;
            var m = model.dna;
            if (m.parser_simple) {
                var facs_lane = state.facs_lane;
                var cell_treatment = facs_lane.cell_treatment;
                var cell_line = cell_treatment.cell_line;
                var drug_treatments = cell_treatment.treatment_list.list;
                var shape = '';
                var facs_state = {
                    cell_line: function (str) {
                        return str == cell_treatment.cell_line
                    },
                    temperature: function (str) {
                        return str == drug_treatments[0].temperature
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
                    console.info(rule);
                    if (rule.match.length == 0) {
                        shape = rule.shape;
                    }
                    else {
                        var matches = true;
                        _.each(rule.match, function (property) {
                            if (facs_state[property]) {
                                matches &= facs_state[property](rule[property]);
                            }
                            else {
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
            // here we need to compute how this actually works
            /* I think:
             - Model will initiate random stuff when it starts
             - Here we will move model depending on drugs
             - And finish with collection time
             - Visualizer will count from here and draw DNA curve
             */
        }
        self.shape_to_data = function (state) {
            var shape = state.shape;

			function g0g1(x) {
                return 4 * Math.exp(-((x - 1) * (x - 1)) * 30);
            }

            function near_zero(x) {
                return 1 / 2 * ( x > 0 && x < 1 ? (.08 - x / 50) : 0 );
            }

            function s(x) {
            	var lower_bound = .8;
            	var middle_bound_1 = 1;
            	var middle_bound_2 = 2;
            	var upper_bound = 2.3;
                return .05 * (5 * (x > lower_bound && x < middle_bound_1 ? x - lower_bound : 0) + (x > middle_bound_1 & x < middle_bound_2 ? (lower_bound + (middle_bound_2 - x) / 5) : 0) / .6 + 1.3 * (x > middle_bound_2 & x < upper_bound ? (upper_bound - x) / .3 : 0));
            }

            function g2m(x) {
                return 1 / 2 * Math.exp(-((x - 2) * (x - 2) * 15));
            }

            function s_block(x) {
                return Math.exp(-((2 - x) * Math.exp(2 - x) - .9) * ((2 - x) * Math.exp(2 - x) - .9) / .4);
            }
            

            function g2m_0_400(x) {
                return 1 / 2 * Math.exp(-((x - 1.5) * (x - 1.5) * 2));
            }
            function s_block_50_400(x) {
                return Math.exp(-((0.8 - x) * Math.exp(0.8 - x) - .7) * ((0.8 - x) * Math.exp(0.8 - x) - .7) / .13)-0.005;
            }
			function g2m_50_400(x) {
				return 7 / 9 * Math.exp(-((x - 0.35) * (x - 0.35) * 30));
			}
            function g3(x) {
				return normal_dist(x, 0.95, 0.10, 1, false);
            }
            
            function g2(x) {
                return normal_dist(x, 0.85, 0.14, 3, true);
            }
            function g1(x) {
				return normal_dist(x, 0.33, 0.12, 1, false);
            }
			function g4(x) {
                return normal_dist(x, 0.3, 0.10, 1, false);
            }
            function g2m_100_400(x) {
            	return normal_dist(x, 0.8, 0.12, 0.5, false);
                //return Math.exp(-((x-0.3) * Math.exp(x-0.3) - .7) * ((x-0.3) * Math.exp(x-0.3) - .7) / .13)-0.005;
            }

////////////////////
////////////////////
/////////////////////
			var number_of_curves = 1;
			
			function erfc(x) {
			  // save the sign of x
			  var sign = (x >= 0) ? 1 : -1;
			  x = Math.abs(x);

			  // constants
			  var a1 =  0.254829592;
			  var a2 = -0.284496736;
			  var a3 =  1.421413741;
			  var a4 = -1.453152027;
			  var a5 =  1.061405429;
			  var p  =  0.3275911;

			  // A&S formula 7.1.26
			  var t = 1.0/(1.0 + p*x);
			  var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
			  return sign * y+1; // erf(-x) = -erf(x);
			}



			function normal_dist(x_val,location, scale, shape, haserror){
				var term1 = Math.exp(-((x_val - location) * (x_val - location))/(2*scale*scale));
				var term2 = haserror ? erfc(-(shape*(x_val-location))/(Math.sqrt(2)*scale)): 1;
				var term3 = Math.sqrt(Math.PI*2)*scale;
				return (term1*term2)/term3 ;
			}

            function normalize(data, factor, y_scale) {
                var factor = factor || .05;
                var sum = 0;
                _.each(data, function (s) {
                    sum += s[1];
                });
                _.each(data, function (s) {
                    s[1] = s[1] / sum * (1 - factor + 2 * factor * Math.random())
                });

                sum = 0;
                _.each(data, function (s) {
                    sum += s[1];
                });

                if (sum != 0) {
                    _.each(data, function (s, index) {
                        data[index][1] = data[index][1] / sum * (template.model.facs.max ? ((2750*100)/template.model.facs.max)*number_of_curves: 2750  );

                    });
                }
                _.each(data, function (s, index) {
                    data[index][0] = data[index][0] * (template.model.facs.max ? ((template.model.facs.max*50)/100): 50 ) ;

                });

            }


            var options = {
                series: {
                    lines: {show: true, fill: true, steps: true, lineWidth: 1},
                    points: {show: false, radius: .5, fill: false},
                    color: '#808080'
                },
                xaxis: {
                	show: true,
                	color: '#000000',
                    min: 0,
                    max: template.model.facs.max ? template.model.facs.max:  100,
                    ticks:  template.model.facs.ticks ? template.model.facs.ticks: [50, 100],
                    tickLength: 0,
                    font: {
                        family: 'sourcesanspro-regular',
                        size: 11,
                    }
                },
                yaxis: {
                	show: true,
                	color: '#000000',
                    min: 0,
                    max: 100,
                    tickLength:0,
                    font: {
                        family: 'sourcesanspro-regular',
                        size: 11
                    }

                },
                grid: {clickable: true, hoverable: true, borderWidth: 0, aboveData: true, autoHighlight: false,  markings: [ { xaxis: { from: 0, to: template.model.facs.max ? template.model.facs.max:  100 }, 
                			yaxis: { from: 0, to: 0 }, color: "#000" },
                       { xaxis: { from: 0, to: 0 }, yaxis: { from: 0, to: 100 }, color: "#000" }]},
            };            
            
            
            if (('' + shape).toLowerCase() == 'normal') {
                var data = [];
                var bias = (Math.random() - .5) * .10;
                for (var x = 0; x < 3; x += .01) {
                    var y = g0g1(x + bias) + 3 * g2m(x + bias) + near_zero(x + bias) + s(x + bias);
                    data.push([x, y]);

                }
                normalize(data);
                state.data = {
                    data: [
                        { data: data},
//                        {label: 'phase 1', data:[[0,0.01],[0.8,0.01]],lines:{fill:false}},
//                        {label: 'phase 2', data:[[0.8,0.011],[1.2,0.011]],lines:{fill:false}},
//                        {label: 'phase 3', data:[[1.2,0.01],[1.8,0.01]],lines:{fill:false}},
//                        {label: 'phase 4', data:[[1.8,0.011],[2.3,0.011]],lines:{fill:false}}

                    ],
                    options: options
                };
            }
            if (('' + shape).toLowerCase() == 's-block') {
                var data = [];
                for (var x = 0; x < 3; x += .01) {
                    var y = s_block(x);
                    data.push([x, y]);

                }
                normalize(data);
                state.data = {
                    data: [
                        { data: data}
                    ],
                    options: options
                };
            }
            if (('' + shape).toLowerCase() == 'g1-block') {

            }
            if (('' + shape).toLowerCase() == 'g2-block') {
                var data = [];
                for (var x = 0; x < 3; x += .01) {
                    var y = g2m(x);
                    data.push([x, y]);

                }
                normalize(data);
                state.data = {
                    data: [
                        { data: data}
                    ],
                    options: options
                };
            }
            if (('' + shape).toLowerCase() == 'alpha-block') {
                var data = [];
                for (var x = 0; x < 3; x += .01) {
                    var y = g0g1(x);
                    data.push([x, y]);
                }
                normalize(data);
                state.data = {
                    data: [
                        { data: data}
                    ],
                    options: options
                };
            }
            
            
           if (('' + shape).toLowerCase() == 'normal-400') {
                var data = [];
                var bias = (Math.random() - .5) * .10;
                for (var x = 0; x < 3; x += .01) {
	                number_of_curves = 4;
                    var y = 1.5 * g4(x + bias) + 6* g1(x + bias) + 3 *g2(x + bias) + g3(x + bias) ; 
                    data.push([x, y]);

                }
                normalize(data);
                state.data = {
                    data: [
                        { data: data},

                    ],
                    options: options
                };
            }
            if (('' + shape).toLowerCase() == 'g2-block-100-400') {
                var data = [];
                for (var x = 0; x < 3; x += .01) {
                	number_of_curves = 1;
                    var y = g2m_100_400(x);
                    data.push([x, y]);

                }
                normalize(data);
                state.data = {
                    data: [
                        { data: data}
                    ],
                    options: options
                };
            }
            if (('' + shape).toLowerCase() == 'g2-block-50-400') {
            }
           if (('' + shape).toLowerCase() == 'g2-block-400') {
            }
           if (('' + shape).toLowerCase() == 's-block-400') {
            }
            
            

        }
    }

    self.compute = function (state) {
        return self.dna(state);
    }
}