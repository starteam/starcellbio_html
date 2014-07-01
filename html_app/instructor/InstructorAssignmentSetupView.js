'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorAssignmentSetupView = scb.ui.static.InstructorAssignmentSetupView || {};


scb.ui.static.InstructorAssignmentSetupView.ARROW_OFFSET =  15;
scb.ui.static.InstructorAssignmentSetupView.ARROW_DIVISION =  2;
scb.ui.static.InstructorAssignmentSetupView.HEADER_WIDTH = 579;
scb.ui.static.InstructorAssignmentSetupView.HEADER_OFFSET = 34;



scb.ui.static.InstructorAssignmentSetupView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}



scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_assignment_name_value = function(element, workarea){
	var parsed = scb.ui.static.InstructorAssignmentSetupView.parse(element);
// 	parsed.assignment.course_name = $(element).val();
	
	var state = {
             assignment_id: parsed.assignment.id,
             view:'assignment_setup',
             skip_hash_update: true
         };
         var parsed = scb.ui.static.InstructorFrame.validate_state(state);
         if( parsed.redisplay )
         {
             alert( "INVALID ELEMENT!");
         }
         if( parsed.assignment )
         {
             parsed.assignment.name = $(element).val();
         }
	
// 	scb.ui.static.InstructorFrame.refresh();
	

}

scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_save_assignment_button = function(element, workarea){
	var parsed = scb.ui.static.InstructorAssignmentSetupView.parse(element);
	if(parsed.assignment.name != ''){
		parsed.assignment.assignment_prepared = true;
	}
	else parsed.assignment.assignment_prepared = false;
	if(parsed.assignment.assignment_prepared){
		$.ajax({
			type: "POST",
			url: '../scb/create_new_assignment.js',
			data: JSON.stringify({assignment: parsed.assignment.__data__})
		}).done(function(e) {
			if(e == 'created'){
				var state = {
					assignment_id: parsed.assignment.id,
					view: 'experiment_setup_page1',
					skip_hash_update: true
				};
				   
			 	scb.ui.static.InstructorFrame.refresh(state);
			}
			else{
				$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert('This assignment has already been created. Create a new assignment.', 
				function() {	$('html').css('overflow', 'visible');
							$('.error_overlay').remove()/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
			}
		});
	}


	

}

scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_create_new_assignment = function(element, workarea){
	var parsed = scb.ui.static.InstructorAssignmentSetupView.parse(element);
	parsed.assignment.is_new_assignment = true;
	//GOODNESSGRACIOUS ME
	//INCLUDE ARCHIVED ASSIGNMENTS -- fix the request to one list
	//ROWS FOR PUBLIC PRIVATE FUNCTIONALITY
	//MANAGEABLE
	
	//ASSIGNMENT ROWS
	//TABLE FOR LAYOUT
	//FIX COURSE SETUP
	
	
		parsed.assignment.description = assignment_template.description;
	parsed.assignment.last_instruction = assignment_template.last_instruction;
	parsed.assignment.name = assignment_template.name;
	parsed.assignment.template = assignment_template.template;
	parsed.assignment.template_id = assignment_template.id;
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_choose_existing_template = function(element, workarea){
	var parsed = scb.ui.static.InstructorAssignmentSetupView.parse(element);
	parsed.assignment.is_new_assignment = false;	
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_back_button = function(element, workarea){
	var parsed = scb.ui.static.InstructorAssignmentSetupView.parse(element);
	parsed.assignment.course_prepared = false;	
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_template_select = function(element, workarea){
	var parsed = scb.ui.static.InstructorAssignmentSetupView.parse(element);
	parsed.assignment.is_new_assignment = false;
	
	var template_id = $(element).val();
	var assignment_template = parsed.assignment.parent.get(template_id);
	
	parsed.assignment.description = assignment_template.description;
	parsed.assignment.last_instruction = assignment_template.last_instruction;
	parsed.assignment.name = assignment_template.name;
	parsed.assignment.template = assignment_template.template;
	parsed.assignment.template_id = assignment_template.id;
	
	
	scb.ui.static.InstructorFrame.refresh();

}



scb.ui.static.InstructorAssignmentSetupView.register = function(workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_assignment_setup_assignment_name_value', function (e) {
    	scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_assignment_name_value(this, e);
    });
     scb.utils.off_on(workarea, 'click', '.scb_f_assignment_setup_save_assignment_button', function (e) {
    	scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_save_assignment_button(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_assignment_setup_create_new_assignment', function (e) {
    	scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_create_new_assignment(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_assignment_setup_choose_existing_template', function (e) {
    	scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_choose_existing_template(this, e);
    });    
    scb.utils.off_on(workarea, 'click', '.scb_f_assignment_setup_back_button', function (e) {
    	scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_back_button(this, e);
    });    
    scb.utils.off_on(workarea, 'change', '.scb_s_assignment_setup_assignment_list  select', function (e) {
    	scb.ui.static.InstructorAssignmentSetupView.scb_f_assignment_setup_template_select(this, e);
    });
};

scb.ui.InstructorAssignmentSetupView = function scb_ui_InstructorAssignmentSetupView(gstate) {
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
        
//         var kind = 'select_course';
        
        if(assignments.selected.course_prepared){
//         	kind = 'create_assignment';
        }
        
        
        if(assignments.selected.experiments.selected !=null)
        	prev_step=assignments.selected.experiments.selected.prev_step;
        else prev_step = null;
        
        
        workarea.html(scb_instructor_assignment_setup.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            prev_step: prev_step,
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