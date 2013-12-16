'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.AssignmentsView = scb.ui.static.AssignmentsView || {};

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
        var section = $(element).attr('value');
        $('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
        $('.arrow-down-blue').detach();
        $(element).append('<div class="arrow-down-blue"></div>');
        $(element).addClass('scb_assignments_header_link_selected');
        $('.scb_s_display_section').hide()
        $('.scb_s_display_section[value="'+section+'"]').show();
        $('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/2)-15+'px');
        
        var index = 0;
			var list = $('.scb_assignments_header_link_wrapper');
		   for (var x = 0; x<list.length; x++){ 
			if (list[x] == $('.scb_assignments_header_link_selected')[0]){
				index = x;
			}
		   }
        
        
        if(index <=0){
				 $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_inactive.png');
				 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
		   }
		else if(index == list.length -1){
				 $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');
				 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_inactive.png');
		   }
		   else  {
		     $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');
			 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
		}
        
       parsed.assignment.last_instruction = index;

}


scb.ui.static.AssignmentsView.scb_s_assignment_header_img_left = function (element, workarea) {
			var parsed = scb.ui.static.AssignmentsView.parse(element);
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
				 $('.arrow-down-blue').detach();
				 $(list[0]).append('<div class="arrow-down-blue"></div>');
				var section = $(list[0]).attr('value');
				 $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_inactive.png');
				 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
			 
			$('.scb_s_display_section').hide()
			$('.scb_s_display_section[value="'+section+'"]').show();
		   }
		   else {
			$(list[index-1]).addClass('scb_assignments_header_link_selected');
		
				 $('.arrow-down-blue').detach();
				 $(list[index-1]).append('<div class="arrow-down-blue"></div>');
			var section = $(list[index-1]).attr('value');
			 $('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');
			 $('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
		 
			$('.scb_s_display_section').hide()
			$('.scb_s_display_section[value="'+section+'"]').show();
			}
			$('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/2)-15+'px');
			parsed.assignment.last_instruction = index-1;
}



scb.ui.static.AssignmentsView.scb_s_assignment_header_img_right = function (element, workarea) {
	var parsed = scb.ui.static.AssignmentsView.parse(element);

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
       	var section = $(list[list.length-1]).attr('value');
       	
       		 $('.arrow-down-blue').detach();
       		 $(list[list.length-1]).append('<div class="arrow-down-blue"></div>');
       	$('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_inactive.png');
       	$('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');
		
		$('.scb_s_display_section').hide()
       	$('.scb_s_display_section[value="'+section+'"]').show();
       	}
       else {
       	$(list[index+1]).addClass('scb_assignments_header_link_selected');
       	var section = $(list[index+1]).attr('value');
       	
       		 $('.arrow-down-blue').detach();
       		 $(list[index+1]).append('<div class="arrow-down-blue"></div>');
       	$('.scb_s_assignment_header_img_right').attr('src', '../../images/homepage/scb_gray_right_arrow_active.png');
       	$('.scb_s_assignment_header_img_left').attr('src', '../../images/homepage/scb_gray_left_arrow_active.png');
		$('.scb_s_display_section').hide()
       	$('.scb_s_display_section[value="'+section+'"]').show();
       	}
       	$('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/2)-15+'px');
		parsed.assignment.last_instruction = index+1;
		

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
        $('.scb_assignments_header_link_wrapper').css('width' , (579/assignments.selected.template.instructions.length)-34+ 'px');
        $('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width()/2)-15+'px');
    }

}