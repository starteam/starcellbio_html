// This file was automatically generated from western_blot_gel.soy.
// Please don't edit this file by hand.

if (typeof scb_western_blot_gel == 'undefined') { var scb_western_blot_gel = {}; }


scb_western_blot_gel.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_view_gel\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 6, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment, technique_name: 'Western Blot', technique_view: 'western_blot', technique_param: 'western_blot_id', technique_id: opt_data.western_blot.id}, output);
  scb_western_blot_gel.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_container\' role=\'main\'><div class=\'scb_western_blot_details_view\' >');
  scb_common.experiment_step({step: 5, last_step: 6, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<div class=\'scb_s_western_blot_all_tabs\'><div class=\'scb_western_blot_details_view_inner\'>');
  scb_western_blot_gel.display_tabs(opt_data, output);
  output.append('</div></div></div><a class="scb_s_navigation_button scb_s_western_blot_open_select_technique scb_s_select_technique_at_western_blot scb_f_open_select_technique" href="#view=select_technique&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' role=\'button\'>&#9664; SELECT TECHNIQUE</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_tab_content\'>');
  scb_western_blot.display_tabs_selector(opt_data, output);
  if (opt_data.western_blot_gel.is_developed) {
    scb_western_blot.display_wb_progress({step: 7}, output);
  } else {
    scb_western_blot.display_wb_progress({step: 6}, output);
  }
  output.append('<div class=\'scb_s_western_blot_samples_area\'><button class=\'scb_f_info_icon scb_s_western_blot_gel_type_info\' role=\'button\' note=\'scb_f_wb_gel_type_followup\'> </button><div class=\'scb_f_wb_gel_type_followup scb_f_controls_note\'><!--<button class=\'scb_f_controls_close_button\' aria-label=\'Close\'>&#215;</button>-->Gel type refers to the percentage of acrylamide that is used to make the gel. Lower acrylamide concentrations are used to separate large proteins, while high acrylamide concentrations are used to separate small proteins. &nbsp;<a href="static/ref_lib/full_library.html#GelPreparation" target=\'_blank\' role=\'link\' class=\'scb_s_select_technique_learn_more \'>Learn more &gt;&gt;</a></div><div class=\'scb_s_western_blot_choose_gel_type\'>Gel Type:', (opt_data.western_blot.gel_type == '.10') ? '&nbsp;&nbsp;&nbsp;10%' : '', (opt_data.western_blot.gel_type == '.12') ? '&nbsp;&nbsp;&nbsp;12%' : '', (opt_data.western_blot.gel_type == '.15') ? '&nbsp;&nbsp;&nbsp;15%' : '', '</div><div class=\'scb_s_western_blot_samples_heading\'>Samples</div><div class=\'scb_s_western_blot_choose_samples_order\'><ol class=\'scb_s_western_blot_choose_samples_order_list scb_s_western_blot_static_list\'>');
  var rList84 = opt_data.rows;
  var rListLen84 = rList84.length;
  for (var rIndex84 = 0; rIndex84 < rListLen84; rIndex84++) {
    var rData84 = rList84[rIndex84];
    output.append((rData84.kind == 'existing' && opt_data.western_blot.marker_loaded == true && rData84.lane.id == 'marker') ? '<li class="scb_s_western_blot_marker scb_s_western_blot_choose_samples_list" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' id=\'' + soy.$$escapeHtml(rData84.lane.id) + '\'>Marker</li>' : '', (rData84.is_valid) ? '<li class="scb_s_western_blot_choose_samples_list" title=\'' + soy.$$escapeHtml(rData84.display_text) + ' - ' + soy.$$escapeHtml(rData84.lane.kinds[rData84.lane.kind].name) + '\' id=' + soy.$$escapeHtml(rData84.lane.id) + '>' + soy.$$escapeHtml(rData84.display_text) + ' - ' + soy.$$escapeHtml(rData84.lane.kinds[rData84.lane.kind].name) + '</li>' : '');
  }
  output.append('</ol></div>', (opt_data.western_blot.marker_loaded == false) ? '<div class=\'scb_s_western_blot_marker scb_s_western_blot_marker_not\'>No marker loaded.</div>' : '', '</div><div class=\'scb_s_western_blot_samples_gel_area\'><div class=\'scb_s_western_blot_gel_tabs\'>');
  if (opt_data.western_blot.gel_list.length < 5) {
    var gelList117 = opt_data.western_blot.gel_list.list;
    var gelListLen117 = gelList117.length;
    for (var gelIndex117 = 0; gelIndex117 < gelListLen117; gelIndex117++) {
      var gelData117 = gelList117[gelIndex117];
      output.append((opt_data.western_blot_gel.id == gelData117.id) ? '<span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_western_blot_gel_tab_selected\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData117.id) + '\' ' + ((gelData117.is_developed) ? ' ="true"' : '') + '>' + soy.$$escapeHtml(gelData117.name) + '</div>' + ((gelData117.is_developed) ? '<button class=\'scb_f_western_blot_gel_remove\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData117.id) + '\' aria-label=\'Close Tab\' role=\'button\'>| &#215;</button>' : '') + '</span>' : '<div class=\'scb_s_western_blot_gel_tab\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData117.id) + '\'><a href=\'#view=western_blot_gel&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(opt_data.western_blot.id) + '&western_blot_gel_id=' + soy.$$escapeHtml(gelData117.id) + '\'>' + soy.$$escapeHtml(gelData117.name) + '</a></div>');
    }
  } else {
    output.append('<button class=\'scb_s_western_blot_gel_left_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'button\'  aria-label=\'Previous Tab\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'></button>');
    var gelList176 = opt_data.western_blot.gel_list.list;
    var gelListLen176 = gelList176.length;
    for (var gelIndex176 = 0; gelIndex176 < gelListLen176; gelIndex176++) {
      var gelData176 = gelList176[gelIndex176];
      output.append((gelIndex176 >= opt_data.western_blot.gel_list.start_tabs_index && gelIndex176 < opt_data.western_blot.gel_list.start_tabs_index + 4) ? (opt_data.western_blot_gel.id == gelData176.id) ? '<span class=\'scb_s_western_blot_gel_active scb_s_western_blot_gel_tab\'><div class=\'scb_s_western_blot_gel_tab_selected\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData176.id) + '\' ' + ((gelData176.is_developed) ? ' ="true"' : '') + '>' + soy.$$escapeHtml(gelData176.name) + '</div>' + ((gelData176.is_developed) ? '<button class=\'scb_f_western_blot_gel_remove\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData176.id) + '\' aria-label=\'Close Tab\' role=\'button\'>| &#215;</button>' : '') + '</span>' : '<div class=\'scb_s_western_blot_gel_tab\' western_blot_id=\'' + soy.$$escapeHtml(opt_data.western_blot.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' western_blot_gel_id=\'' + soy.$$escapeHtml(gelData176.id) + '\'><a href=\'#view=western_blot_gel&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&western_blot_id=' + soy.$$escapeHtml(opt_data.western_blot.id) + '&western_blot_gel_id=' + soy.$$escapeHtml(gelData176.id) + '\'>' + soy.$$escapeHtml(gelData176.name) + '</a></div>' : '');
    }
    output.append('<button class=\'scb_s_western_blot_gel_right_western_blot\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' role=\'button\'  aria-label=\'Next Tab\'></button>');
  }
  output.append('</div>');
  scb_western_blot_gel.display_gel(opt_data, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.display_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_western_blot_gel_content\'><div class=\'scb_s_western_blot_gel\' is_developed=\'', soy.$$escapeHtml(opt_data.western_blot_gel.is_developed), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  if (opt_data.western_blot_gel.is_developed) {
    scb_western_blot.display_western_blot_numbers(null, output);
    output.append('<div class=\'scb_s_western_blot_gel_canvas_wrapper\'><canvas id="', soy.$$escapeHtml(opt_data.western_blot_gel.id), '" class=\'scb_s_western_blot_gel_canvas\' style="width:346px;height:247px" width=\'375\' height=\'247\' role=\'presentation\'></canvas><div class=\'scb_f_slider\'        role=\'presentation\'></div><div class=\'scb_f_slider_value\'  aria-label=\'Horizontal Slider Label\'></div><div class=\'scb_f_vslider\'       role=\'presentation\'></div><div class=\'scb_f_vslider_value\'  aria-label=\'Vertical Slider Label\'></div></div><button class=\'scb_f_western_blot_tools_toggle scb_s_western_blot_tools_measure_followup_toggle\'  note=\'scb_s_western_blot_tools_measure_followup\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' role=\'button\'></button><div class=\'scb_s_western_blot_tools_measure_followup ', (opt_data.western_blot.measure_show_state) ? '' : 'scb_s_hidden_note', '\' ><button class=\'scb_f_western_blot_note_close_button\' aria-label=\'Close\' note=\'scb_s_western_blot_tools_measure_followup\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' role=\'button\'><span role=\'presentation\'>&#215;</span></button>To measure the size of the proteins within a band on a western blot, hover your cursor over the band of interest on the blot. Vertical and horizontal red lines will appear and the size of the protein will be displayed in the red box to the right of the blot.</div>');
  } else {
    output.append('<img class=\'scb_s_western_blot_gel_membrane\' src=\'images/western_blot/SCB_WesternBlotting_Membrane.png\' role=\'presentation\'>');
    var rList283 = opt_data.rows;
    var rListLen283 = rList283.length;
    for (var rIndex283 = 0; rIndex283 < rListLen283; rIndex283++) {
      var rData283 = rList283[rIndex283];
      output.append((rData283.is_marker && opt_data.western_blot.marker_loaded) ? '<img role=\'presentation\' style=\'position:relative;top: -247px;left: ' + ((opt_data.western_blot.rows_state_count == 1) ? '44px' : soy.$$escapeHtml(20 + 22 * rIndex283) + 'px') + '\' class=\'scb_s_western_blot_gel_membrane\' src="' + ((opt_data.western_blot.gel_type == '.10') ? 'images/western_blot/SCB_WB_Markers_Lane_10.png' : (opt_data.western_blot.gel_type == '.12') ? ' images/western_blot/SCB_WB_Markers_Lane_12.png' : (opt_data.western_blot.gel_type == '.15') ? 'images/western_blot/SCB_WB_Markers_Lane_15.png' : '') + '">' : '');
    }
  }
  output.append('</div><div class=\'scb_s_western_blot_tools\'>');
  if (opt_data.western_blot_gel.is_developed) {
    output.append('<button class=\'scb_f_info_icon scb_s_western_blot_exposure_info\' note=\'scb_f_wb_exposure_followup\' role=\'button\'> </button><div class=\'scb_f_wb_exposure_followup scb_f_controls_note\'>The exposure slider represents the length of time a piece of film is exposed on a blot to detect a protein of interest. To increase the exposure time, move the slider to the right. To decrease the exposure time, move the slider to the left. &nbsp;<a href="static/ref_lib/full_library.html#Develop" target=\'_blank\' class=\'scb_s_select_technique_learn_more \' role=\'link\'>Learn more &gt;&gt;</a></div>');
    scb_western_blot_gel.developed_gel(opt_data, output);
  } else {
    output.append('<button class=\'scb_f_info_icon scb_s_western_blot_primary_info\' note=\'scb_f_wb_primary_followup\' role=\'button\'> </button><div class=\'scb_f_wb_primary_followup scb_f_controls_note\'>A primary antibody is a Y-shaped protein that is designed to bind specifically to the protein of interest. A primary antibody called "rabbit protein-X" was raised in a rabbit to specifically detect protein X. &nbsp;<a href="static/ref_lib/full_library.html#Blot" target=\'_blank\' class=\'scb_s_select_technique_learn_more \' role=\'link\'>Learn more &gt;&gt;</a></div><button class=\'scb_f_info_icon scb_s_western_blot_secondary_info\' note=\'scb_f_wb_secondary_followup\' role=\'button\'> </button><div class=\'scb_f_wb_secondary_followup scb_f_controls_note\'>A secondary antibody is a Y-shaped protein that is designed to bind specifically to the primary antibody. A secondary antibody called "goat anti-rabbit" was raised in a goat to detect a rabbit\'s primary antibody. When selecting a secondary antibody, ensure that the secondary antibody recognizes the species in which a primary antibody was raised. &nbsp;<a href="static/ref_lib/full_library.html#Blot" target=\'_blank\' class=\'scb_s_select_technique_learn_more \' role=\'link\'>Learn more &gt;&gt;</a></div>');
    scb_western_blot_gel.undeveloped_gel(opt_data, output);
  }
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.undeveloped_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 role=\'heading\'>Choose Blotting <br/> Conditions</h1><div class=\'scb_s_wb_primary_antibody\'>Primary antibody:<label class="custom-select_gel" role=\'presentation\'><select class=\'scb_f_wb_anti_body_select_primary\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'list\'  aria-label=\'Primary Antibody\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  var pabList331 = opt_data.t.primary_anti_body.order;
  var pabListLen331 = pabList331.length;
  for (var pabIndex331 = 0; pabIndex331 < pabListLen331; pabIndex331++) {
    var pabData331 = pabList331[pabIndex331];
    output.append('<option  role=\'listitem\' aria-label=\'', soy.$$escapeHtml(opt_data.t.primary_anti_body[pabData331].name), '\' class=\'scb_f_wb_anti_body_select_primary_option\' model_id=\'', soy.$$escapeHtml(pabData331), '\'', (opt_data.western_blot_gel.primary_anti_body == pabData331) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.t.primary_anti_body[pabData331].name), '</option>');
  }
  output.append('<option value="Please select..." model_id=\'\' role=\'listitem\' aria-label=\'Please select...\'', (opt_data.western_blot_gel.primary_anti_body) ? '' : 'selected="selected"', ' disabled="disabled">Please select...</option></select></label></div><div class=\'scb_s_wb_secondary_antibody\'>Secondary antibody:<label class="custom-select_gel" role=\'presentation\'><select class=\'scb_f_wb_anti_body_select_secondary\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  role=\'list\'  aria-label=\'Secondary Antibody\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>');
  var pabList358 = soy.$$getMapKeys(opt_data.t.secondary_anti_body);
  var pabListLen358 = pabList358.length;
  for (var pabIndex358 = 0; pabIndex358 < pabListLen358; pabIndex358++) {
    var pabData358 = pabList358[pabIndex358];
    output.append('<option class=\'scb_f_wb_anti_body_select_secondary_option\' model_id=\'', soy.$$escapeHtml(pabData358), '\' role=\'listitem\' aria-label=\'', soy.$$escapeHtml(opt_data.t.secondary_anti_body[pabData358].name), '\'', (opt_data.western_blot_gel.secondary_anti_body == pabData358) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.t.secondary_anti_body[pabData358].name), '</option>');
  }
  output.append('<option value="Please select..." model_id=\'\' role=\'listitem\' aria-label=\'Please select...\'', (opt_data.western_blot_gel.secondary_anti_body) ? '' : 'selected="selected"', ' disabled="disabled">Please select...</option></select></label></div><a class=\'scb_s_western_blot_blot_and_develop scb_s_navigation_button\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' role=\'button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'>BLOT & DEVELOP</a>');
  return opt_sb ? '' : output.toString();
};


scb_western_blot_gel.developed_gel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h1 role=\'heading\' >Blotting Conditions</h1><div class=\'scb_s_wb_primary_antibody\'>Primary antibody:<div>', soy.$$escapeHtml(opt_data.t.primary_anti_body[opt_data.western_blot_gel.primary_anti_body].name), '</div></div><div class=\'scb_s_wb_secondary_antibody\'>Secondary antibody:<div>', soy.$$escapeHtml(opt_data.t.secondary_anti_body[opt_data.western_blot_gel.secondary_anti_body].name), '</div></div><h1 class=\'scb_s_wb_analysis_tools_title\' role=\'heading\'>Analysis Tools</h1><div class=\'scb_s_wb_exposure_time\'>Exposure time:<div class=\'scb_s_wb_exposure_time_value\'></div><div class="scb_f_wb_exposure_slider" western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\'></div></div><a class=\'scb_s_western_blot_reprobe scb_s_navigation_button\' western_blot_id=\'', soy.$$escapeHtml(opt_data.western_blot.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_gel_id=\'', soy.$$escapeHtml(opt_data.western_blot_gel.id), '\' role=\'button\'>RE-PROBE</a>');
  return opt_sb ? '' : output.toString();
};
