// This file was automatically generated from assignment.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment == 'undefined') { var scb_assignment = {}; }


scb_assignment.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_assignment.display_assignment(opt_data, output);
  scb_assignment.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_description\'><b>', opt_data.assignment.name, '</b><br/>', opt_data.assignment.description, opt_data.t.instructions, '<br/><a class="scb_f_open_experiment" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">Design experiment</a><a class="scb_f_select_assignment" href="#view=assignments&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">Assignments</a></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_sidebar\'>DISPLAY ASSIGNMENT SIDEBAR ', soy.$$escapeHtml(opt_data.assignment.id));
  scb_assignments.display_experiments({experiments: opt_data.assignment.experiments, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
