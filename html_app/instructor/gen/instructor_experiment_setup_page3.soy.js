// This file was automatically generated from instructor_experiment_setup_page3.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_experiment_setup_page3 == 'undefined') { var scb_instructor_experiment_setup_page3 = {}; }


scb_instructor_experiment_setup_page3.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_experiment_setup_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_experiment_setup_page3.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page3.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_assignment_setup_course_name_heading\'>4. Below are all possible combinations of strains and treatment protocols.</div><div class=\'scb_s_experiment_setup_subtitle_page_3\'><ul><li>You can delete irrelevant combinations and sort the combinations into the desired order.</li><li>If you would like to edit individual experimental variables, go back to the previous page.</li></ul></div><br/><div class=\'scb_s_assignment_setup_course_name_heading\'>Samples <button class=\'scb_s_gray_button  scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>SORT</button></div>');
  scb_instructor_experiment_setup_page3.display_experiment_setup(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page3.display_experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_strains_list_container\'><table class="scb_s_experiment_setup_page3_table scb_s_experiment_setup_table_readonly" aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\' >');
  var hList39 = opt_data.headings;
  var hListLen39 = hList39.length;
  for (var hIndex39 = 0; hIndex39 < hListLen39; hIndex39++) {
    var hData39 = hList39[hIndex39];
    output.append((! hData39 == '') ? '<td role=\'columnheader\' class=\'scb_s_experiment_setup_table_heading\' kind=\'' + soy.$$escapeHtml(hData39.kind) + '\'>' + soy.$$escapeHtml(hData39) + '</td>' : '');
  }
  output.append('</thead><tbody class=\'\'>');
  var rList49 = opt_data.rows;
  var rListLen49 = rList49.length;
  for (var rIndex49 = 0; rIndex49 < rListLen49; rIndex49++) {
    var rData49 = rList49[rIndex49];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  >');
    var cList53 = rData49.row;
    var cListLen53 = cList53.length;
    for (var cIndex53 = 0; cIndex53 < cListLen53; cIndex53++) {
      var cData53 = cList53[cIndex53];
      output.append('<td class=\'scb_s_experiment_setup_table_element \' >', soy.$$escapeHtml(cData53), '</td>');
    }
    output.append('<td class=\'scb_s_experiment_setup_table_element \'  ><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_experiment_setup_page3_remove_row scb_s_experiment_setup_remove_temperature\' treatment_id=\'', soy.$$escapeHtml(rData49.treatment_id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></td></tr>');
  }
  output.append('</tbody></table></div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_experiment_setup_page3_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div>');
  return opt_sb ? '' : output.toString();
};
