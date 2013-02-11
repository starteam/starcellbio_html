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
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" checked="checked" disabled="disabled">Create new set-up</input><br><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled">Select pre-existing set-up as a template</input><!-- <select class=\'scb_s_experiment_setup_choose_template_id\' disabled="disabled"><option>Experiment 1</option><option>Experiment 1</option></select>--><br><img src=\'images/setup/setup_line.png\'/><ul class=\'scb_s_experiment_setup_list\'><li>For each treatment protocol, select the strain, treatments(s), and treatment dose.</li><li>For all of your treatments, select start, duration and collection time.</li><li>Once you finish setting up your experiment treatment, select Run Experiment.</li></ul></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
    output.append('<div class=\'scb_s_warning\'><h1>WARNING!</h1><p>Below is your set up for ', soy.$$escapeHtml(opt_data.experiment.name), '.<br>Once you run your experiment, you cannot go back and make changes to your set-up. Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment.</p></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  }
  output.append('</div><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList42 = opt_data.headings;
  var hListLen42 = hList42.length;
  for (var hIndex42 = 0; hIndex42 < hListLen42; hIndex42++) {
    var hData42 = hList42[hIndex42];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData42.kind), '\'>', soy.$$escapeHtml(hData42.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList50 = opt_data.rows;
  var rListLen50 = rList50.length;
  for (var rIndex50 = 0; rIndex50 < rListLen50; rIndex50++) {
    var rData50 = rList50[rIndex50];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData50.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData50.treatment.id), '\'>');
    var cList60 = rData50.columns;
    var cListLen60 = cList60.length;
    for (var cIndex60 = 0; cIndex60 < cListLen60; cIndex60++) {
      var cData60 = cList60[cIndex60];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData60.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData60.kind), '\' rowspan="', soy.$$escapeHtml(cData60.rows), '">', (cData60.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData50.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData50.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button>' : '' : ((cData60.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData60.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList98 = opt_data.new_rows;
    var rListLen98 = rList98.length;
    for (var rIndex98 = 0; rIndex98 < rListLen98; rIndex98++) {
      var rData98 = rList98[rIndex98];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList104 = rData98.columns;
      var cListLen104 = cList104.length;
      for (var cIndex104 = 0; cIndex104 < cListLen104; cIndex104++) {
        var cData104 = cList104[cIndex104];
        output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData104.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData104.kind), '\' rowspan="1">', (cData104.kind == 'actions') ? (opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '' : ((cData104.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData104.title), '</td>');
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
  var cell_lineList182 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen182 = cell_lineList182.length;
  for (var cell_lineIndex182 = 0; cell_lineIndex182 < cell_lineListLen182; cell_lineIndex182++) {
    var cell_lineData182 = cell_lineList182[cell_lineIndex182];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData182.id), '\'>', soy.$$escapeHtml(cell_lineData182.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList190 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen190 = treatList190.length;
  for (var treatIndex190 = 0; treatIndex190 < treatListLen190; treatIndex190++) {
    var treatData190 = treatList190[treatIndex190];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData190.id), '\'>', soy.$$escapeHtml(treatData190.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList198 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen198 = collectList198.length;
  for (var collectIndex198 = 0; collectIndex198 < collectListLen198; collectIndex198++) {
    var collectData198 = collectList198[collectIndex198];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData198.id), '\'>', soy.$$escapeHtml(collectData198.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\'><option value=\'\'>Please select</option>');
  var tList208 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen208 = tList208.length;
  for (var tIndex208 = 0; tIndex208 < tListLen208; tIndex208++) {
    var tData208 = tList208[tIndex208];
    output.append('<option value=\'', soy.$$escapeHtml(tData208), '\' ', (tData208 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData208].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\'><option value=\'\'>Please select</option>');
  var tList222 = opt_data.concentrations;
  var tListLen222 = tList222.length;
  for (var tIndex222 = 0; tIndex222 < tListLen222; tIndex222++) {
    var tData222 = tList222[tIndex222];
    output.append('<option value=\'', soy.$$escapeHtml(tData222), '\' ', (tData222 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData222].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
