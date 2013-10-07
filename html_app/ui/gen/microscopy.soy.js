// This file was automatically generated from microscopy.soy.
// Please don't edit this file by hand.

if (typeof scb_microscopy == 'undefined') { var scb_microscopy = {}; }


scb_microscopy.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, last_step: opt_data.last_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'MICROSCOPY', technique_view: 'microscopy', technique_param: 'microscopy_id', technique_id: opt_data.microscopy.id}, output);
  scb_microscopy.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_microscopy_details_view\'><div class=\'scb_s_microscopy_all_tabs\'><div class=\'scb_microscopy_details_view_inner\'>');
  scb_microscopy.display_tabs(opt_data, output);
  output.append('</div></div></div>');
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
  output.append('<div class=\'scb_s_microscopy_tabs\'>');
  if (opt_data.experiment.microscopy_list.list.length < 6) {
    var mList83 = opt_data.experiment.microscopy_list.list;
    var mListLen83 = mList83.length;
    for (var mIndex83 = 0; mIndex83 < mListLen83; mIndex83++) {
      var mData83 = mList83[mIndex83];
      output.append((opt_data.microscopy.id == mData83.id) ? '<span class=\'scb_s_microscopy_active\'><span class=\'scb_s_microscopy_selected\' microscopy_id=\'' + soy.$$escapeHtml(mData83.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(mData83.name) + '</span><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData83.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| X<!-- \t\t\t\t<img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData83.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData83.id) + '\'>' + soy.$$escapeHtml(mData83.name) + '</a>');
    }
    output.append('<span class=\'scb_s_microscopy_add_microscopy\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.experiment.microscopy_list.list[opt_data.experiment.microscopy_list.list.length - 1].id), '\'><a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_microscopy_add_cross_microscopy\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_microscopy_left_microscopy\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&lt;&lt;</button>');
    var mList133 = opt_data.experiment.microscopy_list.list;
    var mListLen133 = mList133.length;
    for (var mIndex133 = 0; mIndex133 < mListLen133; mIndex133++) {
      var mData133 = mList133[mIndex133];
      output.append((mIndex133 >= opt_data.experiment.microscopy_list.start_tabs_index && mIndex133 < opt_data.experiment.microscopy_list.start_tabs_index + 5) ? (opt_data.microscopy.id == mData133.id) ? '<span class=\'scb_s_microscopy_active\'><span class=\'scb_s_microscopy_selected\' microscopy_id=\'' + soy.$$escapeHtml(mData133.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(mData133.name) + '</span><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData133.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| X<!-- <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData133.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData133.id) + '\'>' + soy.$$escapeHtml(mData133.name) + '</a>' : '');
    }
    output.append('<span class=\'scb_s_microscopy_add_microscopy\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.experiment.microscopy_list.list[opt_data.experiment.microscopy_list.list.length - 1].id), '\'><a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD<span class=\'scb_s_microscopy_add_cross_microscopy\'>| + </span></a></span><button class=\'scb_s_microscopy_right_microscopy\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' >&gt;&gt;</button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_microscopy.display_m_progress({step: 1}, output);
  output.append('<div class=\'scb_s_microscopy_samples_table\'><table><thead class=\'scb_s_microscopy_samples_table_head\'><td class=\'scb_s_microscopy_samples_table_heading\'>Select</td><td class=\'scb_s_microscopy_samples_table_heading\'>Samples</td><td class=\'scb_s_microscopy_samples_table_heading\'>Slide type</td><td class=\'scb_s_microscopy_samples_table_heading\'>&nbsp;</td></thead>');
  var rList188 = opt_data.rows;
  var rListLen188 = rList188.length;
  for (var rIndex188 = 0; rIndex188 < rListLen188; rIndex188++) {
    var rData188 = rList188[rIndex188];
    output.append('<tr class=\'scb_s_microscopy_samples_table_tr\'><td class=\'scb_s_microscopy_samples_table_td\'>', (rData188.display_sample) ? '<input type="checkbox" class="scb_f_microscopy_sample_active" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData188.cell_treatment.id) + '\'' + ((rData188.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_microscopy_samples_table_td\'>', (rData188.display_sample) ? soy.$$escapeHtml(rData188.display_text) : '', '</td><td class=\'scb_s_microscopy_samples_table_td\'>');
    scb_microscopy.display_slide_types({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, cell_treatment: rData188.cell_treatment, kinds: opt_data.kinds, lane: rData188}, output);
    output.append('</td><td class=\'scb_s_microscopy_samples_table_td\'></td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr><td colspan=\'4\'><div class="scb_s_western_blot_green_line"></div></td></tr><tr class=\'scb_s_western_blot_samples_select_all_rel\'><td colspan=\'2\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'2\' align=\'right\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CANCEL ALL</button></td></tr>' : '<tr class=\'scb_s_microscopy_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_microscopy_blank_space1\'></td><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CANCEL ALL</button></td><td colspan=\'1\'> &nbsp;</td></tr>', '</table></div><a class=\'scb_s_navigation_button scb_f_microscopy_prepare_slides\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_slide) ? '' : 'disabled=\'disabled\'', '> PREPARE SLIDES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.prepare_slide = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<!--');
  scb_microscopy.display_m_progress({step: opt_data.microscopy.slide_type ? 3 : 2}, output);
  output.append('--><div class=\'scb_s_microscopy_tab_content_slide\'>');
  if (opt_data.microscopy.samples_finished) {
    scb_microscopy.display_m_progress({step: 3}, output);
  } else {
    scb_microscopy.display_m_progress({step: 2}, output);
  }
  output.append('<div class=\'scb_s_microscopy_samples_area\'><div class=\'scb_s_microscopy_choose_slide_type\'><!-- TODO: Slide Type stuff --></div><!--<div class=\'scb_s_microscopy_choose_samples_note\'>NOTE: You can reorder samples by dragging and dropping into new order</div>--><div class=\'scb_s_microscopy_samples_heading\'>Samples</div><div class=\'scb_s_microscopy_choose_samples_order\'><ol class=\'scb_s_microscopy_choose_samples_order_list\' >');
  var rList249 = opt_data.rows;
  var rListLen249 = rList249.length;
  for (var rIndex249 = 0; rIndex249 < rListLen249; rIndex249++) {
    var rData249 = rList249[rIndex249];
    output.append((rData249.is_valid) ? '<li microscopy_lane_id=\'' + soy.$$escapeHtml(rData249.lane.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\'' + ((opt_data.microscopy.lane_selected == rData249.lane.id) ? 'class=\'scb_s_microscopy_sample_selected\'' : '') + '>' + soy.$$escapeHtml(rData249.display_text) + ' - ' + soy.$$escapeHtml(rData249.lane.kinds[rData249.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.microscopy.samples_finished) ? '' : '<button class=\'scb_f_microscopy_load_slides scb_s_navigation_button\' microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id="' + soy.$$escapeHtml(opt_data.assignment.id) + '" experiment_id="' + soy.$$escapeHtml(opt_data.experiment.id) + '">LOAD SLIDES</button>', '</div><div class=\'scb_s_microscopy_samples_slide_area\'><div class=\'scb_s_western_blot_gel_tabs\'><span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_western_blot_gel_tab_selected\'>SLIDE</div></span></div>');
  scb_microscopy.display_lens({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, microscopy_line_id: opt_data.microscopy.lane_selected}, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_lens = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_slide_content\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\'', (opt_data.microscopy_line_id) ? 'microscopy_lane_id=\'' + soy.$$escapeHtml(opt_data.microscopy_line_id) + '\'' : '', '><div id=\'scb_s_microscopy_lens_controls\'><span class=\'scb_s_controls_note\'>Note: Use keyboard arrow keys to navigate lens across the slide.</span><p class = \'scb_space_control\'/>Light<p class = \'scb_space_control\'/><img src=\'images/microscopy/up.jpg\' class =\'scb_s_micro_arrows\' id=\'brightup\'/> <br/><img src =\'images/microscopy/down.jpg\' class =\'scb_s_micro_arrows\'id=\'brightdown\'/><p class = \'scb_space_control\'/>Focus: Rough<p class = \'scb_space_control\'/><img src =\'images/microscopy/up.jpg\' class =\'scb_s_micro_arrows\' id=\'blurup\'/><br/><img src = \'images/microscopy/down.jpg\' class =\'scb_s_micro_arrows\' id=\'blurdown\'/><p class = \'scb_space_control\'/>Focus: Fine<p class = \'scb_space_control\'/><img src = \'images/microscopy/fineup.jpg\' class =\'scb_s_micro_arrows\' id=\'fblurup\'/> <br/><img src = \'images/microscopy/finedown.jpg\' class =\'scb_s_micro_arrows\'id=\'fblurdown\'/><p class = \'scb_space_control\'/><span class=\'scb_s_microscope_status\'></span></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_slide_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_microscopy_select_slide_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
  if (opt_data.lane.kind == 'existing') {
    var kList325 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen325 = kList325.length;
    for (var kIndex325 = 0; kIndex325 < kListLen325; kIndex325++) {
      var kData325 = kList325[kIndex325];
      output.append('<option value=\'', soy.$$escapeHtml(kData325), '\'', (opt_data.lane.lane.kind == kData325) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData325].name), '</option>');
    }
  } else {
    output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Slide Type</option>' : '');
    var kList340 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen340 = kList340.length;
    for (var kIndex340 = 0; kIndex340 < kListLen340; kIndex340++) {
      var kData340 = kList340[kIndex340];
      output.append('<option value=\'', soy.$$escapeHtml(kData340), '\'>', soy.$$escapeHtml(opt_data.kinds[kData340].name), '</option>');
    }
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_m_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_progress\'><span class=\'scb_s_microscopy_progress_prefix_group1\'><img class=\'scb_s_microscopy_progress_prefix_img\' src="images/microscopy/backbackback.png"><div class=\'scb_experiment_step_selected scb_s_experiment_step_circle\'><div class=\'scb_s_microscopy_progress_prefix\'>5</div></div><div class=\'scb_s_microscopy_progress_prefix_text\'>PERFORM MICROSCOPY</div><div class=\'scb_s_facs_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 ', (opt_data.step >= 1) ? 'scb_s_western_blot_progress_selected' : '', '\'>1. Sample Prep</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 ', (opt_data.step >= 2) ? 'scb_s_western_blot_progress_selected' : '', '\'>2. Prepare Slides</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3 ', (opt_data.step >= 3) ? 'scb_s_western_blot_progress_selected' : '', '\'>3. Analyze</div></div></span><div class=\'scb_s_microscopy_video_box_wrapper\'><div class=\'scb_s_microscopy_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_microscopy_video_reminder\'><div class=\'scb_s_microscopy_video_box\'></div></div></div><span class=\'scb_s_microscopy_progress_prefix_group2\'></span></div>');
  return opt_sb ? '' : output.toString();
};
