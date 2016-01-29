scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.FacsView = scb.ui.static.FacsView || {};
scb.ui.static.FacsView.TOTAL_TABS = 4;
scb.ui.static.FacsView.TOTAL_STEPS = 5;
scb.ui.static.FacsView.TOTAL_SCROLL = 5;


scb.ui.static.FacsView.MAX_GATE = 150;


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
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');
    parsed.facs.is_cell_treatment_enabled[cell_treatment_id] = val;
    if(val === 'checked') {
        $('.scb_f_facs_select_lysate_type', $(element).parent().parent()).each(function (e) {
            scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this);
        });
    }else{
        /*want to remove the FacsLane*/
        var lanes = _.filter(parsed.facs.lanes_list.list, function (lane) {
            return cell_treatment_id == lane.cell_treatment_id
        });
        _.each(lanes,function(lane){
            parsed.facs.lanes_list.remove(lane.id);
        });
    }
    parsed.facs.prep_scroll = $('.scb_s_facs_samples_table').scrollTop();
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.FacsView.scb_f_facs_cell_treatment_radio = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.prep_scroll = $('.scb_s_facs_samples_table').scrollTop();
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    /* val is 'fixed' or 'live' */
    var val = $(element).val();
    var cell_treatment_id = $(element).attr('cell_treatment_id');
    /* map_key is "cell_treatment.id_[lane.id]" */
    var map_key = $(element).attr('map_key');
    parsed.facs.is_cell_treatment_live[map_key] = val;

    $('.scb_f_facs_select_lysate_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this);
    });
    parsed.facs.prep_scroll = $('.scb_s_facs_samples_table').scrollTop();
    event = true;
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_f_facs_select_lysate_type = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.prep_scroll = $('.scb_s_facs_samples_table').scrollTop();
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var slide_type = $(element).attr('value');
    if (slide_type == '') {
        return;
    }
    var avail_conditions = [];
    var lane_id = $(element).attr('lane_id');
    /* cell_treatment_id identifies the sample (analysis, conditions are not involved) */
    var cell_treatment_id = $(element).attr('cell_treatment_id');
    var lanes = _.filter(parsed.facs.lanes_list.list, function(lane) {
        return lane.kind == slide_type && cell_treatment_id == lane.cell_treatment_id
    });

    var cell_treatment_list = parsed.experiment.cell_treatment_list;
    /* Want to find the number of conditions available for this cell_treatment */
    var facs_kinds = _.filter(cell_treatment_list.list , function(lane){
        return lane.id == cell_treatment_id; })[0].treatment_list.first.facs;

    /* Find a list of available conditions for this slide type */
    if (_.isEmpty(facs_kinds)) {
        avail_conditions = _.keys(parsed.assignment.template.facs_kinds[slide_type].conditions);
    } else {
        avail_conditions = facs_kinds[slide_type];

    }

    /* Want to check if there are more (than already chosen) conditions available for this sample) */
    if (lanes.length >= avail_conditions.length) {

        $('html').css('overflow', 'hidden');
        $('body').prepend(scb_experiment_setup.general_error_overlay());

        $.jqDialog.alert("You've already selected this option.",
            function () {
                $('html').css('overflow', 'visible');
                $('.error_overlay').remove();
                scb.ui.static.MainFrame.refresh();
                /* callback function for 'OK' button*/
            });
        $('.jqDialog_header').remove();
        $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
        $('#jqDialog_box').attr('role', 'alertdialog');
        return;
    }


    if (lane_id == '') {/*This means that the Lane does not 'exist' yet*/
        var line;
        if (_.size(avail_conditions) == 1) {
            var slide_conditions_val = avail_conditions[0];
            line = parsed.facs.lanes_list.start({
                kind: slide_type,
                conditions: slide_conditions_val,
                cell_treatment_id: cell_treatment_id,
                experiment_id: parsed.experiment.id,
                live: parsed.facs.is_cell_treatment_live[cell_treatment_id+'_']
            });
        }
        else {
            line = parsed.facs.lanes_list.start({
                kind: slide_type,
                cell_treatment_id: cell_treatment_id,
                experiment_id: parsed.experiment.id,
                live: parsed.facs.is_cell_treatment_live[cell_treatment_id + '_']
            });
        }
        var cell_treatment_id = $(element).attr('cell_treatment_id');
        var map_key = cell_treatment_id + '_' + line.id;
        parsed.facs.is_cell_treatment_live[map_key] = parsed.facs.is_cell_treatment_live[cell_treatment_id + '_'];


    }
    else {
        parsed.facs.lanes_list.get(lane_id).kind = slide_type;
    }
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_f_facs_add_all_conditions = function (element, event) {
    /* Select all conditions for all types/kinds */
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.prep_scroll = $('.scb_s_facs_samples_table').scrollTop();

    var cell_treatment_id = $(element).attr('cell_treatment_id');
    var lanes = _.filter(parsed.facs.lanes_list.list, function(lane) {
        return cell_treatment_id == lane.cell_treatment_id
    });
    var facs_kinds = parsed.assignment.template.facs_kinds;
    _.each(_.keys(facs_kinds), function(kind){
        var conditions = _.keys(facs_kinds[kind].conditions);

        _.each(conditions, function(condition){
            /* find if a lane exists with this condition */
            var lane = _.find(lanes, function(lane){
                return lane.conditions === condition
            });
            if (typeof lane === 'undefined'){
                parsed.facs.lanes_list.start({
                    kind: kind,
                    conditions: condition,
                    cell_treatment_id: cell_treatment_id,
                    experiment_id: parsed.experiment.id
                });
            }
        });
        /* want to remove any lanes that did not have condition selected */
        var lanes_no_cond = _.filter(lanes, function(lane){
            return lane.conditions == null
        });
        _.each(lanes_no_cond, function(lane){
            parsed.facs.lanes_list.remove(lane.id);
        });
    });
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_f_facs_select_conditions = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed = resetScrollValue(parsed);
	parsed.facs.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var lane_conditions = $(element).attr('value');

    if (lane_conditions == '') {
        return;
    }
    var lane_id = $(element).attr('lane_id');
    var current_lane = parsed.facs.lanes_list.get(lane_id);
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    var lanes_list= _.filter(parsed.facs.lanes_list.list, function(lane){
        return lane.kind == current_lane.kind && cell_treatment_id == lane.cell_treatment_id;
    });

    for (var index = 0; index < lanes_list.length; index++) {
        if (lanes_list[index].conditions == lane_conditions) {
            $('html').css('overflow', 'hidden');
            $('body').prepend(scb_experiment_setup.general_error_overlay());

            $.jqDialog.alert("You've already selected this condition option.",
                function () {
                    $('html').css('overflow', 'visible');
                    $('.error_overlay').remove();
                    /* callback function for 'OK' button*/
                    scb.ui.static.MainFrame.refresh();
                });
            $('.jqDialog_header').remove();
            $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
            $('#jqDialog_box').attr('role', 'alertdialog');
            return;

        }

    }
    current_lane.conditions = lane_conditions;

    /* When condition selected for this Lane, want to enable conditions for the placeholder below*/
    var placeholder=$('span.scb_f_facs_select_lysate_type[cell_treatment_id="' + cell_treatment_id + '"][lane_kind="placeholder"]');
    /* Want to check if there is a placeholder*/
    if(placeholder.length>0) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(placeholder);
    }

    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_f_facs_prepare_lysates = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var rows_state = parsed.facs.rows_state();
    if (rows_state && rows_state.valid < 1) {
        $('html').css('overflow', 'hidden');

        $('body').prepend(scb_experiment_setup.general_error_overlay());


        $.jqDialog.alert("Please select at least 1 sample to prepare.", function () {
            $('html').css('overflow', 'visible');
            $('.error_overlay').remove();
            /* callback function for 'OK' button*/
        });
        $('.jqDialog_header').remove();
        $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
        $('#jqDialog_box').attr('role', 'alertdialog');
    }
    else {
        /* want to find the first lane in the list that is valid
           and select it */
        var valid_lane = _.find(rows_state.rows, function(r){
            return r.is_valid ;
        });
        parsed.facs.lane_selected = valid_lane.lane.id;
        parsed.facs.sample_prepared = true;
        scb.ui.static.MainFrame.refresh();
    }
}


