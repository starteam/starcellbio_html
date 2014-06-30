// This file was automatically generated from instructor_course_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_course_setup == 'undefined') { var scb_instructor_course_setup = {}; }


scb_instructor_course_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_course_setup_container\' role=\'main\'>');
  scb_instructor_course_setup.display_assignment({global_template: opt_data.global_template, assignments: opt_data.assignments, assignment: opt_data.assignment, view: opt_data.kind}, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_course_setup.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div>');
  if (opt_data.view == 'select_course') {
    scb_instructor_course_setup.select_course(opt_data, output);
  } else if (opt_data.view == 'create_assignment') {
    scb_instructor_course_setup.create_assignment(opt_data, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_course_setup.select_course = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_title\'>Course Setup</div><div class=\'scb_s_course_setup_radio_choice scb_f_course_setup_create_new_course\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' aria-label=\'Create New Assignment\' ><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind"  ', (opt_data.assignment.is_new_course) ? 'checked' : '', ' /><span class=\'scb_s_course_setup_radio_text\'>Create new course OR</span></div><div class=\'scb_s_course_setup_radio_choice scb_f_course_setup_choose_existing_course\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind"  ', (! opt_data.assignment.is_new_course) ? 'checked' : '', ' /><span class=\'scb_s_course_setup_radio_text\'>Add to an existing course.</span><br/></div><div class="scb_s_course_setup_course_list" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_course"><label role="presentation" class="custom-select"><select role="select" aria-label="Experiments" alt="" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>');
  var aList52 = opt_data.assignments.list;
  var aListLen52 = aList52.length;
  for (var aIndex52 = 0; aIndex52 < aListLen52; aIndex52++) {
    var aData52 = aList52[aIndex52];
    output.append((! (aData52.course == '')) ? '<option role=\'option\' aria-label=\'' + soy.$$escapeHtml(aData52.name) + '\' value="' + soy.$$escapeHtml(aData52.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == aData52.id) ? 'selected="selected"' : '') + '>' + soy.$$escapeHtml(aData52.course_name) + '&nbsp;&nbsp;</option>' : '');
  }
  output.append('</select></label></div><div class=\'scb_s_course_setup_course_name_heading\'>1. What is the name of your course?</div><input type=\'text\' class=\'scb_s_course_setup_text_field scb_f_course_setup_course_name_value\' placeholder="Course Name"  value=\'', soy.$$escapeHtml(opt_data.assignment.course_name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.course_name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><div class=\'scb_s_course_setup_course_name_heading\'>2. What course code would you like to provide to your students?</div><input type=\'text\' class=\'scb_s_course_setup_text_field scb_f_course_setup_course_code_value\' placeholder="Course Code" value=\'', soy.$$escapeHtml(opt_data.assignment.course), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.course), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_course_setup_save_course_button scb_s_course_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_course_setup.create_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_title\'>Assignment Setup</div><div class=\'scb_s_course_setup_radio_choice scb_f_course_setup_create_new_assignment\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' aria-label=\'Create New Assignment\' ><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind"  ', (opt_data.assignment.is_new_assignment) ? 'checked' : '', ' /><span class=\'scb_s_course_setup_radio_text\'>Create new assignment OR</span></div><div class=\'scb_s_course_setup_radio_choice scb_f_course_setup_choose_existing_template\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind"  ', (! opt_data.assignment.is_new_assignment) ? 'checked' : '', ' /><span class=\'scb_s_course_setup_radio_text\'>Use an existing assignment as a template.</span><br/></div><div class="scb_s_course_setup_assignment_list" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_assignment"><label role="presentation" class="custom-select"><select role="select" aria-label="Experiments" alt="" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>');
  var aList102 = opt_data.assignments.list;
  var aListLen102 = aList102.length;
  for (var aIndex102 = 0; aIndex102 < aListLen102; aIndex102++) {
    var aData102 = aList102[aIndex102];
    output.append((aData102.operation == 'view') ? '<option role=\'option\' aria-label=\'' + soy.$$escapeHtml(aData102.name) + '\' value="' + soy.$$escapeHtml(aData102.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.template_id == aData102.id) ? 'selected="selected"' : '') + '>' + soy.$$escapeHtml(aData102.name) + '&nbsp;&nbsp;</option>' : '');
  }
  output.append('</select></label></div><br/><br/><div class=\'scb_s_course_setup_course_name_heading\'>3. What is the name of the assignment?</div><input type=\'text\' class=\'scb_s_course_setup_text_field scb_f_course_setup_assignment_name_value\' placeholder="Assignment Name" value=\'', soy.$$escapeHtml(opt_data.assignment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_course_setup_save_assignment_button scb_s_course_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button>');
  return opt_sb ? '' : output.toString();
};
