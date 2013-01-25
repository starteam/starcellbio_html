// This file was automatically generated from select_technique.soy.
// Please don't edit this file by hand.

if (typeof scb_select_technique == 'undefined') { var scb_select_technique = {}; }


scb_select_technique.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 5, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name}, output);
  scb_select_technique.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_select_technique.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_details_view\'>');
  scb_common.experiment_step({step: 4}, output);
  output.append('<div class=\'scb_s_select_technique_western_blot\'><h1 class=\'scb_s_select_technique_header\'>Available Western Blot:</h1><div class=\'scb_s_select_technique_western_blot_available\'>');
  var wList22 = opt_data.experiment.western_blot_list.list;
  var wListLen22 = wList22.length;
  for (var wIndex22 = 0; wIndex22 < wListLen22; wIndex22++) {
    var wData22 = wList22[wIndex22];
    output.append('<a class=\'scb_f_open_western_blot\' western_blot_id=\'', soy.$$escapeHtml(wData22.id), '\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&western_blot_id=', soy.$$escapeHtml(wData22.id), '\'>', soy.$$escapeHtml(wData22.name), '</a><br>');
  }
  output.append('</div><p>Reminder:<br>A western blot is.... NEED TEXT A western blot is.... NEED TEXT A western blot is.... NEED TEXT A western blot is.... NEED TEXT A western blot is.... NEED TEXT A western blot is.... NEED TEXT A western blot is.... NEED TEXT A western blot is.... NEED TEXT</p><a class=\'scb_s_navigation_button scb_f_new_western_blot \' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Western Blot</a></div><a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">Review set-up</a><br/></div>');
  return opt_sb ? '' : output.toString();
};
