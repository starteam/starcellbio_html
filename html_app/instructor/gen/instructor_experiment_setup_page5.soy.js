// This file was automatically generated from instructor_experiment_setup_page5.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_experiment_setup_page5 == 'undefined') { var scb_instructor_experiment_setup_page5 = {}; }


scb_instructor_experiment_setup_page5.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_experiment_setup_container\' role=\'main\'>');
  scb_instructor_experiment_setup_page5.display_assignment({global_template: opt_data.global_template, assignments: opt_data.assignments, view: 'select_course'}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page5.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_outline_description \'><div class=\'scb_s_outline_title\'>Builder Outline:</div></div><div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_experiment_setup_title\'>Experiment Setup</div></div>');
  return opt_sb ? '' : output.toString();
};
