'use strict';// strict mode to eliminate some common bugs

scb.WesternBlotList = function scb_WesternBlotList(data, context, parent) {
    var self = this;
    self.parent = parent;

    scb.ModelHelpers.common_list_code(self, data, scb.WesternBlot, context, self);

	scb.Utils.initialize_accessor_field(self, data, 'start_tabs_index', 0, null, context);
	
		
    self.start = function (d) {
        d = ( typeof (d) == 'undefined' ? {} : d);
        d.name = d.name || "W. B. " + data.counter++;
        var ret = new scb.WesternBlot(d, context, self);
        data.list.push(d);
        return ret;
    }

    self.new_using_making_lysates = function (making_lysates_id) {
        var experiment = context.js_model.current_session.making_lysate_list.get(making_lysates_id);
        var d = {
            name:"Western Blot " + data.counter++,
            display_lysates_id:making_lysates_id
        };
        var ml = new scb.WesternBlot(d, context);
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
        var ml = new scb.WesternBlot(clone, context, self);
        data.list.push(clone);
        return ml;
    }
}

scb.WesternBlot = function scb_WesternBlot(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.ModelHelpers.common_entry_code(self, data, context);
    scb.Utils.initialize_accessor_field(self, data, 'lysate_prepared', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'marker_loaded', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'wells_loaded', false, null, context);

    scb.Utils.initialize_accessor_field(self, data, 'gel_type', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'is_transfered', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'lanes_list', {}, scb.WesternBlotLaneList, context);
    scb.Utils.initialize_accessor_field(self, data, 'gel_list', {}, scb.WesternBlotGelList, context);
    scb.Utils.initialize_accessor_field(self, data, 'last_gel', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'canvas_metadata', null, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'prep_scroll', 0, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'is_cell_treatment_enabled', {}, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'samples_show_state', false, null, context);

    scb.Utils.initialize_accessor_field(self, data, 'measure_show_state', false, null, context);

    self.rows_state = function (exp) {
        var skip_placeholders = false;
        if (_.keys(context.template.lysate_kinds).length == 1) {
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
                        is_valid:self.is_cell_treatment_enabled[e.id] && ee,
                        is_marker: false,
                        display_text: e.format_row()
                    });
                	
                });
                if (!skip_placeholders) {
                    rows.push({
                        kind:'placeholder',
                        display_sample:false,
                        cell_treatment:e,
                        is_sample_enabled:self.is_cell_treatment_enabled[e.id],
                        is_marker: false,
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
                	is_marker: false,
                    is_valid:false,
                    display_text: e.format_row()
                })
            }
        });
        if(grouped_rows['marker_treatment']){
        	_.each(grouped_rows['marker_treatment'], function (ee, index) {
        			//ee.order_id = rows.length;
                    rows.push({
                        kind:'existing',
                        lane:ee,
                        display_sample:index == 0,
                        index:index,
                        is_valid:false,
                        is_marker: true,
                        display_text: ee.name
                    });
                	
                });
        }
        var count = 0;
        _.each(rows, function (e) {
            if (e.is_valid) count++;

        });

        if(self.lysate_prepared){
        	var existing_rows = 0;
	        rows = _.sortBy(rows, function(obj){ 
	        	if(obj.kind == 'existing' && (obj.is_valid || obj.is_marker)){
	        		existing_rows ++;
	        		return obj.lane.order_id;
	        	} 
	        	else return;
	        });
            if(self.marker_loaded) {
                if (rows[1].is_marker) {
                    var marker = rows[1];
                    rows.splice(1, 1);
                    rows.splice(existing_rows, 0, marker);
                }
                if (rows[rows.length - 1].is_marker) {
                    var marker = rows[rows.length - 1];
                    rows.splice(rows.length - 1, 1);
                    rows.splice(existing_rows, 0, marker);
                }
            }
        }

	        	
        return {rows:rows, valid:count};
    }
    
    scb.utils.accessor2_custom(self, 'rows_state_count', function(){
    	return self.rows_state().valid;
    }, scb.utils.read_only_exception);
    //self.rows_state_count = self.rows_state().valid;


}