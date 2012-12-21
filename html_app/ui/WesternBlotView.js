'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.WesternBlotView = scb.ui.static.WesternBlotView || {};

scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type = function (element) {
    var lysate_type = $(element).val();
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var western_blot_id = $(element).attr('western_blot_id');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    var state = {
        experiment_id:experiment_id,
        assignment_id:assignment_id,
        western_blot_id:western_blot_id,
        view:'western_blot',
        skip_hash_update:true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var lysate_id = $(element).attr('lane_id');
    if( lysate_id == '' )
    {
        parsed.western_blot.lanes_list.start({
            kind: lysate_type,
            cell_treatment_id: cell_treatment_id
        });
    }
    else
    {
        parsed.western_blot.lanes_list.get(lysate_id).kind = lysate_type;
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.scb_f_western_blot_sample_remove = function (element) {
    var lysate_type = $(element).val();
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var western_blot_id = $(element).attr('western_blot_id');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    var state = {
        experiment_id:experiment_id,
        assignment_id:assignment_id,
        western_blot_id:western_blot_id,
        view:'western_blot',
        skip_hash_update:true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var lysate_id = $(element).attr('lane_id');
    if( lysate_id != '' )
    {
        parsed.western_blot.lanes_list.remove(lysate_id);
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_select_lysate_type', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_sample_remove', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_remove(this);
    });

}

scb.ui.WesternBlotView = function scb_ui_WesternBlotView(gstate) {
    var self = this;

    self.show = function (state) {
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
                        index:index
                    });
                });
                rows.push({
                    kind:'placeholder',
                    display_sample:false,
                    cell_treatment:e
                });
            } else {
                rows.push({
                    row_type:'new',
                    display_sample:true,
                    cell_treatment:e
                })
            }
        });
        workarea.html(scb_western_blot.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment,
            western_blot:state.western_blot,
            rows:rows
        }));
        state.experiment.last_view = 'western_blot';
    }
}