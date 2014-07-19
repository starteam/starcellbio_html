// This file was automatically generated from instructor_western_blot_page5.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_western_blot_page5 == 'undefined') { var scb_instructor_western_blot_page5 = {}; }


scb_instructor_western_blot_page5.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_western_blot_page5.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page5.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>6. Would you like background bands to appear?</div><div><div class=\'scb_s_western_blot_page5_radio_yes\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  role=\'radio\'><input type="radio" name="wb_background_bands"/><span class=\'scb_s_western_blot_page5_radio_yes_text\' role=\'presentation\'>Yes</span><br></div><div class=\'scb_s_western_blot_page5_radio_no\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'radio\'><input type="radio" name="wb_background_bands"/><span class=\'scb_s_western_blot_page5_radio_no_text\' role=\'presentation\'>No</span><br></div><ol type=\'a\'><li class=\'scb_s_western_blot_page5_heading\'>If yes, which antibody combination(s) should yield background bands?</li>');
  var strainList31 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
  var strainListLen31 = strainList31.length;
  for (var strainIndex31 = 0; strainIndex31 < strainListLen31; strainIndex31++) {
    var strainData31 = strainList31[strainIndex31];
    output.append((! (strainData31 == 'order')) ? '<div class=\'scb_s_experiment_setup_list_item \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'><input class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_western_blot" type="checkbox" role="checkbox" assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '"><div class=\'  scb_s_western_blot_page5_primary_antibody \' anti_body_id=\'' + soy.$$escapeHtml(strainData31) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'>' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData31].name) + ', ' + soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData31].secondary[0]].name) + '</div></div>' : '');
  }
  output.append('<li class=\'scb_s_western_blot_page5_heading\'>Define the size and intensity of each desired background band: </li>');
  var strainList49 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
  var strainListLen49 = strainList49.length;
  for (var strainIndex49 = 0; strainIndex49 < strainListLen49; strainIndex49++) {
    var strainData49 = strainList49[strainIndex49];
    output.append((! (strainData49 == 'order')) ? '<div class=\'scb_s_experiment_setup_list_item \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'><div class=\'  scb_s_western_blot_page5_primary_antibody \' anti_body_id=\'' + soy.$$escapeHtml(strainData49) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'>' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData49].name) + ', ' + soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData49].secondary[0]].name) + ':</div></div>' : '');
  }
  output.append('</ol></div></div>');
  return opt_sb ? '' : output.toString();
};
