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
		$('.scb_s_assignment_scroll','.scb_s_assignments_view').scrollTop(0);
		var first_element =  $('.scb_s_assignments_slider_header' ,'.scb_s_assignments_view').children().first().next().get(0);
		var last_element =  $('.scb_s_assignments_slider_header','.scb_s_assignments_view').children().last().prev().get(0);

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

     	var assignment_window = $('.scb_s_assignment_scroll','.scb_s_assignments_view').get(0);
        if(assignment_window.scrollHeight == assignment_window.clientHeight)
				$('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
		else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

}


scb.ui.static.AssignmentsView.scb_s_assignment_header_img_left = function (element, workarea) {


    var parsed = scb.ui.static.AssignmentsView.parse(element);
    $('.scb_s_assignment_scroll', '.scb_s_assignments_view').scrollTop(0);
    var first_element = $('.scb_s_assignments_slider_header', '.scb_s_assignments_view').children().first().next().get(0);
    var selected_element;
    if ($('.scb_assignments_header_link_selected', '.scb_s_assignments_view').get(0) == first_element || $('.scb_assignments_header_link_selected', '.scb_s_assignments_view').get(0) == $(first_element, '.scb_s_assignments_view').next().get(0)) {
        selected_element = first_element;

        $('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
        $('.scb_s_assignment_header_img_left').addClass('scb_s_assignment_header_img_left_inactive');
    }
    else {
        selected_element = $('.scb_assignments_header_link_wrapper')[$('.scb_assignments_header_link_selected').index() - 1 - 1];
        $('.scb_s_assignment_header_img_right').removeClass('scb_s_assignment_header_img_right_inactive');
        $('.scb_s_assignment_header_img_left').removeClass('scb_s_assignment_header_img_left_inactive');
    }

    $('.scb_assignments_header_link_wrapper').removeClass('scb_assignments_header_link_selected');
    $(selected_element).addClass('scb_assignments_header_link_selected');

    $('.arrow-down-blue').detach();
    $(selected_element).append('<div class="arrow-down-blue"></div>');
    var section = $(selected_element).attr('value');
    $('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width() / scb.ui.static.AssignmentsView.ARROW_DIVISION) - scb.ui.static.AssignmentsView.ARROW_OFFSET + 'px');


    $('.scb_s_display_section').hide()
    $('.scb_s_display_section[value="' + section + '"]').show();

    parsed.assignment.last_instruction = $('.scb_assignments_header_link_selected').index() - 1 - 1;
    console.log(parsed.assignment.last_instruction);

    var assignment_window = $('.scb_s_assignment_scroll', '.scb_s_assignments_view').get(0);
    if (assignment_window.scrollHeight == assignment_window.clientHeight)
        $('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
    else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

}


scb.ui.static.AssignmentsView.scb_s_assignment_header_img_right = function (element, workarea) {
    var parsed = scb.ui.static.AssignmentsView.parse(element);
    $('.scb_s_assignment_scroll', '.scb_s_assignments_view').scrollTop(0);
    var last_element = $('.scb_s_assignments_slider_header', '.scb_s_assignments_view').children().last().prev().get(0);
    var selected_element;
    if ($('.scb_assignments_header_link_selected', '.scb_s_assignments_view').get(0) == last_element || $('.scb_assignments_header_link_selected', '.scb_s_assignments_view').get(0) == $(last_element, '.scb_s_assignments_view').prev().get(0)) {
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
    $('.arrow-down-blue').css('left', ($('.arrow-down-blue').parent().width() / scb.ui.static.AssignmentsView.ARROW_DIVISION) - scb.ui.static.AssignmentsView.ARROW_OFFSET + 'px');


    $('.scb_s_display_section').hide()
    $('.scb_s_display_section[value="' + section + '"]').show();

    parsed.assignment.last_instruction = $('.scb_assignments_header_link_selected').index() - 1;
    console.log(parsed.assignment.last_instruction);
    var assignment_window = $('.scb_s_assignment_scroll').get(0);
    if (assignment_window.scrollHeight == assignment_window.clientHeight)
        $('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
    else $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');

}

scb.ui.static.AssignmentsView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_assignments_header_link_wrapper', function (e) {
    	scb.ui.static.AssignmentsView.scb_assignments_header_link_wrapper(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_left', function (e) {
        if(!$(this).hasClass('scb_s_assignment_header_img_left_inactive')) {
            scb.ui.static.AssignmentsView.scb_s_assignment_header_img_left(this, e);
        }
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_assignment_header_img_right', function (e) {
        if(!$(this).hasClass('scb_s_assignment_header_img_right_inactive')) {
            scb.ui.static.AssignmentsView.scb_s_assignment_header_img_right(this, e);
        }
    });
    scb.utils.off_on(workarea, 'click', '.scb_assignments_new_experiment', function (e) {
		 $('.scb_f_experiments_step_link').get(0).click();
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_assignments_print_assignment', function (e) {
     	console.log("assignment_id"+ this.id);
        var pdf_file;
        if(this.id=="scb_ex1"){
            pdf_file="SCB Exercise 1_ver 7_questions.pdf";

        }
        else if(this.id=="scb_ex2"){
        	pdf_file="SCB Exercise 2_ver 10 questions.pdf";
        }
        else if(this.id=="scb_ex3"){
        	pdf_file="SCB Exercise 3_ver17_questions.pdf";
        }
        else if(this.id=="decusability"){
            pdf_file="decusability_assignment.pdf";

        }
        var pdfwindow = window.open("../../pdf/"+pdf_file, '_blank', false);
        $(pdfwindow.document).load(function(){
            
        });
    });
};

scb.ui.AssignmentsView = function scb_ui_AssignmentsView(gstate) {
    var self = this;
    self.show = function (state) {
        var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
        var courses = _.groupBy(assignments.list, function (assignment) {
            return (assignment.course);
        });
        _.each( courses, function(v,k) {
            try {
                v.name = v[0].course_name
            } catch(e)
            {
                console.info(e);
            };
        });
        window.courses = courses;
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
        
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item',workarea).first(), gstate.workarea);
        document.title = "Assignments - StarCellBio"
        $('.scb_assignments_header_link_wrapper','.scb_s_assignments_view').css('width' , 
        	(scb.ui.static.AssignmentsView.HEADER_WIDTH/assignments.selected.template.instructions.length)-scb.ui.static.AssignmentsView.HEADER_OFFSET+ 'px');
       	$('.arrow-down-blue','.scb_s_assignments_view').css('left', ($('.arrow-down-blue','.scb_s_assignments_view').parent().width()/scb.ui.static.AssignmentsView.ARROW_DIVISION)-scb.ui.static.AssignmentsView.ARROW_OFFSET+'px');
        
        $('.scb_s_ref_info_link').click(function(){
        	$('.scb_assignments_header_link_wrapper[value="Reference Material"]').click();
        });
        var assignment_window = $('.scb_s_assignment_scroll','.scb_s_assignments_view').get(0);
		if(assignment_window.scrollHeight == assignment_window.clientHeight)
        	$('.scb_s_assignments_bottom_scroll','.scb_s_assignments_view').addClass('scb_s_assignments_bottom_scroll_abs');
        else $('.scb_s_assignments_bottom_scroll','.scb_s_assignments_view').removeClass('scb_s_assignments_bottom_scroll_abs');
    

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