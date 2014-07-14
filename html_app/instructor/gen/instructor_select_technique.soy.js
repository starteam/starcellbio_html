// This file was automatically generated from instructor_select_technique.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_select_technique == 'undefined') { var scb_instructor_select_technique = {}; }


scb_instructor_select_technique.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_select_technique_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_select_technique.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_select_technique.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_experiment_setup_title\'>Select Technique</div><div class=\'scb_s_assignment_setup_course_name_heading\'>Which techniques should be available to your students?</div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_western_blot  scb_f_select_technique_select_western_blot" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '"  aria-checked="false"> <span>Western Blot</span></div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_facs scb_f_select_technique_select_facs" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>Flow Cytometry</span></div><div class=\'scb_s_select_technique_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_microscopy scb_f_select_technique_select_microscopy" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false"> <span>Microscopy</span></div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_select_technique_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};
