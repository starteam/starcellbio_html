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
    /* samples_finished is true after LOAD was clicked */
    scb.Utils.initialize_accessor_field(self, data, 'samples_finished', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'lane_selected', null, null, context);
    /* Has a dict of all lane_ids and corresponding value: 'checked' or 'undefined'
     * it is set in MicroscopyView */
    scb.Utils.initialize_accessor_field(self, data, 'is_cell_treatment_enabled', {}, null, context);
    /* to save selected lane for each cell_treatment */
    scb.Utils.initialize_accessor_field(self, data, 'is_tab_selected', {}, null, context);
    /* for each cell_treatment want to save starting tab */
    scb.Utils.initialize_accessor_field(self, data, 'start_tabs_index', {}, null, context);

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
    /* The total number of lanes for the currently selected sample (cell_treatment_id),
     * used for display and navigation through the small tabs */
    scb.Utils.initialize_accessor_field(self, data, 'total_num_tabs', 0, null, context);

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
        var experiment = exp || self.parent.parent;
        var grouped_rows = self.lanes_list.grouped_list;
        var rows = [];
        _.each(experiment.cell_treatment_list.list, function (e) {
            if (grouped_rows[e.id] && !('na' in e.treatment_list.list[0].conditions)) {
                /*find all conditions already chosen for this lane*/
                var chosen_conditions= _.map(grouped_rows[e.id], function(z){return z.slide_conditions}).sort();
                /*find all conditions available for this lane*/
                var avail_conditions= [];
                var lane_conditions_dict=e.treatment_list.list[0].conditions;
                _.each(_.keys(lane_conditions_dict), function(a){
                    _.each(lane_conditions_dict[a],function(c){
                        avail_conditions.push(c);
                    })
                });
                var skip_placeholders=false;
                /* number of chosen conditions should not exceed the number available*/
            	if(chosen_conditions.length >= avail_conditions.length){
                    skip_placeholders = true;
                }
                /* after samples were prepared want to initialize dict with
                   initial tab value */
                if(self.slide_prepared){
                    if(!self.start_tabs_index.hasOwnProperty(e.id)){
                       self.start_tabs_index[e.id] = 0;
                    }
                }

                /* find total number of tabs for this sample*/
                /* the number of valid lanes for this CellTreatment*/
                var num_tabs=0;
                _.each(grouped_rows[e.id], function(ee){
                    if(self.is_cell_treatment_enabled[e.id] && ee && ee.slide_conditions){
                        num_tabs+=1;
                    }
                });
                var is_valid;
                _.each(grouped_rows[e.id], function (ee, index) {
                    is_valid=false;
                    /* identifies a complete lane, an enabled treatment with analysis and condition */
                    if(
                        self.is_cell_treatment_enabled.hasOwnProperty(e.id) &&
                        typeof ee !== 'undefined' &&
                        ee.slide_conditions !== null)
                    {
                        is_valid = true;
                    }
                    /*
                        after samples were prepared want to initialize dict with
                        first valid lane for each cell_treatment
                    */
                    if(self.slide_prepared && !self.is_tab_selected.hasOwnProperty(e.id) && is_valid){
                        self.is_tab_selected[e.id]= ee.id;
                    }
                    rows.push({
                        kind:'existing',
                        cell_treatment:e,
                        lane:ee,
                        /* used in sample prep */
                        display_sample:index == 0,
                        is_sample_enabled:self.is_cell_treatment_enabled[e.id],
                        index:index,
                        is_valid: is_valid,
                        /* used for displaying the selected lane in the samples list*/
                        is_tab_selected: self.is_tab_selected[e.id] == ee.id,
                        display_text: e.format_row(),
                        /* at most 4 tabs can be displayed */
                        display_tab: false,
                        num_tabs: num_tabs
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
        var valid_lane_index=0;
        /* for each valid lane, that belongs to the selected cell_treatment,
           check if it is withing the bound of 4 tabs */
        if(self.samples_finished) {
            _.each(rows, function (e) {
                /* Make sure that lane e is complete and belongs to the selected cell_treatment */
                if (e.is_valid && e.cell_treatment.id == self.selected_lane.cell_treatment_id) {
                    if (valid_lane_index >= self.start_tabs_index[e.cell_treatment.id] &&
                        valid_lane_index < self.start_tabs_index[e.cell_treatment.id] + 4) {
                        e.display_tab = true;
                    }
                    valid_lane_index++;
                    /* total number of tabs for this sample */
                    if (e.lane.id === self.lane_selected) {
                        self.total_num_tabs = e.num_tabs;
                    }
                }

            });
        }
        var count = 0;
        _.each(rows, function (e) {
            if (e.is_valid) count++;
        });
        rows = _.sortBy(rows, function(obj){ if(obj.kind=='existing')return obj.lane.order_id; else return;});
        return {rows:rows, valid:count};
    }
	
	


}