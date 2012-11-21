// This file was automatically generated from experiment_edit.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.experiment_name_text_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<input type=\'text\' name=\'experiment_name_text_edit\' size=\'45\' class=\'experiment_name_text_edit\' value=\'', soy.$$escapeHtml(opt_data.name), '\' /><div class=\'experiment_row_treatment_tools\'><img class=\'experiment_name_text_edit_save\' src=\'icons/actions/Save.png\' width=\'24px\'><img class=\'experiment_name_text_edit_cancel\' src=\'icons/actions/Cancel.png\' width=\'24px\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_cellline_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<select title=\'Cell Line\' size=\'1\' row=\'0\' class=\'experiment_setup_row_cellline_edit_field\'>');
  var tList8 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen8 = tList8.length;
  for (var tIndex8 = 0; tIndex8 < tListLen8; tIndex8++) {
    var tData8 = tList8[tIndex8];
    output.append('<option value=\'', soy.$$escapeHtml(tData8), '\' ', (tData8 == opt_data.treatment.cell_line) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData8].name), '</option>');
  }
  output.append('</select><div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit cell_line_save\' src=\'icons/actions/Save.png\' width=\'24px\'><img class=\'experiment_row_treatment_edit cell_line_cancel\' src=\'icons/actions/Cancel.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_treatment_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_row_treatment_drug\'>');
  var tList22 = opt_data.treatment.drug_list.list;
  var tListLen22 = tList22.length;
  for (var tIndex22 = 0; tIndex22 < tListLen22; tIndex22++) {
    var tData22 = tList22[tIndex22];
    scb_ui.experiment_setup_row_treatment_drug_edit({template: opt_data.template, concentrations: opt_data.template.drugs[tData22.drug_id].concentrations, drug_id: tData22.drug_id, concentration_id: tData22.concentration_id}, output);
  }
  output.append('<div class=\'add_experiment_row_treatment_drug\'><img class=\'experiment_row_treatment_drug_add\' src=\'icons/actions/Add.png\' width=\'24px\'></div></div>');
  if (opt_data.template.ui_configuration.treatment_options_display_temperature) {
    output.append('<div class=\'experiment_row_treatment_temperature\'><select title=\'Temperature\' size=\'1\' row=\'0\' class=\'experiment_row_treatment_temperature_field\'>');
    var tList33 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
    var tListLen33 = tList33.length;
    for (var tIndex33 = 0; tIndex33 < tListLen33; tIndex33++) {
      var tData33 = tList33[tIndex33];
      output.append('<option value=\'', soy.$$escapeHtml(tData33), '\' ', (tData33.id == opt_data.treatment.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData33].name), '</option>');
    }
    output.append('</select> C</div>');
  }
  output.append('<div class=\'experiment_row_treatment_schedule\' style=\'margin-left:-4px\'>', (opt_data.template.ui_configuration.treatment_options_edit_schedule) ? '<input type=\'text\' value=\'' + soy.$$escapeHtml(opt_data.treatment.schedule) + '\' size=\'8\' class=\'experiment_row_treatment_schedule_field\'>' : soy.$$escapeHtml(opt_data.treatment.schedule), '</div><div class=\'experiment_row_treatment_schedule2\'>', (opt_data.template.ui_configuration.treatment_options_edit_schedule) ? '<input type=\'text\' value=\'' + soy.$$escapeHtml(opt_data.treatment.duration) + '\' size=\'8\' class=\'experiment_row_treatment_duration_field\'>' : soy.$$escapeHtml(opt_data.treatment.duration), '</div><div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Save.png\' width=\'24px\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Cancel.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_treatment_drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_setup_row_treatment_drug_edit\'><select title=\'drug\' size=\'1\' row=\'0\' class=\'experiment_setup_row_treatment_drug_edit_drug_field\'>');
  var tList64 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen64 = tList64.length;
  for (var tIndex64 = 0; tIndex64 < tListLen64; tIndex64++) {
    var tData64 = tList64[tIndex64];
    output.append('<option value=\'', soy.$$escapeHtml(tData64), '\' ', (tData64 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData64].name), '</option>');
  }
  output.append('</select>');
  scb_ui.experiment_setup_row_treatment_drug_edit_concentrations(opt_data, output);
  output.append('<img class=\'experiment_setup_row_treatment_drug_edit_delete\' src=\'icons/actions/Delete.png\' width=\'24px\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_row_treatment_drug_edit_concentrations = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<select title=\'drug\' size=\'1\' row=\'0\' class=\'experiment_setup_row_treatment_drug_edit_concentrations_field\'>');
  var tList83 = opt_data.concentrations;
  var tListLen83 = tList83.length;
  for (var tIndex83 = 0; tIndex83 < tListLen83; tIndex83++) {
    var tData83 = tList83[tIndex83];
    output.append('<option value=\'', soy.$$escapeHtml(tData83), '\' ', (tData83 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData83].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_ui.collection_schedule_time_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_setup_row_treatment_edit\'><input type=\'text\' value=\'', soy.$$escapeHtml(opt_data.schedule.schedule), '\' size=\'8\' class=\'experiment_collection_schedule_field\'><div class=\'experiment_row_treatment_tools\'><img class=\'experiment_setup_row_treatment_save\' src=\'icons/actions/Save.png\' width=\'24px\'><img class=\'experiment_setup_row_treatment_cancel\' src=\'icons/actions/Cancel.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};
