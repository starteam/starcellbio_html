'use strict';// strict mode to eliminate some common bugs

scb.FacsList = function scb_FacsList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.Facs, context, self);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		d.name = d.name || "Facs Exp. " + data.counter++;
		var ret = new scb.Facs(d, context, self);
		data.list.push(d);
		return ret;
	}

	self.new_using_making_lysates = function(making_lysates_id) {
		var experiment = context.js_model.current_session.making_lysate_list.get(making_lysates_id);
		var d = {
			name : "Facs " + data.counter++,
			display_lysates_id : making_lysates_id
		};
		var ml = new scb.Facs(d, context, self);
		//TODO here we will count lysates and if there are less than 10 we will fill lanes up
		data.list.push(d);
		return ml;
	}

	self.duplicate = function(id) {
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
			for (var i in clone.lanes_list.list ) {
				var lane = clone.lanes_list.list[i];
				lane.marks = [];
			}
			for (var i in clone.exposure_list.list) {
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

scb.Facs = function scb_Facs(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self, data, 'lanes_list', {}, scb.FacsLaneList, context);
	scb.Utils.initialize_accessor_field(self, data, 'prepared', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'sdsgelrun', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'primary_anti_body', _.keys(context.template.primary_anti_body)[0], null, context);
	scb.Utils.initialize_accessor_field(self, data, 'secondary_anti_body', _.keys(context.template.secondary_anti_body)[0], null, context);
	scb.Utils.initialize_accessor_field(self, data, 'exposure_list', {}, scb.WesternBlotExposureList, context);
	scb.Utils.initialize_accessor_field(self, data, 'finished', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'canvas_data', null, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'lysate_made', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'display_lysates_id', null, null, context);
	
	scb.Utils.initialize_field(data, 'gels_list', {});

}