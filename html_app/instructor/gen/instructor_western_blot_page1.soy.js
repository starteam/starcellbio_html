// This file was automatically generated from instructor_western_blot_page1.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_western_blot_page1 == 'undefined') { var scb_instructor_western_blot_page1 = {}; }


scb_instructor_western_blot_page1.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_western_blot_page1.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page1.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_western_blot_title\'>Western Blotting</div><div class=\'scb_s_assignment_setup_course_name_heading\'><i>Sample Prep</i></div><div class=\'scb_s_assignment_setup_course_name_heading\'>1. What lysate types are available?</div>');
  scb_instructor_western_blot_page1.sample_prep(opt_data, output);
  output.append('<div class=\'scb_s_assignment_setup_course_name_heading\'><i>Prepare Gel</i></div><div class=\'scb_s_assignment_setup_course_name_heading\'>2. What percentages of acrylamide are available?</div>');
  scb_instructor_western_blot_page1.prepare_gel(opt_data, output);
  output.append('<div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_western_blot_page1_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page1.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_western_blot  scb_f_western_blot_select_whole_cell_lysate" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '"  aria-checked="false"> <span>Whole Cell Lysate</span></div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_facs scb_f_western_blot_select_nuclear" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>Nuclear Fractionation</span></div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_microscopy scb_f_western_blot_select_cytoplasmic" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>Cytoplasmic Fractionation</span></div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page1.prepare_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_western_blot  scb_f_western_blot_select_ten" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>10%</span></div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_facs          scb_f_western_blot_select_twelve"         type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>12%</span></div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_microscopy    scb_f_western_blot_select_fifteen"   type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>15%</span></div>');
  return opt_sb ? '' : output.toString();
};
