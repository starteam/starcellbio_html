// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_assignments.display_header(opt_data, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_assignments.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>EXPERIMENT SETUP<table class="scb_s_experiment_setup_table"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList15 = opt_data.headings;
  var hListLen15 = hList15.length;
  for (var hIndex15 = 0; hIndex15 < hListLen15; hIndex15++) {
    var hData15 = hList15[hIndex15];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData15.kind), '\'>', soy.$$escapeHtml(hData15.title), '</td>');
  }
  output.append('</thead>');
  var rList23 = opt_data.rows;
  var rListLen23 = rList23.length;
  for (var rIndex23 = 0; rIndex23 < rListLen23; rIndex23++) {
    var rData23 = rList23[rIndex23];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment=\'', soy.$$escapeHtml(rData23.id), '\'>');
    var cList27 = rData23.columns;
    var cListLen27 = cList27.length;
    for (var cIndex27 = 0; cIndex27 < cListLen27; cIndex27++) {
      var cData27 = cList27[cIndex27];
      output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(cData27.kind), '\' rowspan="', soy.$$escapeHtml(cData27.rows), '">', (cData27.kind == 'actions') ? '<button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData23.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Remove</button>' : soy.$$escapeHtml(cData27.title), '</td>');
    }
    output.append('</tr>');
  }
  output.append('<tr><td colspan="', soy.$$escapeHtml(opt_data.headings.length), '" ><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog\'>Add</button></td></tr></table>');
  scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  output.append('<br/><a class="scb_f_open_experiment_setup_readonly" href="#view=experiment_setup_readonly&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">Run Experiment</a><br/><a class="scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">Design Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList70 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen70 = cell_lineList70.length;
  for (var cell_lineIndex70 = 0; cell_lineIndex70 < cell_lineListLen70; cell_lineIndex70++) {
    var cell_lineData70 = cell_lineList70[cell_lineIndex70];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData70.id), '\'>', soy.$$escapeHtml(cell_lineData70.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList78 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen78 = treatList78.length;
  for (var treatIndex78 = 0; treatIndex78 < treatListLen78; treatIndex78++) {
    var treatData78 = treatList78[treatIndex78];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData78.id), '\'>', soy.$$escapeHtml(treatData78.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList86 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen86 = collectList86.length;
  for (var collectIndex86 = 0; collectIndex86 < collectListLen86; collectIndex86++) {
    var collectData86 = collectList86[collectIndex86];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData86.id), '\'>', soy.$$escapeHtml(collectData86.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};
