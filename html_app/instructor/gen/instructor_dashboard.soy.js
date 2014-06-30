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
  output.append('<div class=\'scb_s_dashboard_sidebar\'><h1 class=\'scb_s_dashboard_sidebar_title\'>Your Assignments: <div class=\'scb_s_dashboard_sidebar_name scb_s_dashboard_button_wrapper\'></div>  </h1><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignments.selected.id), '\' class=" scb_f_dashboard_new_assignment_button scb_s_dashboard_new_assignment_button scb_s_navigation_button" href="#view=course_setup" aria-label=\'New Experiment\' role=\'button\'> Create a New Assignment &nbsp; &#43;</button><table class="scb_s_dashboard_table " aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_dashboard_table_head\' ><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_assignment_name \' >Assignment Name</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_course_name \' >Course Name</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_course_code \' >Course Code</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_permission \' >Permission</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading  scb_s_dashboard_student_assignment \' >Student <br/> Assignments</td><td role=\'columnheader\'  class=\'scb_s_dashboard_table_heading scb_s_dashboard_actions \' colspan=\'3\' >Actions</td></thead><tbody class=\'scb_s_dashboard_table_body\'>');
  var assignmentList25 = opt_data.assignments.list;
  var assignmentListLen25 = assignmentList25.length;
  for (var assignmentIndex25 = 0; assignmentIndex25 < assignmentListLen25; assignmentIndex25++) {
    var assignmentData25 = assignmentList25[assignmentIndex25];
    output.append('<tr class=\'scb_s_dashboard_table_row\' role=\'row\' aria-label=\'Sample\'assignment_id=\'', soy.$$escapeHtml(assignmentData25.id), '\' ><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1">', soy.$$escapeHtml(assignmentData25.name), '<br/>', (assignmentData25.operation == 'view') ? '<a class=\'scb_s_dashboard_link\' href=\'#view=course_setup\'>View</a>' : '<a class=\'scb_s_dashboard_link\' href=\'#view=course_setup\'>Edit</a>', '<span class=\'scb_s_dashboard_link\'  > | Preview</span></td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1">', soy.$$escapeHtml(assignmentData25.course_name), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1">', soy.$$escapeHtml(assignmentData25.course), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border\' rowspan="1" >', soy.$$escapeHtml(assignmentData25.permission), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border scb_s_dashboard_student_assignment\' rowspan="1" >', soy.$$escapeHtml(assignmentData25.students), '</td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border scb_s_dashboard_trash\'  ><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_dashboard_remove_assignment\' assignment_id=\'', soy.$$escapeHtml(assignmentData25.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border scb_s_dashboard_copy\' ><button role=\'button\' aria-label=\'Copy\'  class=\'scb_f_dashboard_duplicate_assignment scb_s_dashboard_duplicate_assignment\' assignment_id=\'', soy.$$escapeHtml(assignmentData25.id), '\' ><img alt="" title="Copy" role=\'presentation\' src="images/setup/scb_copy.png"></button></td><td class=\'scb_s_dashboard_table_element scb_s_dashboard_table_border scb_s_dashboard_actions scb_s_dashboard_archive\' ></td></tr>');
  }
  output.append('</tbody></table></div>');
  return opt_sb ? '' : output.toString();
};
