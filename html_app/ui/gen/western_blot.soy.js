// This file was automatically generated from western_blot.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot == 'undefined') { var scb_western_blot = {}; }


scb_western_blot.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\'>');
  scb_homepage.display_header(opt_data, output);
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
  output.append('<div class=\'scb_s_western_blot_tabs\'>');
  var wbList37 = opt_data.experiment.western_blot_list.list;
  var wbListLen37 = wbList37.length;
  for (var wbIndex37 = 0; wbIndex37 < wbListLen37; wbIndex37++) {
    var wbData37 = wbList37[wbIndex37];
    output.append((opt_data.western_blot.id == wbData37.id) ? '<span class=\'scb_s_western_blot_active\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData37.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData37.name) + '</span><button class=\'scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData37.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>X</button></span>' : '<a class=\'scb_f_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData37.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData37.id) + '\'>' + soy.$$escapeHtml(wbData37.name) + '</a>');
  }
  output.append('</div><div class=\'scb_s_western_blot_tab_content\'>');
  if (opt_data.kind == 'sample_prep') {
    scb_western_blot.display_wb_progress({step: 1}, output);
    output.append('<div class=\'scb_s_western_blot_samples_table\'><table><thead><td>Select</td><td>Samples</td><td>Lysate type</td><td>Action</td></thead>');
    var rList74 = opt_data.rows;
    var rListLen74 = rList74.length;
    for (var rIndex74 = 0; rIndex74 < rListLen74; rIndex74++) {
      var rData74 = rList74[rIndex74];
      output.append('<tr><td>', (rData74.display_sample) ? '<input type="checkbox" class="scb_f_western_blot_sample_active" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData74.cell_treatment.id) + '\'' + ((rData74.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td>', (rData74.display_sample) ? soy.$$escapeHtml(rData74.cell_treatment.name) : '', '</td><td>');
      scb_western_blot.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, western_blot: opt_data.western_blot, cell_treatment: rData74.cell_treatment, lane: rData74}, output);
      output.append('</td><td>', (rData74.kind == 'existing') ? '<button class="scb_f_western_blot_sample_remove" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData74.lane.id) + '\'' + ((rData74.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '', '</td></tr>');
    }
    output.append('</table><a class=\'scb_s_navigation_button scb_f_western_blot_prepare_lysates\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> Prepare lysates</a></div>');
  }
  if (opt_data.kind == 'prepare_gel') {
    scb_western_blot.display_wb_progress({step: 2}, output);
    output.append('<div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'>1) Choose Gel Type:<input type="checkbox" name="gel_type" value=".10" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>10%</input><input type="checkbox" name="gel_type" value=".12" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>12%</input><input type="checkbox" name="gel_type" value=".15" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>15%</input></div><div class=\'scb_s_western_blot_choose_samples_note\'>NOTE: You can reorder samples by dragging and dropping into new order</div><div class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list\'>');
    var rList156 = opt_data.rows;
    var rListLen156 = rList156.length;
    for (var rIndex156 = 0; rIndex156 < rListLen156; rIndex156++) {
      var rData156 = rList156[rIndex156];
      output.append((rData156.display_sample) ? '<li>' + soy.$$escapeHtml(rData156.cell_treatment.name) + ' -' + soy.$$escapeHtml(rData156.lane.kind) + '</li>' : '');
    }
    output.append('</ol></div><button class=\'scb_s_western_blot_load_marker\'>Load Marker</div><div class=\'scb_s_western_blot_samples_gel_area\'>Here comes gel stuff<a class=\'scb_s_western_blot_run_gel_and_transfer scb_s_navigation_button\' href="#">Run gel & transfer</a></div></div>');
  }
  if (opt_data.kind == 'load_gel') {
    scb_western_blot.display_wb_progress({step: 3}, output);
    output.append('LYSATE PREPARED!');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>', (opt_data.lane.kind == 'existing') ? '<option value=\'whole_cell\'' + ((opt_data.lane.lane.kind == 'whole_cell') ? 'selected="selected"' : '') + '>Whole Cell</option><option value=\'cytoplasm\'' + ((opt_data.lane.lane.kind == 'cytoplasm') ? 'selected="selected"' : '') + '>Cyto</option><option value=\'nuclear\'' + ((opt_data.lane.lane.kind == 'nuclear') ? 'selected="selected"' : '') + '>Nuclear</option>' : '<option selected="selected" disabled="disabled">Pick Lysate Type</option><option value=\'whole_cell\'>Whole Cell</option><option value=\'cytoplasm\'>Cyto</option><option value=\'nuclear\'>Nuclear</option>', '</select>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_wb_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_progress\'><div class=\'scb_s_western_blot_progress_prefix\'>5</div><div class=\'scb_s_western_blot_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 ', (opt_data.step >= 1) ? 'scb_s_western_blot_progress_selected' : '', '\'>1. Sample Prep</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 ', (opt_data.step >= 2) ? 'scb_s_western_blot_progress_selected' : '', '\'>2. Prepare Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3 ', (opt_data.step >= 3) ? 'scb_s_western_blot_progress_selected' : '', '\'>3. Load Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_4 ', (opt_data.step >= 4) ? 'scb_s_western_blot_progress_selected' : '', '\'>4. Run</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_5 ', (opt_data.step >= 5) ? 'scb_s_western_blot_progress_selected' : '', '\'>5. Transfer</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_6 ', (opt_data.step >= 6) ? 'scb_s_western_blot_progress_selected' : '', '\'>6. Blot</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_7 ', (opt_data.step >= 7) ? 'scb_s_western_blot_progress_selected' : '', '\'>7. Develop</div></div></div>');
  return opt_sb ? '' : output.toString();
};
