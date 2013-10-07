// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, last_step: opt_data.last_step, assignments: assignments}, output);
  scb_assignments.display_assignments(opt_data, output);
  scb_assignments.display_abstract(opt_data, output);
  scb_homepage.display_experiment_design(null, output);
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


scb_assignments.display_abstract = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_abstract\'>', (opt_data.assignments.selected != null) ? '<span class="scb_s_abstract_title">' + opt_data.assignments.selected.name + '</span><div class=\'scb_s_abstract_title_underline\'></div>' + opt_data.assignments.selected.description + '<a class="scb_f_select_assignment scb_s_navigation_button" href="#view=assignment&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected_id) + '">COMPLETE ASSIGNMENT &nbsp; &#9654;</a>' : opt_data.global_template.app_description, '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>Your Assignments</h1><ul>');
  var courseList46 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen46 = courseList46.length;
  for (var courseIndex46 = 0; courseIndex46 < courseListLen46; courseIndex46++) {
    var courseData46 = courseList46[courseIndex46];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\'>', soy.$$escapeHtml(courseData46), '</div>');
    var assignmentList50 = opt_data.courses[courseData46];
    var assignmentListLen50 = assignmentList50.length;
    for (var assignmentIndex50 = 0; assignmentIndex50 < assignmentListLen50; assignmentIndex50++) {
      var assignmentData50 = assignmentList50[assignmentIndex50];
      output.append('<li class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData50.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData50.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData50.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData50.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData50.name), '</a></li>');
      if (assignmentData50.id == opt_data.assignments.selected_id) {
        scb_assignments.display_experiments({experiments: assignmentData50.experiments, assignment: assignmentData50}, output);
      }
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
    var experimentList83 = opt_data.experiments.list;
    var experimentListLen83 = experimentList83.length;
    for (var experimentIndex83 = 0; experimentIndex83 < experimentListLen83; experimentIndex83++) {
      var experimentData83 = experimentList83[experimentIndex83];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData83.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData83.id), '\'>', soy.$$escapeHtml(experimentData83.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
