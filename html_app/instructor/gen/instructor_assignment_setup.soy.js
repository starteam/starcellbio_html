// This file was automatically generated from instructor_assignment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_assignment_setup == 'undefined') { var scb_instructor_assignment_setup = {}; }


scb_instructor_assignment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_assignment_setup_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_assignment_setup.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_assignment_setup.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div>');
  scb_instructor_assignment_setup.create_assignment(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_assignment_setup.create_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_setup_title\'>Assignment Setup</div><div class=\'scb_s_assignment_setup_radio_choice scb_f_assignment_setup_create_new_assignment\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' aria-label=\'Create New Assignment\' ><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind"  ', (opt_data.assignment.is_new_assignment) ? 'checked' : '', ' /><span class=\'scb_s_assignment_setup_radio_text\'>Create new assignment OR</span></div><div class=\'scb_s_assignment_setup_radio_choice scb_f_assignment_setup_choose_existing_template\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind"  ', (! opt_data.assignment.is_new_assignment) ? 'checked' : '', ' /><span class=\'scb_s_assignment_setup_radio_text\'>Use an existing assignment as a template.</span><br/></div><div class="scb_s_assignment_setup_assignment_list" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_assignment"><label role="presentation" class="custom-select"><select role="select" aria-label="Experiments" alt="" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>');
  var aList49 = opt_data.assignments.list;
  var aListLen49 = aList49.length;
  for (var aIndex49 = 0; aIndex49 < aListLen49; aIndex49++) {
    var aData49 = aList49[aIndex49];
    output.append((aData49.operation == 'view') ? '<option role=\'option\' aria-label=\'' + soy.$$escapeHtml(aData49.name) + '\' value="' + soy.$$escapeHtml(aData49.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.template_id == aData49.id) ? 'selected="selected"' : '') + '>' + soy.$$escapeHtml(aData49.name) + '&nbsp;&nbsp;</option>' : '');
  }
  output.append('</select></label></div><br/><br/><div class=\'scb_s_assignment_setup_course_name_heading\'>3. What is the name of the assignment?</div><input type=\'text\' class=\'scb_s_assignment_setup_text_field scb_f_assignment_setup_assignment_name_value\' placeholder="Assignment Name" value=\'', soy.$$escapeHtml(opt_data.assignment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><p/><!-- <button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_assignment_setup_back_button scb_s_assignment_setup_back_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>&#9664; &nbsp; BACK</button> --><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_assignment_setup_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button>');
  return opt_sb ? '' : output.toString();
};
