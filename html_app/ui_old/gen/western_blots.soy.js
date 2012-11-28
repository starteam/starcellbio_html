// This file was automatically generated from western_blots.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.western_blot = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  if (opt_data.current == null) {
    scb_ui.dashboard(null, output);
  } else {
    scb_ui.western_blot_display(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_display = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t<div class=\'making_lysates_display\'>');
  scb_ui.western_blot_name(opt_data, output);
  scb_ui.display_lysates_selector(opt_data, output);
  output.append('</div><div><div id=\'dialog_edit\' style=\'display:none\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.display_lysates_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'western_blot_display_lysate\'>');
  if (opt_data.current.sdsgelrun) {
  } else {
    output.append('<div class=\'space_above scb_section_title\'>Select lysates:</div><div class=\'western_blot_display_lysate_picker\'><select class=\'western_blot_display_lysate_select\'>');
    var mlList27 = opt_data.making_lysates_list.list;
    var mlListLen27 = mlList27.length;
    for (var mlIndex27 = 0; mlIndex27 < mlListLen27; mlIndex27++) {
      var mlData27 = mlList27[mlIndex27];
      output.append('<option lysate_id=\'', soy.$$escapeHtml(mlData27.id), '\' ', (opt_data.current.display_lysates_id == mlData27.id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(mlData27.name), '</option>');
    }
    output.append('</select></div><table class=\'making_lysates_list\'><th class=\'making_lysates_table_header><td class=\'cell_line_name\'>Cell line</td><td class=\'treatments\'>Treatments</td><td class=\'collection_time\'>Collection time</td><td class=\'whole_cell\'>Whole Cell</td><td class=\'cytoplasm\'>Cytoplasm</td><td class=\'nuclear\'>Nuclear</td><td class=\'ip\'>IP</td></th>');
    var tList39 = opt_data.current.display_lysates.lysate_kind_list.list;
    var tListLen39 = tList39.length;
    for (var tIndex39 = 0; tIndex39 < tListLen39; tIndex39++) {
      var tData39 = tList39[tIndex39];
      if (tData39.empty) {
      } else {
        output.append('<tr class=\'tr_making_lysates_row\'>');
        scb_ui.western_blot_making_lysates_row_drag_and_drop({t: tData39, template: opt_data.template, making_lysate_id: opt_data.current.display_lysates.id}, output);
        output.append('</tr>');
      }
    }
    output.append('</table>');
  }
  output.append('<div class=\'western_blot_lanes\'>');
  scb_ui.western_blot_lanes_list(opt_data, output);
  output.append('</div>', (opt_data.current.sdsgelrun) ? '' : '<div class=\'western_blot_run_sds\'><button class=\'western_blot_run_sds_button\'>Run SDS-PAGE gel and transfer</button></div>');
  if (opt_data.current.sdsgelrun) {
    output.append('<div class=\'western_blot_anti_body\'>');
    scb_ui.western_blot_anti_body_select(opt_data, output);
    output.append('</div><div class=\'western_blot_exposure\'><div class=\'experiment_collection_title scb_section_title\'>Select Exposure Times</div>');
    scb_ui.western_blot_exposure(opt_data, output);
    output.append('</div>', (opt_data.current.finished) ? '' : '<div class=\'western_blot_develop\'><button class=\'western_blot_develop_button\'>Develop Western Blot</button></div>', (opt_data.current.finished) ? 'HERE WILL COME PROCESSED WESTERN BLOT FOR ALL EXPOSURE TIMES' : '');
  } else {
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_making_lysates_row_first_columns = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<td class=\'cell_line_name\'>', soy.$$escapeHtml(opt_data.template.cell_lines[opt_data.t.cell_line_id].name), '</td><td class=\'treatments\'>');
  var tlList83 = opt_data.t.treatment_list;
  var tlListLen83 = tlList83.length;
  for (var tlIndex83 = 0; tlIndex83 < tlListLen83; tlIndex83++) {
    var tlData83 = tlList83[tlIndex83];
    output.append('<div class=\'making_lysates_treatment_row ', (tlIndex83 % 2 == 0) ? 'making_lysates_treatment_row_even' : 'making_lysates_treatment_row_odd', '\'><div class=\'making_lysates_schedule\'>', soy.$$escapeHtml(tlData83.schedule), '</div><div class=\'making_lysates_temperature\'>', soy.$$escapeHtml(tlData83.temperature), '</div><div class=\'making_lysates_treatments\'>');
    var tdList95 = tlData83.drug_list;
    var tdListLen95 = tdList95.length;
    for (var tdIndex95 = 0; tdIndex95 < tdListLen95; tdIndex95++) {
      var tdData95 = tdList95[tdIndex95];
      output.append('<div class=\'making_lysates_treatment\'><div class=\'making_lysates_treatment_name\'>', soy.$$escapeHtml(tdData95.name), '</div><div class=\'making_lysates_treatment_concentration\'>', soy.$$escapeHtml(tdData95.concentration), '</div></div>');
    }
    output.append('</div></div>');
  }
  output.append('</td><td class=\'collection_time\'>', soy.$$escapeHtml(opt_data.t.collection_time), '</td>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_making_lysates_row_drag_and_drop = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<td class=\'cell_line_name\'>', soy.$$escapeHtml(opt_data.template.cell_lines[opt_data.t.cell_line_id].name), '</td><td class=\'treatments\'>');
  var tlList111 = opt_data.t.treatment_list;
  var tlListLen111 = tlList111.length;
  for (var tlIndex111 = 0; tlIndex111 < tlListLen111; tlIndex111++) {
    var tlData111 = tlList111[tlIndex111];
    output.append('<div class=\'making_lysates_treatment_row ', (tlIndex111 % 2 == 0) ? 'making_lysates_treatment_row_even' : 'making_lysates_treatment_row_odd', '\'><div class=\'making_lysates_schedule\'>', soy.$$escapeHtml(tlData111.schedule), '</div><div class=\'making_lysates_temperature\'>', soy.$$escapeHtml(tlData111.temperature), '</div><div class=\'making_lysates_treatments\'>');
    var tdList123 = tlData111.drug_list;
    var tdListLen123 = tdList123.length;
    for (var tdIndex123 = 0; tdIndex123 < tdListLen123; tdIndex123++) {
      var tdData123 = tdList123[tdIndex123];
      output.append('<div class=\'making_lysates_treatment\'><div class=\'making_lysates_treatment_name\'>', soy.$$escapeHtml(tdData123.name), '</div><div class=\'making_lysates_treatment_concentration\'>', soy.$$escapeHtml(tdData123.concentration), '</div></div>');
    }
    output.append('</div></div>');
  }
  output.append('</td><td class=\'collection_time\'>', soy.$$escapeHtml(opt_data.t.collection_time), '</td><td class=\'whole_cell\'>', (opt_data.t.whole_cell) ? '<button class=\'western_blot_add_lysate_button\' making_lysate_id=\'' + soy.$$escapeHtml(opt_data.making_lysate_id) + '\' lysate_kind_id=\'' + soy.$$escapeHtml(opt_data.t.id) + '\' kind=\'whole_cell\'>Add</button>' : '', '</td><td class=\'cytoplasm\'>', (opt_data.t.cytoplasm) ? '<button class=\'western_blot_add_lysate_button\' making_lysate_id=\'' + soy.$$escapeHtml(opt_data.making_lysate_id) + '\'  lysate_kind_id=\'' + soy.$$escapeHtml(opt_data.t.id) + '\' kind=\'cytoplasm\'>Add</button>' : '', '</td><td class=\'nuclear\'>', (opt_data.t.nuclear) ? '<button class=\'western_blot_add_lysate_button\' making_lysate_id=\'' + soy.$$escapeHtml(opt_data.making_lysate_id) + '\'  lysate_kind_id=\'' + soy.$$escapeHtml(opt_data.t.id) + '\' kind=\'nuclear\'>Add</button>' : '', '</td><td class=\'ip\'>', (opt_data.t.ip) ? '<button class=\'western_blot_add_lysate_button\' making_lysate_id=\'' + soy.$$escapeHtml(opt_data.making_lysate_id) + '\'  lysate_kind_id=\'' + soy.$$escapeHtml(opt_data.t.id) + '\' kind=\'ip\'>Add <!--' + soy.$$escapeHtml(opt_data.t.ip_primary_anti_body) + ' ' + soy.$$escapeHtml(opt_data.t.ip_secondary_anti_body) + '--></button>' : '', '</td>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_lanes_list = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'space_above scb_section_title\'>Western Blot lanes</div><table style=\'width:100%\'>');
  var itemList173 = opt_data.current.lanes_list.list;
  var itemListLen173 = itemList173.length;
  for (var itemIndex173 = 0; itemIndex173 < itemListLen173; itemIndex173++) {
    var itemData173 = itemList173[itemIndex173];
    output.append('<tr>');
    scb_ui.western_blot_making_lysates_row_first_columns({t: itemData173.lysate_kind, template: opt_data.template}, output);
    output.append('<td>', soy.$$escapeHtml(itemData173.kind), '</td><td><label for=\'protein_', soy.$$escapeHtml(itemData173.id), '\'>Amount to Load:</label><input name=\'protein_', soy.$$escapeHtml(itemData173.id), ' type=\'text\' value=\'1\'/></td><td><button model_id=\'', soy.$$escapeHtml(itemData173.id), '\' class=\'delete_western_blot_lane\'>Delete</button></td></tr>');
  }
  output.append('</table>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_anti_body_select = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'western_blot_anti_body_select scb_section_title space_above\'>Select Primary and Secondary Antibody ', soy.$$escapeHtml(opt_data.current.name), '</div><div class=\'western_blot_anti_body_primary\'><div class=\'scb_inline scb_200px\'>Primary Antibody</div><select class=\'western_blot_anti_body_select_primary\'>');
  var pabList193 = soy.$$getMapKeys(opt_data.template.primary_anti_body);
  var pabListLen193 = pabList193.length;
  for (var pabIndex193 = 0; pabIndex193 < pabListLen193; pabIndex193++) {
    var pabData193 = pabList193[pabIndex193];
    output.append('<option model_id=\'', soy.$$escapeHtml(pabData193), '\'>', soy.$$escapeHtml(opt_data.template.primary_anti_body[pabData193].name), '</option>');
  }
  output.append('</select></div><div class=\'western_blot_anti_body_secondary\'><div class=\'scb_inline scb_200px\'>Secondary Antibody</div><select class=\'western_blot_anti_body_select_secondary\'>');
  var pabList201 = soy.$$getMapKeys(opt_data.template.secondary_anti_body);
  var pabListLen201 = pabList201.length;
  for (var pabIndex201 = 0; pabIndex201 < pabListLen201; pabIndex201++) {
    var pabData201 = pabList201[pabIndex201];
    output.append('<option model_id=\'', soy.$$escapeHtml(pabData201), '\'>', soy.$$escapeHtml(opt_data.template.secondary_anti_body[pabData201].name), '</option>');
  }
  output.append('</select></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_exposure = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t<div class=\'experiment_collection_times\'>');
  var tList211 = opt_data.current.exposure_list.list;
  var tListLen211 = tList211.length;
  for (var tIndex211 = 0; tIndex211 < tListLen211; tIndex211++) {
    var tData211 = tList211[tIndex211];
    scb_ui.western_blot_exposure_one({schedule: tData211, template: opt_data.template}, output);
  }
  output.append('<div class=\'add_western_blot_exposure_time scb_inline\'>&nbsp;<img class=\'add_western_blot_exposure_time add_schedule\' src=\'icons/actions/Add.png\' width=\'24px\'></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_exposure_one = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'scb_250px collection_schedule_time \' schedule_id=\'', soy.$$escapeHtml(opt_data.schedule.id), '\'>', soy.$$escapeHtml(opt_data.schedule.schedule), '<div class=\'experiment_row_treatment_tools\' ><img class=\'experiment_row_treatment_edit\' src=\'icons/actions/Edit.png\' width=\'24px\'><img class=\'experiment_row_treatment_delete\' src=\'icons/actions/Delete.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t<div class=\'making_lysates_name\'>Western Blot title: <div class=\'making_lysates_text\'>', soy.$$escapeHtml(opt_data.current.name), '<div class=\'edit_tools\'>');
  scb_util.small_icon_without_text({src: 'icons/actions/Edit.png', text: 'Edit', cls: 'edit_experiment_name_text'}, output);
  output.append('</div><div class=\'edit_tools_spacer\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};
