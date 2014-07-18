'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorExperimentSetupPage1View = scb.ui.static.InstructorExperimentSetupPage1View || {};

scb.ui.static.InstructorExperimentSetupPage1View.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}


scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_page1_save_assignment_button = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);
	
	scb.ui.static.InstructorFrame.pending_save(parsed);
	
	var state = {
		assignment_id: parsed.assignment.id,
		view: 'experiment_setup_page2',
		skip_hash_update: true
	};
				   
	scb.ui.static.InstructorFrame.refresh(state);
}



scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_add_strain = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);
	var strain_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	parsed.assignment.template.cell_lines[strain_id] = {name: $(element).val()};

	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_list_item = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);
	var strain_id = $(element).attr('strain_id') ? $(element).attr('strain_id'):  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	parsed.assignment.template.cell_lines[strain_id] = {name: $(element).val()};

	
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_temperature = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);
	parsed.assignment.has_temperature = !parsed.assignment.has_temperature;
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_start_time = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);
	parsed.assignment.has_start_time = !parsed.assignment.has_start_time;
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_duration = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);	
	parsed.assignment.has_duration = !parsed.assignment.has_duration;	
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_collection_time = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage1View.parse(element);
	parsed.assignment.has_collection_time = !parsed.assignment.has_collection_time;	
	scb.ui.static.InstructorFrame.refresh();

}


scb.ui.static.InstructorExperimentSetupPage1View.register = function(workarea) {
	scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_list_item', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_list_item(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_add_strain', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_add_strain(this, e);
    });
    
    
	
	scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_select_temperature', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_temperature(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_select_start_time', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_start_time(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_select_duration', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_duration(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_experiment_setup_select_collection_time', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_select_collection_time(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_page1_save_assignment_button', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage1View.scb_f_experiment_setup_page1_save_assignment_button(this, e);
    });


    
    

  
};

scb.ui.InstructorExperimentSetupPage1View = function scb_ui_InstructorExperimentSetupPage1View(gstate) {
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
        
        
        workarea.html(scb_instructor_experiment_setup_page1.main({
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