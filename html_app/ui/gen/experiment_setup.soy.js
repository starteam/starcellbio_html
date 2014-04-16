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
    output.append('<div class=\'scb_s_experiment_setup_top\'><div class=\'scb_s_experiment_setup_choose_template\'><div class=\'scb_s_experiment_setup_create_new_set_up\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' aria-label=\'Create New Set-up\' role=\'radio\'><input class=\'scb_s_experiment_setup_choose_template_kind scb_f_experiment_setup_new_set_up\' type="radio" name="setup_kind"/><span class=\'scb_s_experiment_setup_radio_text\'>Create new set-up</span><br></div><!-- <div class=\'scb_s_experiment_setup_choose_existing_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span></div>--><br></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'  alt=\'Video Player Background\'  aria-label=\'Video Player Background\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box_placeholder\'></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
    output.append('<div class=\'scb_s_experiment_setup_top\'>', (opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\' role=\'note\'><h1>NOTE!</h1><p>Below is a summary of your set-up for ' + soy.$$escapeHtml(opt_data.experiment.name) + '.<br>To create a new experiment, select <b>+ New Experiment</b> next to <b>' + soy.$$escapeHtml(opt_data.assignment.name) + ': ' + soy.$$escapeHtml(opt_data.experiment.name) + '</b>drop down menu above the navigation tool bar.<br><br></p></div>' : '<div class=\'scb_s_warning_dialog\' role=\'note\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run this experiment, you cannot go back and make changes to this experiment\'s set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-Up & Run</b> to run your experiment.</p><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' aria-label=\'Select Technique\' role=\'button\' >SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '" aria-label=\'Edit Set-Up\' role=\'button\'>&#9664; &nbsp; EDIT SET-UP</a></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\' alt=\'Video Player Background\'  aria-label=\'Video Player Background\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box_placeholder\'></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  }
  output.append('</div><div class="scb_s_experiment_setup_new_set_up"><div class="scb_s_experiment_setup_instructions"><img src=\'images/setup/setup_line.png\'/>', opt_data.t.experiment_setup, '</div><br><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '" aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList84 = opt_data.headings;
  var hListLen84 = hList84.length;
  for (var hIndex84 = 0; hIndex84 < hListLen84; hIndex84++) {
    var hData84 = hList84[hIndex84];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData84.kind), '\'>', (opt_data.kind == 'readonly') ? (hData84.kind != 'actions') ? soy.$$escapeHtml(hData84.title) : '' : soy.$$escapeHtml(hData84.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList98 = opt_data.rows;
  var rListLen98 = rList98.length;
  for (var rIndex98 = 0; rIndex98 < rListLen98; rIndex98++) {
    var rData98 = rList98[rIndex98];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData98.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData98.treatment.id), '\'>');
    var cList108 = rData98.columns;
    var cListLen108 = cList108.length;
    for (var cIndex108 = 0; cIndex108 < cListLen108; cIndex108++) {
      var cData108 = cList108[cIndex108];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData108.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData108.kind), '\' rowspan="', soy.$$escapeHtml(cData108.rows), '">', (cData108.kind == 'actions') ? (opt_data.kind == 'readwrite') ? ((opt_data.assignment.id == 'assignment_706_2014') ? '' : '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData98.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" src="images/setup/scb_copy.png"></button>') + '<button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData98.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" src="images/setup/scb_remove.png"></button>' : '' : ((cData108.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png" role=\'presentation\'>' : '') + ((cData108.kind == 'collection' && cData108.title == 'default') ? '' : soy.$$escapeHtml(cData108.title)), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList153 = opt_data.new_rows;
    var rListLen153 = rList153.length;
    for (var rIndex153 = 0; rIndex153 < rListLen153; rIndex153++) {
      var rData153 = rList153[rIndex153];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList159 = rData153.columns;
      var cListLen159 = cList159.length;
      for (var cIndex159 = 0; cIndex159 < cListLen159; cIndex159++) {
        var cData159 = cList159[cIndex159];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData159.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData159.kind), '\' rowspan="1">');
        if (cData159.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? '' : '');
        } else {
          output.append((cData159.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData159.kind == 'drug' && soy.$$getMapKeys(opt_data.t.drugs).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData153.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData159.kind == 'concentration' && soy.$$getMapKeys(opt_data.t.concentrations).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData153.treatment.drug_list.list[0].drug_id, concentration_id: rData153.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData153.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else if (cData159.kind == 'cell_line' && soy.$$getMapKeys(opt_data.t.cell_lines).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.cell_lines_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, cell_line_id: opt_data.t.cell_lines['p+'], disabled: true}, output);
            output.append('</span>');
          } else if (cData159.kind == 'collection' && soy.$$getMapKeys(opt_data.t.collections).length > 1) {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.collection_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, collection_id: opt_data.t.collections['3 m'], disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData159.title));
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
  var cell_lineList278 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen278 = cell_lineList278.length;
  for (var cell_lineIndex278 = 0; cell_lineIndex278 < cell_lineListLen278; cell_lineIndex278++) {
    var cell_lineData278 = cell_lineList278[cell_lineIndex278];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData278.id), '\'>', soy.$$escapeHtml(cell_lineData278.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList286 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen286 = treatList286.length;
  for (var treatIndex286 = 0; treatIndex286 < treatListLen286; treatIndex286++) {
    var treatData286 = treatList286[treatIndex286];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData286.id), '\'>', soy.$$escapeHtml(treatData286.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList294 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen294 = collectList294.length;
  for (var collectIndex294 = 0; collectIndex294 < collectListLen294; collectIndex294++) {
    var collectData294 = collectList294[collectIndex294];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData294.id), '\'>', soy.$$escapeHtml(collectData294.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList308 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen308 = tList308.length;
  for (var tIndex308 = 0; tIndex308 < tListLen308; tIndex308++) {
    var tData308 = tList308[tIndex308];
    output.append('<option value=\'', soy.$$escapeHtml(tData308), '\' ', (tData308 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData308].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.collection_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'collection\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_collection_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList326 = soy.$$getMapKeys(opt_data.template.collections);
  var tListLen326 = tList326.length;
  for (var tIndex326 = 0; tIndex326 < tListLen326; tIndex326++) {
    var tData326 = tList326[tIndex326];
    output.append('<option value=\'', soy.$$escapeHtml(tData326), '\' ', (tData326 == opt_data.collection_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.collections[tData326].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList344 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen344 = tList344.length;
  for (var tIndex344 = 0; tIndex344 < tListLen344; tIndex344++) {
    var tData344 = tList344[tIndex344];
    output.append('<option value=\'', soy.$$escapeHtml(tData344), '\' ', (tData344 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData344].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList362 = opt_data.concentrations;
  var tListLen362 = tList362.length;
  for (var tIndex362 = 0; tIndex362 < tListLen362; tIndex362++) {
    var tData362 = tList362[tIndex362];
    output.append('<option value=\'', soy.$$escapeHtml(tData362), '\' ', (tData362 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData362].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList380 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen380 = tList380.length;
  for (var tIndex380 = 0; tIndex380 < tListLen380; tIndex380++) {
    var tData380 = tList380[tIndex380];
    output.append('<option value=\'', soy.$$escapeHtml(tData380), '\' ', (tData380 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData380].name), '</option>');
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
