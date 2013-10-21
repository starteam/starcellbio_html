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
  output.append('<div class=\'scb_facs_details_view\'><div class=\'scb_s_facs_all_tabs\'><div class=\'scb_facs_details_view_inner\'>');
  scb_facs.display_tabs(opt_data, output);
  output.append('</div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_facs.display_tabs_selector(opt_data, output);
  output.append('<div class=\'scb_s_facs_tab_content ', (opt_data.kind == ' sample_prep') ? 'scb_s_facs_tab_content_sample_prep' : '', '\'>');
  if (opt_data.kind == 'sample_prep') {
    scb_facs.sample_prep(opt_data, output);
    output.append('</div>');
  }
  if (opt_data.kind == 'analyze') {
    scb_facs.analyze(opt_data, output);
    output.append('</div>');
  }
  output.append('<a class=\'scb_s_navigation_button scb_f_facs_prepare_lysates\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> PREPARE SAMPLES  &nbsp; &#9654;</a><a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_facs" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_tabs\'>');
  if (opt_data.experiment.facs_list.list.length < 6) {
    var wbList95 = opt_data.experiment.facs_list.list;
    var wbListLen95 = wbList95.length;
    for (var wbIndex95 = 0; wbIndex95 < wbListLen95; wbIndex95++) {
      var wbData95 = wbList95[wbIndex95];
      output.append((opt_data.facs.id == wbData95.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData95.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData95.name) + '</span><button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData95.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData95.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData95.id) + '\'>' + soy.$$escapeHtml(wbData95.name) + '</a>');
    }
    output.append('<span class=\'scb_s_facs_add_facs\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.experiment.facs_list.list[opt_data.experiment.facs_list.list.length - 1].id), '\'><a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_facs_add_cross_facs\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_facs_left_facs\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#x25c0;</button>');
    var wbList145 = opt_data.experiment.facs_list.list;
    var wbListLen145 = wbList145.length;
    for (var wbIndex145 = 0; wbIndex145 < wbListLen145; wbIndex145++) {
      var wbData145 = wbList145[wbIndex145];
      output.append((wbIndex145 >= opt_data.experiment.facs_list.start_tabs_index && wbIndex145 < opt_data.experiment.facs_list.start_tabs_index + 5) ? (opt_data.facs.id == wbData145.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData145.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData145.name) + '</span><button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData145.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData145.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData145.id) + '\'>' + soy.$$escapeHtml(wbData145.name) + '</a>' : '');
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
  var rList212 = opt_data.rows;
  var rListLen212 = rList212.length;
  for (var rIndex212 = 0; rIndex212 < rListLen212; rIndex212++) {
    var rData212 = rList212[rIndex212];
    output.append('<tr class=\'scb_s_facs_samples_table_tr \'><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:73px;\'>', (rData212.display_sample) ? '<input type="checkbox" class="scb_f_facs_sample_active" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData212.cell_treatment.id) + '\'' + ((rData212.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:343px;\'>', (rData212.display_sample) ? soy.$$escapeHtml(rData212.display_text) : '', '</td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:185px;\'><input type="radio" checked="checked" class=\'facs_locked\'><span class=\'facs_locked\'>Fixed</span></input><input type="radio" disabled=\'disabled\'><span style=\'opacity:0.25;\'>Live</span></input></td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:267px;\'>');
    scb_facs.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, cell_treatment: rData212.cell_treatment, kinds: opt_data.kinds, lane: rData212}, output);
    output.append('</td><td class=\'scb_s_facs_samples_table_td scb_s_experiment_setup_table_border\'>', (rData212.kind == 'existing') ? '<button class="scb_f_facs_sample_remove" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData212.lane.id) + '\'' + ((rData212.is_sample_enabled) ? '' : 'disabled="disabled"') + '>&#215;</button>' : '<button class="scb_f_facs_sample_remove" disabled="disabled">&#215;</button>', '</td></tr>');
  }
  output.append('<tr>', (opt_data.rows.length >= 10) ? '<tr class=\'scb_s_western_blot_samples_select_all_rel\'><td colspan=\'2\' class=\'scb_f_facs_sample_active_all_td\' ><button class=\'scb_f_facs_sample_active_all\'>SELECT ALL</button></td><td colspan=\'3\' align=\'right\' class=\'scb_f_facs_sample_inactive_all_td\' ><button class=\'scb_f_facs_sample_inactive_all\'>CLEAR ALL</button></td></tr>' : '<tr class=\'scb_s_facs_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_facs_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_facs_blank_space1\'></td><td colspan=\'1\' >&nbsp;</td><td colspan=\'1\'><button class=\'scb_f_facs_sample_inactive_all\'>CLEAR ALL</button></td><td colspan=\'1\' >&nbsp;</td></tr>', '</tr></table></div>', (opt_data.rows.length >= 10) ? '<div class="scb_s_western_blot_green_line"></div>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_facs_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_progress\'><span class=\'scb_s_western_blot_progress_prefix_group1\'><img class=\'scb_s_western_blot_progress_prefix_img\' src="images/western_blot/backbackback.png"><div class=\'scb_experiment_step_selected scb_s_experiment_step_circle\'><div class=\'scb_s_western_blot_progress_prefix\'>5</div></div></span><span class=\'scb_s_western_blot_progress_prefix_group2\'><div class=\'scb_s_western_blot_progress_prefix_text\'>PERFORM FLOW CYTOMETRY</div><div class=\'scb_s_facs_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 ', (opt_data.step >= 1) ? 'scb_s_western_blot_progress_selected' : '', '\'>1. Sample Prep</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 ', (opt_data.step >= 2) ? 'scb_s_western_blot_progress_selected' : '', '\'>2. Run</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3 ', (opt_data.step >= 3) ? 'scb_s_western_blot_progress_selected' : '', '\'>3. Analyze</div></div></span></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_facs_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
  if (opt_data.lane.kind == 'existing') {
    var kList310 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen310 = kList310.length;
    for (var kIndex310 = 0; kIndex310 < kListLen310; kIndex310++) {
      var kData310 = kList310[kIndex310];
      output.append('<option value=\'', soy.$$escapeHtml(kData310), '\'', (opt_data.lane.lane.kind == kData310) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData310].name), '</option>');
    }
  } else {
    output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
    var kList325 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen325 = kList325.length;
    for (var kIndex325 = 0; kIndex325 < kListLen325; kIndex325++) {
      var kData325 = kList325[kIndex325];
      output.append('<option value=\'', soy.$$escapeHtml(kData325), '\'>', soy.$$escapeHtml(opt_data.kinds[kData325].name), '</option>');
    }
  }
  output.append('</select>');
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
  var rList343 = opt_data.rows;
  var rListLen343 = rList343.length;
  for (var rIndex343 = 0; rIndex343 < rListLen343; rIndex343++) {
    var rData343 = rList343[rIndex343];
    output.append((rData343.is_valid) ? '<li facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '" facs_lane_id=\'' + soy.$$escapeHtml(rData343.lane.id) + '\'' + ((opt_data.facs.lane_selected == rData343.lane.id) ? 'class=\'scb_s_facs_sample_selected\'' : '') + '>' + soy.$$escapeHtml(rData343.display_text) + ' - ' + soy.$$escapeHtml(rData343.lane.kinds[rData343.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.facs.samples_finished) ? '' : '<button class=\'' + ((opt_data.rows_valid > 9) ? 'scb_f_facs_run_samples' : 'scb_f_facs_run_samples_short') + '  scb_s_navigation_button\' facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '">RUN SAMPLES</button>', '</div><div class=\'scb_s_facs_samples_graph_area\'><div class=\'scb_s_western_blot_gel_tabs\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_facs_gel_tab_selected\'>PI</div></span></div>');
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
          var rangeList413 = opt_data.lane.canvas_metadata_analysis.ranges;
          var rangeListLen413 = rangeList413.length;
          for (var rangeIndex413 = 0; rangeIndex413 < rangeListLen413; rangeIndex413++) {
            var rangeData413 = rangeList413[rangeIndex413];
            output.append('<tr><td><div style=\'background-color:', soy.$$escapeHtml(rangeData413.color), '; width:12px; height:12px\'></div></td><td>', soy.$$escapeHtml(rangeData413.from), ' - ', soy.$$escapeHtml(rangeData413.to), '</td><td>', soy.$$escapeHtml(rangeData413.percentage), '</td><td><img class=\'scb_f_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData413.from), '\' to=\'', soy.$$escapeHtml(rangeData413.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
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
