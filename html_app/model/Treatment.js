'use strict';

scb.TreatmentList = function scb_TreatmentList(data, context) {
  var self = this;

  scb.ModelHelpers.common_list_code(self, data, scb.Treatment, context);
  self.first_state = function() {
    if (self.list.length == 1) {
      return self.list[0];
    } else {
      return null;
    }
  }
  self.first = self.first_state();
  self.start = function(d) {
    d = (typeof (d) == 'undefined' ? _.clone(scb.utils.get(context, ['template', 'experiment_templates', 'default', 'treatment'], {})) : d);
    var ret = new scb.Treatment(d, context, self);
    if (ret.drug_list.length == 0) {
      ret.drug_list.start_default({});
    }
    data.list.push(d);
    return ret;
  }
}

scb.Treatment = function scb_Treatment(data, context, parent) {
  var self = this;
  self.parent = parent;
  scb.ModelHelpers.common_entry_code(self, data, context);

  scb.Utils.initialize_accessor_field(self, data, 'drug_list', {}, scb.DrugList, context);
  scb.Utils.initialize_accessor_field(self, data, 'temperature', "20", null, context);
  scb.Utils.initialize_accessor_field(self, data, 'collection_id', "0", null, context);
  scb.Utils.initialize_accessor_field(self, data, 'collection_time', "0", null, context);
  scb.Utils.initialize_accessor_field(self, data, 'microscope', {}, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'conditions', {}, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'facs', {}, null, context);

  // should be getter only
  scb.Utils.initialize_accessor_field(self, data, 'start_time_value', "0", null, context);
  // should be getter only
  scb.Utils.initialize_accessor_field(self, data, 'duration_value', "0", null, context);
  if (data.start_time_value !== "0") {
    scb.Utils.initialize_field(data, 'start_time', self.schedule_value);
    Object.defineProperty(self, 'start_time', {
      get: function() {
        var time = parseFloat(data.schedule_value);
        var days = Math.floor((time % 604800) / 86400);

        var hours = Math.floor((time % 86400) / 3600);
        var minutes = Math.round((time % 3600) / 60);

        var months = Math.floor(time / 2592000);

        var weeks = Math.floor((time % 2592000) / 604800);
        var now = (time < 60);
        return scb_common.format_time_detailed({
          weeks: weeks,
          days: days,
          hours: hours,
          minutes: minutes,
          months: months,
          now: now
        }).trim();
      },
      set: function(v) {
        var time = scb.Utils.parse_time(v, context.template.time_unit.kind);
        data.schedule_value = time;
        data.schedule = self.schedule;
      }
    });
  } else {
    scb.Utils.initialize_accessor_field(self, data, 'start_time', "", null, context);
  }
  if (data.duration_value !== "0") {
    scb.Utils.initialize_field(data, 'duration', self.duration_value);
    Object.defineProperty(self, 'duration', {
      get: function() {
        var time = parseFloat(data.duration_value);
        var days = Math.floor((time % 604800) / 86400);
        var hours = Math.floor((time % 86400) / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var months = Math.floor(time / 2592000);
        var weeks = Math.floor((time % 2592000) / 604800);
        var now = (time < 30);
        if (time < 0) {
          return '';
        }
        if (time < 60) {
          var seconds = Math.round(time % 60);
          return scb_common.format_time_detailed_w_sec({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            now: now
          }).trim();

        } else {
          return scb_common.format_time_detailed({
            weeks: weeks,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            months: months,
            now: now
          }).trim();
        }
      },
      set: function(v) {
        var time = scb.Utils.parse_time(v, context.template.time_unit.kind);
        data.duration_value = time;
        data.duration = self.duration;
      }
    });

  } else {
    scb.Utils.initialize_accessor_field(self, data, 'duration', "", null, context);
  }



  self.temperature_name = function() {
    return context.template.experiment_temperatures[data.temperature].name;
  }

  scb.Utils.accessor_toString(self.temperature);
}