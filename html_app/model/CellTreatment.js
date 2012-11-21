'use strict';

scb.CellTreatmentList = function scb_CellTreatmentList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.CellTreatment, context);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		var ret = new scb.CellTreatment(d, context, self);
		data.list.push(d);
		return ret;
	}

	self.duplicate = function(id) {
		return self.start(scb.Utils.clone_and_clear(scb.utils.find(data.list,id)));
	}
}

scb.CellTreatment = function scb_CellTreatment(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self,data,'cell_line',scb.utils.any_key(context.template.cell_lines),null,context);
	scb.Utils.initialize_accessor_field(self,data,'treatment_list',{},scb.TreatmentList,context);
	scb.Utils.initialize_accessor_field(self,data,'stimulation_time','',null,context);
	scb.Utils.initialize_accessor_field(self,data,'collection_schedule_list',scb.utils.clone_and_clear(scb.utils.get(context.template.experiment_templates, ['default', 'collection_schedule_list'], {
		list : []
	})),scb.CollectionScheduleList,context);

	scb.Utils.accessor_toString(self.cell_line);
}