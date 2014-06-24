'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorDashboardView = scb.ui.static.InstructorDashboardView || {};


scb.ui.static.InstructorDashboardView.ARROW_OFFSET =  15;
scb.ui.static.InstructorDashboardView.ARROW_DIVISION =  2;
scb.ui.static.InstructorDashboardView.HEADER_WIDTH = 579;
scb.ui.static.InstructorDashboardView.HEADER_OFFSET = 34;



scb.ui.static.InstructorDashboardView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}

scb.ui.static.InstructorDashboardView.scb_f_dashboard_new_assignment_button = function (element, workarea) {
		var parsed = scb.ui.static.InstructorDashboardView.parse(element);
		var context = parsed.context;
		var parent = parsed.assignment.parent;
		
		var new_assignment_data = {
				id: Math.random().toString(36).substring(7),
				name: 'Shloka',
				course: '',
				course_name: '',
				description: '',
				experiments: {},
				template: {},
				permission: 'edit'
		};
		
		
		var new_assignment = parent.start(new_assignment_data);
		var state = {
			assignment_id: new_assignment.id,
			view: 'course_setup',
			skip_hash_update: true
		};   
     scb.ui.static.InstructorFrame.refresh(state);
		
// 		var new_assignment = new scb.Assignment(new_assignment_data, context, parent);
		// assignments = new scb.AssignmentList(master_model.assignments, context);
// 		scb.ui.static.InstructorFrame.refresh();
}


scb.ui.static.InstructorDashboardView.scb_s_assignment_header_img_left = function (element, workarea) {
		   var parsed = scb.ui.static.InstructorDashboardView.parse(element);

}



scb.ui.static.InstructorDashboardView.scb_s_assignment_header_img_right = function (element, workarea) {
	var parsed = scb.ui.static.InstructorDashboardView.parse(element);

}

scb.ui.static.InstructorDashboardView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_f_dashboard_new_assignment_button', function (e) {
    	scb.ui.static.InstructorDashboardView.scb_f_dashboard_new_assignment_button(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_left', function (e) {
    		scb.ui.static.InstructorDashboardView.scb_s_assignment_header_img_left(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_right', function (e) {
    	 scb.ui.static.InstructorDashboardView.scb_s_assignment_header_img_right(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_assignments_new_experiment', function (e) {
		 $('.scb_f_experiments_step_link').get(0).click();
    });

};

scb.ui.InstructorDashboardView = function scb_ui_InstructorDashboardView(gstate) {
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
        if(assignments.selected.experiments.selected !=null)
        	prev_step=assignments.selected.experiments.selected.prev_step;
        else prev_step = null;
        workarea.html(scb_instructor_dashboard.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            prev_step: prev_step,
            context: gstate.context,
            courses: courses,
        }));
        
        scb.ui.static.InstructorHomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item',workarea).first(), gstate.workarea);
        document.title = "Assignments - StarCellBio"
        $('.scb_assignments_header_link_wrapper','.scb_s_assignments_view').css('width' , 
        	(scb.ui.static.InstructorDashboardView.HEADER_WIDTH/assignments.selected.template.instructions.length)-scb.ui.static.InstructorDashboardView.HEADER_OFFSET+ 'px');
       	$('.arrow-down-blue','.scb_s_assignments_view').css('left', ($('.arrow-down-blue','.scb_s_assignments_view').parent().width()/scb.ui.static.InstructorDashboardView.ARROW_DIVISION)-scb.ui.static.InstructorDashboardView.ARROW_OFFSET+'px');
        
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