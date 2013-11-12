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
  scb_common.experiment_step({step: 5, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<div class=\'scb_s_western_blot_all_tabs\'><div class=\'scb_western_blot_details_view_inner\'>');
  scb_western_blot.display_tabs(opt_data, output);
  output.append('</div></div></div></div>');
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
  output.append('<div class=\'scb_s_western_blot_tabs\'>');
  if (opt_data.experiment.western_blot_list.list.length < 4) {
    var wbList97 = opt_data.experiment.western_blot_list.list;
    var wbListLen97 = wbList97.length;
    for (var wbIndex97 = 0; wbIndex97 < wbListLen97; wbIndex97++) {
      var wbData97 = wbList97[wbIndex97];
      output.append((opt_data.western_blot.id == wbData97.id) ? '<span class=\'scb_s_western_blot_active\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData97.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData97.name) + '</span><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData97.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData97.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData97.id) + '\'>' + soy.$$escapeHtml(wbData97.name) + '</a>');
    }
    output.append('<span class=\'scb_s_western_blot_add_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.experiment.western_blot_list.list[opt_data.experiment.western_blot_list.list.length - 1].id), '\'><a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'><span class=\'scb_s_add_tab\'>ADD </span><span class=\'scb_s_western_blot_add_cross_western_blot\'>| + </span></a></span>');
  } else {
    output.append('<button class=\'scb_s_western_blot_left_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'><img src="images/western_blot/scb_wb_left_main.png"></button>');
    var wbList147 = opt_data.experiment.western_blot_list.list;
    var wbListLen147 = wbList147.length;
    for (var wbIndex147 = 0; wbIndex147 < wbListLen147; wbIndex147++) {
      var wbData147 = wbList147[wbIndex147];
      output.append((wbIndex147 >= opt_data.experiment.western_blot_list.start_tabs_index && wbIndex147 < opt_data.experiment.western_blot_list.start_tabs_index + 5) ? (opt_data.western_blot.id == wbData147.id) ? '<span class=\'scb_s_western_blot_active\'><span class=\'scb_s_western_blot_selected\' western_blot_id=\'' + soy.$$escapeHtml(wbData147.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' contenteditable="true">' + soy.$$escapeHtml(wbData147.name) + '</span><button class=\'scb_s_western_blot_remove scb_f_western_blot_remove\' western_blot_id=\'' + soy.$$escapeHtml(wbData147.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>| &#215;<!--             <img src="images/setup/scb_remove.png"> --></button></span>' : '<a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(wbData147.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(wbData147.id) + '\'>' + soy.$$escapeHtml(wbData147.name) + '</a>' : '');
    }
    output.append('<span class=\'scb_s_western_blot_add_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.experiment.western_blot_list.list[opt_data.experiment.western_blot_list.list.length - 1].id), '\'> <a class=\'scb_f_open_western_blot scb_s_western_blot_open_western_blot\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'><span class=\'scb_s_add_tab\'>ADD </span><span class=\'scb_s_western_blot_add_cross_western_blot\'>| + </span></a></span><button class=\'scb_s_western_blot_right_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ><img src="images/western_blot/scb_wb_right_main.png"></button>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.sample_prep = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: 1}, output);
  output.append('<div class=\'scb_s_western_blot_samples_container\' style=\'', (opt_data.rows.length >= 12) ? '  height: 306px;\t' : ' \theight:auto;', '\'><div class=\'scb_s_western_blot_samples_table\'  style=\'', (opt_data.rows.length >= 12) ? ' height: 216px;   min-height: 300px;  ' : ' \theight:auto;', '\'><table><thead class=\'scb_s_western_blot_samples_table_head\'><td class=\'scb_s_western_blot_samples_table_heading sample_prep_select scb_s_experiment_setup_table_border\'>Select</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_samples scb_s_experiment_setup_table_border\'>Samples</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_lysate scb_s_experiment_setup_table_border\'>Lysate type</td><td class=\'scb_s_western_blot_samples_table_heading sample_prep_blank scb_s_experiment_setup_table_border\'>&nbsp;</td></thead>');
  var rList214 = opt_data.rows;
  var rListLen214 = rList214.length;
  for (var rIndex214 = 0; rIndex214 < rListLen214; rIndex214++) {
    var rData214 = rList214[rIndex214];
    output.append('<tr class=\'scb_s_western_blot_samples_table_tr\'><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\' style=\'width:96px;\'>', (rData214.display_sample) ? '<input type="checkbox" class="scb_f_western_blot_sample_active" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' cell_treatment_id=\'' + soy.$$escapeHtml(rData214.cell_treatment.id) + '\'' + ((rData214.is_sample_enabled) ? 'checked="checked"' : '') + '>' : '', '</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\'  style=\'width:491px;\'>', (rData214.display_sample) ? soy.$$escapeHtml(rData214.display_text) : '', '</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border\'>');
    scb_western_blot.display_lysate_types({assignment: opt_data.assignment, experiment: opt_data.experiment, western_blot: opt_data.western_blot, cell_treatment: rData214.cell_treatment, kinds: opt_data.kinds, lane: rData214}, output);
    output.append('</td><td class=\'scb_s_western_blot_samples_table_td scb_s_experiment_setup_table_border scb_s_experiment_setup_table_border\'>', (rData214.kind == 'existing') ? '<button class="scb_f_western_blot_sample_remove" western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' lane_id=\'' + soy.$$escapeHtml(rData214.lane.id) + '\'' + ((rData214.is_sample_enabled) ? '' : 'disabled="disabled"') + '>&#215;</button>' : '<button class="scb_f_western_blot_sample_remove" disabled="disabled">&#215;</button>', '</td></tr>');
  }
  output.append((opt_data.rows.length >= 10) ? '<tr class=\'scb_s_western_blot_samples_select_all_rel\'><td class=\'scb_f_western_blot_sample_active_all_td\' colspan=\'2\'><button class=\'scb_f_western_blot_sample_active_all\'>SELECT ALL</button></td><td class=\'scb_f_western_blot_sample_inactive_all_td\' colspan=\'2\' align=\'right\'><button class=\'scb_f_western_blot_sample_inactive_all\'>CLEAR ALL</button></td></tr>' : '<tr class=\'scb_s_western_blot_samples_select_all_abs\'><td colspan=\'1\'><button class=\'scb_f_western_blot_sample_active_all\'>SELECT ALL</button></td><td colspan=\'1\' class=\'scb_s_western_blot_blank_space1\'></td><td colspan=\'1\'><button class=\'scb_f_western_blot_sample_inactive_all\'>CLEAR ALL</button></td><td colspan=\'1\' >&nbsp;</td></tr>', '</table></div>', (opt_data.rows.length >= 10) ? '<div class="scb_s_western_blot_green_line"></div>' : '', '</div></div><a class=\'scb_s_navigation_button scb_f_western_blot_prepare_lysates\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'', (opt_data.can_prepare_lysate) ? '' : 'disabled=\'disabled\'', '> PREPARE LYSATES  &nbsp; &#9654;</a>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.prepare_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_wb_progress({step: opt_data.western_blot.gel_type ? 3 : 2}, output);
  output.append('<div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'><!-- TODO: Gel Type stuff --><div class=\'scb_s_western_blot_choose_gel_type_title\'>Gel Type:</div><input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".10" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.10') ? 'checked=\'checked\'' : '', '/><span class="scb_s_western_blot_choose_gel_type_input_text">10%</span>&nbsp;&nbsp;<input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".12" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.12') ? 'checked=\'checked\'' : '', ' disabled=\'disabled\'/><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_choose_gel_type_input_disabled">12%</span>&nbsp;<input class=\'scb_s_western_blot_choose_gel_type_input\' type="radio" name="gel_type" value=".15" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' ', (opt_data.western_blot.gel_type == '.15') ? 'checked=\'checked\'' : '', ' disabled=\'disabled\'/><span class="scb_s_western_blot_choose_gel_type_input_text scb_s_western_blot_choose_gel_type_input_disabled">15%</span></div><!--<div class=\'scb_s_western_blot_choose_samples_note\'>NOTE: You can reorder samples by dragging and dropping into new order</div>--><div class=\'scb_s_western_blot_samples_heading\'>Samples</div><div class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list\' >');
  var rList319 = opt_data.rows;
  var rListLen319 = rList319.length;
  for (var rIndex319 = 0; rIndex319 < rListLen319; rIndex319++) {
    var rData319 = rList319[rIndex319];
    output.append((rData319.is_valid) ? '<li class="scb_s_western_blot_choose_samples_list_item" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' id=\'' + soy.$$escapeHtml(rData319.lane.id) + '\'>' + soy.$$escapeHtml(rData319.display_text) + ' - ' + soy.$$escapeHtml(rData319.lane.kinds[rData319.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol>');
  var start__soy337 = opt_data.rows_valid + 1;
  output.append('<ol class=\'scb_s_western_blot_choose_samples_marker\' start=', soy.$$escapeHtml(start__soy337), '>', (opt_data.western_blot.marker_loaded == true) ? '<li class="scb_s_western_blot_marker">Marker</li>' : '', '</ol></div>', (opt_data.western_blot.marker_loaded == false) ? '<button class=\'scb_s_western_blot_load_marker scb_s_navigation_button\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>LOAD MARKER</button>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\'><div class=\'scb_s_western_blot_gel_tabs\'><div class=\'scb_s_western_blot_gel_tab scb_s_western_blot_gel_active\' contenteditable="true">GEL</div></div><div class=\'scb_s_western_blot_gel_content\'><!--');
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
    var kList374 = soy.$$getMapKeys(opt_data.kinds);
    var kListLen374 = kList374.length;
    for (var kIndex374 = 0; kIndex374 < kListLen374; kIndex374++) {
      var kData374 = kList374[kIndex374];
      output.append('<div class="scb_f_western_blot_select_lysate_type"  kind=\'', soy.$$escapeHtml(kData374), '\' cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '">', soy.$$escapeHtml(opt_data.kinds[kData374].name), '</div>');
    }
  } else {
    if (soy.$$getMapKeys(opt_data.kinds).length == 1) {
      var kList398 = soy.$$getMapKeys(opt_data.kinds);
      var kListLen398 = kList398.length;
      for (var kIndex398 = 0; kIndex398 < kListLen398; kIndex398++) {
        var kData398 = kList398[kIndex398];
        output.append('<span class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '" value=\'', soy.$$escapeHtml(kData398), '\'>', soy.$$escapeHtml(opt_data.kinds[kData398].name), '</span>');
      }
    } else {
      output.append('<select class="scb_f_western_blot_select_lysate_type" cell_treatment_id=\'', soy.$$escapeHtml(opt_data.cell_treatment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id="', soy.$$escapeHtml(opt_data.assignment.id), '" experiment_id="', soy.$$escapeHtml(opt_data.experiment.id), '" lane_kind="', soy.$$escapeHtml(opt_data.lane.kind), '" lane_id="', (opt_data.lane.kind == 'existing') ? soy.$$escapeHtml(opt_data.lane.lane.id) : '', '"', (opt_data.lane.is_sample_enabled) ? '' : 'disabled="disabled"', '>');
      if (opt_data.lane.kind == 'existing') {
        var kList442 = soy.$$getMapKeys(opt_data.kinds);
        var kListLen442 = kList442.length;
        for (var kIndex442 = 0; kIndex442 < kListLen442; kIndex442++) {
          var kData442 = kList442[kIndex442];
          output.append('<option value=\'', soy.$$escapeHtml(kData442), '\'', (opt_data.lane.lane.kind == kData442) ? 'selected="selected"' : '', '>', soy.$$escapeHtml(opt_data.kinds[kData442].name), '</option>');
        }
      } else {
        output.append((soy.$$getMapKeys(opt_data.kinds).length != 1) ? '<option selected="selected" disabled="disabled" value=\'\'>Pick Lysate Type</option>' : '');
        var kList457 = soy.$$getMapKeys(opt_data.kinds);
        var kListLen457 = kList457.length;
        for (var kIndex457 = 0; kIndex457 < kListLen457; kIndex457++) {
          var kData457 = kList457[kIndex457];
          output.append('<option value=\'', soy.$$escapeHtml(kData457), '\'>', soy.$$escapeHtml(opt_data.kinds[kData457].name), '</option>');
        }
      }
      output.append('</select>');
    }
  }
  return opt_sb ? '' : output.toString();
};


scb_western_blot.display_wb_progress = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_progress\'><div class=\'scb_s_western_blot_video_box_wrapper\'><div class=\'scb_s_western_blot_video_box_wrapper_title\'>IN THE LAB</div><div class=\'scb_s_western_blot_video_reminder\'><div class=\'scb_s_western_blot_video_box\'><img alt=\'In_The_Lab\' title=\'In_The_Lab\' class=\'scb_s_western_blot_video_box_img\' src=\'images/western_blot/in_the_lab_all.png\'><br/><div class=\'scb_s_western_blot_video_heading\'>Reminder:&nbsp;&nbsp;</div><div class=\'scb_s_western_blot_video_text\'>The gel only has 15 lanes and one&nbsp;</div><div class=\'scb_s_western_blot_video_text_second\'>lane must be reserved for the protein marker.&nbsp;</div><br/><a href=\'static/ref_lib/full_library.html#GelPreparation\' target=\'_blank\'  class=\'scb_s_western_blot_learn_more\'>Learn More</a></div></div></div><span class=\'scb_s_western_blot_progress_prefix_group2\'><div class=\'scb_s_western_blot_progress_rest\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_1 ', (opt_data.step >= 1) ? 'scb_s_western_blot_progress_selected' : '', '\'>1. Sample Prep</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_2 ', (opt_data.step >= 2) ? 'scb_s_western_blot_progress_selected' : '', '\'>2. Prepare Gel</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_3 ', (opt_data.step >= 3) ? 'scb_s_western_blot_progress_selected' : '', '\'>3. Load Gel</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_4 ', (opt_data.step >= 4) ? 'scb_s_western_blot_progress_selected' : '', '\'>4. Run</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_5 ', (opt_data.step >= 5) ? 'scb_s_western_blot_progress_selected' : '', '\'>5. Transfer</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_6 ', (opt_data.step >= 6) ? 'scb_s_western_blot_progress_selected' : '', '\'>6. Blot</div><img class=\'scb_s_western_blot_progress_vertical_line\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0001s_0001s_0000_Separator-line-1.png\'><div class=\'scb_s_western_blot_progress_item scb_s_western_blot_progress_7 ', (opt_data.step >= 7) ? 'scb_s_western_blot_progress_selected' : '', '\'>7. Develop</div></div></span></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot.well_images = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class=\'scb_wells\' style=\'display:none;\'><img src=\'images/western_blot/WesternBlot_BlueWells_01.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_02.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_03.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_04.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_05.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_06.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_07.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_08.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_09.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_10.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_11.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_12.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_13.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_14.png\'><img src=\'images/western_blot/WesternBlot_BlueWells_15.png\'><img src=\'images/western_blot/SCB_WesternBlotting_GelNumbers.png\'></span>');
  return opt_sb ? '' : output.toString();
};
