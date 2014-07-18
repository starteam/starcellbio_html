'use strict';// strict mode to eliminate some common bugs


scb.Notebook = function scb_Notebook(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.ModelHelpers.common_entry_code(self, data, context);

 	scb.Utils.initialize_accessor_field(self, data, 'scroll', 0, null, context);
 	scb.Utils.initialize_accessor_field(self, data, 'edit_text', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'edit_image', false, null, context);
	scb.Utils.initialize_accessor_field(self,data,'sections',{},scb.NotebookSectionList,context);
	scb.Utils.initialize_accessor_field(self, data, 'image_experiment_id', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'image_western_blot_id', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'image_western_blot_gel_id', false, null, context);

	scb.Utils.initialize_accessor_field(self, data, 'image_facs_id', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'image_facs_lane_id', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'image_microscopy_id', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'image_microscopy_lane_id', false, null, context);


    scb.utils.accessor2_custom(self, 'selected_experiment', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(selected_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
    
	scb.utils.accessor2_custom(self, 'selected_western_blot', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(self.image_experiment_id).western_blot_list.get(self.image_western_blot_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
    
    scb.utils.accessor2_custom(self, 'selected_western_blot_gel', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(self.image_experiment_id).western_blot_list.get(self.image_western_blot_id).gel_list.get(self.image_western_blot_gel_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	
	
	scb.utils.accessor2_custom(self, 'selected_facs', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(self.image_experiment_id).facs_list.get(self.image_facs_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
    
    scb.utils.accessor2_custom(self, 'selected_facs_lane', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(self.image_experiment_id).facs_list.get(self.image_facs_id).lanes_list.get(self.image_facs_lane_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	
	
	scb.utils.accessor2_custom(self, 'selected_microscopy', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(self.image_experiment_id).microscopy_list.get(self.image_microscopy_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	
		scb.utils.accessor2_custom(self, 'selected_microscopy_lane', function () {
        var selected_id = self.image_experiment_id;
        if (selected_id != null) {
            return self.parent.experiments.get(self.image_experiment_id).microscopy_list.get(self.image_microscopy_id).lanes_list.get(self.image_microscopy_lane_id);
        } else {
            return null;
        }
    }, scb.utils.read_only_exception);
	


}