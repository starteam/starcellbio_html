// This file was automatically generated from notebook.soy.
// Please don't edit this file by hand.

if (typeof scb_notebook == 'undefined') { var scb_notebook = {}; }


scb_notebook.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 10, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_notebook.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_container\' role=\'main\'><div class=\'scb_notebook_details_view\'><div class=\'scb_s_notebook_all_tabs\'><div class=\'scb_notebook_details_view_inner\'>');
  scb_notebook.display_sections(opt_data, output);
  output.append('<button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' class=\'scb_f_notebook_add_section_button scb_s_notebook_add_section_button scb_s_notebook_image_insert_button\'>Add Section +</button></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.display_sections = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\'>');
  var sectionList49 = opt_data.notebook.sections.list;
  var sectionListLen49 = sectionList49.length;
  for (var sectionIndex49 = 0; sectionIndex49 < sectionListLen49; sectionIndex49++) {
    var sectionData49 = sectionList49[sectionIndex49];
    output.append('<div class="scb_s_notebook_section scb_f_notebook_section ', (sectionData49.id == opt_data.notebook.section_selected) ? 'scb_s_notebook_section_selected' : '', '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(sectionData49.id), '\'><input type=\'text\' class=\'scb_s_notebook_section_name_edit\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' value=\'', soy.$$escapeHtml(opt_data.experiment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.experiment.name), '\' aria-label=\'Section Name\' role=\'textbox\'><br/><br/>');
    var elementList71 = sectionData49.elements.list;
    var elementListLen71 = elementList71.length;
    for (var elementIndex71 = 0; elementIndex71 < elementListLen71; elementIndex71++) {
      var elementData71 = elementList71[elementIndex71];
      output.append((elementData71.type == 'text') ? '<div class=\'scb_s_notebook_text_section\'>' + elementData71.data + '</div>' : '');
      if (elementData71.type == 'image') {
        output.append('<div class=\'scb_s_notebook_text_section\'>');
        if (elementData71.view == 'experiment_design') {
          scb_notebook.experiment_design({assignment: opt_data.assignment, element: elementData71, experiment: elementData71.selected_experiment}, output);
        }
        if (elementData71.view == 'experiment_setup') {
          scb_notebook.experiment_setup({assignment: opt_data.assignment, element: elementData71, experiment: elementData71.selected_experiment, headings: elementData71.headings, rows: elementData71.rows}, output);
        }
        if (elementData71.view == 'western_blot') {
          scb_notebook.wb_lane({assignment: opt_data.assignment, element: elementData71, experiment: elementData71.selected_experiment, western_blot: elementData71.selected_western_blot, western_blot_gel: elementData71.selected_western_blot_gel, rows: elementData71.rows, exposure_time: elementData71.exposure_time}, output);
        }
        if (elementData71.view == 'facs') {
          scb_notebook.facs_lane({assignment: opt_data.assignment, element: elementData71, experiment: elementData71.selected_experiment, facs: elementData71.selected_facs, lane: elementData71.selected_facs_lane}, output);
        }
        if (elementData71.view == 'microscopy') {
          scb_notebook.micro_lane({assignment: opt_data.assignment, element: elementData71, experiment: elementData71.selected_experiment, microscopy: elementData71.selected_microscopy, lane: elementData71.selected_microscopy_lane}, output);
        }
        output.append('</div>');
      }
    }
    if (sectionData49.id == opt_data.notebook.section_selected) {
      output.append('<div class=\'scb_s_notebook_section_button_wrapper\'><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(sectionData49.id), '\' class=\'scb_f_notebook_text_button scb_s_notebook_text_button scb_s_navigation_button\'>Text</button><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(sectionData49.id), '\' class=\'scb_f_notebook_image_button scb_s_notebook_image_button scb_s_navigation_button\'>Image</button></div>');
      if (opt_data.notebook.edit_text) {
        scb_notebook.text_edit({assignment: opt_data.assignment, experiment: opt_data.experiment, notebook: opt_data.notebook, section: sectionData49}, output);
      }
      if (opt_data.notebook.edit_image) {
        scb_notebook.image_edit({assignment: opt_data.assignment, experiment: opt_data.experiment, notebook: opt_data.notebook, section: sectionData49}, output);
      }
    }
    output.append('</div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.text_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' class=\'scb_s_notebook_element_edit_wrapper\'><textarea class=\'scb_s_notebook_text_edit\'></textarea><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_save_text_button scb_s_notebook_save_text_button scb_s_navigation_button\'>SAVE</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.image_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div  assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_s_notebook_element_edit_wrapper\'>');
  var eList185 = opt_data.assignment.experiments.list;
  var eListLen185 = eList185.length;
  for (var eIndex185 = 0; eIndex185 < eListLen185; eIndex185++) {
    var eData185 = eList185[eIndex185];
    output.append('<span class=\'scb_s_notebook_experiment_head_link\'>', soy.$$escapeHtml(eData185.name), '</span><br/><span class=\'scb_f_notebook_experiment_design_link scb_s_notebook_experiment_design_link scb_s_notebook_image_section_link\' image_id=\'', soy.$$escapeHtml(eData185.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\'>Experiment Design</span> <br/>', (eData185.cell_treatment_list.list.length > 0) ? '<span class=\'scb_f_notebook_experiment_setup_link scb_s_notebook_experiment_setup_link scb_s_notebook_image_section_link\' image_id=\'' + soy.$$escapeHtml(eData185.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>Experiment Setup</span><br/>' : '');
    var wbList212 = eData185.western_blot_list.list;
    var wbListLen212 = wbList212.length;
    for (var wbIndex212 = 0; wbIndex212 < wbListLen212; wbIndex212++) {
      var wbData212 = wbList212[wbIndex212];
      if (wbData212.is_transfered) {
        output.append('<span class=\'scb_s_notebook_wb_head_link\'>', soy.$$escapeHtml(wbData212.name), '</span><br/>');
        var gelList218 = wbData212.gel_list.list;
        var gelListLen218 = gelList218.length;
        for (var gelIndex218 = 0; gelIndex218 < gelListLen218; gelIndex218++) {
          var gelData218 = gelList218[gelIndex218];
          output.append((gelData218.is_developed) ? '<span class=\'scb_f_notebook_wb_link scb_s_notebook_wb_link scb_s_notebook_image_section_link\' e_id=\'' + soy.$$escapeHtml(eData185.id) + '\' wb_id=\'' + soy.$$escapeHtml(wbData212.id) + '\' image_id=\'' + soy.$$escapeHtml(gelData218.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>' + soy.$$escapeHtml(gelData218.name) + '</span><br/>' : '');
        }
      }
    }
    var fList240 = eData185.facs_list.list;
    var fListLen240 = fList240.length;
    for (var fIndex240 = 0; fIndex240 < fListLen240; fIndex240++) {
      var fData240 = fList240[fIndex240];
      if (fData240.samples_finished) {
        output.append('<span class=\'scb_s_notebook_facs_head_link\'>', soy.$$escapeHtml(fData240.name), '</span><br/>');
        var sampleList246 = fData240.lanes_list.list;
        var sampleListLen246 = sampleList246.length;
        for (var sampleIndex246 = 0; sampleIndex246 < sampleListLen246; sampleIndex246++) {
          var sampleData246 = sampleList246[sampleIndex246];
          output.append((sampleData246.canvas_metadata) ? '<span class=\'scb_f_notebook_facs_link scb_s_notebook_facs_link scb_s_notebook_image_section_link\' e_id=\'' + soy.$$escapeHtml(eData185.id) + '\' facs_id=\'' + soy.$$escapeHtml(fData240.id) + '\'  image_id=\'' + soy.$$escapeHtml(sampleData246.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>' + soy.$$escapeHtml(sampleData246.display_text) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[sampleData246.kind].name) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[sampleData246.kind].conditions[sampleData246.conditions].name) + '</span><br/>' : '');
        }
      }
    }
    var mList272 = eData185.microscopy_list.list;
    var mListLen272 = mList272.length;
    for (var mIndex272 = 0; mIndex272 < mListLen272; mIndex272++) {
      var mData272 = mList272[mIndex272];
      if (mData272.samples_finished) {
        output.append('<span class=\'scb_s_notebook_micro_head_link\'>', soy.$$escapeHtml(mData272.name), '</span><br/>');
        var sampleList278 = mData272.lanes_list.list;
        var sampleListLen278 = sampleList278.length;
        for (var sampleIndex278 = 0; sampleIndex278 < sampleListLen278; sampleIndex278++) {
          var sampleData278 = sampleList278[sampleIndex278];
          output.append((sampleData278.lens_map.src) ? '<span class=\'scb_f_notebook_micro_link scb_s_notebook_micro_link scb_s_notebook_image_section_link\' e_id=\'' + soy.$$escapeHtml(eData185.id) + '\' micro_id=\'' + soy.$$escapeHtml(mData272.id) + '\' image_id=\'' + soy.$$escapeHtml(sampleData278.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>' + soy.$$escapeHtml(sampleData278.display_text) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[sampleData278.kind].name) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[sampleData278.kind].conditions[sampleData278.slide_conditions].name) + '</span><br/>' : '');
        }
      }
    }
  }
  output.append('<div class=\'scb_s_notebook_image_dialog_button_wrapper\'><!--<button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_insert_open_button scb_s_notebook_image_insert_open_button scb_s_notebook_image_insert_button\'>Insert and Open</button><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_insert_close_button scb_s_notebook_image_insert_close_button scb_s_notebook_image_insert_button\'>Insert and Close</button>--><button assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\' class=\'scb_f_notebook_image_close_button scb_s_notebook_image_close_button scb_s_notebook_image_insert_button\'>Close</button></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.experiment_design = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<span class=\'scb_s_experiment_name_edit\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' title=\'', soy.$$escapeHtml(opt_data.experiment.name), '\' aria-label=\'Experiment Name\' role=\'textbox\'>', soy.$$escapeHtml(opt_data.experiment.name), '</span><br/><br/><div class=\'scb_s_experiment_design_objective_container\'><div class=\'scb_s_experiment_design_objective_text\' id=\'scb_s_experiment_design_objective_text_label\'><span class=\'design_numbers\'>1.&nbsp;&nbsp;&nbsp;</span>What question is your experiment going to address?</div><div aria-labelledby="scb_s_experiment_design_objective_text_label" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.objective), '</div></div><br/><div class=\'scb_s_experiment_design_hypothesis_container\'><div class=\'scb_s_experiment_design_hypothesis_text\' id="scb_s_experiment_design_hypothesis_label"><span class=\'design_numbers\'>2.&nbsp;&nbsp;&nbsp;</span>Do you have a hypothesis for this experiment? If so, please write it below.</div><div aria-labelledby="scb_s_experiment_design_hypothesis_label"  assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.hypothesis), '</div></div><br/><div class=\'scb_s_experiment_design_techniques_container scb_s_notebook_experiment_design_techniques\'><div class=\'scb_s_experiment_design_techniques_text\'><span class=\'design_numbers\'>3.&nbsp;&nbsp;&nbsp;</span>What technique(s) might be best suited for the analysis of this experiment?</div><div aria-labelledby="scb_s_experiment_design_technique_label" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.technique), '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table class=" scb_s_notebook_experiment_setup_table scb_s_experiment_setup_table scb_s_experiment_setup_table_readonly" aria-label=\'Table of Samples\' role=\'grid\'><thead class=\'scb_s_experiment_setup_table_head\' >');
  var hList360 = opt_data.headings;
  var hListLen360 = hList360.length;
  for (var hIndex360 = 0; hIndex360 < hListLen360; hIndex360++) {
    var hData360 = hList360[hIndex360];
    output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(hData360.title), '\' class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData360.kind), '\'>', (hData360.kind == 'actions') ? '' : soy.$$escapeHtml(hData360.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList373 = opt_data.rows;
  var rListLen373 = rList373.length;
  for (var rIndex373 = 0; rIndex373 < rListLen373; rIndex373++) {
    var rData373 = rList373[rIndex373];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' cell_treatment_id=\'', soy.$$escapeHtml(rData373.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' >');
    var cList381 = rData373.columns;
    var cListLen381 = cList381.length;
    for (var cIndex381 = 0; cIndex381 < cListLen381; cIndex381++) {
      var cData381 = cList381[cIndex381];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData381.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\'  rowspan="', soy.$$escapeHtml(cData381.rows), '">', (cData381.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png" role=\'presentation\'>' : '', (cData381.kind == 'collection' && cData381.title == 'default' || cData381.kind == 'actions') ? '' : soy.$$escapeHtml(cData381.title), '</td>');
    }
    output.append('</tr>');
  }
  output.append('</tbody></table>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.wb_lane = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_western_blot\'><div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'>Gel Type:', (opt_data.western_blot.gel_type == '.10') ? '&nbsp;&nbsp;&nbsp;10%' : '', (opt_data.western_blot.gel_type == '.12') ? '&nbsp;&nbsp;&nbsp;12%' : '', (opt_data.western_blot.gel_type == '.15') ? '&nbsp;&nbsp;&nbsp;15%' : '', '</div><div class=\'scb_s_western_blot_samples_heading\' role=\'heading\'>Samples</div><div id=\'scb_s_western_blot_choose_samples_order\' class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list scb_s_western_blot_static_list\' role=\'list\' aria-labelledby=\'scb_s_western_blot_choose_samples_order\'>');
  var rList413 = opt_data.rows;
  var rListLen413 = rList413.length;
  for (var rIndex413 = 0; rIndex413 < rListLen413; rIndex413++) {
    var rData413 = rList413[rIndex413];
    output.append((rData413.kind == 'existing' && opt_data.western_blot.marker_loaded == true && rData413.lane_id == 'marker') ? '<li role=\'listitem\' class="scb_s_western_blot_marker scb_s_western_blot_choose_samples_list" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' >Marker</li>' : '', (rData413.is_valid) ? '<li role=\'listitem\' class="scb_s_western_blot_choose_samples_list" title=\'' + soy.$$escapeHtml(rData413.display_text) + ' - ' + soy.$$escapeHtml(rData413.lane_name) + '\' id="' + soy.$$escapeHtml(rData413.lane_id) + '">' + soy.$$escapeHtml(rData413.display_text) + ' - ' + soy.$$escapeHtml(rData413.lane_name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.western_blot.marker_loaded == false) ? '<div class=\'scb_s_western_blot_marker scb_s_western_blot_marker_not\'>No marker loaded.</div>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\' style=\'width:536px;\'><div class=\'scb_s_western_blot_gel_tabs\' role=\'tablist\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\' role=\'tab\'><div class=\'scb_s_western_blot_gel_tab_selected\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\' >', soy.$$escapeHtml(opt_data.western_blot_gel.name), '</div></span></div><div class=\'scb_s_western_blot_gel_content\' style=\'width: 527px;\'><div class=\'scb_s_western_blot_gel\' is_developed=\'', soy.$$escapeHtml(opt_data.western_blot_gel.is_developed), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  scb_western_blot.display_western_blot_numbers(null, output);
  output.append('<div class=\'scb_s_western_blot_gel_canvas_wrapper\'><canvas id="', soy.$$escapeHtml(opt_data.western_blot_gel.id), '" class=\'scb_s_western_blot_gel_canvas\' style="width:346px;height:247px" width=\'375\' height=\'247\' role=\'presentation\'></canvas></div></div><div class=\'scb_s_western_blot_tools\'><h1 role=\'heading\' >Blotting Conditions</h1><div class=\'scb_s_wb_primary_antibody\'>Primary antibody:<div>', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[opt_data.western_blot_gel.primary_anti_body].name), '</div></div><div class=\'scb_s_wb_secondary_antibody\'>Secondary antibody:<div>', soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.western_blot_gel.secondary_anti_body].name), '</div></div><h1 class=\'scb_s_wb_analysis_tools_title\' role=\'heading\'>Analysis Tools</h1><div class=\'scb_s_wb_exposure_time\'>Exposure time:<div id=\'scb_s_wb_exposure_time_value\' class=\'scb_s_wb_exposure_time_value\'>', soy.$$escapeHtml(opt_data.exposure_time), '</div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.facs_lane = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_samples_graph_area\'><div class=\'scb_s_western_blot_gel_tabs\' role=\'tablist\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab \' role=\'tab\'><div class=\'scb_s_facs_gel_tab_selected\'>', soy.$$escapeHtml(opt_data.lane.display_text), ' - ', soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[opt_data.lane.kind].name), ' - ', soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[opt_data.lane.kind].conditions[opt_data.lane.conditions].name), '</div></span></div><div class=\'scb_s_western_blot_gel_content\'><div class=\'scb_s_facs_chart_wrapper\'><div class=\'scb_s_facs_chart_xaxis\'>', (opt_data.lane && opt_data.lane.kinds[opt_data.lane.kind].conditions) ? soy.$$escapeHtml(opt_data.lane.kinds[opt_data.lane.kind].conditions[opt_data.lane.conditions].name) : 'PI', ' Fluorescence</div><div class=\'scb_s_facs_chart_yaxis\'>Number of cells (thousands)</div><div class=\'scb_s_facs_chart_helper\'></div><div class=\'scb_s_facs_chart_guider\'></div><div class=\'scb_s_facs_chart\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' ></div></div><div class=\'scb_s_facs_tools\'>');
  if (opt_data.lane.canvas_metadata_analysis) {
    if (opt_data.lane.canvas_metadata_analysis.ranges) {
      if (opt_data.lane.canvas_metadata_analysis.ranges.length > 0) {
        output.append('<table class=\'scb_s_facs_tools_analyze_data\' role=\'grid\'><thead><tr><td role=\'columnheader\'></td><td role=\'columnheader\'></td><td role=\'columnheader\'>', (opt_data.lane && opt_data.lane.kinds[opt_data.lane.kind].conditions) ? soy.$$escapeHtml(opt_data.lane.kinds[opt_data.lane.kind].conditions[opt_data.lane.conditions].name) : 'PI', ' Fluorescence</td><td role=\'columnheader\'>% Cells</td><td role=\'columnheader\'></td></tr></thead><tbody>');
        var rangeList507 = opt_data.lane.canvas_metadata_analysis.ranges;
        var rangeListLen507 = rangeList507.length;
        for (var rangeIndex507 = 0; rangeIndex507 < rangeListLen507; rangeIndex507++) {
          var rangeData507 = rangeList507[rangeIndex507];
          output.append('<tr role=\'row\'><td class="', (rangeData507.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData507.display_id), '</td><td class="', (rangeData507.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData507.bisector_id), '</td><td class="', (rangeData507.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData507.from), ' - ', soy.$$escapeHtml(rangeData507.to), '</td><td class="', (rangeData507.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData507.percentage), '</td><td class="', (rangeData507.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '"><img class=\'scb_f_facs_analyze_remove_point scb_s_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData507.from), '\' to=\'', soy.$$escapeHtml(rangeData507.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
        }
        output.append('</tbody></table>');
      }
    }
  }
  output.append('</div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.micro_lane = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_samples_slide_area\'><div class=\'scb_s_western_blot_gel_tabs\' role=\'tablist\'><span class=\'scb_s_western_blot_gel_active scb_s_microscopy_slide_tab \' role=\'tab\'><div class=\'scb_s_microscopy_gel_tab_selected\'>', soy.$$escapeHtml(opt_data.lane.display_text), ' - ', soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[opt_data.lane.kind].name), ' - ', soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[opt_data.lane.kind].conditions[opt_data.lane.slide_conditions].name), '</div></span></div><div class=\'scb_s_microscopy_slide_content\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' microscopy_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' i_want=\'scb_s_microscopy_slide_content_lens_outline_notebook_', soy.$$escapeHtml(opt_data.element.id), '\' ><div id=\'scb_s_microscopy_slide_content_lens_outline_notebook_', soy.$$escapeHtml(opt_data.element.id), '\' class=\'scb_s_microscopy_slide_content_lens_outline_', soy.$$escapeHtml(opt_data.lane.id), ' scb_s_microscopy_slide_content_lens_outline\' role=\'widget\' aria-label=\'Slide Lens, assistance needed to use\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};
