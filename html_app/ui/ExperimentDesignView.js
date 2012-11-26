'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.ExperimentDesignView = function scb_ui_ExperimentDesignView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = state.workarea;
		workarea.html(scb_experiment_design.main({
            global_template : gstate.context.master_model,
			t : state.assignment.template,
            assignment: state.assignment,
            experiment: state.experiment
		}));
        state.experiment.last_view = 'experiment_design';
	}
}