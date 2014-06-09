// This file was automatically generated from experiment_design.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_design == 'undefined') { var scb_experiment_design = {}; }


scb_experiment_design.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_design_view\' id=\'scb_s_experiment_design_view\'  >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 3, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_design.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_design.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_design_container\' role=\'main\' aria-live="assertive" ><div class=\'scb_s_design_description\'>');
  scb_common.experiment_step({step: 1, last_step: opt_data.last_step, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  output.append(' <br/><div class=\'scb_s_experiment_design_objective_text experiment_name_header\' >Experiment Name: </div><input type=\'text\' class=\'scb_s_experiment_name_edit\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' value=\'', soy.$$escapeHtml(opt_data.experiment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.experiment.name), '\' aria-label=\'Experiment Name\' role=\'textbox\'><br/><br/><div class=\'scb_s_experiment_design_objective_container\'><div class=\'scb_s_experiment_design_objective_text\' id=\'scb_s_experiment_design_objective_text_label\'><span class=\'design_numbers\'>1.&nbsp;&nbsp;&nbsp;</span>What question is your experiment going to address?</div><textarea aria-labelledby="scb_s_experiment_design_objective_text_label" class=\'scb_s_experiment_design_objective\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.objective), '</textarea></div><br/><div class=\'scb_s_experiment_design_hypothesis_container\'><div class=\'scb_s_experiment_design_hypothesis_text\' id="scb_s_experiment_design_hypothesis_label"><span class=\'design_numbers\'>2.&nbsp;&nbsp;&nbsp;</span>Do you have a hypothesis for this experiment? If so, please write it below.</div><textarea aria-labelledby="scb_s_experiment_design_hypothesis_label" class=\'scb_s_experiment_design_hypothesis\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.hypothesis), '</textarea></div><br/><div class=\'scb_s_experiment_design_techniques_container\'><div class=\'scb_s_experiment_design_techniques_text\'><span class=\'design_numbers\'>3.&nbsp;&nbsp;&nbsp;</span>What technique(s) might be best suited for the analysis of this experiment?</div><textarea aria-labelledby="scb_s_experiment_design_technique_label" class=\'scb_s_experiment_design_technique_answer\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.technique), '</textarea><span class=\'scb_s_experiment_design_techniques_tq\'>');
  scb_experiment_design.display_techniques({techniques: opt_data.assignment.template.ui.experimental_design.techniques, experiment: opt_data.experiment, assignment: opt_data.assignment}, output);
  output.append('</span></div><br/></div><a class="scb_f_open_experiment_setup scb_s_navigation_button" href="#view=experiment_setup&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '" role=\'button\' aria-label=\'Experiment Setup\'>EXPERIMENT SETUP &nbsp; &#9654;</a><br/></div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_design.display_techniques = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var techList69 = opt_data.techniques;
  var techListLen69 = techList69.length;
  for (var techIndex69 = 0; techIndex69 < techListLen69; techIndex69++) {
    var techData69 = techList69[techIndex69];
    output.append((techData69 == 'wb') ? '<span class=\'scb_s_experiment_design_technique_wb scb_s_experiment_design_unselected\' aria-label=\'Western Blot Summary\' role=\'presentation\'><div class=\'scb_s_experiment_design_technique\' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-key=\'design_wb_cb\' role="button" ><span class=\'scb_s_homepage_technique_title_image\'>Western Blot</span>Western blotting detects overall changes in the amount or chemical modifications of a particular protein. <a href="static/ref_lib/full_library.html#WesternBlotting" class=\'scb_s_design_technique_learn_more \' role=\'link\' target=\'_blank\'>Learn more &gt;&gt;</a></div></span><div class=\'scb_s_experiment_design_divider_1\' role=\'presentation\'></div>' : '', (techData69 == 'facs') ? '<span class=\'scb_s_experiment_design_technique_flow scb_s_experiment_design_unselected\' aria-label=\'Western Blot Summary\' role=\'presentation\'><div class=\'scb_s_experiment_design_technique \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-key=\'design_fc_cb\' role="button" ><span class=\'scb_s_homepage_technique_title_image\'>Flow Cytometry</span>Flow cytometry is used to count and analyze the size, shape and properties of individual cells within a heterogeneous population of cells.     <a href="static/ref_lib/full_library.html#FlowCytometry" class=\'scb_s_design_technique_learn_more \' target=\'_blank\'  role=\'link\'>Learn more &gt;&gt;</a></div></span><div class=\'scb_s_experiment_design_divider_2\' role=\'presentation\'></div>' : '', (techData69 == 'micro') ? '<span class=\'scb_s_experiment_design_technique_micro scb_s_experiment_design_unselected\' aria-label=\'Western Blot Summary\' role=\'presentation\'><div class = \'scb_s_experiment_design_technique \' assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' experiment_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' data-key=\'design_mi_cb\' role="button" ><span class=\'scb_s_homepage_technique_title_image\'>Microscopy</span>Microscopy is used to study the shape, morphology and properties of cells, tissues or organisms that otherwise cannot be observed by eye.     <a href="static/ref_lib/full_library.html#Microscopy" class=\'scb_s_design_technique_learn_more \' target=\'_blank\' role=\'link\'>Learn more &gt;&gt;</a></div></span>' : '');
  }
  return opt_sb ? '' : output.toString();
};
