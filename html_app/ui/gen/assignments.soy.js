// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, last_step: opt_data.last_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_assignments_container\'>');
  scb_assignments.display_assignments(opt_data, output);
  scb_assignments.display_assignment(opt_data, output);
  output.append('</div>');
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_header\'>', soy.$$escapeHtml(opt_data.global_template.app_title), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_footer\'>Here comes footer</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_abstract scb_s_assignments_description\'>', (opt_data.assignments.selected != null) ? '<div class=\'scb_s_abstract_title\'>' + opt_data.assignments.selected.name + '</div><div class=\'scb_s_assignments_slider_header\'><img class = \'scb_s_assignment_header_img_left\' src=\'../../images/header/scb_left_arrow_temp.jpg\'><div class=\'scb_assignments_header_link_wrapper scb_s_assignments_slider_overview scb_assignments_header_link_selected\' value=\'assignment_overview\'>Overview</div><div class=\'scb_assignments_header_link_wrapper scb_s_assignments_slider_detail\' value=\'assignment_detail\'>Assignment Description</div><!--<div class=\'scb_assignments_header_link_wrapper scb_s_assignments_slider_setup\'>Experiment Setup</div><div class=\'scb_assignments_header_link_wrapper scb_s_assignments_slider_refinfo\'>Reference Information</div>--><img class = \'scb_s_assignment_header_img_right\'  src=\'../../images/header/scb_right_arrow_temp.jpg\'></div><div class=\'scb_s_assignment_scroll\'><div class=\'scb_s_display_section\' value=\'assignment_overview\'>' + opt_data.assignments.selected.description + '</div><div class=\'scb_s_display_section\' value=\'assignment_detail\'>' + opt_data.assignments.selected.template.instructions + '</div></div><br/><a class="scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected.id) + '"> NEW EXPERIMENT &nbsp; <span aria-hidden="true" tabindex="-1">+</span></a>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>Select Your Assignment: <div class="arrow-down"></div></h1><ul>');
  var courseList47 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen47 = courseList47.length;
  for (var courseIndex47 = 0; courseIndex47 < courseListLen47; courseIndex47++) {
    var courseData47 = courseList47[courseIndex47];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\'>', soy.$$escapeHtml(courseData47), '</div>');
    var assignmentList51 = opt_data.courses[courseData47];
    var assignmentListLen51 = assignmentList51.length;
    for (var assignmentIndex51 = 0; assignmentIndex51 < assignmentListLen51; assignmentIndex51++) {
      var assignmentData51 = assignmentList51[assignmentIndex51];
      output.append('<li class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData51.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData51.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData51.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData51.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData51.name), '</a></li>');
    }
    output.append('</div>');
  }
  output.append('</ul></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList79 = opt_data.experiments.list;
    var experimentListLen79 = experimentList79.length;
    for (var experimentIndex79 = 0; experimentIndex79 < experimentListLen79; experimentIndex79++) {
      var experimentData79 = experimentList79[experimentIndex79];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData79.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData79.id), '\'>', soy.$$escapeHtml(experimentData79.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
