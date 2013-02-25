scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.FacsView = scb.ui.static.FacsView || {};

scb.ui.static.FacsView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var facs_id = $(element).attr('facs_id');
    var facs_lane_id = $(element).attr('facs_lane_id');


    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        facs_id: facs_id,
        facs_lane_id: facs_lane_id,
        view: 'facs',
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

scb.ui.static.FacsView.scb_f_facs_select_lysate_type = function(element,event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var sample_kind = $(element).val();
    if( sample_kind == '' )
    {
        return;
    }
    var lane_id = $(element).attr('lane_id');
    if( lane_id == '' )
    {
        var cell_treatment_id = $(element).attr('cell_treatment_id');
               var lane = parsed.facs.lanes_list.start({
                   kind:sample_kind,
                   cell_treatment_id:cell_treatment_id,
                   experiment_id:parsed.experiment.id
               });
        $(element).attr('lane_id', lane.id ) ;
        $(element).attr('lane_kind', 'existing' ) ;
        scb.ui.static.MainFrame.refresh();
    }
    else
    {
        parsed.facs.lanes_list.get(lane_id).kind = sample_kind;
    }

}

scb.ui.static.FacsView.scb_f_facs_prepare_lysates = function (element,event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var rows_state = parsed.facs.rows_state();
        parsed.facs.sample_prepared = true;
        scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.scb_f_facs_sample_active_all = function (element,event) {
    $('.scb_f_facs_sample_active').each( function(e) {
        var element = this;
        $(element).attr('checked','checked');
        scb.ui.static.FacsView.scb_f_facs_sample_active(element);
    } ) ;
}

scb.ui.static.FacsView.scb_f_facs_run_samples = function(element,event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_finished = true;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select = function(element, event )
{
    $('li',$(element).parent()).removeClass('scb_s_facs_sample_selected');
    $(element).addClass('scb_s_facs_sample_selected');
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.lane_selected = parsed.facs_lane.id;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.FacsView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_sample_active', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_sample_active_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active_all(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_prepare_lysates', function (e) {
        scb.ui.static.FacsView.scb_f_facs_prepare_lysates(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_select_lysate_type', function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_run_samples', function (e) {
        scb.ui.static.FacsView.scb_f_facs_run_samples(this, e);
    });

    scb.utils.off_on(workarea, 'click', '.scb_s_facs_choose_samples_order_list>li', function (e) {
        scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select(this, e);
    });

}

scb.ui.static.FacsView.charts = function(workarea)
{
    $('.scb_s_facs_chart').each( function() {
        var chart = $(this);
        var data = [ { label: "Foo", data: [ [10, 1], [17, -14], [30, 5] ] },
          { label: "Bar", data: [ [11, 13], [19, 11], [30, -7] ] }
        ];
        var options = {
            series: {
                lines: { show: true },
                points: { show: true }
            }
        };
        $.plot( chart , data, options);

    })
}
scb.ui.FacsView = function scb_ui_FacsView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = gstate.workarea;
        var template = state.assignment.template;
        var rows_state = state.facs.rows_state();

        var can_prepare_lysate = rows_state.valid > 0;

        var kind = 'sample_prep';
                if (state.facs.sample_prepared) {
                    kind = 'analyze';
                }
        workarea.html(scb_facs.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            facs: state.facs,
            t: template,
            rows: rows_state.rows,
            rows_valid: rows_state.valid,
            kind: kind,
            kinds: template.lysate_kinds,
            can_prepare_lysate: can_prepare_lysate
        }));
        document.title = "FACS - StarCellBio";

        if( state.facs.samples_finished)
        {
            scb.ui.static.FacsView.charts(workarea);
        }
        else
        {
            $('.scb_s_facs_samples_graph_area').css('opacity','.25');
        }

    }
}