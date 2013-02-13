// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 4, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_details_view\' mode=\'', soy.$$escapeHtml(opt_data.kind), '\'><div class=\'scb_s_experiment_setup_top\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2}, output);
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" checked="checked"  />Create new set-up<br><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span><!-- <select class=\'scb_s_experiment_setup_choose_template_id\' disabled="disabled"><option>Experiment 1</option><option>Experiment 1</option></select>--><br><img src=\'images/setup/setup_line.png\'/>', opt_data.t.experiment_setup, '</div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
    output.append('<div class=\'scb_s_warning\'><h1>WARNING!</h1><p>Below is your set up for ', soy.$$escapeHtml(opt_data.experiment.name), '.<br>Once you run your experiment, you cannot go back and make changes to your set-up. Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment.</p></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  }
  output.append('</div><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList45 = opt_data.headings;
  var hListLen45 = hList45.length;
  for (var hIndex45 = 0; hIndex45 < hListLen45; hIndex45++) {
    var hData45 = hList45[hIndex45];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData45.kind), '\'>', soy.$$escapeHtml(hData45.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList53 = opt_data.rows;
  var rListLen53 = rList53.length;
  for (var rIndex53 = 0; rIndex53 < rListLen53; rIndex53++) {
    var rData53 = rList53[rIndex53];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData53.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData53.treatment.id), '\'>');
    var cList63 = rData53.columns;
    var cListLen63 = cList63.length;
    for (var cIndex63 = 0; cIndex63 < cListLen63; cIndex63++) {
      var cData63 = cList63[cIndex63];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData63.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData63.kind), '\' rowspan="', soy.$$escapeHtml(cData63.rows), '">', (cData63.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData53.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData53.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button>' : '' : ((cData63.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData63.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList101 = opt_data.new_rows;
    var rListLen101 = rList101.length;
    for (var rIndex101 = 0; rIndex101 < rListLen101; rIndex101++) {
      var rData101 = rList101[rIndex101];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList107 = rData101.columns;
      var cListLen107 = cList107.length;
      for (var cIndex107 = 0; cIndex107 < cListLen107; cIndex107++) {
        var cData107 = cList107[cIndex107];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData107.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData107.kind), '\' rowspan="1">');
        if (cData107.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '');
        } else {
          output.append((cData107.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData107.kind == 'drug') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData101.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData107.kind == 'concentration') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData101.treatment.drug_list.list[0].drug_id, concentration_id: rData101.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData101.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData107.title));
          }
        }
        output.append('</td>');
      }
      output.append('</tr>');
    }
    output.append((opt_data.t.ui.experiment_setup.actions.length > 0) ? '<tr><td colspan="' + soy.$$escapeHtml(opt_data.headings.length + 1) + '"><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog\'>Add multiple rows</button></td></tr>' : '');
  }
  output.append('</tbody></table>');
  scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  output.append('<br/>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '">RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>CONFIRM SETUP & SELECT TECHNIQUE &nbsp; &#9654;</a><br/>' + ((opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '<a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; EDIT SETUP</a>'), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList207 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen207 = cell_lineList207.length;
  for (var cell_lineIndex207 = 0; cell_lineIndex207 < cell_lineListLen207; cell_lineIndex207++) {
    var cell_lineData207 = cell_lineList207[cell_lineIndex207];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData207.id), '\'>', soy.$$escapeHtml(cell_lineData207.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList215 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen215 = treatList215.length;
  for (var treatIndex215 = 0; treatIndex215 < treatListLen215; treatIndex215++) {
    var treatData215 = treatList215[treatIndex215];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData215.id), '\'>', soy.$$escapeHtml(treatData215.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList223 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen223 = collectList223.length;
  for (var collectIndex223 = 0; collectIndex223 < collectListLen223; collectIndex223++) {
    var collectData223 = collectList223[collectIndex223];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData223.id), '\'>', soy.$$escapeHtml(collectData223.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList237 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen237 = tList237.length;
  for (var tIndex237 = 0; tIndex237 < tListLen237; tIndex237++) {
    var tData237 = tList237[tIndex237];
    output.append('<option value=\'', soy.$$escapeHtml(tData237), '\' ', (tData237 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData237].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList255 = opt_data.concentrations;
  var tListLen255 = tList255.length;
  for (var tIndex255 = 0; tIndex255 < tListLen255; tIndex255++) {
    var tData255 = tList255[tIndex255];
    output.append('<option value=\'', soy.$$escapeHtml(tData255), '\' ', (tData255 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData255].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
