'use strict';// strict mode to eliminate some common bugs

scb.WesternBlotList = function scb_WesternBlotList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.WesternBlot, context, self);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		d.name = d.name || "W.B. Exp. " + data.counter++;
		var ret = new scb.WesternBlot(d, context, self);
		data.list.push(d);
		return ret;
	}

	self.new_using_making_lysates = function(making_lysates_id) {
		var experiment = context.js_model.current_session.making_lysate_list.get(making_lysates_id);
		var d = {
			name : "Western Blot " + data.counter++,
			display_lysates_id : making_lysates_id
		};
		var ml = new scb.WesternBlot(d, context);
		//TODO here we will count lysates and if there are less than 10 we will fill lanes up
		data.list.push(d);
		return ml;
	}

	self.duplicate = function(id) {
		var orig = self.get(id);
		var clone = JSON.parse(JSON.stringify(orig.__data__));
		delete clone.id;
		if(("" + clone.name).indexOf('(Copy)') == -1) {
			clone.name = clone.name + " (Copy)";
		}
		delete clone.created_at;
		clone.finished = false;
		delete clone.canvas_data;
		clone.gels_list = _.clone(clone.gels_list);
		clone.exposure_list = _.clone(clone.exposure_list);
		try {
			for(var i in clone.lanes_list.list ) {
				var lane = clone.lanes_list.list[i];
				lane.marks = [];
			}
			for(var i in clone.exposure_list.list) {
				var exp = clone.exposure_list.list[i];
				exp.canvas_data = null;
			}
		} catch(err) {
		};
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
    scb.Utils.initialize_accessor_field(self, data, 'gel_type', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'is_transfered', null, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'lanes_list', {}, scb.WesternBlotLaneList, context);
    scb.Utils.initialize_accessor_field(self, data, 'gel_list', {}, scb.WesternBlotGelList, context);

    scb.Utils.initialize_accessor_field(self, data, 'is_cell_treatment_enabled', {}, null, context);


}