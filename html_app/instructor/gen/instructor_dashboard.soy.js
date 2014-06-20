// This file was automatically generated from instructor_dashboard.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_dashboard == 'undefined') { var scb_instructor_dashboard = {}; }


scb_instructor_dashboard.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_dashboard_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_dashboard_container\' role=\'main\'>');
  scb_instructor_dashboard.display_assignments({assignments: opt_data.assignments, courses: opt_data.courses, sections: ['Current Assignments', 'Assignment Drafts', 'Archived Assignments', 'Public Assignments']}, output);
  output.append('</div>');
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_dashboard.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_dashboard_sidebar\'><h1 class=\'scb_s_dashboard_sidebar_title\'>Your Assignments: <div class="arrow-down"></div></h1><ul aria-label="Assignments"  ><button class="scb_s_dashboard_new_course_button scb_s_navigation_button" href="#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignments.selected.id), '" aria-label=\'New Experiment\' role=\'button\'> Create A New Course &nbsp; &#9654;</button><br/>');
  var courseList25 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen25 = courseList25.length;
  for (var courseIndex25 = 0; courseIndex25 < courseListLen25; courseIndex25++) {
    var courseData25 = courseList25[courseIndex25];
    output.append('<div class=\'scb_s_dashboard_sidebar_course_block\'>', (courseData25 == '7.06_Spring_2014') ? '<div class=\'scb_s_dashboard_sidebar_course\' role=\'heading\'>7.06 Spring 2014</div>' : '<div class=\'scb_s_dashboard_sidebar_course\' role=\'heading\'>' + soy.$$escapeHtml(courseData25) + '</div>');
    var assignmentList34 = opt_data.courses[courseData25];
    var assignmentListLen34 = assignmentList34.length;
    for (var assignmentIndex34 = 0; assignmentIndex34 < assignmentListLen34; assignmentIndex34++) {
      var assignmentData34 = assignmentList34[assignmentIndex34];
      output.append('<li role="link" class=\'scb_s_dashboard_sidebar_name ', (opt_data.assignments.selected.id == assignmentData34.id) ? 'scb_s_dashboard_sidebar_name_selected' : '', '\' aria-selected=\'', (opt_data.assignments.selected.id == assignmentData34.id) ? 'true' : 'false', '\'  ><a role=\'presentation\' href=\'#view=assignments&assignment_id=', soy.$$escapeHtml(assignmentData34.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData34.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData34.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData34.name), '</a>', (opt_data.assignments.selected.id == assignmentData34.id) ? '<img role=\'presentation\' class=\'scb_s_selection_arrow_img\'  src=\'../../images/homepage/selection_arrow.png\' >' : '', '</li>');
    }
    output.append('</div>');
  }
  output.append('</ul></div>');
  return opt_sb ? '' : output.toString();
};
