// This file was automatically generated from instructor_experiment_setup_page1.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_experiment_setup_page1 == 'undefined') { var scb_instructor_experiment_setup_page1 = {}; }


scb_instructor_experiment_setup_page1.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_experiment_setup_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_experiment_setup_page1.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page1.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_experiment_setup_title\'>Experiment Setup</div><div class=\'scb_s_experiment_setup_subtitle\'>In this section, you will specify the strains and treatments available for experimentation.</div><br/>');
  scb_instructor_experiment_setup_page1.display_experiment_setup(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page1.display_experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_setup_course_name_heading\'>1. Name the strains available for experimentation.</div><br/><div class=\'scb_s_experiment_setup_strains_list_container\'>a) Name the strains available for experimentation.');
  if (soy.$$getMapKeys(opt_data.assignment.template.cell_lines).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList46 = soy.$$getMapKeys(opt_data.assignment.template.cell_lines);
    var strainListLen46 = strainList46.length;
    for (var strainIndex46 = 0; strainIndex46 < strainListLen46; strainIndex46++) {
      var strainData46 = strainList46[strainIndex46];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData46), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData46].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData46].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  output.append('</div><br/><div class=\'scb_s_assignment_setup_course_name_heading\'>2. Select the experimental variables you wish to define for your treatment protocols. Select all that apply.</div><br/><div class=\'scb_s_experiment_setup_checkbox_container\'><div class=\'scb_s_experiment_setup_wrapper\'><input class="scb_s_experiment_setup_checkbox" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" disabled=\'disabled\' checked=\'checked\' aria-checked="false"> <span>Treatment Concentration</span></div><div class=\'scb_s_experiment_setup_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_f_experiment_setup_select_temperature" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false" ', (opt_data.assignment.has_temperature) ? 'checked' : '', '> <span>Temperature</span></div><div class=\'scb_s_experiment_setup_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_f_experiment_setup_select_start_time" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false" ', (opt_data.assignment.has_start_time) ? 'checked' : '', '> <span>Treatment Start Time</span></div><div class=\'scb_s_experiment_setup_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_f_experiment_setup_select_duration" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false" ', (opt_data.assignment.has_duration) ? 'checked' : '', '> <span>Treatment Duration</span></div><div class=\'scb_s_experiment_setup_wrapper\'><input class="scb_s_experiment_setup_checkbox scb_f_experiment_setup_select_collection_time" type="checkbox" role="checkbox" assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" aria-checked="false" ', (opt_data.assignment.has_collection_time) ? 'checked' : '', '> <span>Collection Time</span></div></div><div><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' class=" scb_f_experiment_setup_page1_save_assignment_button scb_s_assignment_setup_save_button scb_s_navigation_button"  aria-label=\'Save and Continue\' role=\'button\'>SAVE AND CONTINUE &nbsp; &#9654;</button></div>');
  return opt_sb ? '' : output.toString();
};
