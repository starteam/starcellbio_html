// This file was automatically generated from experiment_design.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_design == 'undefined') { var scb_experiment_design = {}; }


scb_experiment_design.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_design_view\'>');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 3, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_experiment_design.display_details(opt_data, output);
  scb_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_design.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_design_description\'>');
  scb_common.experiment_step({step: 1}, output);
  output.append('<div class=\'experiment_name_header\'>Experiment name:</div><input type=\'text\' class=\'scb_s_experiment_name_edit\' maxlength="20" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' value=\'', soy.$$escapeHtml(opt_data.experiment.name), '\'><br/><!--', opt_data.assignment.description, opt_data.t.instructions, '--><br/><div class=\'scb_s_experiment_design_objective_container\'><div class=\'scb_s_experiment_design_objective_text\'>What objective or question is your experiment going to address?</div><textarea class=\'scb_s_experiment_design_objective\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.objective), '</textarea></div><div class=\'scb_s_experiment_design_hypothesis_container\'><div class=\'scb_s_experiment_design_hypothesis_text\'>What is your goal or hypothesis for this experiment?</div><textarea class=\'scb_s_experiment_design_hypothesis\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.hypothesis), '</textarea></div><div class=\'scb_s_experiment_design_techniques_container\'><div class=\'scb_s_experiment_design_techniques_text\'>What technique(s) might be best suited for the analysis of this experiment?</div>');
  scb_homepage.display_techniques({techniques: opt_data.t.ui.experimental_design.techniques}, output);
  output.append('</div><br/><a class="scb_f_open_experiment_setup scb_s_navigation_button" href="#view=experiment_setup&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">EXPERIMENT SETUP &#9654;</a><br/><a class="scb_f_open_assignment scb_s_navigation_button" href="#view=assignment&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">&#9664; ASSIGNMENT</a></div>');
  return opt_sb ? '' : output.toString();
};
