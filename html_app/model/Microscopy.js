'use strict';// strict mode to eliminate some common bugs

scb.MicroscopyList = function scb_MicroscopyList(data, context, parent) {
    var self = this;
    self.parent = parent;

    scb.ModelHelpers.common_list_code(self, data, scb.Microscopy, context, self);
    
    scb.Utils.initialize_accessor_field(self, data, 'start_tabs_index', 0, null, context);


    self.start = function (d) {
        d = ( typeof (d) == 'undefined' ? {} : d);
        d.name = d.name || "M. " + data.counter++;
        var ret = new scb.Microscopy(d, context, self);
        data.list.push(d);
        return ret;
    }

    self.new_using_making_lysates = function (making_lysates_id) {
        var experiment = context.js_model.current_session.making_lysate_list.get(making_lysates_id);
        var d = {
            name:"Microscopy " + data.counter++,
            display_lysates_id:making_lysates_id
        };
        var ml = new scb.Microscopy(d, context);
        //TODO here we will count lysates and if there are less than 10 we will fill lanes up
        data.list.push(d);
        return ml;
    }

    self.duplicate = function (id) {
        var orig = self.get(id);
        var clone = JSON.parse(JSON.stringify(orig.__data__));
        delete clone.id;
        if (("" + clone.name).indexOf('(Copy)') == -1) {
            clone.name = clone.name + " (Copy)";
        }
        delete clone.created_at;
        clone.finished = false;
        delete clone.canvas_data;
        clone.gels_list = _.clone(clone.gels_list);
        clone.exposure_list = _.clone(clone.exposure_list);
        try {
            for (var i in clone.lanes_list.list) {
                var lane = clone.lanes_list.list[i];
                lane.marks = [];
            }
            for (var i in clone.exposure_list.list) {
                var exp = clone.exposure_list.list[i];
                exp.canvas_data = null;
            }
        } catch (err) {
        }
        ;
        var ml = new scb.Microscopy(clone, context, self);
        data.list.push(clone);
        return ml;
    }
}

scb.Microscopy = function scb_Microscopy(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.ModelHelpers.common_entry_code(self, data, context);
    scb.Utils.initialize_accessor_field(self, data, 'slide_prepared', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'lanes_list', {}, scb.MicroscopyLaneList, context);
    scb.Utils.initialize_accessor_field(self, data, 'samples_finished', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'lane_selected', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'is_cell_treatment_enabled', {}, null, context);

    scb.Utils.initialize_accessor_field(self, data, 'warning_fired', false, null, context);

    scb.Utils.initialize_accessor_field(self, data, 'laser_on', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'red_enabled', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'blue_enabled', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'green_enabled', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'merge_enabled', false, null, context);
 	scb.Utils.initialize_accessor_field(self, data, 'scroll', 0, null, context);
 	scb.Utils.initialize_accessor_field(self, data, 'prep_scroll', 0, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'samples_show_state', false, null, context);
        scb.Utils.initialize_accessor_field(self, data, 'navigation_show_state', false, null, context);
scb.Utils.initialize_accessor_field(self, data, 'enable_samples', false, null, context);
    var template = context.template;
    
    self.disable_blur = template.ui.microscopy.disable_blur;
    self.disable_brightness = template.ui.microscopy.disable_brightness;
    
  	
  	
    scb.Utils.initialize_accessor_field(self, data, 'light_on', false, null, context);	
	scb.utils.accessor2_custom(self, 'selected_lane', function () {
        if (self.lane_selected) {
            return self.lanes_list.get(self.lane_selected);
        }
        else {
            return null;
        }
    }, scb.utils.noop);
    
    self.rows_state = function (exp) {
        var skip_placeholders = false;
        if (_.keys(context.template.micro_kinds).length == 1 && _.keys(context.template.micro_kinds[Object.keys(context.template.micro_kinds)[0]].conditions).length == 1) {
            skip_placeholders = true;
        }
        var experiment = exp || self.parent.parent;
        var grouped_rows = self.lanes_list.grouped_list;
        var rows = [];
        _.each(experiment.cell_treatment_list.list, function (e) {
            if (grouped_rows[e.id]) {
                _.each(grouped_rows[e.id], function (ee, index) {
                    rows.push({
                        kind:'existing',
                        cell_treatment:e,
                        lane:ee,
                        display_sample:index == 0,
                        is_sample_enabled:self.is_cell_treatment_enabled[e.id],
                        index:index,
                        is_valid:self.is_cell_treatment_enabled[e.id] && ee && ee.slide_conditions,
                        display_text: e.format_row()
                    });
                	
                });
                if (!skip_placeholders) {
                    rows.push({
                        kind:'placeholder',
                        display_sample:false,
                        cell_treatment:e,
                        is_sample_enabled:self.is_cell_treatment_enabled[e.id],
                        is_valid:false
                    });
                }
            } else {
                rows.push({
                    kind:'new',
                    row_type:'new',
                    display_sample:true,
                    cell_treatment:e,
                    is_sample_enabled:self.is_cell_treatment_enabled[e.id],
                    is_valid:false,
                    display_text: e.format_row()
                })
            }
        });
        var count = 0;
        _.each(rows, function (e) {
            if (e.is_valid) count++;
        });
        rows = _.sortBy(rows, function(obj){ if(obj.kind=='existing')return obj.lane.order_id; else return;});
        return {rows:rows, valid:count};
    }
	
	


}