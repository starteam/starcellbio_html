// This file was automatically generated from instructor_dashboard.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_dashboard == 'undefined') { var scb_instructor_dashboard = {}; }


scb_instructor_dashboard.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_dashboard_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_dashboard_container\' role=\'main\'>');
  scb_instructor_dashboard.display_assignments({assignments: opt_data.assignments, courses: opt_data.courses, sections: ['Current Assignments', 'Assignment Drafts', 'Archived Assignments', 'Public Assignments']}, output);
  output.append('</div>');
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_dashboard.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_dashboard_sidebar\'><h1 class=\'scb_s_dashboard_sidebar_title\'>Your Assignments: <div class="arrow-down"></div></h1><ul aria-label="Assignments"  ><!--<button class="scb_s_dashboard_new_course_button scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignments.selected.id), '" aria-label=\'New Experiment\' role=\'button\'> Create A New Course</button>--><div class=\'scb_s_dashboard_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\' role=\'heading\'>Edit Assignments</div><div class=\'scb_s_dashboard_sidebar_name scb_s_dashboard_button_wrapper\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\' class=" scb_f_dashboard_new_assignment_button scb_s_dashboard_new_assignment_button scb_s_navigation_button" href="#view=course_setup" aria-label=\'New Experiment\' role=\'button\'> Create a New Assignment</button></div>');
  var assignmentList27 = opt_data.assignments.list;
  var assignmentListLen27 = assignmentList27.length;
  for (var assignmentIndex27 = 0; assignmentIndex27 < assignmentListLen27; assignmentIndex27++) {
    var assignmentData27 = assignmentList27[assignmentIndex27];
    output.append((assignmentData27.permission == 'edit') ? '<li role="link" class=\'scb_s_dashboard_sidebar_name ' + ((opt_data.assignments.selected.id == assignmentData27.id) ? 'scb_s_dashboard_sidebar_name_selected' : '') + '\' aria-selected=\'' + ((opt_data.assignments.selected.id == assignmentData27.id) ? 'true' : 'false') + '\'  ><a role=\'presentation\' href=\'#view=course_setup&assignment_id=' + soy.$$escapeHtml(assignmentData27.id) + '\' model_id=\'' + soy.$$escapeHtml(assignmentData27.id) + '\' class=\'scb_s_assignment_sidebar_link ' + ((assignmentData27.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment') + '\'>' + soy.$$escapeHtml(assignmentData27.name) + '</a>' + ((opt_data.assignments.selected.id == assignmentData27.id) ? '<img role=\'presentation\' class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '') + '</li>' : '');
  }
  output.append('</div><div class=\'scb_s_dashboard_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\' role=\'heading\'>View Assignments</div>');
  var assignmentList59 = opt_data.assignments.list;
  var assignmentListLen59 = assignmentList59.length;
  for (var assignmentIndex59 = 0; assignmentIndex59 < assignmentListLen59; assignmentIndex59++) {
    var assignmentData59 = assignmentList59[assignmentIndex59];
    output.append((assignmentData59.permission == 'view') ? '<li role="link" class=\'scb_s_dashboard_sidebar_name ' + ((opt_data.assignments.selected.id == assignmentData59.id) ? 'scb_s_dashboard_sidebar_name_selected' : '') + '\' aria-selected=\'' + ((opt_data.assignments.selected.id == assignmentData59.id) ? 'true' : 'false') + '\'  ><a role=\'presentation\' href=\'#view=course_setup&assignment_id=' + soy.$$escapeHtml(assignmentData59.id) + '\' model_id=\'' + soy.$$escapeHtml(assignmentData59.id) + '\' class=\'scb_s_assignment_sidebar_link ' + ((assignmentData59.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment') + '\'>' + soy.$$escapeHtml(assignmentData59.name) + '</a>' + ((opt_data.assignments.selected.id == assignmentData59.id) ? '<img role=\'presentation\' class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '') + '</li>' : '');
  }
  output.append('</div></ul></div>');
  return opt_sb ? '' : output.toString();
};
