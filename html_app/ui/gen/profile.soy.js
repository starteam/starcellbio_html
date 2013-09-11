// This file was automatically generated from profile.soy.
// Please don't edit this file by hand.

if (typeof scb_profile == 'undefined') { var scb_profile = {}; }


scb_profile.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 1, assignments: assignments}, output);
  scb_profile.display_assignments(opt_data, output);
  scb_profile.display_abstract(opt_data, output);
  scb_homepage.display_experiment_design(null, output);
  scb_homepage.display_footer(null, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_profile.display_header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_header\'>', soy.$$escapeHtml(opt_data.global_template.app_title), '</div>');
  return opt_sb ? '' : output.toString();
};


scb_profile.display_footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_footer\'>Here comes footer</div>');
  return opt_sb ? '' : output.toString();
};


scb_profile.display_abstract = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_abstract\'>', (opt_data.assignments.selected != null) ? '<span class="scb_s_abstract_title">' + opt_data.assignments.selected.name + '</span><div class=\'scb_s_abstract_title_underline\'></div>' + opt_data.assignments.selected.description + '<a class="scb_f_select_assignment scb_s_navigation_button" href="#view=assignment&assignment_id=' + soy.$$escapeHtml(opt_data.assignments.selected_id) + '">COMPLETE ASSIGNMENT &nbsp; &#9654;</a>' : opt_data.global_template.app_description, '</div>');
  return opt_sb ? '' : output.toString();
};


scb_profile.display_assignments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignments_sidebar\'><h1 class=\'scb_s_assignments_sidebar_title\'>Your Assignments</h1><ul>');
  var courseList44 = soy.$$getMapKeys(opt_data.courses);
  var courseListLen44 = courseList44.length;
  for (var courseIndex44 = 0; courseIndex44 < courseListLen44; courseIndex44++) {
    var courseData44 = courseList44[courseIndex44];
    output.append('<div class=\'scb_s_assignments_sidebar_course_block\'><div class=\'scb_s_assignments_sidebar_course\'>', soy.$$escapeHtml(courseData44), '</div>');
    var assignmentList48 = opt_data.courses[courseData44];
    var assignmentListLen48 = assignmentList48.length;
    for (var assignmentIndex48 = 0; assignmentIndex48 < assignmentListLen48; assignmentIndex48++) {
      var assignmentData48 = assignmentList48[assignmentIndex48];
      output.append('<li class=\'scb_s_assignments_sidebar_name\'><a href=\'#view=', (assignmentData48.id == opt_data.assignments.selected_id) ? 'assignment' : 'profile', '&assignment_id=', soy.$$escapeHtml(assignmentData48.id), '\' model_id=\'', soy.$$escapeHtml(assignmentData48.id), '\' class=\'scb_s_assignment_sidebar_link ', (assignmentData48.id == opt_data.assignments.selected_id) ? 'scb_f_open_assignment' : 'scb_f_select_assignment', '\'>', soy.$$escapeHtml(assignmentData48.name), '</a></li>');
      if (assignmentData48.id == opt_data.assignments.selected_id) {
        scb_profile.display_experiments({experiments: assignmentData48.experiments, assignment: assignmentData48}, output);
      }
    }
    output.append('</div>');
  }
  output.append('</ul></div>');
  return opt_sb ? '' : output.toString();
};


scb_profile.display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul class=\'scb_s_assignment_experiment_list\'>');
  if (opt_data.experiments.list.length != 0) {
    var experimentList81 = opt_data.experiments.list;
    var experimentListLen81 = experimentList81.length;
    for (var experimentIndex81 = 0; experimentIndex81 < experimentListLen81; experimentIndex81++) {
      var experimentData81 = experimentList81[experimentIndex81];
      output.append('<li class=\'scb_s_assignment_experiment_list_item\'><a class=\'scb_f_open_assignment_experiment\' href=\'#view=experiment_last&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(experimentData81.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' sub_model_id=\'', soy.$$escapeHtml(experimentData81.id), '\'>', soy.$$escapeHtml(experimentData81.name), '</a></li>');
    }
  }
  output.append('</ul><div class=\'scb_s_assignment_experiment_list_item_new_experiment\'><span aria-hidden="true" tabindex="-1">+</span><a class=\'scb_f_new_assignment_experiment scb_s_new_assignment_experiment\' href=\'#view=experiment_design&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' model_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>New Experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
