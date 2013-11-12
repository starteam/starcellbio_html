// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof scb_common == 'undefined') { var scb_common = {}; }


scb_common.assignment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var eid__soy3 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected_id) : (opt_data.experiment) ? soy.$$escapeHtml(opt_data.experiment.id) : '');
  eid__soy3 = eid__soy3.toString();
  var aid__soy11 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected_id) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.id) : '');
  aid__soy11 = aid__soy11.toString();
  if (opt_data.step > 0) {
    output.append('<div class=\'scb_s_assignment_step\' xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">', (opt_data.step > 0) ? '<a class=\'scb_s_assignment_step_link\' href=\'#view=assignments\'>ASSIGNMENTS</a><!-- img src=\'images/header/scb_navigation_arrow.png\' alt=\'\' -->' : '', (opt_data.step > 1 || opt_data.last_step > 1) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 2) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=assignment&assignment_id=' + soy.$$escapeHtml(aid__soy11) + '\'><!--' + ((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected.name) : '-->' + soy.$$escapeHtml(opt_data.assignment_name) + '<!--         ') + ' --></a><!--<img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>-->' : '');
    if (opt_data.step > 2 || opt_data.last_step > 2) {
      output.append('<a class=\'scb_s_assignment_step_link ', (opt_data.step == 3) ? 'scb_s_assignment_step_link_active' : '', '\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(aid__soy11), '&experiment_id=', soy.$$escapeHtml(eid__soy3), '\'>DESIGN</a><!--<img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>--><!--<div class=\'scb_s_assignment_step_experiment_block\'><img class=\'scb_s_assignment_step_experiment_box\' src=\'images/header/exp_name_box.png\' alt=\'\'><div class=\'scb_s_assignment_step_experiment\'><!~~ &#8988; ~~> <!~~ ', soy.$$escapeHtml(opt_data.experiment_name), '  ~~><label class="custom-select"><select onchange="location = this.options[this.selectedIndex].value;">');
      if (opt_data.assignments) {
        var eList55 = opt_data.assignments.selected.experiments.list;
        var eListLen55 = eList55.length;
        for (var eIndex55 = 0; eIndex55 < eListLen55; eIndex55++) {
          var eData55 = eList55[eIndex55];
          output.append('<option value=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(aid__soy11), '&experiment_id=', soy.$$escapeHtml(eData55.id), '\' model_id=\'', soy.$$escapeHtml(aid__soy11), '\' sub_model_id=\'', soy.$$escapeHtml(eid__soy3), '\'', (eid__soy3 == eData55.id) ? 'selected="selected"' : '', '> ', soy.$$escapeHtml(eData55.name), '&nbsp;&nbsp;', (eid__soy3 == eData55.id) ? '&#x25BC;' : '', '</option>');
        }
      } else {
        var eList77 = opt_data.assignment.experiments.list;
        var eListLen77 = eList77.length;
        for (var eIndex77 = 0; eIndex77 < eListLen77; eIndex77++) {
          var eData77 = eList77[eIndex77];
          output.append('<option value=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(aid__soy11), '&experiment_id=', soy.$$escapeHtml(eData77.id), '\' model_id=\'', soy.$$escapeHtml(aid__soy11), '\' sub_model_id=\'', soy.$$escapeHtml(eid__soy3), '\'', (eid__soy3 == eData77.id) ? 'selected="selected"' : '', '> ', soy.$$escapeHtml(eData77.name), '&nbsp;&nbsp;', (eid__soy3 == eData77.id) ? '&#x25BC;' : '', '</option>');
        }
      }
      output.append('<option class=\'scb_s_assignment_step_experiment_new_option\' value=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(aid__soy11), '\' model_id=\'', soy.$$escapeHtml(aid__soy11), '\'>+New Experiment</option></select></label></div><img class=\'scb_s_assignment_step_experiment_line\' src=\'images/header/exp_name_line.png\' alt=\'\'></div>-->');
    }
    output.append((opt_data.step > 3 || opt_data.last_step > 3) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 4) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=experiment_setup&assignment_id=' + soy.$$escapeHtml(aid__soy11) + '&experiment_id=' + soy.$$escapeHtml(eid__soy3) + '\'>SETUP</a><!--<img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>-->' : '', (opt_data.step > 4 || opt_data.last_step > 4) ? '<a class=\'scb_s_assignment_step_link ' + ((opt_data.step == 5) ? 'scb_s_assignment_step_link_active' : '') + '\' href=\'#view=select_technique&assignment_id=' + soy.$$escapeHtml(aid__soy11) + '&experiment_id=' + soy.$$escapeHtml(eid__soy3) + '\'>TECHNIQUES</a><!--<img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>-->' : '');
    if (opt_data.step > 5 || opt_data.last_step > 5) {
      var tview__soy127 = new soy.StringBuilder((opt_data.assignments) ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.last_technique_view) : (opt_data.assignment) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.last_technique_view) : (opt_data.experiment) ? soy.$$escapeHtml(opt_data.experiment.last_technique_view) : soy.$$escapeHtml(opt_data.technique_view));
      tview__soy127 = tview__soy127.toString();
      var tname__soy137 = new soy.StringBuilder((tview__soy127 == 'western_blot') ? 'WESTERN BLOT' : (tview__soy127 == 'facs') ? 'FLOW CYTOMETRY' : (tview__soy127 == 'microscopy') ? 'MICROSCOPY' : (! opt_data.technique_param) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.last_technique) : soy.$$escapeHtml(opt_data.technique_name));
      tname__soy137 = tname__soy137.toString();
      var tparam__soy149 = new soy.StringBuilder((tview__soy127 == 'western_blot') ? 'western_blot_id' : (tview__soy127 == 'facs') ? 'facs_id' : (tview__soy127 == 'microscopy') ? 'microscopy_id' : (! opt_data.technique_param) ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.last_param) : soy.$$escapeHtml(opt_data.technique_param));
      tparam__soy149 = tparam__soy149.toString();
      var tid__soy161 = new soy.StringBuilder((opt_data.assignments) ? (tview__soy127 == 'western_blot' || tview__soy127 == 'western_blot_gel') ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.western_blot_list.selected_id) : (tview__soy127 == 'facs') ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.facs_list.selected_id) : (tview__soy127 == 'microscopy') ? soy.$$escapeHtml(opt_data.assignments.selected.experiments.selected.microscopy_list.selected_id) : '' : (opt_data.assignment) ? (tview__soy127 == 'western_blot' || tview__soy127 == 'western_blot_gel') ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.western_blot_list.selected_id) : (tview__soy127 == 'facs') ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.facs_list.selected_id) : (tview__soy127 == 'microscopy') ? soy.$$escapeHtml(opt_data.assignment.experiments.selected.microscopy_list.selected_id) : '' : (opt_data.experiment) ? (tview__soy127 == 'western_blot' || tview__soy127 == 'western_blot_gel') ? soy.$$escapeHtml(opt_data.experiment.western_blot_list.selected_id) : (tview__soy127 == 'facs') ? soy.$$escapeHtml(opt_data.experiment.facs_list.selected_id) : (tview__soy127 == 'microscopy') ? soy.$$escapeHtml(opt_data.experiment.microscopy_list.selected_id) : '' : soy.$$escapeHtml(opt_data.technique_id));
      tid__soy161 = tid__soy161.toString();
      output.append('<a class=\'scb_s_assignment_step_link ', (opt_data.step == 6) ? 'scb_s_assignment_step_link_active' : '', '\' href=\'#view=', soy.$$escapeHtml(tview__soy127), '&assignment_id=', soy.$$escapeHtml(aid__soy11), '&experiment_id=', soy.$$escapeHtml(eid__soy3), '&', soy.$$escapeHtml(tparam__soy149), '=', soy.$$escapeHtml(tid__soy161), '\'>', soy.$$escapeHtml(tname__soy137), '</a><!--<img src=\'images/header/scb_navigation_arrow.png\' alt=\'\'>-->');
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};


