'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.ExperimentSetupView = function scb_ui_ExperimentSetupView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = state.workarea;
        var template = state.assignment.template;
        var headings = [];
        for( var part in template.ui.table)
        {
            if( part.kind == 'cell_line')
            {
                headings.push(part);
            }
            if( part.kind == 'treatments')
            {
                for( var subpart in part.children)
                {
                    headings.push(subpart);
                }
            }
            if( part.kind == 'custom')
            {
                headings.push(part);
            }
        }
        //TODO: loop over samples
        //TODO: loop over headings

		workarea.html(scb_experiment_setup.main({
            global_template : gstate.context.master_model,
			t : template,
            assignment: state.assignment,
            experiment: state.experiment
		}));
        state.experiment.last_view = 'experiment_design';
	}
}