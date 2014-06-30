// This file was automatically generated from instructor_select_technique.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_select_technique == 'undefined') { var scb_instructor_select_technique = {}; }


scb_instructor_select_technique.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_select_technique_container\' role=\'main\'>');
  scb_instructor_select_technique.display_assignment({global_template: opt_data.global_template, assignments: opt_data.assignments, view: 'select_course'}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_select_technique.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div>', (opt_data.view == 'select_course') ? '<div class=\'scb_s_select_technique_title\'>Course Setup</div>' : (opt_data.view == 'create_assignment') ? '' : '', '</div>');
  return opt_sb ? '' : output.toString();
};
