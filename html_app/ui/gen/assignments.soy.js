// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(null, output);
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
  output.append('<div class=\'scb_s_abstract\'>', (opt_data.assignments.selected != null) ? '<b>' + opt_data.assignments.selected.name + '</b><br/>' + opt_data.assignments.selected.description : opt_data.global_template.app_description, '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>YOUR ASSIGNMENTS</h1><dl>');
  var assignmentList35 = opt_data.assignments.list;
  var assignmentListLen35 = assignmentList35.length;
  for (var assignmentIndex35 = 0; assignmentIndex35 < assignmentListLen35; assignmentIndex35++) {
    var assignmentData35 = assignmentList35[assignmentIndex35];
    output.append('<dt class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData35.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData35.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData35.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData35.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData35.name), '</a></dt>');
    if (assignmentData35.id == opt_data.assignments.selected_id) {
      scb_assignments.display_experiments({experiments: assignmentData35.experiments, assignment: assignmentData35}, output);
    }
  }
  output.append('</dl></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList66 = opt_data.experiments.list;
    var experimentListLen66 = experimentList66.length;
    for (var experimentIndex66 = 0; experimentIndex66 < experimentListLen66; experimentIndex66++) {
      var experimentData66 = experimentList66[experimentIndex66];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData66.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData66.id), '\'>', soy.$$escapeHtml(experimentData66.name), '</a></li>');
    }
  }
  output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></li></ul>');
  return opt_sb ? '' : output.toString();
};
