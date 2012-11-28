// This file was automatically generated from facs.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.display_facs_list = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\tHello World, here we display facs list and we will add \'Add facs button\'<ul>');
  var laneList4 = opt_data.facs_list.list;
  var laneListLen4 = laneList4.length;
  for (var laneIndex4 = 0; laneIndex4 < laneListLen4; laneIndex4++) {
    var laneData4 = laneList4[laneIndex4];
    output.append('<li><a href=\'#\' class=\'select_facs_experiment\' model_id=\'', soy.$$escapeHtml(laneData4.id), '\'> ', soy.$$escapeHtml(laneData4.name), '</a></li>');
  }
  output.append('</ul><a href="#" class=\'new_facs button green\'>Add FACS experiment</a>');
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  if (opt_data.facs.prepared) {
    scb_ui.display_facs_finished(opt_data, output);
  } else {
    scb_ui.display_facs_setup(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs_finished = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\tFACS: ', soy.$$escapeHtml(opt_data.facs.name), '<br>');
  var rowList30 = opt_data.facs_lanes;
  var rowListLen30 = rowList30.length;
  for (var rowIndex30 = 0; rowIndex30 < rowListLen30; rowIndex30++) {
    var rowData30 = rowList30[rowIndex30];
    if (rowData30.enabled) {
      if (rowData30.preparation_list.length != 0) {
        var preparationList35 = rowData30.preparation_list.list;
        var preparationListLen35 = preparationList35.length;
        for (var preparationIndex35 = 0; preparationIndex35 < preparationListLen35; preparationIndex35++) {
          var preparationData35 = preparationList35[preparationIndex35];
          scb_ui.experiment_setup_row({row: rowData30.cell_treatment, template: opt_data.template, selected_experiment: rowData30.experiment}, output);
          output.append(soy.$$escapeHtml(rowData30.collection_schedule.schedule), soy.$$escapeHtml(preparationData35.kind), soy.$$escapeHtml(preparationData35.treatment), soy.$$escapeHtml(preparationData35.sub_treatment), '<br>Chart:<br>');
          scb_ui.display_facs_chart({row: rowData30, template: opt_data.template, preparation: preparationData35}, output);
          output.append('<br>');
        }
      }
    }
  }
  output.append('is_prepared: ', soy.$$escapeHtml(opt_data.facs.prepared));
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\tFACS: ', soy.$$escapeHtml(opt_data.facs.name), '<br><table><tr><th><input type=\'checkbox\' class=\'facs_lane_select_all\' ', (opt_data.all_selected) ? 'checked=\'checked\'' : '', '/></th><th>Sample</th><th>Collection time</th><th>Fixed?</th><th>Treatments</th><th>(A)</th></tr>');
  var rowList62 = opt_data.facs_lanes;
  var rowListLen62 = rowList62.length;
  for (var rowIndex62 = 0; rowIndex62 < rowListLen62; rowIndex62++) {
    var rowData62 = rowList62[rowIndex62];
    if (rowData62.enabled) {
      if (rowData62.preparation_list.length != 0) {
        var preparationList67 = rowData62.preparation_list.list;
        var preparationListLen67 = preparationList67.length;
        for (var preparationIndex67 = 0; preparationIndex67 < preparationListLen67; preparationIndex67++) {
          var preparationData67 = preparationList67[preparationIndex67];
          output.append('<tr class=\'', (rowIndex62 % 2 == 0) ? 'even1' : 'odd1', '\'>');
          if (preparationIndex67 == 0) {
            scb_ui.display_facs_common_row({row: rowData62, template: opt_data.template, height: rowData62.preparation_list.length + 1}, output);
          }
          output.append('<td>');
          if (rowData62.enabled) {
            scb_ui.display_facs_fix_select({row: rowData62, template: opt_data.template, selected_experiment: rowData62.experiment, preparation: preparationData67}, output);
          }
          output.append('</td><td>');
          if (rowData62.enabled) {
            scb_ui.display_facs_select1({row: rowData62, preparation: preparationData67, template: opt_data.template}, output);
            output.append('on selected kind show dropdown');
          }
          output.append('</td><td><button class=\'facs_remove_preparataion button small red\' data-row=\'', soy.$$escapeHtml(rowData62.id), '\' data-preparation=\'', soy.$$escapeHtml(preparationData67.id), '\'>X</button></td></tr>');
        }
        output.append('<tr class=\'', (rowIndex62 % 2 == 0) ? 'even1' : 'odd1', '\'><td>');
        scb_ui.display_facs_fix_select({row: rowData62, template: opt_data.template, selected_experiment: rowData62.experiment}, output);
        output.append('</td><td>', (rowData62.enabled) ? 'on selected kind show dropdown' : '', '</td><td></td></tr>');
      } else {
        output.append('<tr class=\'', (rowIndex62 % 2 == 0) ? 'even1' : 'odd1', '\'>');
        scb_ui.display_facs_common_row({row: rowData62, template: opt_data.template, height: 1}, output);
        output.append('<td>');
        if (rowData62.enabled) {
          scb_ui.display_facs_fix_select({row: rowData62, template: opt_data.template, selected_experiment: rowData62.experiment}, output);
        }
        output.append('</td><td></td><td></td></tr>');
      }
    } else {
      output.append('<tr class=\'', (rowIndex62 % 2 == 0) ? 'even1' : 'odd1', '\'>');
      scb_ui.display_facs_common_row({row: rowData62, template: opt_data.template, height: 1}, output);
      output.append('<td></td><td></td><td></td></tr>');
    }
  }
  output.append('</table><button class=\'facs_finish_sample_prep buttom medium green\'>Prepare samples</button>');
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs_fix_select = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<input type=\'radio\' id=\'kind_live_', soy.$$escapeHtml(opt_data.row.id), '_', (opt_data.preparation) ? soy.$$escapeHtml(opt_data.preparation.id) : '', '\' data-row=\'', soy.$$escapeHtml(opt_data.row.id), '\' enabled=\'', soy.$$escapeHtml(opt_data.row.enabled), '\' ', (opt_data.preparation) ? 'data-preparation=\'' + soy.$$escapeHtml(opt_data.preparation.id) + '\' ' + ((opt_data.preparation.kind == 'live') ? 'checked=\'checked\'' : '') + ' ' : '', ' name=\'kind_', soy.$$escapeHtml(opt_data.row.id), '_', (opt_data.preparation) ? soy.$$escapeHtml(opt_data.preparation.id) : '', '\' value=\'live\' class=\'facs_kind_radio\' /><label for=\'kind_live_', soy.$$escapeHtml(opt_data.row.id), '\'>Live</label><br><input type=\'radio\' id=\'kind_fixed_', soy.$$escapeHtml(opt_data.row.id), '_', (opt_data.preparation) ? soy.$$escapeHtml(opt_data.preparation.id) : '', '\' data-row=\'', soy.$$escapeHtml(opt_data.row.id), '\' enabled=\'', soy.$$escapeHtml(opt_data.row.enabled), '\' ', (opt_data.preparation) ? 'data-preparation=\'' + soy.$$escapeHtml(opt_data.preparation.id) + '\' ' + ((opt_data.preparation.kind == 'fixed') ? 'checked=\'checked\'' : '') : '', ' name=\'kind_', soy.$$escapeHtml(opt_data.row.id), '_', (opt_data.preparation) ? soy.$$escapeHtml(opt_data.preparation.id) : '', '\' value=\'fixed\' class=\'facs_kind_radio\'/><label for=\'kind_fixed_', soy.$$escapeHtml(opt_data.row.id), '\'>Fixed</label>');
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs_common_row = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<td rowspan=\'', soy.$$escapeHtml(opt_data.height), '\'><input type=\'checkbox\' class=\'facs_lane_select\' id=\'', soy.$$escapeHtml(opt_data.row.id), '\' ', (opt_data.row.enabled) ? 'checked=\'checked\'' : '', '/></td><td rowspan=\'', soy.$$escapeHtml(opt_data.height), '\'>');
  scb_ui.experiment_setup_row({row: opt_data.row.cell_treatment, template: opt_data.template, selected_experiment: opt_data.row.experiment}, output);
  output.append(soy.$$escapeHtml(opt_data.row.cell_treatment.id), '</td><td rowspan=\'', soy.$$escapeHtml(opt_data.height), '\'>', soy.$$escapeHtml(opt_data.row.collection_schedule.schedule), '</td>');
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs_select1 = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<select class="facs_select1" data-row=\'', soy.$$escapeHtml(opt_data.row.id), '\' data-preparation=\'', soy.$$escapeHtml(opt_data.preparation.id), '\' id=\'select1_', soy.$$escapeHtml(opt_data.row.id), '_', soy.$$escapeHtml(opt_data.preparation.id), '\'>');
  var s1List243 = soy.$$getMapKeys(opt_data.template.facs_preparation[opt_data.preparation.kind]);
  var s1ListLen243 = s1List243.length;
  for (var s1Index243 = 0; s1Index243 < s1ListLen243; s1Index243++) {
    var s1Data243 = s1List243[s1Index243];
    output.append('<option value="', soy.$$escapeHtml(s1Data243), '" ', (opt_data.preparation.treatment == s1Data243) ? 'selected="selected"' : '', ' >', soy.$$escapeHtml(opt_data.template.facs_preparation[opt_data.preparation.kind][s1Data243].name), '</option>');
  }
  output.append('</select>');
  if (opt_data.preparation.treatment) {
    if (opt_data.template.facs_preparation[opt_data.preparation.kind][opt_data.preparation.treatment].secondary) {
      output.append('<select class="facs_select2" data-row=\'', soy.$$escapeHtml(opt_data.row.id), '\' data-preparation=\'', soy.$$escapeHtml(opt_data.preparation.id), '\' data-treatment=\'', soy.$$escapeHtml(opt_data.preparation.treatment), '\' id=\'select2_', soy.$$escapeHtml(opt_data.row.id), '_', soy.$$escapeHtml(opt_data.preparation.id), '\'>');
      var s2List270 = soy.$$getMapKeys(opt_data.template.facs_preparation[opt_data.preparation.kind][opt_data.preparation.treatment].secondary);
      var s2ListLen270 = s2List270.length;
      for (var s2Index270 = 0; s2Index270 < s2ListLen270; s2Index270++) {
        var s2Data270 = s2List270[s2Index270];
        output.append('<option value="', soy.$$escapeHtml(s2Data270), '" ', (opt_data.preparation.sub_treatment == s2Data270) ? 'selected="selected"' : '', ' >', soy.$$escapeHtml(opt_data.template.facs_preparation[opt_data.preparation.kind][opt_data.preparation.treatment].secondary[s2Data270].name), '</option>');
      }
      output.append('</select>');
    }
  }
  return opt_sb ? '' : output.toString();
};


scb_ui.display_facs_chart = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\trow: ', soy.$$escapeHtml(opt_data.row.id), '<br>prep: ', soy.$$escapeHtml(opt_data.preparation.id), '<br><div id=\'facs_chart_', soy.$$escapeHtml(opt_data.preparation.id), '\' class=\'facs_chart\' data-row_id=\'', soy.$$escapeHtml(opt_data.row.id), '\' data-preparation_id=\'', soy.$$escapeHtml(opt_data.preparation.id), '\' style=\'width:600px;height:300px\'></div>');
  return opt_sb ? '' : output.toString();
};
