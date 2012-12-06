'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.ExperimentSetupView = scb.ui.static.ExperimentSetupView || {};

scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action = function (element) {
    alert("Click" + $(element).html());
}


scb.ui.static.ExperimentSetupView.register = function (workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_action', function (e) {
        scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action(this);
    });
}

scb.ui.ExperimentSetupView = function scb_ui_ExperimentSetupView(gstate) {
    var self = this;

    self.headings = function (table_map) {
        var headings = [];
        _.each(table_map, function (part) {
            if (part.kind == 'cell_line') {
                headings.push(part);
            }
            if (part.kind == 'treatments') {
                for (var subpart_index in part.children) {
                    var subpart = part.children[subpart_index];
                    headings.push(subpart);
                }
            }
            if (part.kind == 'custom') {
                headings.push(part);
            }

        });
        return headings;
    }

    self.rows = function (cell_treatment_list, headings) {
        var rows = [];
        _.each(cell_treatment_list, function (sample, sample_index, list) {
            var row = [];
            var treatment_list = sample.treatment_list.list;
            var size = treatment_list.length;
            _.each(treatment_list, function (treatment, treatment_index, list) {
                _.each(headings, function (part, part_index, list) {
                    if (treatment_index == 0 && part.kind == 'cell_line') {
                        row.push({
                            kind:'cell_line',
                            title:sample.cell_line.name,
                            rows:size
                        });
                    }
                    if (part.kind == 'treatments') {
                        for (var subpart in part.children) {
                            if (subpart.kind == 'treatments') {
                                row.push({
                                    kind:'treatments',
                                    title:'here goes drugs',
                                    rows:1
                                });
                            }
                            else if (subpart.kind == 'start') {
                                row.push({
                                    kind:'start',
                                    title:treatment.schedule,
                                    rows:1
                                });
                            }
                            else if (subpart.kind == 'duration') {
                                row.push({
                                    kind:'duration',
                                    title:treatment.duration,
                                    rows:1
                                })
                            }
                        }
                    }
                    if (treatment_index == 0 && part.kind == 'custom') {
                        row.push({
                            kind:part.kind,
                            title:sample[part.key],
                            rows:1
                        })
                    }
                });
            });
            rows.push({
                id:sample.id,
                columns:row
            });
        });
        return rows;
    }

    self.action_rows = function(template,actions,headings){
        var action_rows = {};
        _.each(actions,function(action,action_index,list){
            if (action.kind == 'add_protocol') {
                var json_list = { list:template.experiment_setup_actions.add_protocol};
                var list = new scb.CellTreatmentList(json_list,gstate.context,null);
                var rows = self.rows(list,headings);
                action_rows = _.union( action_rows, rows );
            } else {
                throw 'Unknown action kind';
            }
        });
        return action_rows;
    }

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;
        var headings = self.headings(template.ui.experiment_setup.table);
        var rows = self.rows(experiment.cell_treatment_list.list, headings);
        var action_rows = self.action_rows(template,template.ui.experiment_setup.actions,headings);

        workarea.html(scb_experiment_setup.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment,
            headings:headings,
            rows:rows,
            actions:template.ui.experiment_setup.actions,
            action_rows: action_rows
        }));
        state.experiment.last_view = 'experiment_design';
    }
}