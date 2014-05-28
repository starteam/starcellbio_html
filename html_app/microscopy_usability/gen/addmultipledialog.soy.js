// This file was automatically generated from addmultipledialog.soy.
// Please don't edit this file by hand.

if (typeof microscopy_usability == 'undefined') { var microscopy_usability = {}; }


microscopy_usability.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_mit706s16_inner_dialog\' role=\'dialog\' aria-label=\'Add Samples\'><h1 class=\'scb_mit706s16_inner_dialog_title\' role=\'presentation\' aria-label=\'Add Samples\'><span class=\'scb_mit706s16_inner_dialog_title_close\' role=\'button\' aria-label=\'Close Add Samples\'>&#215;</span>Add Samples </h1><div class=\'scb_mit706s16_inner_dialog_body\'><table class="scb_s_experiment_setup_table scb_s_experiment_setup_microscopy_usability" role=\'grid\' ><thead class="scb_s_experiment_setup_table_head" >');
  var headingList4 = opt_data.template.ui.add_multiple_dialog.headings;
  var headingListLen4 = headingList4.length;
  for (var headingIndex4 = 0; headingIndex4 < headingListLen4; headingIndex4++) {
    var headingData4 = headingList4[headingIndex4];
    output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(headingData4), '\' class="scb_s_experiment_setup_table_heading ', (headingData4 == 'Strain') ? 'scb_s_experiment_setup_table_heading_strain' : '', ' ', (headingData4 == '') ? 'scb_s_experiment_setup_table_heading_checkbox' : '', '" >', soy.$$escapeHtml(headingData4), '</td>');
  }
  output.append('</thead>');
  var cell_lineList20 = opt_data.template.ui.add_multiple_dialog.order;
  var cell_lineListLen20 = cell_lineList20.length;
  for (var cell_lineIndex20 = 0; cell_lineIndex20 < cell_lineListLen20; cell_lineIndex20++) {
    var cell_lineData20 = cell_lineList20[cell_lineIndex20];
    if (cell_lineData20 == 'headings' || cell_lineData20 == 'order') {
    } else {
      output.append('<tbody class="scb_s_experiment_setup_table_body">');
      var rowsList25 = opt_data.template.ui.add_multiple_dialog[cell_lineData20].rows;
      var rowsListLen25 = rowsList25.length;
      for (var rowsIndex25 = 0; rowsIndex25 < rowsListLen25; rowsIndex25++) {
        var rowsData25 = rowsList25[rowsIndex25];
        output.append('<tr role=\'row\' aria-label=\'Sample\'>');
        var cellList27 = rowsData25.cells;
        var cellListLen27 = cellList27.length;
        for (var cellIndex27 = 0; cellIndex27 < cellListLen27; cellIndex27++) {
          var cellData27 = cellList27[cellIndex27];
          output.append('<td class="scb_s_experiment_setup_table_border ', (cellData27.kind == 'checkbox') ? 'scb_s_microscopy_usability_checkbox ' : '', '" style="padding-right: 50px;">', (cellData27.kind == 'text') ? soy.$$escapeHtml(cellData27.text) : '');
          if (cellData27.kind == 'select') {
            output.append('HERE GOES SELECT<select assignment=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(cellData27.treatment_id), '\' cell_line=\'', soy.$$escapeHtml(cell_lineData20), '\' role=\'select\'  cell_line=\'', soy.$$escapeHtml(cell_lineData20), '\'><option disabled="disabled" role=\'option\'>Please select</option>');
            var keyList49 = soy.$$getMapKeys(opt_data.template[cellData27.field]);
            var keyListLen49 = keyList49.length;
            for (var keyIndex49 = 0; keyIndex49 < keyListLen49; keyIndex49++) {
              var keyData49 = keyList49[keyIndex49];
              output.append('<option  role=\'option\' value=\'', soy.$$escapeHtml(opt_data.template[cellData27.field][keyData49]), '\'>', soy.$$escapeHtml(opt_data.template[cellData27.field][keyData49].name), '</option>');
            }
            output.append('</select>');
          }
          output.append((cellData27.kind == 'checkbox') ? '<input class=\'scb_f_experiment_setup_dialog_checkbox \' type="checkbox"  role=\'checkbox\'  name="' + soy.$$escapeHtml(cellData27.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' treatment_id=\'' + soy.$$escapeHtml(cellData27.treatment_id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData20) + '\' aria-checked=\'false\'>' : '', '</td>');
        }
        output.append('</tr><!--');
        if (cell_lineIndex20 == cell_lineListLen20 - 1) {
          output.append('<tr role=\'row\' aria-label=\'Button\'>');
          var cellList76 = rowsData25.cells;
          var cellListLen76 = cellList76.length;
          for (var cellIndex76 = 0; cellIndex76 < cellListLen76; cellIndex76++) {
            var cellData76 = cellList76[cellIndex76];
            output.append('<td class=\'scb_s_experiment_setup_table_border scb_s_experiment_setup_center_cell\'>', (cellData76.kind == 'checkbox') ? '<button class=\'scb_s_gray_button scb_mit706s16_inner_dialog_select\' name="' + soy.$$escapeHtml(cellData76.name) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' cell_line=\'' + soy.$$escapeHtml(cell_lineData20) + '\' aria-label=\'Select All\' role=\'button\'>SELECT ALL</button>' : '', '</td>');
          }
          output.append('</tr>');
        }
        output.append('-->');
      }
      output.append('</tr></tbody>');
    }
  }
  output.append('</table><button class=\'scb_mit706s16_inner_dialog_select_all scb_s_gray_button\' aria-label=\'Select All\' role=\'button\'>SELECT ALL</button><br><div class=\'scb_mit706s16_button_float\'><button class=\'scb_mit706s16_inner_dialog_cancel scb_s_gray_button scb_s_microscopy_usability_cancel\' aria-label=\'Cancel\' role=\'button\'>CANCEL</button><button class=\'scb_mit706s16_inner_dialog_add scb_s_gray_button scb_s_microscopy_usability_samples\' aria-label=\'Add Samples\' role=\'button\'>ADD SAMPLES</button></div></div></div>');
  return opt_sb ? '' : output.toString();
};
