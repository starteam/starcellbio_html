// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof scb_mit706s16 == 'undefined') { var scb_mit706s16 = {}; }


scb_mit706s16.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\'><h1 class=\'scb_mit706s16_inner_dialog_title\'><span class=\'scb_mit706s16_inner_dialog_title_close\'>X</span>Add multiple rows </h1><div class=\'scb_mit706s16_inner_dialog_body\'>');
  var cell_lineList4 = soy.$$getMapKeys(opt_data.template.ui.add_multiple_dialog);
  var cell_lineListLen4 = cell_lineList4.length;
  for (var cell_lineIndex4 = 0; cell_lineIndex4 < cell_lineListLen4; cell_lineIndex4++) {
    var cell_lineData4 = cell_lineList4[cell_lineIndex4];
    output.append((opt_data.template.ui.add_multiple_dialog[cell_lineData4].title) ? '<h1>' + soy.$$escapeHtml(opt_data.template.ui.add_multiple_dialog[cell_lineData4].title) + '</h1>' : '<h1>' + soy.$$escapeHtml(opt_data.template.cell_lines[cell_lineData4].name) + '</h1>', '<table class="scb_s_experiment_setup_table"><thead class="scb_s_experiment_setup_table_head">');
    var headingList15 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings;
    var headingListLen15 = headingList15.length;
    for (var headingIndex15 = 0; headingIndex15 < headingListLen15; headingIndex15++) {
      var headingData15 = headingList15[headingIndex15];
      output.append('<td class=\'scb_s_experiment_setup_table_heading\'>', soy.$$escapeHtml(headingData15), '</td>');
    }
    output.append('</thead><tbody class="scb_s_experiment_setup_table_body">');
    var rowsList21 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].rows;
    var rowsListLen21 = rowsList21.length;
    for (var rowsIndex21 = 0; rowsIndex21 < rowsListLen21; rowsIndex21++) {
      var rowsData21 = rowsList21[rowsIndex21];
      output.append('<tr>');
      var cellList23 = rowsData21.cells;
      var cellListLen23 = cellList23.length;
      for (var cellIndex23 = 0; cellIndex23 < cellListLen23; cellIndex23++) {
        var cellData23 = cellList23[cellIndex23];
        output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData23.kind == 'text') ? soy.$$escapeHtml(cellData23.text) : '');
        if (cellData23.kind == 'select') {
          output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rowsData21.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\'><option disabled="disabled">Please select</option>');
          var keyList41 = soy.$$getMapKeys(opt_data.template[cellData23.field]);
          var keyListLen41 = keyList41.length;
          for (var keyIndex41 = 0; keyIndex41 < keyListLen41; keyIndex41++) {
            var keyData41 = keyList41[keyIndex41];
            output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData23.field][keyData41]), '\'>', soy.$$escapeHtml(opt_data.template[cellData23.field][keyData41].name), '</option>');
          }
          output.append('</select>');
        }
        output.append((cellData23.kind == 'checkbox') ? '<input type="checkbox" name="' + soy.$$escapeHtml(cellData23.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(rowsData21.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\'>' : '', '</td>');
      }
      output.append('</tr>');
    }
    output.append('<!--            <tr><td colspan=\'', soy.$$escapeHtml(opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings.length), '\'><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD MULTIPLE TREATMENTS</button></td>-->            </tr></tbody></table>');
  }
  output.append('<button class=\'scb_mit706s16_inner_dialog_select_all scb_s_gray_button\'>SELECT ALL</button><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD MULTIPLE TREATMENTS</button></div></div>');
  return opt_sb ? '' : output.toString();
};
