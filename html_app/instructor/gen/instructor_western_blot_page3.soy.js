// This file was automatically generated from instructor_western_blot_page3.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_western_blot_page3 == 'undefined') { var scb_instructor_western_blot_page3 = {}; }


scb_instructor_western_blot_page3.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_western_blot_page3.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page3.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>4. Define the size of the protein bands in kilodaltons (kDa) detected by each primary and secondary antibody combination.</div><p/><span class=\'scb_s_western_blot_antibody_heading\'>Note: When multiple bands are detected by a particular antibody combination, separate the sizes of the bands by a comma. For example: 13, 42, 60. Do not include the units in the text box.</span><div class=\'scb_s_western_blot_antibody_size_wrapper\'><span class=\'scb_s_assignment_setup_course_name_heading \'>Primary antibody</span><span class=\'scb_s_assignment_setup_course_name_heading \'>Corresponding Secondary antibody</span><div class=\'scb_s_western_blot_primary_anti_body_wrapper\'><ol class=\'scb_s_experiment_setup_list\'>');
  var strainList27 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
  var strainListLen27 = strainList27.length;
  for (var strainIndex27 = 0; strainIndex27 < strainListLen27; strainIndex27++) {
    var strainData27 = strainList27[strainIndex27];
    output.append((! (strainData27 == 'order')) ? '<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'><span class=\'scb_s_experiment_setup_text_field scb_s_western_blot_page3_primary_antibody scb_f_western_blot_primary_anti_body_list_item\' anti_body_id=\'' + soy.$$escapeHtml(strainData27) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'>' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData27].name) + '</span><span type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_secondary_anti_body_list_item\' placeholder="Secondary Antibody 1" anti_body_id=\'' + soy.$$escapeHtml(strainData27) + '\' secondary_id = \'' + ((opt_data.assignment.template.primary_anti_body[strainData27].secondary.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData27].secondary[0]) : '') + '\' maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'>' + soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData27].secondary[0]].name) + '</span><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_antibody_size_list_item\' placeholder="Band Sizes" anti_body_id=\'' + soy.$$escapeHtml(strainData27) + '\' secondary_id = \'' + ((opt_data.assignment.template.primary_anti_body[strainData27].secondary.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData27].secondary[0]) : '') + '\' value=\'' + ((opt_data.assignment.template.primary_anti_body[strainData27].secondary.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData27].secondary[0]].name) : '') + '\'   maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'></li>' : '');
  }
  output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_western_blot_add_primary_anti_body scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol></div></div></div>');
  return opt_sb ? '' : output.toString();
};
