// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_details_view\'>EXPERIMENT SETUP<table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList21 = opt_data.headings;
  var hListLen21 = hList21.length;
  for (var hIndex21 = 0; hIndex21 < hListLen21; hIndex21++) {
    var hData21 = hList21[hIndex21];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData21.kind), '\'>', soy.$$escapeHtml(hData21.title), '</td>');
  }
  output.append('</thead>');
  var rList29 = opt_data.rows;
  var rListLen29 = rList29.length;
  for (var rIndex29 = 0; rIndex29 < rListLen29; rIndex29++) {
    var rData29 = rList29[rIndex29];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment=\'', soy.$$escapeHtml(rData29.id), '\'>');
    var cList33 = rData29.columns;
    var cListLen33 = cList33.length;
    for (var cIndex33 = 0; cIndex33 < cListLen33; cIndex33++) {
      var cData33 = cList33[cIndex33];
      output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(cData33.kind), '\' rowspan="', soy.$$escapeHtml(cData33.rows), '">', (cData33.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData29.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Remove</button>' : '' : soy.$$escapeHtml(cData33.title), '</td>');
    }
    output.append('</tr>');
  }
  output.append((opt_data.kind == 'readwrite') ? '<tr><td colspan="' + soy.$$escapeHtml(opt_data.headings.length) + '"><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog\'>Add</button></td></tr>' : '', '</table>');
  scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  output.append('<br/>', (opt_data.kind == 'readwrite') ? '<a class="scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '">Run Experiment</a><br/><a class="scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">Design Experiment</a>' : '<a class="scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Select technique</a><br/>' + ((opt_data.experiment.setup_finished) ? '<a class="scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">Design Experiment</a>' : '<a class="scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">Setup Experiment</a>'), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList108 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen108 = cell_lineList108.length;
  for (var cell_lineIndex108 = 0; cell_lineIndex108 < cell_lineListLen108; cell_lineIndex108++) {
    var cell_lineData108 = cell_lineList108[cell_lineIndex108];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData108.id), '\'>', soy.$$escapeHtml(cell_lineData108.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList116 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen116 = treatList116.length;
  for (var treatIndex116 = 0; treatIndex116 < treatListLen116; treatIndex116++) {
    var treatData116 = treatList116[treatIndex116];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData116.id), '\'>', soy.$$escapeHtml(treatData116.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList124 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen124 = collectList124.length;
  for (var collectIndex124 = 0; collectIndex124 < collectListLen124; collectIndex124++) {
    var collectData124 = collectList124[collectIndex124];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData124.id), '\'>', soy.$$escapeHtml(collectData124.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};
