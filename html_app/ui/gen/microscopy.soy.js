// This file was automatically generated from microscopy.soy.
// Please don't edit this file by hand.

if (typeof scb_microscopy == 'undefined') { var scb_microscopy = {}; }


scb_microscopy.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'MICROSCOPY', technique_view: 'microscopy', technique_param: 'microscopy_id', technique_id: opt_data.microscopy.id}, output);
  scb_microscopy.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_microscopy_details_view\'><div class=\'scb_microscopy_details_view_inner\'>');
  scb_microscopy.display_tabs(opt_data, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_tab_content ', (opt_data.kind == 'sample_prep') ? 'scb_s_microscopy_tab_content_sample_prep' : '', '\'>');
  scb_microscopy.display_tabs_selector(opt_data, output);
  if (opt_data.kind == 'sample_prep') {
    scb_microscopy.sample_prep(opt_data, output);
  }
  if (opt_data.kind == 'prepare_slide') {
    scb_microscopy.prepare_slide(opt_data, output);
  }
  output.append('<a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_microscopy" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_tabs\'>');
  var mList76 = opt_data.experiment.microscopy_list.list;
  var mListLen76 = mList76.length;
  for (var mIndex76 = 0; mIndex76 < mListLen76; mIndex76++) {
    var mData76 = mList76[mIndex76];
    output.append((opt_data.microscopy.id == mData76.id) ? '<span class=\'scb_s_microscopy_active\'><span class=\'scb_s_microscopy_selected\' microscopy_id=\'' + soy.$$escapeHtml(mData76.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(mData76.name) + '</span><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData76.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData76.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData76.id) + '\'>' + soy.$$escapeHtml(mData76.name) + '</a>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_microscopy.display_m_progress({step: 1}, output);
  output.append('<div class=\'scb_s_microscopy_video_box_wrapper\'><div class=\'scb_s_microscopy_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_microscopy_video_reminder\'><div class=\'scb_s_microscopy_video_box\'></div></div></div><div class=\'scb_s_microscopy_samples_table\'><table><thead class=\'scb_s_microscopy_samples_table_head\'><td class=\'scb_s_microscopy_samples_table_heading\'>Select</td><td class=\'scb_s_microscopy_samples_table_heading\'>Samples</td><td class=\'scb_s_microscopy_samples_table_heading\'>Slide type</td><td class=\'scb_s_microscopy_samples_table_heading\'>&nbsp;</td></thead>');
  var rList112 = opt_data.rows;
  var rListLen112 = rList112.length;
  for (var rIndex112 = 0; rIndex112 < rListLen112; rIndex112++) {
    var rData112 = rList112[rIndex112];
    output.append('<tr class=\'scb_s_microscopy_samples_table_tr\'><td class=\'scb_s_microscopy_samples_table_td\'>', (rData112.display_sample) ? '<input type="checkbox" class="scb_f_microscopy_sample_active" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'' + ((rData112.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_microscopy_samples_table_td\'>', (rData112.display_sample) ? soy.$$escapeHtml(rData112.display_text) : '', '</td><td class=\'scb_s_microscopy_samples_table_td\'>');
    scb_microscopy.display_slide_types({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, kinds: opt_data.kinds, lane: rData112}, output);
    output.append('</td><td class=\'scb_s_microscopy_samples_table_td\'>', (rData112.kind == 'existing') ? '<button class="scb_f_microscopy_sample_remove" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData112.lane.id) + '\'' + ((rData112.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '<button class="scb_f_microscopy_sample_remove" disabled="disabled">X</button>', '</td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr><td colspan=\'4\'><div class="scb_s_microscopy_green_line"></div></td></tr><tr class=\'scb_s_microscopy_samples_select_all_rel\'><td colspan=\'2\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'2\' align=\'right\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CANCEL ALL</button></td></tr>' : '<tr class=\'scb_s_microscopy_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_microscopy_blank_space1\'></td><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CANCEL ALL</button></td><td colspan=\'1\' class=\'scb_s_microscopy_blank_space2\' ></td></tr>', '</table></div><a class=\'scb_s_navigation_button scb_f_microscopy_prepare_slides\' microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'><!-- ', (opt_data.can_prepare_slide) ? '' : 'disabled=\'false\'', ' --> PREPARE SLIDES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.prepare_slide = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<!--');
  scb_microscopy.display_m_progress({step: opt_data.microscopy.slide_type ? 3 : 2}, output);
  output.append('--><div class=\'scb_s_microscopy_samples_area\'><div class=\'scb_s_microscopy_choose_slide_type\'><!-- TODO: Slide Type stuff --></div><!--<div class=\'scb_s_microscopy_choose_samples_note\'>NOTE: You can reorder samples by dragging and dropping into new order</div>--><div class=\'scb_s_microscopy_samples_heading\'>Samples</div><div class=\'scb_s_microscopy_choose_samples_order\'><ol class=\'scb_s_microscopy_choose_samples_order_list\' >');
  var rList181 = opt_data.rows;
  var rListLen181 = rList181.length;
  for (var rIndex181 = 0; rIndex181 < rListLen181; rIndex181++) {
    var rData181 = rList181[rIndex181];
    output.append((rData181.is_valid) ? '<li class="scb_s_microscopy_choose_samples_list_item" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' id=\'' + soy.$$escapeHtml(rData181.lane.id) + '\'>' + soy.$$escapeHtml(rData181.display_text) + ' - ' + soy.$$escapeHtml(rData181.lane.kinds[rData181.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol>');
  var start__soy199 = opt_data.rows.length + 1;
  output.append('<ol class=\'scb_s_microscopy_choose_samples_marker\' start=', soy.$$escapeHtml(start__soy199), '>', (opt_data.microscopy.marker_loaded == true) ? '<li class="scb_s_microscopy_marker">Marker</li>' : '', '</ol></div></div><div class=\'scb_s_microscopy_samples_slide_area\'><div id=\'scb_s_microscopy_lens_controls\'><span class=\'scb_s_controls_note\'>Note: Use keyboard arrow keys to navigate lens across the slide.</span><p/>Light<p/><img src=\'images/microscopy/up.jpg\' class =\'scb_s_micro_arrows\' id=\'brightup\'/> <br/><img src =\'images/microscopy/down.jpg\' class =\'scb_s_micro_arrows\'id=\'brightdown\'/><p/>Focus: Rough<p/><img src =\'images/microscopy/up.jpg\' class =\'scb_s_micro_arrows\' id=\'blurup\'/><br/><img src = \'images/microscopy/down.jpg\' class =\'scb_s_micro_arrows\' id=\'blurdown\'/><p/>Focus: Fine<p/><img src = \'images/microscopy/fineup.jpg\' class =\'scb_s_micro_arrows\' id=\'fblurup\'/> <br/><img src = \'images/microscopy/finedown.jpg\' class =\'scb_s_micro_arrows\'id=\'fblurdown\'/><p/><span class=\'scb_s_microscope_status\'></span></div><!--<div class = \'scb_s_list_slides\'><form><input type=\'radio\' name=\'slides\' value=\'images/microscopy/Brightfield/Sample_1_10X.jpg\'>Sample 1</input><input type=\'radio\' name=\'slides\' value=\'images/microscopy/Brightfield/Sample_2_10X.jpg\'>Sample 2</input><input type=\'radio\' name=\'slides\' value=\'images/microscopy/Brightfield/Sample_3_20X.jpg\'>Sample 3</input></form></div>--></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_slide_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select class="scb_f_microscopy_select_slide_type" microscopy_id=\'', soy.$$escapeHtml(opt_data.microscopy.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
  if (opt_data.lane.kind == 'existing') {
    var kList228 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen228 = kList228.length;
    for (var kIndex228 = 0; kIndex228 < kListLen228; kIndex228++) {
      var kData228 = kList228[kIndex228];
      output.append('<option value=\'', soy.$$escapeHtml(kData228), '\'', (opt_data.lane.lane.kind == kData228) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData228].name), '</option>');
    }
  } else {
    output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Slide Type</option>' : '');
    var kList243 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen243 = kList243.length;
    for (var kIndex243 = 0; kIndex243 < kListLen243; kIndex243++) {
      var kData243 = kList243[kIndex243];
      output.append('<option value=\'', soy.$$escapeHtml(kData243), '\'>', soy.$$escapeHtml(opt_data.kinds[kData243].name), '</option>');
    }
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_m_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_progress\'><span class=\'scb_s_microscopy_progress_prefix_group1\'><img class=\'scb_s_microscopy_progress_prefix_img\' src="images/microscopy/backbackback.png"><div class=\'scb_experiment_step_selected scb_s_experiment_step_circle\'><div class=\'scb_s_microscopy_progress_prefix\'>5</div></div></span><span class=\'scb_s_microscopy_progress_prefix_group2\'><div class=\'scb_s_microscopy_progress_prefix_text\'>PERFORM MICROSCOPY</div></div>');
  return opt_sb ? '' : output.toString();
};