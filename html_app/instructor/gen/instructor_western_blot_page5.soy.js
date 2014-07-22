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
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>6. Would you like background bands to appear?</div><div class="scb_s_western_blot_page5_wrapper"><div class=\'scb_s_western_blot_page5_radio_yes scb_f_western_blot_page5_radio_yes\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  role=\'radio\'><input type="radio" name="wb_background_bands" ', (opt_data.assignment.has_background_bands) ? 'checked=\'checked\'' : '', ' /><span class=\'scb_s_western_blot_page5_radio_yes_text\' role=\'presentation\'>Yes</span><br/></div><div class=\'scb_s_western_blot_page5_radio_no scb_f_western_blot_page5_radio_no\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'radio\'><input type="radio" name="wb_background_bands"  ', (! opt_data.assignment.has_background_bands) ? 'checked=\'checked\'' : '', ' /><span class=\'scb_s_western_blot_page5_radio_no_text\' role=\'presentation\'>No</span><br/></div>');
  if (opt_data.assignment.has_background_bands) {
    output.append('<ol type=\'a\'><li class=\'scb_s_western_blot_page5_heading\'>If yes, which antibody combination(s) should yield background bands?</li>');
    var strainList42 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
    var strainListLen42 = strainList42.length;
    for (var strainIndex42 = 0; strainIndex42 < strainListLen42; strainIndex42++) {
      var strainData42 = strainList42[strainIndex42];
      output.append((! (strainData42 == 'order')) ? '<div class=\'scb_s_experiment_setup_list_item  scb_f_western_blot_page5_list_item \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' anti_body_id=\'' + soy.$$escapeHtml(strainData42) + '\'><input anti_body_id=\'' + soy.$$escapeHtml(strainData42) + '\' class="scb_s_experiment_setup_checkbox scb_s_select_technique_select_western_blot scb_f_western_blot_page5_antibody_checkbox" ' + ((opt_data.assignment.background_band_list[strainData42]) ? 'checked=\'checked\' ' : '') + ' type="checkbox" role="checkbox" assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '"><div class=\'  scb_s_western_blot_page5_primary_antibody \' anti_body_id=\'' + soy.$$escapeHtml(strainData42) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'>' + soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData42].name) + ', ' + soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData42].secondary[0]].name) + '</div></div>' : '');
    }
    output.append('<li class=\'scb_s_western_blot_page5_heading\'>Define the size and intensity of each desired background band: </li>');
    var strainList68 = soy.$$getMapKeys(opt_data.assignment.background_band_list);
    var strainListLen68 = strainList68.length;
    for (var strainIndex68 = 0; strainIndex68 < strainListLen68; strainIndex68++) {
      var strainData68 = strainList68[strainIndex68];
      if (! (strainData68 == 'order')) {
        output.append('<div class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'  scb_s_western_blot_page5_primary_antibody \' anti_body_id=\'', soy.$$escapeHtml(strainData68), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData68].name), ', ', soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[strainData68].secondary[0]].name), ':</div></div><table class="scb_s_western_blot_page4_table " aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\' ><td role=\'columnheader\'  class=\'scb_s_experiment_setup_table_heading\' >Size (kDa)</td><td role=\'columnheader\'  class=\'scb_s_experiment_setup_table_heading\' >Intensity</td></thead><tbody class=\'scb_s_western_blot_page4_table_body\'>');
        if (opt_data.assignment.template.primary_anti_body[strainData68].marks.length <= 0) {
          output.append('<tr class=\'scb_s_experiment_setup_table_row scb_f_western_blot_page5_list\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' anti_body_id=\'', soy.$$escapeHtml(strainData68), '\'><td><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_page5_antibody_weight_edit\' placeholder="Band Sizes" anti_body_id=\'', soy.$$escapeHtml(strainData68), '\' secondary_id = \'', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData68].secondary[0]), '\' value=\'0\'   maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></td><td><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_page5_antibody_intensity_edit\' placeholder="Band Sizes" anti_body_id=\'', soy.$$escapeHtml(strainData68), '\' secondary_id = \'', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData68].secondary[0]), '\' value=\'0\'   maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></td></tr><tr><td><button class=\'scb_s_gray_button scb_f_western_blot_page5_add_background_band scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' anti_body_id=\'', soy.$$escapeHtml(strainData68), '\'>ADD</button></td><td></td></tr>');
        } else {
          var markList106 = opt_data.assignment.template.primary_anti_body[strainData68].marks;
          var markListLen106 = markList106.length;
          for (var markIndex106 = 0; markIndex106 < markListLen106; markIndex106++) {
            var markData106 = markList106[markIndex106];
            output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' anti_body_id=\'', soy.$$escapeHtml(strainData68), '\'><td><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_page5_antibody_weight_edit\' placeholder="Band Sizes" anti_body_id=\'', soy.$$escapeHtml(strainData68), '\' mark_id=\'', soy.$$escapeHtml(markData106.id), '\' secondary_id = \'', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData68].secondary[0]), '\' value=\'', soy.$$escapeHtml(markData106.weight), '\'   maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></td><td><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_western_blot_page5_antibody_intensity_edit\' placeholder="Band Sizes" anti_body_id=\'', soy.$$escapeHtml(strainData68), '\' mark_id=\'', soy.$$escapeHtml(markData106.id), '\'  secondary_id = \'', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[strainData68].secondary[0]), '\' value=\'', soy.$$escapeHtml(markData106.intensity), '\'   maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></td></tr>');
          }
          output.append('<tr><td><button class=\'scb_s_gray_button scb_f_western_blot_page5_add_background_band scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' anti_body_id=\'', soy.$$escapeHtml(strainData68), '\' >ADD</button></td><td></td></tr>');
        }
        output.append('</tbody></table>');
      }
    }
    output.append('</ol>');
  }
  output.append('</div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_western_blot_page5_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};
