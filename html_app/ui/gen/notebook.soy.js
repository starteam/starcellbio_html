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
    output.append('<div class="scb_s_notebook_section" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\'  section_id=\'', soy.$$escapeHtml(sectionData49.id), '\'><input type=\'text\' class=\'scb_s_notebook_section_name_edit\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' value=\'', soy.$$escapeHtml(opt_data.experiment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.experiment.name), '\' aria-label=\'Section Name\' role=\'textbox\'><br/><br/>');
    var elementList67 = sectionData49.elements;
    var elementListLen67 = elementList67.length;
    for (var elementIndex67 = 0; elementIndex67 < elementListLen67; elementIndex67++) {
      var elementData67 = elementList67[elementIndex67];
      output.append((elementData67.type == 'text') ? '<div class=\'scb_s_notebook_text_section\'>' + elementData67.data + '</div>' : '');
      if (elementData67.type == 'image') {
        output.append('<div class=\'scb_s_notebook_text_section\'>');
        if (elementData67.view == 'experiment_design') {
          scb_notebook.experiment_design({assignment: opt_data.assignment, experiment: opt_data.notebook.selected_experiment}, output);
        }
        if (elementData67.view == 'experiment_setup') {
          scb_notebook.experiment_setup({assignment: opt_data.assignment, experiment: opt_data.notebook.selected_experiment, headings: elementData67.headings, rows: elementData67.rows}, output);
        }
        if (elementData67.view == 'western_blot') {
          scb_notebook.wb_lane({assignment: opt_data.assignment, experiment: opt_data.notebook.selected_experiment, western_blot: opt_data.notebook.selected_western_blot, western_blot_gel: opt_data.notebook.selected_western_blot_gel, rows: elementData67.rows, exposure_time: elementData67.exposure_time}, output);
        }
        if (elementData67.view == 'facs') {
          scb_notebook.facs_lane({assignment: opt_data.assignment, experiment: opt_data.notebook.selected_experiment, facs: opt_data.notebook.selected_facs, lane: opt_data.notebook.selected_facs_lane}, output);
        }
        if (elementData67.view == 'microscopy') {
          scb_notebook.micro_lane({assignment: opt_data.assignment, experiment: opt_data.notebook.selected_experiment, microscopy: opt_data.notebook.selected_microscopy, lane: opt_data.notebook.selected_microscopy_lane}, output);
        }
        output.append('</div>');
      }
    }
    if (sectionData49.id == opt_data.notebook.sections.selected_id) {
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
  var eList176 = opt_data.assignment.experiments.list;
  var eListLen176 = eList176.length;
  for (var eIndex176 = 0; eIndex176 < eListLen176; eIndex176++) {
    var eData176 = eList176[eIndex176];
    output.append('<span class=\'scb_s_notebook_experiment_head_link\'>', soy.$$escapeHtml(eData176.name), '</span><br/><span class=\'scb_f_notebook_experiment_design_link scb_s_notebook_experiment_design_link scb_s_notebook_image_section_link\' image_id=\'', soy.$$escapeHtml(eData176.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' notebook_id=\'', soy.$$escapeHtml(opt_data.notebook.id), '\' section_id=\'', soy.$$escapeHtml(opt_data.section.id), '\'>Experiment Design</span> <br/>', (eData176.cell_treatment_list.list.length > 0) ? '<span class=\'scb_f_notebook_experiment_setup_link scb_s_notebook_experiment_setup_link scb_s_notebook_image_section_link\' image_id=\'' + soy.$$escapeHtml(eData176.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>Experiment Setup</span><br/>' : '');
    var wbList203 = eData176.western_blot_list.list;
    var wbListLen203 = wbList203.length;
    for (var wbIndex203 = 0; wbIndex203 < wbListLen203; wbIndex203++) {
      var wbData203 = wbList203[wbIndex203];
      if (wbData203.is_transfered) {
        output.append('<span class=\'scb_s_notebook_wb_head_link\'>', soy.$$escapeHtml(wbData203.name), '</span><br/>');
        var gelList209 = wbData203.gel_list.list;
        var gelListLen209 = gelList209.length;
        for (var gelIndex209 = 0; gelIndex209 < gelListLen209; gelIndex209++) {
          var gelData209 = gelList209[gelIndex209];
          output.append((gelData209.is_developed) ? '<span class=\'scb_f_notebook_wb_link scb_s_notebook_wb_link scb_s_notebook_image_section_link\' e_id=\'' + soy.$$escapeHtml(eData176.id) + '\' wb_id=\'' + soy.$$escapeHtml(wbData203.id) + '\' image_id=\'' + soy.$$escapeHtml(gelData209.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>' + soy.$$escapeHtml(gelData209.name) + '</span><br/>' : '');
        }
      }
    }
    var fList231 = eData176.facs_list.list;
    var fListLen231 = fList231.length;
    for (var fIndex231 = 0; fIndex231 < fListLen231; fIndex231++) {
      var fData231 = fList231[fIndex231];
      if (fData231.samples_finished) {
        output.append('<span class=\'scb_s_notebook_facs_head_link\'>', soy.$$escapeHtml(fData231.name), '</span><br/>');
        var sampleList237 = fData231.lanes_list.list;
        var sampleListLen237 = sampleList237.length;
        for (var sampleIndex237 = 0; sampleIndex237 < sampleListLen237; sampleIndex237++) {
          var sampleData237 = sampleList237[sampleIndex237];
          output.append((sampleData237.canvas_metadata) ? '<span class=\'scb_f_notebook_facs_link scb_s_notebook_facs_link scb_s_notebook_image_section_link\' e_id=\'' + soy.$$escapeHtml(eData176.id) + '\' facs_id=\'' + soy.$$escapeHtml(fData231.id) + '\'  image_id=\'' + soy.$$escapeHtml(sampleData237.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>' + soy.$$escapeHtml(sampleData237.display_text) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[sampleData237.kind].name) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[sampleData237.kind].conditions[sampleData237.conditions].name) + '</span><br/>' : '');
        }
      }
    }
    var mList263 = eData176.microscopy_list.list;
    var mListLen263 = mList263.length;
    for (var mIndex263 = 0; mIndex263 < mListLen263; mIndex263++) {
      var mData263 = mList263[mIndex263];
      if (mData263.samples_finished) {
        output.append('<span class=\'scb_s_notebook_micro_head_link\'>', soy.$$escapeHtml(mData263.name), '</span><br/>');
        var sampleList269 = mData263.lanes_list.list;
        var sampleListLen269 = sampleList269.length;
        for (var sampleIndex269 = 0; sampleIndex269 < sampleListLen269; sampleIndex269++) {
          var sampleData269 = sampleList269[sampleIndex269];
          output.append((sampleData269.lens_map.src) ? '<span class=\'scb_f_notebook_micro_link scb_s_notebook_micro_link scb_s_notebook_image_section_link\' e_id=\'' + soy.$$escapeHtml(eData176.id) + '\' micro_id=\'' + soy.$$escapeHtml(mData263.id) + '\' image_id=\'' + soy.$$escapeHtml(sampleData269.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' notebook_id=\'' + soy.$$escapeHtml(opt_data.notebook.id) + '\' section_id=\'' + soy.$$escapeHtml(opt_data.section.id) + '\'>' + soy.$$escapeHtml(sampleData269.display_text) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[sampleData269.kind].name) + ' - ' + soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[sampleData269.kind].conditions[sampleData269.slide_conditions].name) + '</span><br/>' : '');
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
  var hList351 = opt_data.headings;
  var hListLen351 = hList351.length;
  for (var hIndex351 = 0; hIndex351 < hListLen351; hIndex351++) {
    var hData351 = hList351[hIndex351];
    output.append('<td role=\'columnheader\' aria-label=\'', soy.$$escapeHtml(hData351.title), '\' class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData351.kind), '\'>', (hData351.kind == 'actions') ? '' : soy.$$escapeHtml(hData351.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList364 = opt_data.rows;
  var rListLen364 = rList364.length;
  for (var rIndex364 = 0; rIndex364 < rListLen364; rIndex364++) {
    var rData364 = rList364[rIndex364];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' role=\'row\' aria-label=\'Sample\' cell_treatment_id=\'', soy.$$escapeHtml(rData364.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' >');
    var cList372 = rData364.columns;
    var cListLen372 = cList372.length;
    for (var cIndex372 = 0; cIndex372 < cListLen372; cIndex372++) {
      var cData372 = cList372[cIndex372];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData372.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\'  rowspan="', soy.$$escapeHtml(cData372.rows), '">', (cData372.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png" role=\'presentation\'>' : '', (cData372.kind == 'collection' && cData372.title == 'default' || cData372.kind == 'actions') ? '' : soy.$$escapeHtml(cData372.title), '</td>');
    }
    output.append('</tr>');
  }
  output.append('</tbody></table>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.wb_lane = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_western_blot\'><div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'>Gel Type:', (opt_data.western_blot.gel_type == '.10') ? '&nbsp;&nbsp;&nbsp;10%' : '', (opt_data.western_blot.gel_type == '.12') ? '&nbsp;&nbsp;&nbsp;12%' : '', (opt_data.western_blot.gel_type == '.15') ? '&nbsp;&nbsp;&nbsp;15%' : '', '</div><div class=\'scb_s_western_blot_samples_heading\' role=\'heading\'>Samples</div><div id=\'scb_s_western_blot_choose_samples_order\' class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list scb_s_western_blot_static_list\' role=\'list\' aria-labelledby=\'scb_s_western_blot_choose_samples_order\'>');
  var rList404 = opt_data.rows;
  var rListLen404 = rList404.length;
  for (var rIndex404 = 0; rIndex404 < rListLen404; rIndex404++) {
    var rData404 = rList404[rIndex404];
    output.append((rData404.kind == 'existing' && opt_data.western_blot.marker_loaded == true && rData404.lane_id == 'marker') ? '<li role=\'listitem\' class="scb_s_western_blot_marker scb_s_western_blot_choose_samples_list" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' >Marker</li>' : '', (rData404.is_valid) ? '<li role=\'listitem\' class="scb_s_western_blot_choose_samples_list" title=\'' + soy.$$escapeHtml(rData404.display_text) + ' - ' + soy.$$escapeHtml(rData404.lane_name) + '\' id="' + soy.$$escapeHtml(rData404.lane_id) + '">' + soy.$$escapeHtml(rData404.display_text) + ' - ' + soy.$$escapeHtml(rData404.lane_name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.western_blot.marker_loaded == false) ? '<div class=\'scb_s_western_blot_marker scb_s_western_blot_marker_not\'>No marker loaded.</div>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\' style=\'width:536px;\'><div class=\'scb_s_western_blot_gel_tabs\' role=\'tablist\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\' role=\'tab\'><div class=\'scb_s_western_blot_gel_tab_selected\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\' >', soy.$$escapeHtml(opt_data.western_blot_gel.name), '</div></span></div><div class=\'scb_s_western_blot_gel_content\' style=\'width: 527px;\'><div class=\'scb_s_western_blot_gel\' is_developed=\'', soy.$$escapeHtml(opt_data.western_blot_gel.is_developed), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  scb_western_blot.display_western_blot_numbers(null, output);
  output.append('<div class=\'scb_s_western_blot_gel_canvas_wrapper\'><canvas id="', soy.$$escapeHtml(opt_data.western_blot_gel.id), '" class=\'scb_s_western_blot_gel_canvas\' style="width:346px;height:247px" width=\'375\' height=\'247\' role=\'presentation\'></canvas></div></div><div class=\'scb_s_western_blot_tools\'><h1 role=\'heading\' >Blotting Conditions</h1><div class=\'scb_s_wb_primary_antibody\'>Primary antibody:<div>', soy.$$escapeHtml(opt_data.assignment.template.primary_anti_body[opt_data.western_blot_gel.primary_anti_body].name), '</div></div><div class=\'scb_s_wb_secondary_antibody\'>Secondary antibody:<div>', soy.$$escapeHtml(opt_data.assignment.template.secondary_anti_body[opt_data.western_blot_gel.secondary_anti_body].name), '</div></div><h1 class=\'scb_s_wb_analysis_tools_title\' role=\'heading\'>Analysis Tools</h1><div class=\'scb_s_wb_exposure_time\'>Exposure time:<div id=\'scb_s_wb_exposure_time_value\' class=\'scb_s_wb_exposure_time_value\'>', soy.$$escapeHtml(opt_data.exposure_time), '</div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.facs_lane = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_samples_graph_area\'><div class=\'scb_s_western_blot_gel_tabs\' role=\'tablist\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab \' role=\'tab\'><div class=\'scb_s_facs_gel_tab_selected\'>', soy.$$escapeHtml(opt_data.lane.display_text), ' - ', soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[opt_data.lane.kind].name), ' - ', soy.$$escapeHtml(opt_data.assignment.template.facs_kinds[opt_data.lane.kind].conditions[opt_data.lane.conditions].name), '</div></span></div><div class=\'scb_s_western_blot_gel_content\'><div class=\'scb_s_facs_chart_wrapper\'><div class=\'scb_s_facs_chart_xaxis\'>', (opt_data.lane && opt_data.lane.kinds[opt_data.lane.kind].conditions) ? soy.$$escapeHtml(opt_data.lane.kinds[opt_data.lane.kind].conditions[opt_data.lane.conditions].name) : 'PI', ' Fluorescence</div><div class=\'scb_s_facs_chart_yaxis\'>Number of cells (thousands)</div><div class=\'scb_s_facs_chart_helper\'></div><div class=\'scb_s_facs_chart_guider\'></div><div class=\'scb_s_facs_chart\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\'', (opt_data.facs.lane_selected) ? 'facs_lane_id=\'' + soy.$$escapeHtml(opt_data.facs.lane_selected) + '\'' : '', '></div></div><div class=\'scb_s_facs_tools\'>');
  if (opt_data.lane.canvas_metadata_analysis) {
    if (opt_data.lane.canvas_metadata_analysis.ranges) {
      if (opt_data.lane.canvas_metadata_analysis.ranges.length > 0) {
        output.append('<table class=\'scb_s_facs_tools_analyze_data\' role=\'grid\'><thead><tr><td role=\'columnheader\'></td><td role=\'columnheader\'></td><td role=\'columnheader\'>', (opt_data.lane && opt_data.lane.kinds[opt_data.lane.kind].conditions) ? soy.$$escapeHtml(opt_data.lane.kinds[opt_data.lane.kind].conditions[opt_data.lane.conditions].name) : 'PI', ' Fluorescence</td><td role=\'columnheader\'>% Cells</td><td role=\'columnheader\'></td></tr></thead><tbody>');
        var rangeList502 = opt_data.lane.canvas_metadata_analysis.ranges;
        var rangeListLen502 = rangeList502.length;
        for (var rangeIndex502 = 0; rangeIndex502 < rangeListLen502; rangeIndex502++) {
          var rangeData502 = rangeList502[rangeIndex502];
          output.append('<tr role=\'row\'><td class="', (rangeData502.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData502.display_id), '</td><td class="', (rangeData502.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData502.bisector_id), '</td><td class="', (rangeData502.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData502.from), ' - ', soy.$$escapeHtml(rangeData502.to), '</td><td class="', (rangeData502.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '">', soy.$$escapeHtml(rangeData502.percentage), '</td><td class="', (rangeData502.bisector_id == 'b') ? 'scb_s_facs_tools_analyze_bisector_border' : '', '"><img class=\'scb_f_facs_analyze_remove_point scb_s_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData502.from), '\' to=\'', soy.$$escapeHtml(rangeData502.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
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
  output.append('<div class=\'scb_s_microscopy_samples_slide_area\'><div class=\'scb_s_western_blot_gel_tabs\' role=\'tablist\'><span class=\'scb_s_western_blot_gel_active scb_s_microscopy_slide_tab \' role=\'tab\'><div class=\'scb_s_microscopy_gel_tab_selected\'>', soy.$$escapeHtml(opt_data.lane.display_text), ' - ', soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[opt_data.lane.kind].name), ' - ', soy.$$escapeHtml(opt_data.assignment.template.micro_kinds[opt_data.lane.kind].conditions[opt_data.lane.slide_conditions].name), '</div></span></div><div class=\'scb_s_microscopy_slide_content\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\'', (opt_data.microscopy.lane_selected) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy.lane_selected) + '\'' : '', '><div id=\'scb_s_microscopy_slide_content_lens_outline\' role=\'widget\' aria-label=\'Slide Lens, assistance needed to use\'></div></div></div>');
  return opt_sb ? '' : output.toString();
};
