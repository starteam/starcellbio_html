// This file was automatically generated from western_blot.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot == 'undefined') { var scb_western_blot = {}; }


scb_western_blot.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'Western Blot', technique_view: 'western_blot', technique_param: 'western_blot_id', technique_id: opt_data.western_blot.id}, output);
  scb_western_blot.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_western_blot_details_view\'><div class=\'scb_western_blot_details_view_inner\'>');
  scb_western_blot.display_tabs(opt_data, output);
  output.append('</div><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>Select technique</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_tabs_selector(opt_data, output);
  output.append('<div class=\'scb_s_western_blot_tab_content\'>');
  if (opt_data.kind == 'sample_prep') {
    scb_western_blot.sample_prep(opt_data, output);
  }
  if (opt_data.kind == 'prepare_gel') {
    scb_western_blot.prepare_gel(opt_data, output);
  }
  if (opt_data.kind == 'load_gel') {
    scb_western_blot.display_wb_progress({step: 3}, output);
  }
  output.append((opt_data.kind == 'gel_operations') ? '' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_tabs\'>');
  var wbList78 = opt_data.experiment.western_blot_list.list;
  var wbListLen78 = wbList78.length;
  for (var wbIndex78 = 0; wbIndex78 < wbListLen78; wbIndex78++) {
    var wbData78 = wbList78[wbIndex78];
    output.append((opt_data.western_blot.id == wbData78.id) ? '<span class=\'scb_s_western_blot_active\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData78.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData78.name) + '</span><button class=\'scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData78.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>X</button></span>' : '<a class=\'scb_f_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData78.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData78.id) + '\'>' + soy.$$escapeHtml(wbData78.name) + '</a>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: 1}, output);
  output.append('<div class=\'scb_s_western_blot_samples_table\'><table><thead><td>Select</td><td>Samples</td><td>Lysate type</td><td>Action</td></thead>');
  var rList114 = opt_data.rows;
  var rListLen114 = rList114.length;
  for (var rIndex114 = 0; rIndex114 < rListLen114; rIndex114++) {
    var rData114 = rList114[rIndex114];
    output.append('<tr><td>', (rData114.display_sample) ? '<input type="checkbox" class="scb_f_western_blot_sample_active" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData114.cell_treatment.id) + '\'' + ((rData114.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td>', (rData114.display_sample) ? soy.$$escapeHtml(rData114.display_text) : '', '</td><td>');
    scb_western_blot.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, western_blot: opt_data.western_blot, cell_treatment: rData114.cell_treatment, kinds: opt_data.kinds, lane: rData114}, output);
    output.append('</td><td>', (rData114.kind == 'existing') ? '<button class="scb_f_western_blot_sample_remove" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData114.lane.id) + '\'' + ((rData114.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '', '</td></tr>');
  }
  output.append('</table><a class=\'scb_s_navigation_button scb_f_western_blot_prepare_lysates\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> Prepare lysates</a></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.prepare_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: 2}, output);
  output.append('<div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'>1) Choose Gel Type:<input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".10" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.10') ? 'checked=\'checked\'' : '', '>10%</input><input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".12" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.12') ? 'checked=\'checked\'' : '', '>12%</input><input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".15" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.15') ? 'checked=\'checked\'' : '', '>15%</input></div><div class=\'scb_s_western_blot_choose_samples_note\'>NOTE: You can reorder samples by dragging and dropping into new order</div><div class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list\'>');
  var rList208 = opt_data.rows;
  var rListLen208 = rList208.length;
  for (var rIndex208 = 0; rIndex208 < rListLen208; rIndex208++) {
    var rData208 = rList208[rIndex208];
    output.append((rData208.is_valid) ? '<li>' + soy.$$escapeHtml(rData208.display_text) + ' - ' + soy.$$escapeHtml(rData208.lane.kind) + '</li>' : '');
  }
  output.append('</ol>', (opt_data.western_blot.marker_loaded == true) ? '<div class=\'scb_s_western_blot_marker\'>15. Marker</div>' : '', '</div>', (opt_data.western_blot.marker_loaded == false) ? '<button class=\'scb_s_western_blot_load_marker\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Load Marker</button>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\'><div class=\'scb_s_western_blot_gel_tabs\'><div class=\'scb_s_western_blot_gel_tab\'>Gel</div></div><div class=\'scb_s_western_blot_gel_content\'>');
  scb_western_blot.display_western_blot_numbers(null, output);
  output.append('<img class=\'scb_s_western_blot_gel\' src=\'images/western_blot/SCB_WesternBlotting_Gel.png\'><div class=\'scb_s_western_blot_tools\'><a class=\'scb_s_western_blot_run_gel_and_transfer scb_s_navigation_button\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' href="#view=western_blot_gel&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&western_blot_id=', soy.$$escapeHtml(opt_data.western_blot.id), '">Run gel & transfer</a></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_western_blot_numbers = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'scb_s_western_blot_gel_numbers\'><span class=\'scb_s_western_blot_gel_number\'>1</span><span class=\'scb_s_western_blot_gel_number\'>2</span><span class=\'scb_s_western_blot_gel_number\'>3</span><span class=\'scb_s_western_blot_gel_number\'>4</span><span class=\'scb_s_western_blot_gel_number\'>5</span><span class=\'scb_s_western_blot_gel_number\'>6</span><span class=\'scb_s_western_blot_gel_number\'>7</span><span class=\'scb_s_western_blot_gel_number\'>8</span><span class=\'scb_s_western_blot_gel_number\'>9</span><span class=\'scb_s_western_blot_gel_number\'>10</span><span class=\'scb_s_western_blot_gel_number\'>11</span><span class=\'scb_s_western_blot_gel_number\'>12</span><span class=\'scb_s_western_blot_gel_number\'>13</span><span class=\'scb_s_western_blot_gel_number\'>14</span><span class=\'scb_s_western_blot_gel_number\'>15</span></span>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
  if (opt_data.lane.kind == 'existing') {
    var kList271 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen271 = kList271.length;
    for (var kIndex271 = 0; kIndex271 < kListLen271; kIndex271++) {
      var kData271 = kList271[kIndex271];
      output.append('<option value=\'$k\'', (opt_data.lane.lane.kind == kData271) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData271].name), '</option>');
    }
    output.append('<!--<option value=\'whole_cell\'', (opt_data.lane.lane.kind == 'whole_cell') ? 'selected="selected"' : '', '>Whole Cell</option><option value=\'cytoplasm\'', (opt_data.lane.lane.kind == 'cytoplasm') ? 'selected="selected"' : '', '>Cyto</option><option value=\'nuclear\'', (opt_data.lane.lane.kind == 'nuclear') ? 'selected="selected"' : '', '>Nuclear</option>-->');
  } else {
    output.append('<option selected="selected" disabled="disabled">Pick Lysate Type</option>');
    var kList295 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen295 = kList295.length;
    for (var kIndex295 = 0; kIndex295 < kListLen295; kIndex295++) {
      var kData295 = kList295[kIndex295];
      output.append('<option value=\'$k\'>', soy.$$escapeHtml(opt_data.kinds[kData295].name), '</option>');
    }
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_wb_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_progress\'><div class=\'scb_s_western_blot_progress_prefix\'>5</div><div class=\'scb_s_western_blot_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 ', (opt_data.step >= 1) ? 'scb_s_western_blot_progress_selected' : '', '\'>1. Sample Prep</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 ', (opt_data.step >= 2) ? 'scb_s_western_blot_progress_selected' : '', '\'>2. Prepare Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3 ', (opt_data.step >= 3) ? 'scb_s_western_blot_progress_selected' : '', '\'>3. Load Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_4 ', (opt_data.step >= 4) ? 'scb_s_western_blot_progress_selected' : '', '\'>4. Run</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_5 ', (opt_data.step >= 5) ? 'scb_s_western_blot_progress_selected' : '', '\'>5. Transfer</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_6 ', (opt_data.step >= 6) ? 'scb_s_western_blot_progress_selected' : '', '\'>6. Blot</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_7 ', (opt_data.step >= 7) ? 'scb_s_western_blot_progress_selected' : '', '\'>7. Develop</div></div></div>');
  return opt_sb ? '' : output.toString();
};
