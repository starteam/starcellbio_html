'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.ExperimentDesignView = scb.ui.static.ExperimentDesignView || {};

scb.ui.static.ExperimentDesignView.parsed = function(element)
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
    return parsed;
}

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


scb.ui.static.ExperimentDesignView.scb_s_experiment_design_objective = function(element)
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
             parsed.experiment.objective = $(element).attr('value');
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

scb.ui.static.ExperimentDesignView.scb_s_experiment_design_technique_checkbox = function(element,event)
{
    var parsed = scb.ui.static.ExperimentDesignView.parsed(element);
    var key = $(element).attr('data-key');
    var value = !_.isUndefined($(element).attr('checked'));
    if( parsed.experiment )
    {
        parsed.experiment[key] = value;
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.ExperimentDesignView.scb_s_experiment_design_technique = function(element,event)
{
    var parsed = scb.ui.static.ExperimentDesignView.parsed(element);
    var key = $(element).attr('data-key');
    if( parsed.experiment )
    {
        parsed.experiment[key] = ! parsed.experiment[key];
        scb.ui.static.MainFrame.refresh();
    }
}
scb.ui.static.ExperimentDesignView.register = function(workarea)
{
    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_design_hypothesis', function (e) {
        scb.ui.static.ExperimentDesignView.update_experiment_design_hypothesis(this);
    });

    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_design_objective', function (e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_design_objective(this);
    });

    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_name_edit', function (e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_name_edit(this);
    });

    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_design_technique_checkbox' , function(e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_design_technique_checkbox(this,e);
    })

    scb.utils.off_on(workarea, 'click' , '.scb_s_experiment_design_technique' , function(e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_design_technique(this,e);
    });


}

scb.ui.ExperimentDesignView = function scb_ui_ExperimentDesignView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = state.workarea;
		workarea.html(scb_experiment_design.main({
            global_template : gstate.context.master_model,
            context: gstate.context,
			t : state.assignment.template,
            assignment: state.assignment,
            experiment: state.experiment
		}));
        state.experiment.last_view = 'experiment_design';
        //state.assignments.last_step = 3;
        document.title = state.experiment.name + " - StarCellBio" ;
	}
}