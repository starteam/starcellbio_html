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
    $('.scb_f_facs_select_lysate_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this);
    })
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_f_facs_select_lysate_type = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var sample_kind = $(element).val();
    if (sample_kind == '') {
        return;
    }
    var lane_id = $(element).attr('lane_id');
    if (lane_id == '') {
        var cell_treatment_id = $(element).attr('cell_treatment_id');
        var lane = parsed.facs.lanes_list.start({
            kind: sample_kind,
            cell_treatment_id: cell_treatment_id,
            experiment_id: parsed.experiment.id
        });
        $(element).attr('lane_id', lane.id);
        $(element).attr('lane_kind', 'existing');
        if (event) {
            scb.ui.static.MainFrame.refresh();
        }
    }
    else {
        parsed.facs.lanes_list.get(lane_id).kind = sample_kind;
    }

}

scb.ui.static.FacsView.scb_f_facs_prepare_lysates = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var rows_state = parsed.facs.rows_state();
    parsed.facs.sample_prepared = true;
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.scb_f_facs_sample_active_all = function (element, event) {
    $('.scb_f_facs_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', 'checked');
        scb.ui.static.FacsView.scb_f_facs_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.FacsView.scb_f_facs_run_samples = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_finished = true;
    parsed.facs.lane_selected = scb.utils.get(parsed.facs.lanes_list.list, [0, 'id']);
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if (parsed.facs.samples_finished) {
        $('li', $(element).parent()).removeClass('scb_s_facs_sample_selected');
        $(element).addClass('scb_s_facs_sample_selected');
        parsed.facs.lane_selected = parsed.facs_lane.id;
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_s_facs_selected = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.facs.name = $(element).text();
}

scb.ui.static.FacsView.scb_f_facs_tools_start_analysis = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.facs.sample_analysis = true;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_s_facs_tools_instructions_show = function (show) {
    var jqDiv = $('.scb_s_facs_tools_instructions_followup');
    if (show) {
        jqDiv.slideDown();
        $('.scb_s_facs_tools_instructions_followup_toggle').html('Click here to hide instructions');
    }
    else {
        jqDiv.slideUp();
        $('.scb_s_facs_tools_instructions_followup_toggle').html('Click here to show instructions');
    }
}

scb.ui.static.FacsView.scb_s_facs_tools_instructions_followup_toggle = function (element) {
    scb.ui.static.FacsView.scb_s_facs_tools_instructions_show($('.scb_s_facs_tools_instructions_followup').is(':hidden'));
}

scb.ui.static.FacsView.scb_f_facs_analyze_remove_point = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var from = parseFloat($(element).attr('from'));
    var to = parseFloat($(element).attr('to'));
    parsed.facs_lane.canvas_metadata_analysis.points = parsed.facs_lane.canvas_metadata_analysis.points ? parsed.facs_lane.canvas_metadata_analysis.points : [];
    console.info(parsed.facs_lane.canvas_metadata_analysis.points);
    var element = _.find(parsed.facs_lane.canvas_metadata_analysis.points, function (e) {
        return e.from == from && e.to == to;
    });
    parsed.facs_lane.canvas_metadata_analysis.points = _.without(parsed.facs_lane.canvas_metadata_analysis.points, element);
    console.info(parsed.facs_lane.canvas_metadata_analysis.points);
    scb.ui.static.FacsView.reevaluate_metadata(parsed);
    parsed.facs.apply_dna_analysis_to_all = false;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_f_facs_apply_to_all = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.apply_dna_analysis_to_all = $(element).attr('checked') == 'checked';
    if (parsed.facs.apply_dna_analysis_to_all) {
        _.each(parsed.facs.lanes_list.list, function (facs_lane) {
            facs_lane.canvas_metadata_analysis.points = parsed.facs_lane.canvas_metadata_analysis.points;
            facs_lane.canvas_metadata_analysis.raw_data = parsed.facs_lane.canvas_metadata_analysis.raw_data ? parsed.facs_lane.canvas_metadata_analysis.raw_data : {data: []};
            scb.ui.static.FacsView.reevaluate_metadata({
                facs: parsed.facs,
                facs_lane: parsed.facs_lane
            });
        });
        scb.ui.static.MainFrame.refresh();
    }

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
    scb.utils.off_on(workarea, 'blur', '.scb_s_facs_selected', function (e) {
        scb.ui.static.FacsView.scb_s_facs_selected(this);
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_facs_tools_start_analysis', function (e) {
        scb.ui.static.FacsView.scb_f_facs_tools_start_analysis(this, e);
    });

    scb.utils.off_on(workarea, 'click', '.scb_s_facs_tools_instructions_followup_toggle', function (e) {
        scb.ui.static.FacsView.scb_s_facs_tools_instructions_followup_toggle(this);
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_facs_analyze_remove_point', function (e) {
        scb.ui.static.FacsView.scb_f_facs_analyze_remove_point(this);
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_facs_apply_to_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_apply_to_all(this);
    });

}

