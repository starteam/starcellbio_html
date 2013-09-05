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
  if (opt_data.kind == 'prepare_gel') {
    scb_microscopy.prepare_gel(opt_data, output);
  }
  if (opt_data.kind == 'load_gel') {
    scb_microscopy.display_m_progress({step: 3}, output);
  }
  output.append((opt_data.kind == 'gel_operations') ? '' : '', '<a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_microscopy" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_tabs\'>');
  var mList82 = opt_data.experiment.microscopy_list.list;
  var mListLen82 = mList82.length;
  for (var mIndex82 = 0; mIndex82 < mListLen82; mIndex82++) {
    var mData82 = mList82[mIndex82];
    output.append((opt_data.microscopy.id == mData82.id) ? '<span class=\'scb_s_microscopy_active\'><span class=\'scb_s_microscopy_selected\' microscopy_id=\'' + soy.$$escapeHtml(mData82.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(mData82.name) + '</span><button class=\'scb_s_microscopy_remove scb_f_microscopy_remove\' microscopy_id=\'' + soy.$$escapeHtml(mData82.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img src="images/setup/scb_remove.png"></button></span>' : '<a class=\'scb_f_open_microscopy scb_s_microscopy_open_microscopy\' href=\'#view=microscopy&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&microscopy_id=' + soy.$$escapeHtml(mData82.id) + '\' microscopy_id=\'' + soy.$$escapeHtml(mData82.id) + '\'>' + soy.$$escapeHtml(mData82.name) + '</a>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_microscopy.display_m_progress({step: 1}, output);
  output.append('<div class=\'scb_s_microscopy_video_box_wrapper\'><div class=\'scb_s_microscopy_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_microscopy_video_reminder\'><div class=\'scb_s_microscopy_video_box\'></div></div></div><div class=\'scb_s_microscopy_samples_table\'><table><thead class=\'scb_s_microscopy_samples_table_head\'><td class=\'scb_s_microscopy_samples_table_heading\'>Select</td><td class=\'scb_s_microscopy_samples_table_heading\'>Samples</td><td class=\'scb_s_microscopy_samples_table_heading\'>Lysate type</td><td class=\'scb_s_microscopy_samples_table_heading\'>&nbsp;</td></thead>');
  var rList118 = opt_data.rows;
  var rListLen118 = rList118.length;
  for (var rIndex118 = 0; rIndex118 < rListLen118; rIndex118++) {
    var rData118 = rList118[rIndex118];
    output.append('<tr class=\'scb_s_microscopy_samples_table_tr\'><td class=\'scb_s_microscopy_samples_table_td\'>', (rData118.display_sample) ? '<input type="checkbox" class="scb_f_microscopy_sample_active" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData118.cell_treatment.id) + '\'' + ((rData118.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_microscopy_samples_table_td\'>', (rData118.display_sample) ? soy.$$escapeHtml(rData118.display_text) : '', '</td><td class=\'scb_s_microscopy_samples_table_td\'>');
    scb_microscopy.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, microscopy: opt_data.microscopy, cell_treatment: rData118.cell_treatment, kinds: opt_data.kinds, lane: rData118}, output);
    output.append('</td><td class=\'scb_s_microscopy_samples_table_td\'>', (rData118.kind == 'existing') ? '<button class="scb_f_microscopy_sample_remove" microscopy_id=\'' + soy.$$escapeHtml(opt_data.microscopy.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData118.lane.id) + '\'' + ((rData118.is_sample_enabled) ? '' : 'disabled="disabled"') + '>X</button>' : '<button class="scb_f_microscopy_sample_remove" disabled="disabled">X</button>', '</td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr><td colspan=\'4\'><div class="scb_s_microscopy_green_line"></div></td></tr><tr class=\'scb_s_microscopy_samples_select_all_rel\'><td colspan=\'2\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'2\' align=\'right\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CANCEL ALL</button></td></tr>' : '<tr class=\'scb_s_microscopy_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_microscopy_blank_space1\'></td><td colspan=\'1\'><button class=\'scb_f_microscopy_sample_inactive_all\'>CANCEL ALL</button></td><td colspan=\'1\' class=\'scb_s_microscopy_blank_space2\' ></td></tr>', '</table></div>');
  return opt_sb ? '' : output.toString();
};


scb_microscopy.display_m_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_microscopy_progress\'><span class=\'scb_s_microscopy_progress_prefix_group1\'><img class=\'scb_s_microscopy_progress_prefix_img\' src="images/microscopy/backbackback.png"><div class=\'scb_experiment_step_selected scb_s_experiment_step_circle\'><div class=\'scb_s_microscopy_progress_prefix\'>5</div></div></span><span class=\'scb_s_microscopy_progress_prefix_group2\'><div class=\'scb_s_microscopy_progress_prefix_text\'>PERFORM MICROSCOPY</div></div>');
  return opt_sb ? '' : output.toString();
};
