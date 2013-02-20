scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.FacsView = scb.ui.static.FacsView || {};

scb.ui.static.FacsView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var facs_id = $(element).attr('facs_id');

    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        facs_id: facs_id,
        view: 'western_blot',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}

scb.ui.static.FacsView.scb_f_facs_sample_active = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.facs.is_cell_treatment_enabled[cell_treatment_id] = val;
//        $('.scb_f_facs_select_lysate_type',$(element).parent().parent()).each( function(e) {
//            scb.ui.static.FacsView.scb_f_western_blot_select_lysate_type(this);
//        })
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_sample_active', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active(this, e);
    });
}

scb.ui.FacsView = function scb_ui_FacsView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = gstate.workarea;
        var template = state.assignment.template;
        var rows_state = state.facs.rows_state();

        var can_prepare_lysate = rows_state.valid > 0;

        workarea.html(scb_facs.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            facs: state.facs,
            t: template,
            rows: rows_state.rows,
            rows_valid: rows_state.valid,
            kind: 'sample_prep',
            can_prepare_lysate: can_prepare_lysate
        }));
        document.title = "FACS - StarCellBio";
    }
}