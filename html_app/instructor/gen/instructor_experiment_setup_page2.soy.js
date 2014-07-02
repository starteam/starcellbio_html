// This file was automatically generated from instructor_experiment_setup_page2.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_experiment_setup_page2 == 'undefined') { var scb_instructor_experiment_setup_page2 = {}; }


scb_instructor_experiment_setup_page2.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_experiment_setup_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_experiment_setup_page2.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_experiment_setup_title\'>Experiment Setup</div><div class=\'scb_s_experiment_setup_subtitle\'>In this section, you will specify the strains and treatments available for experimentation.</div><br/>');
  scb_instructor_experiment_setup_page2.display_experiment_setup(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_setup_course_name_heading\'>3. Define the treatment protocols available for experimentation.</div><br/><div class=\'scb_s_experiment_setup_strains_list_container\'>a) Name and define your treatment variables.');
  scb_instructor_experiment_setup_page2.display_treatment_edit(opt_data, output);
  if (opt_data.assignment.has_temperature) {
    scb_instructor_experiment_setup_page2.display_temperature_edit(opt_data, output);
  }
  if (opt_data.assignment.has_duration) {
    scb_instructor_experiment_setup_page2.display_duration_edit(opt_data, output);
  }
  if (opt_data.assignment.has_collection_time) {
    scb_instructor_experiment_setup_page2.display_collection_edit(opt_data, output);
  }
  if (opt_data.assignment.has_start_time) {
    scb_instructor_experiment_setup_page2.display_start_time_edit(opt_data, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_treatment_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Name</span><span class=\'scb_s_experiment_setup_treatment_concentration_title\'>Concentration</span><span class=\'scb_s_experiment_setup_treatment_concentration_unit_title\'>Concentration Units</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.drugs).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_concentration_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><div class="scb_s_course_setup_course_list" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_course"><label role="presentation" class="custom-select"><select role="select" aria-label="Experiments" alt="" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>');
    var aList68 = opt_data.assignments.list;
    var aListLen68 = aList68.length;
    for (var aIndex68 = 0; aIndex68 < aListLen68; aIndex68++) {
      var aData68 = aList68[aIndex68];
      output.append((! (aData68.course == '')) ? '<option role=\'option\' aria-label=\'' + soy.$$escapeHtml(aData68.name) + '\' value="' + soy.$$escapeHtml(aData68.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == aData68.id) ? 'selected="selected"' : '') + '>' + soy.$$escapeHtml(aData68.course_name) + '&nbsp;&nbsp;</option>' : '');
    }
    output.append('</select></label></div></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList92 = soy.$$getMapKeys(opt_data.assignment.template.drugs);
    var strainListLen92 = strainList92.length;
    for (var strainIndex92 = 0; strainIndex92 < strainListLen92; strainIndex92++) {
      var strainData92 = strainList92[strainIndex92];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData92), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData92].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData92].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_concentration_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData92), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData92].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData92].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_concentration_unit_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData92), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData92].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData92].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_treatment\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Temperature</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.experiment_temperatures).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><span class=\'scb_s_experiment_setup_course_name_heading\'>°C</span></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList143 = soy.$$getMapKeys(opt_data.assignment.template.experiment_temperatures);
    var strainListLen143 = strainList143.length;
    for (var strainIndex143 = 0; strainIndex143 < strainListLen143; strainIndex143++) {
      var strainData143 = strainList143[strainIndex143];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData143), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData143].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData143].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><span class=\'scb_s_experiment_setup_course_name_heading\'>°C</span><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_temperature\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_duration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Duration</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.duration).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList178 = soy.$$getMapKeys(opt_data.assignment.template.duration);
    var strainListLen178 = strainList178.length;
    for (var strainIndex178 = 0; strainIndex178 < strainListLen178; strainIndex178++) {
      var strainData178 = strainList178[strainIndex178];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData178), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData178].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData178].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_temperature\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_collection_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Collection Time</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.collections).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList213 = soy.$$getMapKeys(opt_data.assignment.template.collections);
    var strainListLen213 = strainList213.length;
    for (var strainIndex213 = 0; strainIndex213 < strainListLen213; strainIndex213++) {
      var strainData213 = strainList213[strainIndex213];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData213), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData213].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData213].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_temperature\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_start_time_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Treatment Start Time</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.start_times).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList248 = soy.$$getMapKeys(opt_data.assignment.template.start_times);
    var strainListLen248 = strainList248.length;
    for (var strainIndex248 = 0; strainIndex248 < strainListLen248; strainIndex248++) {
      var strainData248 = strainList248[strainIndex248];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData248), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData248].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData248].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_temperature\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};
