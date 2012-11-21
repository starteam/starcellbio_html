// This file was automatically generated from westernblotgel.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.display_western_blot_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t');
  scb_ui.western_blot_gel_name(opt_data, output);
  if (opt_data.gel.lysate_made) {
    output.append('<div class=\'group_header\'>Gel Preparation</div><div class=\'display_instructions\'>Prepare your gel to be run and transferred.<ul><li>Order the samples into the order in which they will appear on the gel by clicking on each sample and dragging it into place.</li><li>Type in the amount of protein lysate (µg) to load in each well.</li><li>When you are done preparing your gel, select <b>Run SDS-PAGE and Transfer</b>.</li></ul></div>');
    scb_ui.experiment_setup_row_header2({template: opt_data.template, display_collection_times: opt_data.template.ui_configuration.display_collection_times, display_stimulation_times: false, insert_space: true, protein_loaded: true}, output);
    scb_ui.western_blot_gel_lysates_list(opt_data, output);
  } else {
    output.append('<div class=\'group_header\'>Sample Selection</div><div class=\'display_instructions\'>Select the samples from which you would like to prepare lysates.<ul><li>Select a particular experiment from the drop down menu at the top of the page.</li><li>To select the particular samples for lysate preparation, click the button with the appropriate collection time.</li></ul></div><div class=\'western_blot_experiment_list\'>');
    scb_ui.western_blot_experiment_list(opt_data, output);
    output.append('</div>');
    if (opt_data.gel.lanes_list.length != 0) {
      output.append('<div class=\'group_header list_of_lysates_to_prepare\'>List of Lysates to Prepare</div><div class=\'display_instructions\'><ul><li>Organize the samples by clicking on the sample and dragging it into place.</li><li>Select <b>Whole Cell</b> from the dropdown menu to prepare whole cell lysates.</li><li>When you are done, select <b>Prepare Lysates</b>.</li></ul></div>');
      scb_ui.experiment_setup_row_header2({template: opt_data.template, display_collection_times: false, display_stimulation_times: false, insert_space: true, protein_loaded: false}, output);
      scb_ui.western_blot_gel_lysates_list(opt_data, output);
    }
  }
  output.append('<div id=\'experiment_setup_row_treatment_edit_blackout\'><div id=\'experiment_setup_row_treatment_edit\' style=\'display:none\'></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_name = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<span model_id=\'', soy.$$escapeHtml(opt_data.gel.id), '\'>');
  scb_util.display_header_name({name: opt_data.gel.name, name_label: 'W.B. experiment name:', name_class: 'western_blot_gel_name_text', icon_class: 'edit_western_blot_gel_name_text', remove_class: 'remove_western_blot_gel', remove_title: 'Discard W.B. Exp'}, output);
  output.append('</span>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysates_list = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<ol class=\'western_blot_gel_lysates_list\'>');
  var laneList52 = opt_data.gel.lanes_list.list;
  var laneListLen52 = laneList52.length;
  for (var laneIndex52 = 0; laneIndex52 < laneListLen52; laneIndex52++) {
    var laneData52 = laneList52[laneIndex52];
    scb_ui.western_blot_gel_lysate_list_row({gel: opt_data.gel, lane: laneData52, index: laneIndex52, template: opt_data.template, gel: opt_data.gel}, output);
  }
  output.append('</ol>');
  if (opt_data.gel.sdsgelrun) {
    if (opt_data.gel.finished) {
      scb_ui.western_blot_gel_sds_anti_body_read_only(opt_data, output);
    } else {
      scb_ui.western_blot_gel_sds_anti_body(opt_data, output);
    }
    output.append('<div class=\'group_header space_above\'>Exposure times</div>');
    scb_ui.western_blot_exposure_times(opt_data, output);
    output.append((opt_data.gel.finished) ? '' : '\t<div class=\'run_western_blot_develop green button\'>Develop Western Blot</div>');
    if (opt_data.gel.finished) {
      scb_ui.western_blot_gel_display(opt_data, output);
    }
  }
  if (opt_data.gel.lysate_made) {
    if (opt_data.gel.sdsgelrun) {
    } else {
      scb_ui.western_blot_gel_lysate_sdsgelrun(opt_data, output);
    }
  } else {
    scb_ui.western_blot_gel_lysate_make_lysate(opt_data, output);
  }
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<tr class=\'western_blot_gel_lysate_row\' model_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\'><td class=\'wb_counter inline_block\'>', soy.$$escapeHtml(opt_data.index), '</td><td class=\'western_blot_gel_lysate_row_treatment\' model_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\'>');
  scb_ui.experiment_setup_row({row: opt_data.lane.cell_treatment, template: opt_data.template, selected_experiment: opt_data.lane.experiment}, output);
  output.append('<td class=\'wb_collection_time inline_block\'>', (opt_data.template.ui_configuration.display_collection_times) ? soy.$$escapeHtml(opt_data.lane.collection_schedule.schedule) : '', '</td></td><td class=\'wb_lysate_kind inline_block\'>');
  if (opt_data.gel.lysate_made) {
    output.append(soy.$$escapeHtml(opt_data.template.lysate_kinds[opt_data.lane.kind].name));
  } else {
    scb_ui.western_blot_gel_lysate_kind(opt_data, output);
  }
  output.append('</td>');
  if (opt_data.template.ui_configuration.lysate_display_ip) {
    output.append('<td class=\'wb_ip inline_block\'>');
    if (opt_data.gel.lysate_made) {
    } else {
      scb_ui.western_blot_gel_lysate_kind_ip(opt_data, output);
    }
    output.append('</td><td class=\'wb_ip_anti_body inline_block\'>');
    if (opt_data.gel.lysate_made) {
      output.append((opt_data.lane.ip) ? soy.$$escapeHtml(opt_data.template.ip_primary_anti_body[opt_data.lane.ip_primary_anti_body].name) + '<br>' + soy.$$escapeHtml(opt_data.template.ip_secondary_anti_body[opt_data.lane.ip_secondary_anti_body].name) + '<br>' : '');
    } else {
      scb_ui.western_blot_gel_lysate_kind_ip_anti_body(opt_data, output);
    }
    output.append('</td>');
  }
  output.append('<td>', (opt_data.gel.lysate_made) ? (opt_data.gel.sdsgelrun) ? '<div class=\'western_blot_protein_loaded\'>' + soy.$$escapeHtml(opt_data.lane.amount_of_protein_loaded) + ' &#181;g</div>' : '<input type=\'text\' model_id=\'' + soy.$$escapeHtml(opt_data.lane.id) + '\' class=\'set_amount_of_protein_loaded\' size=\'5\' value=\'' + soy.$$escapeHtml(opt_data.lane.amount_of_protein_loaded) + '\'></input>&#181;g' : '');
  if (opt_data.gel.sdsgelrun) {
  } else {
    output.append('<div class=\'toolbox_experiment_row\'>');
    scb_util.icon_with_text({src: 'icons/actions/Delete.png', text: 'Delete', cls: 'delete_western_blot_row'}, output);
    scb_util.icon_with_text({src: 'icons/actions/Copy.png', text: 'Copy', cls: 'duplicate_western_blot_row'}, output);
    output.append('</div>');
  }
  output.append('</td></tr>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_list_row_detail = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t<div class=\'experiment_row_cell_line\'>');
  scb_ui.experiment_setup_row_cell_line(opt_data, output);
  output.append('</div><div class=\'experiment_row_treatments\'>', (opt_data.row.treatment_list.list.length == 0) ? '<div class=\'experiment_row_treatment\' style=\'border-width:0px;\'><div class=\'experiment_row_treatment_drug\'><div class=\t\'experiment_row_treatment_drug_one\'>&nbsp;</div></div>' + ((opt_data.template.ui_configuration.treatment_options_display_temperature) ? '<div class=\'experiment_row_treatment_temperature\'>&nbsp;</div>' : '') + '<div class=\'experiment_row_treatment_schedule\'>&nbsp;</div></div>' : '');
  var tList184 = opt_data.row.treatment_list.list;
  var tListLen184 = tList184.length;
  for (var tIndex184 = 0; tIndex184 < tListLen184; tIndex184++) {
    var tData184 = tList184[tIndex184];
    scb_ui.experiment_setup_row_treatment({treatment: tData184, template: opt_data.template, cell_treatment_id: opt_data.row.id, selected_experiment: opt_data.selected_experiment}, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_list_row = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<li class=\'western_blot_gel_lysate_row\' model_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\'><div class=\'western_blot_gel_lysate_row_treatment\' model_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\'>');
  scb_ui.western_blot_gel_lysate_list_row_detail({row: opt_data.lane.cell_treatment, template: opt_data.template, selected_experiment: opt_data.lane.experiment}, output);
  output.append('<div class=\'wb_collection_time inline_block\'>', (opt_data.template.ui_configuration.display_collection_times) ? soy.$$escapeHtml(opt_data.lane.collection_schedule.schedule) : '', '</div><div class=\'wb_lysate_kind inline_block\'>');
  if (opt_data.gel.lysate_made) {
    output.append(soy.$$escapeHtml(opt_data.template.lysate_kinds[opt_data.lane.kind].name));
  } else {
    scb_ui.western_blot_gel_lysate_kind(opt_data, output);
  }
  output.append('</div>');
  if (opt_data.template.ui_configuration.lysate_display_ip) {
    output.append('<div class=\'wb_ip inline_block\'>');
    if (opt_data.gel.lysate_made) {
    } else {
      scb_ui.western_blot_gel_lysate_kind_ip(opt_data, output);
    }
    output.append('</div><div class=\'wb_ip_anti_body inline_block\'>');
    if (opt_data.gel.lysate_made) {
      output.append((opt_data.lane.ip) ? soy.$$escapeHtml(opt_data.template.ip_primary_anti_body[opt_data.lane.ip_primary_anti_body].name) + '<br>' + soy.$$escapeHtml(opt_data.template.ip_secondary_anti_body[opt_data.lane.ip_secondary_anti_body].name) + '<br>' : '');
    } else {
      scb_ui.western_blot_gel_lysate_kind_ip_anti_body(opt_data, output);
    }
    output.append('</div>');
  }
  output.append((opt_data.gel.lysate_made) ? (opt_data.gel.sdsgelrun) ? '<div class=\'western_blot_protein_loaded\'>' + soy.$$escapeHtml(opt_data.lane.amount_of_protein_loaded) + ' &#181;g</div>' : '<input type=\'text\' model_id=\'' + soy.$$escapeHtml(opt_data.lane.id) + '\' class=\'set_amount_of_protein_loaded\' size=\'5\' value=\'' + soy.$$escapeHtml(opt_data.lane.amount_of_protein_loaded) + '\'></input>&#181;g' : '');
  if (opt_data.gel.sdsgelrun) {
  } else {
    output.append('<div class=\'toolbox_experiment_row\'>');
    scb_util.icon_with_text({src: 'icons/actions/Delete.png', text: 'Delete', cls: 'delete_western_blot_row'}, output);
    scb_util.icon_with_text({src: 'icons/actions/Copy.png', text: 'Copy', cls: 'duplicate_western_blot_row'}, output);
    output.append('</div>');
  }
  output.append('</div></li>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_make_lysate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'make_western_blot_lysate green button\'>Prepare Lysates</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_sdsgelrun = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'run_western_blot_sds_gel green button\'>Run SDS-PAGE and Transfer</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_develop_western_blot = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'run_western_blot_develop green button\'>Develop Western Blot</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_kind = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<span class=\'western_blot_lysate_kind\'>');
  scb_util.select_from_dict({map: opt_data.template.lysate_kinds, map_name: 'name', model_id: opt_data.lane.kind, associated_class: 'making_lysates_row_lysate_kind', model2_id: opt_data.lane.id}, output);
  output.append('</span>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_kind_ip = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<input type=\'checkbox\' name=\'ip\' class=\'western_blot_gel_lysate_kind_ip\' lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' ', (opt_data.lane.ip) ? 'checked=\'checked\'' : '', '/>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_lysate_kind_ip_anti_body = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'ip_value_div\' ', (opt_data.lane.ip) ? '' : 'style=\'display:none\'', '>');
  scb_util.select_from_dict({map: opt_data.template.ip_primary_anti_body, map_name: 'name', model_id: opt_data.lane.ip_primary_anti_body, associated_class: 'making_lysates_row_primary_anti_body', model2_id: opt_data.lane.id}, output);
  scb_util.select_from_dict({map: opt_data.template.ip_secondary_anti_body, map_name: 'name', model_id: opt_data.lane.ip_secondary_anti_body, associated_class: 'making_lysates_row_secondary_anti_body', model2_id: opt_data.lane.id}, output);
  output.append('</span>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_experiment_list = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'western_blot_experiment_selector\'>');
  scb_util.select_from_obj({map: opt_data.experiment_list.list, map_name: 'name', model_id: 'id', selected_id: opt_data.experiment.id, associated_class: 'select_western_blot_lysate_experiment'}, output);
  output.append('</div><div class=\'experiment_rows\'><table><tr><td>');
  scb_ui.experiment_setup_row_header({template: opt_data.template, display_collection_times: false, display_stimulation_times: opt_data.template.ui_configuration.display_stimulation_times}, output);
  output.append('</td><td>', (opt_data.template.ui_configuration.display_collection_times != false) ? 'Collection Times' : 'Select sample?', '</td></tr>');
  var tList327 = opt_data.experiment.cell_treatment_list.list;
  var tListLen327 = tList327.length;
  for (var tIndex327 = 0; tIndex327 < tListLen327; tIndex327++) {
    var tData327 = tList327[tIndex327];
    output.append('<tr><td class=\'experiment_rows_list\'>');
    scb_ui.experiment_setup_row({row: tData327, template: opt_data.template, selected_experiment: opt_data.experiment, display_collection_times: false}, output);
    output.append('</td><td>');
    var sList335 = tData327.collection_schedule_list.list;
    var sListLen335 = sList335.length;
    for (var sIndex335 = 0; sIndex335 < sListLen335; sIndex335++) {
      var sData335 = sList335[sIndex335];
      output.append('<button class=\'button small green add_western_blot_experiment_element\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(tData327.id), '\' schedule_id=\'', soy.$$escapeHtml(sData335.id), '\'>', (opt_data.template.ui_configuration.display_collection_times) ? soy.$$escapeHtml(sData335.schedule) : 'Select', '</button>');
    }
    output.append('</td></tr>');
  }
  output.append('</table><button class=\'button medium green add_western_blot_experiment_element_all\' style=\'margin-left:680px\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>Select all samples</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_sds_anti_body_heading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'group_header\'>Western Blotting</div><div class=\'display_instructions\'><ul><li>Specify the primary and secondary antibodies to blot for the proteins you would like to analyze. Be sure to select the appropriate combination of antibodies from the drop down menus.</li><li>\tSelect the exposure time(s) to expose your Western blot, by clicking on <img src=\'icons/actions/Add.png\' style=\'height:16px\'> and typing in the exposure time and units for the length of time.</li><li>\tWhen you are done, select <b>Develop Western Blot</b>. Once you develop your blot, you will be unable to change the antibody selections. You can add additional exposure times by clicking on <img src=\'icons/actions/Add.png\' style=\'height:16px\'> underneath exposure times.</li></ul></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_sds_anti_body_heading_read_only = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'group_header\'>Western Blotting</div><div class=\'display_instructions\'><ul><li> You can add additional exposure times by clicking on <img src=\'icons/actions/Add.png\' style=\'height:16px\'> underneath exposure times.</li><li>\tTo view the Western blot(s), click on the appropriate tab.</li><li>\tTo reblot your current western blot with another set of antibodies, select <b>Duplicate gel</b>. The duplicated western blot will appear in the menu on the left hand side.</li><li>\tTo run another western blot experiment, click <b><img src=\'icons/actions/Add.png\' style=\'height:16px\'></b> in the menu on the left hand side.</li></ul></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_sds_anti_body = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  scb_ui.western_blot_gel_sds_anti_body_heading(null, output);
  output.append('<div class=\'western_blot_gel_sds_primary_anti_body\'>Select primary antibody:');
  scb_util.select_from_dict({map: opt_data.template.primary_anti_body, map_name: 'name', model_id: opt_data.gel.primary_anti_body, associated_class: 'making_lysates_gel_primary_anti_body', model2_id: opt_data.gel.id}, output);
  output.append('</div><div class=\'western_blot_gel_sds_secondary_anti_body\'>Select secondary antibody:');
  scb_util.select_from_dict({map: opt_data.template.secondary_anti_body, map_name: 'name', model_id: opt_data.gel.secondary_anti_body, associated_class: 'making_lysates_gel_secondary_anti_body', model2_id: opt_data.gel.id}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_sds_anti_body_read_only = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  scb_ui.western_blot_gel_sds_anti_body_heading_read_only(null, output);
  output.append('<table><tr><td class=\'western_blot_gel_sds_primary_anti_body\'>Primary antibody:\t\t</td><td>', soy.$$escapeHtml(opt_data.template.primary_anti_body[opt_data.gel.primary_anti_body].name), '</td></tr><tr><td class=\'western_blot_gel_sds_secondary_anti_body\'>Secondary antibody: \t\t</td><td>', soy.$$escapeHtml(opt_data.template.secondary_anti_body[opt_data.gel.secondary_anti_body].name), '</td></tr></table><div class=\'button green western_blot_duplicate_gel\'>Duplicate gel</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_exposure_times = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t<div class=\'western_blot_exposure_times\'>');
  var tList387 = opt_data.gel.exposure_list.list;
  var tListLen387 = tList387.length;
  for (var tIndex387 = 0; tIndex387 < tListLen387; tIndex387++) {
    var tData387 = tList387[tIndex387];
    scb_ui.western_blot_exposure_time({schedule: tData387, template: opt_data.template}, output);
  }
  output.append('<div class=\'add_western_blot_exposure_time\'>&nbsp;<img class=\'add_western_blot_exposure_time_icon\' src=\'icons/actions/Add.png\' width=\'24px\'></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_exposure_time = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'western_blot_time\' schedule_id=\'', soy.$$escapeHtml(opt_data.schedule.id), '\'>', soy.$$escapeHtml(opt_data.schedule.schedule), '<div class=\'experiment_row_treatment_tools\' ><!--<img class=\'western_blot_time_edit\' src=\'icons/actions/Edit.png\' width=\'24px\'>--><img class=\'western_blot_time_delete\' src=\'icons/actions/Delete.png\' width=\'24px\'></div><div class=\'experiment_row_treatment_tools_spacer\'></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_display = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t<div class=\'western_blot_gels\'>');
  scb_ui.western_blot_gel_radio(opt_data, output);
  output.append('</div><canvas class=\'western_blot_gel_canvas\' id=\'western_blot_gel_canvas_', soy.$$escapeHtml(opt_data.gel.id), '\' width=\'1000\' height=\'1000\' style=\'width:600px;height:300px;text-align:center\'></canvas>');
  return opt_sb ? '' : output.toString();
};


scb_ui.western_blot_gel_radio = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t\t');
  var tList408 = opt_data.gel.exposure_list.list;
  var tListLen408 = tList408.length;
  for (var tIndex408 = 0; tIndex408 < tListLen408; tIndex408++) {
    var tData408 = tList408[tIndex408];
    output.append('<input type=\'radio\' ', (tData408.id == opt_data.gel.exposure_list.selected_id) ? 'checked=checked' : '', ' class=\'display_western_blot_gel\' name=\'western_blot_gel_radio_selector\' schedule_id=\'', soy.$$escapeHtml(tData408.id), '\' id=\'', soy.$$escapeHtml(tData408.id), '\'/><label for=\'', soy.$$escapeHtml(tData408.id), '\'>', soy.$$escapeHtml(tData408.schedule), '</label></input>');
  }
  return opt_sb ? '' : output.toString();
};
