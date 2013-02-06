// This file was automatically generated from assignment.soy.
// Please don't edit this file by hand.

if (typeof scb_assignment == 'undefined') { var scb_assignment = {}; }


scb_assignment.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 2, assignment_name: opt_data.assignment.name, assignment: opt_data.assignment}, output);
  scb_assignment.display_assignment(opt_data, output);
  scb_assignment.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_description\'><h1 class=\'scb_s_assignment_title\'>', opt_data.assignment.name, '</h1><hr class=\'scb_s_assignment_title_underline\'/>', opt_data.assignment.description, opt_data.t.instructions, '<br/><a class="scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '"> DESIGN EXPERIMENT &nbsp; &#9654;</a><a class="scb_f_select_assignment scb_s_navigation_button" href="#view=assignments&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">&#9664; &nbsp; ASSIGNMENT</a></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignment.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>', soy.$$escapeHtml(opt_data.assignment.name), '</h1>');
  scb_assignments.display_experiments({experiments: opt_data.assignment.experiments, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
