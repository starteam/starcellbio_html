// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 4, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_container\'><div class=\'scb_s_experiment_setup_details_view\' mode=\'', soy.$$escapeHtml(opt_data.kind), '\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
    output.append('<div class=\'scb_s_experiment_setup_top\'><div class=\'scb_s_experiment_setup_choose_template\'><div class=\'scb_s_experiment_setup_create_new_set_up\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' aria-label=\'Create New Set-up\' role=\'radio\'><input class=\'scb_s_experiment_setup_choose_template_kind scb_f_experiment_setup_new_set_up\' type="radio" name="setup_kind"/><span class=\'scb_s_experiment_setup_radio_text\'>Create new set-up</span><br></div><!-- <div class=\'scb_s_experiment_setup_choose_existing_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span></div>--><br></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'  alt=\'Video Player Background\'  aria-label=\'Video Player Background\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'  role=\'presentation\' >IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box_placeholder\' role=\'presentation\' ></div><div class=\'scb_s_experiment_setup_video_text\' role=\'presentation\' ></div></div>');
  } else {
    scb_common.experiment_step({step: 3, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
    output.append('<div class=\'scb_s_experiment_setup_top\'>', (opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\' role=\'note\'><h1>NOTE!</h1><p>Below is a summary of your set-up for ' + soy.$$escapeHtml(opt_data.experiment.name) + '.<br>To create a new experiment, select <b>+ New Experiment</b> next to <b>' + soy.$$escapeHtml(opt_data.assignment.name) + ': ' + soy.$$escapeHtml(opt_data.experiment.name) + '</b>drop down menu above the navigation tool bar.<br><br></p></div>' : '<div class=\'scb_s_warning_dialog\' role=\'note\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run this experiment, you cannot go back and make changes to this experiment\'s set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-Up & Run</b> to run your experiment.</p><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' aria-label=\'Select Technique\' role=\'button\' >SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '" aria-label=\'Edit Set-Up\' role=\'button\'>&#9664; &nbsp; EDIT SET-UP</a></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\' alt=\'Video Player Background\'  aria-label=\'Video Player Background\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\' role=\'presentation\' >IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box_placeholder\' role=\'presentation\' ></div><div class=\'scb_s_experiment_setup_video_text\' role=\'presentation\' ></div></div>');
  }
  output.append('</div><div class="scb_s_experiment_setup_new_set_up"><div class="scb_s_experiment_setup_instructions" aria-label=\'Setup Instructions\' role=\'textbox\'><img src=\'images/setup/setup_line.png\' role=\'presentation\'/>', opt_data.t.experiment_setup, '</div><br><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '" aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\' >');
  var hList84 = opt_data.headings;
  var hListLen84 = hList84.length;
  for (var hIndex84 = 0; hIndex84 < hListLen84; hIndex84++) {
    var hData84 = hList84[hIndex84];
    output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(hData84.title), '\' class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData84.kind), '\'>', (opt_data.kind == 'readonly') ? (hData84.kind != 'actions') ? soy.$$escapeHtml(hData84.title) : '' : soy.$$escapeHtml(hData84.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList100 = opt_data.rows;
  var rListLen100 = rList100.length;
  for (var rIndex100 = 0; rIndex100 < rListLen100; rIndex100++) {
    var rData100 = rList100[rIndex100];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' cell_treatment_id=\'', soy.$$escapeHtml(rData100.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData100.treatment.id), '\'>');
    var cList110 = rData100.columns;
    var cListLen110 = cList110.length;
    for (var cIndex110 = 0; cIndex110 < cListLen110; cIndex110++) {
      var cData110 = cList110[cIndex110];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData110.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData110.kind), '\' rowspan="', soy.$$escapeHtml(cData110.rows), '">', (cData110.kind == 'actions') ? (opt_data.kind == 'readwrite') ? ((opt_data.assignment.id == 'assignment_706_2014') ? '' : '<button role=\'button\' aria-label=\'Copy Row\'  class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData100.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" role=\'presentation\' src="images/setup/scb_copy.png"></button>') + '<button role=\'button\' aria-label=\'Delete Row\'  class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData100.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button>' : '' : ((cData110.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png" role=\'presentation\'>' : '') + ((cData110.kind == 'collection' && cData110.title == 'default') ? '' : soy.$$escapeHtml(cData110.title)), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList155 = opt_data.new_rows;
    var rListLen155 = rList155.length;
    for (var rIndex155 = 0; rIndex155 < rListLen155; rIndex155++) {
      var rData155 = rList155[rIndex155];
      output.append('<tr role=\'row\' aria-label=\'Sample\' class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList161 = rData155.columns;
      var cListLen161 = cList161.length;
      for (var cIndex161 = 0; cIndex161 < cListLen161; cIndex161++) {
        var cData161 = cList161[cIndex161];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData161.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData161.kind), '\' rowspan="1">');
        if (cData161.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? '' : '');
        } else {
          output.append((cData161.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png" role=\'presentation\' >' : '');
          if (cData161.kind == 'drug' && soy.$$getMapKeys(opt_data.t.drugs).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData155.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData161.kind == 'concentration' && soy.$$getMapKeys(opt_data.t.concentrations).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData155.treatment.drug_list.list[0].drug_id, concentration_id: rData155.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData155.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else if (cData161.kind == 'cell_line' && soy.$$getMapKeys(opt_data.t.cell_lines).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.cell_lines_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, cell_line_id: opt_data.t.cell_lines['p+'], disabled: true}, output);
            output.append('</span>');
          } else if (cData161.kind == 'collection' && soy.$$getMapKeys(opt_data.t.collections).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.collection_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, collection_id: opt_data.t.collections['3 m'], disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData161.title));
          }
        }
        output.append('</td>');
      }
      output.append('</tr>');
    }
    output.append((opt_data.t.ui.experiment_setup.actions.length > 0) ? '<tr role=\'row\' aria-label=\'Button\'><td colspan="' + soy.$$escapeHtml(opt_data.headings.length + 1) + '"><div class=\'scb_s_experiment_design_green_line\' role=\'presentation\'></div><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog scb_s_gray_button\' role=\'button\' aria-label=\'' + soy.$$escapeHtml(opt_data.t.ui.experiment_setup.actions[0].name) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>' + soy.$$escapeHtml(opt_data.t.ui.experiment_setup.actions[0].name) + '</button></td></tr>' : '');
  }
  output.append('</tbody></table></div>');
  if (opt_data.t.experiment_setup_actions) {
    scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  }
  output.append('</div>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly scb_f_run_experiment" aria-label=\'Run Experiment\' role=\'button\' href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" aria-label=\'Design Experiment\' role=\'button\' href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : (opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" aria-label=\'Select Technique\' role=\'button\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" role=\'button\' aria-label=\'Design Experiment\' href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'dialog\' aria-label=\'Add Sample Dialog\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select  role=\'listbox\' aria-label=\'Cell Strains\' class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList282 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen282 = cell_lineList282.length;
  for (var cell_lineIndex282 = 0; cell_lineIndex282 < cell_lineListLen282; cell_lineIndex282++) {
    var cell_lineData282 = cell_lineList282[cell_lineIndex282];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData282.id), '\'>', soy.$$escapeHtml(cell_lineData282.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select role=\'listbox\' aria-label=\'Treatment Line\' class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList290 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen290 = treatList290.length;
  for (var treatIndex290 = 0; treatIndex290 < treatListLen290; treatIndex290++) {
    var treatData290 = treatList290[treatIndex290];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData290.id), '\'>', soy.$$escapeHtml(treatData290.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select role=\'listbox\' aria-label=\'Treatment Line\' class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList298 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen298 = collectList298.length;
  for (var collectIndex298 = 0; collectIndex298 < collectListLen298; collectIndex298++) {
    var collectData298 = collectList298[collectIndex298];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData298.id), '\'>', soy.$$escapeHtml(collectData298.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\' role=\'button\' aria-lable=\'Add Samples\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\' role=\'button\' aria-lable=\'Add Samples\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select role=\'listbox\'  aria-label=\'Cell Strains\' title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList312 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen312 = tList312.length;
  for (var tIndex312 = 0; tIndex312 < tListLen312; tIndex312++) {
    var tData312 = tList312[tIndex312];
    output.append('<option value=\'', soy.$$escapeHtml(tData312), '\' ', (tData312 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData312].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.collection_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select role=\'listbox\'  aria-label=\'Collection Time\'   title=\'collection\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_collection_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList330 = soy.$$getMapKeys(opt_data.template.collections);
  var tListLen330 = tList330.length;
  for (var tIndex330 = 0; tIndex330 < tListLen330; tIndex330++) {
    var tData330 = tList330[tIndex330];
    output.append('<option value=\'', soy.$$escapeHtml(tData330), '\' ', (tData330 == opt_data.collection_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.collections[tData330].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select role=\'listbox\'  aria-label=\'Drug\' title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList348 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen348 = tList348.length;
  for (var tIndex348 = 0; tIndex348 < tListLen348; tIndex348++) {
    var tData348 = tList348[tIndex348];
    output.append('<option value=\'', soy.$$escapeHtml(tData348), '\' ', (tData348 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData348].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select role=\'listbox\'  aria-label=\'Concentration\'  title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList366 = opt_data.concentrations;
  var tListLen366 = tList366.length;
  for (var tIndex366 = 0; tIndex366 < tListLen366; tIndex366++) {
    var tData366 = tList366[tIndex366];
    output.append('<option value=\'', soy.$$escapeHtml(tData366), '\' ', (tData366 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData366].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select role=\'listbox\'  aria-label=\'Temperature\' title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList384 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen384 = tList384.length;
  for (var tIndex384 = 0; tIndex384 < tListLen384; tIndex384++) {
    var tData384 = tList384[tIndex384];
    output.append('<option value=\'', soy.$$escapeHtml(tData384), '\' ', (tData384 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData384].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_setup_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_warning_dialog\'><p><h1 class=\'jqDialog_confirm_header\' role=\'heading\'>Confirm Set-Up</h1>Once you confirm the set-up of this experiment and run it, you cannot go back to edit this experiment\'s set-up. To go back and edit your set-up, click <b>EDIT SET-UP</b>or click on <b>CONFIRM SET-UP AND RUN</b> to proceed.<br/> To create a new experiment set-up, select <b>New Experiment +</b> above the navigation tool bar.</p><a role=\'button\' aria-label=\'Confirm Set Up and Run\' class=\'scb_s_navigation_button scb_f_open_select_technique\' href=\'#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>CONFIRM SET-UP & RUN &nbsp; &#9654;</a><br/><span role=\'button\' aria-label=\'Edit Set Up\' class=\'scb_s_navigation_button scb_f_open_experiment_setup\' href=\'#view=experiment_setup&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>&#9664; &nbsp; EDIT SET-UP</span></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_setup_overlay = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'overlay\' role=\'presentation\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.general_error_overlay = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'error_overlay\' role=\'presentation\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 class=\'jqDialog_header\' role=\'heading\' >Error</h1>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_confirm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 class=\'jqDialog_header\' role=\'heading\' >Confirm Set-Up</h1>');
  return opt_sb ? '' : output.toString();
};
