var mit706s13 = mit706s13 || {};
mit706s13.static = mit706s13.static || {};

mit706s13.static.scb_mit706s16_inner_dialog_add = function (element, dialog, state) {

    $('input[type="checkbox"]:checked', dialog).each(function (e) {
        var element = $(this);
        var experiment_id = $(element).attr('experiment_id');
        var assignment_id = $(element).attr('assignment_id');
        var treatment_id = $(element).attr('treatment_id');
        var cell_line = $(element).attr('cell_line');
        var name = $(element).attr('name');

        var parsed = scb.ui.static.MainFrame.validate_state({
            experiment_id: experiment_id,
            assignment_id: assignment_id,
            view: 'add_many_dialog_box',
            skip_hash_update: true
        });

        var template = parsed.assignment.template;
        var rows = template.ui.add_multiple_dialog[cell_line].rows;
        var row = _.find(rows, function (eh) {
            return eh.treatment_id == treatment_id;
        });
        var cell_treatments_array = row.cell_treatments[name];
        _.each(cell_treatments_array, function (eh) {
            parsed.experiment.cell_treatment_list.start(scb.utils.clone_and_clear(eh));
        });
    });

    $(dialog).detach();
    scb.utils.call_back(state.close);

}

mit706s13.register = function (dialog, state) {
    scb.utils.off_on(dialog.parent(), 'click', '.scb_mit706s16_dialog', function (e) {
        var container = dialog;
        if (container.has(e.target).length === 0) {
            $(dialog).detach();
            scb.utils.call_back(state.close);
        }
    });
    scb.utils.off_on(dialog.parent(), 'click', '.scb_mit706s16_inner_dialog_cancel', function (e) {
        $(dialog).detach();
        scb.utils.call_back(state.close);
    });
    scb.utils.off_on(dialog.parent(), 'click', '.scb_mit706s16_inner_dialog_add', function (e) {
        mit706s13.static.scb_mit706s16_inner_dialog_add(this, dialog, state);
    	$('.scb_f_experiment_setup_new_set_up').click();
        $(this).focus();
    });

    scb.utils.off_on(dialog.parent(), 'click', '.scb_mit706s16_inner_dialog_select_all', function (e) {
        $('input[type=checkbox]' , dialog).attr('checked','checked');
    });

    scb.utils.off_on(dialog.parent(), 'click', '.scb_mit706s16_inner_dialog_title_close', function (e) {
        $(dialog).detach();
        scb.utils.call_back(state.close);
    });
    scb.utils.off_on(dialog.parent(), 'click', '.scb_mit706s16_inner_dialog_select', function (e) {
        var cell_line = $(this).attr('cell_line');
        var name = $(this).attr('name');
        $('input[type=checkbox][name="'+name+'"][cell_line="'+cell_line+'"]' , dialog).attr('checked','checked');
    });

}

mit706s13.setup = function (state) {
    var workarea = state.workarea;
    var assignment = state.assignment;
    var experiment = state.experiment;
    var template = state.assignment.template;
    var onClose = state.close;

    var dialog = $("<div class='scb_mit706s16_dialog'></div>");
    dialog.html(scb_mit706s16.dialog({
        assignment: assignment,
        experiment: experiment,
        template: template
    }));

    dialog.appendTo($(workarea));
    mit706s13.register($(dialog), state);

    var css = scb.utils.get(state, ['source_state', 'css']);
    _.each( css , function(v,k){
        dialog.css(k,v);
    });

    $('.scb_mit706s16_dialog').draggable({handle:'.scb_mit706s16_inner_dialog_title'})

}
