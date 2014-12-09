// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_assignments_container\' role=\'main\'>');
  scb_assignments.display_assignments(opt_data, output);
  scb_assignments.display_assignment(opt_data, output);
  output.append('</div>');
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_header\'>', soy.$$escapeHtml(opt_data.global_template.app_title), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_footer\'>Here comes footer</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_abstract scb_s_assignments_description\'>');
  if (opt_data.assignments.selected != null) {
    output.append('<div class=\'scb_s_abstract_title\'>', opt_data.assignments.selected.name, '</div><div class=\'scb_s_assignments_slider_header\'><div class = \'scb_s_assignment_header_img_left scb_s_assignment_header_img_left_inactive\'  assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\'  role=\'button\' aria-label=\'Previous Section\'></div>');
    var sectionList39 = opt_data.assignments.selected.template.instructions;
    var sectionListLen39 = sectionList39.length;
    for (var sectionIndex39 = 0; sectionIndex39 < sectionListLen39; sectionIndex39++) {
      var sectionData39 = sectionList39[sectionIndex39];
      output.append('<div class=\'scb_assignments_header_link_wrapper scb_s_assignments_slider_overview ', (sectionIndex39 == opt_data.assignments.selected.last_instruction) ? 'scb_assignments_header_link_selected' : '', '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\' role=\'link\' title=\'', soy.$$escapeHtml(sectionData39[0]), '\'   value=\'', soy.$$escapeHtml(sectionData39[0]), '\' aria-controls=\'scb_s_assignment_scroll\' aria-atomic=\'true\' ><span>', soy.$$escapeHtml(sectionData39[0]), '</span>', (sectionIndex39 == opt_data.assignments.selected.last_instruction) ? '<div class="arrow-down-blue"></div>' : '', '</div>');
    }
    output.append('<div class = \'scb_s_assignment_header_img_right \'  assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\' role=\'button\' aria-label=\'Next Section\' ></div></div><div class=\'scb_s_assignments_gray_bar\'></div><div class=\'scb_s_assignment_scroll\' id =\'scb_s_assignment_scroll\'  aria-live="assertive">');
    var sectionList61 = opt_data.assignments.selected.template.instructions;
    var sectionListLen61 = sectionList61.length;
    for (var sectionIndex61 = 0; sectionIndex61 < sectionListLen61; sectionIndex61++) {
      var sectionData61 = sectionList61[sectionIndex61];
      output.append('<div class=\'scb_s_display_section\' style=\'display:', (sectionIndex61 == opt_data.assignments.selected.last_instruction) ? 'block;' : '', '\' value=\'', soy.$$escapeHtml(sectionData61[0]), '\' >', sectionData61[1], '</div>');
    }
    output.append('<div class=\'scb_s_assignments_bottom_scroll\'><div class = \'scb_s_assignment_header_img_left scb_assignments_bottom_arrow_left scb_s_assignment_header_img_left_inactive\'  assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\'   role=\'button\' aria-label=\'Previous Section\'></div><div class=\'scb_s_assignments_button_divider\'></div><div class = \'scb_s_assignment_header_img_right scb_assignments_bottom_arrow_right\'  assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\'  role=\'button\' aria-label=\'Next Section\'></div></div></div><br/>', (opt_data.assignments.selected.id == 'decusability' || opt_data.assignments.selected.id == 'scb_ex1') ? '<span class=" scb_s_assignments_print_assignment scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected.id) + '" id="' + soy.$$escapeHtml(opt_data.assignments.selected.id) + '" aria-label=\'New Experiment\' role=\'button\'></span>' : '', '<span class="scb_assignments_new_experiment scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignments.selected.id), '" aria-label=\'New Experiment\' role=\'button\'> START EXPERIMENTS &nbsp; &#9654;</span>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>Assignments: <div class="arrow-down"></div></h1><ul aria-label="Assignments"  >');
  var courseList91 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen91 = courseList91.length;
  for (var courseIndex91 = 0; courseIndex91 < courseListLen91; courseIndex91++) {
    var courseData91 = courseList91[courseIndex91];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\' role=\'heading\'>', soy.$$escapeHtml(opt_data.courses[courseData91].name), '</div>');
    var assignmentList95 = opt_data.courses[courseData91];
    var assignmentListLen95 = assignmentList95.length;
    for (var assignmentIndex95 = 0; assignmentIndex95 < assignmentListLen95; assignmentIndex95++) {
      var assignmentData95 = assignmentList95[assignmentIndex95];
      output.append('<li role="link" class=\'scb_s_assignments_sidebar_name ', (opt_data.assignments.selected.id == assignmentData95.id) ? 'scb_s_assignments_sidebar_name_selected' : '', '\' aria-selected=\'', (opt_data.assignments.selected.id == assignmentData95.id) ? 'true' : 'false', '\'  ><a role=\'presentation\' href=\'#view=assignments&assignment_id=', soy.$$escapeHtml(assignmentData95.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData95.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData95.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData95.name), '</a>', (opt_data.assignments.selected.id == assignmentData95.id) ? '<img role=\'presentation\' class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '', '</li>');
    }
    output.append('</div>');
  }
  output.append('</ul></div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList131 = opt_data.experiments.list;
    var experimentListLen131 = experimentList131.length;
    for (var experimentIndex131 = 0; experimentIndex131 < experimentListLen131; experimentIndex131++) {
      var experimentData131 = experimentList131[experimentIndex131];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData131.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData131.id), '\'>', soy.$$escapeHtml(experimentData131.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
