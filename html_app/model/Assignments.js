'use strict';

scb.AssignmentList = function scb_AssignmentList(data, context) {

	var self = this;
	self.parent = null;
	var proto = scb.Assignment;
	scb.utils.accessor2_with_setter(self, 'selected_id', data, function(e) {
		context.js_model.current_assignment = self.selected;
	})
	scb.ModelHelpers.common_list_code(self, data, proto, context, self);

	self.selected_id = data.selected_id;
}

scb.Assignment = function scb_Assignment(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self,data,'experiments',{},scb.ExperimentList,context);
	scb.Utils.initialize_accessor_field(self,data,'template',{},null,context);	
}