scb.ui.static.FacsView.scb_f_facs_sample_active_all = function (element, event) {
    $('.scb_f_facs_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', 'checked');
        scb.ui.static.FacsView.scb_f_facs_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.scb_f_facs_sample_inactive_all = function (element) {
    $('.scb_f_facs_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', false);
        scb.ui.static.FacsView.scb_f_facs_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();

}


scb.ui.static.FacsView.scb_f_facs_run_samples = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_finished = true;
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if (parsed.facs.samples_finished) {
        parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();
        $('li', $(element).parent()).removeClass('scb_s_facs_sample_selected');
        $(element).addClass('scb_s_facs_sample_selected');
        parsed.facs.lane_selected = parsed.facs_lane.id;
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_s_facs_selected = function (element) {

    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if ($(element).text().length <= 1) {
        scb.ui.static.MainFrame.refresh();
    }
    else {
        parsed.facs.name = $(element).val();
    }
}

scb.ui.static.FacsView.scb_s_western_blot_gel_tab = function (element) {

    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.facs.lane_selected = parsed.facs_lane.id;
    parsed.facs.is_tab_selected[parsed.facs.selected_lane.cell_treatment_id] = parsed.facs.lane_selected;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_f_facs_tools_start_analysis = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();

    parsed.facs.show_analysis = true;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_s_facs_single_range_button = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();
    parsed.facs.sample_analysis =  !parsed.facs.sample_analysis;
    parsed.facs.double_analysis = false;
    scb.ui.static.MainFrame.refresh();
};

scb.ui.static.FacsView.scb_s_facs_double_range_button = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();
    parsed.facs.double_analysis =  !parsed.facs.double_analysis;
    parsed.facs.sample_analysis = false;
    scb.ui.static.MainFrame.refresh();
};


scb.ui.static.FacsView.scb_f_facs_note_close_button= function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();
    var note = $(element).attr('note');
    note = '.' + note;
    $(note).slideUp('400', function () {
        parsed.facs.instructions_show_state = $('.scb_s_facs_tools_instructions_followup').is(":visible");
        parsed.facs.samples_show_state = $('.scb_s_facs_tools_samples_followup').is(":visible");
        scb.ui.static.MainFrame.refresh();
    });
		
}


scb.ui.static.FacsView.scb_f_facs_sample_remove = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.prep_scroll = $('.scb_s_facs_samples_table').scrollTop();

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var cell_treatment_id = '';
    var lysate_id = $(element).attr('lane_id');

     /* Find cell_treatment_id for this sample*/
    _.each(parsed.facs.lanes_list.list, function (lane) {
        if (lysate_id == lane.id) {
            cell_treatment_id = lane.cell_treatment_id;
        }
    });
    /* Delete this Lane from the lanes_list*/
    parsed.facs.lanes_list.remove(lysate_id);

    /*
     * If this is the only Lane for this CellTreatment,
     * then remove it from the list of enabled samples
     */
    var lanes = _.filter(parsed.facs.lanes_list.list, function (lane) {
        return cell_treatment_id == lane.cell_treatment_id
    });
    if (lanes.length < 1) {
        parsed.facs.is_cell_treatment_enabled[cell_treatment_id] = false;
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.FacsView.scb_f_facs_tools_toggle = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    var note = $(element).attr('note');
    note = '.' + note;
    parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();

    $(note).slideDown('400', function () {
        parsed.facs.instructions_show_state = $('.scb_s_facs_tools_instructions_followup').is(":visible");
        parsed.facs.samples_show_state = $('.scb_s_facs_tools_samples_followup').is(":visible");
        scb.ui.static.MainFrame.refresh();
    });
}

