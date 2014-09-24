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
    				var hash_list = []; 
    				_.each(state.microscopy.lanes_list.list, function(x){
							if(x.current_slides.length > 0){
								_.each(x.current_slides, function(slide){
									hash_list.push(slide.hash);
								});
							}
			
						});
					var microscopy_lane = state.microscopy_lane;
					var cell_line = microscopy_lane.cell_treatment.cell_line;
					var collection_id= microscopy_lane.cell_treatment.treatment_list.first.collection_id;
					var drug_id = microscopy_lane.cell_treatment.treatment_list.first.drug_list.list[0].drug_id;
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
									console.info(hash_list)
                                    if(collection_id == '%CELL_LINE%')
                                    {
                                        collection_id = cell_line;
                                    }
                                    if( scb.utils.isDefined(rule['use_collection_id']))
                                    {
                                        console.info( "Pull collection_id from rule");
                                        collection_id = rule['use_collection_id'];
                                    }
									var max = template.slide_parser[collection_id][slide_type][conditions].length;
									var index =  Math.floor(Math.random() * (max - 1 + 1));
									console.info(template.slide_parser[collection_id][slide_type][conditions][index]);
									console.info(template.slide_parser[collection_id][slide_type][conditions]);
									var slide_array = template.slide_parser[collection_id][slide_type][conditions][index];
									var alreadySelected = false; 
									_.each(slide_array, function(x){if(_.contains(hash_list, x.hash)) alreadySelected=true;
									});
									var number_of_comparisons = 0;
									while(alreadySelected && number_of_comparisons < max){
										console.info(number_of_comparisons);
										index =  Math.floor(Math.random() * (max - 1 + 1));
										slide_array = template.slide_parser[collection_id][slide_type][conditions][index];
										alreadySelected = false;
										_.each(slide_array, function(x){if(_.contains(hash_list, x.hash)) alreadySelected=true;
										});
										number_of_comparisons=number_of_comparisons+1;
									}
									imgs=slide_array;
									isFound = true;
								}
								else{
                                    try {
                                        var max = template.slide_parser['default']['Dye']['HnE'].length;
                                        var index = Math.floor(Math.random() * (max - 1 + 1));
                                        imgs = template.slide_parser['default']['Dye']['HnE'][index];
                                    } catch(e){}
								}
							}
						}
					});
					state.slides = imgs;
					state.slide_type = slide_type;
				}	
				else if (m.complex_parser){
					var hash_list = []; 
    				_.each(state.microscopy.lanes_list.list, function(x){
							if(x.current_slides.length > 0){
								_.each(x.current_slides, function(slide){
									hash_list.push(slide.hash);
								});
							}
			
						});
					var microscopy_lane = state.microscopy_lane;
					var cell_line = microscopy_lane.cell_treatment.cell_line;
					var collection_id= microscopy_lane.cell_treatment.treatment_list.first.collection_id;
					var slide_type = microscopy_lane.kind;	
					var conditions = microscopy_lane.slide_conditions;
					var drug_id = microscopy_lane.cell_treatment.treatment_list.first.drug_list.list[0].drug_id;
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
									var max = template.slide_parser[collection_id][slide_type][conditions][phenotype].length;
									var index =  Math.floor(Math.random() * (max - 1 + 1));
									var slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
									var alreadySelected = false; 
									_.each(slide_array, function(x){if(_.contains(hash_list, x.hash)) alreadySelected=true;
									});
									var number_of_comparisons = 0;
									while(alreadySelected && number_of_comparisons < max){
										console.info(number_of_comparisons);
										index =  Math.floor(Math.random() * (max - 1 + 1));
										slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
										alreadySelected = false;
										_.each(slide_array, function(x){if(_.contains(hash_list, x.hash)) alreadySelected=true;
										});
										number_of_comparisons=number_of_comparisons+1;
									}
									imgs=slide_array;
									isFound = true;
								}
							}
						}
					});
					state.slides = imgs;
					state.slide_type = slide_type;
				}
				else if(m.conditions_parser){
					var hash_list = []; 
    				_.each(state.microscopy.lanes_list.list, function(x){
							if(x.current_slides.length > 0){
								_.each(x.current_slides, function(slide){
									hash_list.push(slide.hash);
								});
							}
			
						});
					var microscopy_lane = state.microscopy_lane;
					var cell_line = microscopy_lane.cell_treatment.cell_line;
					var collection_id= microscopy_lane.cell_treatment.treatment_list.first.collection_id;
					var slide_type = microscopy_lane.kind;	
					var conditions = microscopy_lane.slide_conditions;
					var drug_id = microscopy_lane.cell_treatment.treatment_list.first.drug_list.list[0].drug_id;
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
						},
						conditions: function (str) {
							return str == conditions;
						}
					}
					var isFound = false;
					_.each(m.conditions_parser, function (rule) {
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
									var max = template.slide_parser[collection_id][slide_type][conditions][phenotype].length;
									var index =  Math.floor(Math.random() * (max - 1 + 1));
									var slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
									var alreadySelected = false; 
									_.each(slide_array, function(x){if(_.contains(hash_list, x.hash)) alreadySelected=true;
									});
									var number_of_comparisons = 0;
									while(alreadySelected && number_of_comparisons < max){
										console.info(number_of_comparisons);
										index =  Math.floor(Math.random() * (max - 1 + 1));
										slide_array = template.slide_parser[collection_id][slide_type][conditions][phenotype][index];
										alreadySelected = false;
										_.each(slide_array, function(x){if(_.contains(hash_list, x.hash)) alreadySelected=true;
										});
										number_of_comparisons=number_of_comparisons+1;
									}
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