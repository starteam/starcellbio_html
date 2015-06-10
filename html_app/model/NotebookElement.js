'use strict';// strict mode to eliminate some common bugs

scb.NotebookElementList = function scb_NotebookElementList(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_list_code(self, data, scb.NotebookElement, context, self);

	self.start = function(d) {
        d = ( typeof (d) == 'undefined' ? {} : d);
        d.name = d.name || "Section. " + data.counter++;
		var ret = new scb.NotebookElement(d, context, self);
		data.list.push(d);
		return ret;
	}

	
}

scb.NotebookElement = function scb_NotebookElement(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);
    // experiment_design_fields
    scb.Utils.initialize_accessor_field(self,data,'type','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'data',null,null,context);
    scb.Utils.initialize_accessor_field(self,data,'view','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'experiment_id','',null,context);

    scb.Utils.initialize_accessor_field(self,data,'headings',null,null,context);
    scb.Utils.initialize_accessor_field(self,data,'rows',[],null,context);

    scb.Utils.initialize_accessor_field(self,data,'western_blot_id','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'gel_id','',null,context);

    scb.Utils.initialize_accessor_field(self,data,'exposure_time','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'facs_id','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'facs_lane_id','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'microscopy_id','',null,context);
     scb.Utils.initialize_accessor_field(self,data,'microscopy_lane_id','',null,context);
    
    scb.utils.accessor2_custom(self, 'selected_experiment', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
    
	scb.utils.accessor2_custom(self, 'selected_western_blot', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id).western_blot_list.get(self.western_blot_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
    
    scb.utils.accessor2_custom(self, 'selected_western_blot_gel', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id).western_blot_list.get(self.western_blot_id).gel_list.get(self.gel_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	
	
	scb.utils.accessor2_custom(self, 'selected_facs', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id).facs_list.get(self.facs_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
    
    scb.utils.accessor2_custom(self, 'selected_facs_lane', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id).facs_list.get(self.facs_id).lanes_list.get(self.facs_lane_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	
	
	scb.utils.accessor2_custom(self, 'selected_microscopy', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id).microscopy_list.get(self.microscopy_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	
		scb.utils.accessor2_custom(self, 'selected_microscopy_lane', function () {
        var selected_id = self.experiment_id;
        if (selected_id != null) {
            return self.parent.parent.parent.parent.parent.experiments.get(self.experiment_id).microscopy_list.get(self.microscopy_id).lanes_list.get(self.microscopy_lane_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);

}