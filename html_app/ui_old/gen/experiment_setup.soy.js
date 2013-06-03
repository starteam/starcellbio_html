// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.experiment_setup_display_vertical = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div>');
  if (opt_data.selected_experiment.cell_treatment_list.length == 0) {
    output.append('<div>Add new Cell treatment</div>');
  } else {
    var tList8 = opt_data.selected_experiment.cell_treatment_list.list;
    var tListLen8 = tList8.length;
    for (var tIndex8 = 0; tIndex8 < tListLen8; tIndex8++) {
      var tData8 = tList8[tIndex8];
      output.append('<div class=\'experiment_setup_display_vertical\'><div class=\'esv_protocol_name\'>', soy.$$escapeHtml(tData8.name), '</div><div class=\'esv_cell_line\'><div class=\'experiment_row_cell_line\'>');
      scb_ui.experiment_setup_row_cell_line({row: tData8, template: opt_data.template, selected_experiment: opt_data.selected_experiment}, output);
      output.append('</div></div><div class=\'esv_tools\'><button>x</button></div><div class=\'esv_bottom\'><div class=\'esv_add_schedule\'><button class=\'button small green\'>Add Collection Time</button></div><div class=\'esv_add_treatment\'><button class=\'button small green\'>Add Treatment Protocol</button></div></div><div class=\'esv_block\'>');
      scb.experiment_setup_treatment_display({selected_experiment: opt_data.selected_experiment, template: opt_data.template, cell_treatment: tData8}, output);
      output.append('</div></div>');
    }
  }
  output.append('<div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_treatment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_setup_row_treatment\' treatment_id="', soy.$$escapeHtml(opt_data.treatment.id), '" cell_treatment_id="', soy.$$escapeHtml(opt_data.cell_treatment_id), '"><table class=\'experiment_setup_row_schedule\'><tr><td><b>start: ', soy.$$escapeHtml(opt_data.treatment.schedule), '</b></td><td><b>duration: ', soy.$$escapeHtml(opt_data.treatment.duration), '</b></td><td><a href=\'#\'>Edit</a></td></tr></table><table class=\'experiment_setup_row_treatment_drug\'>');
  var tList34 = opt_data.treatment.drug_list.list;
  var tListLen34 = tList34.length;
  for (var tIndex34 = 0; tIndex34 < tListLen34; tIndex34++) {
    var tData34 = tList34[tIndex34];
    output.append('<tr class=\'experiment_setup_row_treatment_drug_one\'><td>', soy.$$escapeHtml(opt_data.template.drugs[tData34.drug_id].name), '</td><td>(', soy.$$escapeHtml(opt_data.template.concentrations[tData34.concentration_id].name), ')</td></tr>');
  }
  output.append('</table>', (opt_data.template.ui_configuration.treatment_options_display_temperature) ? '<div class=\'experiment_row_treatment_temperature\'>' + soy.$$escapeHtml(opt_data.treatment.temperature) + ' \'C</div>' : '', (opt_data.selected_experiment.setup_finished) ? '' : '<div class=\'experiment_row_treatment_tools\'><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Edit.png\' width=\'24px\'><img class=\'experiment_row_treatment_delete\' src=\'icons/actions/Delete.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div>', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.experiment_setup_collection = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'experiment_setup_row_collection\'><b>Collect at ', soy.$$escapeHtml(opt_data.collection_schedule.schedule), '</b> <a href=\'#\'>Edit</a></div>');
  return opt_sb ? '' : output.toString();
};
