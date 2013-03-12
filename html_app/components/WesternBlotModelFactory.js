scb.components = scb.components || {};

scb.components.WesternBlotModelFactory = function scb_components_WesternBlotModelFactory(model, template) {
    var self = this;

    function anti_body_match(primary_anti_body_array, gel, template) {
        if (scb.utils.isDefined(primary_anti_body_array)) {
            for (var i in primary_anti_body_array) {
                var anti_body_id = primary_anti_body_array[i];
                if (anti_body_id == gel.primary_anti_body) {
                    var secondary_anti_bodies_array = template.primary_anti_body[gel.primary_anti_body].secondary;
                    if (_.find(secondary_anti_bodies_array, function (e) {
                        return e == gel.secondary_anti_body;
                    })) {
                        return true;
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }

    if (scb.utils.isDefined(model.cyto)) {
        self.cyto = function (lane, gel, lane_marks) {
            if (lane.kind == 'whole' || lane.kind == 'cyto' || lane.kind == 'whole_cell') {
                if (scb.utils.isDefined(model.cyto.parser_1)) {
                    var rules = model.cyto.parser_1;
                    for (var rule_index in rules) {
                        var rule = rules[rule_index];
                        console.info("lane.cell_treatment.cell_line:" + lane.cell_treatment.cell_line);
                        console.info("rule.cell_line:" + rule.cell_line);
                        if (lane.cell_treatment.cell_line == rule.cell_line || rule.cell_line == '*ANY*') {
                            var treatments = lane.cell_treatment.treatment_list.list;
                            for (var treatment_index in treatments) {
                                var treatment = treatments[treatment_index];
                                var drugs = treatment.drug_list.list;
                                var drug = _.find(drugs, function (d) {
                                    return d.drug_id == rule.drug;
                                });
                                var drug_concentration = drug ? parseFloat(template.concentrations[drug.concentration_id].value) : 0;
                                var drug_schedule = parseFloat(treatment.schedule_value);
                                var collection_schedule = parseFloat(lane.collection_schedule.schedule_value);
                                if (rule.transfer_function == 'linear_concentration_duration_with_max' && drug_concentration != 0) {
                                    var exposure_time = collection_schedule - drug_schedule;
                                    var rule_marks = rule.marks;
                                    for (var rule_mark_index in rule_marks) {
                                        var rule_mark = rule_marks[rule_mark_index];
                                        var intensity = rule_mark.intensity_slope * exposure_time + rule_mark.intensity_intercept;
                                        if (scb.utils.isDefined(rule_mark.intensity_min) && (intensity < rule_mark.intensity_min)) {
                                            intensity = rule_mark.intensity_min;
                                        }
                                        if (scb.utils.isDefined(rule_mark.intensity_max) && (intensity > rule_mark.intensity_max)) {
                                            intensity = rule_mark.intensity_max;
                                        }
                                        var update_mark = _.find(lane_marks, function (e) {
                                            return e.weight == rule_mark.weight
                                        });
                                        if (scb.utils.isDefined(update_mark)) {
                                            update_mark.intensity += intensity;
                                        } else {
                                            lane_marks.push({
                                                weight: rule_mark.weight,
                                                intensity: intensity
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (scb.utils.isDefined(model.cyto.parser_fixed)) {
                    var rules = model.cyto.parser_fixed;
                    for (var rule_index in rules) {
                        var rule = rules[rule_index];
                        if (rule.transfer_function == 'static') {
                            if (lane.cell_treatment.cell_line == rule.cell_line || rule.cell_line == '*ANY*') {

                                var rule_marks = rule.marks;
                                for (var rule_mark_index in rule_marks) {
                                    var rule_mark = rule_marks[rule_mark_index];
                                    if (anti_body_match(rule_mark.primary_anti_body, gel, template)) {
                                        var intensity = rule_mark.intensity;
                                        var update_mark = _.find(lane_marks, function (e) {
                                            return e.weight == rule_mark.weight
                                        });
                                        if (scb.utils.isDefined(update_mark)) {
                                            update_mark.intensity += intensity;
                                        } else {
                                            lane_marks.push({
                                                weight: rule_mark.weight,
                                                intensity: intensity
                                            });
                                        }
                                    }
                                }
                            }
                        } else if (rule.transfer_function == 'delta') {
                            if (lane.cell_treatment.cell_line == rule.cell_line || rule.cell_line == '*ANY*') {
                                var treatments = lane.cell_treatment.treatment_list.list;
                                for (var treatment_index in treatments) {
                                    var treatment = treatments[treatment_index];
                                    var drugs = treatment.drug_list.list;
                                    var drug = _.find(drugs, function (d) {
                                        return d.drug_id == rule.drug;
                                    });
                                    var drug_concentration = drug ? parseFloat(template.concentrations[drug.concentration_id].value) : 0;
                                    var marks_list = (drug_concentration >= rule.cutoff) ? rule.above_marks : rule.below_marks;
                                    if (scb.utils.isDefined(marks_list)) {

                                        for (var mark_index in marks_list) {
                                            var rule_mark = marks_list[mark_index];
                                            if (anti_body_match(rule_mark.primary_anti_body, gel, template)) {
                                                var intensity = rule_mark.intensity;
                                                var update_mark = _.find(lane_marks, function (e) {
                                                    return e.weight == rule_mark.weight
                                                });
                                                if (scb.utils.isDefined(update_mark)) {
                                                    update_mark.intensity += intensity;
                                                } else {
                                                    lane_marks.push({
                                                        weight: rule_mark.weight,
                                                        intensity: intensity
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                lane.marks = lane_marks;
            }
        }
    }

    self.compute = function (lane, gel, lane_marks) {
        return self.cyto(lane, gel, lane_marks);
    }
}