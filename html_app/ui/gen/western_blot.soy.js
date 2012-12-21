// This file was automatically generated from western_blot.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot == 'undefined') { var scb_western_blot = {}; }


scb_western_blot.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\'>');
  scb_assignments.display_header(opt_data, output);
  scb_western_blot.display_details(opt_data, output);
  scb_assignments.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_western_blot_details_view\'>');
  scb_western_blot.display_tabs(opt_data, output);
  output.append('<a class="scb_f_open_select_technique" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>Select technique</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_tabs\'>');
  var wbList33 = opt_data.experiment.western_blot_list.list;
  var wbListLen33 = wbList33.length;
  for (var wbIndex33 = 0; wbIndex33 < wbListLen33; wbIndex33++) {
    var wbData33 = wbList33[wbIndex33];
    output.append((opt_data.western_blot.id == wbData33.id) ? '<span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData33.id) + '\'>' + soy.$$escapeHtml(wbData33.name) + '</span> <button class=\'scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData33.id) + '\'>X</button>' : '<a class=\'scb_f_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData33.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData33.id) + '\'>' + soy.$$escapeHtml(wbData33.name) + '</a>');
  }
  output.append('</div><div class=\'scb_s_western_blot_samples_table\'><table><thead><td>Select</td><td>Samples</td><td>Lysate type</td><td>Action</td></thead>');
  var rList57 = opt_data.rows;
  var rListLen57 = rList57.length;
  for (var rIndex57 = 0; rIndex57 < rListLen57; rIndex57++) {
    var rData57 = rList57[rIndex57];
    output.append('<tr><td>', (rData57.display_sample) ? '<input type="checkbox" class="scb_f_western_blot_sample_active" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>' : '', '</td><td>', (rData57.display_sample) ? soy.$$escapeHtml(rData57.cell_treatment.name) : '', '</td><td>');
    scb_western_blot.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, western_blot: opt_data.western_blot, cell_treatment: rData57.cell_treatment, lane: rData57}, output);
    output.append('</td><td>', (rData57.kind == 'existing') ? '<button class="scb_f_western_blot_sample_remove" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData57.lane.id) + '\'>X</button>' : '', '</td></tr>');
  }
  output.append('</table></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '">', (opt_data.lane.kind == 'existing') ? '<option value=\'whole_cell\' ' + ((opt_data.lane.lane.kind == 'whole_cell') ? 'selected="selected"' : '') + '>Whole Cell</option><option value=\'cytoplasm\' ' + ((opt_data.lane.lane.kind == 'cytoplasm') ? 'selected="selected"' : '') + '>Cyto</option><option value=\'nuclear\' ' + ((opt_data.lane.lane.kind == 'nuclear') ? 'selected="selected"' : '') + '>Nuclear</option>' : '<option selected="selected" disabled="disabled">Pick Lysate Type</option><option value=\'whole_cell\'>Whole Cell</option><option value=\'cytoplasm\'>Cyto</option><option value=\'nuclear\'>Nuclear</option>', '</select>');
  return opt_sb ? '' : output.toString();
};
