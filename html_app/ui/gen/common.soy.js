// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof scb_common == 'undefined') { var scb_common = {}; }


scb_common.assignment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var eid__soy3 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected_id) : (opt_data.experiment) ? soy.$$escapeHtml(opt_data.experiment.id) : '');
  eid__soy3 = eid__soy3.toString();
  var aid__soy12 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.id) : '');
  aid__soy12 = aid__soy12.toString();
  if (opt_data.step > 0) {
    output.append('<div class=\'scb_s_assignment_step\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">', (opt_data.step > 0) ? '<a class=\'scb_s_assignment_step_link\' href=\'#view=assignments\'>ASSIGNMENTS</a><img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>' : '', (opt_data.step > 1 || opt_data.last_step > 1) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 2) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=assignment&assignment_id=' + soy.$$escapeHtml(aid__soy12) + '\'><!--' + ((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected.name) : '-->' + soy.$$escapeHtml(opt_data.assignment_name) + '<!--         ') + ' --></a><img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>' : '');
    if (opt_data.step > 2 || opt_data.last_step > 2) {
      output.append('<a class=\'scb_s_assignment_step_link ', (opt_data.step == 3) ? 'scb_s_assignment_step_link_active' : '', '\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(aid__soy12), '&experiment_id=', soy.$$escapeHtml(eid__soy3), '\'>DESIGN</a><img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'><div class=\'scb_s_assignment_step_experiment_block\'><img class=\'scb_s_assignment_step_experiment_box\' src=\'images/header/exp_name_box.png\' alt=\'\'><div class=\'scb_s_assignment_step_experiment\'><!-- &#8988; --> <!-- ', soy.$$escapeHtml(opt_data.experiment_name), '  --><label class="custom-select"><select onchange="location = this.options[this.selectedIndex].value;">');
      if (opt_data.assignments) {
        var eList56 = opt_data.assignments.selected.experiments.list;
        var eListLen56 = eList56.length;
        for (var eIndex56 = 0; eIndex56 < eListLen56; eIndex56++) {
          var eData56 = eList56[eIndex56];
          output.append('<option value=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(aid__soy12), '&experiment_id=', soy.$$escapeHtml(eData56.id), '\' model_id=\'', soy.$$escapeHtml(aid__soy12), '\' sub_model_id=\'', soy.$$escapeHtml(eid__soy3), '\'', (eid__soy3 == eData56.id) ? 'selected="selected"' : '', '> ', soy.$$escapeHtml(eData56.name), '&nbsp;&nbsp;', (eid__soy3 == eData56.id) ? '&#x25BC;' : '', '</option>');
        }
      } else {
        var eList78 = opt_data.assignment.experiments.list;
        var eListLen78 = eList78.length;
        for (var eIndex78 = 0; eIndex78 < eListLen78; eIndex78++) {
          var eData78 = eList78[eIndex78];
          output.append('<option value=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(aid__soy12), '&experiment_id=', soy.$$escapeHtml(eData78.id), '\' model_id=\'', soy.$$escapeHtml(aid__soy12), '\' sub_model_id=\'', soy.$$escapeHtml(eid__soy3), '\'', (eid__soy3 == eData78.id) ? 'selected="selected"' : '', '> ', soy.$$escapeHtml(eData78.name), '&nbsp;&nbsp;', (eid__soy3 == eData78.id) ? '&#x25BC;' : '', '</option>');
        }
      }
      output.append('<option class=\'scb_s_assignment_step_experiment_new_option\' value=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(aid__soy12), '\' model_id=\'', soy.$$escapeHtml(aid__soy12), '\'>+New Experiment</option></select></label></div><img class=\'scb_s_assignment_step_experiment_line\' src=\'images/header/exp_name_line.png\' alt=\'\'></div>');
    }
    output.append((opt_data.step > 3 || opt_data.last_step > 3) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 4) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=experiment_setup&assignment_id=' + soy.$$escapeHtml(aid__soy12) + '&experiment_id=' + soy.$$escapeHtml(eid__soy3) + '\'>SETUP</a><img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>' : '', (opt_data.step > 4 || opt_data.last_step > 4) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 5) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=select_technique&assignment_id=' + soy.$$escapeHtml(aid__soy12) + '&experiment_id=' + soy.$$escapeHtml(eid__soy3) + '\'>TECHNIQUES</a><img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>' : '', (opt_data.step > 5) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 6) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=' + soy.$$escapeHtml(opt_data.technique_view) + '&assignment_id=' + soy.$$escapeHtml(aid__soy12) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&' + soy.$$escapeHtml(opt_data.technique_param) + '=' + soy.$$escapeHtml(opt_data.technique_id) + '\'>' + soy.$$escapeHtml(opt_data.technique_name) + '</a><img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>' : '', '</div>');
  }
  return opt_sb ? '' : output.toString();
};


scb_common.experiment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_step\'><div class=\'scb_s_experiment_step_horizontal_line_12\'></div><div class=\'scb_s_experiment_step_horizontal_line_23\'></div><div class=\'scb_s_experiment_step_horizontal_line_34\'></div><div class=\'scb_s_experiment_step_horizontal_line_45\'></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 1) ? 'scb_experiment_step_selected' : '', ' ', (opt_data.step > 1) ? 'scb_experiment_step_previous' : '', ' \'><div class=\'scb_s_experiment_step_number\'>1</div></div><div class=\'scb_s_experiment_step_text\'>DESIGN</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 2) ? 'scb_experiment_step_selected' : '', ' ', (opt_data.step > 2) ? 'scb_experiment_step_previous' : '', '\'><div class=\'scb_s_experiment_step_number\'>2</div></div><div class=\'scb_s_experiment_step_text\'>SETUP</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 3) ? 'scb_experiment_step_selected' : '', ' ', (opt_data.step > 3) ? 'scb_experiment_step_previous' : '', '\'><div class=\'scb_s_experiment_step_number\'>3</div></div><div class=\'scb_s_experiment_step_text\'>RUN</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 4) ? 'scb_experiment_step_selected' : '', ' ', (opt_data.step > 4) ? 'scb_experiment_step_previous' : '', '\'><div class=\'scb_s_experiment_step_number\'>4</div></div><div class=\'scb_s_experiment_step_text\'>SELECT TECHNIQUE</div></div><div class="scb_s_experiment_step_div"><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 5) ? 'scb_experiment_step_selected' : '', ' ', (opt_data.step > 5) ? 'scb_experiment_step_previous' : '', '\'><div class=\'scb_s_experiment_step_number\'>5</div></div><div class=\'scb_s_experiment_step_text\'>PERFORM TECHNIQUE</div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_common.format_time_detailed_w_sec = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.seconds != 0) ? ' ' + soy.$$escapeHtml(opt_data.seconds) + ' ' + ((opt_data.seconds > 1) ? 'sec' : 'sec') : '', (opt_data.now) ? '0 min' : '');
  return opt_sb ? '' : output.toString();
};


scb_common.format_time_detailed = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.now) ? '0 sec' : '');
  return opt_sb ? '' : output.toString();
};
