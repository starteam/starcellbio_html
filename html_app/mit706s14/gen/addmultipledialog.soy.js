// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof mit706s14 == 'undefined') { var mit706s14 = {}; }


mit706s14.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\'><h1 class=\'scb_mit706s16_inner_dialog_title\'><span class=\'scb_mit706s16_inner_dialog_title_close\'>&#215;</span>Add Samples </h1><div class=\'scb_mit706s16_inner_dialog_body\'>');
  var cell_lineList4 = soy.$$getMapKeys(opt_data.template.ui.add_multiple_dialog);
  var cell_lineListLen4 = cell_lineList4.length;
  for (var cell_lineIndex4 = 0; cell_lineIndex4 < cell_lineListLen4; cell_lineIndex4++) {
    var cell_lineData4 = cell_lineList4[cell_lineIndex4];
    output.append('<!--headings--><table class="scb_s_experiment_setup_table"><thead class="scb_s_experiment_setup_table_head">');
    var headingList6 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings;
    var headingListLen6 = headingList6.length;
    for (var headingIndex6 = 0; headingIndex6 < headingListLen6; headingIndex6++) {
      var headingData6 = headingList6[headingIndex6];
      output.append('<td class=\'scb_s_experiment_setup_table_heading\'>', soy.$$escapeHtml(headingData6), '</td>');
    }
    output.append('</thead><tbody class="scb_s_experiment_setup_table_body">');
    var rowsList12 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].rows;
    var rowsListLen12 = rowsList12.length;
    for (var rowsIndex12 = 0; rowsIndex12 < rowsListLen12; rowsIndex12++) {
      var rowsData12 = rowsList12[rowsIndex12];
      output.append('<tr>');
      var cellList14 = rowsData12.cells;
      var cellListLen14 = cellList14.length;
      for (var cellIndex14 = 0; cellIndex14 < cellListLen14; cellIndex14++) {
        var cellData14 = cellList14[cellIndex14];
        output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData14.kind == 'text') ? soy.$$escapeHtml(cellData14.text) : '');
        if (cellData14.kind == 'select') {
          output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(cellData14.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\'><option disabled="disabled">Please select</option>');
          var keyList32 = soy.$$getMapKeys(opt_data.template[cellData14.field]);
          var keyListLen32 = keyList32.length;
          for (var keyIndex32 = 0; keyIndex32 < keyListLen32; keyIndex32++) {
            var keyData32 = keyList32[keyIndex32];
            output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData14.field][keyData32]), '\'>', soy.$$escapeHtml(opt_data.template[cellData14.field][keyData32].name), '</option>');
          }
          output.append('</select>');
        }
        output.append((cellData14.kind == 'checkbox') ? '<input type="checkbox" name="' + soy.$$escapeHtml(cellData14.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(cellData14.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\'>' : '', '</td>');
      }
      output.append('</tr>');
      if (rowsIndex12 == rowsListLen12 - 1) {
        output.append('<tr>');
        var cellList59 = rowsData12.cells;
        var cellListLen59 = cellList59.length;
        for (var cellIndex59 = 0; cellIndex59 < cellListLen59; cellIndex59++) {
          var cellData59 = cellList59[cellIndex59];
          output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData59.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData59.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\'>SELECT ALL</button>' : '', '</td>');
        }
        output.append('</tr>');
      }
    }
    output.append('<!--            <tr><td colspan=\'', soy.$$escapeHtml(opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings.length), '\'><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD MULTIPLE TREATMENTS</button></td>-->            </tr></tbody></table>');
  }
  output.append('<!--<button class=\'scb_mit706s16_inner_dialog_select_all scb_s_gray_button\'>SELECT ALL</button><br>--><div class=\'scb_mit706s16_button_float\'><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
