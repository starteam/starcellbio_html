'use strict';

if (typeof (scb.ui) == 'undefined') {
  scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.AssignmentsView = scb.ui.static.AssignmentsView || {};

scb.ui.static.AssignmentsView.HEADER_WIDTH = 657;
scb.ui.static.AssignmentsView.HEADER_OFFSET = 34;
scb.ui.static.AssignmentsView.BUTTON_WIDTH = 0;
scb.ui.static.AssignmentsView.BUTTON_LEFT = 0;



scb.ui.static.AssignmentsView.parse = function(element) {
  var assignment_id = $(element).attr('assignment_id');


  var state = {
    assignment_id: assignment_id,
    view: 'assignments',
    skip_hash_update: true
  };
  var parsed = scb.ui.static.MainFrame.validate_state(state);

  return parsed;
}

scb.ui.static.AssignmentsView.scb_s_assignments_header_btn = function(element, workarea) {
  var parsed = scb.ui.static.AssignmentsView.parse(element);
  $('.scb_s_assignment_scroll', '.scb_s_assignments_view').scrollTop(0);
  var first_element = $('.scb_s_assignments_slider_header', '.scb_s_assignments_view').children().first().next().get(0);
  var last_element = $('.scb_s_assignments_slider_header', '.scb_s_assignments_view').children().last().prev().get(0);

  var section = $(element).attr('value');
  $('.scb_s_assignments_header_btn').removeClass('scb_s_assignments_header_btn_selected');
  $('.arrow_down_blue_background, .arrow_down_blue_border').detach();
  $(element).append(
    '<span class="arrow_down_blue_background"></span>',
    '<span class="arrow_down_blue_border arrow_down_blue_border_selected"></span>'
  );
  $(element).addClass('scb_s_assignments_header_btn_selected');
  $('.scb_s_display_section').hide()
  $('.scb_s_display_section[value="' + section + '"]').show();
  $('.arrow_down_blue_background', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT - 4 + 'px');
  $('.arrow_down_blue_border', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT + 'px');


  if (element == first_element) {
    $('.scb_s_assignments_header_btn_right').removeClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').addClass('scb_s_assignments_header_btn_left_inactive');
  } else if (element == last_element) {
    $('.scb_s_assignments_header_btn_right').addClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').removeClass('scb_s_assignments_header_btn_left_inactive');
  } else {
    $('.scb_s_assignments_header_btn_right').removeClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').removeClass('scb_s_assignments_header_btn_left_inactive');
  }
  parsed.assignment.last_instruction = $('.scb_s_assignments_header_btn_selected').index() - 1;
  console.log(parsed.assignment.last_instruction);

  var assignment_window = $('.scb_s_assignment_scroll', '.scb_s_assignments_view').get(0);
  if (assignment_window.scrollHeight == assignment_window.clientHeight) {
    $('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
  } else {
    $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');
  }

}


scb.ui.static.AssignmentsView.scb_s_assignments_header_btn_left = function(element, workarea) {


  var parsed = scb.ui.static.AssignmentsView.parse(element);
  $('.scb_s_assignment_scroll', '.scb_s_assignments_view').scrollTop(0);
  var first_element = $('.scb_s_assignments_slider_header', '.scb_s_assignments_view').children().first().next().get(0);
  var selected_element;
  if ($('.scb_s_assignments_header_btn_selected', '.scb_s_assignments_view').get(0) == first_element || $('.scb_s_assignments_header_btn_selected', '.scb_s_assignments_view').get(0) == $(first_element, '.scb_s_assignments_view').next().get(0)) {
    selected_element = first_element;

    $('.scb_s_assignments_header_btn_right').removeClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').addClass('scb_s_assignments_header_btn_left_inactive');
  } else {
    selected_element = $('.scb_s_assignments_header_btn')[$('.scb_s_assignments_header_btn_selected').index() - 1 - 1];
    $('.scb_s_assignments_header_btn_right').removeClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').removeClass('scb_s_assignments_header_btn_left_inactive');
  }

  $('.scb_s_assignments_header_btn').removeClass('scb_s_assignments_header_btn_selected');
  $(selected_element).addClass('scb_s_assignments_header_btn_selected');

  $('.arrow_down_blue_background, .arrow_down_blue_border').detach();
  $(selected_element).append(
    '<span class="arrow_down_blue_background"></span>',
    '<span class="arrow_down_blue_border arrow_down_blue_border_selected"></span>'
  );
  var section = $(selected_element).attr('value');
  $('.arrow_down_blue_background', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT - 4 + 'px');
  $('.arrow_down_blue_border', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT + 'px');


  $('.scb_s_display_section').hide()
  $('.scb_s_display_section[value="' + section + '"]').show();

  parsed.assignment.last_instruction = $('.scb_s_assignments_header_btn_selected').index() - 1 - 1;
  console.log(parsed.assignment.last_instruction);

  var assignment_window = $('.scb_s_assignment_scroll', '.scb_s_assignments_view').get(0);
  if (assignment_window.scrollHeight == assignment_window.clientHeight) {
    $('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
  } else {
    $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');
  }

}


scb.ui.static.AssignmentsView.scb_s_assignments_header_btn_right = function(element, workarea) {
  var parsed = scb.ui.static.AssignmentsView.parse(element);
  $('.scb_s_assignment_scroll', '.scb_s_assignments_view').scrollTop(0);
  var last_element = $('.scb_s_assignments_slider_header', '.scb_s_assignments_view').children().last().prev().get(0);
  var selected_element;
  if ($('.scb_s_assignments_header_btn_selected', '.scb_s_assignments_view').get(0) == last_element || $('.scb_s_assignments_header_btn_selected', '.scb_s_assignments_view').get(0) == $(last_element, '.scb_s_assignments_view').prev().get(0)) {
    selected_element = last_element;
    $('.scb_s_assignments_header_btn_right').addClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').removeClass('scb_s_assignments_header_btn_left_inactive');
  } else {
    selected_element = $('.scb_s_assignments_header_btn')[$('.scb_s_assignments_header_btn_selected').index()];

    $('.scb_s_assignments_header_btn_right').removeClass('scb_s_assignments_header_btn_right_inactive');
    $('.scb_s_assignments_header_btn_left').removeClass('scb_s_assignments_header_btn_left_inactive');
  }
  $('.scb_s_assignments_header_btn').removeClass('scb_s_assignments_header_btn_selected');
  $(selected_element).addClass('scb_s_assignments_header_btn_selected');


  $('.arrow_down_blue_background, .arrow_down_blue_border').detach();
  $(selected_element).append(
    '<span class="arrow_down_blue_background"></span>',
    '<span class="arrow_down_blue_border arrow_down_blue_border_selected"></span>'
  );
  var section = $(selected_element).attr('value');
  $('.arrow_down_blue_background', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT - 4 + 'px');
  $('.arrow_down_blue_border', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT + 'px');


  $('.scb_s_display_section').hide()
  $('.scb_s_display_section[value="' + section + '"]').show();

  parsed.assignment.last_instruction = $('.scb_s_assignments_header_btn_selected').index() - 1;
  console.log(parsed.assignment.last_instruction);
  var assignment_window = $('.scb_s_assignment_scroll').get(0);
  if (assignment_window.scrollHeight == assignment_window.clientHeight) {
    $('.scb_s_assignments_bottom_scroll').addClass('scb_s_assignments_bottom_scroll_abs');
  } else {
    $('.scb_s_assignments_bottom_scroll').removeClass('scb_s_assignments_bottom_scroll_abs');
  }

}

scb.ui.static.AssignmentsView.register = function(workarea) {
  scb.utils.off_on(workarea, 'click mousedown', '.scb_s_assignments_header_btn', function(e) {
    scb.ui.static.AssignmentsView.scb_s_assignments_header_btn(this, e);
  });

  scb.utils.off_on(workarea, 'click', '.scb_s_assignments_header_btn_left', function(e) {
    if (!$(this).hasClass('scb_s_assignments_header_btn_left_inactive')) {
      scb.ui.static.AssignmentsView.scb_s_assignments_header_btn_left(this, e);
    }
  });

  scb.utils.off_on(workarea, 'click', '.scb_s_assignments_header_btn_right', function(e) {
    if (!$(this).hasClass('scb_s_assignments_header_btn_right_inactive')) {
      scb.ui.static.AssignmentsView.scb_s_assignments_header_btn_right(this, e);
    }
  });
  scb.utils.off_on(workarea, 'click', '.scb_assignments_new_experiment', function(e) {
    $('.scb_f_experiments_step_link').get(0).click();
  });
  scb.utils.off_on(workarea, 'click', '.scb_s_assignments_print_assignment', function(e) {
    console.log("assignment_id" + this.id);
    var pdf_file;
    if (this.id == "scb_ex1") {
      pdf_file = "SCB Exercise 1_ver 7_questions.pdf";

    } else if (this.id == "scb_ex2") {
      pdf_file = "SCB Exercise 2_ver 10 questions.pdf";
    } else if (this.id == "scb_ex3") {
      pdf_file = "SCB Exercise 3_ver17_questions.pdf";
    } else if (this.id == "decusability") {
      pdf_file = "decusability_assignment.pdf";

    }
    var pdfwindow = window.open("../../pdf/" + pdf_file, '_blank', false);
    $(pdfwindow.document).load(function() {});
  });
};

scb.ui.AssignmentsView = function scb_ui_AssignmentsView(gstate) {
  var self = this;
  self.show = function(state) {
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
    var courses = _.groupBy(assignments.list, function(assignment) {
      return (assignment.course);
    });
    _.each(courses, function(v, k) {
      try {
        v.name = v[0].course_name
      } catch ( e ) {
        console.info(e);
      };
    });
    window.courses = courses;
    window.assignments = assignments;
    var workarea = gstate.workarea;
    var last_step = 1;
    var prev_step;
    if (assignments.selected.experiments.selected != null) {
      prev_step = assignments.selected.experiments.selected.prev_step;
    } else {
      prev_step = null;
    }
    workarea.html(scb_assignments.main({
      global_template: gstate.context.master_model,
      assignments: assignments,
      last_step: last_step,
      prev_step: prev_step,
      context: gstate.context,
      courses: courses,
    }));

    scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item', workarea).first(), gstate.workarea);
    document.title = "Assignments - StarCellBio";
    var prev_next_width = 2*40; // Total width of previous and next buttons
    scb.ui.static.AssignmentsView.BUTTON_WIDTH = (scb.ui.static.AssignmentsView.HEADER_WIDTH - prev_next_width) / assignments.selected.template.instructions.length;
    scb.ui.static.AssignmentsView.BUTTON_LEFT = (scb.ui.static.AssignmentsView.BUTTON_WIDTH/2) - 14;
    $('.scb_s_assignments_header_btn', '.scb_s_assignments_view').css('width', scb.ui.static.AssignmentsView.BUTTON_WIDTH + 'px');
    $('.arrow_down_blue_background', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT - 4 + 'px');
    $('.arrow_down_blue_border', '.scb_s_assignments_view').css('left', scb.ui.static.AssignmentsView.BUTTON_LEFT + 'px');
    $('.scb_s_ref_info_link').click(function() {
      $('.scb_s_assignments_header_btn[value="Reference Material"]').click();
    });
    var assignment_window = $('.scb_s_assignment_scroll', '.scb_s_assignments_view').get(0);
    if (assignment_window.scrollHeight == assignment_window.clientHeight) {
      $('.scb_s_assignments_bottom_scroll', '.scb_s_assignments_view').addClass('scb_s_assignments_bottom_scroll_abs');
    } else {
      $('.scb_s_assignments_bottom_scroll', '.scb_s_assignments_view').removeClass('scb_s_assignments_bottom_scroll_abs');
    }


    $('#main').css({
      position: 'absolute',
      left: ($(window).width() - $('#main').outerWidth()) / 2,
      top: 0
    });
    $(window).resize(function() {

      $('#main').css({
        position: 'absolute',
        left: ($(window).width() - $('#main').outerWidth()) / 2,
        top: ($(window).height() - $('#main').outerHeight()) / 2
      });

    });

  }

}