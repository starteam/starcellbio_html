'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.AssignmentsView = scb.ui.static.AssignmentsView || {};


scb.ui.static.AssignmentsView.ARROW_OFFSET =  15;
scb.ui.static.AssignmentsView.ARROW_DIVISION =  2;
scb.ui.static.AssignmentsView.HEADER_WIDTH = 579;
scb.ui.static.AssignmentsView.HEADER_OFFSET = 34;



scb.ui.static.AssignmentsView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);

    return parsed;
}

scb.ui.static.AssignmentsView.scb_assignments_header_link_wrapper = function (element, workarea) {
		var parsed = scb.ui.static.AssignmentsView.parse(element);
		var first_element =  $('.scb_s_assignments_slider_header').children().first().next()[0];
		var last_element =  $('.scb_s_assignments_slider_header').children().last().prev()[0];

        var section = $(element).attr('value');
        $('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
        $('.arrow-down-blue').detach();
        $(element).append('<div class="arrow-down-blue"></div>');
        $(element).addClass('scb_assignments_header_link_selected');
        $('.scb_s_display_section').hide()
        $('.scb_s_display_section[value="'+section+'"]').show();
        $('.arrow-down-blue').css('left', 
        	($('.arrow-down-blue').parent().width()/scb.ui.static.AssignmentsView.ARROW_DIVISION)-scb.ui.static.AssignmentsView.ARROW_OFFSET+'px');
        

        if(element == first_element){
              	$('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
       			$('.scb_s_assignment_header_img_left').addClass('scb_s_assignment_header_img_left_inactive');
        }
        else if(element == last_element){
       		$('.scb_s_assignment_header_img_right').addClass('scb_s_assignment_header_img_right_inactive');
       		$('.scb_s_assignment_header_img_left').removeClass('scb_s_assignment_header_img_left_inactive');
        }
        else{
            $('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
       		$('.scb_s_assignment_header_img_left').removeClass('scb_s_assignment_header_img_left_inactive');
        }
        parsed.assignment.last_instruction = $('.scb_assignments_header_link_selected').index()-1;
       		console.log(parsed.assignment.last_instruction);

     	var assignment_window = $('.scb_s_assignment_scroll')[0];
        if(assignment_window.scrollHeight == assignment_window.clientHeight)
				$('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
		else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

}


scb.ui.static.AssignmentsView.scb_s_assignment_header_img_left = function (element, workarea) {
		   var parsed = scb.ui.static.AssignmentsView.parse(element);
		   var first_element =  $('.scb_s_assignments_slider_header').children().first().next()[0];
		   var selected_element;
		   if($('.scb_assignments_header_link_selected')[0]  == first_element || $('.scb_assignments_header_link_selected')[0]  == $(first_element).next()[0]){
		   		 selected_element = first_element;
		   		 
      			$('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
       			$('.scb_s_assignment_header_img_left').addClass('scb_s_assignment_header_img_left_inactive');
		   }
		   else {
		   		selected_element= $('.scb_assignments_header_link_wrapper')[$('.scb_assignments_header_link_selected').index()-1-1];
            $('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
       		$('.scb_s_assignment_header_img_left').removeClass('scb_s_assignment_header_img_left_inactive');
			}
		
			$('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
			$(selected_element).addClass('scb_assignments_header_link_selected');
		
			$('.arrow-down-blue').detach();
			$(selected_element).append('<div class="arrow-down-blue"></div>');
			var section = $(selected_element).attr('value');
			$('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/scb.ui.static.AssignmentsView.ARROW_DIVISION)-scb.ui.static.AssignmentsView.ARROW_OFFSET+'px');

			
			$('.scb_s_display_section').hide()
			$('.scb_s_display_section[value="'+section+'"]').show();

			parsed.assignment.last_instruction = $('.scb_assignments_header_link_selected').index()-1-1;
					console.log(parsed.assignment.last_instruction);

			var assignment_window = $('.scb_s_assignment_scroll')[0];
			if(assignment_window.scrollHeight == assignment_window.clientHeight)
				$('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
			else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

}



scb.ui.static.AssignmentsView.scb_s_assignment_header_img_right = function (element, workarea) {
	var parsed = scb.ui.static.AssignmentsView.parse(element);
	var last_element =  $('.scb_s_assignments_slider_header').children().last().prev()[0];
	var selected_element;
       if ($('.scb_assignments_header_link_selected')[0]  == last_element || $('.scb_assignments_header_link_selected')[0]  == $(last_element).prev()[0]){
       		selected_element = last_element;
       		$('.scb_s_assignment_header_img_right').addClass('scb_s_assignment_header_img_right_inactive');
       		$('.scb_s_assignment_header_img_left').removeClass('scb_s_assignment_header_img_left_inactive');
       	}
       else {
       		selected_element = $('.scb_assignments_header_link_wrapper')[$('.scb_assignments_header_link_selected').index()];
       		
            $('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
       		$('.scb_s_assignment_header_img_left').removeClass('scb_s_assignment_header_img_left_inactive');
       	}
       	$('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
		$(selected_element).addClass('scb_assignments_header_link_selected');
       	
	
		$('.arrow-down-blue').detach();
		$(selected_element).append('<div class="arrow-down-blue"></div>');
		var section = $(selected_element).attr('value');
       	$('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/scb.ui.static.AssignmentsView.ARROW_DIVISION)-scb.ui.static.AssignmentsView.ARROW_OFFSET+'px');

       	
       	$('.scb_s_display_section').hide()
       	$('.scb_s_display_section[value="'+section+'"]').show();
       	
		parsed.assignment.last_instruction = $('.scb_assignments_header_link_selected').index()-1;
		console.log(parsed.assignment.last_instruction);
     	var assignment_window = $('.scb_s_assignment_scroll')[0];
        if(assignment_window.scrollHeight == assignment_window.clientHeight)
        	$('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
        else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

}

scb.ui.static.AssignmentsView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_assignments_header_link_wrapper', function (e) {
    	scb.ui.static.AssignmentsView.scb_assignments_header_link_wrapper(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_left', function (e) {
    		scb.ui.static.AssignmentsView.scb_s_assignment_header_img_left(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_right', function (e) {
    	 scb.ui.static.AssignmentsView.scb_s_assignment_header_img_right(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_assignments_new_experiment', function (e) {
		 $('.scb_f_experiments_step_link')[0].click();
    });
     scb.utils.off_on(workarea, 'click', '.scb_s_assignments_print_assignment', function (e) {
     
     	var pdfwindow = window.open("../../pdf/decusability_assignment.pdf", '_blank', false);
    	if (navigator.appName == 'Microsoft Internet Explorer') window.print();
    	else pdfwindow.print();
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
        var last_step=1;
        var prev_step;
        if(assignments.selected.experiments.selected !=null)
        	prev_step=assignments.selected.experiments.selected.prev_step;
        else prev_step = null;
        workarea.html(scb_assignments.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            prev_step: prev_step,
            context: gstate.context,
            courses: courses,
        }));
        
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(), gstate.workarea);
        document.title = "Assignments - StarCellBio"
        $('.scb_assignments_header_link_wrapper').css('width' , 
        	(scb.ui.static.AssignmentsView.HEADER_WIDTH/assignments.selected.template.instructions.length)-scb.ui.static.AssignmentsView.HEADER_OFFSET+ 'px');
       	$('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/scb.ui.static.AssignmentsView.ARROW_DIVISION)-scb.ui.static.AssignmentsView.ARROW_OFFSET+'px');
        
        $('.scb_s_ref_info_link').click(function(){
        	$('.scb_assignments_header_link_wrapper[value="Reference Material"]').click();
        });
        var assignment_window = $('.scb_s_assignment_scroll')[0];
		if(assignment_window.scrollHeight == assignment_window.clientHeight)
        	$('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
        else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

    }

}