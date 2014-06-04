// This file was automatically generated from notebook.soy.
// Please don't edit this file by hand.

if (typeof scb_notebook == 'undefined') { var scb_notebook = {}; }


scb_notebook.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_view\' >');
  scb_homepage.display_header(opt_data, output);
  scb_common.assignment_step({step: 10, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignment_name: opt_data.assignment.name, experiment_name: opt_data.experiment.name, assignment: opt_data.assignment, experiment: opt_data.experiment}, output);
  scb_notebook.display_details(opt_data, output);
  scb_homepage.display_footer({global_template: opt_data.t, assignment: opt_data.assignment}, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.display_details = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_notebook_container\' role=\'main\'><div class=\'scb_notebook_details_view\'><div class=\'scb_s_notebook_all_tabs\'><div class=\'scb_notebook_details_view_inner\'>');
  scb_notebook.display_tabs(opt_data, output);
  output.append('</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


scb_notebook.display_tabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="scb_s_notebook_section"><input type=\'text\' class=\'scb_s_notebook_section_name_edit\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' experiment_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' value=\'', soy.$$escapeHtml(opt_data.experiment.name), '\'  title=\'', soy.$$escapeHtml(opt_data.experiment.name), '\' aria-label=\'Section Name\' role=\'textbox\'><br/><br/><button class=\'scb_f_notebook_text_button\'>Text</button><button class=\'scb_f_notebook_image_button\'>Image</button><textarea></textarea></div>');
  return opt_sb ? '' : output.toString();
};
