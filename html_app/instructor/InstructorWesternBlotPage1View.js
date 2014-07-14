'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorWesternBlotPage1View = scb.ui.static.InstructorWesternBlotPage1View || {};



scb.ui.static.InstructorWesternBlotPage1View.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}



scb.ui.static.InstructorWesternBlotPage1View.scb_f_western_blot_page1_save_assignment_button = function(element, workarea){

	var parsed = scb.ui.static.InstructorWesternBlotPage1View.parse(element);
	
	scb.ui.static.InstructorFrame.pending_save(parsed);
	
	if($('.scb_f_western_blot_select_whole_cell_lysate').attr('checked')){
		parsed.assignment.template.lysate_kinds['whole'] = ({name: 'Whole Cell' });

	}
	if($('.scb_f_western_blot_select_nuclear').attr('checked')){
		parsed.assignment.template.lysate_kinds['cyto'] = ({name: 'Cytoplasm' });
	
	}
	if($('.scb_f_western_blot_select_cytoplasmic').attr('checked')){
		parsed.assignment.template.lysate_kinds['nuclear'] = ({name: 'Nuclear' });
			
	}
	
	parsed.assignment.template.ui.experimental_design.gel_types = [];
	
	if($('.scb_f_western_blot_select_ten').attr('checked')){
		parsed.assignment.template.ui.experimental_design.gel_types.push('.10');
	}
	if($('.scb_f_western_blot_select_twelve').attr('checked')){
		parsed.assignment.template.ui.experimental_design.gel_types.push('.12');
	}
	if($('.scb_f_western_blot_select_fifteen').attr('checked')){
		parsed.assignment.template.ui.experimental_design.gel_types.push('.15');
	}
	
	
	var state = {
		assignment_id: parsed.assignment.id,
		view: 'western_blot_page2',
		skip_hash_update: true
	};
				   
	scb.ui.static.InstructorFrame.refresh(state);
}




scb.ui.static.InstructorWesternBlotPage1View.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page1_save_assignment_button', function (e) {
    	scb.ui.static.InstructorWesternBlotPage1View.scb_f_western_blot_page1_save_assignment_button(this, e);
    });
    
    
    
    
    
    
  
};


scb.ui.InstructorWesternBlotPage1View = function scb_ui_InstructorWesternBlotPage1View(gstate) {
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
        

        workarea.html(scb_instructor_western_blot_page1.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            prev_step: prev_step,
            kind: kind,
            headings: assignments.selected.template.ui.add_multiple_dialog.headings, 
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