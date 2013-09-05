// This file was automatically generated from western_blot_gel.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot_gel == 'undefined') { var scb_western_blot_gel = {}; }


scb_western_blot_gel.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view_gel\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'Western Blot', technique_view: 'western_blot', technique_param: 'western_blot_id', technique_id: opt_data.western_blot.id}, output);
  scb_western_blot_gel.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_western_blot_details_view\'><div class=\'scb_western_blot_details_view_inner\'>');
  scb_western_blot_gel.display_tabs(opt_data, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  scb_western_blot.display_tabs_selector(opt_data, output);
  output.append('<div class=\'scb_s_western_blot_tab_content\'>');
  if (opt_data.western_blot_gel.is_developed) {
    scb_western_blot.display_wb_progress({step: 7}, output);
  } else {
    scb_western_blot.display_wb_progress({step: 6}, output);
  }
  output.append('<div class=\'scb_s_western_blot_samples_area\'><div class=\'scb_s_western_blot_choose_gel_type\'>Gel Type:', (opt_data.western_blot.gel_type == '.10') ? '10%' : '', (opt_data.western_blot.gel_type == '.12') ? '12%' : '', (opt_data.western_blot.gel_type == '.15') ? '15%' : '', '</div><div class=\'scb_s_western_blot_samples_heading\'>Samples</div><div class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list\'>');
  var rList66 = opt_data.rows;
  var rListLen66 = rList66.length;
  for (var rIndex66 = 0; rIndex66 < rListLen66; rIndex66++) {
    var rData66 = rList66[rIndex66];
    output.append((rData66.is_valid) ? '<li class="scb_s_western_blot_choose_samples_list" id=' + soy.$$escapeHtml(rData66.lane.id) + '>' + soy.$$escapeHtml(rData66.display_text) + ' -' + soy.$$escapeHtml(rData66.lane.kinds[rData66.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol>');
  var start__soy78 = opt_data.rows.length + 1;
  output.append('<ol class=\'scb_s_western_blot_choose_samples_marker\' start=', soy.$$escapeHtml(start__soy78), '>', (opt_data.western_blot.marker_loaded == true) ? '<li class="scb_s_western_blot_marker">Marker</li>' : '', '</ol></div>', (opt_data.western_blot.marker_loaded == false) ? '<div class=\'scb_s_western_blot_marker scb_s_western_blot_marker_not\'>No marker loaded.</div>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\'><div class=\'scb_s_western_blot_gel_tabs\'>');
  if (opt_data.western_blot.gel_list.length < 5) {
    var gelList92 = opt_data.western_blot.gel_list.list;
    var gelListLen92 = gelList92.length;
    for (var gelIndex92 = 0; gelIndex92 < gelListLen92; gelIndex92++) {
      var gelData92 = gelList92[gelIndex92];
      output.append((opt_data.western_blot_gel.id == gelData92.id) ? '<span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_western_blot_gel_tab_selected\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData92.id) + '\' ' + ((gelData92.is_developed) ? 'contenteditable="true"' : '') + '>' + soy.$$escapeHtml(gelData92.name) + '</div>' + ((gelData92.is_developed) ? '<button class=\'scb_f_western_blot_gel_remove\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData92.id) + '\'><img src=\'images/setup/scb_remove.png\'></button>' : '') + '</span>' : '<div class=\'scb_s_western_blot_gel_tab\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData92.id) + '\'><a href=\'#view=western_blot_gel&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(opt_data.western_blot.id) + '&western_blot_gel_id=' + soy.$$escapeHtml(gelData92.id) + '\'>' + soy.$$escapeHtml(gelData92.name) + '</a></div>');
    }
  } else {
    output.append('<select class=\'scb_s_western_blot_tab_select_many\'>');
    var gelList145 = opt_data.western_blot.gel_list.list;
    var gelListLen145 = gelList145.length;
    for (var gelIndex145 = 0; gelIndex145 < gelListLen145; gelIndex145++) {
      var gelData145 = gelList145[gelIndex145];
      output.append('<option western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(gelData145.id), '\'', (opt_data.western_blot_gel.id == gelData145.id) ? 'selected=\'selected\'' : '', 'href=\'#view=western_blot_gel&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&western_blot_id=', soy.$$escapeHtml(opt_data.western_blot.id), '&western_blot_gel_id=', soy.$$escapeHtml(gelData145.id), '\'>', soy.$$escapeHtml(gelData145.name), '</option>');
    }
    output.append('</select>');
  }
  output.append('</div>');
  scb_western_blot_gel.display_gel(opt_data, output);
  output.append('</div><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>&#9664; SELECT TECHNIQUE</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.display_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_gel_content\'><div class=\'scb_s_western_blot_gel\' is_developed=\'', soy.$$escapeHtml(opt_data.western_blot_gel.is_developed), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  if (opt_data.western_blot_gel.is_developed) {
    scb_western_blot.display_western_blot_numbers(null, output);
    output.append('<div class=\'scb_s_western_blot_gel_canvas_wrapper\'><canvas id="', soy.$$escapeHtml(opt_data.western_blot_gel.id), '" class=\'scb_s_western_blot_gel_canvas\' style="width:363px;height:288px" width=\'363\' height=\'288\'></canvas><div class=\'scb_f_slider\'></div><div class=\'scb_f_slider_value\'></div></div>');
  } else {
    scb_western_blot.display_western_blot_numbers(null, output);
    output.append('<img class=\'scb_s_western_blot_gel_membrane\' src=\'images/western_blot/SCB_WesternBlotting_F_copy_0001s_0003s_0000s_0001s_0002_Membrane-BG.png\'>', (opt_data.western_blot.marker_loaded) ? '<img style=\'position:relative;top: -220px;left: ' + soy.$$escapeHtml(20 + 22 * opt_data.valid_rows) + 'px\' class=\'scb_s_western_blot_gel_membrane\' src=\'images/western_blot/SCB_WB_Markers_Lane.png\'>' : '');
  }
  output.append('</div><div class=\'scb_s_western_blot_tools\'>');
  if (opt_data.western_blot_gel.is_developed) {
    scb_western_blot_gel.developed_gel(opt_data, output);
  } else {
    scb_western_blot_gel.undeveloped_gel(opt_data, output);
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.undeveloped_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>Choose Blotting Conditions</h1><div class=\'scb_s_wb_primary_antibody\'>Primary antibody:<select class=\'scb_f_wb_anti_body_select_primary\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  var pabList241 = soy.$$getMapKeys(opt_data.t.primary_anti_body);
  var pabListLen241 = pabList241.length;
  for (var pabIndex241 = 0; pabIndex241 < pabListLen241; pabIndex241++) {
    var pabData241 = pabList241[pabIndex241];
    output.append('<option class=\'scb_f_wb_anti_body_select_primary_option\' model_id=\'', soy.$$escapeHtml(pabData241), '\'', (opt_data.western_blot_gel.primary_anti_body == pabData241) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.t.primary_anti_body[pabData241].name), '</option>');
  }
  output.append('<option value="Please select..." model_id=\'\'', (opt_data.western_blot_gel.primary_anti_body) ? '' : 'selected="selected"', ' disabled="disabled">Please select...</option></select></div><div class=\'scb_s_wb_secondary_antibody\'>Secondary antibody:<select class=\'scb_f_wb_anti_body_select_secondary\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  var pabList266 = soy.$$getMapKeys(opt_data.t.secondary_anti_body);
  var pabListLen266 = pabList266.length;
  for (var pabIndex266 = 0; pabIndex266 < pabListLen266; pabIndex266++) {
    var pabData266 = pabList266[pabIndex266];
    output.append('<option class=\'scb_f_wb_anti_body_select_secondary_option\' model_id=\'', soy.$$escapeHtml(pabData266), '\'', (opt_data.western_blot_gel.secondary_anti_body == pabData266) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.t.secondary_anti_body[pabData266].name), '</option>');
  }
  output.append('<option value="Please select..." model_id=\'\'', (opt_data.western_blot_gel.secondary_anti_body) ? '' : 'selected="selected"', ' disabled="disabled">Please select...</option></select></div><a class=\'scb_s_western_blot_blot_and_develop scb_s_navigation_button\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>BLOT & DEVELOP</a>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.developed_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1>Blotting Conditions</h1><div class=\'scb_s_wb_primary_antibody\'>Primary antibody:<div>', soy.$$escapeHtml(opt_data.t.primary_anti_body[opt_data.western_blot_gel.primary_anti_body].name), '</div></div><div class=\'scb_s_wb_secondary_antibody\'>Secondary antibody:<div>', soy.$$escapeHtml(opt_data.t.secondary_anti_body[opt_data.western_blot_gel.secondary_anti_body].name), '</div></div><div class=\'scb_s_wb_exposure_time\'>Exposure time:<div class=\'scb_s_wb_exposure_time_value\'></div><div class="scb_f_wb_exposure_slider" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'></div></div><a class=\'scb_s_western_blot_reprobe scb_s_navigation_button\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>RE-PROBE</a>');
  return opt_sb ? '' : output.toString();
};
