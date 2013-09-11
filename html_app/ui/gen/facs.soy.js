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
  output.append('<div class=\'scb_facs_details_view\'><div class=\'scb_facs_details_view_inner\'>');
  scb_facs.display_tabs(opt_data, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_facs.display_tabs_selector(opt_data, output);
  output.append('<div class=\'scb_s_facs_tab_content ', (opt_data.kind == ' sample_prep') ? 'scb_s_facs_tab_content_sample_prep' : '', '\'>');
  if (opt_data.kind == 'sample_prep') {
    scb_facs.sample_prep(opt_data, output);
  }
  if (opt_data.kind == 'analyze') {
    scb_facs.analyze(opt_data, output);
  }
  output.append('<a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_western_blot" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_tabs\'>');
  var wbList78 = opt_data.experiment.facs_list.list;
  var wbListLen78 = wbList78.length;
  for (var wbIndex78 = 0; wbIndex78 < wbListLen78; wbIndex78++) {
    var wbData78 = wbList78[wbIndex78];
    output.append((opt_data.facs.id == wbData78.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData78.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData78.name) + '</span><!--<button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData78.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button>--></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData78.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData78.id) + '\'>' + soy.$$escapeHtml(wbData78.name) + '</a>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_facs.display_facs_progress({step: 1}, output);
  output.append('<div class=\'scb_s_facs_samples_table\'><table><thead class=\'scb_s_facs_samples_table_head\'><td class=\'scb_s_facs_samples_table_heading\'>Select</td><td class=\'scb_s_facs_samples_table_heading\'>Samples</td><td class=\'scb_s_facs_samples_table_heading\'>Cell Treatment</td><td class=\'scb_s_facs_samples_table_heading\'>DNA Content Treatment</td><td class=\'scb_s_facs_samples_table_heading\'>&nbsp;</td></thead>');
  var rList114 = opt_data.rows;
  var rListLen114 = rList114.length;
  for (var rIndex114 = 0; rIndex114 < rListLen114; rIndex114++) {
    var rData114 = rList114[rIndex114];
    output.append('<tr class=\'scb_s_facs_samples_table_tr\'><td class=\'scb_s_facs_samples_table_td\'>', (rData114.display_sample) ? '<input type="checkbox" class="scb_f_facs_sample_active" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData114.cell_treatment.id) + '\'' + ((rData114.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_facs_samples_table_td\'>', (rData114.display_sample) ? soy.$$escapeHtml(rData114.display_text) : '', '</td><td class=\'scb_s_facs_samples_table_td\'><input type="radio" checked="checked">Fixed</input><input type="radio" disabled=\'disabled\'><span style=\'opacity: .25\'>Live</span></input></td><td class=\'scb_s_facs_samples_table_td\'>');
    scb_facs.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, cell_treatment: rData114.cell_treatment, kinds: opt_data.kinds, lane: rData114}, output);
    output.append('</td><td class=\'scb_s_facs_samples_table_td\'>', (rData114.kind == 'existing') ? '<button class="scb_f_facs_sample_remove" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData114.lane.id) + '\'' + ((rData114.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '<button class="scb_f_facs_sample_remove" disabled="disabled">X</button>', '</td></tr>');
  }
  output.append('<tr><td colspan=\'5\'><div class="scb_s_experiment_design_green_line"></div><button class=\'scb_f_facs_sample_active_all scb_s_gray_button\'>SELECT ALL</button></td></tr></table></div><a class=\'scb_s_navigation_button scb_f_facs_prepare_lysates\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> PREPARE SAMPLES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_facs_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_facs_progress\'><span class=\'scb_s_western_blot_progress_prefix_group1\'><img class=\'scb_s_western_blot_progress_prefix_img\' src="images/western_blot/backbackback.png"><div class=\'scb_experiment_step_selected scb_s_experiment_step_circle\'><div class=\'scb_s_western_blot_progress_prefix\'>5</div></div></span><span class=\'scb_s_western_blot_progress_prefix_group2\'><div class=\'scb_s_western_blot_progress_prefix_text\'>PERFORM FLOW CYTOMETRY</div><div class=\'scb_s_western_blot_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 ', (opt_data.step >= 1) ? 'scb_s_western_blot_progress_selected' : '', '\'>1. Sample Prep</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 ', (opt_data.step >= 2) ? 'scb_s_western_blot_progress_selected' : '', '\'>2. Run</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3 ', (opt_data.step >= 3) ? 'scb_s_western_blot_progress_selected' : '', '\'>3. Analyze</div></div></span></div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_facs_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
  if (opt_data.lane.kind == 'existing') {
    var kList213 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen213 = kList213.length;
    for (var kIndex213 = 0; kIndex213 < kListLen213; kIndex213++) {
      var kData213 = kList213[kIndex213];
      output.append('<option value=\'', soy.$$escapeHtml(kData213), '\'', (opt_data.lane.lane.kind == kData213) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData213].name), '</option>');
    }
  } else {
    output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
    var kList228 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen228 = kList228.length;
    for (var kIndex228 = 0; kIndex228 < kListLen228; kIndex228++) {
      var kData228 = kList228[kIndex228];
      output.append('<option value=\'', soy.$$escapeHtml(kData228), '\'>', soy.$$escapeHtml(opt_data.kinds[kData228].name), '</option>');
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
  var rList246 = opt_data.rows;
  var rListLen246 = rList246.length;
  for (var rIndex246 = 0; rIndex246 < rListLen246; rIndex246++) {
    var rData246 = rList246[rIndex246];
    output.append((rData246.is_valid) ? '<li facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '" facs_lane_id=\'' + soy.$$escapeHtml(rData246.lane.id) + '\'' + ((opt_data.facs.lane_selected == rData246.lane.id) ? 'class=\'scb_s_facs_sample_selected\'' : '') + '>' + soy.$$escapeHtml(rData246.display_text) + ' - ' + soy.$$escapeHtml(rData246.lane.kinds[rData246.lane.kind].name) + '</li>' : '');
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
          var rangeList310 = opt_data.lane.canvas_metadata_analysis.ranges;
          var rangeListLen310 = rangeList310.length;
          for (var rangeIndex310 = 0; rangeIndex310 < rangeListLen310; rangeIndex310++) {
            var rangeData310 = rangeList310[rangeIndex310];
            output.append('<tr><td><div style=\'background-color:', soy.$$escapeHtml(rangeData310.color), '; width:12px; height:12px\'></div></td><td>', soy.$$escapeHtml(rangeData310.from), ' - ', soy.$$escapeHtml(rangeData310.to), '</td><td>', soy.$$escapeHtml(rangeData310.percentage), '</td><td><img class=\'scb_f_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData310.from), '\' to=\'', soy.$$escapeHtml(rangeData310.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
          }
          output.append('</tbody></table><input type="checkbox" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' class=\'scb_f_facs_apply_to_all\'', (opt_data.facs.apply_dna_analysis_to_all) ? 'checked=\'checked\'' : '', '> Apply to all');
        }
      }
    }
  } else {
    output.append('<div class=\'scb_s_facs_tools_instructions_initial\'><!-- To view the flow cytometry data for each sample, select the sample name in the Samples window to the left. --></div><button class=\'scb_f_facs_tools_start_analysis scb_s_gray_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\'>ANALYZE DATA</button>');
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};
