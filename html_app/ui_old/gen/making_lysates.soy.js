// This file was automatically generated from making_lysates.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.making_lysates = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  if (opt_data.current == null) {
    scb_ui.dashboard(null, output);
  } else {
    scb_ui.making_lysates_display(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


scb_ui.making_lysates_sidebar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'create_new_making_lysates\'>Make Lysates</div><ul class=\'sidebar_list\'>');
  var mlList13 = opt_data.list.list;
  var mlListLen13 = mlList13.length;
  for (var mlIndex13 = 0; mlIndex13 < mlListLen13; mlIndex13++) {
    var mlData13 = mlList13[mlIndex13];
    output.append('<li><a href=\'#', soy.$$escapeHtml(mlData13.id), '\' model_id=\'', soy.$$escapeHtml(mlData13.id), '\' class=\'a_black_link select_making_lysates ', (opt_data.current != null) ? (opt_data.current.id == mlData13.id) ? 'experiment_sidebar_selected_experiment' : '' : '', '\'>', soy.$$escapeHtml(mlData13.name), '</a></li>');
  }
  output.append('</ul>');
  return opt_sb ? '' : output.toString();
};


scb_ui.making_lysates_display = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'making_lysates_display\'>');
  scb_ui.making_lysates_name(opt_data, output);
  output.append('<div class=\'experiment_rows space_above\'><b>Experiment samples used to make lysates</b></div><table class=\'making_lysates_list\'><th class=\'making_lysates_table_header><td class=\'cell_line_name\'>Cell line</td><td class=\'treatments\'>Treatments</td><td class=\'collection_time\'>Collection time</td><td class=\'whole_cell\'>Whole Cell</td><td class=\'cytoplasm\'>Cytoplasm</td><td class=\'nuclear\'>Nuclear</td><td class=\'ip\'>IP</td></th>');
  var tList34 = opt_data.current.lysate_kind_list.list;
  var tListLen34 = tList34.length;
  for (var tIndex34 = 0; tIndex34 < tListLen34; tIndex34++) {
    var tData34 = tList34[tIndex34];
    output.append('<tr class=\'tr_making_lysates_row\'>');
    scb_ui.making_lysates_row({t: tData34, template: opt_data.template}, output);
    output.append('</tr>');
  }
  output.append('</table><div class=\'finish_experiment_setup_wrapper space_above center_text \'>', (opt_data.current.finished == true) ? '<div class=\'no_op\'>Experiment setup has been executed</div>' : '<div class=\'finish_making_lysates center_text button green\' model_id=\'' + soy.$$escapeHtml(opt_data.current.id) + '\'>Finish setup & run experiment</div>', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.making_lysates_row = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<td class=\'cell_line_name\'>', soy.$$escapeHtml(opt_data.template.cell_lines[opt_data.t.cell_line_id].name), '</td><td class=\'treatments\'>');
  var tlList54 = opt_data.t.treatment_list;
  var tlListLen54 = tlList54.length;
  for (var tlIndex54 = 0; tlIndex54 < tlListLen54; tlIndex54++) {
    var tlData54 = tlList54[tlIndex54];
    output.append('<div class=\'making_lysates_treatment_row ', (tlIndex54 % 2 == 0) ? 'making_lysates_treatment_row_even' : 'making_lysates_treatment_row_odd', '\'><div class=\'making_lysates_schedule\'>', soy.$$escapeHtml(tlData54.schedule), '</div><div class=\'making_lysates_temperature\'>', soy.$$escapeHtml(tlData54.temperature), '</div><div class=\'making_lysates_treatments\'>');
    var tdList66 = tlData54.drug_list;
    var tdListLen66 = tdList66.length;
    for (var tdIndex66 = 0; tdIndex66 < tdListLen66; tdIndex66++) {
      var tdData66 = tdList66[tdIndex66];
      output.append('<div class=\'making_lysates_treatment\'><div class=\'making_lysates_treatment_name\'>', soy.$$escapeHtml(tdData66.name), '</div><div class=\'making_lysates_treatment_concentration\'>', soy.$$escapeHtml(tdData66.concentration), '</div></div>');
    }
    output.append('</div></div>');
  }
  output.append('</td><td class=\'collection_time\'>', soy.$$escapeHtml(opt_data.t.collection_time), '</td><td class=\'whole_cell\'><input type=\'checkbox\' class=\'making_lysates_whole_cell_checkbox\' name=\'whole_cell\' lysate_kind_id=\'', soy.$$escapeHtml(opt_data.t.id), '\' ', (opt_data.t.whole_cell) ? 'checked=\'checked\'' : '', '></td><td class=\'cytoplasm\'><input type=\'checkbox\' class=\'making_lysates_cytoplasm_checkbox\' name=\'cytoplasm\' lysate_kind_id=\'', soy.$$escapeHtml(opt_data.t.id), '\' ', (opt_data.t.cytoplasm) ? 'checked=\'checked\'' : '', '\'></td><td class=\'nuclear\'><input type=\'checkbox\' class=\'making_lysates_nuclear_checkbox\' name=\'nuclear\' lysate_kind_id=\'', soy.$$escapeHtml(opt_data.t.id), '\' ', (opt_data.t.nuclear) ? 'checked=\'checked\'' : '', '\'></td><td class=\'ip\'><input type=\'checkbox\' class=\'making_lysates_ip_checkbox\' name=\'ip\' lysate_kind_id=\'', soy.$$escapeHtml(opt_data.t.id), '\' lysate_kind_id=\'', soy.$$escapeHtml(opt_data.t.id), '\' ', (opt_data.t.ip) ? 'checked=\'checked\'' : '', '\'><span class=\'ip_value_div\' ', (opt_data.t.ip) ? '' : 'style=\'display:none\'', '>');
  scb_util.select_from_dict({map: opt_data.template.ip_primary_anti_body, map_name: 'name', model_id: '', associated_class: 'making_lysates_row_primary_anti_body', model2_id: opt_data.t.id}, output);
  scb_util.select_from_dict({map: opt_data.template.ip_secondary_anti_body, map_name: 'name', model_id: '', associated_class: 'making_lysates_row_secondary_anti_body', model2_id: opt_data.t.id}, output);
  output.append('</span></td>');
  return opt_sb ? '' : output.toString();
};


scb_ui.making_lysates_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t<div class=\'making_lysates_name\'>Lysate preparation: <div class=\'making_lysates_text\'>', soy.$$escapeHtml(opt_data.current.name), '<div class=\'edit_tools\'>');
  scb_util.small_icon_without_text({src: 'icons/actions/Edit.png', text: 'Edit', cls: 'edit_experiment_name_text'}, output);
  output.append('</div><div class=\'edit_tools_spacer\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};
