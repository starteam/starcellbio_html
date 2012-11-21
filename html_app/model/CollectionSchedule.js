'use strict';

scb.CollectionScheduleList = function scb_CollectionScheduleList(data, context, parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.CollectionSchedule, context, self);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		d.name = d.name || "Schedule " + data.counter++;
		var ret = new scb.CollectionSchedule(d, context, self);
		data.list.push(d);
		return ret;
	}
}

scb.CollectionSchedule = function scb_CollectionSchedule(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	// should be getter only
	scb.Utils.initialize_accessor_field(self, data, 'schedule_value', "0", null, context);

	scb.Utils.initialize_field(data, 'schedule', "now");

	self.schedule = function(v) {
		if ( typeof (v) == 'undefined') {
			// getter
			var time = parseFloat(data.schedule_value);
			var days = Math.floor(time / 86400);
			var hours = Math.floor((time % 86400) / 3600);
			var minutes = Math.round((time % 3600) / 60);
			var now = (time < 60 );
			return scb_ui.format_time_detailed({
				days : days,
				hours : hours,
				minutes : minutes,
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