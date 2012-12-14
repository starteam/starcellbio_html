'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.WesternBlotView = scb.ui.static.WesternBlotView || {};


scb.ui.WesternBlotView = function scb_ui_WesternBlotView(gstate) {
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
        state.experiment.last_view = 'western_blot';
    }
} 