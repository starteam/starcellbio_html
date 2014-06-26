// This file was automatically generated from instructor_dashboard.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_dashboard == 'undefined') { var scb_instructor_dashboard = {}; }


scb_instructor_dashboard.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_dashboard_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_dashboard_container\' role=\'main\'>');
  scb_instructor_dashboard.display_assignments({assignments: opt_data.assignments, courses: opt_data.courses, sections: ['Current Assignments', 'Assignment Drafts', 'Archived Assignments', 'Public Assignments']}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_dashboard.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_dashboard_sidebar\'><h1 class=\'scb_s_dashboard_sidebar_title\'>Your Assignments: <div class=\'scb_s_dashboard_sidebar_name scb_s_dashboard_button_wrapper\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\' class=" scb_f_dashboard_new_assignment_button scb_s_dashboard_new_assignment_button scb_s_navigation_button" href="#view=course_setup" aria-label=\'New Experiment\' role=\'button\'> Create a New Assignment &nbsp; &#43;</button> <div class="arrow-down-instructor"></div></div>  </h1><table class="scb_s_dashboard_table " aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_dashboard_table_head\' ><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_assignment_name\' >Assignment Name</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_course_name\' >Course Name</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_course_code\' >Code</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_permission\' >Permission</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading  scb_s_dashboard_student_assignment\' >Student <br/> Assignments</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_actions\' >Actions</td></thead><tbody class=\'scb_s_dashboard_table_body\'>');
  var assignmentList25 = opt_data.assignments.list;
  var assignmentListLen25 = assignmentList25.length;
  for (var assignmentIndex25 = 0; assignmentIndex25 < assignmentListLen25; assignmentIndex25++) {
    var assignmentData25 = assignmentList25[assignmentIndex25];
    output.append('<tr class=\'scb_s_dashboard_table_row\' role=\'row\' aria-label=\'Sample\'assignment_id=\'', soy.$$escapeHtml(assignmentData25.id), '\' ><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1">', soy.$$escapeHtml(assignmentData25.name), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1">', soy.$$escapeHtml(assignmentData25.course_name), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1">', soy.$$escapeHtml(assignmentData25.course), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1" >', soy.$$escapeHtml(assignmentData25.permission), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border scb_s_dashboard_student_assignment\' rowspan="1" >0</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1" >Buttons here</td></tr>');
  }
  output.append('</tbody></table><ul aria-label="Assignments"  ><!--<button class="scb_s_dashboard_new_course_button scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignments.selected.id), '" aria-label=\'New Experiment\' role=\'button\'> Create A New Course</button>--><div class=\'scb_s_dashboard_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\' role=\'heading\'>Edit Assignments</div>');
  var assignmentList41 = opt_data.assignments.list;
  var assignmentListLen41 = assignmentList41.length;
  for (var assignmentIndex41 = 0; assignmentIndex41 < assignmentListLen41; assignmentIndex41++) {
    var assignmentData41 = assignmentList41[assignmentIndex41];
    output.append((assignmentData41.permission == 'edit') ? '<li role="link" class=\'scb_s_dashboard_sidebar_name ' + ((opt_data.assignments.selected.id == assignmentData41.id) ? 'scb_s_dashboard_sidebar_name_selected' : '') + '\' aria-selected=\'' + ((opt_data.assignments.selected.id == assignmentData41.id) ? 'true' : 'false') + '\'  ><a role=\'presentation\' href=\'#view=course_setup&assignment_id=' + soy.$$escapeHtml(assignmentData41.id) + '\' model_id=\'' + soy.$$escapeHtml(assignmentData41.id) + '\' class=\'scb_s_assignment_sidebar_link ' + ((assignmentData41.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment') + '\'>' + soy.$$escapeHtml(assignmentData41.name) + '</a>' + ((opt_data.assignments.selected.id == assignmentData41.id) ? '<img role=\'presentation\' class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '') + '</li>' : '');
  }
  output.append('</div><div class=\'scb_s_dashboard_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\' role=\'heading\'>View Assignments</div>');
  var assignmentList73 = opt_data.assignments.list;
  var assignmentListLen73 = assignmentList73.length;
  for (var assignmentIndex73 = 0; assignmentIndex73 < assignmentListLen73; assignmentIndex73++) {
    var assignmentData73 = assignmentList73[assignmentIndex73];
    output.append((assignmentData73.permission == 'view') ? '<li role="link" class=\'scb_s_dashboard_sidebar_name ' + ((opt_data.assignments.selected.id == assignmentData73.id) ? 'scb_s_dashboard_sidebar_name_selected' : '') + '\' aria-selected=\'' + ((opt_data.assignments.selected.id == assignmentData73.id) ? 'true' : 'false') + '\'  ><a role=\'presentation\' href=\'#view=course_setup&assignment_id=' + soy.$$escapeHtml(assignmentData73.id) + '\' model_id=\'' + soy.$$escapeHtml(assignmentData73.id) + '\' class=\'scb_s_assignment_sidebar_link ' + ((assignmentData73.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment') + '\'>' + soy.$$escapeHtml(assignmentData73.name) + '</a>' + ((opt_data.assignments.selected.id == assignmentData73.id) ? '<img role=\'presentation\' class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '') + '</li>' : '');
  }
  output.append('</div></ul></div>');
  return opt_sb ? '' : output.toString();
};
