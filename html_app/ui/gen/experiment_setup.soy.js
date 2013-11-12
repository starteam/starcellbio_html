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
  output.append('<div class=\'scb_s_experiment_setup_container\'><div class=\'scb_s_experiment_setup_details_view\' mode=\'', soy.$$escapeHtml(opt_data.kind), '\'>');
  if (opt_data.kind == 'readwrite') {
    scb_common.experiment_step({step: 2, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
    output.append('<div class=\'scb_s_experiment_setup_top\'><div class=\'scb_s_experiment_setup_choose_template\'><div class=\'scb_s_experiment_setup_create_new_set_up\'><input class=\'scb_s_experiment_setup_choose_template_kind scb_f_experiment_setup_new_set_up\' type="radio" name="setup_kind"/>Create new set-up<br></div><div class=\'scb_s_experiment_setup_choose_existing_template\'><input class=\'scb_s_experiment_setup_choose_template_kind\' type="radio" name="setup_kind" disabled="disabled" /><span class=\'scb_s_experiment_setup_choose_template_kind_disabled\'>Select pre-existing set-up as a template</span></div><!-- <select class=\'scb_s_experiment_setup_choose_template_id\' disabled="disabled"><option>Experiment 1</option><option>Experiment 1</option></select>--><br></div><div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div id=\'mySwipe\'class=\'scb_s_experiment_setup_video_box swipe\'><div  class=\'slides_container swipe-wrap\'><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Wild-type.jpg\'><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Multivulva.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\'  src=\'static/usability_test/Vulvaless.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><video controls=\'controls\' height=\'160\' width=\'233\' class=\'scb_s_experiment_setup_video_box_vid\'  src=\'static/videos/western_blot/WesternFinalCompressed.mov\' ></video></div></div></div><div class=\'slider_controls\' style=\'text-align:center;\'><button onclick=\'mySwipe.prev()\'>&#x25c0;</button><nav id = \'nav\'><ul class=\'slider_dots\'><li class=\'on\'></li><li ></li><li></li><li></li></ul></nav><button onclick=\'mySwipe.next()\'>&#x25b6;</button></div><div class=\'scb_s_experiment_setup_video_text\'></div></div>');
  } else {
    scb_common.experiment_step({step: 3, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
    output.append('<div class=\'scb_s_experiment_setup_top\'>', (opt_data.experiment.setup_finished) ? '<div class=\'scb_s_warning\'><h1>NOTE!</h1><p>Below is a summary of your set-up for ' + soy.$$escapeHtml(opt_data.experiment.name) + '.<br>To create a new experiment, select <b>' + soy.$$escapeHtml(opt_data.assignment.name) + '</b> in the navigation tool bar above or click on<b>' + soy.$$escapeHtml(opt_data.experiment.name) + '</b> above the navigation tool bar and select <b>+ New Experiment</b> in the drop down menu.<br><br><br></p></div>' : '<div class=\'scb_s_warning_dialog\'><h1>CONFIRM SET-UP</h1><p>Below is your set-up for \'' + soy.$$escapeHtml(opt_data.experiment.name) + '\'.<br>Once you run this experiment, you cannot go back and make changes to this experiment\'s set-up. Review the summary of your experimental set-up and then either go back to edit your set-up or click on <b>Confirm Set-Up & Run</b> to run your experiment.<!-- Please carefully review the summary of your experimental setup and then either go back to edit your set-up or click on Confirm Setup &amp; Select Technique to run your experiment. --></p><a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_setup" href="#view=experiment_setup&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; EDIT SET-UP</a></div>', '<div class=\'scb_s_experiment_setup_video_box_wrapper\'><div class=\'scb_s_experiment_setup_video_box_wrapper_title\'>IN THE LAB</div><div id=\'mySwipe\'class=\'scb_s_experiment_setup_video_box swipe\'><div  class=\'slides_container swipe-wrap\'><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Wild-type.jpg\'><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\' src=\'static/usability_test/Multivulva.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><img class=\'scb_s_experiment_setup_video_box_img\'  src=\'static/usability_test/Vulvaless.jpg\' ><span>Vulva phenotypes in <i>C. elegans</i></span></a></div><div><a target="_blank"><video controls=\'controls\' height=\'160\' width=\'233\' class=\'scb_s_experiment_setup_video_box_vid\'  src=\'static/videos/western_blot/WesternFinalCompressed.mov\' ></video></a></div></div></div><div class=\'slider_controls\' style=\'text-align:center;\'><button onclick=\'mySwipe.prev()\'>&#x25c0;</button><nav id = \'nav\'><ul class=\'slider_dots\'><li class=\'on\'></li><li ></li><li></li><li></li></ul></nav><button onclick=\'mySwipe.next()\'>&#x25b6;</button></div></div>');
  }
  output.append('</div><div class="scb_s_experiment_setup_new_set_up"><div class="scb_s_experiment_setup_instructions"><img src=\'images/setup/setup_line.png\'/>', opt_data.t.experiment_setup, '</div><br><table class="scb_s_experiment_setup_table ', (opt_data.kind == 'readwrite') ? 'scb_s_experiment_setup_table_editable' : 'scb_s_experiment_setup_table_readonly', '"><thead class=\'scb_s_experiment_setup_table_head\'>');
  var hList76 = opt_data.headings;
  var hListLen76 = hList76.length;
  for (var hIndex76 = 0; hIndex76 < hListLen76; hIndex76++) {
    var hData76 = hList76[hIndex76];
    output.append('<td class=\'scb_s_experiment_setup_table_heading\' kind=\'', soy.$$escapeHtml(hData76.kind), '\'>', (opt_data.kind == 'readonly') ? (hData76.kind != 'actions') ? soy.$$escapeHtml(hData76.title) : '' : soy.$$escapeHtml(hData76.title), '</td>');
  }
  output.append('</thead><tbody class=\'scb_s_experiment_setup_table_body\'>');
  var rList90 = opt_data.rows;
  var rListLen90 = rList90.length;
  for (var rIndex90 = 0; rIndex90 < rListLen90; rIndex90++) {
    var rData90 = rList90[rIndex90];
    output.append('<tr class=\'scb_s_experiment_setup_table_row\' cell_treatment_id=\'', soy.$$escapeHtml(rData90.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' treatment_id=\'', soy.$$escapeHtml(rData90.treatment.id), '\'>');
    var cList100 = rData90.columns;
    var cListLen100 = cList100.length;
    for (var cIndex100 = 0; cIndex100 < cListLen100; cIndex100++) {
      var cData100 = cList100[cIndex100];
      output.append('<td class=\'scb_s_experiment_setup_table_element ', (cData100.first_row) ? 'scb_s_experiment_setup_table_border' : '', '\' kind=\'', soy.$$escapeHtml(cData100.kind), '\' rowspan="', soy.$$escapeHtml(cData100.rows), '">', (cData100.kind == 'actions') ? (opt_data.kind == 'readwrite') ? '<button class=\'scb_f_experiment_setup_duplicate_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData90.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Copy" title="Copy" src="images/setup/scb_copy.png"></button><button class=\'scb_f_experiment_setup_remove_sample\' cell_treatment_id=\'' + soy.$$escapeHtml(rData90.id) + '\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'><img alt="Delete" title="Delete" src="images/setup/scb_remove.png"></button>' : '' : ((cData100.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '') + soy.$$escapeHtml(cData100.title), '</td>');
    }
    output.append('</tr>');
  }
  if (opt_data.kind == 'readwrite') {
    var rList138 = opt_data.new_rows;
    var rListLen138 = rList138.length;
    for (var rIndex138 = 0; rIndex138 < rListLen138; rIndex138++) {
      var rData138 = rList138[rIndex138];
      output.append('<tr class=\'scb_s_experiment_setup_new_row scb_s_experiment_setup_new_row_gray\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>');
      var cList144 = rData138.columns;
      var cListLen144 = cList144.length;
      for (var cIndex144 = 0; cIndex144 < cListLen144; cIndex144++) {
        var cData144 = cList144[cIndex144];
        output.append('<td style=\'z-index:99\' class=\'scb_s_experiment_setup_table_element ', (cData144.first_row) ? 'scb_s_experiment_setup_table_border' : '', ' scb_s_experiment_setup_td\' kind=\'', soy.$$escapeHtml(cData144.kind), '\' rowspan="1">');
        if (cData144.kind == 'actions') {
          output.append((opt_data.kind == 'readwrite') ? ' <!--<button class=\'scb_f_experiment_setup_save_sample\' cell_treatment_id=\'\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' disabled="disabled">S</button> -->' : '');
        } else {
          output.append((cData144.kind == 'cell_plate') ? '<img src="images/setup/scb_cell_plate.png">' : '');
          if (cData144.kind == 'drug') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.drug_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData138.treatment.drug_list.list[0].drug_id, disabled: true}, output);
            output.append('</span>');
          } else if (cData144.kind == 'concentration') {
            output.append('<span><span class=\'scb_concentration_edit_new\'>&nbsp;</span>');
            scb_experiment_setup.concentration_edit({template: opt_data.t, assignment: opt_data.assignment, experiment: opt_data.experiment, drug_id: rData138.treatment.drug_list.list[0].drug_id, concentration_id: rData138.treatment.drug_list.list[0].concentration_id, concentrations: opt_data.t.drugs[rData138.treatment.drug_list.list[0].drug_id].concentrations, disabled: true}, output);
            output.append('</span>');
          } else {
            output.append(soy.$$escapeHtml(cData144.title));
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
  output.append('</div>', (opt_data.kind == 'readwrite') ? '<a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly scb_f_run_experiment" href="#view=experiment_run&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>RUN EXPERIMENT &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : (opt_data.experiment.setup_finished) ? '<a class="scb_s_navigation_button scb_f_open_select_technique" href="#view=select_technique&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\'>SELECT TECHNIQUE &nbsp; &#9654;</a><br/><a class="scb_s_navigation_button scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=' + soy.$$escapeHtml(opt_data.experiment.id) + '&assignment_id=' + soy.$$escapeHtml(opt_data.assignment.id) + '">&#9664; &nbsp; DESIGN EXPERIMENT</a>' : '', '</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_add_sample_dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table_add_samples_dialog\' title=\'Add sample\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><div class=\'scb_s_experiment_setup_dialog_cell_lines\'>Choose Your Cell Line:<select class=\'scb_s_experiment_setup_dialog_cell_lines_select\' multiple=\'multiple\'>');
  var cell_lineList250 = opt_data.t.experiment_setup_actions.cell_lines;
  var cell_lineListLen250 = cell_lineList250.length;
  for (var cell_lineIndex250 = 0; cell_lineIndex250 < cell_lineListLen250; cell_lineIndex250++) {
    var cell_lineData250 = cell_lineList250[cell_lineIndex250];
    output.append('<option class=\'scb_s_experiment_setup_dialog_cell_lines_select_option\' value=\'', soy.$$escapeHtml(cell_lineData250.id), '\'>', soy.$$escapeHtml(cell_lineData250.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_treatments\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_treatments_select\' multiple=\'multiple\'>');
  var treatList258 = opt_data.t.experiment_setup_actions.treatment_protocol_list;
  var treatListLen258 = treatList258.length;
  for (var treatIndex258 = 0; treatIndex258 < treatListLen258; treatIndex258++) {
    var treatData258 = treatList258[treatIndex258];
    output.append('<option class=\'scb_s_experiment_setup_dialog_treatments_select_option\' value=\'', soy.$$escapeHtml(treatData258.id), '\'>', soy.$$escapeHtml(treatData258.title), '</option>');
  }
  output.append('</select></div><div class=\'scb_s_experiment_setup_dialog_collection\'>Choose Your Treatment Line<br><select class=\'scb_s_experiment_setup_dialog_collection_select\' multiple=\'multiple\'>');
  var collectList266 = opt_data.t.experiment_setup_actions.collection_schedule_list;
  var collectListLen266 = collectList266.length;
  for (var collectIndex266 = 0; collectIndex266 < collectListLen266; collectIndex266++) {
    var collectData266 = collectList266[collectIndex266];
    output.append('<option class=\'scb_s_experiment_setup_dialog_collection_select_option\' value=\'', soy.$$escapeHtml(collectData266.id), '\'>', soy.$$escapeHtml(collectData266.title), '</option>');
  }
  output.append('</select></div><button class=\'scb_f_experiment_setup_dialog_apply\'>Add</button><button class=\'scb_f_experiment_setup_dialog_cancel\'>Cancel</button></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.cell_lines_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'cell_line\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_cell_line_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList280 = soy.$$getMapKeys(opt_data.template.cell_lines);
  var tListLen280 = tList280.length;
  for (var tIndex280 = 0; tIndex280 < tListLen280; tIndex280++) {
    var tData280 = tList280[tIndex280];
    output.append('<option value=\'', soy.$$escapeHtml(tData280), '\' ', (tData280 == opt_data.cell_line_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.cell_lines[tData280].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.drug_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'drug\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_drug_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList298 = soy.$$getMapKeys(opt_data.template.drugs);
  var tListLen298 = tList298.length;
  for (var tIndex298 = 0; tIndex298 < tListLen298; tIndex298++) {
    var tData298 = tList298[tIndex298];
    output.append('<option value=\'', soy.$$escapeHtml(tData298), '\' ', (tData298 == opt_data.drug_id) ? 'selected=\'selected\'' : '', '>', soy.$$escapeHtml(opt_data.template.drugs[tData298].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.concentration_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'concentration\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_concentration_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\'>Please select</option>');
  var tList316 = opt_data.concentrations;
  var tListLen316 = tList316.length;
  for (var tIndex316 = 0; tIndex316 < tListLen316; tIndex316++) {
    var tData316 = tList316[tIndex316];
    output.append('<option value=\'', soy.$$escapeHtml(tData316), '\' ', (tData316 == opt_data.concentration_id) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.concentrations[tData316].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select title=\'temperature\' size=\'1\' row=\'0\' class=\'scb_f_experiment_setup_temperature_edit\' ', (opt_data.disabled) ? 'disabled=\'disabled\'' : '', '><option value=\'\' disabled="disabled">Please select</option>');
  var tList334 = soy.$$getMapKeys(opt_data.template.experiment_temperatures);
  var tListLen334 = tList334.length;
  for (var tIndex334 = 0; tIndex334 < tListLen334; tIndex334++) {
    var tData334 = tList334[tIndex334];
    output.append('<option value=\'', soy.$$escapeHtml(tData334), '\' ', (tData334 == opt_data.temperature) ? 'selected=\'true\'' : '', '>', soy.$$escapeHtml(opt_data.template.experiment_temperatures[tData334].name), '</option>');
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};
