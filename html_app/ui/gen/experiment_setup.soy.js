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
  output.append('<div class=\'scb_s_experiment_setup_details_view\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2}, output);
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'>THIS NEEDS A BIT MORE THINKING!<input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind">Create new set-up</input><br><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind">Select pre-existing set-up as a template</input><select class=\'scb_s_experiment_setup_choose_template_id\'><option>Experiment 1</option><option>Experiment 1</option></select><br></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
  }
  output.append('<table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList36 = opt_data.headings;
  var hListLen36 = hList36.length;
  for (var hIndex36 = 0; hIndex36 < hListLen36; hIndex36++) {
    var hData36 = hList36[hIndex36];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData36.kind), '\'>', soy.$$escapeHtml(hData36.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList44 = opt_data.rows;
  var rListLen44 = rList44.length;
  for (var rIndex44 = 0; rIndex44 < rListLen44; rIndex44++) {
    var rData44 = rList44[rIndex44];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment=\'', soy.$$escapeHtml(rData44.id), '\'>');
    var cList48 = rData44.columns;
    var cListLen48 = cList48.length;
    for (var cIndex48 = 0; cIndex48 < cListLen48; cIndex48++) {
      var cData48 = cList48[cIndex48];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData48.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData48.kind), '\' rowspan="', soy.$$escapeHtml(cData48.rows), '">', (cData48.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData44.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button>' : '' : ((cData48.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData48.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    output.append('<tr>');
    var cList81 = opt_data.headings;
    var cListLen81 = cList81.length;
    for (var cIndex81 = 0; cIndex81 < cListLen81; cIndex81++) {
      var cData81 = cList81[cIndex81];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData81.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_new_row\' kind=\'', soy.$$escapeHtml(cData81.kind), '\' rowspan="1">', (cData81.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button>' : '' : ((cData81.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData81.title), '</td>');
    }
    output.append('</tr><tr><td colspan="', soy.$$escapeHtml(opt_data.headings.length + 1), '"><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog\'>Add multiple rows</button></td></tr>');
  }
  output.append('</tbody></table>');
  scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  output.append('<br/>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '">Run Experiment &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; Design</a>' : '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Confirm set-up & Select technique &#9654;</a><br/>' + ((opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; Design</a>' : '<a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; Edit Set-up</a>'), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList155 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen155 = cell_lineList155.length;
  for (var cell_lineIndex155 = 0; cell_lineIndex155 < cell_lineListLen155; cell_lineIndex155++) {
    var cell_lineData155 = cell_lineList155[cell_lineIndex155];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData155.id), '\'>', soy.$$escapeHtml(cell_lineData155.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList163 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen163 = treatList163.length;
  for (var treatIndex163 = 0; treatIndex163 < treatListLen163; treatIndex163++) {
    var treatData163 = treatList163[treatIndex163];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData163.id), '\'>', soy.$$escapeHtml(treatData163.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList171 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen171 = collectList171.length;
  for (var collectIndex171 = 0; collectIndex171 < collectListLen171; collectIndex171++) {
    var collectData171 = collectList171[collectIndex171];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData171.id), '\'>', soy.$$escapeHtml(collectData171.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\'><option value=\'\'>Please select</option>');
  var tList181 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen181 = tList181.length;
  for (var tIndex181 = 0; tIndex181 < tListLen181; tIndex181++) {
    var tData181 = tList181[tIndex181];
    output.append('<option value=\'', soy.$$escapeHtml(tData181), '\' ', (tData181 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData181].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\'><option value=\'\'>Please select</option>');
  var tList195 = opt_data.concentrations;
  var tListLen195 = tList195.length;
  for (var tIndex195 = 0; tIndex195 < tListLen195; tIndex195++) {
    var tData195 = tList195[tIndex195];
    output.append('<option value=\'', soy.$$escapeHtml(tData195), '\' ', (tData195 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData195].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
