// This file was automatically generated from microscopy.soy.
// Please don't edit this file by hand.

if (typeof scb_microscopy == 'undefined') { var scb_microscopy = {}; }


scb_microscopy.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'MICROSCOPY', technique_view: 'microscopy', technique_param: 'microscopy_id', technique_id: opt_data.microscopy.id}, output);
  scb_microscopy.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_container\'><div class=\'scb_microscopy_details_view\'>');
  scb_common.experiment_step({step: 7, last_step: 6, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<div class=\'scb_s_microscopy_all_tabs\'><div class=\'scb_microscopy_details_view_inner\'>');
  scb_microscopy.display_tabs(opt_data, output);
  output.append('</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_tab_content ', (opt_data.kind == 'sample_prep') ? 'scb_s_microscopy_tab_content_sample_prep' : '', '\'>');
  scb_microscopy.display_tabs_selector(opt_data, output);
  if (opt_data.kind == 'sample_prep') {
    scb_microscopy.sample_prep(opt_data, output);
    output.append('</div>');
  }
  if (opt_data.kind == 'prepare_slide') {
    scb_microscopy.prepare_slide(opt_data, output);
    output.append('</div>');
  }
  output.append('<a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_microscopy" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\' ', (opt_data.experiment.microscopy_list.list.length >= 5) ? ' scb_s_microscopy_tabs_more ' : ' scb_s_microscopy_tabs', ' \'>');
  if (opt_data.experiment.microscopy_list.list.length < 5) {
    var mList96 = opt_data.experiment.microscopy_list.list;
    var mListLen96 = mList96.length;
    for (var mIndex96 = 0; mIndex96 < mListLen96; mIndex96++) {
      var mData96 = mList96[mIndex96];
      output.append((opt_data.microscopy.id == mData96.id) ? '<span class=\'scb_s_microscopy_active\'><span class=\'scb_s_microscopy_selected\' microscopy_id=\'' + soy.$$escapeHtml(mData96.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(mData96.name) + '</span><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData96.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;</button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData96.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData96.id) + '\'>' + soy.$$escapeHtml(mData96.name) + '</a>');
    }
    output.append('<span class=\'scb_s_microscopy_add_microscopy\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.experiment.microscopy_list.list[opt_data.experiment.microscopy_list.list.length - 1].id), '\'><a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_microscopy_add_cross_microscopy\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_microscopy_left_microscopy\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'></button>');
    if (opt_data.experiment.microscopy_list.list.length - 1 == opt_data.experiment.microscopy_list.start_tabs_index + 3) {
      var mList148 = opt_data.experiment.microscopy_list.list;
      var mListLen148 = mList148.length;
      for (var mIndex148 = 0; mIndex148 < mListLen148; mIndex148++) {
        var mData148 = mList148[mIndex148];
        output.append((mIndex148 >= opt_data.experiment.microscopy_list.start_tabs_index && mIndex148 < opt_data.experiment.microscopy_list.start_tabs_index + 4) ? (opt_data.microscopy.id == mData148.id) ? '<span class=\'scb_s_microscopy_active\'><input class=\'scb_s_microscopy_selected\' facs_id=\'' + soy.$$escapeHtml(mData148.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' value=\'' + soy.$$escapeHtml(mData148.name) + '\' type=\'text\' maxlength=10></input><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData148.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;</button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData148.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData148.id) + '\'>' + soy.$$escapeHtml(mData148.name) + '</a>' : '');
      }
      output.append('<span class=\'scb_s_microscopy_add_microscopy\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.experiment.microscopy_list.list[opt_data.experiment.microscopy_list.list.length - 1].id), '\'><a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_microscopy_add_cross_microscopy\'>| + </span></a></span>');
    } else {
      var mList193 = opt_data.experiment.microscopy_list.list;
      var mListLen193 = mList193.length;
      for (var mIndex193 = 0; mIndex193 < mListLen193; mIndex193++) {
        var mData193 = mList193[mIndex193];
        output.append((mIndex193 >= opt_data.experiment.microscopy_list.start_tabs_index && mIndex193 < opt_data.experiment.microscopy_list.start_tabs_index + 5) ? (opt_data.microscopy.id == mData193.id) ? '<span class=\'scb_s_microscopy_active\'><input class=\'scb_s_microscopy_selected\' facs_id=\'' + soy.$$escapeHtml(mData193.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' value=\'' + soy.$$escapeHtml(mData193.name) + '\' type=\'text\' maxlength=10></input><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData193.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;</button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData193.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData193.id) + '\'>' + soy.$$escapeHtml(mData193.name) + '</a>' : '');
      }
    }
    output.append('<button class=\'scb_s_microscopy_right_microscopy\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ></button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_microscopy.display_m_progress({step: 1}, output);
  output.append('<div class=\'scb_s_western_blot_samples_container\' style=\'', (opt_data.rows.length >= 12) ? '  height: 306px;\t' : ' \theight:auto;', '\'><div class=\'scb_s_western_blot_samples_table\'  style=\'', (opt_data.rows.length >= 12) ? ' height: 216px;   min-height: 300px;  ' : ' \theight:auto;', '\'><table><thead class=\'scb_s_microscopy_samples_table_head\'><td class=\'scb_s_microscopy_samples_table_heading m_sample_prep_select scb_s_experiment_setup_table_border\'>Select</td><td class=\'scb_s_microscopy_samples_table_heading m_sample_prep_samples scb_s_experiment_setup_table_border\'>Samples</td><td class=\'scb_s_microscopy_samples_table_heading m_sample_prep_lysate scb_s_experiment_setup_table_border\'>Slide type</td><td class=\'scb_s_microscopy_samples_table_heading m_sample_prep_blank scb_s_experiment_setup_table_border\'>Conditions</td></thead>');
  var rList250 = opt_data.rows;
  var rListLen250 = rList250.length;
  for (var rIndex250 = 0; rIndex250 < rListLen250; rIndex250++) {
    var rData250 = rList250[rIndex250];
    output.append('<tr class=\'scb_s_microscopy_samples_table_tr ', (rData250.display_sample) ? ' scb_s_microscopy_row_border' : '', '\'><td class=\'scb_s_microscopy_samples_table_td ', (rData250.display_sample) ? '' : 'scb_s_experiment_setup_table_border', '\' style=\'width:96px;\'>', (rData250.display_sample) ? '<input type="checkbox" class="scb_f_microscopy_sample_active" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData250.cell_treatment.id) + '\'' + ((rData250.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_microscopy_samples_table_td ', (rData250.display_sample) ? '' : 'scb_s_experiment_setup_table_border', '\' style=\'width:491px;\'>', (rData250.display_sample) ? soy.$$escapeHtml(rData250.display_text) : '', '</td><td class=\'scb_s_microscopy_samples_table_td ', (rData250.display_sample) ? '' : 'scb_s_experiment_setup_table_border', '\'>');
    scb_microscopy.display_slide_types({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, cell_treatment: rData250.cell_treatment, kinds: opt_data.kinds, lane: rData250}, output);
    output.append('</td><td class=\'scb_s_microscopy_samples_table_td ', (rData250.display_sample) ? '' : 'scb_s_experiment_setup_table_border', ' scb_s_microscopy_conditions\'>');
    if (rData250.lane) {
      if (rData250.lane.kind == 'IHC') {
        var kList308 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser[rData250.lane.cell_treatment.treatment_list.list[0].collection_id][rData250.lane.kind]);
        var kListLen308 = kList308.length;
        for (var kIndex308 = 0; kIndex308 < kListLen308; kIndex308++) {
          var kData308 = kList308[kIndex308];
          output.append((kData308 == 'secondary') ? '<input class=\'scb_f_microscopy_select_conditions\' type="radio" name="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '" value="secondary" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData250.cell_treatment.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_kind="' + soy.$$escapeHtml(rData250.kind) + '" lane_id="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '"' + ((rData250.is_sample_enabled && rData250.lane.slide_conditions == 'secondary') ? 'checked=\'checked\'' : '') + '/><span class="scb_s_western_blot_choose_gel_type_input_text">Secondary only control</span>&nbsp;&nbsp;' : (kData308 == 'ki67') ? '<input class=\'scb_f_microscopy_select_conditions\' type="radio" name="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '" value="ki67" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData250.cell_treatment.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_kind="' + soy.$$escapeHtml(rData250.kind) + '" lane_id="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '"' + ((rData250.is_sample_enabled && rData250.lane.slide_conditions == 'ki67') ? 'checked=\'checked\'' : '') + ' /><span class="scb_s_western_blot_choose_gel_type_input_text ">Ki-67</span>&nbsp;' : (kData308 == 'NFIB') ? '<input class=\'scb_f_microscopy_select_conditions\' type="radio" name="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '" value="NFIB" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData250.cell_treatment.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_kind="' + soy.$$escapeHtml(rData250.kind) + '" lane_id="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '"' + ((rData250.is_sample_enabled && rData250.lane.slide_conditions == 'NFIB') ? 'checked=\'checked\'' : '') + ' /><span class="scb_s_western_blot_choose_gel_type_input_text ">NFIB</span>' : '');
        }
      } else if (rData250.lane.kind == 'IF') {
        var kList384 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser[rData250.lane.cell_treatment.treatment_list.list[0].collection_id][rData250.lane.kind]);
        var kListLen384 = kList384.length;
        for (var kIndex384 = 0; kIndex384 < kListLen384; kIndex384++) {
          var kData384 = kList384[kIndex384];
          output.append((kData384 == 'rbg') ? '<input class="scb_f_microscopy_select_conditions" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' type="radio" value="rbg" cell_treatment_id=\'' + soy.$$escapeHtml(rData250.cell_treatment.id) + '\' lane_kind="' + soy.$$escapeHtml(rData250.kind) + '" lane_id="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '"' + ((rData250.is_sample_enabled) ? 'checked="checked"' : '') + ' /><span class="scb_s_western_blot_choose_gel_type_input_text">NFIB (red), DAPI (blue), control (green)</span>' : '');
        }
      } else if (rData250.lane.kind == 'Dye') {
        var kList408 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser[rData250.lane.cell_treatment.treatment_list.list[0].collection_id][rData250.lane.kind]);
        var kListLen408 = kList408.length;
        for (var kIndex408 = 0; kIndex408 < kListLen408; kIndex408++) {
          var kData408 = kList408[kIndex408];
          output.append((kData408 == 'HnE') ? '<input class="scb_f_microscopy_select_conditions" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' type="radio" value="HnE" cell_treatment_id=\'' + soy.$$escapeHtml(rData250.cell_treatment.id) + '\' lane_kind="' + soy.$$escapeHtml(rData250.kind) + '" lane_id="' + ((rData250.kind == 'existing') ? soy.$$escapeHtml(rData250.lane.id) : '') + '"' + ((rData250.is_sample_enabled) ? 'checked="checked"' : '') + ' /><span class="scb_s_western_blot_choose_gel_type_input_text">H&E</span>' : '');
        }
      }
    }
    output.append('</td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr class=\'scb_s_microscopy_samples_select_all_rel\'><td class=\'scb_f_microscopy_sample_active_all_td\' colspan=\'2\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td class=\'scb_f_microscopy_sample_inactive_all_td\' colspan=\'2\' align=\'right\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CLEAR ALL</button></td></tr>' : '<tr class=\'scb_s_microscopy_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_microscopy_blank_space1\'></td><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CLEAR ALL</button></td><td colspan=\'1\'> &nbsp;</td></tr>', '</table></div>', (opt_data.rows.length >= 10) ? '<div class="scb_s_western_blot_green_line"></div>' : '', '</div></div><a class=\'scb_s_navigation_button scb_f_microscopy_prepare_slides\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_slide) ? '' : 'disabled=\'disabled\'', '> PREPARE SLIDES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.prepare_slide = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_tab_content_slide\'>');
  if (opt_data.microscopy.samples_finished) {
    scb_microscopy.display_m_progress({step: 3}, output);
  } else {
    scb_microscopy.display_m_progress({step: 2}, output);
  }
  output.append('<div class=\'scb_s_microscopy_samples_area\'><div class=\'scb_s_microscopy_samples_heading\'>Samples</div><div class=\'', (opt_data.microscopy.samples_finished) ? ' scb_s_microscopy_choose_samples_order_no_border' : 'scb_s_microscopy_choose_samples_order', '\'><ol class=\'scb_s_microscopy_choose_samples_order_list\' >');
  var rList470 = opt_data.rows;
  var rListLen470 = rList470.length;
  for (var rIndex470 = 0; rIndex470 < rListLen470; rIndex470++) {
    var rData470 = rList470[rIndex470];
    output.append((rData470.is_valid) ? (rData470.index == 0) ? '<li microscopy_lane_id=\'' + soy.$$escapeHtml(rData470.lane.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' lane_kind = \'' + soy.$$escapeHtml(rData470.lane.kind) + '\' slide_conditions = \'' + soy.$$escapeHtml(rData470.lane.slide_conditions) + '\'' + ((opt_data.microscopy.selected_lane && rData470.cell_treatment.id == opt_data.microscopy.selected_lane.cell_treatment_id) ? 'class=\'scb_s_microscopy_sample_selected\'' : '') + '>&nbsp;&nbsp;' + soy.$$escapeHtml(rData470.display_text) + '</li>' : '' : '');
  }
  output.append('</ol></div>', (opt_data.microscopy.samples_finished) ? '' : '<button class=\'scb_f_microscopy_load_slides scb_s_navigation_button\' microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '">LOAD SLIDES</button>', '</div><div class=\'scb_s_microscopy_samples_slide_area\'><div class=\'scb_s_western_blot_gel_tabs\'>');
  if (opt_data.microscopy.samples_finished) {
    var rList509 = opt_data.rows;
    var rListLen509 = rList509.length;
    for (var rIndex509 = 0; rIndex509 < rListLen509; rIndex509++) {
      var rData509 = rList509[rIndex509];
      output.append((rData509.is_valid && rData509.lane.id == opt_data.microscopy.selected_lane.id) ? '<span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_western_blot_gel_tab_selected\'>' + soy.$$escapeHtml(opt_data.microscopy.selected_lane.kinds[opt_data.microscopy.selected_lane.kind].name) + '</div></span>' : (rData509.is_valid && rData509.cell_treatment.id == opt_data.microscopy.selected_lane.cell_treatment_id) ? '<div class=\'scb_s_microscopy_slide_tab\' microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' microscopy_lane_id=\'' + soy.$$escapeHtml(rData509.lane.id) + '\'>' + soy.$$escapeHtml(rData509.lane.kinds[rData509.lane.kind].name) + '</div>' : '');
    }
  } else {
    output.append('<span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_western_blot_gel_tab_selected\'>SLIDE</div></span>');
  }
  output.append('</div>');
  if (opt_data.microscopy.samples_finished) {
    var rList533 = opt_data.rows;
    var rListLen533 = rList533.length;
    for (var rIndex533 = 0; rIndex533 < rListLen533; rIndex533++) {
      var rData533 = rList533[rIndex533];
      if (rData533.is_valid && opt_data.microscopy.lane_selected == rData533.lane.id) {
        scb_microscopy.display_lens({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, lane: rData533.lane, microscopy_line_id: opt_data.microscopy.lane_selected}, output);
      }
    }
  } else {
    scb_microscopy.display_lens({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, lane: false, microscopy_line_id: opt_data.microscopy.lane_selected}, output);
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_lens = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_instructions_followup scb_s_controls_note\'><button class=\'scb_f_controls_close_button\' aria-label=\'Close\'><span>&#215;</span></button>Note: Use keyboard arrow keys to navigate lens across the slide.<div class=\'scb_s_microscope_status\'></div></div><div class=\'scb_s_microscopy_slide_content\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\'', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', '><div id=\'scb_s_microscopy_lens_controls\'><div class = \'scb_s_microscopy_lens_controls_section_1\'><span class="scb_s_microscopy_title_label">Microscope Controls</span><button class=\'scb_s_microscopy_instructions_followup_toggle\'> </button></div><div class = \'scb_s_microscopy_lens_controls_section_2\'><span class="scb_s_microscopy_lens_label">Light:</span> <input type="checkbox" class="scb_f_microscopy_light" microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', ' ', (opt_data.microscopy.light_on) ? 'checked=\'checked\'' : '', ' ></div><div class = \'scb_s_microscopy_lens_controls_section_3\'><span class="scb_s_microscopy_brightness_label">Brightness:</span><div class=\'scb_s_microscopy_brightness_slider\'></div><img class=\'scb_s_microscopy_black_icon\' src=\'images/microscopy/Brightness_Slider_Dark.jpg\'/><img class=\'scb_s_microscopy_white_icon\' src=\'images/microscopy/Brightness_Slider_Light.png\'/></div><div class = \'scb_s_microscopy_lens_controls_section_4\'><span class="scb_s_microscopy_laser_label">Laser:</span><input type="checkbox" class="scb_f_microscopy_laser" microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', ' ', (opt_data.microscopy.laser_on) ? 'checked=\'checked\'' : '', '></div><div class = \'scb_s_microscopy_lens_controls_section_5\'><span class=\'scb_s_microscopy_filter_label\'>Filters:</span><input class=\'scb_f_microscopy_red scb_s_microscopy_if\' disabled=\'disabled\'  microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' title=\'Red\'  name=\'IF\' type="radio" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', ' ', (opt_data.microscopy.red_enabled) ? 'checked=\'checked\'' : '', '><input class=\'scb_f_microscopy_blue scb_s_microscopy_if \' disabled=\'disabled\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' title=\'Blue\' name=\'IF\' type="radio" type="radio" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', ' ', (opt_data.microscopy.blue_enabled) ? 'checked=\'checked\'' : '', '><input class=\'scb_f_microscopy_green scb_s_microscopy_if\' disabled=\'disabled\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' title=\'Green\' name=\'IF\' type="radio" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', ' ', (opt_data.microscopy.green_enabled) ? 'checked=\'checked\'' : '', '><input class=\'scb_f_microscopy_all scb_s_microscopy_if\' disabled=\'disabled\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\'  title=\'All\' name=\'IF\' type="radio" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', ' ', (opt_data.microscopy.merge_enabled) ? 'checked=\'checked\'' : '', '><br/><img class = \'scb_s_microscopy_filter\' src = \'', (opt_data.microscopy.red_enabled) ? 'images/microscopy/Filter_Slider_Red.png' : (opt_data.microscopy.blue_enabled) ? 'images/microscopy/Filter_Slider_Blue.png' : (opt_data.microscopy.green_enabled) ? 'images/microscopy/Filter_Slider_Green.png' : (opt_data.microscopy.merge_enabled) ? 'images/microscopy/Filter_Slider_All.png' : 'images/microscopy/Filter_Slider_Red.png ', '\' /><br/></div><div class = \'scb_s_microscopy_lens_controls_section_6\'><span class=\'scb_s_microscopy_focus_label\'>Focus:</span><button class =\'scb_s_micro_arrows\' id=\'fblurup\'></button><img class=\'scb_s_microscopy_tight_focus_middle\' src = \'images/microscopy/Tight_Focus/Focus_Tight_Middle.png\'/><button class =\'scb_s_micro_arrows\' id=\'fblurdown\'></button><img class=\'scb_s_microscopy_focus_knob\' src = \'images/microscopy/Focus_Knob.png\'/><button class =\'scb_s_micro_arrows\' id=\'blurup\'></button><img class=\'scb_s_microscopy_rough_focus_middle\' src = \'images/microscopy/Loose_Focus/Focus_Loose_Middle.png\'/><button class =\'scb_s_micro_arrows\' id=\'blurdown\'></button></div><div class = \'scb_s_microscopy_lens_controls_section_7\'><span class=\'scb_s_microscopy_obj_label\'>Objective:</span> <span class=\'scb_s_microscopy_mag\'></span><br/></div><button class=\'scb_f_save_button scb_s_gray_button\'>SAVE IMAGE</button><button class =\'scb_s_micro_arrows\' id=\'up\'></button><button class =\'scb_s_micro_arrows\' id=\'down\'></button><button class =\'scb_s_micro_arrows\' id=\'left\'></button><button class =\'scb_s_micro_arrows\' id=\'right\'></button></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_slide_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (soy.$$getMapKeys(opt_data.kinds).length == 1) {
    var kList678 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen678 = kList678.length;
    for (var kIndex678 = 0; kIndex678 < kListLen678; kIndex678++) {
      var kData678 = kList678[kIndex678];
      output.append('<span class="scb_f_microscopy_select_slide_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" value="', soy.$$escapeHtml(kData678), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '">', soy.$$escapeHtml(opt_data.kinds[kData678].name), '</span>');
    }
  } else {
    output.append('<select class="scb_f_microscopy_select_slide_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
    if (opt_data.lane.kind == 'existing') {
      if (opt_data.lane.cell_treatment.cell_line == opt_data.assignment.template.model.microscopy.valid[0] && opt_data.lane.cell_treatment.treatment_list.list[0].drug_list.list[0].drug_id == opt_data.assignment.template.model.microscopy.valid[1]) {
        var kList724 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser[opt_data.lane.cell_treatment.treatment_list.list[0].collection_id]);
        var kListLen724 = kList724.length;
        for (var kIndex724 = 0; kIndex724 < kListLen724; kIndex724++) {
          var kData724 = kList724[kIndex724];
          output.append('<option value=\'', soy.$$escapeHtml(kData724), '\'', (opt_data.lane.lane.kind == kData724) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData724].name), '</option>');
        }
      } else {
        var kList736 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser['default']);
        var kListLen736 = kList736.length;
        for (var kIndex736 = 0; kIndex736 < kListLen736; kIndex736++) {
          var kData736 = kList736[kIndex736];
          output.append('<option value=\'', soy.$$escapeHtml(kData736), '\'', (opt_data.lane.lane.kind == kData736) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData736].name), '</option>');
        }
      }
    } else {
      output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Slide Type</option>' : '');
      if (opt_data.lane.cell_treatment.cell_line == opt_data.assignment.template.model.microscopy.valid[0] && opt_data.lane.cell_treatment.treatment_list.list[0].drug_list.list[0].drug_id == opt_data.assignment.template.model.microscopy.valid[1]) {
        var kList753 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser[opt_data.lane.cell_treatment.treatment_list.list[0].collection_id]);
        var kListLen753 = kList753.length;
        for (var kIndex753 = 0; kIndex753 < kListLen753; kIndex753++) {
          var kData753 = kList753[kIndex753];
          output.append('<option value=\'', soy.$$escapeHtml(kData753), '\'>', soy.$$escapeHtml(opt_data.kinds[kData753].name), '</option>');
        }
      } else {
        var kList761 = soy.$$getMapKeys(opt_data.assignment.template.slide_parser['default']);
        var kListLen761 = kList761.length;
        for (var kIndex761 = 0; kIndex761 < kListLen761; kIndex761++) {
          var kData761 = kList761[kIndex761];
          output.append('<option value=\'', soy.$$escapeHtml(kData761), '\'>', soy.$$escapeHtml(opt_data.kinds[kData761].name), '</option>');
        }
      }
    }
    output.append('</select>');
  }
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_m_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_progress\'><div class=\'scb_s_microscopy_video_box_wrapper\'><div class=\'scb_s_microscopy_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_microscopy_video_reminder\'><div class=\'scb_s_microscopy_video_box\'></div></div></div><div class=\'scb_s_microscopy_vertical_line_1\'></div><div class=\'scb_s_microscopy_vertical_line_4\'></div><div class=\'scb_s_microscopy_vertical_line_7\'></div><div class=\'scb_s_western_blot_progress_bar\'><div class = \'scb_s_western_blot_progress_gray_bar\'><div class=\'scb_s_facs_vertical_line_1_top\'></div><div class=\'scb_s_facs_vertical_line_4_top\'></div><div class=\'scb_s_facs_vertical_line_7_top\'></div><div class=\'scb_s_western_blot_progress_stripe_bar\' style=\'width:', (opt_data.step == 1) ? '32px;' : '', (opt_data.step == 2) ? ' 301px;' : '', (opt_data.step == 3) ? '607px; border-top-right-radius:8px; border-bottom-right-radius:8px;' : '', '\'></div></div><div class=\'scb_s_facs_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_microscopy_progress_1\'>1. Slide Prep</div><div class=\'scb_s_western_blot_progress_item scb_microscopy_progress_2\'>2. Load Slides</div><div class=\'scb_s_western_blot_progress_item scb_microscopy_progress_3\'>3. Analyze Slides</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};
