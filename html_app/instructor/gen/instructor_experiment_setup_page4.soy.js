// This file was automatically generated from instructor_experiment_setup_page4.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_experiment_setup_page4 == 'undefined') { var scb_instructor_experiment_setup_page4 = {}; }


scb_instructor_experiment_setup_page4.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_experiment_setup_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_experiment_setup_page4.display_assignment({global_template: opt_data.global_template, assignments: opt_data.assignments, headings: opt_data.headings, assignment: opt_data.assignment, rows: opt_data.rows, view: 'select_course'}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page4.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>5. Please confirm your experimental setup before continuing:</div><div><table class="scb_s_experiment_setup_table " aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\' >');
  var hList30 = opt_data.headings;
  var hListLen30 = hList30.length;
  for (var hIndex30 = 0; hIndex30 < hListLen30; hIndex30++) {
    var hData30 = hList30[hIndex30];
    output.append('<td role=\'columnheader\'  class=\'scb_s_experiment_setup_table_heading\' >', soy.$$escapeHtml(hData30), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList36 = opt_data.rows;
  var rListLen36 = rList36.length;
  for (var rIndex36 = 0; rIndex36 < rListLen36; rIndex36++) {
    var rData36 = rList36[rIndex36];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' >');
    var cList40 = rData36.row;
    var cListLen40 = cList40.length;
    for (var cIndex40 = 0; cIndex40 < cListLen40; cIndex40++) {
      var cData40 = cList40[cIndex40];
      output.append('<td class=\'scb_s_experiment_setup_table_element \' >', (cData40 == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png" role=\'presentation\'>' : soy.$$escapeHtml(cData40), '</td>');
    }
    output.append('</tr>');
  }
  output.append('</tbody></table></div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_experiment_setup_page4_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div></div>');
  return opt_sb ? '' : output.toString();
};
