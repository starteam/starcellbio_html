// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof scb_common == 'undefined') { var scb_common = {}; }


scb_common.assignment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.step > 0) ? '<div class=\'scb_s_assignment_step\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">' + ((opt_data.step > 0) ? '<a class=\'scb_s_assignment_step_link\' href=\'#view=assignments\'>ASSIGNMENTS</a><img src=\'images/header/scb_navigation_arrow.png\'>' : '') + ((opt_data.step > 1) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 2) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=assignment&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '\'>' + soy.$$escapeHtml(opt_data.assignment_name) + '</a><img src=\'images/header/scb_navigation_arrow.png\'>' : '') + ((opt_data.step > 2) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 3) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=experiment_design&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>DESIGN</a><img src=\'images/header/scb_navigation_arrow.png\'><div class=\'scb_s_assignment_step_experiment\' >&#8988; ' + soy.$$escapeHtml(opt_data.experiment_name) + '</div>' : '') + ((opt_data.step > 3) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 4) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=experiment_setup&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SETUP</a><img src=\'images/header/scb_navigation_arrow.png\'>' : '') + ((opt_data.step > 4) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 5) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>TECHNIQUES</a><img src=\'images/header/scb_navigation_arrow.png\'>' : '') + ((opt_data.step > 5) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 6) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=' + soy.$$escapeHtml(opt_data.technique_view) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&' + soy.$$escapeHtml(opt_data.technique_param) + '=' + soy.$$escapeHtml(opt_data.technique_id) + '\'>' + soy.$$escapeHtml(opt_data.technique_name) + '</a><img src=\'images/header/scb_navigation_arrow.png\'>' : '') + '</div>' : '');
  return opt_sb ? '' : output.toString();
};


scb_common.experiment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_step\'><div class=\'scb_s_experiment_step_horizontal_line_12\'></div><div class=\'scb_s_experiment_step_horizontal_line_23\'></div><div class=\'scb_s_experiment_step_horizontal_line_34\'></div><div class=\'scb_s_experiment_step_horizontal_line_45\'></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 1) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>1</div></div><div class=\'scb_s_experiment_step_text\'>DESIGN</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 2) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>2</div></div><div class=\'scb_s_experiment_step_text\'>SETUP</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 3) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>3</div></div><div class=\'scb_s_experiment_step_text\'>RUN</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 4) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>4</div></div><div class=\'scb_s_experiment_step_text\'>SELECT TECHNIQUE</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 5) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>5</div></div><div class=\'scb_s_experiment_step_text\'>PERFORM TECHNIQUE</div></div></div>');
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
