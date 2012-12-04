// This file was automatically generated from experiment_setup.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_setup == 'undefined') { var scb_experiment_setup = {}; }


scb_experiment_setup.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\'>');
  scb_assignments.display_header(opt_data, output);
  scb_experiment_setup.display_details(opt_data, output);
  scb_assignments.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_setup.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_table\'>EXPERIMENT SETUP<table class="scb_s_experiment_design_table"><thead></thead></table><br/><a class="scb_f_open_experiment_setup_readonly" href="#view=experiment_setup_readonly&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">Run Experiment</a><br/><a class="scb_f_open_experiment_design" href="#view=experiment_design&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">Design experiment</a></div>');
  return opt_sb ? '' : output.toString();
};
