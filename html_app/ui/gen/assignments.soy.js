// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(null, output);
  scb_common.assignment_step({step: 1, assignments: assignments}, output);
  scb_assignments.display_assignments(opt_data, output);
  scb_assignments.display_abstract(opt_data, output);
  scb_homepage.display_experiment_design(null, output);
  scb_homepage.display_footer(null, output);
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
  var courseList42 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen42 = courseList42.length;
  for (var courseIndex42 = 0; courseIndex42 < courseListLen42; courseIndex42++) {
    var courseData42 = courseList42[courseIndex42];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\'>', soy.$$escapeHtml(courseData42), '</div>');
    var assignmentList46 = opt_data.courses[courseData42];
    var assignmentListLen46 = assignmentList46.length;
    for (var assignmentIndex46 = 0; assignmentIndex46 < assignmentListLen46; assignmentIndex46++) {
      var assignmentData46 = assignmentList46[assignmentIndex46];
      output.append('<li class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData46.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData46.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData46.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData46.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData46.name), '</a></li>');
      if (assignmentData46.id == opt_data.assignments.selected_id) {
        scb_assignments.display_experiments({experiments: assignmentData46.experiments, assignment: assignmentData46}, output);
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
