// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof mit706s14 == 'undefined') { var mit706s14 = {}; }


mit706s14.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\' role=\'dialog\' aria-label=\'Add Samples\'><h1 class=\'scb_mit706s16_inner_dialog_title\' role=\'presentation\' aria-label=\'Add Samples\'><span class=\'scb_mit706s16_inner_dialog_title_close\' role=\'button\' aria-label=\'Close Add Samples\'>&#215;</span>Add Samples </h1><div class=\'scb_mit706s16_inner_dialog_body\'><table class="scb_s_experiment_setup_table scb_s_experiment_setup_special" role=\'grid\' ><thead class="scb_s_experiment_setup_table_head" >');
  var headingList4 = opt_data.template.ui.add_multiple_dialog.headings;
  var headingListLen4 = headingList4.length;
  for (var headingIndex4 = 0; headingIndex4 < headingListLen4; headingIndex4++) {
    var headingData4 = headingList4[headingIndex4];
    output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(headingData4), '\' class="scb_s_experiment_setup_table_heading ', (headingData4 == 'Strain') ? 'scb_s_experiment_setup_table_heading_strain' : '', '" >', soy.$$escapeHtml(headingData4), '</td>');
  }
  output.append('</thead>');
  var cell_lineList16 = opt_data.template.ui.add_multiple_dialog.order;
  var cell_lineListLen16 = cell_lineList16.length;
  for (var cell_lineIndex16 = 0; cell_lineIndex16 < cell_lineListLen16; cell_lineIndex16++) {
    var cell_lineData16 = cell_lineList16[cell_lineIndex16];
    if (cell_lineData16 == 'headings' || cell_lineData16 == 'order') {
    } else {
      output.append('<tbody class="scb_s_experiment_setup_table_body">');
      var rowsList21 = opt_data.template.ui.add_multiple_dialog[cell_lineData16].rows;
      var rowsListLen21 = rowsList21.length;
      for (var rowsIndex21 = 0; rowsIndex21 < rowsListLen21; rowsIndex21++) {
        var rowsData21 = rowsList21[rowsIndex21];
        output.append('<tr role=\'row\' aria-label=\'Sample\'>');
        var cellList23 = rowsData21.cells;
        var cellListLen23 = cellList23.length;
        for (var cellIndex23 = 0; cellIndex23 < cellListLen23; cellIndex23++) {
          var cellData23 = cellList23[cellIndex23];
          output.append('<td class="scb_s_experiment_setup_table_border ', (cellData23.kind == 'checkbox') ? 'scb_s_experiment_setup_center_cell ' : '', '">', (cellData23.kind == 'text') ? soy.$$escapeHtml(cellData23.text) : '');
          if (cellData23.kind == 'select') {
            output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(cellData23.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData16), '\' role=\'listbox\'  cell_line=\'', soy.$$escapeHtml(cell_lineData16), '\'><option disabled="disabled">Please select</option>');
            var keyList45 = soy.$$getMapKeys(opt_data.template[cellData23.field]);
            var keyListLen45 = keyList45.length;
            for (var keyIndex45 = 0; keyIndex45 < keyListLen45; keyIndex45++) {
              var keyData45 = keyList45[keyIndex45];
              output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData23.field][keyData45]), '\'>', soy.$$escapeHtml(opt_data.template[cellData23.field][keyData45].name), '</option>');
            }
            output.append('</select>');
          }
          output.append((cellData23.kind == 'checkbox') ? '<input class=\'scb_f_experiment_setup_dialog_checkbox\' type="checkbox"  role=\'checkbox\'  name="' + soy.$$escapeHtml(cellData23.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(cellData23.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData16) + '\' aria-checked=\'false\'>' : '', '</td>');
        }
        output.append('</tr>');
        if (cell_lineIndex16 == cell_lineListLen16 - 1) {
          output.append('<tr role=\'row\' aria-label=\'Button\'>');
          var cellList72 = rowsData21.cells;
          var cellListLen72 = cellList72.length;
          for (var cellIndex72 = 0; cellIndex72 < cellListLen72; cellIndex72++) {
            var cellData72 = cellList72[cellIndex72];
            output.append('<td class=\'scb_s_experiment_setup_table_border scb_s_experiment_setup_center_cell\'>', (cellData72.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData72.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData16) + '\' aria-label=\'Select All\' role=\'button\'>SELECT ALL</button>' : '', '</td>');
          }
          output.append('</tr>');
        }
      }
      output.append('</tr></tbody>');
    }
  }
  output.append('</table><div class=\'scb_mit706s16_button_float\'><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button scb_s_2014_cancel\' aria-label=\'Cancel\' role=\'button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button scb_s_2014_samples\' aria-label=\'Add Samples\' role=\'button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
