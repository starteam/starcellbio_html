// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof scb_mit706s16 == 'undefined') { var scb_mit706s16 = {}; }


scb_mit706s16.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\'><h1 class=\'scb_mit706s16_inner_dialog_title\'><span class=\'scb_mit706s16_inner_dialog_title_close\'>&#215;</span>Add multiple rows </h1><div class=\'scb_mit706s16_inner_dialog_body\'>');
  var cell_lineList4 = soy.$$getMapKeys(opt_data.template.ui.add_multiple_dialog);
  var cell_lineListLen4 = cell_lineList4.length;
  for (var cell_lineIndex4 = 0; cell_lineIndex4 < cell_lineListLen4; cell_lineIndex4++) {
    var cell_lineData4 = cell_lineList4[cell_lineIndex4];
    output.append((opt_data.template.ui.add_multiple_dialog[cell_lineData4].title) ? '<h1>' + opt_data.template.ui.add_multiple_dialog[cell_lineData4].title + '</h1>' : '<h1>' + soy.$$escapeHtml(opt_data.template.cell_lines[cell_lineData4].name) + '</h1>', '<table class="scb_s_experiment_setup_table"><thead class="scb_s_experiment_setup_table_head">');
    var headingList16 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings;
    var headingListLen16 = headingList16.length;
    for (var headingIndex16 = 0; headingIndex16 < headingListLen16; headingIndex16++) {
      var headingData16 = headingList16[headingIndex16];
      output.append('<td class=\'scb_s_experiment_setup_table_heading\'>', soy.$$escapeHtml(headingData16), '</td>');
    }
    output.append('</thead><tbody class="scb_s_experiment_setup_table_body">');
    var rowsList22 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].rows;
    var rowsListLen22 = rowsList22.length;
    for (var rowsIndex22 = 0; rowsIndex22 < rowsListLen22; rowsIndex22++) {
      var rowsData22 = rowsList22[rowsIndex22];
      output.append('<tr>');
      var cellList24 = rowsData22.cells;
      var cellListLen24 = cellList24.length;
      for (var cellIndex24 = 0; cellIndex24 < cellListLen24; cellIndex24++) {
        var cellData24 = cellList24[cellIndex24];
        output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData24.kind == 'text') ? soy.$$escapeHtml(cellData24.text) : '');
        if (cellData24.kind == 'select') {
          output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rowsData22.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\'><option disabled="disabled">Please select</option>');
          var keyList42 = soy.$$getMapKeys(opt_data.template[cellData24.field]);
          var keyListLen42 = keyList42.length;
          for (var keyIndex42 = 0; keyIndex42 < keyListLen42; keyIndex42++) {
            var keyData42 = keyList42[keyIndex42];
            output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData24.field][keyData42]), '\'>', soy.$$escapeHtml(opt_data.template[cellData24.field][keyData42].name), '</option>');
          }
          output.append('</select>');
        }
        output.append((cellData24.kind == 'checkbox') ? '<input type="checkbox" name="' + soy.$$escapeHtml(cellData24.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(rowsData22.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\'>' : '', '</td>');
      }
      output.append('</tr>');
      if (rowsIndex22 == rowsListLen22 - 1) {
        output.append('<tr>');
        var cellList69 = rowsData22.cells;
        var cellListLen69 = cellList69.length;
        for (var cellIndex69 = 0; cellIndex69 < cellListLen69; cellIndex69++) {
          var cellData69 = cellList69[cellIndex69];
          output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData69.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData69.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\'>SELECT ALL</button>' : '', '</td>');
        }
        output.append('</tr>');
      }
    }
    output.append('<!--            <tr><td colspan=\'', soy.$$escapeHtml(opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings.length), '\'><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD MULTIPLE TREATMENTS</button></td>-->            </tr></tbody></table>');
  }
  output.append('<!--<button class=\'scb_mit706s16_inner_dialog_select_all scb_s_gray_button\'>SELECT ALL</button><br>--><div class=\'scb_mit706s16_button_float\'><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
