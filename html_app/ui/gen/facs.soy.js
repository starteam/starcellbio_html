// This file was automatically generated from facs.soy.
// Please don't edit this file by hand.

if (typeof scb_facs == 'undefined') { var scb_facs = {}; }


scb_facs.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'FLOW CYTOMETRY', technique_view: 'facs', technique_param: 'facs_id', technique_id: opt_data.facs.id}, output);
  scb_facs.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
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
  output.append('<a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_western_blot" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_tabs\'>');
  if (opt_data.experiment.facs_list.list.length < 6) {
    var wbList82 = opt_data.experiment.facs_list.list;
    var wbListLen82 = wbList82.length;
    for (var wbIndex82 = 0; wbIndex82 < wbListLen82; wbIndex82++) {
      var wbData82 = wbList82[wbIndex82];
      output.append((opt_data.facs.id == wbData82.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData82.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData82.name) + '</span><button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData82.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| X<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData82.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData82.id) + '\'>' + soy.$$escapeHtml(wbData82.name) + '</a>');
    }
    output.append('<span class=\'scb_s_facs_add_facs\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.experiment.facs_list.list[opt_data.experiment.facs_list.list.length - 1].id), '\'><a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_facs_add_cross_facs\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_facs_left_facs\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&lt;&lt;</button>');
    var wbList132 = opt_data.experiment.facs_list.list;
    var wbListLen132 = wbList132.length;
    for (var wbIndex132 = 0; wbIndex132 < wbListLen132; wbIndex132++) {
      var wbData132 = wbList132[wbIndex132];
      output.append((wbIndex132 >= opt_data.experiment.facs_list.start_tabs_index && wbIndex132 < opt_data.experiment.facs_list.start_tabs_index + 5) ? (opt_data.facs.id == wbData132.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData132.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData132.name) + '</span><button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData132.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| X<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData132.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData132.id) + '\'>' + soy.$$escapeHtml(wbData132.name) + '</a>' : '');
    }
    output.append('<span class=\'scb_s_facs_add_facs\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.experiment.facs_list.list[opt_data.experiment.facs_list.list.length - 1].id), '\'><a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_facs_add_cross_facs\'>| + </span></a></span><button class=\'scb_s_facs_right_facs\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' >&gt;&gt;</button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_facs.display_facs_progress({step: 1}, output);
  output.append('<div class=\'scb_s_facs_samples_table\'><table><thead class=\'scb_s_facs_samples_table_head\'><td class=\'scb_s_facs_samples_table_heading\'>Select</td><td class=\'scb_s_facs_samples_table_heading\'>Samples</td><td class=\'scb_s_facs_samples_table_heading\'>Cell Treatment</td><td class=\'scb_s_facs_samples_table_heading\'>DNA Content Treatment</td><td class=\'scb_s_facs_samples_table_heading\'>&nbsp;</td></thead>');
  var rList187 = opt_data.rows;
  var rListLen187 = rList187.length;
  for (var rIndex187 = 0; rIndex187 < rListLen187; rIndex187++) {
    var rData187 = rList187[rIndex187];
    output.append('<tr class=\'scb_s_facs_samples_table_tr\'><td class=\'scb_s_facs_samples_table_td\'>', (rData187.display_sample) ? '<input type="checkbox" class="scb_f_facs_sample_active" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData187.cell_treatment.id) + '\'' + ((rData187.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_facs_samples_table_td\'>', (rData187.display_sample) ? soy.$$escapeHtml(rData187.display_text) : '', '</td><td class=\'scb_s_facs_samples_table_td\'><input type="radio" checked="checked" class=\'facs_locked\'><span class=\'facs_locked\'>Fixed</span></input><input type="radio" disabled=\'disabled\'><span style=\'opacity:0.25;\'>Live</span></input></td><td class=\'scb_s_facs_samples_table_td\'>');
    scb_facs.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, cell_treatment: rData187.cell_treatment, kinds: opt_data.kinds, lane: rData187}, output);
    output.append('</td><td class=\'scb_s_facs_samples_table_td\'>', (rData187.kind == 'existing') ? '<button class="scb_f_facs_sample_remove" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData187.lane.id) + '\'' + ((rData187.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '<button class="scb_f_facs_sample_remove" disabled="disabled">X</button>', '</td></tr>');
  }
  output.append('<tr>', (opt_data.rows.length >= 11) ? '<tr><td colspan=\'5\'><div class="scb_s_western_blot_green_line"></div></td></tr><tr class=\'scb_s_western_blot_samples_select_all_rel\'><td colspan=\'2\'><button class=\'scb_f_facs_sample_active_all scb_s_gray_button\'>SELECT ALL</button></td><td colspan=\'3\' align=\'right\'><button class=\'scb_f_facs_sample_inactive_all\'>CANCEL ALL</button></td></tr>' : '<tr class=\'scb_s_facs_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_facs_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_facs_blank_space1\'></td><td colspan=\'1\' >&nbsp;</td><td colspan=\'1\'><button class=\'scb_f_facs_sample_inactive_all\'>CANCEL ALL</button></td><td colspan=\'1\' >&nbsp;</td></tr>', '</tr></table></div><a class=\'scb_s_navigation_button scb_f_facs_prepare_lysates\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> PREPARE SAMPLES  &nbsp; &#9654;</a>');
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
    var kList292 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen292 = kList292.length;
    for (var kIndex292 = 0; kIndex292 < kListLen292; kIndex292++) {
      var kData292 = kList292[kIndex292];
      output.append('<option value=\'', soy.$$escapeHtml(kData292), '\'', (opt_data.lane.lane.kind == kData292) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData292].name), '</option>');
    }
  } else {
    output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
    var kList307 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen307 = kList307.length;
    for (var kIndex307 = 0; kIndex307 < kListLen307; kIndex307++) {
      var kData307 = kList307[kIndex307];
      output.append('<option value=\'', soy.$$escapeHtml(kData307), '\'>', soy.$$escapeHtml(opt_data.kinds[kData307].name), '</option>');
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
  var rList325 = opt_data.rows;
  var rListLen325 = rList325.length;
  for (var rIndex325 = 0; rIndex325 < rListLen325; rIndex325++) {
    var rData325 = rList325[rIndex325];
    output.append((rData325.is_valid) ? '<li facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '" facs_lane_id=\'' + soy.$$escapeHtml(rData325.lane.id) + '\'' + ((opt_data.facs.lane_selected == rData325.lane.id) ? 'class=\'scb_s_facs_sample_selected\'' : '') + '>' + soy.$$escapeHtml(rData325.display_text) + ' - ' + soy.$$escapeHtml(rData325.lane.kinds[rData325.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.facs.samples_finished) ? '' : '<button class=\'scb_f_facs_run_samples scb_s_navigation_button\' facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '">RUN SAMPLES</button>', '</div><div class=\'scb_s_facs_samples_graph_area\'><div class=\'scb_s_western_blot_gel_tabs\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_facs_gel_tab_selected\'>PI</div></span></div>');
  scb_facs.display_graph({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, facs_line_id: opt_data.facs.lane_selected, lane: opt_data.facs.selected_lane}, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_graph = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_gel_content\'><div class=\'scb_s_facs_chart_wrapper\'><div class=\'scb_s_facs_chart_xaxis\'>PI Fluorescence</div><div class=\'scb_s_facs_chart_yaxis\'>Number of cells (thousands)</div><div class=\'scb_s_facs_chart_helper\'></div><div class=\'scb_s_facs_chart\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\'', (opt_data.facs_line_id) ? 'facs_lane_id=\'' + soy.$$escapeHtml(opt_data.facs_line_id) + '\'' : '', '></div></div><div class=\'scb_s_facs_tools\'>');
  if (opt_data.facs.sample_analysis) {
    output.append('<h1>Flow Cytometry Analysis</h1><button class=\'scb_s_facs_tools_instructions_followup_toggle\'>Click here to hide instructions</button><div class=\'scb_s_facs_tools_instructions_followup\'><ul><li>Click and drag to draw a segment in the graph. The % of cells within the segment will be calculated.</li><li>Drag the vertical lines that define a segment to change its width.</li><li>Select <b>Apply to All</b> to apply the same analysis to all samples.</li></ul></div>');
    if (opt_data.lane.canvas_metadata_analysis) {
      if (opt_data.lane.canvas_metadata_analysis.ranges) {
        if (opt_data.lane.canvas_metadata_analysis.ranges.length > 0) {
          output.append('<table class=\'scb_s_facs_tools_analyze_data\'><thead><tr><td></td><td>PI Fluorescence</td><td>% Cells</td><td></td></tr></thead><tbody>');
          var rangeList389 = opt_data.lane.canvas_metadata_analysis.ranges;
          var rangeListLen389 = rangeList389.length;
          for (var rangeIndex389 = 0; rangeIndex389 < rangeListLen389; rangeIndex389++) {
            var rangeData389 = rangeList389[rangeIndex389];
            output.append('<tr><td><div style=\'background-color:', soy.$$escapeHtml(rangeData389.color), '; width:12px; height:12px\'></div></td><td>', soy.$$escapeHtml(rangeData389.from), ' - ', soy.$$escapeHtml(rangeData389.to), '</td><td>', soy.$$escapeHtml(rangeData389.percentage), '</td><td><img class=\'scb_f_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData389.from), '\' to=\'', soy.$$escapeHtml(rangeData389.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
          }
          output.append('</tbody></table><input type="checkbox" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' class=\'scb_f_facs_apply_to_all\'', (opt_data.facs.apply_dna_analysis_to_all) ? 'checked=\'checked\'' : '', '> Apply to all');
        }
      }
    }
  } else {
    output.append('<div class=\'scb_s_facs_tools_instructions_initial\'><!-- To view the flow cytometry data for each sample, select the sample name in the Samples window to the left. --></div><button class=\'scb_f_facs_tools_start_analysis scb_s_navigation_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\'>ANALYZE DATA</button>');
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};
