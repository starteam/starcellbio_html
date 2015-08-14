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
    var keep;
    if (scb.utils.isDefined(model.cyto)) {
        self.cyto = function (lane, gel, lane_marks) {
            if (lane.kind == 'whole' || lane.kind == 'cyto' || lane.kind == 'whole_cell') {
            	if(lane.id == 'marker')
            		lane_marks.push({ weight: 0, intensity: 0});
                /* parser_1 is used only by  __assigment_facs */
                else if (scb.utils.isDefined(model.cyto.parser_1)) {
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
                } // end parser_1
                else if (scb.utils.isDefined(model.cyto.parser_fixed)) {
                    var rules = model.cyto.parser_fixed;
                    for (var rule_index in rules) {
                        var rule = rules[rule_index];
                        if (rule.transfer_function == 'static') {
                            if (lane.cell_treatment.cell_line == rule.cell_line || rule.cell_line == '*ANY*') {
                                treatments = lane.cell_treatment.treatment_list;
                                keep = true;
                                if(rule.drug && rule.drug != '*ANY*') {
                                    /* Check if this lane has rule.drug_id */
                                    keep = treatments.first.drug_list.list[0].drug_id == rule.drug;
                                }
                                if (rule.temperature) {
                                    var value = scb.utils.get(lane, ["cell_treatment", "treatment_list", "list", 0, "temperature"], null);
                                    keep = keep && ( rule.temperature == value );
                                }
                                if(rule.duration){
                                    var value = scb.utils.get(lane, ["cell_treatment", "treatment_list", "list", 0, "duration"], null);
                                    keep = keep && ( rule.duration == value || rule.duration == '*ANY*');
                                }
                                if (keep) {
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
                            }
                        } else if (rule.transfer_function == 'delta') {
                            if (lane.cell_treatment.cell_line == rule.cell_line || rule.cell_line == '*ANY*') {
                                treatments = lane.cell_treatment.treatment_list.list;
                                /* Compares only one drug, I guess assuming that out of a list of
                                   drugs at least one drug is unique per treatment */
                                for (var treatment_index in treatments) {
                                    var treatment = treatments[treatment_index];
                                    var drugs = treatment.drug_list.list;
                                    var drug = _.find(drugs, function (d) {
                                        return d.drug_id == rule.drug;
                                    });
                                    var drug_concentration = drug ? parseFloat(template.concentrations[drug.concentration_id].value) : 0;
                                    /* if rule.drug is ANY, set drug_concentration to any value >= cutoff*/
                                    drug_concentration=(rule.drug == '*ANY*')? 1 :drug_concentration;
                                    var marks_list = (drug_concentration >= rule.cutoff) ? rule.above_marks : rule.below_marks;
                                    keep = true;

                                    if(rule.duration){
                                        var value = scb.utils.get(lane, ["cell_treatment", "treatment_list", "list", 0, "duration"], null);
                                        keep = keep && ( rule.duration == value || rule.duration == '*ANY*');
                                    }
                                    if (scb.utils.isDefined(marks_list) && keep) {

                                        for (var mark_index in marks_list) {
                                            var rule_mark = marks_list[mark_index];
                                            if (rule_mark) {
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
                }
                //END parser Fixed
                
                lane.marks = lane_marks;
            }
        }
        
        self.nuclear = function (lane, gel, lane_marks) {
            if (lane.kind == 'whole' || lane.kind == 'nuclear' || lane.kind == 'whole_cell') {
            	if(lane.id == 'marker')
            		lane_marks.push({ weight: 0, intensity: 0});
                else if (scb.utils.isDefined(model.nuclear.parser_1)) {
                    var rules = model.nuclear.parser_1;
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
                } // end parser_1
                else if (scb.utils.isDefined(model.nuclear.parser_fixed)) {
                    var rules = model.nuclear.parser_fixed;
                    for (var rule_index in rules) {
                        var rule = rules[rule_index];
                        if (rule.transfer_function == 'static') {
                            if (lane.cell_treatment.cell_line == rule.cell_line || rule.cell_line == '*ANY*') {
                                var keep = true;
                                if (rule.temperature) {
                                    var value = scb.utils.get(lane, ["cell_treatment", "treatment_list", "list", 0, "temperature"], null);
                                    keep = ( rule.temperature == value );
                                }
                                if (keep) {
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
                                            if (rule_mark) {
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
                }
                //END parser Fixed
                
                lane.marks = lane_marks;
            }
        }
    
    }

    self.compute = function (lane, gel, lane_marks) {
        var ret = self.cyto(lane, gel, lane_marks);
        console.info(lane_marks);
        return ret;
    }
}