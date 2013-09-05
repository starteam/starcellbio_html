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
    output.append((opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\'><h1>NOTE!</h1><p>Below is a summary of your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>To create a new experiment, select <b>' + soy.$$escapeHtml(opt_data.assignment.name) + '</b> in the navigation tool bar above.<br><br><br></p></div>' : '<div class=\'scb_s_warning\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run your experiment, you cannot go back and make changes to your set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-up and Select Technique</b> to run your experiment.<!-- Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment. --></p></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  }
  output.append('</div><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList54 = opt_data.headings;
  var hListLen54 = hList54.length;
  for (var hIndex54 = 0; hIndex54 < hListLen54; hIndex54++) {
    var hData54 = hList54[hIndex54];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData54.kind), '\'>', (opt_data.kind == 'readonly') ? (hData54.kind != 'actions') ? soy.$$escapeHtml(hData54.title) : '' : soy.$$escapeHtml(hData54.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList68 = opt_data.rows;
  var rListLen68 = rList68.length;
  for (var rIndex68 = 0; rIndex68 < rListLen68; rIndex68++) {
    var rData68 = rList68[rIndex68];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData68.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData68.treatment.id), '\'>');
    var cList78 = rData68.columns;
    var cListLen78 = cList78.length;
    for (var cIndex78 = 0; cIndex78 < cListLen78; cIndex78++) {
      var cData78 = cList78[cIndex78];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData78.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData78.kind), '\' rowspan="', soy.$$escapeHtml(cData78.rows), '">', (cData78.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData68.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData68.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" src="images/setup/scb_remove.png"></button>' : '' : ((cData78.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData78.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList116 = opt_data.new_rows;
    var rListLen116 = rList116.length;
    for (var rIndex116 = 0; rIndex116 < rListLen116; rIndex116++) {
      var rData116 = rList116[rIndex116];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList122 = rData116.columns;
      var cListLen122 = cList122.length;
      for (var cIndex122 = 0; cIndex122 < cListLen122; cIndex122++) {
        var cData122 = cList122[cIndex122];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData122.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData122.kind), '\' rowspan="1">');
        if (cData122.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '');
        } else {
          output.append((cData122.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData122.kind == 'drug') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData116.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData122.kind == 'concentration') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData116.treatment.drug_list.list[0].drug_id, concentration_id: rData116.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData116.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData122.title));
          }
        }
        output.append('</td>');
      }
      output.append('</tr>');
    }
    output.append((opt_data.t.ui.experiment_setup.actions.length > 0) ? '<tr><td colspan="' + soy.$$escapeHtml(opt_data.headings.length + 1) + '"><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog scb_s_gray_button\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>' + soy.$$escapeHtml(opt_data.t.ui.experiment_setup.actions[0].name) + '</button></td></tr>' : '');
  }
  output.append('</tbody></table>');
  if (opt_data.t.experiment_setup_actions) {
    scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  }
  output.append('<br/>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : (opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>CONFIRM SET-UP & SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; EDIT SET-UP</a>', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList241 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen241 = cell_lineList241.length;
  for (var cell_lineIndex241 = 0; cell_lineIndex241 < cell_lineListLen241; cell_lineIndex241++) {
    var cell_lineData241 = cell_lineList241[cell_lineIndex241];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData241.id), '\'>', soy.$$escapeHtml(cell_lineData241.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList249 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen249 = treatList249.length;
  for (var treatIndex249 = 0; treatIndex249 < treatListLen249; treatIndex249++) {
    var treatData249 = treatList249[treatIndex249];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData249.id), '\'>', soy.$$escapeHtml(treatData249.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList257 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen257 = collectList257.length;
  for (var collectIndex257 = 0; collectIndex257 < collectListLen257; collectIndex257++) {
    var collectData257 = collectList257[collectIndex257];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData257.id), '\'>', soy.$$escapeHtml(collectData257.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList271 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen271 = tList271.length;
  for (var tIndex271 = 0; tIndex271 < tListLen271; tIndex271++) {
    var tData271 = tList271[tIndex271];
    output.append('<option value=\'', soy.$$escapeHtml(tData271), '\' ', (tData271 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData271].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList289 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen289 = tList289.length;
  for (var tIndex289 = 0; tIndex289 < tListLen289; tIndex289++) {
    var tData289 = tList289[tIndex289];
    output.append('<option value=\'', soy.$$escapeHtml(tData289), '\' ', (tData289 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData289].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList307 = opt_data.concentrations;
  var tListLen307 = tList307.length;
  for (var tIndex307 = 0; tIndex307 < tListLen307; tIndex307++) {
    var tData307 = tList307[tIndex307];
    output.append('<option value=\'', soy.$$escapeHtml(tData307), '\' ', (tData307 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData307].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList325 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen325 = tList325.length;
  for (var tIndex325 = 0; tIndex325 < tListLen325; tIndex325++) {
    var tData325 = tList325[tIndex325];
    output.append('<option value=\'', soy.$$escapeHtml(tData325), '\' ', (tData325 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData325].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
