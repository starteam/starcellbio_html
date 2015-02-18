console.info("SCB_EX/ADD_MULTIPLE_DIALOG");
if (typeof (scb_ex1) == 'undefined') {
    scb_ex1 = {};
}
if (typeof (scb_ex1.static) == 'undefined') {
    scb_ex1.static = {};
}


if (typeof (scb_ex2) == 'undefined') {
    scb_ex2 = {};
}
if (typeof (scb_ex2.static) == 'undefined') {
    scb_ex2.static = {};
}
if (typeof (scb_ex3) == 'undefined') {
    scb_ex3 = {};
}
if (typeof (scb_ex3.static) == 'undefined') {
    scb_ex3.static = {};
}
scb_ex1.static.scb_ex_inner_dialog_add = function (element, dialog, state) {

    $('input[type="checkbox"]:checked', dialog).each(function (e) {
        var element = $(this);
        var experiment_id = $(element).attr('experiment_id');
        var assignment_id = $(element).attr('assignment_id');
        var cell_line = $(element).attr('cell_line');
        var name = $(element).attr('name');
        $(element).attr('aria-checked', true);
        var parsed = scb.ui.static.MainFrame.validate_state({
            experiment_id: experiment_id,
            assignment_id: assignment_id,
            view: 'add_many_dialog_box',
            skip_hash_update: true
        });

        var template = parsed.assignment.template;
        
//         var cell_treatments_array = [
//             {
//                 cell_line: cell_line,
//                 treatment_list: {list: [
//                     {drug_list: {list: [
//                         {drug_id: 'nc', concentration_id: '0'}
//                     ]}, temperature: '40', collection_id: state.source_state.collection_id, condition: state.source_state.condition}
//                 ]}}
//         ];
//         


        var treatment_id=$(element).attr('treatment_id');
        /*'rows' listed under each cell line, has a list of all treatments for this cell line*/
        /* each entry under 'rows' has treatment_id attribute*/
        /* treatment_id has to be unique for each entry under 'rows'
        * otherwise only the first one will be displayed in the setup table*/
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
    $('.contact_overlay').remove();
    scb.utils.call_back(state.close);

}

scb_ex1.register = function (dialog, state) {
    scb.utils.off_on(dialog.parent(), 'click', '.scb_ex_dialog', function (e) {
        var container = dialog;
        if (container.has(e.target).length === 0) {
            $(dialog).detach();
            $('.contact_overlay').remove();
            scb.utils.call_back(state.close);
        }
    });
    scb.utils.off_on(dialog.parent(), 'click', '.scb_ex_inner_dialog_cancel', function (e) {
        $(dialog).detach();
        $('.contact_overlay').remove();
        scb.utils.call_back(state.close);
    });
    scb.utils.off_on(dialog.parent(), 'click', '.scb_ex_inner_dialog_add', function (e) {
        scb_ex1.static.scb_ex_inner_dialog_add(this, dialog, state);
        $(this).focus();
    });

    scb.utils.off_on(dialog.parent(), 'click', '.scb_ex_inner_dialog_select_all', function (e) {
        $('input[type=checkbox]', dialog).attr('checked', 'checked');
        $('input[type=checkbox]', dialog).attr('aria-checked', true);
    });
    scb.utils.off_on(dialog.parent(), 'change', '.scb_f_experiment_setup_dialog_checkbox', function (e) {
        $(this, dialog).attr('aria-checked', $(this, dialog).attr('aria-checked') == 'false' ? true : false);
    });

    scb.utils.off_on(dialog.parent(), 'click', '.scb_ex_inner_dialog_title_close', function (e) {
        $(dialog).detach();
        $('.contact_overlay').remove();
        scb.utils.call_back(state.close);
    });
    scb.utils.off_on(dialog.parent(), 'click', '.scb_ex_inner_dialog_select', function (e) {
        var cell_line = $(this).attr('cell_line');
        var name = $(this).attr('name');
        $('input[type=checkbox][name="' + name + '"][cell_line="' + cell_line + '"]', dialog).attr('checked', 'checked');
        $('input[type=checkbox][name="' + name + '"][cell_line="' + cell_line + '"]', dialog).attr('aria-checked', true);
    });

}

scb_ex1.setup = function (state) {
    console.info(state);
    var workarea = state.workarea;
    var assignment = state.assignment;
    var experiment = state.experiment;
    var template = state.template;
    var onClose = state.close;

    var dialog = $("<div class='scb_ex_dialog'></div>");
    dialog.html(scb_ex.dialog({
        assignment: assignment,
        experiment: experiment,
        template: template
    }));

    dialog.appendTo($(workarea));
    scb_ex1.register($(dialog), state);

    var css = scb.utils.get(state, ['source_state', 'css']);
    _.each(css, function (v, k) {
        dialog.css(k, v);
    });

    $('.scb_ex_dialog').draggable({handle: '.scb_ex_inner_dialog_title'})

}

scb_ex2.setup=function(state){
    var workarea = state.workarea;
    var assignment=state.assignment;
    var experiment=state.experiment;
    var  template = state.template;
    var dialog=$("<div class='scb_ex_dialog'></div>");
    dialog.html(scb_ex.dialog({
       assignment: assignment,
        experiment: experiment,
        template: template
    }));
    dialog.appendTo($(workarea));
    scb_ex1.register($(dialog), state);

    var css = scb.utils.get(state, ['source_state', 'css']);
    _.each(css, function (v, k) {
        dialog.css(k, v);
    });

    $('.scb_ex_dialog').draggable({handle: '.scb_ex_inner_dialog_title'})

}
scb_ex3.setup=function(state){
    var workarea = state.workarea;
    var assignment=state.assignment;
    var experiment=state.experiment;
    var  template = state.template;
    var dialog=$("<div class='scb_ex_dialog'></div>");
    dialog.html(scb_ex.dialog({
       assignment: assignment,
        experiment: experiment,
        template: template
    }));
    dialog.appendTo($(workarea));
    scb_ex1.register($(dialog), state);

    var css = scb.utils.get(state, ['source_state', 'css']);
    _.each(css, function (v, k) {
        dialog.css(k, v);
    });

    $('.scb_ex_dialog').draggable({handle: '.scb_ex_inner_dialog_title'})

}

