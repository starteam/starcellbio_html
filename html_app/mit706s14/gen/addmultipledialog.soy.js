// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof mit706s14 == 'undefined') { var mit706s14 = {}; }


mit706s14.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\'><h1 class=\'scb_mit706s16_inner_dialog_title\'><span class=\'scb_mit706s16_inner_dialog_title_close\'>&#215;</span>Add Samples </h1><div class=\'scb_mit706s16_inner_dialog_body\'><!--headings--><table class="scb_s_experiment_setup_table scb_s_experiment_setup_special"><thead class="scb_s_experiment_setup_table_head">');
  var headingList4 = opt_data.template.ui.add_multiple_dialog.headings;
  var headingListLen4 = headingList4.length;
  for (var headingIndex4 = 0; headingIndex4 < headingListLen4; headingIndex4++) {
    var headingData4 = headingList4[headingIndex4];
    output.append('<td class="scb_s_experiment_setup_table_heading ', (headingData4 == 'Strain') ? 'scb_s_experiment_setup_table_heading_strain' : '', '" >', soy.$$escapeHtml(headingData4), '</td>');
  }
  output.append('</thead>');
  var cell_lineList14 = opt_data.template.ui.add_multiple_dialog.order;
  var cell_lineListLen14 = cell_lineList14.length;
  for (var cell_lineIndex14 = 0; cell_lineIndex14 < cell_lineListLen14; cell_lineIndex14++) {
    var cell_lineData14 = cell_lineList14[cell_lineIndex14];
    if (cell_lineData14 == 'headings' || cell_lineData14 == 'order') {
    } else {
      output.append('<tbody class="scb_s_experiment_setup_table_body">');
      var rowsList19 = opt_data.template.ui.add_multiple_dialog[cell_lineData14].rows;
      var rowsListLen19 = rowsList19.length;
      for (var rowsIndex19 = 0; rowsIndex19 < rowsListLen19; rowsIndex19++) {
        var rowsData19 = rowsList19[rowsIndex19];
        output.append('<tr>');
        var cellList21 = rowsData19.cells;
        var cellListLen21 = cellList21.length;
        for (var cellIndex21 = 0; cellIndex21 < cellListLen21; cellIndex21++) {
          var cellData21 = cellList21[cellIndex21];
          output.append('<td class="scb_s_experiment_setup_table_border ', (cellData21.kind == 'checkbox') ? 'scb_s_experiment_setup_center_cell ' : '', '">', (cellData21.kind == 'text') ? soy.$$escapeHtml(cellData21.text) : '');
          if (cellData21.kind == 'select') {
            output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(cellData21.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData14), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData14), '\'><option disabled="disabled">Please select</option>');
            var keyList43 = soy.$$getMapKeys(opt_data.template[cellData21.field]);
            var keyListLen43 = keyList43.length;
            for (var keyIndex43 = 0; keyIndex43 < keyListLen43; keyIndex43++) {
              var keyData43 = keyList43[keyIndex43];
              output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData21.field][keyData43]), '\'>', soy.$$escapeHtml(opt_data.template[cellData21.field][keyData43].name), '</option>');
            }
            output.append('</select>');
          }
          output.append((cellData21.kind == 'checkbox') ? '<input type="checkbox" name="' + soy.$$escapeHtml(cellData21.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(cellData21.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData14) + '\'>' : '', '</td>');
        }
        output.append('</tr>');
        if (cell_lineIndex14 == cell_lineListLen14 - 1) {
          output.append('<tr>');
          var cellList70 = rowsData19.cells;
          var cellListLen70 = cellList70.length;
          for (var cellIndex70 = 0; cellIndex70 < cellListLen70; cellIndex70++) {
            var cellData70 = cellList70[cellIndex70];
            output.append('<td class=\'scb_s_experiment_setup_table_border scb_s_experiment_setup_center_cell\'>', (cellData70.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData70.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData14) + '\' aria-label=\'Select All\' role=\'button\'>SELECT ALL</button>' : '', '</td>');
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
