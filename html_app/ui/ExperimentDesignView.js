'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.ExperimentDesignView = scb.ui.static.ExperimentDesignView || {};

scb.ui.static.ExperimentDesignView.update_experiment_design_hypothesis = function(element)
     {
         var experiment_id = $(element).attr('experiment_id');
         var assignment_id = $(element).attr('assignment_id');
         var state = {
             experiment_id: experiment_id,
             assignment_id: assignment_id,
             view:'experiment_design',
             skip_hash_update: true
         };
         var parsed = scb.ui.static.MainFrame.validate_state(state);
         if( parsed.redisplay )
         {
             alert( "INVALID ELEMENT!");
         }
         if( parsed.experiment )
         {
             parsed.experiment.hypothesis = $(element).attr('value');
         }
     }

scb.ui.static.ExperimentDesignView.scb_s_experiment_name_edit = function(element)
     {
         var experiment_id = $(element).attr('experiment_id');
         var assignment_id = $(element).attr('assignment_id');
         var state = {
             experiment_id: experiment_id,
             assignment_id: assignment_id,
             view:'experiment_design',
             skip_hash_update: true
         };
         var parsed = scb.ui.static.MainFrame.validate_state(state);
         if( parsed.redisplay )
         {
             alert( "INVALID ELEMENT!");
         }
         if( parsed.experiment )
         {
             parsed.experiment.name = $(element).attr('value');
         }
     }

scb.ui.static.ExperimentDesignView.register = function(workarea)
{
    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_design_hypothesis', function (e) {
        scb.ui.static.ExperimentDesignView.update_experiment_design_hypothesis(this);
    });

    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_name_edit', function (e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_name_edit(this);
    });
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