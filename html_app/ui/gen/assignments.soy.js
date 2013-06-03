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
  var assignmentList41 = opt_data.assignments.list;
  var assignmentListLen41 = assignmentList41.length;
  for (var assignmentIndex41 = 0; assignmentIndex41 < assignmentListLen41; assignmentIndex41++) {
    var assignmentData41 = assignmentList41[assignmentIndex41];
    output.append('<li class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData41.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData41.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData41.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData41.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData41.name), '</a></li>');
    if (assignmentData41.id == opt_data.assignments.selected_id) {
      scb_assignments.display_experiments({experiments: assignmentData41.experiments, assignment: assignmentData41}, output);
    }
  }
  output.append('</ul></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList72 = opt_data.experiments.list;
    var experimentListLen72 = experimentList72.length;
    for (var experimentIndex72 = 0; experimentIndex72 < experimentListLen72; experimentIndex72++) {
      var experimentData72 = experimentList72[experimentIndex72];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData72.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData72.id), '\'>', soy.$$escapeHtml(experimentData72.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
