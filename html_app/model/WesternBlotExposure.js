'use strict';

scb.WesternBlotExposureList = function scb_WesternBlotExposureList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.WesternBlotExposure, context, self);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		var ret = new scb.WesternBlotExposure(d, context, self);
		data.list.push(d);
		return ret;
	}
}

scb.WesternBlotExposure = function scb_WesternBlotExposure(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_accessor_field(self, data, 'canvas_data', null, null, context);
	// should be getter only
	scb.Utils.initialize_accessor_field(self, data, 'schedule_value', "30", null, context);
	scb.Utils.initialize_field(data, 'schedule', "1 min");

	self.schedule = function(v) {
		if ( typeof (v) == 'undefined') {
			// getter
			var time = parseFloat(data.schedule_value);
			//var weeks = Math.floor(time / 604800);

			var days = Math.floor(time / 86400);
			var hours = Math.floor((time % 86400) / 3600);
			var minutes = Math.floor((time % 3600) / 60);
			var seconds = time % 60;
			var now = (time == 0);
			return scb_common.format_time_detailed_w_sec({
				days : days,
				hours : hours,
				minutes : minutes,
				seconds : seconds,
				now : now
			}).trim();
		} else {
			// setter
			var time = scb.Utils.parse_time(v, context.template.time_unit.kind);
			data.schedule_value = time;
			data.schedule = self.schedule();
		}
	}
	scb.Utils.accessor_toString(self.schedule);

}