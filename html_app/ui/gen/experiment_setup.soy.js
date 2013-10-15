// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 4, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_details_view\' mode=\'', soy.$$escapeHtml(opt_data.kind), '\'><div class=\'scb_s_experiment_setup_top\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2}, output);
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'><input class=\'scb_s_experiment_setup_choose_template_kind scb_f_experiment_setup_new_set_up\' type="radio" name="setup_kind"/>Create new set-up<br><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span><!-- <select class=\'scb_s_experiment_setup_choose_template_id\' disabled="disabled"><option>Experiment 1</option><option>Experiment 1</option></select>--><br></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box\'></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
    output.append((opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\'><h1>NOTE!</h1><p>Below is a summary of your set-up for ' + soy.$$escapeHtml(opt_data.experiment.name) + '.<br>To create a new experiment, select <b>' + soy.$$escapeHtml(opt_data.assignment.name) + '</b> in the navigation tool bar above or click on<b>' + soy.$$escapeHtml(opt_data.experiment.name) + '</b> above the navigation tool bar and select <b>+ New Experiment</b> in the drop down menu.<br><br><br></p></div>' : '<div class=\'scb_s_warning\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run this experiment, you cannot go back and make changes to this experiment\'s set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-Up & Select Technique</b> to run your experiment.<!-- Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment. --></p></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_experiment_setup_video_box\'></div></div>');
  }
  output.append('</div><div class="scb_s_experiment_setup_new_set_up"><div class="scb_s_experiment_setup_instructions"><img src=\'images/setup/setup_line.png\'/>', opt_data.t.experiment_setup, '</div><br><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList59 = opt_data.headings;
  var hListLen59 = hList59.length;
  for (var hIndex59 = 0; hIndex59 < hListLen59; hIndex59++) {
    var hData59 = hList59[hIndex59];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData59.kind), '\'>', (opt_data.kind == 'readonly') ? (hData59.kind != 'actions') ? soy.$$escapeHtml(hData59.title) : '' : soy.$$escapeHtml(hData59.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList73 = opt_data.rows;
  var rListLen73 = rList73.length;
  for (var rIndex73 = 0; rIndex73 < rListLen73; rIndex73++) {
    var rData73 = rList73[rIndex73];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData73.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData73.treatment.id), '\'>');
    var cList83 = rData73.columns;
    var cListLen83 = cList83.length;
    for (var cIndex83 = 0; cIndex83 < cListLen83; cIndex83++) {
      var cData83 = cList83[cIndex83];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData83.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData83.kind), '\' rowspan="', soy.$$escapeHtml(cData83.rows), '">', (cData83.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData73.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData73.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" src="images/setup/scb_remove.png"></button>' : '' : ((cData83.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData83.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList121 = opt_data.new_rows;
    var rListLen121 = rList121.length;
    for (var rIndex121 = 0; rIndex121 < rListLen121; rIndex121++) {
      var rData121 = rList121[rIndex121];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList127 = rData121.columns;
      var cListLen127 = cList127.length;
      for (var cIndex127 = 0; cIndex127 < cListLen127; cIndex127++) {
        var cData127 = cList127[cIndex127];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData127.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData127.kind), '\' rowspan="1">');
        if (cData127.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '');
        } else {
          output.append((cData127.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData127.kind == 'drug') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData121.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData127.kind == 'concentration') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData121.treatment.drug_list.list[0].drug_id, concentration_id: rData121.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData121.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData127.title));
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
  output.append((opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly scb_f_run_experiment" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : (opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>CONFIRM SET-UP & SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>CONFIRM SET-UP & SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; EDIT SET-UP</a>', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList245 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen245 = cell_lineList245.length;
  for (var cell_lineIndex245 = 0; cell_lineIndex245 < cell_lineListLen245; cell_lineIndex245++) {
    var cell_lineData245 = cell_lineList245[cell_lineIndex245];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData245.id), '\'>', soy.$$escapeHtml(cell_lineData245.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList253 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen253 = treatList253.length;
  for (var treatIndex253 = 0; treatIndex253 < treatListLen253; treatIndex253++) {
    var treatData253 = treatList253[treatIndex253];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData253.id), '\'>', soy.$$escapeHtml(treatData253.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList261 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen261 = collectList261.length;
  for (var collectIndex261 = 0; collectIndex261 < collectListLen261; collectIndex261++) {
    var collectData261 = collectList261[collectIndex261];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData261.id), '\'>', soy.$$escapeHtml(collectData261.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList275 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen275 = tList275.length;
  for (var tIndex275 = 0; tIndex275 < tListLen275; tIndex275++) {
    var tData275 = tList275[tIndex275];
    output.append('<option value=\'', soy.$$escapeHtml(tData275), '\' ', (tData275 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData275].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList293 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen293 = tList293.length;
  for (var tIndex293 = 0; tIndex293 < tListLen293; tIndex293++) {
    var tData293 = tList293[tIndex293];
    output.append('<option value=\'', soy.$$escapeHtml(tData293), '\' ', (tData293 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData293].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList311 = opt_data.concentrations;
  var tListLen311 = tList311.length;
  for (var tIndex311 = 0; tIndex311 < tListLen311; tIndex311++) {
    var tData311 = tList311[tIndex311];
    output.append('<option value=\'', soy.$$escapeHtml(tData311), '\' ', (tData311 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData311].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList329 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen329 = tList329.length;
  for (var tIndex329 = 0; tIndex329 < tListLen329; tIndex329++) {
    var tData329 = tList329[tIndex329];
    output.append('<option value=\'', soy.$$escapeHtml(tData329), '\' ', (tData329 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData329].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
