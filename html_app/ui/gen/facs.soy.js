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
  var wbList77 = opt_data.experiment.facs_list.list;
  var wbListLen77 = wbList77.length;
  for (var wbIndex77 = 0; wbIndex77 < wbListLen77; wbIndex77++) {
    var wbData77 = wbList77[wbIndex77];
    output.append((opt_data.facs.id == wbData77.id) ? '<span class=\'scb_s_facs_active\'><span class=\'scb_s_facs_selected\' facs_id=\'' + soy.$$escapeHtml(wbData77.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData77.name) + '</span><!--<button class=\'scb_f_facs_remove\' facs_id=\'' + soy.$$escapeHtml(wbData77.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button>--></span>' : '<a class=\'scb_f_open_facs scb_s_facs_open_facs\' href=\'#view=facs&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&facs_id=' + soy.$$escapeHtml(wbData77.id) + '\' facs_id=\'' + soy.$$escapeHtml(wbData77.id) + '\'>' + soy.$$escapeHtml(wbData77.name) + '</a>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_facs.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_facs.display_facs_progress({step: 1}, output);
  output.append('<div class=\'scb_s_facs_samples_table\'><table><thead class=\'scb_s_facs_samples_table_head\'><td class=\'scb_s_facs_samples_table_heading\'>Select</td><td class=\'scb_s_facs_samples_table_heading\'>Samples</td><td class=\'scb_s_facs_samples_table_heading\'>Cell Treatment</td><td class=\'scb_s_facs_samples_table_heading\'>DNA Content Treatment</td><td class=\'scb_s_facs_samples_table_heading\'>&nbsp;</td></thead>');
  var rList113 = opt_data.rows;
  var rListLen113 = rList113.length;
  for (var rIndex113 = 0; rIndex113 < rListLen113; rIndex113++) {
    var rData113 = rList113[rIndex113];
    output.append('<tr class=\'scb_s_facs_samples_table_tr\'><td class=\'scb_s_facs_samples_table_td\'>', (rData113.display_sample) ? '<input type="checkbox" class="scb_f_facs_sample_active" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData113.cell_treatment.id) + '\'' + ((rData113.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_facs_samples_table_td\'>', (rData113.display_sample) ? soy.$$escapeHtml(rData113.display_text) : '', '</td><td class=\'scb_s_facs_samples_table_td\'><input type="radio" checked="checked">Fixed</input><input type="radio" disabled=\'disabled\'><span style=\'opacity: .25\'>Live</span></input></td><td class=\'scb_s_facs_samples_table_td\'>');
    scb_facs.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, facs: opt_data.facs, cell_treatment: rData113.cell_treatment, kinds: opt_data.kinds, lane: rData113}, output);
    output.append('</td><td class=\'scb_s_facs_samples_table_td\'>', (rData113.kind == 'existing') ? '<button class="scb_f_facs_sample_remove" facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData113.lane.id) + '\'' + ((rData113.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '<button class="scb_f_facs_sample_remove" disabled="disabled">X</button>', '</td></tr>');
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
    var kList212 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen212 = kList212.length;
    for (var kIndex212 = 0; kIndex212 < kListLen212; kIndex212++) {
      var kData212 = kList212[kIndex212];
      output.append('<option value=\'', soy.$$escapeHtml(kData212), '\'', (opt_data.lane.lane.kind == kData212) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData212].name), '</option>');
    }
  } else {
    output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
    var kList227 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen227 = kList227.length;
    for (var kIndex227 = 0; kIndex227 < kListLen227; kIndex227++) {
      var kData227 = kList227[kIndex227];
      output.append('<option value=\'', soy.$$escapeHtml(kData227), '\'>', soy.$$escapeHtml(opt_data.kinds[kData227].name), '</option>');
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
  var rList245 = opt_data.rows;
  var rListLen245 = rList245.length;
  for (var rIndex245 = 0; rIndex245 < rListLen245; rIndex245++) {
    var rData245 = rList245[rIndex245];
    output.append((rData245.is_valid) ? '<li facs_id=\'' + soy.$$escapeHtml(opt_data.facs.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '" facs_lane_id=\'' + soy.$$escapeHtml(rData245.lane.id) + '\'' + ((opt_data.facs.lane_selected == rData245.lane.id) ? 'class=\'scb_s_facs_sample_selected\'' : '') + '>' + soy.$$escapeHtml(rData245.display_text) + ' - ' + soy.$$escapeHtml(rData245.lane.kinds[rData245.lane.kind].name) + '</li>' : '');
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
    output.append('<h1>Flow Cytometry Analysis</h1><button class=\'scb_s_facs_tools_instructions_followup_toggle\'>Click here to hide instructions</button><div class=\'scb_s_facs_tools_instructions_followup\'><ul><li>To calculate the percentage of cells within segments of the graph, click on the graph and draw a segment bounded by the vertical lines provided. Repeat to create another segment.</li><li>To alter the position of the segment, drag the vertical line into the appropriate position.</li><li>To apply the analysis to all of your samples, select <b>Apply to All</b>.</li></ul></div>');
    if (opt_data.lane.canvas_metadata_analysis) {
      if (opt_data.lane.canvas_metadata_analysis.ranges) {
        if (opt_data.lane.canvas_metadata_analysis.ranges.length > 0) {
          output.append('<table class=\'scb_s_facs_tools_analyze_data\'><thead><tr><td></td><td>PI Fluorescence</td><td>% Cells</td><td></td></tr></thead><tbody>');
          var rangeList309 = opt_data.lane.canvas_metadata_analysis.ranges;
          var rangeListLen309 = rangeList309.length;
          for (var rangeIndex309 = 0; rangeIndex309 < rangeListLen309; rangeIndex309++) {
            var rangeData309 = rangeList309[rangeIndex309];
            output.append('<tr><td><div style=\'background-color:', soy.$$escapeHtml(rangeData309.color), '; width:12px; height:12px\'></div></td><td>', soy.$$escapeHtml(rangeData309.from), ' - ', soy.$$escapeHtml(rangeData309.to), '</td><td>', soy.$$escapeHtml(rangeData309.percentage), '</td><td><img class=\'scb_f_facs_analyze_remove_point\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' facs_id=\'', soy.$$escapeHtml(opt_data.facs.id), '\' facs_lane_id=\'', soy.$$escapeHtml(opt_data.lane.id), '\' from=\'', soy.$$escapeHtml(rangeData309.from), '\' to=\'', soy.$$escapeHtml(rangeData309.to), '\' alt="Delete" title="Delete" src="images/setup/scb_remove.png"></td></tr>');
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
