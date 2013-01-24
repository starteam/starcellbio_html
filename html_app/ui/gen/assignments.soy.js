// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(null, output);
  scb_common.assignment_step({step: 1}, output);
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
  output.append('<div class=\'scb_s_abstract\'>', (opt_data.assignments.selected != null) ? '<b>' + opt_data.assignments.selected.name + '</b><br/>' + opt_data.assignments.selected.description + '<a class="scb_f_select_assignment scb_s_navigation_button" href="#view=assignment&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected_id) + '">Assignments &#9654;</a>' : opt_data.global_template.app_description, '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>YOUR ASSIGNMENTS</h1><dl>');
  var assignmentList40 = opt_data.assignments.list;
  var assignmentListLen40 = assignmentList40.length;
  for (var assignmentIndex40 = 0; assignmentIndex40 < assignmentListLen40; assignmentIndex40++) {
    var assignmentData40 = assignmentList40[assignmentIndex40];
    output.append('<dt class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData40.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData40.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData40.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData40.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData40.name), '</a></dt>');
    if (assignmentData40.id == opt_data.assignments.selected_id) {
      scb_assignments.display_experiments({experiments: assignmentData40.experiments, assignment: assignmentData40}, output);
    }
  }
  output.append('</dl></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList71 = opt_data.experiments.list;
    var experimentListLen71 = experimentList71.length;
    for (var experimentIndex71 = 0; experimentIndex71 < experimentListLen71; experimentIndex71++) {
      var experimentData71 = experimentList71[experimentIndex71];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData71.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData71.id), '\'>', soy.$$escapeHtml(experimentData71.name), '</a></li>');
    }
  }
  output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></li></ul>');
  return opt_sb ? '' : output.toString();
};