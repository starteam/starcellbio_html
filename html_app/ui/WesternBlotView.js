'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.WesternBlotView = scb.ui.static.WesternBlotView || {};

scb.ui.static.WesternBlotView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var western_blot_id = $(element).attr('western_blot_id');

    var state = {
        experiment_id:experiment_id,
        assignment_id:assignment_id,
        western_blot_id:western_blot_id,
        view:'western_blot',
        skip_hash_update:true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}

scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var lysate_type = $(element).val();
    var lysate_id = $(element).attr('lane_id');
    if (lysate_id == '') {
        var cell_treatment_id = $(element).attr('cell_treatment_id');
        parsed.western_blot.lanes_list.start({
            kind:lysate_type,
            cell_treatment_id:cell_treatment_id
        });
    }
    else {
        parsed.western_blot.lanes_list.get(lysate_id).kind = lysate_type;
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.scb_f_western_blot_sample_remove = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var lysate_id = $(element).attr('lane_id');
    if (lysate_id != '') {
        parsed.western_blot.lanes_list.remove(lysate_id);
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.western_blot.is_cell_treatment_enabled[cell_treatment_id] = val;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.scb_f_western_blot_remove = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.experiment.western_blot_list.remove(parsed.western_blot.id);
    parsed.state.view = 'select_technique';
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);


}

scb.ui.static.WesternBlotView.scb_s_western_blot_selected = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.western_blot.name = $(element).text();
}

scb.ui.static.WesternBlotView.scb_f_western_blot_prepare_lysates = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var rows_state = parsed.western_blot.rows_state();
    if (rows_state.valid > scb.ui.static.WesternBlotView.MAX_ROWS) {
        alert("Maximum number of lysate samples is " + scb.ui.static.WesternBlotView.MAX_ROWS + ". Please remove some and try again.");
    }
    else if (rows_state.valid < 1) {
        alert("Please select at least 1 lysate to prepare.");

    }
    else {
        parsed.western_blot.lysate_prepared = true;
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.WesternBlotView.scb_s_western_blot_load_marker = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    //TODO: 1st things first -- we needs to save NEW order

    parsed.western_blot.marker_loaded = true;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.scb_s_western_blot_choose_gel_type_input = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    //TODO: 1st things first -- we needs to save NEW order

    parsed.western_blot.gel_type = $(element).val();
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.WesternBlotView.scb_s_western_blot_run_gel_and_transfer = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    //TODO: 1st things first -- we needs to save NEW order
    parsed.western_blot.is_transfered = true;

    //TODO: before repaint need to do steps in animation...
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.WesternBlotView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_select_lysate_type', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_sample_remove', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_remove(this);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_sample_active', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_remove', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_remove(this);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_western_blot_selected', function (e) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_selected(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_prepare_lysates', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_prepare_lysates(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_load_marker', function (e) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_load_marker(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_choose_gel_type_input', function (e, ui) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_choose_gel_type_input(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_run_gel_and_transfer', function (e, ui) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_run_gel_and_transfer(this);
    });


}

scb.ui.static.WesternBlotView.MAX_ROWS = 14;

scb.ui.WesternBlotView = function scb_ui_WesternBlotView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;
        var rows_state = state.western_blot.rows_state();

        var kind = 'sample_prep';
        if (state.western_blot.lysate_prepared) {
            kind = 'prepare_gel';
        }

        var can_prepare_lysate = rows_state.valid > 0;

        workarea.html(scb_western_blot.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment,
            western_blot:state.western_blot,
            rows:rows_state.rows,
            rows_valid:rows_state.valid,
            kind:kind,
            can_prepare_lysate:can_prepare_lysate
        }));
        if (kind == 'prepare_gel') {
            $('.scb_s_western_blot_choose_samples_order_list').sortable();
        }

        if (rows_state.valid >= scb.ui.static.WesternBlotView.MAX_ROWS) {
            $('.scb_f_western_blot_sample_active').attr('disabled', 'disabled');
            $('.scb_f_western_blot_select_lysate_type').attr('disabled', 'disabled');
            $('.scb_f_western_blot_sample_active[checked="checked"]').removeAttr('disabled');

        }
        state.experiment.last_view = 'western_blot';

    }
}