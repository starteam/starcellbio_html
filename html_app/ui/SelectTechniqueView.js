'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.SelectTechniqueView = scb.ui.static.SelectTechniqueView || {};


scb.ui.SelectTechniqueView = function scb_ui_SelectTechniqueView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;

        workarea.html(scb_select_technique.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment
        }));
        state.experiment.last_view = 'select_technique';
    }
}