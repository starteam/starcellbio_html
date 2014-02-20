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
					var cell_line = microscopy_lane.cell_treatment.cell_line;
					var collection_id= microscopy_lane.cell_treatment.treatment_list.list[0].collection_id;
					var drug_id = microscopy_lane.cell_treatment.treatment_list.list[0].drug_list.list[0].drug_id;
					var slide_type = microscopy_lane.kind;	
					var conditions = microscopy_lane.slide_conditions;
					var imgs = []
					var micro_state = {
						kind: function (str) {
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
						},
						conditions: function (str) {
							return str == conditions;
						}
					}
					var isFound = false;
					_.each(m.parser_simple, function (rule) {
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
							if(!isFound){
								if(matches){
									var max = _.size(template.slide_parser[collection_id][slide_type][conditions]);
									var index =  Math.floor(Math.random() * (max - 1 + 1)) + 1;
									var slide_array = template.slide_parser[collection_id][slide_type][conditions][index];
									imgs=slide_array;
									isFound = true;
								}
								else{
									var max = _.size(template.slide_parser['default']['Dye']['HnE']);
									var index =  Math.floor(Math.random() * (max - 1 + 1)) + 1;
									imgs = template.slide_parser['default']['Dye']['HnE'][index];
								}
							}
						}
					});
					state.slides = imgs;
					state.slide_type = slide_type;
				}	
				else if (m.complex_parser){
					var microscopy_lane = state.microscopy_lane;
					var cell_line = microscopy_lane.cell_treatment.cell_line;
					var collection_id= microscopy_lane.cell_treatment.treatment_list.list[0].collection_id;
					var slide_type = microscopy_lane.kind;	
					var conditions = microscopy_lane.slide_conditions;
					var drug_id = microscopy_lane.cell_treatment.treatment_list.list[0].drug_list.list[0].drug_id;
					//add phenotype property
					var imgs = []
					var micro_state = {
						drug_id: function (arr) {
							var hasVal = false;
							for(var x = 0; x < arr.length; x++){
								if(arr[x] == drug_id)
									hasVal = true;
							}
							return hasVal;
						},
						cell_line: function (str) {
							//make it a list and you compare to each one in list not just str
							return str == cell_line;
						}
					}
					var isFound = false;
					_.each(m.complex_parser, function (rule) {
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
							if(!isFound){
								if(matches){
									var phenotype = rule.phenotype;
									var max = _.size(template.slide_parser[collection_id][slide_type][conditions][phenotype]);
									var index =  Math.floor(Math.random() * (max - 1 + 1)) + 1;
									var slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
									imgs=slide_array;
									isFound = true;
								}
							}
						}
					});
					state.slides = imgs;
					state.slide_type = slide_type;
				}			
 			}
    	}
    self.compute = function (state) {
        return self.slide(state);
    }
}