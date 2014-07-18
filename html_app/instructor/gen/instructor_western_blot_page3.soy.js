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
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>4. Define the size of the protein bands in kilodaltons (kDa) detected by each primary and secondary antibody combination.</div><p/><span class=\'scb_s_western_blot_antibody_heading\'>Note: When multiple bands are detected by a particular antibody combination, separate the sizes of the bands by a comma. For example: 13, 42, 60. Do not include the units in the text box.</span><div class=\'scb_s_western_blot_antibody_size_wrapper\'><span class=\'scb_s_assignment_setup_course_name_heading \'>Primary antibody</span><div class=\'scb_s_assignment_setup_course_name_heading scb_s_western_blot_page3_secondary_antibody \'>Corresponding Secondary antibody</div><span class=\'scb_s_assignment_setup_course_name_heading scb_s_western_blot_page3_sizes_heading\'>Sizes by Lysate Type</span><p/>');
  var typeList27 = soy.$$getMapKeys(opt_data.assignment.template.lysate_kinds);
  var typeListLen27 = typeList27.length;
  for (var typeIndex27 = 0; typeIndex27 < typeListLen27; typeIndex27++) {
    var typeData27 = typeList27[typeIndex27];
    output.append((typeData27 == 'whole') ? '<span class=\'scb_s_western_blot_antibody_heading scb_s_western_blot_size_lysate_input_wcl\'>WCL</span>' : '', (typeData27 == 'nuclear') ? '<span class=\'scb_s_western_blot_antibody_heading scb_s_western_blot_size_lysate_input_nuc\'>Nuc</span>' : '', (typeData27 == 'cyto') ? '<span class=\'scb_s_western_blot_antibody_heading scb_s_western_blot_size_lysate_input_cyto\'>Cyto</span>' : '');
  }
  output.append('<div class=\'scb_s_western_blot_primary_anti_body_wrapper\'><ol class=\'scb_s_experiment_setup_list\'>');
  var strainList39 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
  var strainListLen39 = strainList39.length;
  for (var strainIndex39 = 0; strainIndex39 < strainListLen39; strainIndex39++) {
    var strainData39 = strainList39[strainIndex39];
    if (! (strainData39 == 'order')) {
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_western_blot_page3_field  scb_s_western_blot_page3_primary_antibody scb_f_western_blot_primary_anti_body_list_item\' anti_body_id=\'', soy.$$escapeHtml(strainData39), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].name), '</div><div type=\'text\' class=\'scb_s_western_blot_page3_field  scb_f_western_blot_secondary_anti_body_list_item\' placeholder="Secondary Antibody 1" anti_body_id=\'', soy.$$escapeHtml(strainData39), '\' secondary_id = \'', (opt_data.assignment.template.primary_anti_body[strainData39].secondary.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].secondary[0]) : '', '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'>', soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData39].secondary[0]].name), '</div>');
      var typeList61 = soy.$$getMapKeys(opt_data.assignment.template.lysate_kinds);
      var typeListLen61 = typeList61.length;
      for (var typeIndex61 = 0; typeIndex61 < typeListLen61; typeIndex61++) {
        var typeData61 = typeList61[typeIndex61];
        output.append((typeData61 == 'whole') ? '<input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_whole_antibody_size_list_item\' placeholder="Band Sizes" anti_body_id=\'' + soy.$$escapeHtml(strainData39) + '\' secondary_id = \'' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].secondary[0]) + '\' value=\'' + ((opt_data.assignment.template.primary_anti_body[strainData39].whole_marks.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].whole_marks_string) : '') + '\'   maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'>' : '', (typeData61 == 'nuclear') ? '<input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_nuclear_antibody_size_list_item\' placeholder="Band Sizes" anti_body_id=\'' + soy.$$escapeHtml(strainData39) + '\' secondary_id = \'' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].secondary[0]) + '\' value=\'' + ((opt_data.assignment.template.primary_anti_body[strainData39].nuclear_marks.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].nuclear_marks_string) : '') + '\'   maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'>' : '', (typeData61 == 'cyto') ? '<input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_cyto_antibody_size_list_item\' placeholder="Band Sizes" anti_body_id=\'' + soy.$$escapeHtml(strainData39) + '\' secondary_id = \'' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].secondary[0]) + '\' value=\'' + ((opt_data.assignment.template.primary_anti_body[strainData39].cyto_marks.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData39].cyto_marks_string) : '') + '\'   maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'>' : '');
      }
      output.append('</li>');
    }
  }
  output.append('</ol></div></div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_western_blot_page3_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};
