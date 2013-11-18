'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}

scb.ui.static = scb.ui.static || {};
scb.ui.static.AssignmentsView = scb.ui.static.AssignmentsView || {} ;

scb.ui.static.AssignmentsView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_assignments_header_link_wrapper', function (e) {
        var section = $(this).attr('value');
        $('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
        $(this).addClass('scb_assignments_header_link_selected');
        $('.scb_s_display_section').hide()
        $('.scb_s_display_section[value="'+section+'"]').show();
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_left', function (e) {
    	var index = 0;
    	var list = $('.scb_assignments_header_link_wrapper');
       for (var x = 0; x<list.length; x++){ 
       	if (list[x] == $('.scb_assignments_header_link_selected')[0]){
       		index = x;
       	 	$('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
       		console.log(x); 
       	}
       }
       if(index <=1){
       		 $(list[0]).addClass('scb_assignments_header_link_selected');
       		 $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_inactive.png');
       		 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
       }
       else {
       	$(list[index-1]).addClass('scb_assignments_header_link_selected');
       	 $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');
       	 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_inactive.png');
       	}
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_right', function (e) {
    	var index = 0;
    	var list = $('.scb_assignments_header_link_wrapper');
       for (var x = 0; x<list.length; x++){ 
       	if (list[x] == $('.scb_assignments_header_link_selected')[0]){
       		index = x;
       	 	$('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
       		console.log(x); 
       	}
       }
       if (index >= list.length -2){
       	$(list[list.length-1]).addClass('scb_assignments_header_link_selected');
       	$('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_inactive.png');
       	$('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');

       	}
       else {
       	$(list[index+1]).addClass('scb_assignments_header_link_selected');
       	$('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
       	$('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_inactive.png');

       	}
    });
};

scb.ui.AssignmentsView = function scb_ui_AssignmentsView(gstate) {
    var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
    var courses = _.groupBy(assignments.list, function (assignment) {
        return (assignment.course);
    });
    self.show = function (state) {
        window.assignments = assignments;
        var workarea = gstate.workarea;
        var last_step;
        // if(assignments.selected && assignments.selected.experiments.list.length >0)
//         	last_step = assignments.selected.experiments.selected.last_step;
//         else
        	last_step=1;
        workarea.html(scb_assignments.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            context: gstate.context,
            courses: courses,
        }));
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(), gstate.workarea);
        document.title = "Assignments - StarCellBio"
        $('.scb_assignments_header_link_wrapper').css('width' , (579/assignments.selected.template.instructions.length)-34+ 'px');
    }

}