scb.ui.static.FacsView.scb_f_facs_analyze_remove_point = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.samples_scroll = $(".scb_s_facs_choose_samples_order_list").scrollTop();

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var from = parseFloat($(element).attr('from'));
    var to = parseFloat($(element).attr('to'));
    parsed.facs_lane.canvas_metadata_analysis.points = parsed.facs_lane.canvas_metadata_analysis.points ? parsed.facs_lane.canvas_metadata_analysis.points : [];
    var element = _.find(parsed.facs_lane.canvas_metadata_analysis.points, function (e) {
        return e.from == from && e.to == to;
    });
    var elements = _.filter(parsed.facs_lane.canvas_metadata_analysis.points, function (e) {
        return e.display_id == element.display_id;
    })
    if (elements.length > 1) {
        parsed.facs_lane.bisector_gate_created = false;
        parsed.facs_lane.canvas_metadata_analysis.points = _.without(
            parsed.facs_lane.canvas_metadata_analysis.points, elements[0]
        );
        parsed.facs_lane.canvas_metadata_analysis.points = _.without(
            parsed.facs_lane.canvas_metadata_analysis.points, elements[1]
        );
    }
    //delete two gates for bisector
    else
        parsed.facs_lane.canvas_metadata_analysis.points = _.without(parsed.facs_lane.canvas_metadata_analysis.points, element);
    scb.ui.static.FacsView.reevaluate_metadata(parsed);
    parsed.facs.apply_dna_analysis_to_all = false;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_f_facs_apply_to_all = function (element) {
    //ADD APPLY ALL BISECTOR_GATE_CREATED GATE CREATED
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.apply_dna_analysis_to_all = $(element).attr('checked') == 'checked';
    if (parsed.facs.apply_dna_analysis_to_all) {
        _.each(parsed.facs.lanes_list.list, function (facs_lane) {
            facs_lane.canvas_metadata_analysis.points = JSON.parse(JSON.stringify(parsed.facs_lane.canvas_metadata_analysis.points));
            facs_lane.exp_id = parsed.facs_lane.exp_id;
            facs_lane.bisector_gate_created = parsed.facs_lane.bisector_gate_created;
            scb.ui.static.FacsView.evaluate_chart({
                assignment: parsed.assignment,
                facs: parsed.facs,
                facs_lane: facs_lane,
                context: parsed.context
            });
        });
        scb.ui.static.MainFrame.refresh();
    }

}

scb.ui.static.FacsView.scb_s_facs_left_facs = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.parent.start_tabs_index = parsed.facs.parent.start_tabs_index - 1;
    scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.FacsView.scb_s_facs_right_facs = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    parsed.facs.parent.start_tabs_index = parsed.facs.parent.start_tabs_index + 1;
    scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.FacsView.scb_s_facs_add_facs = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.facs.parent.list.length == scb.ui.static.FacsView.TOTAL_TABS) {
        parsed.facs.parent.start_tabs_index = 1;
    }
    else if (parsed.facs.parent.list.length > scb.ui.static.FacsView.TOTAL_TABS)
        parsed.facs.parent.start_tabs_index = parsed.facs.parent.length - (scb.ui.static.FacsView.TOTAL_TABS - 1);
    scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.FacsView.scb_f_facs_remove = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var id_list = [];
    for (var x = 0; x < parsed.experiment.facs_list.list.length; x++) {
        id_list.push(parsed.experiment.facs_list.list[x].id);
    }
    parsed.state.index = id_list.indexOf(parsed.facs.id);


    parsed.experiment.facs_list.remove(parsed.facs.id);


    if (parsed.state.index == parsed.experiment.facs_list.list.length) {
        parsed.state.index = parsed.state.index - 1;
    }
    //fix tab indexing for display
    if (parsed.state.index > parsed.experiment.facs_list.list.length - scb.ui.static.FacsView.TOTAL_TABS) {

        if (
            (
                parsed.experiment.facs_list.list.length == scb.ui.static.FacsView.TOTAL_TABS + 1 ||
                parsed.experiment.facs_list.list.length == scb.ui.static.FacsView.TOTAL_TABS + 2
            ) &&
            parsed.experiment.facs_list.start_tabs_index <= 1
           )
            parsed.experiment.facs_list.start_tabs_index = parsed.experiment.facs_list.start_tabs_index + 1;
        else parsed.experiment.facs_list.start_tabs_index = parsed.experiment.facs_list.start_tabs_index - 1;
    }
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);


}

