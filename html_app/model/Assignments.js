'use strict';

scb.AssignmentList = function scb_AssignmentList(data, context) {

	var self = this;
	self.parent = null;
	var proto = scb.Assignment;
	scb.utils.accessor2_with_setter(self, 'selected_id', data, function(e) {
		context.js_model.current_assignment = self.selected;
	});
	scb.ModelHelpers.common_list_code(self, data, proto, context, self);

	self.selected_id = data.selected_id;
	
	self.start = function (d) {
        d = ( typeof (d) == 'undefined' ? {} : d);
        var ret = new scb.Assignment(d, context, self);
        data.list.push(d);
        return ret;
    }
}

scb.Assignment = function scb_Assignment(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self,data,'experiments',{},scb.ExperimentList,context);
	scb.Utils.initialize_accessor_field(self,data,'template',{},null,context);
	scb.Utils.initialize_accessor_field(self,data,'course','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'course_name','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'last_instruction',0,null,context);
	scb.Utils.initialize_accessor_field(self,data,'operation','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'permission','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'template_id',null,null,context);
	scb.Utils.initialize_accessor_field(self,data,'students',0,null,context);
	scb.Utils.initialize_accessor_field(self,data,'sort',[],null,context);
	
	
	scb.Utils.initialize_accessor_field(self,data,'is_new_assignment',true,null,context);
	scb.Utils.initialize_accessor_field(self,data,'is_new_course',true,null,context);

	scb.Utils.initialize_accessor_field(self,data,'course_prepared',null,null,context);
	scb.Utils.initialize_accessor_field(self,data,'assignment_prepared',null,null,context);


	scb.Utils.initialize_accessor_field(self,data,'has_temperature',false,null,context);
	scb.Utils.initialize_accessor_field(self,data,'has_start_time',false,null,context);
	scb.Utils.initialize_accessor_field(self,data,'has_duration',false,null,context);
	scb.Utils.initialize_accessor_field(self,data,'has_collection_time',false,null,context);

	
	


}