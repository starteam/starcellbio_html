// This file was automatically generated from select_technique.soy.
// Please don't edit this file by hand.

if (typeof scb_select_technique == 'undefined') { var scb_select_technique = {}; }


scb_select_technique.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_view\' xmlns="http://www.w3.org/1999/html">');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 5, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_select_technique.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_select_technique.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_select_technique_container\'><div class=\'scb_s_select_technique_details_view\'>');
  scb_common.experiment_step({step: 4, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append('<div class=\'scb_s_select_technique_western_blot scb_f_select_technique\'><h1 class=\'scb_s_select_technique_header\'>Western Blot Analyses:</h1><div class=\'scb_s_select_technique_western_blot_available\'>');
  var wList32 = opt_data.experiment.western_blot_list.list;
  var wListLen32 = wList32.length;
  for (var wIndex32 = 0; wIndex32 < wListLen32; wIndex32++) {
    var wData32 = wList32[wIndex32];
    output.append('<a class=\'scb_f_open_western_blot scb_s_select_technique_open_western_blot\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' western_blot_id=\'', soy.$$escapeHtml(wData32.id), '\' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&western_blot_id=', soy.$$escapeHtml(wData32.id), '\'>', soy.$$escapeHtml(wData32.name), '</a><br>');
  }
  output.append((opt_data.experiment.western_blot_list.length == 0) ? '<p class=\'scb_s_select_technique_none\'>You have not performed any western blotting.</p><p class=\'scb_s_select_technique_none\'>Select <b>New Western Blot</b> below to start a western blot analysis.</p>' : '', '</div><a class=\'scb_s_navigation_button scb_f_new_western_blot \' href=\'#view=western_blot&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>NEW WESTERN BLOT &nbsp; &#9654;</a><p class=\'scb_s_select_technique_para\'><span class=\'scb_s_select_technique_reminder\'>Reminder:</span><br>Western blotting detects overall changes in the amount or chemical modifications of a particular protein. &nbsp;<a href="static/ref_lib/full_library.html#WesternBlotting" target=\'_blank\' class=\'scb_s_select_technique_learn_more \'>Learn more &gt;&gt;</a></p></div><div class=\'scb_s_select_technique_flow scb_f_select_technique\'><h1 class=\'scb_s_select_technique_header\'>Flow Cytometry Analyses:</h1><div class=\'scb_s_select_technique_western_blot_available\'>');
  var wList57 = opt_data.experiment.facs_list.list;
  var wListLen57 = wList57.length;
  for (var wIndex57 = 0; wIndex57 < wListLen57; wIndex57++) {
    var wData57 = wList57[wIndex57];
    output.append('<a class=\'scb_f_open_facs scb_s_select_technique_open_facs\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'  facs_id=\'', soy.$$escapeHtml(wData57.id), '\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&facs_id=', soy.$$escapeHtml(wData57.id), '\'>', soy.$$escapeHtml(wData57.name), '</a><br>');
  }
  output.append((opt_data.experiment.facs_list.length == 0) ? '<p class=\'scb_s_select_technique_none\'>You have not performed any flow cytometry analyses.</p><p class=\'scb_s_select_technique_none\'>Select <b>New Flow Cytometry</b> below to start a flow cytometry analysis.</p>' : '', '</div><a class=\'scb_s_navigation_button scb_f_new_flow_cytometry\' href=\'#view=facs&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>NEW FLOW CYTOMETRY &nbsp; &#9654;</a><p class=\'scb_s_select_technique_para scb_s_facs_select_technique\'><span class=\'scb_s_select_technique_reminder\'>Reminder:</span><br>Flow cytometry is used to count and analyze the size, shape and properties of individual cells within a heterogeneous population of cells. &nbsp;<a href="static/ref_lib/full_library.html#FlowCytometry"target=\'_blank\'  class=\'scb_s_select_technique_learn_more \'>Learn more &gt;&gt;</a></p></div><div class=\'scb_s_select_technique_micro scb_f_select_technique\'><h1 class=\'scb_s_select_technique_header\'>Microscopy Analyses:</h1><div class=\'scb_s_select_technique_western_blot_available\'>');
  var wList82 = opt_data.experiment.microscopy_list.list;
  var wListLen82 = wList82.length;
  for (var wIndex82 = 0; wIndex82 < wListLen82; wIndex82++) {
    var wData82 = wList82[wIndex82];
    output.append('<a class=\'scb_f_open_microscopy scb_s_select_technique_open_microscopy\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' microscopy_id=\'', soy.$$escapeHtml(wData82.id), '\' href=\'#view=microscopy&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&microscopy_id=', soy.$$escapeHtml(wData82.id), '\'>', soy.$$escapeHtml(wData82.name), '</a><br>');
  }
  output.append((opt_data.experiment.microscopy_list.length == 0) ? '<p class=\'scb_s_select_technique_none\'>You have not performed any microscopy analyses. to start a microscopy analysis.</p><p class=\'scb_s_select_technique_none\'>Select <b>New Microscopy</b> below to start a microscopy analysis.</p>' : '', '</div><a class=\'scb_s_navigation_button scb_f_new_microscopy \' href=\'#view=microscopy&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '\'>NEW MICROSCOPY &nbsp; &#9654;</a><p class=\'scb_s_select_technique_para\'><span class=\'scb_s_select_technique_reminder\'>Reminder:</span><br>Microscopy is used to study the shape, morphology and properties of cells, tissues or organisms that otherwise cannot be observed by eye. &nbsp;<a href="static/ref_lib/full_library.html#Microscopy" target=\'_blank\' class=\'scb_s_select_technique_learn_more \'>Learn more &gt;&gt;</a></p></div></div><a class="scb_s_navigation_button scb_f_open_experiment_setup_readonly" href="#view=experiment_run&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">&#9664; &nbsp; REVIEW SET-UP</a><br/></div>');
  return opt_sb ? '' : output.toString();
};
