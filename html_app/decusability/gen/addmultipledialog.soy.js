// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof decusability == 'undefined') { var decusability = {}; }


decusability.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\' role=\'dialog\' aria-label=\'Add Samples\'><h1 class=\'scb_mit706s16_inner_dialog_title\' role=\'presentation\' aria-label=\'Add Samples\'><span class=\'scb_mit706s16_inner_dialog_title_close\' role=\'button\' aria-label=\'Close Add Samples\'>&#215;</span>Add Samples </h1><div class=\'scb_mit706s16_inner_dialog_body\'>');
  var cell_lineList4 = soy.$$getMapKeys(opt_data.template.ui.add_multiple_dialog);
  var cell_lineListLen4 = cell_lineList4.length;
  for (var cell_lineIndex4 = 0; cell_lineIndex4 < cell_lineListLen4; cell_lineIndex4++) {
    var cell_lineData4 = cell_lineList4[cell_lineIndex4];
    output.append((opt_data.template.ui.add_multiple_dialog[cell_lineData4].title) ? '<h1 role=\'heading\'>' + opt_data.template.ui.add_multiple_dialog[cell_lineData4].title + '</h1>' : '<h1 role=\'heading\'>' + soy.$$escapeHtml(opt_data.template.cell_lines[cell_lineData4].name) + '</h1>', '<table class="scb_s_experiment_setup_table" role=\'grid\' aria-label=\'', soy.$$escapeHtml(opt_data.template.cell_lines[cell_lineData4].name), '\'><thead class="scb_s_experiment_setup_table_head" >');
    var headingList18 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings;
    var headingListLen18 = headingList18.length;
    for (var headingIndex18 = 0; headingIndex18 < headingListLen18; headingIndex18++) {
      var headingData18 = headingList18[headingIndex18];
      output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(headingData18), '\' class=\'scb_s_experiment_setup_table_heading\'>', soy.$$escapeHtml(headingData18), '</td>');
    }
    output.append('</thead><tbody class="scb_s_experiment_setup_table_body" >');
    var rowsList26 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].rows;
    var rowsListLen26 = rowsList26.length;
    for (var rowsIndex26 = 0; rowsIndex26 < rowsListLen26; rowsIndex26++) {
      var rowsData26 = rowsList26[rowsIndex26];
      output.append('<tr role=\'row\' aria-label=\'Sample\'>');
      var cellList28 = rowsData26.cells;
      var cellListLen28 = cellList28.length;
      for (var cellIndex28 = 0; cellIndex28 < cellListLen28; cellIndex28++) {
        var cellData28 = cellList28[cellIndex28];
        output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData28.kind == 'text') ? soy.$$escapeHtml(cellData28.text) : '');
        if (cellData28.kind == 'select') {
          output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rowsData26.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\' role=\'select\'  cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\'><option disabled="disabled" role=\'option\'>Please select</option>');
          var keyList46 = soy.$$getMapKeys(opt_data.template[cellData28.field]);
          var keyListLen46 = keyList46.length;
          for (var keyIndex46 = 0; keyIndex46 < keyListLen46; keyIndex46++) {
            var keyData46 = keyList46[keyIndex46];
            output.append('<option role=\'option\' value=\'', soy.$$escapeHtml(opt_data.template[cellData28.field][keyData46]), '\'>', soy.$$escapeHtml(opt_data.template[cellData28.field][keyData46].name), '</option>');
          }
          output.append('</select>');
        }
        output.append((cellData28.kind == 'checkbox') ? '<input class=\'scb_f_experiment_setup_dialog_checkbox\' type="checkbox" role=\'checkbox\' name="' + soy.$$escapeHtml(cellData28.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(rowsData26.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\' aria-checked=\'false\'>' : '', '</td>');
      }
      output.append('</tr>');
      if (rowsIndex26 == rowsListLen26 - 1) {
        output.append('<tr role=\'row\' aria-label=\'Button\'>');
        var cellList73 = rowsData26.cells;
        var cellListLen73 = cellList73.length;
        for (var cellIndex73 = 0; cellIndex73 < cellListLen73; cellIndex73++) {
          var cellData73 = cellList73[cellIndex73];
          output.append('<td class=\'scb_s_experiment_setup_table_border\'>', (cellData73.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData73.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\' aria-label=\'Select All\' role=\'button\'>SELECT ALL</button>' : '', '</td>');
        }
        output.append('</tr>');
      }
    }
    output.append('</tr></tbody></table>');
  }
  output.append('<div class=\'scb_mit706s16_button_float\'><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button\' aria-label=\'Cancel\' role=\'button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button\' aria-label=\'Add Samples\' role=\'button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