scb.ui.static.FacsView.reevaluate_metadata = function (state) {
    var facs_lane = state.facs_lane;
    facs_lane.canvas_metadata_analysis.ranges = [];
    facs_lane.canvas_metadata_analysis.points = facs_lane.canvas_metadata_analysis.points ? facs_lane.canvas_metadata_analysis.points : [];
    var ranges = facs_lane.canvas_metadata_analysis.ranges;
    var points = facs_lane.canvas_metadata_analysis.points;
    var raw_data = scb.utils.get(facs_lane, ['canvas_metadata_analysis', 'raw_data', 0], []);
    var data = [];
    points = points.sort(function (a, b) {
        return a > b;
    });

    var colors = [
        "#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed", 'orange' , 'black' , 'green' , 'violet' , 'purple' , 'pink'
    ];

    var total = 0;
    _.each(raw_data.data, function (e) {
        total += e[1];
    });
    function range(pts) {
        var carray = _.difference(colors, _.pluck(points, 'c'));
        var c = carray.length > 0 ? carray[0] : colors[0];
        var from = pts.from;
        var to = pts.to;
        pts.c = pts.c || c;
        var range = {
            from: pts.from,
            to: pts.to,
            color: pts.c,
            percentage: 0
        };
        var series = [];
        var percentage = 0;
        _.each(raw_data.data, function (element) {
            var x = element[0];
            if (x >= from && x <= to) {
                series.push(element);
                percentage += element[1];
            }
        });
        range.percentage = Math.round(percentage / total * 100);
        data.push({data: series, color: pts.c });
        data.push({data: [
            [from, 0],
            [from, 10000],
            [to - 1, 10000],
            [to - 1, 0]
        ], color: pts.c,
            lines: {show: true, fill: false, steps: true, lineWidth: 1},
        });

        ranges.push(range);
    }

    for (var i in points) {
        var pts = points[i];
        if (pts.from > pts.to) {
            var tmp = pts.from;
            pts.from = pts.to;
            pts.to = tmp;
        }
        range(pts);
    }
//    if (data.length == 0) {
    data.push({data: raw_data.data, lines: {show: true, fill: false}});
//    }
    if (facs_lane.canvas_metadata) {
        facs_lane.canvas_metadata.data = data;
    }
}

