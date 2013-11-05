// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 4, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_details_view\' mode=\'', soy.$$escapeHtml(opt_data.kind), '\'><div class=\'scb_s_experiment_setup_top\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2}, output);
    output.append('<div class=\'scb_s_experiment_setup_choose_template\'><div class=\'scb_s_experiment_setup_create_new_set_up\'><input class=\'scb_s_experiment_setup_choose_template_kind scb_f_experiment_setup_new_set_up\' type="radio" name="setup_kind"/>Create new set-up<br></div><div class=\'scb_s_experiment_setup_choose_existing_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span></div><!-- <select class=\'scb_s_experiment_setup_choose_template_id\' disabled="disabled"><option>Experiment 1</option><option>Experiment 1</option></select>--><br></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div id=\'mySwipe\'class=\'scb_s_experiment_setup_video_box swipe\'><div  class=\'slides_container swipe-wrap\'><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Wild-type.jpg\'><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Multivulva.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\'  src=\'static/usability_test/Vulvaless.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><video controls=\'controls\' height=\'160\' width=\'233\' class=\'scb_s_experiment_setup_video_box_vid\'  src=\'static/videos/western_blot/WesternFinalCompressed.mov\' ></video></div></div></div><div class=\'slider_controls\' style=\'text-align:center;\'><button onclick=\'mySwipe.prev()\'>&#x25c0;</button><nav id = \'nav\'><ul class=\'slider_dots\'><li class=\'on\'></li><li ></li><li></li><li></li></ul></nav><button onclick=\'mySwipe.next()\'>&#x25b6;</button></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3}, output);
    output.append((opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\'><h1>NOTE!</h1><p>Below is a summary of your set-up for ' + soy.$$escapeHtml(opt_data.experiment.name) + '.<br>To create a new experiment, select <b>' + soy.$$escapeHtml(opt_data.assignment.name) + '</b> in the navigation tool bar above or click on<b>' + soy.$$escapeHtml(opt_data.experiment.name) + '</b> above the navigation tool bar and select <b>+ New Experiment</b> in the drop down menu.<br><br><br></p></div>' : '<div class=\'scb_s_warning_dialog\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run this experiment, you cannot go back and make changes to this experiment\'s set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-Up & Run</b> to run your experiment.<!-- Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment. --></p><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; EDIT SET-UP</a></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div id=\'mySwipe\'class=\'scb_s_experiment_setup_video_box swipe\'><div  class=\'slides_container swipe-wrap\'><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Wild-type.jpg\'><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Multivulva.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\'  src=\'static/usability_test/Vulvaless.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><video controls=\'controls\' height=\'160\' width=\'233\' class=\'scb_s_experiment_setup_video_box_vid\'  src=\'static/videos/western_blot/WesternFinalCompressed.mov\' ></video></a></div></div></div><div class=\'slider_controls\' style=\'text-align:center;\'><button onclick=\'mySwipe.prev()\'>&#x25c0;</button><nav id = \'nav\'><ul class=\'slider_dots\'><li class=\'on\'></li><li ></li><li></li><li></li></ul></nav><button onclick=\'mySwipe.next()\'>&#x25b6;</button></div></div>');
  }
  output.append('</div><div class="scb_s_experiment_setup_new_set_up"><div class="scb_s_experiment_setup_instructions"><img src=\'images/setup/setup_line.png\'/>', opt_data.t.experiment_setup, '</div><br><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList71 = opt_data.headings;
  var hListLen71 = hList71.length;
  for (var hIndex71 = 0; hIndex71 < hListLen71; hIndex71++) {
    var hData71 = hList71[hIndex71];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData71.kind), '\'>', (opt_data.kind == 'readonly') ? (hData71.kind != 'actions') ? soy.$$escapeHtml(hData71.title) : '' : soy.$$escapeHtml(hData71.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList85 = opt_data.rows;
  var rListLen85 = rList85.length;
  for (var rIndex85 = 0; rIndex85 < rListLen85; rIndex85++) {
    var rData85 = rList85[rIndex85];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData85.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData85.treatment.id), '\'>');
    var cList95 = rData85.columns;
    var cListLen95 = cList95.length;
    for (var cIndex95 = 0; cIndex95 < cListLen95; cIndex95++) {
      var cData95 = cList95[cIndex95];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData95.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData95.kind), '\' rowspan="', soy.$$escapeHtml(cData95.rows), '">', (cData95.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData85.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData85.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" src="images/setup/scb_remove.png"></button>' : '' : ((cData95.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData95.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList133 = opt_data.new_rows;
    var rListLen133 = rList133.length;
    for (var rIndex133 = 0; rIndex133 < rListLen133; rIndex133++) {
      var rData133 = rList133[rIndex133];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList139 = rData133.columns;
      var cListLen139 = cList139.length;
      for (var cIndex139 = 0; cIndex139 < cListLen139; cIndex139++) {
        var cData139 = cList139[cIndex139];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData139.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData139.kind), '\' rowspan="1">');
        if (cData139.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '');
        } else {
          output.append((cData139.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData139.kind == 'drug') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData133.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData139.kind == 'concentration') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData133.treatment.drug_list.list[0].drug_id, concentration_id: rData133.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData133.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData139.title));
          }
        }
        output.append('</td>');
      }
      output.append('</tr>');
    }
    output.append((opt_data.t.ui.experiment_setup.actions.length > 0) ? '<tr><td colspan="' + soy.$$escapeHtml(opt_data.headings.length + 1) + '"><div class=\'scb_s_experiment_design_green_line\'></div><button class=\'scb_f_experiment_setup_action_open_add_samples_dialog scb_s_gray_button\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>' + soy.$$escapeHtml(opt_data.t.ui.experiment_setup.actions[0].name) + '</button></td></tr>' : '');
  }
  output.append('</tbody></table></div>');
  if (opt_data.t.experiment_setup_actions) {
    scb_experiment_setup.display_add_sample_dialog(opt_data, output);
  }
  output.append((opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly scb_f_run_experiment" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : (opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList244 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen244 = cell_lineList244.length;
  for (var cell_lineIndex244 = 0; cell_lineIndex244 < cell_lineListLen244; cell_lineIndex244++) {
    var cell_lineData244 = cell_lineList244[cell_lineIndex244];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData244.id), '\'>', soy.$$escapeHtml(cell_lineData244.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList252 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen252 = treatList252.length;
  for (var treatIndex252 = 0; treatIndex252 < treatListLen252; treatIndex252++) {
    var treatData252 = treatList252[treatIndex252];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData252.id), '\'>', soy.$$escapeHtml(treatData252.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList260 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen260 = collectList260.length;
  for (var collectIndex260 = 0; collectIndex260 < collectListLen260; collectIndex260++) {
    var collectData260 = collectList260[collectIndex260];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData260.id), '\'>', soy.$$escapeHtml(collectData260.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList274 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen274 = tList274.length;
  for (var tIndex274 = 0; tIndex274 < tListLen274; tIndex274++) {
    var tData274 = tList274[tIndex274];
    output.append('<option value=\'', soy.$$escapeHtml(tData274), '\' ', (tData274 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData274].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList292 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen292 = tList292.length;
  for (var tIndex292 = 0; tIndex292 < tListLen292; tIndex292++) {
    var tData292 = tList292[tIndex292];
    output.append('<option value=\'', soy.$$escapeHtml(tData292), '\' ', (tData292 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData292].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList310 = opt_data.concentrations;
  var tListLen310 = tList310.length;
  for (var tIndex310 = 0; tIndex310 < tListLen310; tIndex310++) {
    var tData310 = tList310[tIndex310];
    output.append('<option value=\'', soy.$$escapeHtml(tData310), '\' ', (tData310 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData310].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList328 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen328 = tList328.length;
  for (var tIndex328 = 0; tIndex328 < tListLen328; tIndex328++) {
    var tData328 = tList328[tIndex328];
    output.append('<option value=\'', soy.$$escapeHtml(tData328), '\' ', (tData328 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData328].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
