// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 4, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_details_view\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2}, output);
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'>THIS NEEDS A BIT MORE THINKING!<input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind">Create new set-up</input><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind">Select pre-existing set-up as a template</input><select class=\'scb_s_experiment_setup_choose_template_id\'><option>Experiment 1</option><option>Experiment 1</option></select></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
  }
  output.append('<table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList36 = opt_data.headings;
  var hListLen36 = hList36.length;
  for (var hIndex36 = 0; hIndex36 < hListLen36; hIndex36++) {
    var hData36 = hList36[hIndex36];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData36.kind), '\'>', soy.$$escapeHtml(hData36.title), '</td>');
  }
  output.append('</thead>');
  var rList44 = opt_data.rows;
  var rListLen44 = rList44.length;
  for (var rIndex44 = 0; rIndex44 < rListLen44; rIndex44++) {
    var rData44 = rList44[rIndex44];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment=\'', soy.$$escapeHtml(rData44.id), '\'>');
    var cList48 = rData44.columns;
    var cListLen48 = cList48.length;
    for (var cIndex48 = 0; cIndex48 < cListLen48; cIndex48++) {
      var cData48 = cList48[cIndex48];
      output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(cData48.kind), '\' rowspan="', soy.$$escapeHtml(cData48.rows), '">', (cData48.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData44.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Remove</button>' : '' : soy.$$escapeHtml(cData48.title), '</td>');
    }
    output.append('</tr>');
  }
  output.append((opt_data.kind == 'readwrite') ? '<tr><td colspan="' + soy.$$escapeHtml(opt_data.headings.length) + '"><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog\'>Add multiple rows</button></td></tr>' : '', '</table>');
  scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  output.append('<br/>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '">Run Experiment &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; Design</a>' : '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>Confirm set-up & Select technique &#9654;</a><br/>' + ((opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; Design</a>' : '<a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; Edit Set-up</a>'), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList123 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen123 = cell_lineList123.length;
  for (var cell_lineIndex123 = 0; cell_lineIndex123 < cell_lineListLen123; cell_lineIndex123++) {
    var cell_lineData123 = cell_lineList123[cell_lineIndex123];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData123.id), '\'>', soy.$$escapeHtml(cell_lineData123.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList131 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen131 = treatList131.length;
  for (var treatIndex131 = 0; treatIndex131 < treatListLen131; treatIndex131++) {
    var treatData131 = treatList131[treatIndex131];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData131.id), '\'>', soy.$$escapeHtml(treatData131.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList139 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen139 = collectList139.length;
  for (var collectIndex139 = 0; collectIndex139 < collectListLen139; collectIndex139++) {
    var collectData139 = collectList139[collectIndex139];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData139.id), '\'>', soy.$$escapeHtml(collectData139.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};
