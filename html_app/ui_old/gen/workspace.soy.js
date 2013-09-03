// This file was automatically generated from workspace.soy.
// Please don't edit this file by hand.

if (typeof scb_ui == 'undefined') { var scb_ui = {}; }


scb_ui.main_frame = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'sidebar\'><div class=\'sidebar_inner\'>');
  scb_ui.left_sidebar(opt_data, output);
  output.append('</div></div><div class=\'workspace\'>');
  if (opt_data.assignment.experiments.selected) {
    scb_ui.display_experiment({assignment: opt_data.assignment, experiment: opt_data.assignment.experiments.selected}, output);
    output.append('<div id=\'experiment_setup_row_treatment_edit_blackout\'><div id=\'experiment_setup_row_treatment_edit\' style=\'display:none\'></div></div>');
  } else {
    scb_ui.display_instructions({template: opt_data.assignment.template}, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.left_sidebar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t\t<div class=\'back_button select_assignments\'><div><span></span></div><p>Back to assignments</p></div><div class=\'sidebar_display_experiments\'>');
  scb_ui.sidebar_display_experiments({experiments: opt_data.assignment.experiments, template: opt_data.assignment.template}, output);
  output.append('</div><div class=\'load_save_button_spacer\'></div><div class=\'load_save_button\'><div class=\'save_master_model button green small\'>Save</div><div class=\'load_master_model button green small\'>Load</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.back_button = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'back_button ', soy.$$escapeHtml(opt_data.action_class), '\'><div><span></span></div><p>', soy.$$escapeHtml(opt_data.text), '</p></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.sidebar_display_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<a target=\'_new\' href=\'mailto:star@mit.edu?subject=StarCellBio%20Feedback\'><div style=\'width:110px\' class=\'button medium green\'>Feedback?</div></a><br><br><div class=\'sidebar_display_experiment ', (opt_data.experiments.selected_id == null) ? 'selected_experiment' : 'unselected_experiment', '\' model_id=\'\'><div class=\'sidebar_experiment_name\'><a href=\'#\' model_id=\'\' class=\'select_experiment a_sidebar ', (opt_data.experiments.selected_id == null) ? 'selected_experiment_name' : '', '\'>Assignment</a><ul class=\'sidebar_display_experiment_list\'></ul></div></div>');
  var experimentList45 = opt_data.experiments.list;
  var experimentListLen45 = experimentList45.length;
  for (var experimentIndex45 = 0; experimentIndex45 < experimentListLen45; experimentIndex45++) {
    var experimentData45 = experimentList45[experimentIndex45];
    output.append('<div class=\'sidebar_display_experiment ', (opt_data.experiments.selected_id == experimentData45.id) ? 'selected_experiment' : 'unselected_experiment', '\' model_id=\'', soy.$$escapeHtml(experimentData45.id), '\'>');
    scb_ui.sidebar_display_experiment({experiment: experimentData45, selected_id: opt_data.experiments.selected_id, template: opt_data.template}, output);
    output.append('</div>');
  }
  output.append('<div class=\'add_new_experiment\'><div style=\'width:110px\' class=\'button green medium\'>New Experiment</div></div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.sidebar_display_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'sidebar_experiment_name\'><a href=\'#\' model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'select_experiment a_sidebar ', (opt_data.selected_id == opt_data.experiment.id) ? 'selected_experiment_name' : '', '\'>', soy.$$escapeHtml(opt_data.experiment.name), '</a>');
  if (opt_data.selected_id == opt_data.experiment.id) {
    output.append('<ul class=\'sidebar_display_experiment_list\'>', (opt_data.experiment.setup_finished) ? '<li><a href=\'#\' model_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' class=\'a_sidebar select_experimental_setup\'>Experimental Setup</a></li>' : '<li><a href=\'#\' model_id=\'' + soy.$$escapeHtml(opt_data.experiment.id) + '\' class=\'a_sidebar select_experimental_setup\'>Experimental Setup</a></li>');
    if (opt_data.experiment.setup_finished) {
      if (opt_data.template.ui_configuration.experiment_steps_western_blot) {
        output.append('<li><!--<a href=\'#\' model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'a_sidebar select_western_blot_common\'>-->Western Blot<!--</a>--></li><ul class=\'wester_blot_sidebar_list\'>');
        var western_blotList91 = opt_data.experiment.western_blot_list.list;
        var western_blotListLen91 = western_blotList91.length;
        for (var western_blotIndex91 = 0; western_blotIndex91 < western_blotListLen91; western_blotIndex91++) {
          var western_blotData91 = western_blotList91[western_blotIndex91];
          output.append('<li><a model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' sub_model_id=\'', soy.$$escapeHtml(western_blotData91.id), '\' class=\'a_sidebar select_western_blot\'>', soy.$$escapeHtml(western_blotData91.name), '</a></li>');
        }
        output.append('<li><a model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'a_sidebar new_western_blot_sidebar\' href=\'#\'><img src=\'icons/actions/Add.png\' width=\'24px\'></a></li></ul>');
      }
      if (opt_data.template.ui_configuration.experiment_steps_facs) {
        output.append('<li><a href=\'#\' model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'a_sidebar select_facs_common\'>Facs</a></li><ul class=\'facs_sidebar_list\'>');
        var facsList108 = opt_data.experiment.facs_list.list;
        var facsListLen108 = facsList108.length;
        for (var facsIndex108 = 0; facsIndex108 < facsListLen108; facsIndex108++) {
          var facsData108 = facsList108[facsIndex108];
          output.append('<li><a model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' sub_model_id=\'', soy.$$escapeHtml(facsData108.id), '\' class=\'a_sidebar select_facs\'>', soy.$$escapeHtml(facsData108.name), '</a></li>');
        }
        output.append('<li><a model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'a_sidebar new_facs\' href=\'#\'><img src=\'icons/actions/Add.png\' width=\'24px\'></a></li></ul>');
      }
      if (opt_data.template.ui_configuration.experiment_steps_microscopy) {
        output.append('<li><a href=\'#\' model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'a_sidebar select_microscopy_common\'>Microscopy</a></li><ul class=\'microscopy_sidebar_list\'>');
        var microscopyList125 = opt_data.experiment.microscopy_list.list;
        var microscopyListLen125 = microscopyList125.length;
        for (var microscopyIndex125 = 0; microscopyIndex125 < microscopyListLen125; microscopyIndex125++) {
          var microscopyData125 = microscopyList125[microscopyIndex125];
          output.append('<li><a model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' sub_model_id=\'', soy.$$escapeHtml(microscopyData125.id), '\' class=\'a_sidebar select_microscopy\'>', soy.$$escapeHtml(microscopyData125.name), '</a></li>');
        }
        output.append('<li><a model_id=\'', soy.$$escapeHtml(opt_data.experiment.id), '\' class=\'a_sidebar new_microscopy\' href=\'#\'><img src=\'icons/actions/Add.png\' width=\'24px\'></a></li></ul><!-- \t\t\t<li>Microscopy</li> -->');
      }
    }
    output.append('</ul>');
  } else {
    output.append('<ul class=\'sidebar_display_experiment_list\'>', (opt_data.experiment.setup_finished) ? '' : '', '</ul>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_ui.display_instructions = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'display_instructions\'>Please select an experiment from the left hand side or start a new one by clicking on <b>New Experiment</b></div><div class=\'display_assignment_instructions space_above\' style=\'padding-top:20px\'>', opt_data.template.instructions, '</div>');
  return opt_sb ? '' : output.toString();
};
