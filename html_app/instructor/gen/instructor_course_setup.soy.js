// This file was automatically generated from instructor_course_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_course_setup == 'undefined') { var scb_instructor_course_setup = {}; }


scb_instructor_course_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_course_setup_container\' role=\'main\'>');
  scb_instructor_course_setup.display_assignment(opt_data, output);
  output.append('</div>');
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_course_setup.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'>', (opt_data.assignments.selected != null) ? '<div class=\'scb_s_abstract_title\'>Assignment Editor</div>' : '', '<br/></div>');
  return opt_sb ? '' : output.toString();
};
