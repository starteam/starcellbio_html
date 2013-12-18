'use strict';// strict mode to eliminate some common bugs

scb.ExperimentList = function scb_ExperimentList(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_list_code(self, data, scb.Experiment, context, self);
	//self.sort_order = 'reverse';

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		if (Object.keys(d).length == 0) {
			if (this.parent.template.experiment_templates && this.parent.template.experiment_templates['default']) {
				d = scb.utils.clone_and_clear(this.parent.template.experiment_templates['default']);
			}
		}
		if (! d.hasOwnProperty('name')) {
			d.name = self.next_name(true);
		}
		var ret = new scb.Experiment(d, context, self);
		data.list.push(d);
		return ret;
	}

	self.next_name = function(please_increment) {
		var ret = 'Experiment ' + data.counter;
		if (please_increment == true) {
			data.counter++;
		}
		return ret;
	}
}

scb.Experiment = function scb_Experiment(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);
    // experiment_design_fields
    scb.Utils.initialize_accessor_field(self,data,'hypothesis','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'objective','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'technique','',null,context);

    // ui state
    scb.Utils.initialize_accessor_field(self,data,'last_view','experiment_design',null,context);
    scb.Utils.initialize_accessor_field(self,data, 'prev_step', 0, null,context);

	scb.Utils.initialize_accessor_field(self,data, 'last_step', 0, null,context);
	scb.Utils.initialize_accessor_field(self,data, 'last_scroll', 0, null,context);
	scb.Utils.initialize_accessor_field(self,data, 'last_technique', 'undefined', null, context);
	scb.Utils.initialize_accessor_field(self,data, 'last_id', 'undefined', null, context);
	scb.Utils.initialize_accessor_field(self,data, 'last_technique_view', 'undefined', null, context);
	

	scb.Utils.initialize_accessor_field(self,data, 'last_param', 'undefined', null, context);

	scb.Utils.initialize_accessor_field(self,data,'cell_treatment_list',{},scb.CellTreatmentList,context);
	scb.Utils.initialize_accessor_field(self,data,'western_blot_list',{},scb.WesternBlotList,context);
	scb.Utils.initialize_accessor_field(self,data,'facs_list',{},scb.FacsList,context);
	scb.Utils.initialize_accessor_field(self,data,'microscopy_list',{},scb.MicroscopyList,context);
	scb.Utils.initialize_accessor_field(self,data,'setup_finished',false,null,context);
    scb.Utils.initialize_accessor_field(self,data,'new_row',{},null,context);
    scb.Utils.initialize_accessor_field(self,data,'design_wb_cb',false,null,context);
    scb.Utils.initialize_accessor_field(self,data,'design_fc_cb',false,null,context);
    scb.Utils.initialize_accessor_field(self,data,'design_mi_cb',false,null,context);


}