scb_common.experiment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_step\'><a class="scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '"> NEW EXPERIMENT &nbsp; <span aria-hidden="true" tabindex="-1">+</span></a><div class = \'scb_s_experiment_step_progress_label\'> ', soy.$$escapeHtml(opt_data.assignment.name), ':</div><div class=\'scb_s_assignment_step_experiment\'><label class="custom-select"><select onchange="location = this.value;">');
  var eList213 = opt_data.assignment.experiments.list;
  var eListLen213 = eList213.length;
  for (var eIndex213 = 0; eIndex213 < eListLen213; eIndex213++) {
    var eData213 = eList213[eIndex213];
    output.append('<option value=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(eData213.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.experiment.id == eData213.id) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(eData213.name), '&nbsp;&nbsp;<!-- \t\t\t\t\t\t\t\t', (opt_data.experiment.id == eData213.id) ? '&#x25BC;' : '', ' --></option>');
  }
  output.append('</select></label></div><br/><br/><div class="scb_s_experiment_step_div "><div class=\'scb_s_experiment_step_main_steps \'><div class=\'scb_s_experiment_step_labels\'><div class=\'scb_s_experiment_step_text scb_s_experiment_step_design ', (opt_data.step == 1) ? 'scb_s_experiment_step_selected' : '', '\'><a href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '\'>DESIGN</a>', (opt_data.step == 1) ? '<div class="arrow-down-design"></div>' : '', '</div><div class=\'scb_s_experiment_step_text scb_s_experiment_step_setup_and_run ', (opt_data.step == 2 || opt_data.step == 3) ? 'scb_s_experiment_step_selected' : '', '\'><a href=\'#view=experiment_setup&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '\'>SETUP & RUN</a>', (opt_data.step == 2 || opt_data.step == 3) ? '<div class="arrow-down-setup"></div>' : '', '</div><div class=\'scb_s_experiment_step_text scb_s_experiment_step_select_technique ', (opt_data.step >= 3) ? 'scb_s_experiment_step_selected' : '', '\'><a href=\'#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '\'>SELECT TECHNIQUE</a>', (opt_data.step >= 3) ? '<div class="arrow-down-select"></div>' : '', '</div></div></div><div class=\'scb_s_experiment_step_tech_steps \'><div class=\'scb_s_experiment_step_buttons_title\'>Select Your Technique: </div><div class=\'scb_s_experiment_step_button scb_s_experiment_step_button_wb ', (opt_data.step == 5) ? 'scb_s_experiment_step_selected' : '', '\'>Western Blotting</div><div class=\' scb_s_experiment_step_button scb_s_experiment_step_button_facs ', (opt_data.step == 6) ? 'scb_s_experiment_step_selected' : '', '\'>Flow Cytometry</div><div class=\'scb_s_experiment_step_button scb_s_experiment_step_button_micro ', (opt_data.step == 7) ? 'scb_s_experiment_step_selected' : '', '\'>Microscopy</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_common.format_time_detailed_w_sec = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.seconds != 0) ? ' ' + soy.$$escapeHtml(opt_data.seconds) + ' ' + ((opt_data.seconds > 1) ? 'sec' : 'sec') : '', (opt_data.now) ? '0 sec' : '');
  return opt_sb ? '' : output.toString();
};


scb_common.format_time_detailed = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.days != 0) ? ' ' + soy.$$escapeHtml(opt_data.days) + ' ' + ((opt_data.days > 1) ? 'd' : 'd') : '', (opt_data.hours != 0) ? ' ' + soy.$$escapeHtml(opt_data.hours) + ' ' + ((opt_data.hours > 1) ? 'h' : 'h') : '', (opt_data.minutes != 0) ? ' ' + soy.$$escapeHtml(opt_data.minutes) + ' ' + ((opt_data.minutes > 1) ? 'min' : 'min') : '', (opt_data.now) ? '0 sec' : '');
  return opt_sb ? '' : output.toString();
};
