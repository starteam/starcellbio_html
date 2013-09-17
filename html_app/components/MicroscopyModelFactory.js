scb.components = scb.components || {};

scb.components.MicroscopyModelFactory = function scb_components_MicroscopyModelFactory(model, template) {
    var self = this;
    
    if(scb.utils.isDefined(model.color)){
    	self.color = function(state){
    			
            	var t = template;
            	var m = model.color;
//     			console.log('state');
//     			console.log(state);
    			if (m.parser_simple){
					var microscopy_lane = state.microscopy_lane;
					var color = microscopy_lane.kind;	
					var color_str  = '';		
					var micro_state = {
						color: function (str) {
							return str == color;
						}
					}
					_.each(m.parser_simple, function (rule) {
						if (rule.color == color)
						 	state.color = color;
    				});
    			
					_.each(m.parser_simple, function (rule) {
// 						console.info(rule);
						if (rule.match.length == 0) {
							color_str = rule.color;
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
        return self.color(state);
    }
}