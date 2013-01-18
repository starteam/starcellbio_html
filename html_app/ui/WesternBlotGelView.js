
scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.WesternBlotGelView = scb.ui.static.WesternBlotGelView || {};

scb.ui.WesternBlotGelView = function scb_WesternBlotGelView(gstate) {
    var self = this;
    
    self.show = function(state)
    {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;
        var grouped_rows = state.western_blot.lanes_list.grouped_list;
        var rows = [];
        _.each(experiment.cell_treatment_list.list, function (e) {
            if (grouped_rows[e.id]) {
                _.each(grouped_rows[e.id], function (ee, index) {
                    rows.push({
                        kind:'existing',
                        cell_treatment:e,
                        lane:ee,
                        display_sample:index == 0,
                        is_sample_enabled:state.western_blot.is_cell_treatment_enabled[e.id],
                        index:index
                    });
                });
                rows.push({
                    kind:'placeholder',
                    display_sample:false,
                    cell_treatment:e,
                    is_sample_enabled:state.western_blot.is_cell_treatment_enabled[e.id]
                });
            } else {
                rows.push({
                    row_type:'new',
                    display_sample:true,
                    cell_treatment:e,
                    is_sample_enabled:state.western_blot.is_cell_treatment_enabled[e.id]
                })
            }
        });
        var kind = 'prepare_gel';

        var can_prepare_lysate = _.find(rows, function (e) {
            return e.is_sample_enabled
        }) && true;
        workarea.html(scb_western_blot_gel.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment,
            western_blot:state.western_blot,
            rows:rows,
            kind:kind,
            can_prepare_lysate:can_prepare_lysate
        }));
        state.experiment.last_view = 'western_blot_gel';
    }
};