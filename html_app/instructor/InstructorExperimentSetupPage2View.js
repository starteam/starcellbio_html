'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorExperimentSetupPage2View = scb.ui.static.InstructorExperimentSetupPage2View || {};



scb.ui.static.InstructorExperimentSetupPage2View.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}





scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_course_name_value = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);
// 	parsed.assignment.course_name = $(element).val();
	var state = {
             assignment_id: parsed.assignment.id,
             view:'experiment_setup',
             skip_hash_update: true
         };
         var parsed = scb.ui.static.InstructorFrame.validate_state(state);
         if( parsed.redisplay )
         {
             alert( "INVALID ELEMENT!");
         }
         if( parsed.assignment )
         {
             parsed.assignment.course_name = $(element).val();
         }
// 	scb.ui.static.InstructorFrame.refresh();
}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_units_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_units_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_units_edit = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage2View.parse(element);

}



scb.ui.static.InstructorExperimentSetupPage2View.register = function(workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_course_name_value', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_course_name_value(this, e);
    });
    
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_treatment_edit', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_edit(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_treatment_concentration_edit', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_edit(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_treatment_concentration_units_edit select', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_treatment_concentration_units_edit(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_start_time_edit', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_edit(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_start_time_units_edit select', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_start_time_units_edit(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_duration_edit', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_edit(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_duration_units_edit', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage2View.scb_f_experiment_setup_duration_units_edit(this, e);
    });

    
    
    
    
  
};

scb.ui.InstructorExperimentSetupPage2View = function scb_ui_InstructorExperimentSetupPage2View(gstate) {
    var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
    var courses = _.groupBy(assignments.list, function (assignment) {
        return (assignment.course);
    });
    self.show = function (state) {
        window.assignments = assignments;
        var workarea = gstate.workarea;
        var last_step=1;
        var prev_step;
        
        var kind = 'select_course';
        
        if(assignments.selected.course_prepared){
        	kind = 'create_assignment';
        }
        
        
        if(assignments.selected.experiments.selected !=null)
        	prev_step=assignments.selected.experiments.selected.prev_step;
        else prev_step = null;
        
        
        workarea.html(scb_instructor_experiment_setup_page2.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            prev_step: prev_step,
            kind: kind,
            assignment: assignments.selected,
            context: gstate.context,
            courses: courses,
        }));
        
        document.title = "Assignments - StarCellBio"
            $('.scb_s_ref_info_link').click(function(){
        	$('.scb_assignments_header_link_wrapper[value="Reference Material"]').click();
        });


		$('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: 0
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