scb.ui.static.FacsView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_sample_active', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_sample_active_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active_all(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_sample_inactive_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_inactive_all(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_prepare_lysates', function (e) {
        scb.ui.static.FacsView.scb_f_facs_prepare_lysates(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_single_range_button', function (e) {
        scb.ui.static.FacsView.scb_s_facs_single_range_button(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_double_range_button', function (e) {
        scb.ui.static.FacsView.scb_s_facs_double_range_button(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_select_lysate_type', function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_select_conditions', function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_conditions(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_add_all_conditions', function (e) {
        scb.ui.static.FacsView.scb_f_facs_add_all_conditions(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_run_samples', function (e) {
        scb.ui.static.FacsView.scb_f_facs_run_samples(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_gel_tab', function (e) {
        scb.ui.static.FacsView.scb_s_western_blot_gel_tab(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_sample_remove', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_remove(this);
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_facs_run_samples_short', function (e) {
        scb.ui.static.FacsView.scb_f_facs_run_samples(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_remove', function (e) {
        scb.ui.static.FacsView.scb_f_facs_remove(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_choose_samples_order_list>li', function (e) {
        scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select(this, e);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_facs_selected', function (e) {
        $('.scb_s_facs_selected').text($('.scb_s_facs_selected').attr('value'));
        scb.ui.static.FacsView.scb_s_facs_selected(this);
    });
    scb.utils.off_on(workarea, 'keydown', '.scb_s_facs_selected', function (e) {
        if ($('.scb_s_facs_selected').text().length <= 10) {
        }
        else {
            $('.scb_s_facs_selected').text();
            e.preventDefault();
            this.textContent = this.textContent.substring(0, this.textContent.length - 1)
            return false;
        }
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_left_facs', function (e) {
        scb.ui.static.FacsView.scb_s_facs_left_facs(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_right_facs', function (e) {
        scb.ui.static.FacsView.scb_s_facs_right_facs(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_add_facs', function (e, ui) {
        scb.ui.static.FacsView.scb_s_facs_add_facs(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_tools_start_analysis', function (e) {
        scb.ui.static.FacsView.scb_f_facs_tools_start_analysis(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_tools_toggle', function (e) {
        scb.ui.static.FacsView.scb_f_facs_tools_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_note_close_button', function (e) {
        scb.ui.static.FacsView.scb_f_facs_note_close_button(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_analyze_remove_point', function (e) {
        scb.ui.static.FacsView.scb_f_facs_analyze_remove_point(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_apply_to_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_apply_to_all(this);
    });
    scb.utils.off_on(workarea, 'mouseup', document, function (e, ui) {
        var container = $(".scb_f_controls_note");
        container.slideUp(); // hide
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_controls_note', function (e, ui) {
        e.stopPropagation();
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_info_icon', function (e, ui) {
        e.stopPropagation();
        var note = $(this).attr('note');
        note = '.' + note;
        if ($(note).is(":visible"))
            $(note).slideUp();
        else $(note).slideDown();
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_cell_treatment_radio', function (e) {
        scb.ui.static.FacsView.scb_f_facs_cell_treatment_radio(this);
    });


}

scb.ui.static.FacsView.reevaluate_metadata = function (state) {
    var facs_lane = state.facs_lane;
    facs_lane.canvas_metadata_analysis.points = facs_lane.canvas_metadata_analysis.points ? facs_lane.canvas_metadata_analysis.points : [];
    facs_lane.canvas_metadata_analysis.ranges = [];
    var ranges = facs_lane.canvas_metadata_analysis.ranges;
    var points = facs_lane.canvas_metadata_analysis.points;
    var raw_data = scb.utils.get(facs_lane, ['canvas_metadata_analysis', 'raw_data', 0], []);
    var data = [];
    var template=state.assignment.template;
    points = points.sort(function (a, b) {
        return a.from > b.from;
    });

    colors = ['#000000']

    var total = 0;
    _.each(raw_data.data, function (e) {
        total += e[1];
    });

    function range(pts) {
        var carray = _.difference(colors, _.pluck(points, 'c'));
        var c = carray.length > 0 ? carray[0] : colors[0];
//         if(_.size(state.facs.midpoint) != 0){
//         	c = state.facs.midpoint.color;
//         }

        var from = pts.from;
        var to = pts.to;
        var horizontal = pts.y;
        var new_id = 0;
        var bisector_id = '';
        if (_.size(state.facs.midpoint) != 0) {
            new_id = state.facs.midpoint.display_id;
            bisector_id = 'b';
        }
        else {
            if (!pts.display_id) {

                //new_id = Math.floor(Math.random()*1000000000).toString(27);
                state.facs_lane.exp_id = state.facs_lane.exp_id + 1;
                new_id = state.facs_lane.exp_id;
                state.facs_lane.gates_id = new_id;
                bisector_id = 'a';
            }
        }
        pts.c = pts.c || c;
        pts.display_id = pts.display_id || new_id;
        pts.bisector_id = pts.bisector_id || bisector_id;
        pts.unique_id = pts.unique_id || Math.floor(Math.random()*1000000000).toString(27);

        var scaled_from=pts.from;
        var scaled_to=pts.to;
        if(template.model.facs.scale && (template.model.facs.scale.indexOf("pseudo") > -1)){
            scaled_from = Math.round(Math.pow(10, pts.from/50.0));//50 is a step size
            scaled_to = Math.round(Math.pow(10, pts.to/50.0));
        }
        
        /*display_from and display_to represent the value of the gate that will be displayed in the template.
        * For pseudo-logarithmic scale their values are modified to replicate logarithmic scale values */
        var range = {
            from: pts.from,
            to: pts.to,
            display_from: scaled_from,
            display_to: scaled_to,
            color: pts.c,
            display_id: pts.display_id,
            bisector_id: pts.bisector_id,
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

        var bisector_points = _.filter(points, function (x) {
            return x.display_id == pts.display_id && state.facs_lane.bisector_gate_created;
        });

        _.each(points, function (p) {
            if (bisector_points.length == 2) {
                if (p != bisector_points[0] && p != bisector_points[1])
                    p.bisector_id = '';
            }
            else if (!state.facs_lane.bisector_gate_created) {
                p.bisector_id = '';
            }

        });


        if (range.bisector_id == 'b') {
            range.percentage = 100 - _.find(ranges, function (x) {
                return x.bisector_id == 'a'
            }).percentage;
        }
        else
            range.percentage = Math.round(percentage / total * 100);
        //data.push({data: series, color: pts.c });
        data.push({
            label: pts.display_id + ' ' + pts.bisector_id,
            data: [
                [from, horizontal],
                [from, horizontal + 5],
                [from, horizontal + 2.5],
                [to, horizontal + 2.5],
                [to, horizontal + 5],
                [to, horizontal]
            ], grid: {show: false},
            xaxis: {tickSize: 5},
            color: pts.c,
            lines: {show: true, fill: false, steps: true, lineWidth: 1}
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
    ranges = _.sortBy(ranges, function (obj) {
        return obj.display_id;
    });
    state.facs_lane.canvas_metadata_analysis.ranges = _.sortBy(state.facs_lane.canvas_metadata_analysis.ranges, function (obj) {
        return obj.display_id;
    });

    var count_of_gates_per_id = _.countBy(state.facs_lane.canvas_metadata_analysis.ranges, function (obj) {
        return obj.display_id;
    });
    data.push({data: raw_data.data, grid: {show: false}, xaxis: {tickSize: 5}, lines: {show: true, fill: false}});
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
            grid: {show: false},
            xaxis: {tickSize: 5},
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
        /* Old assignments do not have max value given, they were using the value of a constant MAX_VALUE=150*/
        var max_x = state.assignment.template.model.facs.max;
        max_x = max_x ? max_x : 150;
        
        if (state.facs.samples_finished && state.facs_lane.selected_gate) {
            var selected_gate = state.facs.selected_lane.selected_gate;
            var number_of_gates = _.filter(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                return e.display_id == selected_gate.display_id
            });

            var isdoublegate = number_of_gates.length == 2;

            if (isdoublegate) {
                var selected_gate = null;
                if (number_of_gates[0].from < number_of_gates[1].from) {
                    selected_gate = number_of_gates[0];
                }
                else {
                    selected_gate = number_of_gates[1];
                }

                var from_val = Math.round(xaxes.p2c(selected_gate.from));
                var to_val = Math.round(xaxes.p2c(selected_gate.to));
                var height_val = Math.round(yaxes.p2c(selected_gate.y));
                var styles_guider = {
                    position: 'absolute',
                    top: height_val + 24 + 'px',
                    left: to_val + 53 + "px",
                    height: '6px', //'5px',
                    color: 'black',
                    background: 'black',
                    width: "5px",
                    'border-left': 'none',
                    'border-right': 'none',
                    'vertical-align': 'center'
                }
                $('.scb_s_facs_chart_guider').css(styles_guider);
            }
            else {
                if (selected_gate.from) {

                    var from_val = Math.round(xaxes.p2c(selected_gate.from));
                    var to_val = Math.round(xaxes.p2c(selected_gate.to));
                    var height_val = Math.round(yaxes.p2c(selected_gate.y));
                    var styles_guider = {
                        position: 'absolute',
                        top: height_val + 16 + 'px',
                        left: from_val + 53 + "px",
                        height: '6px', //'5px',
                        color: 'black',
                        background: 'transparent',
                        width: Math.abs(to_val - from_val) - 6 + "px",
                        'border-left': '5px solid ' + 'black',
                        'border-right': '5px solid ' + 'black',
                        'vertical-align': 'center',
                    }

                    $('.scb_s_facs_chart_guider').css(styles_guider);
                }
            }
        }

        var click = function (e) {
            var srcElement = e.srcElement || e.target;
            var px = xaxes.c2p(e.clientX - srcElement.getBoundingClientRect().left - plot.pointOffset({x: 0, y: 0}).left);
            var py = yaxes.c2p(e.offsetY);
            var fromy = py > 16 ? py : 16;
            fromy = fromy > 90 ? 90 : fromy;
            px = Math.round(px);
            if (!state.facs.double_analysis) {
                console.info("Click on: " + px + " " + py);
                if (!isNaN(from)) {
                    var to = px;

                    if(to < 0){
                        to = 0;
                    }else if(to > max_x){
                        to = max_x;
                    }
                    /* point to edit is defined only an existing gate bound is dragged */
                    /* Last point to hover over */
                    if (point_to_edit) {
                        _.each(state.facs_lane.canvas_metadata_analysis.points, function (x) {
                            if (
                                point_to_edit.from == x.to &&
                                Math.abs(point_to_edit.y - x.y) == 5 &&
                                Math.abs(from - x.to) < sensitivity
                               )
                            {
                                x.to = to;
                            } else if (
                                point_to_edit.to == x.from &&
                                Math.abs(point_to_edit.y - x.y) < 16 &&
                                Math.abs(from - x.from) < sensitivity
                                )
                            {
                                x.from = to;
                            }
                        });
                        if (Math.abs(point_to_edit.from - from) < sensitivity) {
                            point_to_edit.from = to;
                        } else {
                            point_to_edit.to = to;
                        }
                        /* number of gates for this gate_id, can be 1 or 2 */
                        var number_of_gates = _.filter(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                            return e.display_id == point_to_edit.display_id
                        });

                        if (number_of_gates.length == 2) { /* this gate is a double gate */
                            var selected_gate = null;
                            if (number_of_gates[0].from < number_of_gates[1].from) {
                                selected_gate = number_of_gates[0];
                            }
                            else {
                                selected_gate = number_of_gates[1];
                            }

                            var from_val = Math.round(xaxes.p2c(selected_gate.from));
                            var to_val = Math.round(xaxes.p2c(selected_gate.to));
                            var height_val = Math.round(yaxes.p2c(selected_gate.y));
                            var styles_guider = {
                                position: 'absolute',
                                top: height_val + 24 + 'px',
                                left: to_val + 53 + "px",
                                height: '6px', //'5px',
                                color: 'black',
                                background: 'black',
                                width: "5px",
                                'border-left': 'none',
                                'border-right': 'none',
                                'vertical-align': 'center'
                            }
                            $('.scb_s_facs_chart_guider').css(styles_guider);
                        } else {
                            if (point_to_edit.from) {

                                var from_val = Math.round(xaxes.p2c(point_to_edit.from));
                                var to_val = Math.round(xaxes.p2c(point_to_edit.to));
                                var height_val = Math.round(yaxes.p2c(point_to_edit.y));
                                var styles_guider = {
                                    position: 'absolute',
                                    top: height_val + 16 + 'px',
                                    left: from_val + 53 + "px",
                                    height: '6px', //'5px',
                                    color: 'black',
                                    background: 'transparent',
                                    width: Math.abs(to_val - from_val) - 6 + "px",
                                    'border-left': '5px solid ' + 'black',
                                    'border-right': '5px solid ' + 'black',
                                    'vertical-align': 'center'
                                }
                                state.facs_lane.gate_selected = point_to_edit.unique_id;
                                $('.scb_s_facs_chart_guider').css(styles_guider);
                            }
                        }

                    }
                    else {
                        /* sample_analysis is set to true when (only) single gate is selected */
                        /* after the single gate was placed want to set sample_analysis back to false */
                        state.facs.sample_analysis = false;
                        /* need from and 'to' to go from left to right*/
                        if (from > to){
                            var swap = to;
                            to = from;
                            from = swap;
                        }
                        state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to), y: Math.round(fromy)});
                    }
                    var unique_id = null;

                    if (point_to_edit) {
                        unique_id = point_to_edit.unique_id;
                    }
                    point_to_edit = null;
                    scb.ui.static.FacsView.reevaluate_metadata(state);
                    var gate_selected=_.find(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                        return (e.from == from && e.to == to) || (unique_id && unique_id == e.unique_id)
                    });
                    state.facs_lane.gate_selected = gate_selected.unique_id;
                    state.facs.apply_dna_analysis_to_all = false;
                    from = NaN;
                    $('.scb_s_facs_chart_helper').text('');

                    scb.ui.static.MainFrame.refresh();

                }
                else {
                    /* from was not set, user just clicked on the plot or clicked and dragged but gate
                    * button was not selected */
                    var selected_gate = _.filter(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                        return px <= e.to && px >= e.from && Math.abs(e.y - py) <= sensitivity
                    });
                    if (selected_gate.length >= 1) {
                        selected_gate = selected_gate[0];
                        state.facs_lane.gate_selected = selected_gate.unique_id;
                    }
                    var number_of_gates = _.filter(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                        return e.display_id == selected_gate.display_id
                    });

                    if (number_of_gates.length == 2) { /* double gate */
                        if (number_of_gates[0].from < number_of_gates[1].from) {
                            selected_gate = number_of_gates[0];
                        }
                        else {
                            selected_gate = number_of_gates[1];
                        }

                        var from_val = Math.round(xaxes.p2c(selected_gate.from));
                        var to_val = Math.round(xaxes.p2c(selected_gate.to));
                        var height_val = Math.round(yaxes.p2c(selected_gate.y));
                        var styles_guider = {
                            position: 'absolute',
                            top: height_val + 24 + 'px',
                            left: to_val + 53 + "px",
                            height: '6px', //'5px',
                            color: 'black',
                            background: 'black',
                            width: "5px",
                            'border-left': 'none',
                            'border-right': 'none',
                            'vertical-align': 'center',
                        }
                        $('.scb_s_facs_chart_guider').css(styles_guider);

                    }
                    else {
                        if (selected_gate.from) {

                            var from_val = Math.round(xaxes.p2c(selected_gate.from));
                            var to_val = Math.round(xaxes.p2c(selected_gate.to));
                            var height_val = Math.round(yaxes.p2c(selected_gate.y));
                            var styles_guider = {
                                position: 'absolute',
                                top: height_val + 16 + 'px',
                                left: from_val + 53 + "px",
                                height: '6px', //'5px',
                                color: 'black',
                                background: 'transparent',
                                width: Math.abs(to_val - from_val) - 6 + "px",
                                'border-left': '5px solid ' + 'black',
                                'border-right': '5px solid ' + 'black',
                                'vertical-align': 'center',
                            }
                            $('.scb_s_facs_chart_guider').css(styles_guider);
                        }

                    }


                }
            }
            if (state.facs.double_analysis) {
            	console.log('click double analysis')
                if(state.facs.gate_count == 0){
			from = 0;
			fromy= py > 16 ? py: 16;
			fromy = fromy > 90 ? 90: fromy;
			from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
			left: ($('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left) };

			var point = match(px, py);
			point_to_edit = point;
                	if (!isNaN(from)) {
				var to = px;
				if(to < 0){
					to = 0;
				}else if(to > max_x){
					to = max_x;
				}
				if (point_to_edit) {
					if (Math.abs(point_to_edit.from - from) < sensitivity) {
						point_to_edit.from = to;
					} else {
						point_to_edit.to = to;
					}
				}else {
					state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to), y: Math.round(fromy)});
				}
				point_to_edit = null;
				state.facs_lane.bisector_gate_created = true; 
				scb.ui.static.FacsView.reevaluate_metadata(state);
						
				state.facs.apply_dna_analysis_to_all = false;
				$('.scb_s_facs_chart_helper').text('');
				state.facs.midpoint.from = px;
				state.facs.midpoint.from = state.facs.midpoint.from > 0 ? state.facs.midpoint.from : 0;
				state.facs.midpoint.fromy= (py > 16 ? py: 16);
				state.facs.midpoint.fromy = (state.facs.midpoint.fromy > 90 ? 90: state.facs.midpoint.fromy) -5 ;
				state.facs.midpoint.from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
				left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left) };
				state.facs.midpoint.display_id = state.facs_lane.gates_id;

						
				//second gate starts
				console.info("SET FROM " + px);
				from = px;
				if(from < 0){
				    from = 0;
				}else if(from > max_x){
				    from = max_x;
				}
				fromy= (py > 16 ? py: 16);
				fromy = (fromy > 90 ? 90: fromy)-5;
				from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
				left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left) };

				var point = match(px, py-5);
				point_to_edit = point;

				var to = max_x ;
				if(to < 0){
				    to = 0;
				}else if(to > max_x){
				    to = max_x;
				}
				if (point_to_edit) {
					if (Math.abs(point_to_edit.from - from) < sensitivity) {
						point_to_edit.from = to;
					} else {
						point_to_edit.to = to;
					}
				}else {
					state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to), y: Math.round(fromy)});
				}
				var unique_id = null;
				if(point_to_edit){
					unique_id = point_to_edit.unique_id;
				}
				point_to_edit = null;
						
				scb.ui.static.FacsView.reevaluate_metadata(state);
				state.facs_lane.gate_selected = _.find(state.facs_lane.canvas_metadata_analysis.points, function(e){ return (e.from == from && e.to == to) || (unique_id && unique_id == e.unique_id) }).unique_id;

				state.facs.gate_count=0;
				state.facs.midpoint = {};
				state.facs.apply_dna_analysis_to_all = false;
				from = NaN;
				$('.scb_s_facs_chart_helper').text('');
				state.facs.double_analysis = false; 
				$('.scb_s_facs_double_range_button').button('disable');
				scb.ui.static.MainFrame.refresh();

			}
                }

            }
        };
        var match = function (px, py) {
            var point = _.find(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                var overlap = (Math.abs(px - e.from) < 4 || Math.abs(px - e.to) < sensitivity) && (Math.abs(py - e.y) < 3) && e == state.facs_lane.selected_gate;
                return overlap;
            });
            return point;
        }
        var from = NaN;
        var fromy = NaN;
        var from_point = null;
        var point_to_edit = null;
        var move = function (e) {
            var srcElement = e.srcElement || e.target;
            var px = xaxes.c2p(e.clientX - srcElement.getBoundingClientRect().left - plot.pointOffset({x: 0, y: 0}).left);
            var py = yaxes.c2p(e.offsetY);
            px = Math.round(px);
            var button = scb.utils.isDefined(e.buttons) ? e.buttons : e.which;
            console.info(px + " " + from + " " + point_to_edit + " cb=" + button + " b=" + e.button + " bs=" + e.buttons);


            if (!state.facs.double_analysis) {
                window._dump_event = e;
                var point = match(px, py);
                /* button is one if mouse is clicked and dragged */
                if (button == 1 && isNaN(from) && (state.facs.sample_analysis || point)) {
                    console.info("SET FROM " + px);
                    /* from is set here after mouse down */
                    from = px;
                    if(from < 0){
                        from=0;
                    }else if(from> max_x){
                        from=max_x;
                    }
                    fromy = py > 16 ? py : 16;
                    fromy = fromy > 90 ? 90 : fromy;
                    from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left) };

		    point = match(px, py);
		    point_to_edit = point;
		}
		/* Hovering over the canvas */
		if (button == 0 && isNaN(from)) {
		    point = match(px, py);
		    if (point) { /* hover over gate endpoint */
		        $(plot.getPlaceholder()).css('cursor', 'ew-resize');
		    }
		    else {
			$(plot.getPlaceholder()).css('cursor', 'pointer');
		    }
				}
                /* Changing width of already existing gate*/
                if (button == 1 && !isNaN(from)) {
                    var to_point = {
                        top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left)
                    };
                    var left = from_point.left > to_point.left;
                    var styles = {
                        position: 'absolute',
                        top: from_point.top + 'px',
                        left: Math.min(from_point.left, to_point.left) + "px",
                        height: (310 - from_point.top) + 'px', //'5px',
                        color: point_to_edit ? point_to_edit.c : 'black',
                        background: (point_to_edit ? ( left ? 'white' : 'white' ) : 'transparent'),
                        width: Math.abs(from_point.left - to_point.left) + "px",
                        'vertical-align': 'center',
                    }

                    var styles_guider = {
                        position: 'absolute',
                        top: '0px',
                        left: Math.min(from_point.left, to_point.left) + "px",
                        height: 310 + 'px', //'5px',
                        color: point_to_edit ? point_to_edit.c : 'black',
                        background: (point_to_edit ? ( left ? 'white' : 'white' ) : 'transparent'),
                        width: Math.abs(from_point.left - to_point.left) + "px",
                        'border-left': (point_to_edit ? ( left ? '2px solid ' + 'black' : '1px solid black' ) : '2px dashed black'),
                        'border-right': (point_to_edit ? ( !left ? '2px solid ' + 'black' : '1px solid black' ) : '2px dashed black'),
                        'vertical-align': 'center',
                    }
                    console.info(styles);
                    $('.scb_s_facs_chart_helper').css(styles);
                    $('.scb_s_facs_chart_guider').css(styles_guider);
                    if (point_to_edit) {
                        console.info("ew" + px);
                        $(plot.getPlaceholder()).css('cursor', 'ew-resize');
                    }
                    else {
                        console.info("pt" + px);
                        $(plot.getPlaceholder()).css('cursor', 'pointer');
                    }
                }

                if (button == 0 && !isNaN(from)) {
                    /* if the user drew the gate beyond the bounds of the canvas
                    * still create a gate */
                    var to = px;
                    if(to < 0){
                        to = 0;
                    }else if(to > max_x){
                        to = max_x;
                    }
                    state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to), y: Math.round(fromy)});
                    scb.ui.static.FacsView.reevaluate_metadata(state);
                    state.facs.apply_dna_analysis_to_all = false;
                    from = NaN;
                    scb.ui.static.MainFrame.refresh();
                }
            }
            else if (state.facs.double_analysis) {
                console.log('double.analysis for move');
                window._dump_event = e;
                console.log(state.facs.gate_count);
                console.log(from);
                console.info('stats:' + button + '  ' + isNaN(from));
                if (button == 0 && !isNaN(from) && (state.facs.gate_count == 1 || state.facs.gate_count == 2)) {
                    var to_point = {
                        top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left)
                    };
                    var left = from_point.left > to_point.left;
                    var styles = {
                        position: 'absolute',
                        top: from_point.top + 'px',
                        left: Math.min(from_point.left, to_point.left) + "px",
                        height: (310 - from_point.top) + 'px', //'5px',
                        color: point_to_edit ? point_to_edit.c : 'black',
                        background: (point_to_edit ? ( left ? 'white' : 'white' ) : '#808080'),
                        width: Math.abs(from_point.left - to_point.left) + "px",
                        'border-left': (point_to_edit ? ( left ? '2px solid ' + 'black' : '1px solid black' ) : '2px solid black'),
                        'border-right': (point_to_edit ? ( !left ? '2px solid ' + 'black' : '1px solid black' ) : '2px solid black'),
                        'vertical-align': 'center',
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
                //if buttons is released and there is not a starting point, just browsing the screen
                if (button == 0 && isNaN(from)) {
                    var styles = {
                        position: 'absolute',
                        top: '0px',
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left) + "px",
                        height: (310) + 'px', //'5px',
                        background: 'black',
                        width: "2px",
                        'vertical-align': 'center',
                    };

                    $('.scb_s_facs_chart_helper').css(styles);
                    // is it over line?
                    var point = match(px, py);
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
                //if button depressed and there is a starting point 
                if (button == 1 && isNaN(from) && (state.facs.gate_count == 0)) {

//                     console.info("SET FROM " + px);
//                     from = px;
//                     from = from > 0 ? from : 0;
//                     from = from > scb.ui.static.FacsView.MAX_GATE  ? scb.ui.static.FacsView.MAX_GATE  : from;
//                     from = from < 0 ? 0 : from;
//                     fromy= py > 16 ? py: 16;
//                     fromy = fromy > 90 ? 90: fromy;
//                     from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
//                         left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left) };
// 
//                     var point = match(px, py);
//                     point_to_edit = point;

                }
                if (button == 1 && !isNaN(from) && (state.facs.gate_count == 0)) {


//                 	state.facs.gate_count= scb.ui.static.FacsView.MAX_GATE ;
//                     var to_point = {
//                         top: (e.clientY - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().top),
//                         left: (e.clientX - $('.scb_s_facs_chart_wrapper', '.scb_s_facs_view').get(0).getBoundingClientRect().left)
//                     };
//                     var left = from_point.left > to_point.left;
//                     if (point_to_edit) {
//                         console.info("ew" + px);
//                         $(plot.getPlaceholder()).css('cursor', 'ew-resize');
//                     }
//                     else {
//                         console.info("pt" + px);
//                         $(plot.getPlaceholder()).css('cursor', 'pointer');
//                     }


                }
            }
        }
        eventHolder.click(click);
        eventHolder.mousemove(move);

    }
    ],

        draw: [ function (plot, canvascontext) {
            var xaxes = plot.getXAxes()[0];
            var yaxes = plot.getYAxes()[0];

            var points = state.facs_lane.canvas_metadata_analysis.points.length > 0 ? state.facs_lane.canvas_metadata_analysis.points : [];
            _.each(points, function (p) {
                var y_coord = yaxes.p2c(p.y);
                var x_coord = xaxes.p2c((p.to - p.from) / 2 + p.from);
                canvascontext.fillText(p.display_id + ' ' + p.bisector_id, x_coord + 20, y_coord - 2);
            });
            console.log('draw_overlay');


        }
        ]
    };
    scb.ui.static.FacsView.reevaluate_metadata(state);
    if (state.chart) {
        //Canvas is drawn here
        $.plot(state.chart, state.facs_lane.canvas_metadata.data, state.facs_lane.canvas_metadata.options);
    }
};

