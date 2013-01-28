// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof scb_common == 'undefined') { var scb_common = {}; }


scb_common.assignment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.step > 0) ? '<div class=\'scb_s_assignment_step\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">' + ((opt_data.step > 0) ? '<a href=\'#view=assignments\'>ASSIGNMENTS</a>' : '') + ((opt_data.step > 1) ? '&gt;<a href=\'#view=assignment&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '\'>' + soy.$$escapeHtml(opt_data.assignment_name) + '</a>' : '') + ((opt_data.step > 2) ? '&gt;<a href=\'#view=experiment_design&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>DESIGN</a><div class=\'scb_s_assignment_step_experiment\' >&#8988; ' + soy.$$escapeHtml(opt_data.experiment_name) + '</div>' : '') + ((opt_data.step > 3) ? '&gt;<a href=\'#view=experiment_setup&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SETUP</a>' : '') + ((opt_data.step > 4) ? '&gt;<a href=\'#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>TECHNIQUES</a>' : '') + ((opt_data.step > 5) ? '&gt;<a href=\'#view=' + soy.$$escapeHtml(opt_data.technique_view) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&' + soy.$$escapeHtml(opt_data.technique_param) + '=' + soy.$$escapeHtml(opt_data.technique_id) + '\'>' + soy.$$escapeHtml(opt_data.technique_name) + '</a>' : '') + '</div>' : '');
  return opt_sb ? '' : output.toString();
};


scb_common.experiment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_step\'><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 1) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>1</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 2) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>2</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 3) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>3</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 4) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>4</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 5) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>5</div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_common.format_time_detailed_w_sec = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t', (opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.seconds != 0) ? ' ' + soy.$$escapeHtml(opt_data.seconds) + ' ' + ((opt_data.seconds > 1) ? 'sec' : 'sec') : '', (opt_data.now) ? '0 min' : '');
  return opt_sb ? '' : output.toString();
};


scb_common.format_time_detailed = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t', (opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.now) ? '0 sec' : '');
  return opt_sb ? '' : output.toString();
};
