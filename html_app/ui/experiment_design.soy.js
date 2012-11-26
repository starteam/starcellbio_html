// This file was automatically generated from experiment_design.soy.
// Please don't edit this file by hand.

if (typeof scb_experiment_design == 'undefined') { var scb_experiment_design = {}; }


scb_experiment_design.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_design_view\'>');
  scb_assignments.display_header(opt_data, output);
  scb_experiment_design.display_details(opt_data, output);
  scb_assignments.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_experiment_design.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_description\'>EXPERIMENT DESIGN<b>', opt_data.experiment.name, '</b><br/>', opt_data.assignment.description, opt_data.t.instructions, '<br/><textarea class=\'scb_s_experiment_design_hypothesis\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\'>', soy.$$escapeHtml(opt_data.experiment.hypothesis), '</textarea><br/><a class="scb_f_open_experiment_setup" href="#view=experiment_setup&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '&experiment_id=', soy.$$escapeHtml(opt_data.experiment.id), '">Experiment setup</a><br/><a class="scb_f_open_assignment" href="#view=assignment&assignment_id=', soy.$$escapeHtml(opt_data.assignment.id), '">Assignment</a></div>');
  return opt_sb ? '' : output.toString();
};
