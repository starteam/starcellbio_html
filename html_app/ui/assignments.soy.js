// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_assignments.display_header(opt_data, output);
  scb_assignments.display_assignments(opt_data, output);
  scb_assignments.display_abstract(opt_data, output);
  scb_assignments.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_header\'>', soy.$$escapeHtml(opt_data.t.app_title), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_footer\'>Here comes footer</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_abstract = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_abstract\'>', (opt_data.assignments.selected != null) ? '<b>' + opt_data.assignments.selected.name + '</b><br/>' + opt_data.assignments.selected.description : opt_data.t.app_description, '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><dl>');
  var assignmentList36 = opt_data.assignments.list;
  var assignmentListLen36 = assignmentList36.length;
  for (var assignmentIndex36 = 0; assignmentIndex36 < assignmentListLen36; assignmentIndex36++) {
    var assignmentData36 = assignmentList36[assignmentIndex36];
    output.append('<dt class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData36.id == opt_data.assignments.selected_id) ? 'assignment' : 'assignments', '&assignment_id=', soy.$$escapeHtml(assignmentData36.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData36.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData36.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData36.name), '</a></dt>');
    if (assignmentData36.id == opt_data.assignments.selected_id) {
      scb_assignments.display_experiments({experiments: assignmentData36.experiments, assignment: assignmentData36}, output);
    }
  }
  output.append('</dl></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList67 = opt_data.experiments.list;
    var experimentListLen67 = experimentList67.length;
    for (var experimentIndex67 = 0; experimentIndex67 < experimentListLen67; experimentIndex67++) {
      var experimentData67 = experimentList67[experimentIndex67];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData67.id), '\'>', soy.$$escapeHtml(experimentData67.name), '</a></li>');
    }
  }
  output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></li></ul>');
  return opt_sb ? '' : output.toString();
};
