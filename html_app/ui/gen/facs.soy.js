// This file was automatically generated from facs.soy.
// Please don't edit this file by hand.

if (typeof scb_facs == 'undefined') { var scb_facs = {}; }


scb_facs.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, last_step: opt_data.last_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'FLOW CYTOMETRY', technique_view: 'facs', technique_param: 'facs_id', technique_id: opt_data.facs.id}, output);
  scb_facs.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_container\'><div class=\'scb_facs_details_view\'>');
  scb_common.experiment_step({step: 6, last_step: 6, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<div class=\'scb_s_facs_all_tabs\'><div class=\'scb_facs_details_view_inner\'>');
  scb_facs.display_tabs(opt_data, output);
  output.append('<a class=\'scb_s_navigation_button scb_f_facs_prepare_lysates\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> PREPARE SAMPLES  &nbsp; &#9654;</a></div><a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_facs" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_tab_content ', (opt_data.kind == ' sample_prep') ? 'scb_s_facs_tab_content_sample_prep' : '', '\'>');
  scb_facs.display_tabs_selector(opt_data, output);
  if (opt_data.kind == 'sample_prep') {
    scb_facs.sample_prep(opt_data, output);
    output.append('</div>');
  }
  if (opt_data.kind == 'analyze') {
    scb_facs.analyze(opt_data, output);
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_tabs\'>');
  if (opt_data.experiment.facs_list.list.length < 6) {
    var wbList100 = opt_data.experiment.facs_list.list;
    var wbListLen100 = wbList100.length;
    for (var wbIndex100 = 0; wbIndex100 < wbListLen100; wbIndex100++) {
      var wbData100 = wbList100[wbIndex100];
      output.append((opt_data.facs.id == wbData100.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData100.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData100.name) + '</span><button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData100.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData100.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData100.id) + '\'>' + soy.$$escapeHtml(wbData100.name) + '</a>');
    }
    output.append('<span class=\'scb_s_facs_add_facs\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.experiment.facs_list.list[opt_data.experiment.facs_list.list.length - 1].id), '\'><a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_facs_add_cross_facs\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_facs_left_facs\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#x25c0;</button>');
    var wbList150 = opt_data.experiment.facs_list.list;
    var wbListLen150 = wbList150.length;
    for (var wbIndex150 = 0; wbIndex150 < wbListLen150; wbIndex150++) {
      var wbData150 = wbList150[wbIndex150];
      output.append((wbIndex150 >= opt_data.experiment.facs_list.start_tabs_index && wbIndex150 < opt_data.experiment.facs_list.start_tabs_index + 5) ? (opt_data.facs.id == wbData150.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData150.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData150.name) + '</span><button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData150.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData150.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData150.id) + '\'>' + soy.$$escapeHtml(wbData150.name) + '</a>' : '');
    }
    output.append('<span class=\'scb_s_facs_add_facs\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.experiment.facs_list.list[opt_data.experiment.facs_list.list.length - 1].id), '\'><a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_facs_add_cross_facs\'>| + </span></a></span><button class=\'scb_s_facs_right_facs\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' >&#x25b6;</button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_facs.display_facs_progress({step: 1}, output);
  output.append('<div class=\'scb_s_facs_samples_container\' style=\'', (opt_data.rows.length >= 12) ? '  height: 306px;\t' : ' \theight:auto;', '\'><div class=\'scb_s_facs_samples_table\' style=\'', (opt_data.rows.length >= 12) ? ' height: 216px;   min-height: 300px;  ' : ' \theight:auto;', '\'><table><thead class=\'scb_s_facs_samples_table_head\'><td class=\'scb_s_facs_samples_table_heading sample_prep_select_facs\'>Select</td><td class=\'scb_s_facs_samples_table_heading sample_prep_samples_facs\'>Samples</td><td class=\'scb_s_facs_samples_table_heading sample_prep_cellt_facs\'>Cell Treatment</td><td class=\'scb_s_facs_samples_table_heading sample_prep_dna_facs\'>DNA Content Treatment</td><td class=\'scb_s_facs_samples_table_heading sample_prep_blank_facs\'>&nbsp;</td></thead>');
  var rList217 = opt_data.rows;
  var rListLen217 = rList217.length;
  for (var rIndex217 = 0; rIndex217 < rListLen217; rIndex217++) {
    var rData217 = rList217[rIndex217];
    output.append('<tr class=\'scb_s_facs_samples_table_tr \'><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:73px;\'>', (rData217.display_sample) ? '<input type="checkbox" class="scb_f_facs_sample_active" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData217.cell_treatment.id) + '\'' + ((rData217.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:343px;\'>', (rData217.display_sample) ? soy.$$escapeHtml(rData217.display_text) : '', '</td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:185px;\'><input type="radio" checked="checked" class=\'facs_locked\'><span class=\'facs_locked\'>Fixed</span></input><input type="radio" disabled=\'disabled\'><span style=\'opacity:0.25;\'>Live</span></input></td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:267px;\'>');
    scb_facs.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, cell_treatment: rData217.cell_treatment, kinds: opt_data.kinds, lane: rData217}, output);
    output.append('</td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\'>', (rData217.kind == 'existing') ? '<button class="scb_f_facs_sample_remove" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData217.lane.id) + '\'' + ((rData217.is_sample_enabled) ? '' : 'disabled="disabled"') + '>&#215;</button>' : '<button class="scb_f_facs_sample_remove" disabled="disabled">&#215;</button>', '</td></tr>');
  }
  output.append('<tr>', (opt_data.rows.length >= 10) ? '<tr class=\'scb_s_western_blot_samples_select_all_rel\'><td colspan=\'2\' class=\'scb_f_facs_sample_active_all_td\' ><button class=\'scb_f_facs_sample_active_all\'>SELECT ALL</button></td><td colspan=\'3\' align=\'right\' class=\'scb_f_facs_sample_inactive_all_td\' ><button class=\'scb_f_facs_sample_inactive_all\'>CLEAR ALL</button></td></tr>' : '<tr class=\'scb_s_facs_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_facs_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_facs_blank_space1\'></td><td colspan=\'1\' >&nbsp;</td><td colspan=\'1\'><button class=\'scb_f_facs_sample_inactive_all\'>CLEAR ALL</button></td><td colspan=\'1\' >&nbsp;</td></tr>', '</tr></table></div>', (opt_data.rows.length >= 10) ? '<div class="scb_s_western_blot_green_line"></div>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_facs_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_progress\'><div class=\'scb_s_facs_vertical_line_1\'></div><div class=\'scb_s_facs_vertical_line_4\'></div><div class=\'scb_s_facs_vertical_line_7\'></div><div class=\'scb_s_western_blot_progress_bar\'><div class = \'scb_s_western_blot_progress_gray_bar\'><div class=\'scb_s_facs_vertical_line_1_top\'></div><div class=\'scb_s_facs_vertical_line_4_top\'></div><div class=\'scb_s_facs_vertical_line_7_top\'></div><div class=\'scb_s_western_blot_progress_stripe_bar\' style=\'width:', (opt_data.step == 1) ? '166px;' : '', (opt_data.step == 2) ? ' 430px;' : '', (opt_data.step == 3) ? '607px; border-top-right-radius:8px; border-bottom-right-radius:8px;' : '', '\'></div></div><div class=\'scb_s_facs_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1\'>1. Sample Prep</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2\'>2. Run</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3\'>3. Analyze</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (soy.$$getMapKeys(opt_data.kinds).length == 1) {
    var kList293 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen293 = kList293.length;
    for (var kIndex293 = 0; kIndex293 < kListLen293; kIndex293++) {
      var kData293 = kList293[kIndex293];
      output.append('<span class="scb_f_facs_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" value="', soy.$$escapeHtml(kData293), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '">', soy.$$escapeHtml(opt_data.kinds[kData293].name), '</span>');
    }
  } else {
    output.append('<select class="scb_f_facs_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
    if (opt_data.lane.kind == 'existing') {
      var kList337 = soy.$$getMapKeys(opt_data.kinds);
      var kListLen337 = kList337.length;
      for (var kIndex337 = 0; kIndex337 < kListLen337; kIndex337++) {
        var kData337 = kList337[kIndex337];
        output.append('<option value=\'', soy.$$escapeHtml(kData337), '\'', (opt_data.lane.lane.kind == kData337) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData337].name), '</option>');
      }
    } else {
      output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
      var kList352 = soy.$$getMapKeys(opt_data.kinds);
      var kListLen352 = kList352.length;
      for (var kIndex352 = 0; kIndex352 < kListLen352; kIndex352++) {
        var kData352 = kList352[kIndex352];
        output.append('<option value=\'', soy.$$escapeHtml(kData352), '\'>', soy.$$escapeHtml(opt_data.kinds[kData352].name), '</option>');
      }
    }
    output.append('</select>');
  }
  return opt_sb ? '' : output.toString();
};


scb_facs.analyze = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_tab_content_analyze\'>');
  if (opt_data.facs.samples_finished) {
    scb_facs.display_facs_progress({step: 3}, output);
  } else {
    scb_facs.display_facs_progress({step: 2}, output);
  }
  output.append('<div class=\'scb_s_facs_samples_area\'><div class=\'scb_s_facs_samples_heading\'>Samples</div><div class=\'scb_s_facs_choose_samples_order\'><ol class=\'scb_s_facs_choose_samples_order_list\'>');
  var rList370 = opt_data.rows;
  var rListLen370 = rList370.length;
  for (var rIndex370 = 0; rIndex370 < rListLen370; rIndex370++) {
    var rData370 = rList370[rIndex370];
    output.append((rData370.is_valid) ? '<li facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '" facs_lane_id=\'' + soy.$$escapeHtml(rData370.lane.id) + '\'' + ((opt_data.facs.lane_selected == rData370.lane.id) ? 'class=\'scb_s_facs_sample_selected\'' : '') + '>&nbsp;&nbsp;' + soy.$$escapeHtml(rData370.display_text) + ' - ' + soy.$$escapeHtml(rData370.lane.kinds[rData370.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.facs.samples_finished) ? '' : '<button class=\'' + ((opt_data.rows_valid > 9) ? 'scb_f_facs_run_samples' : 'scb_f_facs_run_samples_short') + '  scb_s_gray_button\' facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '">RUN SAMPLES</button>', '</div><div class=\'scb_s_facs_samples_graph_area\'><div class=\'scb_s_western_blot_gel_tabs\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_facs_gel_tab_selected\'>PI</div></span></div>');
  scb_facs.display_graph({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, facs_line_id: opt_data.facs.lane_selected, lane: opt_data.facs.selected_lane}, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_graph = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_gel_content\'><div class=\'scb_s_facs_chart_wrapper\'><div class=\'scb_s_facs_chart_xaxis\'>PI Fluorescence</div><div class=\'scb_s_facs_chart_yaxis\'>Number of cells (thousands)</div><div class=\'scb_s_facs_chart_helper\'></div><div class=\'scb_s_facs_chart\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\'', (opt_data.facs_line_id) ? 'facs_lane_id=\'' + soy.$$escapeHtml(opt_data.facs_line_id) + '\'' : '', '></div></div><div class=\'scb_s_facs_tools\'>');
  if (opt_data.facs.sample_analysis) {
    output.append('<h1>Flow Cytometry Analysis</h1><button class=\'scb_s_facs_tools_instructions_followup_toggle scb_s_gray_button\'>SHOW INSTRUCTIONS</button><div class=\'scb_s_facs_tools_instructions_followup\'><ul><li>Click and drag within the histogram to draw a segment. The % of cells within the segment will be calculated.</li><li>Select <b>Apply to All</b> to apply the same analysis parameters to all samples.</ul></div>');
    if (opt_data.lane.canvas_metadata_analysis) {
      if (opt_data.lane.canvas_metadata_analysis.ranges) {
        if (opt_data.lane.canvas_metadata_analysis.ranges.length > 0) {
          output.append('<table class=\'scb_s_facs_tools_analyze_data\'><thead><tr><td></td><td>PI Fluorescence</td><td>% Cells</td><td></td></tr></thead><tbody>');
          var rangeList440 = opt_data.lane.canvas_metadata_analysis.ranges;
          var rangeListLen440 = rangeList440.length;
          for (var rangeIndex440 = 0; rangeIndex440 < rangeListLen440; rangeIndex440++) {
            var rangeData440 = rangeList440[rangeIndex440];
            output.append('<tr><td><div style=\'background-color:', soy.$$escapeHtml(rangeData440.color), '; width:12px; height:12px\'></div></td><td>', soy.$$escapeHtml(rangeData440.from), ' - ', soy.$$escapeHtml(rangeData440.to), '</td><td>', soy.$$escapeHtml(rangeData440.percentage), '</td><td><img class=\'scb_f_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData440.from), '\' to=\'', soy.$$escapeHtml(rangeData440.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
          }
          output.append('</tbody></table><span class=\'scb_s_facs_apply\'><input type="checkbox" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' class=\'scb_f_facs_apply_to_all\'', (opt_data.facs.apply_dna_analysis_to_all) ? 'checked=\'checked\'' : '', '> Apply to all</span>');
        }
      }
    }
  } else {
    output.append('<div class=\'scb_s_facs_tools_instructions_initial\'><!-- To view the flow cytometry data for each sample, select the sample name in the Samples window to the left. --></div><button class=\'scb_f_facs_tools_start_analysis scb_s_navigation_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\'>ANALYZE DATA</button>');
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};
