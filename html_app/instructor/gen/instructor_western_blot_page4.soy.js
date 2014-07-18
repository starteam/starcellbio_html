// This file was automatically generated from instructor_western_blot_page4.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_western_blot_page4 == 'undefined') { var scb_instructor_western_blot_page4 = {}; }


scb_instructor_western_blot_page4.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_western_blot_page4.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_western_blot_page4.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>5. Define which bands will appear and their relative intensity for each of your samples in your experiment setup.</div><div><ol type=\'A\' class=\'scb_s_western_blot_page4_list_order\'>');
  var antibody_comboList28 = soy.$$getMapKeys(opt_data.assignment.template.primary_anti_body);
  var antibody_comboListLen28 = antibody_comboList28.length;
  for (var antibody_comboIndex28 = 0; antibody_comboIndex28 < antibody_comboListLen28; antibody_comboIndex28++) {
    var antibody_comboData28 = antibody_comboList28[antibody_comboIndex28];
    output.append('<li><div><div class=\'scb_s_western_blot_table_antibody_heading\'>', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[antibody_comboData28].name), ', ', soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.assignment.template.primary_anti_body[antibody_comboData28].secondary[0]].name), '</div><button class=\'scb_s_gray_button  scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>PREVIEW FILM</button></div><table class="scb_s_western_blot_page4_table " aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\' ><td role=\'columnheader\'  class=\'scb_s_experiment_setup_table_heading\' >Sample</td><td role=\'columnheader\'  class=\'scb_s_experiment_setup_table_heading\' >Size (kDa)</td><td role=\'columnheader\'  class=\'scb_s_experiment_setup_table_heading\' >Relative band intensity</td></thead><tbody class=\'scb_s_western_blot_page4_table_body\'>');
    var rList36 = opt_data.rows;
    var rListLen36 = rList36.length;
    for (var rIndex36 = 0; rIndex36 < rListLen36; rIndex36++) {
      var rData36 = rList36[rIndex36];
      var markList37 = opt_data.assignment.template.primary_anti_body[antibody_comboData28].whole_marks;
      var markListLen37 = markList37.length;
      for (var markIndex37 = 0; markIndex37 < markListLen37; markIndex37++) {
        var markData37 = markList37[markIndex37];
        output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><td class=\'scb_s_experiment_setup_table_element \' >', soy.$$escapeHtml(rData36.row), '</td><td>', soy.$$escapeHtml(markData37.weight), '</td><td> Slider here</td></tr>');
      }
      var markList46 = opt_data.assignment.template.primary_anti_body[antibody_comboData28].nuclear_marks;
      var markListLen46 = markList46.length;
      for (var markIndex46 = 0; markIndex46 < markListLen46; markIndex46++) {
        var markData46 = markList46[markIndex46];
        output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><td class=\'scb_s_experiment_setup_table_element \' >', soy.$$escapeHtml(rData36.row), '</td><td>', soy.$$escapeHtml(markData46.weight), '</td><td> Slider here</td></tr>');
      }
      var markList55 = opt_data.assignment.template.primary_anti_body[antibody_comboData28].cyto_marks;
      var markListLen55 = markList55.length;
      for (var markIndex55 = 0; markIndex55 < markListLen55; markIndex55++) {
        var markData55 = markList55[markIndex55];
        output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><td class=\'scb_s_experiment_setup_table_element \' >', soy.$$escapeHtml(rData36.row), '</td><td>', soy.$$escapeHtml(markData55.weight), '</td><td> Slider here</td></tr>');
      }
    }
    output.append('</tbody></table></li>');
  }
  output.append('</ol></div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_western_blot_page4_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};
