// This file was automatically generated from instructor_western_blot.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_western_blot == 'undefined') { var scb_instructor_western_blot = {}; }


scb_instructor_western_blot.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'>');
  scb_instructor_western_blot.display_assignment({global_template: opt_data.global_template, assignments: opt_data.assignments, view: 'select_course'}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div>', (opt_data.view == 'select_course') ? '<div class=\'scb_s_western_blot_title\'>Course Setup</div>' : (opt_data.view == 'create_assignment') ? '' : '', '</div>');
  return opt_sb ? '' : output.toString();
};
