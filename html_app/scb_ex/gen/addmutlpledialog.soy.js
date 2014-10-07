// This file was automatically generated from addmutlpledialog.soy.
// Please don't edit this file by hand.

if (typeof scb_ex == 'undefined') { var scb_ex = {}; }


scb_ex.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_ex_inner_dialog\' role=\'dialog\' aria-label=\'Add Samples\'><h1 class=\'scb_ex_inner_dialog_title\' role=\'presentation\' aria-label=\'Add Samples\'><span class=\'scb_ex_inner_dialog_title_close\' role=\'button\' aria-label=\'Close Add Samples\'>&#215;</span>Add Samples </h1><div class=\'scb_ex_inner_dialog_body\'><table class="scb_s_experiment_setup_table" role=\'grid\' aria-label=\'Cell Lines\'><thead class="scb_s_experiment_setup_table_head"><td role=\'columnheader\' aria-label=\'selected\' class=\'scb_s_experiment_setup_table_heading\' style=\'width:80px\'>Selected</td><td role=\'columnheader\' aria-label=\'cell line\' class=\'scb_s_experiment_setup_table_heading\'>Cell Line</td></thead><tbody class="scb_s_experiment_setup_table_body">');
  var cell_lineList4 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var cell_lineListLen4 = cell_lineList4.length;
  for (var cell_lineIndex4 = 0; cell_lineIndex4 < cell_lineListLen4; cell_lineIndex4++) {
    var cell_lineData4 = cell_lineList4[cell_lineIndex4];
    output.append('<tr role=\'row\' aria-label=\'Sample\'><td class=\'scb_s_experiment_setup_table_border\'><input class=\'scb_f_experiment_setup_dialog_checkbox\' type="checkbox" role=\'checkbox\'  name="', soy.$$escapeHtml(cell_lineData4), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(cell_lineData4), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\' aria-checked=\'false\'></td><td class=\'scb_s_experiment_setup_table_border\'>', soy.$$escapeHtml(opt_data.template.cell_lines[cell_lineData4].name), '</td></tr>');
  }
  output.append('</tr></tbody></table><div class=\'scb_ex_button_float\'><button class=\'scb_ex_inner_dialog_cancel scb_s_gray_button\' aria-label=\'Cancel\' role=\'button\'>CANCEL</button><button class=\'scb_ex_inner_dialog_add scb_s_gray_button\' aria-label=\'Add Samples\' role=\'button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
