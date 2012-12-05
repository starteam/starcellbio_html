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
  output.append('<div class=\'scb_s_experiment_setup_table\'>EXPERIMENT SETUP<table class="scb_s_experiment_setup_table"><thead class=\'scb_s_experiment_setup_table_head\'>');
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
      output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(cData27.kind), '\' rowspan="', soy.$$escapeHtml(cData27.rows), '">', soy.$$escapeHtml(cData27.title), '</td>');
    }
    output.append('</tr>');
  }
  output.append('</table>');
  var actionList39 = opt_data.actions;
  var actionListLen39 = actionList39.length;
  for (var actionIndex39 = 0; actionIndex39 < actionListLen39; actionIndex39++) {
    var actionData39 = actionList39[actionIndex39];
    output.append('<button class=\'scb_f_experiment_setup_action\' action=\'', soy.$$escapeHtml(actionData39.kind), '\'>', soy.$$escapeHtml(actionData39.title), '</button>');
  }
  output.append('<br/><a class="scb_f_open_experiment_setup_readonly" href="#view=experiment_setup_readonly&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">Run Experiment</a><br/><a class="scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">Design experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
