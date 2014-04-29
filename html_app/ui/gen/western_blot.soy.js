// This file was automatically generated from western_blot.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot == 'undefined') { var scb_western_blot = {}; }


scb_western_blot.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'WESTERN BLOT', technique_view: 'western_blot', technique_param: 'western_blot_id', technique_id: opt_data.western_blot.id}, output);
  scb_western_blot.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  scb_western_blot.well_images(null, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'><div class=\'scb_western_blot_details_view\'>');
  scb_common.experiment_step({step: 5, last_step: 6, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<span class=\'scb_s_western_blot_all_tabs\'><div class=\'scb_western_blot_details_view_inner\'>');
  scb_western_blot.display_tabs(opt_data, output);
  output.append('</div></span></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="scb_s_western_blot_tab_content ', (opt_data.kind == 'sample_prep') ? 'scb_s_western_blot_tab_content_sample_prep' : '', '" role=\'tabpanel\'>');
  scb_western_blot.display_tabs_selector(opt_data, output);
  if (opt_data.kind == 'sample_prep') {
    scb_western_blot.sample_prep(opt_data, output);
    output.append('</div>');
  }
  if (opt_data.kind == 'prepare_gel') {
    scb_western_blot.prepare_gel(opt_data, output);
    output.append('</div>');
  }
  if (opt_data.kind == 'load_gel') {
    scb_western_blot.display_wb_progress({step: 3}, output);
    output.append('</div>');
  }
  output.append((opt_data.kind == 'gel_operations') ? '</div>' : '', '<a role=\'button\' class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_western_blot" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'', (opt_data.experiment.western_blot_list.list.length >= 5) ? 'scb_s_western_blot_tabs_more ' : ' scb_s_western_blot_tabs', '\' role=\'tablist\'>');
  if (opt_data.experiment.western_blot_list.list.length < 5) {
    var wbList105 = opt_data.experiment.western_blot_list.list;
    var wbListLen105 = wbList105.length;
    for (var wbIndex105 = 0; wbIndex105 < wbListLen105; wbIndex105++) {
      var wbData105 = wbList105[wbIndex105];
      output.append((opt_data.western_blot.id == wbData105.id) ? '<span class=\'scb_s_western_blot_active\' role=\'tab\'><input role=\'input\' class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData105.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' value =\'' + soy.$$escapeHtml(wbData105.name) + '\' type=\'text\' maxlength=10 ></input><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData105.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' role=\'button\' >| &#215;</button></span>' : '<a role=\'tab\' class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData105.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData105.id) + '\'>' + soy.$$escapeHtml(wbData105.name) + '</a>');
    }
    output.append('<span class=\'scb_s_western_blot_add_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.experiment.western_blot_list.list[opt_data.experiment.western_blot_list.list.length - 1].id), '\'  role=\'tab\'><a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'presentation\'><span class=\'scb_s_add_tab\'>ADD </span><span class=\'scb_s_western_blot_add_cross_western_blot\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_western_blot_left_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' role=\'button\'  aria-label=\'Previous Tab\'></button>');
    if (opt_data.experiment.western_blot_list.list.length - 1 == opt_data.experiment.western_blot_list.start_tabs_index + 3) {
      var wbList157 = opt_data.experiment.western_blot_list.list;
      var wbListLen157 = wbList157.length;
      for (var wbIndex157 = 0; wbIndex157 < wbListLen157; wbIndex157++) {
        var wbData157 = wbList157[wbIndex157];
        output.append((wbIndex157 >= opt_data.experiment.western_blot_list.start_tabs_index && wbIndex157 < opt_data.experiment.western_blot_list.start_tabs_index + 4) ? (opt_data.western_blot.id == wbData157.id) ? '<span class=\'scb_s_western_blot_active scb_s_western_blot_more_open_western_blot\' role=\'tab\'><input  role=\'input\' class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData157.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' value =\'' + soy.$$escapeHtml(wbData157.name) + '\' type=\'text\' maxlength=10 ></input><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData157.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' role=\'button\' aria-label=\'Close Tab\'>| &#215;</button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot scb_s_western_blot_more_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData157.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData157.id) + '\' role=\'tab\'>' + soy.$$escapeHtml(wbData157.name) + '</a>' : '');
      }
      output.append('<span class=\'scb_s_western_blot_add_western_blot scb_s_western_blot_more_open_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.experiment.western_blot_list.list[opt_data.experiment.western_blot_list.list.length - 1].id), '\' role=\'tab\'><a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'presentation\'><span class=\'scb_s_add_tab\'>ADD </span><span class=\'scb_s_western_blot_add_cross_western_blot\'>| + </span></a></span>');
    } else {
      var wbList202 = opt_data.experiment.western_blot_list.list;
      var wbListLen202 = wbList202.length;
      for (var wbIndex202 = 0; wbIndex202 < wbListLen202; wbIndex202++) {
        var wbData202 = wbList202[wbIndex202];
        output.append((wbIndex202 >= opt_data.experiment.western_blot_list.start_tabs_index && wbIndex202 < opt_data.experiment.western_blot_list.start_tabs_index + 5) ? (opt_data.western_blot.id == wbData202.id) ? '<span class=\'scb_s_western_blot_active scb_s_western_blot_more_open_western_blot\'  role=\'tab\'><input role=\'input\' class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData202.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' value =\'' + soy.$$escapeHtml(wbData202.name) + '\' type=\'text\' maxlength=10 ></input><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData202.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' role=\'button\' aria-label=\'Close Tab\'>| &#215;</button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot scb_s_western_blot_more_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData202.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData202.id) + '\' role=\'tab\'>' + soy.$$escapeHtml(wbData202.name) + '</a>' : '');
      }
    }
    output.append('<button class=\'scb_s_western_blot_right_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' role=\'button\'  aria-label=\'Next Tab\'></button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: 1}, output);
  output.append('<div class=\'scb_s_western_blot_samples_container\' style=\'', (opt_data.rows.length >= 12) ? '  height: 306px;\t' : ' \theight:auto;', '\'><div class=\'scb_s_western_blot_samples_table\'  style=\'', (opt_data.rows.length >= 12) ? ' height: 216px;   min-height: 300px;  ' : ' \theight:auto;', '\'><table  role=\'grid\'><thead class=\'scb_s_western_blot_samples_table_head\'><td class=\'scb_s_western_blot_samples_table_heading sample_prep_select  scb_s_experiment_setup_table_border\' role=\'columnheader\'>Select</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_samples scb_s_experiment_setup_table_border\' role=\'columnheader\'>Samples</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_lysate  scb_s_experiment_setup_table_border\' role=\'columnheader\'>Lysate type</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_blank   scb_s_experiment_setup_table_border\' role=\'columnheader\'>&nbsp;</td></thead>');
  var rList259 = opt_data.rows;
  var rListLen259 = rList259.length;
  for (var rIndex259 = 0; rIndex259 < rListLen259; rIndex259++) {
    var rData259 = rList259[rIndex259];
    output.append('<tr  role=\'row\' class=\'scb_s_western_blot_samples_table_tr\'><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:96px;\'>', (rData259.display_sample) ? '<input type="checkbox" class="scb_f_western_blot_sample_active" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' aria-checked=\'' + ((rData259.is_sample_enabled) ? 'true' : 'false') + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData259.cell_treatment.id) + '\' role=\'checkbox\'' + ((rData259.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\'  style=\'width:491px;\'>', (rData259.display_sample) ? soy.$$escapeHtml(rData259.display_text) : '', '</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\'>');
    scb_western_blot.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, western_blot: opt_data.western_blot, cell_treatment: rData259.cell_treatment, kinds: opt_data.kinds, lane: rData259}, output);
    output.append('</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border scb_s_experiment_setup_table_border\'>', (rData259.kind == 'existing') ? '<button class="scb_f_western_blot_sample_remove" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData259.lane.id) + '\' role=\'button\' aria-label=\'Close Tab\'' + ((rData259.is_sample_enabled) ? '' : 'disabled="disabled"') + ' >&#215;</button>' : '<button  role=\'button\' class="scb_f_western_blot_sample_remove" disabled="disabled"  aria-label=\'Close Tab\'>&#215;</button>', '</td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr role=\'row\' class=\'scb_s_western_blot_samples_select_all_rel\'><td class=\'scb_f_western_blot_sample_active_all_td\' colspan=\'2\'><button  role=\'button\' class=\'scb_f_western_blot_sample_active_all\'  aria-label=\'Select All\'>SELECT ALL</button></td><td class=\'scb_f_western_blot_sample_inactive_all_td\' colspan=\'2\' align=\'right\'><button   role=\'button\' class=\'scb_f_western_blot_sample_inactive_all\'  aria-label=\'Clear All\'>CLEAR ALL</button></td></tr>' : '<tr role=\'row\' class=\'scb_s_western_blot_samples_select_all_abs\'><td colspan=\'1\'><button  role=\'button\' class=\'scb_f_western_blot_sample_active_all\'  aria-label=\'Select All\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_western_blot_blank_space1\'></td><td colspan=\'1\'><button  role=\'button\' class=\'scb_f_western_blot_sample_inactive_all\'  aria-label=\'Clear All\'>CLEAR ALL</button></td><td colspan=\'1\' >&nbsp;</td></tr>', '</table></div>', (opt_data.rows.length >= 10) ? '<div class="scb_s_western_blot_green_line" role=\'presentation\'></div>' : '', '</div></div><a class=\'scb_s_navigation_button scb_f_western_blot_prepare_lysates\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '  role=\'button\'  aria-label=\'Prepare Lysates\'> PREPARE LYSATES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.prepare_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: opt_data.western_blot.gel_type ? 3 : 2}, output);
  output.append('<div class=\'scb_s_western_blot_samples_area\'><button class=\'scb_f_info_icon  scb_s_western_blot_gel_type_info\' note=\'scb_f_wb_gel_type_followup\' role=\'button\' aria-label=\'Gel Type Info\'> </button><div class=\'scb_f_wb_gel_type_followup scb_f_controls_note\' role=\'note\'>Gel type refers to the percentage of acrylamide that is used to make the gel. Lower acrylamide concentrations are used to separate large proteins, while high acrylamide concentrations are used to separate small proteins. &nbsp;<a href="static/ref_lib/full_library.html#GelPreparation" target=\'_blank\' class=\'scb_s_select_technique_learn_more \' role=\'link\'>Learn more &gt;&gt;</a></div>', (opt_data.western_blot.marker_loaded) ? '' : '<button class=\'scb_f_info_icon scb_s_western_blot_marker_info\' note=\'scb_f_wb_marker_followup\' role=\'button\' aria-label=\'Marker Info\'> </button><div class=\'scb_f_wb_marker_followup scb_f_controls_note\' role=\'note\'>A protein marker or ladder consisting of multiple proteins of known sizes is loaded into one of the gel\'s wells that serves as a measurement tool against which you can measure the protein of interest. The protein marker usually consists of wide range of protein sizes, ranging from 10-250 kilodaltons (kDa).  &nbsp;<a href="static/ref_lib/full_library.html#LoadGel" target=\'_blank\' class=\'scb_s_select_technique_learn_more \' role=\'link\'>Learn more &gt;&gt;</a></div>', '<div class=\'scb_s_western_blot_choose_gel_type\'><!-- TODO: Gel Type stuff --><div class=\'scb_s_western_blot_choose_gel_type_title\'>Gel Type:</div>', (opt_data.western_blot.wells_loaded) ? ((opt_data.western_blot.gel_type == '.10') ? '&nbsp;&nbsp;&nbsp;10%' : '') + ((opt_data.western_blot.gel_type == '.12') ? '&nbsp;&nbsp;&nbsp;12%' : '') + ((opt_data.western_blot.gel_type == '.15') ? '&nbsp;&nbsp;&nbsp;15%' : '') : '<div class=\'scb_s_western_blot_radio_wrapper\'><input class=\'scb_s_western_blot_choose_gel_type_input scb_s_western_blot_gel_type_radio_ten\' type="radio" name="gel_type" value=".10" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' ' + ((opt_data.western_blot.gel_type == '.10') ? 'checked=\'checked\'' : '') + '/><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_gel_type_text_ten">10%</span>&nbsp;&nbsp;<input class=\'scb_s_western_blot_choose_gel_type_input scb_s_western_blot_gel_type_radio_twelve\' type="radio" name="gel_type" value=".12" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' ' + ((opt_data.western_blot.gel_type == '.12') ? 'checked=\'checked\'' : '') + ' /><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_gel_type_text_twelve">12%</span>&nbsp;<input class=\'scb_s_western_blot_choose_gel_type_input scb_s_western_blot_gel_type_radio_fifteen\' type="radio" name="gel_type" value=".15" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' ' + ((opt_data.western_blot.gel_type == '.15') ? 'checked=\'checked\'' : '') + ' /><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_gel_type_text_fifteen">15%</span></div>', '</div><div class=\'scb_s_western_blot_samples_heading\'>Samples', (opt_data.western_blot.wells_loaded == false) ? '<button class=\'scb_f_western_blot_tools_toggle scb_s_western_blot_tools_samples_followup_toggle\' role=\'button\' aria-label=\'Samples Info\' note=\'scb_s_western_blot_tools_samples_followup\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\'></button><div class=\'scb_s_western_blot_tools_samples_followup ' + ((opt_data.western_blot.samples_show_state) ? '' : 'scb_s_hidden_note') + '\'  role=\'note\'><button class=\'scb_f_western_blot_note_close_button\' aria-label=\'Close\' note=\'scb_s_western_blot_tools_samples_followup\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\'><span>&#215;</span></button>To re-order the samples, either (1) click and drag the samples or (2) select a sample and use the &nbsp; <img class=\'scb_s_updown_image\' src=\'images/western_blot/updown_image.png\'> &nbsp; up and down arrows to move the samples into the desired order.</div><span class=\'scb_s_wb_button_wrapper\'><button class=\'scb_f_wb_up_button\'>&#x25B2;</button><div class="scb_s_wb_button_divider"></div><button class=\'scb_f_wb_down_button\'>&#x25BC;</button></span><br/><br/>' : '', '</div><div class=\'scb_s_western_blot_choose_samples_order\'>', (opt_data.western_blot.gel_type) ? '' : '<div class=\'order_overlay\'></div>', '<ol role=\'list\' class=\'', (! opt_data.western_blot.wells_loaded) ? ' scb_s_western_blot_sortable_list  ' : ' scb_s_western_blot_static_list ', ' scb_s_western_blot_choose_samples_order_list\' >');
  var rList421 = opt_data.rows;
  var rListLen421 = rList421.length;
  for (var rIndex421 = 0; rIndex421 < rListLen421; rIndex421++) {
    var rData421 = rList421[rIndex421];
    output.append((rData421.kind == 'existing' && opt_data.western_blot.marker_loaded == true && rData421.lane.id == 'marker') ? '<li role=\'listitem\' class="scb_s_western_blot_marker scb_s_western_blot_choose_samples_list_item scb_s_western_blot_sortable_item scb_s_movable_item" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' id=\'' + soy.$$escapeHtml(rData421.lane.id) + '\'>Marker</li>' : '', (rData421.is_valid) ? '<li role=\'listitem\'  class="scb_s_western_blot_choose_samples_list_item scb_s_western_blot_sortable_item scb_s_movable_item" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' id=\'' + soy.$$escapeHtml(rData421.lane.id) + '\' title=\'' + soy.$$escapeHtml(rData421.display_text) + ' - ' + soy.$$escapeHtml(rData421.lane.kinds[rData421.lane.kind].name) + '\'>' + soy.$$escapeHtml(rData421.display_text) + ' - ' + soy.$$escapeHtml(rData421.lane.kinds[rData421.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.western_blot.marker_loaded == false && opt_data.western_blot.wells_loaded == false) ? '<div class=\'scb_s_western_blot_add_marker_wrapper\'><button class=\'scb_s_western_blot_load_marker\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'></button><div class=\'scb_s_western_blot_add_marker_text\'>ADD MARKER +</div></div>' : '', (opt_data.western_blot.wells_loaded == false) ? '<div class=\'scb_s_western_blot_load_gel_divider\'></div><a class=\'scb_s_western_blot_load_all scb_s_navigation_button\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' href="#view=western_blot_gel&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(opt_data.western_blot.id) + '">LOAD GEL</a>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\'><div class=\'scb_s_western_blot_gel_tabs\'><div class=\'scb_s_western_blot_gel_tab scb_s_western_blot_gel_active\' contenteditable="true">GEL</div></div><div class=\'scb_s_western_blot_gel_content\'><canvas class=\'scb_s_western_blot_gel\' src=\'images/western_blot/SCB_WesternBlotting_GelNumbers.png\'/><div class=\'scb_s_western_blot_tools\'>', (opt_data.western_blot.wells_loaded == true && opt_data.western_blot.marker_loaded == true || opt_data.western_blot.wells_loaded == true) ? '<a class=\'scb_s_western_blot_run_gel_and_transfer scb_s_navigation_button\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' href="#view=western_blot_gel&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(opt_data.western_blot.id) + '">RUN GEL & TRANSFER</a>' : '', '</div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_western_blot_numbers = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'scb_s_western_blot_gel_numbers\'><span class=\'scb_s_western_blot_gel_number\'>1</span><span class=\'scb_s_western_blot_gel_number\'>2</span><span class=\'scb_s_western_blot_gel_number\'>3</span><span class=\'scb_s_western_blot_gel_number\'>4</span><span class=\'scb_s_western_blot_gel_number\'>5</span><span class=\'scb_s_western_blot_gel_number\'>6</span><span class=\'scb_s_western_blot_gel_number\'>7</span><span class=\'scb_s_western_blot_gel_number\'>8</span><span class=\'scb_s_western_blot_gel_number\'>9</span><span class=\'scb_s_western_blot_gel_number\'>10</span><span class=\'scb_s_western_blot_gel_number\'>11</span><span class=\'scb_s_western_blot_gel_number\'>12</span><span class=\'scb_s_western_blot_gel_number\'>13</span><span class=\'scb_s_western_blot_gel_number\'>14</span><span class=\'scb_s_western_blot_gel_number\'>15</span></span>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_lysate_types = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (soy.$$getMapKeys(opt_data.kinds).length < 1) {
    var kList500 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen500 = kList500.length;
    for (var kIndex500 = 0; kIndex500 < kListLen500; kIndex500++) {
      var kData500 = kList500[kIndex500];
      output.append('<div class="scb_f_western_blot_select_lysate_type"  kind=\'', soy.$$escapeHtml(kData500), '\' cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '">', soy.$$escapeHtml(opt_data.kinds[kData500].name), '</div>');
    }
  } else {
    if (soy.$$getMapKeys(opt_data.kinds).length == 1) {
      var kList524 = soy.$$getMapKeys(opt_data.kinds);
      var kListLen524 = kList524.length;
      for (var kIndex524 = 0; kIndex524 < kListLen524; kIndex524++) {
        var kData524 = kList524[kIndex524];
        output.append('<span class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '" value=\'', soy.$$escapeHtml(kData524), '\'>', soy.$$escapeHtml(opt_data.kinds[kData524].name), '</span>');
      }
    } else {
      output.append('<select class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' role=\'select\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
      if (opt_data.lane.kind == 'existing') {
        var kList568 = soy.$$getMapKeys(opt_data.kinds);
        var kListLen568 = kList568.length;
        for (var kIndex568 = 0; kIndex568 < kListLen568; kIndex568++) {
          var kData568 = kList568[kIndex568];
          output.append('<option role=\'option\' value=\'', soy.$$escapeHtml(kData568), '\'', (opt_data.lane.lane.kind == kData568) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData568].name), '</option>');
        }
      } else {
        output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option role=\'option\' selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
        var kList583 = soy.$$getMapKeys(opt_data.kinds);
        var kListLen583 = kList583.length;
        for (var kIndex583 = 0; kIndex583 < kListLen583; kIndex583++) {
          var kData583 = kList583[kIndex583];
          output.append('<option role=\'option\' value=\'', soy.$$escapeHtml(kData583), '\'>', soy.$$escapeHtml(opt_data.kinds[kData583].name), '</option>');
        }
      }
      output.append('</select>');
    }
  }
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_wb_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_progress\'><div class=\'scb_s_western_blot_video_box_wrapper\'><div class=\'scb_s_western_blot_video_box_wrapper_title\'>IN THE LAB</div><div id=\'slider\' class=\'scb_s_western_blot_video_box swipe\'><div  class=\'slides_container swipe-wrap\'><div><img class=\'scb_s_western_blot_video_box_img\' src=\'images/western_blot/in_the_lab_all.png\' ><br/><span class=\'scb_s_western_blot_video_heading\'>Reminder:&nbsp;&nbsp;</span><span class=\'scb_s_western_blot_video_text\'>The gel only has 15 lanes and one&nbsp;</span><br/><span class=\'scb_s_western_blot_video_text_second\'>lane must be reserved for the protein marker.&nbsp;</span><br/></div><div><iframe height=\'124\' width=\'187\' class=\'scb_s_experiment_setup_video_box_vid\'  src="//www.youtube.com/embed/u7VwmJw9Gbc" frameborder="0" allowfullscreen></iframe></div></div></div><div class=\'slider_controls\' style=\'text-align:center;\'><button onclick=\'mySwipe.prev()\'>&#x25c0;</button><nav id = \'nav\'><ul class=\'slider_dots\'><li class=\'on\'></li><li ></li></ul></nav><button onclick=\'mySwipe.next()\'>&#x25b6;</button></div></div><div class=\'scb_s_western_blot_vertical_line_1\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_2\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_3\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_4\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_5\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_6\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_7\'  role=\'presentation\'></div><div class=\'scb_s_western_blot_progress_bar\' role=\'progressbar\'><div class = \'scb_s_western_blot_progress_gray_bar\'><div class=\'scb_s_western_blot_vertical_line_1_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_2_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_3_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_4_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_5_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_6_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_vertical_line_7_top\' role=\'presentation\'></div><div class=\'scb_s_western_blot_progress_stripe_bar\' style=\'width:', (opt_data.step == 1) ? '20px;' : '', (opt_data.step == 2) ? '111px;' : '', (opt_data.step == 3) ? '202px;' : '', (opt_data.step == 4) ? '293px;' : '', (opt_data.step == 5) ? '384px;' : '', (opt_data.step == 6) ? '475px;' : '', (opt_data.step == 7) ? '607px; border-top-right-radius:8px; border-bottom-right-radius:8px;' : '', '\'></div></div><div class=\'scb_s_western_blot_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 \'>1. Sample Prep</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 \'>2. Prepare Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3\'>3. Load Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_4 \'>4. Run</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_5 \'>5. Transfer</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_6 \'>6. Blot</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_7 \'>7. Develop</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.well_images = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'scb_wells\' style=\'display:none;\'><img src=\'images/western_blot/WesternBlot_BlueWells_01.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_02.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_03.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_04.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_05.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_06.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_07.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_08.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_09.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_10.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_11.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_12.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_13.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_14.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_15.png\'><img src=\'images/western_blot/SCB_WesternBlotting_GelNumbers.png\'></span>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.wb_sample_error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('You have selected more than 15 samples. The gel only has 15 lanes. Please only select 15 samples, and remember that one lane is usually reserved for a protein marker."');
  return opt_sb ? '' : output.toString();
};
