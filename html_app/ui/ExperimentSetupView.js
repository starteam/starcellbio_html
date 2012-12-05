'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}

scb.ui.ExperimentSetupView = function scb_ui_ExperimentSetupView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;
        var headings = [];
        for (var part_index in template.ui.experiment_setup.table) {
            var part = template.ui.experiment_setup.table[part_index];
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
        }
        var rows = [];
        for (var sample in experiment.cell_treatment_list.list) {
            var row = [];
            var size = sample.treatment_list.list_size;
            var treatment_list = sample.treatment_list.list;
            for( var treatment_index in treatment_list )
            {
                var treatment = treatment_list[treatment_index];
                for (var part_index in headings) {
                    var part = headings[part_index];
                    if ( treatment_index == 0 && part.kind == 'cell_line') {
                        row.push({
                            kind:'cell_line',
                            title: sample.cell_line.name,
                            rows: size
                        });
                    }
                    if( part.kind == 'treatments') {
                        for (var subpart in part.children) {
                            if( subpart.kind == 'treatments')
                            {row.push({
                                kind:'treatments',
                                title: 'here goes drugs',
                                rows:1
                            });
                            }
                            else if( subpart.kind == 'start')
                            {
                                row.push({
                                    kind:'start',
                                    title: treatment.schedule,
                                    rows:1
                                });
                            }
                            else if( subpart.kind == 'duration')
                            {
                                row.push({
                                    kind:'duration',
                                    title: treatment.duration,
                                    rows:1
                                })
                            }
                        }
                    }
                    if( treatment_index == 0 && part.kind == 'custom')
                    {
                        row.push({
                            kind: part.kind,
                            title: sample[part.key],
                            rows:1
                        })
                    }
                }
            }
            rows.push({
                id: sample.id,
                columns:row
            });
        }
        //TODO: loop over samples
        //TODO: loop over headings

        workarea.html(scb_experiment_setup.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment,
            headings: headings,
            rows:rows,
            actions:template.ui.experiment_setup.actions
        }));
        state.experiment.last_view = 'experiment_design';
    }
}