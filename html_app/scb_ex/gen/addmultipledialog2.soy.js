// This file was automatically generated from addmultipledialog2.soy.
// Please don't edit this file by hand.

if (typeof scb_ex == 'undefined') { var scb_ex = {}; }


scb_ex.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_ex_inner_dialog\' role=\'dialog\' aria-label=\'Add Samples\'><h1 class=\'scb_ex_inner_dialog_title\' role=\'presentation\' aria-label=\'Add Samples\'><span class=\'scb_ex_inner_dialog_title_close\' role=\'button\' aria-label=\'Close Add Samples\'>&#215;</span>Add Samples </h1><div class=\'scb_ex_inner_dialog_body\'><table class="scb_s_experiment_setup_table" role=\'grid\' aria-label=\'Cell Lines\'><thead class="scb_s_experiment_setup_table_head">');
  var headingList4 = opt_data.template.ui.add_multiple_dialog.headings;
  var headingListLen4 = headingList4.length;
  for (var headingIndex4 = 0; headingIndex4 < headingListLen4; headingIndex4++) {
    var headingData4 = headingList4[headingIndex4];
    output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(headingData4), '\' class=\'scb_s_experiment_setup_table_heading\'>', soy.$$escapeHtml(headingData4), '</td>');
  }
  output.append('</thead><tbody class="scb_s_experiment_setup_table_body">');
  var cell_lineList12 = opt_data.template.ui.add_multiple_dialog.order;
  var cell_lineListLen12 = cell_lineList12.length;
  for (var cell_lineIndex12 = 0; cell_lineIndex12 < cell_lineListLen12; cell_lineIndex12++) {
    var cell_lineData12 = cell_lineList12[cell_lineIndex12];
    var rowsList13 = opt_data.template.ui.add_multiple_dialog[cell_lineData12].rows;
    var rowsListLen13 = rowsList13.length;
    for (var rowsIndex13 = 0; rowsIndex13 < rowsListLen13; rowsIndex13++) {
      var rowsData13 = rowsList13[rowsIndex13];
      output.append('<tr role=\'row\' aria-label=\'Sample\'>');
      var cellList15 = rowsData13.cells;
      var cellListLen15 = cellList15.length;
      for (var cellIndex15 = 0; cellIndex15 < cellListLen15; cellIndex15++) {
        var cellData15 = cellList15[cellIndex15];
        output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData15.kind == 'text') ? soy.$$escapeHtml(cellData15.text) : '', (cellData15.kind == 'checkbox') ? '<input class=\'scb_f_experiment_setup_dialog_checkbox\' type="checkbox" role=\'checkbox\'  name="' + soy.$$escapeHtml(cellData15.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(cellData15.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData12) + '\' aria-checked=\'false\'>' : '', '</td>');
      }
      output.append('</tr>');
    }
  }
  output.append('</tr></tbody></table><div class=\'scb_ex_button_float\'><button class=\'scb_ex_inner_dialog_cancel scb_s_gray_button\' aria-label=\'Cancel\' role=\'button\'>CANCEL</button><button class=\'scb_ex_inner_dialog_add scb_s_gray_button\' aria-label=\'Add Samples\' role=\'button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
