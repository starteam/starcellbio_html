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
    output.append('<tr><td><input type="checkbox" class="scb_f_western_blot_sample_active"></td><td></td><td></td><td></td></tr>');
  }
  output.append('</table></div>');
  return opt_sb ? '' : output.toString();
};
