// This file was automatically generated from experiment.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.display_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<span experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
  scb_ui.experiment_name({selected_experiment: opt_data.experiment}, output);
  output.append('<br>', (opt_data.experiment.setup_finished) ? 'Now that experiment is set, you can click on \'cultures\' on the right hand side to start new analysis<br>' : '<div class=\'display_instructions\'>To start your experiment, click on <span style=\'font-weight:bold\'>Experimental Setup</span> on the left hand side. After you set up your experiment, you will be able to analyze your samples by western blotting.</div>', '</span>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  scb_util.display_header_name({name: opt_data.selected_experiment.name, name_label: 'Experiment name:', name_class: 'experiment_name_text', icon_class: 'edit_experiment_name_text', remove_class: 'remove_experiment', remove_title: 'Discard Experiment'}, output);
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  if (opt_data.selected_experiment == null) {
    scb_ui.dashboard(null, output);
  } else {
    scb_ui.experiment_setup_display(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_sidebar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div type=\'button\' class=\'create_new_experiment\' value=\'Create New Experiment\'>Create New Experiment</div><ul class=\'sidebar_list\'>');
  var experimentList34 = opt_data.experiment_list.list;
  var experimentListLen34 = experimentList34.length;
  for (var experimentIndex34 = 0; experimentIndex34 < experimentListLen34; experimentIndex34++) {
    var experimentData34 = experimentList34[experimentIndex34];
    output.append('<li><a href=\'#', soy.$$escapeHtml(experimentData34.id), '\' experiment=\'', soy.$$escapeHtml(experimentData34.id), '\' class=\'a_black_link select_experiment ', (opt_data.selected_experiment_id == experimentData34.id) ? 'experiment_sidebar_selected_experiment' : '', '\'>', soy.$$escapeHtml(experimentData34.name), '</a></li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_display = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_setup\' experiment_id=\'', soy.$$escapeHtml(opt_data.selected_experiment.id), '\'>');
  scb_ui.experiment_name(opt_data, output);
  output.append('<div class=\'grouping_label\'>Experimental Setup</div><div class=\'display_instructions add_new_row_instructions\'>', opt_data.template.add_new_row_instructions, '</div>', (opt_data.selected_experiment.cell_treatment_list.length == 0) ? '<div></div>' : '', '<!--<div class=\'experiment_rows space_above\'><b>Cell lines and cell line treatments</b></div>--><div class=\'experiment_rows\'>');
  scb_ui.experiment_setup_row_header({template: opt_data.template, display_collection_times: opt_data.template.ui_configuration.display_collection_times, display_stimulation_times: opt_data.template.ui_configuration.display_stimulation_times}, output);
  output.append('<ul class=\'experiment_rows_list\'>');
  var tList67 = opt_data.selected_experiment.cell_treatment_list.list;
  var tListLen67 = tList67.length;
  for (var tIndex67 = 0; tIndex67 < tListLen67; tIndex67++) {
    var tData67 = tList67[tIndex67];
    scb_ui.experiment_setup_row({row: tData67, template: opt_data.template, selected_experiment: opt_data.selected_experiment, display_collection_times: opt_data.template.ui_configuration.display_collection_times, display_stimulation_times: opt_data.template.ui_configuration.display_stimulation_times}, output);
  }
  output.append('</ul>');
  if (opt_data.selected_experiment.setup_finished == true) {
  } else {
    output.append('<div class=\'add_new_experiment_row green\'>Add treatment protocol</div><div class=\'add_new_experiment_row_dialog\' style=\'display:none\' title=\'Add treatment protocols\'>');
    scb_ui.add_new_experiment_row_dialog(opt_data, output);
    output.append('</div>', (opt_data.template.ui_configuration.show_add_new_experiment_rows) ? '<div class=\'add_new_experiment_rows green\'>Add treatment protocols (multiple)</div>' : '', '<div class=\'add_new_experiment_rows_dialog\' style=\'display:none\' title=\'Add treatment protocols\'>');
    scb_ui.add_new_experiment_rows_dialog({template: opt_data.template, concentrations: opt_data.template.drugs[opt_data.template.drug_template.drug_id].concentrations, drug_id: opt_data.template.drug_template.drug_id, concentration_id: opt_data.template.drug_template.concentration_id}, output);
    output.append('</div>');
  }
  output.append('</div><div class=\'finish_experiment_setup_wrapper space_above\'>', (opt_data.selected_experiment.setup_finished == true) ? '<center><div class=\'display_instructions\'>To analyze your samples by western blotting, select <b>Western Blot.</b></div><br>' + ((opt_data.template.ui_configuration.experiment_steps_western_blot) ? '<div class=\'new_western_blot button green\'>Western Blot</div>' : '') + ((opt_data.template.ui_configuration.experiment_steps_facs) ? '<div class=\'new_facs button  green\' model_id=\'' + soy.$$escapeHtml(opt_data.selected_experiment.id) + '\'>FACS</div>' : '') + ((opt_data.template.ui_configuration.experiment_steps_microscopy) ? '<div class=\'new_microscopy button green\'>Microscopy</div>' : '') + '</center>' : '<div class=\'finish_experiment_setup green\'>Finish setup & run experiment</div>', '</div><div id=\'experiment_setup_row_treatment_edit_blackout\'><div id=\'experiment_setup_row_treatment_edit\' style=\'display:none\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.add_new_experiment_rows_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div>Select drug and than list of concentrations to add</div><div class=\'experiment_setup_row_treatment_drug_edit\'><select title=\'drug\' size=\'1\' row=\'0\' class=\'experiment_setup_row_treatment_drug_edit_drug_field\'>');
  var tList114 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen114 = tList114.length;
  for (var tIndex114 = 0; tIndex114 < tListLen114; tIndex114++) {
    var tData114 = tList114[tIndex114];
    output.append('<option value=\'', soy.$$escapeHtml(tData114), '\' ', (tData114 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData114].name), '</option>');
  }
  output.append('</select><br>');
  var tList126 = opt_data.concentrations;
  var tListLen126 = tList126.length;
  for (var tIndex126 = 0; tIndex126 < tListLen126; tIndex126++) {
    var tData126 = tList126[tIndex126];
    output.append('<input class=\'add_new_experiment_rows_dialog_concentrations\' type=\'checkbox\' name=\'drug\' value=\'', soy.$$escapeHtml(tData126), '\' id=\'', soy.$$escapeHtml(tData126), '\' ', (tData126 == opt_data.concentration_id) ? 'checked=\'checked\'' : '', '><label for=\'', soy.$$escapeHtml(tData126), '\'>  ', soy.$$escapeHtml(opt_data.template.concentrations[tData126].name), '</label></checkbox><br>');
  }
  output.append('</div><br><div class=\'add_new_experiment_rows_dialog_apply button small green\' style=\'float:right\'>Apply</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.add_new_experiment_row_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div>Select treatment template to add</div>');
  var tList144 = soy.$$getMapKeys(opt_data.template.experiment_templates.treatment_protocol_template);
  var tListLen144 = tList144.length;
  for (var tIndex144 = 0; tIndex144 < tListLen144; tIndex144++) {
    var tData144 = tList144[tIndex144];
    output.append('<div id=\'div_add_new_experiment_row_dialog_', soy.$$escapeHtml(tData144), '\'><input type=\'radio\' id=\'add_new_experiment_row_dialog_', soy.$$escapeHtml(tData144), '\' value=\'', soy.$$escapeHtml(tData144), '\' name=\'add_new_experiment_row_dialog\' ><label for=\'add_new_experiment_row_dialog_', soy.$$escapeHtml(tData144), '\'>', soy.$$escapeHtml(opt_data.template.experiment_templates.treatment_protocol_template[tData144].title), '</label></input></div>');
  }
  output.append('<br><div class=\'add_new_experiment_row_dialog_apply button small green\' style=\'float:right\'>Add</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'experiment_row\'>', (opt_data.insert_space) ? '<div style=\'width:40px;display:inline-block\'> </div>' : '', '<div class=\'experiment_row_cell_line\' style=\'border-style:none\'>Strain</div><div class=\'experiment_row_treatments\'><div><div class=\'experiment_row_treatment_drug\'>Treatments</div>', (opt_data.template.ui_configuration.treatment_options_display_temperature) ? '<div class=\'experiment_row_treatment_temperature\'>Temp</div>' : '', '<div class=\'experiment_row_treatment_schedule\'>Start</div><div class=\'experiment_row_treatment_schedule2\'>Duration</div></div></div>', (opt_data.display_collection_times != false) ? '<div class=\'experiment_collection_times_header\' ' + ((opt_data.insert_space) ? 'style=\'margin-left:-50px;padding-left:0px;\'' : '') + '>Collection times</div>' : '', (opt_data.display_stimulation_times == true) ? '<div class=\'experiment_collection_times_header\' ' + ((opt_data.insert_space) ? 'style=\'margin-left:-50px;padding-left:0px;\'' : '') + '>Stimulation time</div>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_header2 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'experiment_row\'>', (opt_data.insert_space) ? '<div style=\'width:40px;display:inline-block\'> </div>' : '', '<div class=\'experiment_row_cell_line\' style=\'border-style:none\'>Strain</div><div class=\'experiment_row_treatments\'><div><div class=\'experiment_row_treatment_drug\'>Treatments</div>', (opt_data.template.ui_configuration.treatment_options_display_temperature) ? '<div class=\'experiment_row_treatment_temperature\'>Temp</div>' : '', '<div class=\'experiment_row_treatment_schedule\'>Start</div><div class=\'experiment_row_treatment_schedule2\'>Duration</div></div></div>', (opt_data.display_collection_times != false) ? '<div class=\'experiment_collection_times_header\' ' + ((opt_data.insert_space) ? 'style=\'margin-left:-30px;padding-left:0px;white-space:pre-wrap;width:80px;\'' : '') + '>Collection times</div>' : '', (opt_data.display_stimulation_times != false) ? '<div class=\'experiment_collection_times_header\' ' + ((opt_data.insert_space) ? 'style=\'margin-left:-50px;padding-left:0px;\'' : '') + '>Stimulation time</div>' : '<div style=\'display:inline-block;white-space:pre-wrap;' + ((opt_data.insert_space) ? 'width:50px\'' : '') + '></div>', '<div style=\'display:inline-block;white-space:pre-wrap;width:100px\'>Lysate Type</div>', (opt_data.protein_loaded) ? '<div style=\'display:inline-block;white-space:pre-wrap;width:150px\'>Protein Loaded</div>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.add_experiment_row_treatment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.row.treatment_list.list < 1) ? '<div class=\'add_experiment_row_treatment button green \' row_id=\'' + soy.$$escapeHtml(opt_data.row.id) + '\'><div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Add.png\' width=\'24px\'></div>Add a treatment</div>' : (opt_data.row.treatment_list.list.length < opt_data.template.ui_configuration.maximum_number_of_treatments_per_protocol) ? '<div class=\'add_experiment_row_treatment button green \' row_id=\'' + soy.$$escapeHtml(opt_data.row.id) + '\'><div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Add.png\' width=\'24px\'></div>Add another treatment to this protocol</div>' : '');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<li class=\'experiment_row\' row_id=\'', soy.$$escapeHtml(opt_data.row.id), '\'><div class=\'experiment_row_cell_line\'>');
  scb_ui.experiment_setup_row_cell_line(opt_data, output);
  output.append('</div><div class=\'experiment_row_treatments\'>', (opt_data.row.treatment_list.list.length == 0) ? '' : '');
  var tList241 = opt_data.row.treatment_list.list;
  var tListLen241 = tList241.length;
  for (var tIndex241 = 0; tIndex241 < tListLen241; tIndex241++) {
    var tData241 = tList241[tIndex241];
    scb_ui.experiment_setup_row_treatment({treatment: tData241, template: opt_data.template, cell_treatment_id: opt_data.row.id, selected_experiment: opt_data.selected_experiment}, output);
  }
  if (opt_data.selected_experiment.setup_finished) {
  } else {
    scb_ui.add_experiment_row_treatment(opt_data, output);
  }
  output.append('</div>');
  if (opt_data.selected_experiment.setup_finished) {
  } else {
    output.append('<div class=\'toolbox_experiment_row\'>');
    scb_util.icon_with_text({src: 'icons/actions/Delete.png', text: 'Delete', cls: 'delete_experiment_row'}, output);
    scb_util.icon_with_text({src: 'icons/actions/Copy.png', text: 'Copy', cls: 'duplicate_experiment_row'}, output);
    output.append('</div>');
  }
  if (opt_data.display_collection_times != false) {
    scb_ui.experiment_collection_times({selected_experiment: opt_data.row, template: opt_data.template}, output);
  }
  output.append((opt_data.display_stimulation_times != false) ? soy.$$escapeHtml(opt_data.row.stimulation_time) : '', '</li>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_cell_line = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t', soy.$$escapeHtml(opt_data.template.cell_lines[opt_data.row.cell_line].name), (opt_data.selected_experiment.setup_finished) ? '' : '<div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Edit.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_treatment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_row_treatment\' treatment_id="', soy.$$escapeHtml(opt_data.treatment.id), '" cell_treatment_id="', soy.$$escapeHtml(opt_data.cell_treatment_id), '"><div class=\'experiment_row_treatment_drug\'>');
  var tList290 = opt_data.treatment.drug_list.list;
  var tListLen290 = tList290.length;
  for (var tIndex290 = 0; tIndex290 < tListLen290; tIndex290++) {
    var tData290 = tList290[tIndex290];
    output.append('<div class=\t\'experiment_row_treatment_drug_one\'>', soy.$$escapeHtml(opt_data.template.drugs[tData290.drug_id].name), ' (', soy.$$escapeHtml(opt_data.template.concentrations[tData290.concentration_id].name), ')</div>');
  }
  output.append('</div>', (opt_data.template.ui_configuration.treatment_options_display_temperature) ? '<div class=\'experiment_row_treatment_temperature\'>' + soy.$$escapeHtml(opt_data.treatment.temperature) + ' \'C</div>' : '', '<div class=\'experiment_row_treatment_schedule\' style=\'margin-left:-14px;\'>', soy.$$escapeHtml(opt_data.treatment.schedule), '</div><div class=\'experiment_row_treatment_schedule2\'>', soy.$$escapeHtml(opt_data.treatment.duration), '</div>', (opt_data.selected_experiment.setup_finished) ? '' : '<div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Edit.png\' width=\'24px\'><img class=\'experiment_row_treatment_delete\' src=\'icons/actions/Delete.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div>', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.format_time_detailed = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t', (opt_data.weeks != 0) ? ' ' + soy.$$escapeHtml(opt_data.weeks) + ' ' + ((opt_data.weeks > 1) ? 'wks' : 'wk') : '', (opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.now) ? '0 sec' : '');
  return opt_sb ? '' : output.toString();
};


scb_ui.format_time_detailed_w_sec = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t', (opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.seconds != 0) ? ' ' + soy.$$escapeHtml(opt_data.seconds) + ' ' + ((opt_data.seconds > 1) ? 'sec' : 'sec') : '', (opt_data.now) ? '0 min' : '');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_collection_times = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t<div class=\'experiment_collection_times\'>');
  var tList405 = opt_data.selected_experiment.collection_schedule_list.list;
  var tListLen405 = tList405.length;
  for (var tIndex405 = 0; tIndex405 < tListLen405; tIndex405++) {
    var tData405 = tList405[tIndex405];
    scb_ui.collection_schedule({schedule: tData405, template: opt_data.template}, output);
  }
  output.append((opt_data.selected_experiment.setup_finished) ? '' : (opt_data.template.ui_configuration.collection_times_fixed) ? '' : '<div class=\'add_experiment_collection_times\'>&nbsp;<img class=\'add_experiment_collection_times_icon\' src=\'icons/actions/Add.png\' width=\'24px\'></div>', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.collection_schedule = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'collection_schedule_time\' schedule_id=\'', soy.$$escapeHtml(opt_data.schedule.id), '\'>', soy.$$escapeHtml(opt_data.schedule.schedule), '<div class=\'experiment_row_treatment_tools\' ><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Edit.png\' width=\'24px\'><img class=\'experiment_row_treatment_delete\' src=\'icons/actions/Delete.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div></div>');
  return opt_sb ? '' : output.toString();
};
