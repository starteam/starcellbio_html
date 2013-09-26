'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.SelectTechniqueView = scb.ui.static.SelectTechniqueView || {};

scb.ui.static.SelectTechniqueView.disable_techniques = function (state) {
    var template = state.template;
    var workarea = state.workarea;

    var techniques = template.ui.experimental_design.techniques;

    $('.scb_f_select_technique').addClass('scb_s_select_technique_disabled');
    _.each(techniques, function (e) {
        if (e == 'wb') {
            $('.scb_s_select_technique_western_blot').removeClass('scb_s_select_technique_disabled');
        }
        else if (e == 'facs') {
            $('.scb_s_select_technique_flow').removeClass('scb_s_select_technique_disabled');
        }
        else if (e == 'micro') {
            $('.scb_s_select_technique_micro').removeClass('scb_s_select_technique_disabled');

        }
    });
    $('a','.scb_s_select_technique_disabled').removeAttr('href').css('cursor','default');
}

scb.ui.SelectTechniqueView = function scb_ui_SelectTechniqueView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;

        workarea.html(scb_select_technique.main({
            global_template: gstate.context.master_model,
            t: template,
            context: gstate.context,
            assignment: state.assignment,
            experiment: state.experiment
        }));
        state.experiment.last_view = 'select_technique';
		//state.assignments.last_step = 5;

        scb.ui.static.SelectTechniqueView.disable_techniques({template: template, workarea: workarea});
    }

}