scb.ui.static.FacsView.evaluate_chart = function (state) {
    if (!state.facs_lane.canvas_metadata) {
        var canvas_metadata = {
            data: [
                { label: "Foo", data: [
                    [10, Math.random() * 1],
                    [17, Math.random() * -14],
                    [30, Math.random() * 5]
                ] },
                { label: "Bar", data: [
                    [11, Math.random() * 13],
                    [19, Math.random() * 11],
                    [30, Math.random() * -7]
                ] }
            ],
            options: {
                series: {
                    lines: { show: true },
                    points: { show: true }
                }
            }
        }
        var model = new scb.components.ModelFactory(state.context.template);
        model.facs.compute(state);

        state.facs_lane.canvas_metadata = state.data ? state.data : canvas_metadata;
        state.facs_lane.canvas_metadata_analysis.raw_data = state.facs_lane.canvas_metadata.data;
    }
    state.facs_lane.canvas_metadata.options.hooks = { bindEvents: [ function (plot, eventHolder) {
        var xaxes = plot.getXAxes()[0];
        var yaxes = plot.getYAxes()[0];
        var sensitivity = 4;

        var click = function (e) {
            var px = xaxes.c2p(e.clientX - e.srcElement.getBoundingClientRect().left - plot.pointOffset({x: 0, y: 0}).left);
            var py = yaxes.c2p(e.offsetY);
            px = Math.round(px);
            if (state.facs.sample_analysis) {
                console.info("Click on: " + px + " " + py);
                var point = Math.round(px);
                if (!Number.isNaN(from)) {
                    var to = px;
                    if (point_to_edit) {
                        if (Math.abs(point_to_edit.from - from) < sensitivity) {
                            point_to_edit.from = to;
                        } else {
                            point_to_edit.to = to;
                        }
                    }
                    else {
                        state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to)});
                    }
                    point_to_edit = null;
                    //state.facs_lane.canvas_metadata_analysis.points.push(Math.round(to));
                    scb.ui.static.FacsView.reevaluate_metadata(state);
                    state.facs.apply_dna_analysis_to_all = false;
                    from = NaN;
                    $('.scb_s_facs_chart_helper').text('');

                    scb.ui.static.MainFrame.refresh();

                }
            }
        };
        var match = function (px) {
            var point = _.find(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                var overlap = Math.abs(px - e.from) < 4 || Math.abs(px - e.to) < sensitivity;
                return overlap;
            });
            return point;
        }
        var from = NaN;
        var from_point = null;
        var point_to_edit = null;
        var move = function (e) {
            var px = xaxes.c2p(e.clientX - e.srcElement.getBoundingClientRect().left - plot.pointOffset({x: 0, y: 0}).left);
            var py = yaxes.c2p(e.offsetY);
            px = Math.round(px);
            console.info(px + " " + e.which + " " + from + " " + point_to_edit);
            if (state.facs.sample_analysis) {
                window._dump_event = e;
                if (e.which == 1 && Number.isNaN(from)) {
                    console.info("SET FROM " + px);
                    from = px;
                    from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().left) };

                    var point = match(px);
                    point_to_edit = point;
                }
                if (e.which == 1 && !Number.isNaN(from)) {
                    var to_point = {
                        top: (e.clientY - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().left)
                    };
                    var styles = {
                        position: 'absolute',
                        top: Math.min(from_point.top, to_point.top) + "px",
                        left: Math.min(from_point.left, to_point.left) + "px",
                        height: point_to_edit ? '0px' : Math.abs(from_point.top - to_point.top) + "px",
                        width: Math.abs(from_point.left - to_point.left) + "px",
                        'border': (point_to_edit ? ('1px dashed ' + point_to_edit.c) : '2px dashed #a0a0a0')
                    }
                    console.info(styles);
                    $('.scb_s_facs_chart_helper').css(styles);
                    if (point_to_edit) {
                        console.info("ew" + px);
                        $(plot.getPlaceholder()).css('cursor', 'ew-resize');
                    }
                    else {
                        console.info("pt" + px);
                        $(plot.getPlaceholder()).css('cursor', 'pointer');
                    }
                }
                if (e.which == 0 && Number.isNaN(from)) {
                    // is it over line?
                    var point = match(px);
                    if (point) {
                        console.info("ew" + px);
                        $(plot.getPlaceholder()).css('cursor', 'ew-resize');
                    }
                    else {
                        console.info("pt" + px);
                        $(plot.getPlaceholder()).css('cursor', 'pointer');
                    }
                    console.info(point);
                }
                if (e.which == 0 && !Number.isNaN(from)) {
                    // is it over line?
                    console.info("SET TO " + px);
                    var to = px;
                    state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to)});
                    //state.facs_lane.canvas_metadata_analysis.points.push(Math.round(to));
                    scb.ui.static.FacsView.reevaluate_metadata(state);
                    state.facs.apply_dna_analysis_to_all = false;
                    from = NaN;
                    scb.ui.static.MainFrame.refresh();
                }
            }
        }
        eventHolder.click(click);
        eventHolder.mousemove(move);

    }
    ]
    };
    scb.ui.static.FacsView.reevaluate_metadata(state);

    $.plot(state.chart, state.facs_lane.canvas_metadata.data, state.facs_lane.canvas_metadata.options);
};

scb.ui.static.FacsView.charts = function (workarea) {
    $('.scb_s_facs_chart').each(function () {

        var chart = $(this);
        var parsed = scb.ui.static.FacsView.parse(this);
        parsed.chart = chart;
        scb.ui.static.FacsView.evaluate_chart(parsed);
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
            if (state.facs && state.facs.selected_lane) {
                scb.ui.static.FacsView.reevaluate_metadata({facs: state.facs, facs_lane: state.facs.selected_lane});
            }
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
            kinds: template.facs_kinds,
            can_prepare_lysate: can_prepare_lysate
        }));
        document.title = "FACS - StarCellBio";

        if (kind == 'sample_prep') {
            if (_.keys(template.lysate_kinds).length == 1) {
                $('button.scb_f_facs_sample_remove').hide();
            }

        }
        if (state.facs.samples_finished) {
            scb.ui.static.FacsView.charts(workarea);
        }
        else {
            $('.scb_s_facs_samples_graph_area').css('opacity', '.25');
        }

        if (state.facs.selected_lane && state.facs.selected_lane.canvas_metadata_analysis.points.length > 0) {
            $('.scb_s_facs_tools_instructions_followup').hide();
            scb.ui.static.FacsView.scb_s_facs_tools_instructions_show(false);
        }

    }
}