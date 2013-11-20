// This file was automatically generated from western_blot.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot == 'undefined') { var scb_western_blot = {}; }


scb_western_blot.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, last_step: opt_data.last_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'WESTERN BLOT', technique_view: 'western_blot', technique_param: 'western_blot_id', technique_id: opt_data.western_blot.id}, output);
  scb_western_blot.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  scb_western_blot.well_images(null, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_container\'><div class=\'scb_western_blot_details_view\'>');
  scb_common.experiment_step({step: 5, last_step: 6, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<span class=\'scb_s_western_blot_all_tabs\'><div class=\'scb_western_blot_details_view_inner\'>');
  scb_western_blot.display_tabs(opt_data, output);
  output.append('</div></span></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_tab_content ', (opt_data.kind == 'sample_prep') ? 'scb_s_western_blot_tab_content_sample_prep' : '', '\'>');
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
  output.append((opt_data.kind == 'gel_operations') ? '</div>' : '', '<a class="scb_s_navigation_button scb_f_open_select_technique scb_s_select_technique_at_western_blot" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_tabs_selector = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'', (opt_data.experiment.western_blot_list.list.length >= 5) ? 'scb_s_western_blot_tabs_more ' : ' scb_s_western_blot_tabs', '\'>');
  if (opt_data.experiment.western_blot_list.list.length < 5) {
    var wbList104 = opt_data.experiment.western_blot_list.list;
    var wbListLen104 = wbList104.length;
    for (var wbIndex104 = 0; wbIndex104 < wbListLen104; wbIndex104++) {
      var wbData104 = wbList104[wbIndex104];
      output.append((opt_data.western_blot.id == wbData104.id) ? '<span class=\'scb_s_western_blot_active\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData104.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData104.name) + '</span><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData104.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData104.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData104.id) + '\'>' + soy.$$escapeHtml(wbData104.name) + '</a>');
    }
    output.append('<span class=\'scb_s_western_blot_add_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.experiment.western_blot_list.list[opt_data.experiment.western_blot_list.list.length - 1].id), '\'><a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'><span class=\'scb_s_add_tab\'>ADD </span><span class=\'scb_s_western_blot_add_cross_western_blot\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_western_blot_left_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'></button>');
    if (opt_data.experiment.western_blot_list.list.length - 1 == opt_data.experiment.western_blot_list.start_tabs_index + 3) {
      var wbList156 = opt_data.experiment.western_blot_list.list;
      var wbListLen156 = wbList156.length;
      for (var wbIndex156 = 0; wbIndex156 < wbListLen156; wbIndex156++) {
        var wbData156 = wbList156[wbIndex156];
        output.append((wbIndex156 >= opt_data.experiment.western_blot_list.start_tabs_index && wbIndex156 < opt_data.experiment.western_blot_list.start_tabs_index + 4) ? (opt_data.western_blot.id == wbData156.id) ? '<span class=\'scb_s_western_blot_active scb_s_western_blot_more_open_western_blot\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData156.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData156.name) + '</span><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData156.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;</button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot scb_s_western_blot_more_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData156.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData156.id) + '\'>' + soy.$$escapeHtml(wbData156.name) + '</a>' : '');
      }
      output.append('<span class=\'scb_s_western_blot_add_western_blot scb_s_western_blot_more_open_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.experiment.western_blot_list.list[opt_data.experiment.western_blot_list.list.length - 1].id), '\'><a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'><span class=\'scb_s_add_tab\'>ADD </span><span class=\'scb_s_western_blot_add_cross_western_blot\'>| + </span></a></span>');
    } else {
      var wbList201 = opt_data.experiment.western_blot_list.list;
      var wbListLen201 = wbList201.length;
      for (var wbIndex201 = 0; wbIndex201 < wbListLen201; wbIndex201++) {
        var wbData201 = wbList201[wbIndex201];
        output.append((wbIndex201 >= opt_data.experiment.western_blot_list.start_tabs_index && wbIndex201 < opt_data.experiment.western_blot_list.start_tabs_index + 5) ? (opt_data.western_blot.id == wbData201.id) ? '<span class=\'scb_s_western_blot_active scb_s_western_blot_more_open_western_blot\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData201.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData201.name) + '</span><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData201.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;</button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot scb_s_western_blot_more_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData201.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData201.id) + '\'>' + soy.$$escapeHtml(wbData201.name) + '</a>' : '');
      }
    }
    output.append('<button class=\'scb_s_western_blot_right_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ></button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: 1}, output);
  output.append('<div class=\'scb_s_western_blot_samples_container\' style=\'', (opt_data.rows.length >= 12) ? '  height: 306px;\t' : ' \theight:auto;', '\'><div class=\'scb_s_western_blot_samples_table\'  style=\'', (opt_data.rows.length >= 12) ? ' height: 216px;   min-height: 300px;  ' : ' \theight:auto;', '\'><table><thead class=\'scb_s_western_blot_samples_table_head\'><td class=\'scb_s_western_blot_samples_table_heading sample_prep_select scb_s_experiment_setup_table_border\'>Select</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_samples scb_s_experiment_setup_table_border\'>Samples</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_lysate scb_s_experiment_setup_table_border\'>Lysate type</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_blank scb_s_experiment_setup_table_border\'>&nbsp;</td></thead>');
  var rList258 = opt_data.rows;
  var rListLen258 = rList258.length;
  for (var rIndex258 = 0; rIndex258 < rListLen258; rIndex258++) {
    var rData258 = rList258[rIndex258];
    output.append('<tr class=\'scb_s_western_blot_samples_table_tr\'><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:96px;\'>', (rData258.display_sample) ? '<input type="checkbox" class="scb_f_western_blot_sample_active" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData258.cell_treatment.id) + '\'' + ((rData258.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\'  style=\'width:491px;\'>', (rData258.display_sample) ? soy.$$escapeHtml(rData258.display_text) : '', '</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\'>');
    scb_western_blot.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, western_blot: opt_data.western_blot, cell_treatment: rData258.cell_treatment, kinds: opt_data.kinds, lane: rData258}, output);
    output.append('</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border scb_s_experiment_setup_table_border\'>', (rData258.kind == 'existing') ? '<button class="scb_f_western_blot_sample_remove" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData258.lane.id) + '\'' + ((rData258.is_sample_enabled) ? '' : 'disabled="disabled"') + '>&#215;</button>' : '<button class="scb_f_western_blot_sample_remove" disabled="disabled">&#215;</button>', '</td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr class=\'scb_s_western_blot_samples_select_all_rel\'><td class=\'scb_f_western_blot_sample_active_all_td\' colspan=\'2\'><button class=\'scb_f_western_blot_sample_active_all\'>SELECT ALL</button></td><td class=\'scb_f_western_blot_sample_inactive_all_td\' colspan=\'2\' align=\'right\'><button class=\'scb_f_western_blot_sample_inactive_all\'>CLEAR ALL</button></td></tr>' : '<tr class=\'scb_s_western_blot_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_western_blot_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_western_blot_blank_space1\'></td><td colspan=\'1\'><button class=\'scb_f_western_blot_sample_inactive_all\'>CLEAR ALL</button></td><td colspan=\'1\' >&nbsp;</td></tr>', '</table></div>', (opt_data.rows.length >= 10) ? '<div class="scb_s_western_blot_green_line"></div>' : '', '</div></div><a class=\'scb_s_navigation_button scb_f_western_blot_prepare_lysates\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> PREPARE LYSATES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.prepare_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: opt_data.western_blot.gel_type ? 3 : 2}, output);
  output.append('<div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'><!-- TODO: Gel Type stuff --><div class=\'scb_s_western_blot_choose_gel_type_title\'>Gel Type:</div><input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".10" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.10') ? 'checked=\'checked\'' : '', '/><span class="scb_s_western_blot_choose_gel_type_input_text">10%</span>&nbsp;&nbsp;<input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".12" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.12') ? 'checked=\'checked\'' : '', ' disabled=\'disabled\'/><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_choose_gel_type_input_disabled">12%</span>&nbsp;<input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".15" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.15') ? 'checked=\'checked\'' : '', ' disabled=\'disabled\'/><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_choose_gel_type_input_disabled">15%</span></div><!--<div class=\'scb_s_western_blot_choose_samples_note\'>NOTE: You can reorder samples by dragging and dropping into new order</div>--><div class=\'scb_s_western_blot_samples_heading\'>Samples</div><div class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list\' >');
  var rList363 = opt_data.rows;
  var rListLen363 = rList363.length;
  for (var rIndex363 = 0; rIndex363 < rListLen363; rIndex363++) {
    var rData363 = rList363[rIndex363];
    output.append((rData363.is_valid) ? '<li class="scb_s_western_blot_choose_samples_list_item" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' id=\'' + soy.$$escapeHtml(rData363.lane.id) + '\'>' + soy.$$escapeHtml(rData363.display_text) + ' - ' + soy.$$escapeHtml(rData363.lane.kinds[rData363.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol>');
  var start__soy381 = opt_data.rows_valid + 1;
  output.append('<ol class=\'scb_s_western_blot_choose_samples_marker\' start=', soy.$$escapeHtml(start__soy381), '>', (opt_data.western_blot.marker_loaded == true) ? '<li class="scb_s_western_blot_marker">Marker</li>' : '', '</ol></div>', (opt_data.western_blot.marker_loaded == false) ? '<button class=\'scb_s_western_blot_load_marker scb_s_navigation_button\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>LOAD MARKER</button>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\'><div class=\'scb_s_western_blot_gel_tabs\'><div class=\'scb_s_western_blot_gel_tab scb_s_western_blot_gel_active\' contenteditable="true">GEL</div></div><div class=\'scb_s_western_blot_gel_content\'><!--');
  scb_western_blot.display_western_blot_numbers(null, output);
  output.append('--><canvas class=\'scb_s_western_blot_gel\' src=\'images/western_blot/SCB_WesternBlotting_GelNumbers.png\'/><div class=\'scb_s_western_blot_tools\'><a class=\'scb_s_western_blot_run_gel_and_transfer scb_s_navigation_button\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' href="#view=western_blot_gel&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&western_blot_id=', soy.$$escapeHtml(opt_data.western_blot.id), '">RUN GEL & TRANSFER</a></div></div></div>');
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
    var kList418 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen418 = kList418.length;
    for (var kIndex418 = 0; kIndex418 < kListLen418; kIndex418++) {
      var kData418 = kList418[kIndex418];
      output.append('<div class="scb_f_western_blot_select_lysate_type"  kind=\'', soy.$$escapeHtml(kData418), '\' cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '">', soy.$$escapeHtml(opt_data.kinds[kData418].name), '</div>');
    }
  } else {
    if (soy.$$getMapKeys(opt_data.kinds).length == 1) {
      var kList442 = soy.$$getMapKeys(opt_data.kinds);
      var kListLen442 = kList442.length;
      for (var kIndex442 = 0; kIndex442 < kListLen442; kIndex442++) {
        var kData442 = kList442[kIndex442];
        output.append('<span class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '" value=\'', soy.$$escapeHtml(kData442), '\'>', soy.$$escapeHtml(opt_data.kinds[kData442].name), '</span>');
      }
    } else {
      output.append('<select class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
      if (opt_data.lane.kind == 'existing') {
        var kList486 = soy.$$getMapKeys(opt_data.kinds);
        var kListLen486 = kList486.length;
        for (var kIndex486 = 0; kIndex486 < kListLen486; kIndex486++) {
          var kData486 = kList486[kIndex486];
          output.append('<option value=\'', soy.$$escapeHtml(kData486), '\'', (opt_data.lane.lane.kind == kData486) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData486].name), '</option>');
        }
      } else {
        output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
        var kList501 = soy.$$getMapKeys(opt_data.kinds);
        var kListLen501 = kList501.length;
        for (var kIndex501 = 0; kIndex501 < kListLen501; kIndex501++) {
          var kData501 = kList501[kIndex501];
          output.append('<option value=\'', soy.$$escapeHtml(kData501), '\'>', soy.$$escapeHtml(opt_data.kinds[kData501].name), '</option>');
        }
      }
      output.append('</select>');
    }
  }
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_wb_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_progress\'><div class=\'scb_s_western_blot_video_box_wrapper\'><div class=\'scb_s_western_blot_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_western_blot_video_reminder\'><div class=\'scb_s_western_blot_video_box\'><img alt=\'In_The_Lab\' title=\'In_The_Lab\' class=\'scb_s_western_blot_video_box_img\' src=\'images/western_blot/in_the_lab_all.png\'><br/><div class=\'scb_s_western_blot_video_heading\'>Reminder:&nbsp;&nbsp;</div><div class=\'scb_s_western_blot_video_text\'>The gel only has 15 lanes and one&nbsp;</div><div class=\'scb_s_western_blot_video_text_second\'>lane must be reserved for the protein marker.&nbsp;</div><br/><a href=\'static/ref_lib/full_library.html#GelPreparation\' target=\'_blank\'  class=\'scb_s_western_blot_learn_more\'>Learn More</a></div></div></div><div class=\'scb_s_western_blot_vertical_line_1\'></div><div class=\'scb_s_western_blot_vertical_line_2\'></div><div class=\'scb_s_western_blot_vertical_line_3\'></div><div class=\'scb_s_western_blot_vertical_line_4\'></div><div class=\'scb_s_western_blot_vertical_line_5\'></div><div class=\'scb_s_western_blot_vertical_line_6\'></div><div class=\'scb_s_western_blot_vertical_line_7\'></div><div class=\'scb_s_western_blot_progress_bar\'><div class = \'scb_s_western_blot_progress_gray_bar\'><div class=\'scb_s_western_blot_vertical_line_1_top\'></div><div class=\'scb_s_western_blot_vertical_line_2_top\'></div><div class=\'scb_s_western_blot_vertical_line_3_top\'></div><div class=\'scb_s_western_blot_vertical_line_4_top\'></div><div class=\'scb_s_western_blot_vertical_line_5_top\'></div><div class=\'scb_s_western_blot_vertical_line_6_top\'></div><div class=\'scb_s_western_blot_vertical_line_7_top\'></div><div class=\'scb_s_western_blot_progress_stripe_bar\' style=\'width:', (opt_data.step == 1) ? '77px;' : '', (opt_data.step == 2) ? '168px;' : '', (opt_data.step == 3) ? '260px;' : '', (opt_data.step == 4) ? '350px;' : '', (opt_data.step == 5) ? '443px;' : '', (opt_data.step == 6) ? '534px;' : '', (opt_data.step == 7) ? '607px; border-top-right-radius:8px; border-bottom-right-radius:8px;' : '', '\'></div></div><div class=\'scb_s_western_blot_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 \'>1. Sample Prep</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 \'>2. Prepare Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3\'>3. Load Gel</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_4 \'>4. Run</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_5 \'>5. Transfer</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_6 \'>6. Blot</div><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_7 \'>7. Develop</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.well_images = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'scb_wells\' style=\'display:none;\'><img src=\'images/western_blot/WesternBlot_BlueWells_01.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_02.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_03.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_04.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_05.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_06.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_07.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_08.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_09.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_10.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_11.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_12.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_13.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_14.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_15.png\'><img src=\'images/western_blot/SCB_WesternBlotting_GelNumbers.png\'></span>');
  return opt_sb ? '' : output.toString();
};
