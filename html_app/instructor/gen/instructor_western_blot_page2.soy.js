// This file was automatically generated from instructor_western_blot_page2.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_western_blot_page2 == 'undefined') { var scb_instructor_western_blot_page2 = {}; }


scb_instructor_western_blot_page2.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_western_blot_page2.display_assignment({global_template: opt_data.global_template, assignments: opt_data.assignments, assignment: opt_data.assignment, view: 'select_course'}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page2.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'><i>Blotting</i></div><div class=\'scb_s_assignment_setup_course_name_heading\'>3. Name the primary antibodies available and their corresponding secondary antibody.</div><div class=\'scb_s_western_blot_anti_body_wrapper\'><div class=\'scb_s_western_blot_primary_anti_body_wrapper\'><span class=\'scb_s_assignment_setup_course_name_heading \'>Primary antibody</span><span class=\'scb_s_assignment_setup_course_name_heading \'>Corresponding Secondary antibody</span>');
  if (soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_s_western_blot_page3_primary_antibody scb_f_western_blot_primary_anti_body_list_item\' placeholder="Primary Antibody 1" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_secondary_anti_body_list_item\' placeholder="Secondary Antibody 1" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_western_blot_add_primary_anti_body scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol></div>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList43 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
    var strainListLen43 = strainList43.length;
    for (var strainIndex43 = 0; strainIndex43 < strainListLen43; strainIndex43++) {
      var strainData43 = strainList43[strainIndex43];
      output.append((! (strainData43 == 'order')) ? '<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_s_western_blot_page3_primary_antibody scb_f_western_blot_primary_anti_body_list_item\' placeholder="Primary Antibody 1" anti_body_id=\'' + soy.$$escapeHtml(strainData43) + '\' value=\'' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData43].name) + '\'  title=\'' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData43].name) + '\' maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_secondary_anti_body_list_item\' placeholder="Secondary Antibody 1" anti_body_id=\'' + soy.$$escapeHtml(strainData43) + '\' secondary_id = \'' + ((opt_data.assignment.template.primary_anti_body[strainData43].secondary.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData43].secondary[0]) : '') + '\' value=\'' + ((opt_data.assignment.template.primary_anti_body[strainData43].secondary.length > 0) ? soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData43].secondary[0]].name) : '') + '\'   maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_western_blot_page2_remove_row scb_s_experiment_setup_remove_temperature\' anti_body_id=\'' + soy.$$escapeHtml(strainData43) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>' : '');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_western_blot_add_primary_anti_body scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol></div>');
  }
  output.append('</div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_western_blot_page2_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};
