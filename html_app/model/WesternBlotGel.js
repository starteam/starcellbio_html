'use strict';// strict mode to eliminate some common bugs

scb.WesternBlotGelList = function scb_WesternBlotGelList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.WesternBlotGel, context, self);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		d.name = d.name || "Gel " + data.counter++;
		var ret = new scb.WesternBlotGel(d, context, self);
		data.list.push(d);
		return ret;
	}
}


scb.WesternBlotGel = function scb_WesternBlotGel(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self, data, 'primary_anti_body', null, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'secondary_anti_body', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'exposure_time', "60", null, context);
    scb.Utils.initialize_accessor_field(self, data, 'is_developed', false, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'canvas_data', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'canvas_metadata', null, null, context);
    scb.Utils.initialize_accessor_field(self, data, 'marks', [], null, context);


}