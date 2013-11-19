// This file was automatically generated from assignments.soy.
// Please don't edit this file by hand.

if (typeof scb_assignments == 'undefined') { var scb_assignments = {}; }


scb_assignments.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, last_step: opt_data.last_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_assignments_container\'>');
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
    output.append('<div class=\'scb_s_abstract_title\'>', opt_data.assignments.selected.name, '</div><div class=\'scb_s_assignments_slider_header\'><img class = \'scb_s_assignment_header_img_left\' src=\'../../images/homepage/scb_gray_left_arrow_inactive.png\' aria-label=\'Move one section to the left in current assignment\'>');
    var sectionList36 = opt_data.assignments.selected.template.instructions;
    var sectionListLen36 = sectionList36.length;
    for (var sectionIndex36 = 0; sectionIndex36 < sectionListLen36; sectionIndex36++) {
      var sectionData36 = sectionList36[sectionIndex36];
      output.append('<div class=\'scb_assignments_header_link_wrapper scb_s_assignments_slider_overview ', (sectionIndex36 == 0) ? 'scb_assignments_header_link_selected' : '', '\' title=\'', soy.$$escapeHtml(sectionData36[0]), '\' value=\'', soy.$$escapeHtml(sectionData36[0]), '\' aria-atomic=\'true\' >', soy.$$escapeHtml(sectionData36[0]), '</div>');
    }
    output.append('<img class = \'scb_s_assignment_header_img_right\'  src=\'../../images/homepage/scb_gray_right_arrow_active.png\' aria-label=\'Move one section to the right in current assignment\'></div><div class=\'scb_s_assignment_scroll\' aria-live="assertive">');
    var sectionList50 = opt_data.assignments.selected.template.instructions;
    var sectionListLen50 = sectionList50.length;
    for (var sectionIndex50 = 0; sectionIndex50 < sectionListLen50; sectionIndex50++) {
      var sectionData50 = sectionList50[sectionIndex50];
      output.append('<div class=\'scb_s_display_section\' style=\'display:', (sectionIndex50 == 0) ? 'block;' : '', '\' value=\'', soy.$$escapeHtml(sectionData50[0]), '\' aria-labelledby=\'scb_assignments_header_link_selected\'>', sectionData50[1], '</div>');
    }
    output.append('</div><br/><a class="scb_f_open_experiment scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignments.selected.id), '" role=\'button\'> NEW EXPERIMENT &nbsp; <span aria-hidden="true" tabindex="-1">+</span></a>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_assignments.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>Select Your Assignment: <div class="arrow-down"></div></h1><ul role="listbox" aria-label="Assignments"  >');
  var courseList68 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen68 = courseList68.length;
  for (var courseIndex68 = 0; courseIndex68 < courseListLen68; courseIndex68++) {
    var courseData68 = courseList68[courseIndex68];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\'>', soy.$$escapeHtml(courseData68), '</div>');
    var assignmentList72 = opt_data.courses[courseData68];
    var assignmentListLen72 = assignmentList72.length;
    for (var assignmentIndex72 = 0; assignmentIndex72 < assignmentListLen72; assignmentIndex72++) {
      var assignmentData72 = assignmentList72[assignmentIndex72];
      output.append('<li role="listitem" class=\'scb_s_assignments_sidebar_name ', (opt_data.assignments.selected.id == assignmentData72.id) ? 'scb_s_assignments_sidebar_name_selected' : '', '\'   ><a href=\'#view=assignments&assignment_id=', soy.$$escapeHtml(assignmentData72.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData72.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData72.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData72.name), '</a>', (opt_data.assignments.selected.id == assignmentData72.id) ? '<img class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '', '</li>');
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
    var experimentList102 = opt_data.experiments.list;
    var experimentListLen102 = experimentList102.length;
    for (var experimentIndex102 = 0; experimentIndex102 < experimentListLen102; experimentIndex102++) {
      var experimentData102 = experimentList102[experimentIndex102];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData102.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData102.id), '\'>', soy.$$escapeHtml(experimentData102.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
