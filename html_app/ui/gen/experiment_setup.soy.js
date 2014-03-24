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
    output.append('<div class=\'scb_s_experiment_setup_top\'><div class=\'scb_s_experiment_setup_choose_template\'><div class=\'scb_s_experiment_setup_create_new_set_up\'><input class=\'scb_s_experiment_setup_choose_template_kind scb_f_experiment_setup_new_set_up\' type="radio" name="setup_kind"/>Create new set-up<br></div><!-- <div class=\'scb_s_experiment_setup_choose_existing_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span></div>--><br></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box_placeholder\'></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
    output.append('<div class=\'scb_s_experiment_setup_top\'>', (opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\'><h1>NOTE!</h1><p>Below is a summary of your set-up for ' + soy.$$escapeHtml(opt_data.experiment.name) + '.<br>To create a new experiment, select <b>+ New Experiment</b> next to <b>' + soy.$$escapeHtml(opt_data.assignment.name) + ': ' + soy.$$escapeHtml(opt_data.experiment.name) + '</b>drop down menu above the navigation tool bar.<br><br></p></div>' : '<div class=\'scb_s_warning_dialog\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run this experiment, you cannot go back and make changes to this experiment\'s set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-Up & Run</b> to run your experiment.</p><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; EDIT SET-UP</a></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box_placeholder\'></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  }
  output.append('</div><div class="scb_s_experiment_setup_new_set_up"><div class="scb_s_experiment_setup_instructions"><img src=\'images/setup/setup_line.png\'/>', opt_data.t.experiment_setup, '</div><br><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList80 = opt_data.headings;
  var hListLen80 = hList80.length;
  for (var hIndex80 = 0; hIndex80 < hListLen80; hIndex80++) {
    var hData80 = hList80[hIndex80];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData80.kind), '\'>', (opt_data.kind == 'readonly') ? (hData80.kind != 'actions') ? soy.$$escapeHtml(hData80.title) : '' : soy.$$escapeHtml(hData80.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList94 = opt_data.rows;
  var rListLen94 = rList94.length;
  for (var rIndex94 = 0; rIndex94 < rListLen94; rIndex94++) {
    var rData94 = rList94[rIndex94];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData94.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData94.treatment.id), '\'>');
    var cList104 = rData94.columns;
    var cListLen104 = cList104.length;
    for (var cIndex104 = 0; cIndex104 < cListLen104; cIndex104++) {
      var cData104 = cList104[cIndex104];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData104.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData104.kind), '\' rowspan="', soy.$$escapeHtml(cData104.rows), '">', (cData104.kind == 'actions') ? (opt_data.kind == 'readwrite') ? ((opt_data.assignment.id == 'assignment_706_2014') ? '' : '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData94.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" src="images/setup/scb_copy.png"></button>') + '<button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData94.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" src="images/setup/scb_remove.png"></button>' : '' : ((cData104.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + ((cData104.kind == 'collection' && ! cData104.hidden && cData104.title == 'default') ? '' : soy.$$escapeHtml(cData104.title)), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList149 = opt_data.new_rows;
    var rListLen149 = rList149.length;
    for (var rIndex149 = 0; rIndex149 < rListLen149; rIndex149++) {
      var rData149 = rList149[rIndex149];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList155 = rData149.columns;
      var cListLen155 = cList155.length;
      for (var cIndex155 = 0; cIndex155 < cListLen155; cIndex155++) {
        var cData155 = cList155[cIndex155];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData155.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData155.kind), '\' rowspan="1">');
        if (cData155.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? '' : '');
        } else {
          output.append((cData155.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData155.kind == 'drug' && ! cData155.hidden && soy.$$getMapKeys(opt_data.t.drugs).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData149.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData155.kind == 'concentration' && ! cData155.hidden && soy.$$getMapKeys(opt_data.t.concentrations).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData149.treatment.drug_list.list[0].drug_id, concentration_id: rData149.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData149.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else if (cData155.kind == 'cell_line' && ! cData155.hidden && soy.$$getMapKeys(opt_data.t.cell_lines).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.cell_lines_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, cell_line_id: opt_data.t.cell_lines['p+'], disabled: true}, output);
            output.append('</span>');
          } else if (cData155.kind == 'collection_time' && ! cData155.hidden && soy.$$getMapKeys(opt_data.t.collection_times).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.collection_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, collection_id: opt_data.t.collection_times['3 m'], disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData155.title));
          }
        }
        output.append('</td>');
      }
      output.append('</tr>');
    }
    output.append((opt_data.t.ui.experiment_setup.actions.length > 0) ? '<tr><td colspan="' + soy.$$escapeHtml(opt_data.headings.length + 1) + '"><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog scb_s_gray_button\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>' + soy.$$escapeHtml(opt_data.t.ui.experiment_setup.actions[0].name) + '</button></td></tr>' : '');
  }
  output.append('</tbody></table></div>');
  if (opt_data.t.experiment_setup_actions) {
    scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  }
  output.append('</div>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly scb_f_run_experiment" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : (opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList274 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen274 = cell_lineList274.length;
  for (var cell_lineIndex274 = 0; cell_lineIndex274 < cell_lineListLen274; cell_lineIndex274++) {
    var cell_lineData274 = cell_lineList274[cell_lineIndex274];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData274.id), '\'>', soy.$$escapeHtml(cell_lineData274.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList282 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen282 = treatList282.length;
  for (var treatIndex282 = 0; treatIndex282 < treatListLen282; treatIndex282++) {
    var treatData282 = treatList282[treatIndex282];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData282.id), '\'>', soy.$$escapeHtml(treatData282.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList290 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen290 = collectList290.length;
  for (var collectIndex290 = 0; collectIndex290 < collectListLen290; collectIndex290++) {
    var collectData290 = collectList290[collectIndex290];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData290.id), '\'>', soy.$$escapeHtml(collectData290.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList304 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen304 = tList304.length;
  for (var tIndex304 = 0; tIndex304 < tListLen304; tIndex304++) {
    var tData304 = tList304[tIndex304];
    output.append('<option value=\'', soy.$$escapeHtml(tData304), '\' ', (tData304 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData304].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.collection_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'collection\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_collection_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList322 = soy.$$getMapKeys(opt_data.template.collection_times);
  var tListLen322 = tList322.length;
  for (var tIndex322 = 0; tIndex322 < tListLen322; tIndex322++) {
    var tData322 = tList322[tIndex322];
    output.append('<option value=\'', soy.$$escapeHtml(tData322), '\' ', (tData322 == opt_data.collection_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.collection_times[tData322].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList340 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen340 = tList340.length;
  for (var tIndex340 = 0; tIndex340 < tListLen340; tIndex340++) {
    var tData340 = tList340[tIndex340];
    output.append('<option value=\'', soy.$$escapeHtml(tData340), '\' ', (tData340 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData340].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList358 = opt_data.concentrations;
  var tListLen358 = tList358.length;
  for (var tIndex358 = 0; tIndex358 < tListLen358; tIndex358++) {
    var tData358 = tList358[tIndex358];
    output.append('<option value=\'', soy.$$escapeHtml(tData358), '\' ', (tData358 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData358].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList376 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen376 = tList376.length;
  for (var tIndex376 = 0; tIndex376 < tListLen376; tIndex376++) {
    var tData376 = tList376[tIndex376];
    output.append('<option value=\'', soy.$$escapeHtml(tData376), '\' ', (tData376 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData376].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_setup_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_warning_dialog\'><p><h1 class=\'jqDialog_confirm_header\'>Confirm Set-Up</h1>Once you confirm the set-up of this experiment and run it, you cannot go back to edit this experiment\'s set-up. To go back and edit your set-up, click <b>EDIT SET-UP</b>or click on <b>CONFIRM SET-UP AND RUN</b> to proceed.<br/> To create a new experiment set-up, select <b>New Experiment +</b> above the navigation tool bar.</p><a class=\'scb_s_navigation_button scb_f_open_select_technique\' href=\'#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>CONFIRM SET-UP & RUN &nbsp; &#9654;</a><br/><span class=\'scb_s_navigation_button scb_f_open_experiment_setup\' href=\'#view=experiment_setup&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>&#9664; &nbsp; EDIT SET-UP</span></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_setup_overlay = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'overlay\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.general_error_overlay = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'error_overlay\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 class=\'jqDialog_header\'>Error</h1>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.experiment_confirm = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 class=\'jqDialog_header\'>Confirm Set-Up</h1>');
  return opt_sb ? '' : output.toString();
};