scb.ui.static.FacsView.charts = function (workarea) {
    $('.scb_s_facs_chart').each(function () {

        var chart = $(this);
        var parsed = scb.ui.static.FacsView.parse(this);
        parsed = resetScrollValue(parsed);

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
                scb.ui.static.FacsView.reevaluate_metadata({
                    facs: state.facs,
                    facs_lane: state.facs.selected_lane,
                    assignment: state.assignment
                });
            }
        }

        state.experiment.last_technique_view = 'facs';
        var scroll_num = 0;
        if ($('.scb_s_facs_samples_table').length == 0)
            scroll_num = scb.ui.static.FacsView.TOTAL_SCROLL;
        else
            scroll_num = $('.scb_s_facs_samples_table', '.scb_s_facs_view').get(0).scrollTop;


        workarea.html(scb_facs.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            context: gstate.context,
            facs: state.facs,
            t: template,
            rows: rows_state.rows,
            rows_valid: rows_state.valid,
            kind: kind,
            last_step: state.experiment.last_step,
            prev_step: state.experiment.prev_step,
            kinds: template.facs_kinds,
            can_prepare_lysate: can_prepare_lysate
        }));

        
        if (kind == 'sample_prep'){
        	$('.scb_s_facs_samples_table', '.scb_s_facs_view').scrollTop(state.facs.prep_scroll);
        }else{
            $('.scb_s_facs_choose_samples_order_list', '.scb_s_facs_view').scrollTop(state.facs.samples_scroll);
        }
        state.experiment.prev_step = scb.ui.static.FacsView.TOTAL_STEPS;
        if (state.experiment.last_step >= scb.ui.static.FacsView.TOTAL_STEPS)
            state.experiment.last_step = 6;
        state.experiment.last_technique = 'FLOW CYTOMETRY';
        state.experiment.last_id = state.facs.id;
        state.experiment.last_param = 'facs_id';


        document.title = "FACS - StarCellBio";
		
		state.facs.parent.selected_id = state.facs.id;
		state.experiment.last_view = 'facs';
    	state.experiment.last_technique_view = state.experiment.last_view;
		if(state.facs.parent.start_tabs_index <= 0){
			state.facs.parent.start_tabs_index = 0;
			$('.scb_s_facs_left_facs').prop('disabled', true);
			$('.scb_s_facs_right_facs').prop('disabled', false);
		}
		else $('.scb_s_facs_left_facs').prop('disabled', false);
		
		if(state.facs.parent.start_tabs_index + scb.ui.static.FacsView.TOTAL_TABS-1 ==state.facs.parent.list.length-1){
			$('.scb_s_facs_right_facs').prop('disabled', true);
			$('.scb_s_facs_left_facs').prop('disabled', false);
		}
		else $('.scb_s_facs_right_facs').prop('disabled', false);
        if (state.facs.samples_finished) {
            scb.ui.static.FacsView.charts(workarea);
        }
        else {
            $('.scb_s_facs_samples_graph_area').css('opacity', '.25');
            $('.scb_s_facs_samples_graph_area button').prop('disabled', true);
        }

        $("label[for='scb_facs_check']", '.scb_s_facs_view').attr('title', 'Single gate');
        $("label[for='scb_facs_check2']", '.scb_s_facs_view').attr('title', 'Bisector gate');

        $("label[class='scb_s_facs_label']", '.scb_s_facs_view').tooltip();

        _.each($(".scb_s_experiment_step_button"), function (e) {
            if (!$(e).hasClass('scb_s_experiment_step_visited'))
                $(e).attr('title', 'To use this button, start a new ' + $(e).text() + ' Experiment.');
            else $(e).removeAttr('title');
        });
        $(".scb_s_facs_selected").keypress(function (e) {
            return e.which != 13;
        });

        if (kind == 'analyze') {
            $('.scb_s_facs_single_range_button').button();
            $('.scb_s_facs_double_range_button').button();
            if (state.facs.samples_finished && state.facs.selected_lane.bisector_gate_created)
                $('.scb_s_facs_double_range_button').button('disable');

        }

        var elem = document.getElementById('slider');
            window.mySwipe = Swipe(elem, {
                continuous: false,
                disableScroll: true,
                transitionEnd: function(index, element) {
                  $('.slider_dots li').attr('class','');
                  $($('.slider_dots li')[index]).attr('class','on');}
                });
        document.body.scrollTop = state.experiment.last_scroll;

        $('#main').css({
            position: 'absolute',
            left: ($(window).width() - $('#main').outerWidth()) / 2,
            top: 0
        });
        $(window).resize(function () {

            $('#main').css({
                position: 'absolute',
                left: ($(window).width() - $('#main').outerWidth()) / 2,
                top: ($(window).height() - $('#main').outerHeight()) / 2
            });

        });
    }
}
