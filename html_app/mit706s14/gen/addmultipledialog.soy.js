// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof mit706s14 == 'undefined') { var mit706s14 = {}; }


mit706s14.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\'><h1 class=\'scb_mit706s16_inner_dialog_title\'><span class=\'scb_mit706s16_inner_dialog_title_close\'>&#215;</span>Add Samples </h1><div class=\'scb_mit706s16_inner_dialog_body\'><!--headings--><table class="scb_s_experiment_setup_table"><thead class="scb_s_experiment_setup_table_head">');
  var headingList4 = opt_data.template.ui.add_multiple_dialog.headings;
  var headingListLen4 = headingList4.length;
  for (var headingIndex4 = 0; headingIndex4 < headingListLen4; headingIndex4++) {
    var headingData4 = headingList4[headingIndex4];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\'>', soy.$$escapeHtml(headingData4), '</td>');
  }
  output.append('</thead>');
  var cell_lineList10 = soy.$$getMapKeys(opt_data.template.ui.add_multiple_dialog);
  var cell_lineListLen10 = cell_lineList10.length;
  for (var cell_lineIndex10 = 0; cell_lineIndex10 < cell_lineListLen10; cell_lineIndex10++) {
    var cell_lineData10 = cell_lineList10[cell_lineIndex10];
    if (cell_lineData10 == 'headings') {
    } else {
      output.append('<tbody class="scb_s_experiment_setup_table_body">');
      var rowsList15 = opt_data.template.ui.add_multiple_dialog[cell_lineData10].rows;
      var rowsListLen15 = rowsList15.length;
      for (var rowsIndex15 = 0; rowsIndex15 < rowsListLen15; rowsIndex15++) {
        var rowsData15 = rowsList15[rowsIndex15];
        output.append('<tr>');
        var cellList17 = rowsData15.cells;
        var cellListLen17 = cellList17.length;
        for (var cellIndex17 = 0; cellIndex17 < cellListLen17; cellIndex17++) {
          var cellData17 = cellList17[cellIndex17];
          output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData17.kind == 'text') ? soy.$$escapeHtml(cellData17.text) : '');
          if (cellData17.kind == 'select') {
            output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(cellData17.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData10), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData10), '\'><option disabled="disabled">Please select</option>');
            var keyList35 = soy.$$getMapKeys(opt_data.template[cellData17.field]);
            var keyListLen35 = keyList35.length;
            for (var keyIndex35 = 0; keyIndex35 < keyListLen35; keyIndex35++) {
              var keyData35 = keyList35[keyIndex35];
              output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData17.field][keyData35]), '\'>', soy.$$escapeHtml(opt_data.template[cellData17.field][keyData35].name), '</option>');
            }
            output.append('</select>');
          }
          output.append((cellData17.kind == 'checkbox') ? '<input type="checkbox" name="' + soy.$$escapeHtml(cellData17.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(cellData17.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData10) + '\'>' : '', '</td>');
        }
        output.append('</tr>');
        if (cell_lineIndex10 == cell_lineListLen10 - 1) {
          output.append('<tr>');
          var cellList62 = rowsData15.cells;
          var cellListLen62 = cellList62.length;
          for (var cellIndex62 = 0; cellIndex62 < cellListLen62; cellIndex62++) {
            var cellData62 = cellList62[cellIndex62];
            output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData62.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData62.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData10) + '\'>SELECT ALL</button>' : '', '</td>');
          }
          output.append('</tr>');
        }
      }
      output.append('<!--            <tr><td colspan=\'', soy.$$escapeHtml(opt_data.template.ui.add_multiple_dialog.headings.length), '\'><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD MULTIPLE TREATMENTS</button></td>-->            </tr></tbody>');
    }
  }
  output.append('</table><!--<button class=\'scb_mit706s16_inner_dialog_select_all scb_s_gray_button\'>SELECT ALL</button><br>--><div class=\'scb_mit706s16_button_float\'><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
