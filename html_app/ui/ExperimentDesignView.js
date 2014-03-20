'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.ExperimentDesignView = scb.ui.static.ExperimentDesignView || {};
scb.ui.static.ExperimentDesignView.TOTAL_STEPS =  5;

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



scb.ui.static.ExperimentDesignView.scb_s_experiment_design_technique_answer = function(element)
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
             parsed.experiment.technique = $(element).attr('value');
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

    scb.utils.off_on(workarea, 'change', '.scb_s_experiment_design_objective', function (e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_design_objective(this);
    });
	 scb.utils.off_on(workarea, 'change', '.scb_s_experiment_design_technique_answer', function (e) {
        scb.ui.static.ExperimentDesignView.scb_s_experiment_design_technique_answer(this);
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
            context: gstate.context,
			t : state.assignment.template,
			prev_step: state.experiment.prev_step,
			last_step: state.experiment.last_step,
            assignment: state.assignment,
            experiment: state.experiment
		}));
		state.experiment.prev_step = 1;
        state.experiment.last_view = 'experiment_design';
      if(state.experiment.last_step < scb.ui.static.ExperimentDesignView.TOTAL_STEPS)
			state.experiment.last_step = 3;
      document.title = state.experiment.name + " - StarCellBio" ;
      
        $('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: ($(window).height() - $('#main').outerHeight())/2
		});
      $(window).resize(function(){

			$('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: ($(window).height() - $('#main').outerHeight())/2
			});

		});
	}
}