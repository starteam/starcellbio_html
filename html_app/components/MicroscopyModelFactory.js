scb.components = scb.components || {};

scb.components.MicroscopyModelFactory = function scb_components_MicroscopyModelFactory(model, template) {
    var self = this;
    
    if(scb.utils.isDefined(model.slide)){
    	self.slide = function(state){
    			
            	var t = template;
            	var m = model.slide;
//     			console.log('state');
//     			console.log(state);
    			if (m.parser_simple){
					var microscopy_lane = state.microscopy_lane;
					var cell_line = state.microscopy_lane.cell_treatment.cell_line;
					var collection_id= state.microscopy_lane.cell_treatment.treatment_list.list[0].collection_id;
					var drug_id = state.microscopy_lane.cell_treatment.treatment_list.list[0].drug_list.list[0].drug_id;
					var slide_type = microscopy_lane.kind;	
					var conditions = state.microscopy_lane.kinds[state.microscopy_lane.kind].conditions;
					var color = microscopy_lane.kind;
					var img_str  = '';		
					var micro_state = {
						slide_type: function (str) {
							return str == slide_type;
						},
						collection_id: function (str) {
							return str == collection_id;
						},
						drug_id: function (str) {
							return str == drug_id;
						},
						cell_line: function (str) {
							return str == cell_line;
						}
						,
						conditions: function (str) {
							return str == conditions;
						}
					}
// 					_.each(m.parser_simple, function (rule) {
// 						if (rule.color == color)
// 						 	state.color = color;
//     				});
//     			
					_.each(m.parser_simple, function (rule) {
// 						console.info(rule);
						if (rule.match.length == 0) {
							img_str = '../images/microscopy/black.jpg'
						}
						else {
							var matches = true;
							_.each(rule.match, function (property) {
								if (micro_state[property]) {
									matches &= micro_state[property](rule[property]);
								}
								else {
									console.info("UNDEFINED PROPERTY: " + property);
								}
							});
							if(matches){
								color_str = rule.color;
							}
						}
					});
					state.color = color_str;
				}			
 			}
    	}
    
//     console.log('params');
//     console.log('model:');
//     console.log(model);
//     console.log(template);
// 	console.log('called the factory rules');
    self.compute = function (state) {
        return self.slide(state);
    }
}