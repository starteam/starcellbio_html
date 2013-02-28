// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof scb_mit706s16 == 'undefined') { var scb_mit706s16 = {}; }


scb_mit706s16.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\'><h1 class=\'scb_mit706s16_inner_dialog_title\'> Add multiple treatments </h1><div class=\'scb_mit706s16_inner_dialog_body\'>');
  var cell_lineList4 = soy.$$getMapKeys(opt_data.template.ui.add_multiple_dialog);
  var cell_lineListLen4 = cell_lineList4.length;
  for (var cell_lineIndex4 = 0; cell_lineIndex4 < cell_lineListLen4; cell_lineIndex4++) {
    var cell_lineData4 = cell_lineList4[cell_lineIndex4];
    output.append('<h1>', soy.$$escapeHtml(opt_data.template.cell_lines[cell_lineData4].name), '</h1><table><thead>');
    var headingList8 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].headings;
    var headingListLen8 = headingList8.length;
    for (var headingIndex8 = 0; headingIndex8 < headingListLen8; headingIndex8++) {
      var headingData8 = headingList8[headingIndex8];
      output.append('<td>', soy.$$escapeHtml(headingData8), '</td>');
    }
    output.append('</thead>');
    var rowsList14 = opt_data.template.ui.add_multiple_dialog[cell_lineData4].rows;
    var rowsListLen14 = rowsList14.length;
    for (var rowsIndex14 = 0; rowsIndex14 < rowsListLen14; rowsIndex14++) {
      var rowsData14 = rowsList14[rowsIndex14];
      output.append('<tr>');
      var cellList16 = rowsData14.cells;
      var cellListLen16 = cellList16.length;
      for (var cellIndex16 = 0; cellIndex16 < cellListLen16; cellIndex16++) {
        var cellData16 = cellList16[cellIndex16];
        output.append('<td>', (cellData16.kind == 'text') ? soy.$$escapeHtml(cellData16.text) : '');
        if (cellData16.kind == 'select') {
          output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rowsData14.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData4), '\'><option disabled="disabled">Please select</option>');
          var keyList34 = soy.$$getMapKeys(opt_data.template[cellData16.field]);
          var keyListLen34 = keyList34.length;
          for (var keyIndex34 = 0; keyIndex34 < keyListLen34; keyIndex34++) {
            var keyData34 = keyList34[keyIndex34];
            output.append('<option value=\'', soy.$$escapeHtml(opt_data.template[cellData16.field][keyData34]), '\'>', soy.$$escapeHtml(opt_data.template[cellData16.field][keyData34].name), '</option>');
          }
          output.append('</select>');
        }
        output.append((cellData16.kind == 'checkbox') ? '<input type="checkbox" name="' + soy.$$escapeHtml(cellData16.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(rowsData14.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData4) + '\'>' : '', '</td>');
      }
      output.append('</tr>');
    }
    output.append('</table>');
  }
  output.append('<button class=\'scb_mit706s16_inner_dialog_cancel\'>Cancel</button><button class=\'scb_mit706s16_inner_dialog_add\'>Add treatments</button></div></div>');
  return opt_sb ? '' : output.toString();
};
