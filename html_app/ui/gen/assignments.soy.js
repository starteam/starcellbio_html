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
  output.append('<div class=\'scb_s_abstract scb_s_assignments_description\'>', (opt_data.assignments.selected != null) ? '<div class=\'scb_s_abstract_title\'>' + opt_data.assignments.selected.name + '</div><div class=\'scb_s_assignments_slider_header\'><img class = \'scb_s_assignment_header_img_left\' src=\'../../images/header/scb_left_arrow_temp.jpg\'><div class=\'scb_assignments_header_link_wrapper\'>Goal</div><div class=\'scb_assignments_header_link_wrapper\'>Introduction</div><div class=\'scb_assignments_header_link_wrapper\'>Questions</div><div class=\'scb_assignments_header_link_wrapper\'>Reference Information</div><img class = \'scb_s_assignment_header_img_right\'  src=\'../../images/header/scb_right_arrow_temp.jpg\'></div><div class=\'scb_s_assignment_scroll\'>' + opt_data.assignments.selected.description + opt_data.assignments.selected.template.instructions + '</div><br/><a class="scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected.id) + '"> NEW EXPERIMENT &nbsp; <span aria-hidden="true" tabindex="-1">+</span></a><!--<a class="scb_f_select_assignment scb_s_navigation_button" href="#view=assignments&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected.id) + '">&#9664; &nbsp; ASSIGNMENTS</a>--><!--<div class="scb_s_abstract_title">' + opt_data.assignments.selected.name + '</div><br/>' + opt_data.assignments.selected.description + '<a class="scb_f_select_assignment scb_s_navigation_button" href="#view=assignment&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected_id) + '">COMPLETE ASSIGNMENT &nbsp; &#9654;</a>--><!--' : opt_data.global_template.app_description + '-->', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>Select Your Assignment: <div class="arrow-down"></div></h1><ul>');
  var courseList60 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen60 = courseList60.length;
  for (var courseIndex60 = 0; courseIndex60 < courseListLen60; courseIndex60++) {
    var courseData60 = courseList60[courseIndex60];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\'>', soy.$$escapeHtml(courseData60), '</div>');
    var assignmentList64 = opt_data.courses[courseData60];
    var assignmentListLen64 = assignmentList64.length;
    for (var assignmentIndex64 = 0; assignmentIndex64 < assignmentListLen64; assignmentIndex64++) {
      var assignmentData64 = assignmentList64[assignmentIndex64];
      output.append('<li class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData64.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData64.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData64.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData64.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData64.name), '</a></li><!--');
      if (assignmentData64.id == opt_data.assignments.selected_id) {
        scb_assignments.display_experiments({experiments: assignmentData64.experiments, assignment: assignmentData64}, output);
      }
      output.append('-->');
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
    var experimentList98 = opt_data.experiments.list;
    var experimentListLen98 = experimentList98.length;
    for (var experimentIndex98 = 0; experimentIndex98 < experimentListLen98; experimentIndex98++) {
      var experimentData98 = experimentList98[experimentIndex98];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData98.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData98.id), '\'>', soy.$$escapeHtml(experimentData98.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
