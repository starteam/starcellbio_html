// This file was automatically generated from select_technique.soy.
// Please don't edit this file by hand.

if (typeof scb_select_technique == 'undefined') { var scb_select_technique = {}; }


scb_select_technique.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_view\'>');
  scb_assignments.display_header(opt_data, output);
  scb_select_technique.display_details(opt_data, output);
  scb_assignments.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_select_technique.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_details_view\'><div class=\'scb_s_select_technique_western_blot\'>');
  var wList15 = opt_data.experiment.western_blot_list.list;
  var wListLen15 = wList15.length;
  for (var wIndex15 = 0; wIndex15 < wListLen15; wIndex15++) {
    var wData15 = wList15[wIndex15];
    output.append(soy.$$escapeHtml(wData15.id), '<br>');
  }
  output.append('<a class=\'scb_f_new_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Western Blot</a></div><a class="scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">Run Experiment</a><br/></div>');
  return opt_sb ? '' : output.toString();
};
