'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorSelectTechniqueView = scb.ui.static.InstructorSelectTechniqueView || {};



scb.ui.static.InstructorSelectTechniqueView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}



scb.ui.static.InstructorSelectTechniqueView.scb_f_select_technique_save_assignment_button = function(element, workarea){

	var parsed = scb.ui.static.InstructorSelectTechniqueView.parse(element);
	parsed.assignment.template.ui.experimental_design['techniques'] = [];
	
//                     techniques: [ 'wb' , 'facs', 'micro' ]
	if($('.scb_f_select_technique_select_western_blot').attr('checked')){
		parsed.assignment.template.ui.experimental_design.techniques.push('wb');
		parsed.assignment.template.model['western_blot'] = {};
	}
	
	if($('.scb_f_select_technique_select_facs').attr('checked')){
		parsed.assignment.template.ui.experimental_design.techniques.push('facs');
		parsed.assignment.template.model['facs'] = {};
	}
	
	if($('.scb_f_select_technique_select_microscopy').attr('checked')){
		parsed.assignment.template.ui.experimental_design.techniques.push('micro');
		parsed.assignment.template.model['microscopy'] = {};
	}
	
	
	
	
	scb.ui.static.InstructorFrame.pending_save(parsed);
	
	var view = '';
	if(_.contains(parsed.assignment.template.ui.experimental_design.techniques, 'wb'))
		view = 'western_blot_page1';
	else if(_.contains(parsed.assignment.template.ui.experimental_design.techniques, 'facs'))
		view = 'facs_page1';
	else if(_.contains(parsed.assignment.template.ui.experimental_design.techniques, 'micro'))
		view = 'micro_page1';

	
	var state = {
		assignment_id: parsed.assignment.id,
		view: view,
		skip_hash_update: true
	};
				   
	scb.ui.static.InstructorFrame.refresh(state);
}




scb.ui.static.InstructorSelectTechniqueView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_f_select_technique_save_assignment_button', function (e) {
    	scb.ui.static.InstructorSelectTechniqueView.scb_f_select_technique_save_assignment_button(this, e);
    });

};



scb.ui.static.InstructorSelectTechniqueView.enable_techniques = function(techniques){
	if(_.contains(techniques, 'wb'))
		$('.scb_f_select_technique_select_western_blot').attr('checked', true);
	if(_.contains(techniques, 'facs'))
		$('.scb_f_select_technique_select_facs').attr('checked', true);
	if(_.contains(techniques, 'micro'))
		$('.scb_f_select_technique_select_microscopy').attr('checked', true);
}

scb.ui.InstructorSelectTechniqueView = function scb_ui_InstructorSelectTechniqueView(gstate) {
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
        

        workarea.html(scb_instructor_select_technique.main({
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
                var techniques = scb.ui.static.InstructorSelectTechniqueView.enable_techniques(assignments.selected.template.ui.experimental_design.techniques);

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