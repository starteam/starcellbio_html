// This file was automatically generated from instructor_common.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_common == 'undefined') { var scb_instructor_common = {}; }


scb_instructor_common.assignment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var eid__soy3 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected_id) : (opt_data.experiment) ? soy.$$escapeHtml(opt_data.experiment.id) : '');
  eid__soy3 = eid__soy3.toString();
  var aid__soy11 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.id) : '');
  aid__soy11 = aid__soy11.toString();
  var wbid__soy17 = new soy.StringBuilder((opt_data.assignments && opt_data.assignments.selected.experiments.selected) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.western_blot_list.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.western_blot_list.selected_id) : '');
  wbid__soy17 = wbid__soy17.toString();
  var fid__soy23 = new soy.StringBuilder((opt_data.assignments && opt_data.assignments.selected.experiments.selected) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.facs_list.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.facs_list.selected_id) : '');
  fid__soy23 = fid__soy23.toString();
  var mid__soy29 = new soy.StringBuilder((opt_data.assignments && opt_data.assignments.selected.experiments.selected) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.microscopy_list.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.microscopy_list.selected_id) : '');
  mid__soy29 = mid__soy29.toString();
  output.append('<div class=\'scb_s_instructor_account_title\'>Instructor Account: Problem Set Builder</div>', (opt_data.step > 0) ? '<div class=\'scb_s_assignment_step\' role=\'menu\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html" role=\'navigation\'><a class=\'scb_s_assignment_step_link scb_f_assignments_step_link ' + ((opt_data.step < 2 && opt_data.step > 0) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=dashboard\' aria-label=\'Assignments\' role=\'menuitem\' ><div class=\'scb_s_assignment_step_wrapper\' style=\'position: absolute; left: 29px; bottom: 20px;\' aria-hidden=\'true\'><div class=\'' + ((opt_data.step < 2 && opt_data.step > 0) ? 'scb_s_assignments_link_img_active' : 'scb_s_assignments_link_img ') + '\' role=\'presentation\' ></div>DASHBOARD</div></a></div>' : '');
  return opt_sb ? '' : output.toString();
};


scb_instructor_common.contact_overlay = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'contact_overlay\' role=\'presentation\'></div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_common.format_time_detailed_w_sec = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.days == 0 && opt_data.hours == 0 && opt_data.minutes == 0 && opt_data.seconds == 0) ? '' : ((opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '') + ((opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '') + ((opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '') + ((opt_data.seconds != 0) ? ' ' + soy.$$escapeHtml(opt_data.seconds) + ' ' + ((opt_data.seconds > 1) ? 'sec' : 'sec') : '') + ((opt_data.now) ? '0 sec' : ''));
  return opt_sb ? '' : output.toString();
};


scb_instructor_common.format_time_detailed = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.weeks == 0 && opt_data.months == 0 && opt_data.days == 0 && opt_data.hours == 0 && opt_data.minutes == 0) ? '' : ((opt_data.months != 0) ? ' ' + soy.$$escapeHtml(opt_data.months) + ' ' + ((opt_data.months > 1) ? 'mths' : 'mth') : '') + ((opt_data.weeks != 0) ? ' ' + soy.$$escapeHtml(opt_data.weeks) + ' ' + ((opt_data.weeks > 1) ? 'wks' : 'wk') : '') + ((opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '') + ((opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '') + ((opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '') + ((opt_data.now) ? '0 sec' : ''));
  return opt_sb ? '' : output.toString();
};
