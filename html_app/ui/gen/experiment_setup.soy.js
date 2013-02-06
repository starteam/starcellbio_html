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
  output.append('<div class=\'scb_s_experiment_setup_details_view\'><div class=\'scb_s_experiment_setup_top\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2}, output);
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" checked="checked" disabled="disabled">Create new set-up</input><br><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled">Select pre-existing set-up as a template</input><!-- <select class=\'scb_s_experiment_setup_choose_template_id\' disabled="disabled"><option>Experiment 1</option><option>Experiment 1</option></select>--><br><img src=\'images/setup/setup_line.png\'/><ul class=\'scb_s_experiment_setup_list\'><li>For each treatment protocol, select the strain, treatments(s), and treatment dose.</li><li>For all of your treatments, select start, duration and collection time.</li><li>Once you finish setting up your experiment treatment, select Run Experiment.</li></ul></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
    output.append('<div class=\'scb_s_warning\'><h1>WARNING!</h1><p>Below is your set up for ', soy.$$escapeHtml(opt_data.experiment.name), '.<br>Once you run your experiment, you cannot go back and make changes to your set-up. Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment.</p></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  }
  output.append('</div><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList40 = opt_data.headings;
  var hListLen40 = hList40.length;
  for (var hIndex40 = 0; hIndex40 < hListLen40; hIndex40++) {
    var hData40 = hList40[hIndex40];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData40.kind), '\'>', soy.$$escapeHtml(hData40.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList48 = opt_data.rows;
  var rListLen48 = rList48.length;
  for (var rIndex48 = 0; rIndex48 < rListLen48; rIndex48++) {
    var rData48 = rList48[rIndex48];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData48.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData48.treatment.id), '\'>');
    var cList58 = rData48.columns;
    var cListLen58 = cList58.length;
    for (var cIndex58 = 0; cIndex58 < cListLen58; cIndex58++) {
      var cData58 = cList58[cIndex58];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData58.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData58.kind), '\' rowspan="', soy.$$escapeHtml(cData58.rows), '">', (cData58.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData48.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData48.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button>' : '' : ((cData58.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData58.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList96 = opt_data.new_rows;
    var rListLen96 = rList96.length;
    for (var rIndex96 = 0; rIndex96 < rListLen96; rIndex96++) {
      var rData96 = rList96[rIndex96];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList102 = rData96.columns;
      var cListLen102 = cList102.length;
      for (var cIndex102 = 0; cIndex102 < cListLen102; cIndex102++) {
        var cData102 = cList102[cIndex102];
        output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData102.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData102.kind), '\' rowspan="1">', (cData102.kind == 'actions') ? (opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '' : ((cData102.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData102.title), '</td>');
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
  var cell_lineList180 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen180 = cell_lineList180.length;
  for (var cell_lineIndex180 = 0; cell_lineIndex180 < cell_lineListLen180; cell_lineIndex180++) {
    var cell_lineData180 = cell_lineList180[cell_lineIndex180];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData180.id), '\'>', soy.$$escapeHtml(cell_lineData180.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList188 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen188 = treatList188.length;
  for (var treatIndex188 = 0; treatIndex188 < treatListLen188; treatIndex188++) {
    var treatData188 = treatList188[treatIndex188];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData188.id), '\'>', soy.$$escapeHtml(treatData188.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList196 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen196 = collectList196.length;
  for (var collectIndex196 = 0; collectIndex196 < collectListLen196; collectIndex196++) {
    var collectData196 = collectList196[collectIndex196];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData196.id), '\'>', soy.$$escapeHtml(collectData196.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\'><option value=\'\'>Please select</option>');
  var tList206 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen206 = tList206.length;
  for (var tIndex206 = 0; tIndex206 < tListLen206; tIndex206++) {
    var tData206 = tList206[tIndex206];
    output.append('<option value=\'', soy.$$escapeHtml(tData206), '\' ', (tData206 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData206].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\'><option value=\'\'>Please select</option>');
  var tList220 = opt_data.concentrations;
  var tListLen220 = tList220.length;
  for (var tIndex220 = 0; tIndex220 < tListLen220; tIndex220++) {
    var tData220 = tList220[tIndex220];
    output.append('<option value=\'', soy.$$escapeHtml(tData220), '\' ', (tData220 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData220].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
