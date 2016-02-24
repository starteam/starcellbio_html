'use strict'; // strict mode to eliminate some common bugs

scb.MakingLysateList = function scb_MakingLysateList(data, context, parent) {
  var self = this;
  self.parent = parent;
  scb.ModelHelpers.common_list_code(self, data, scb.MakingLysate, context, self);

  self.start = function(d) {
    d = (typeof (d) == 'undefined' ? {} : d);
    if (!d.hasOwnProperty('name')) {
      d.name = 'Setup ' + data.counter++;
    }

    var ret = new scb.MakingLysate(d, context);
    data.list.push(d);
    return ret;
  }

  self.new_using_experiment = function(experiment_setup_id) {
    var experiment = context.js_model.current_session.experiment_setup_list.get(experiment_setup_id);
    var d = {
      name: "Lysate prep " + data.counter++
    };
    var ml = new scb.MakingLysate(d, context);
    for (var ct in experiment.cell_treatment_list.list) {
      var cell_treatment_data = experiment.cell_treatment_list.list[ct];
      for (var st in experiment.collection_schedule_list.list) {
        var collection_time_data = experiment.collection_schedule_list.list[st];
        ml.lysate_kind_list.start({
          experiment_id: experiment.id,
          cell_treatment_id: cell_treatment_data.id,
          collection_time_id: collection_time_data.id
        });
      }
    }
    data.list.push(d);
    self.select_id(ml.id);
    return ml;
  }
}

scb.MakingLysate = function scb_MakingLysate(data, context, parent) {
  var self = this;
  self.parent = parent;
  scb.ModelHelpers.common_entry_code(self, data, context);
  scb.Utils.initialize_accessor_field(self, data, 'finished', false, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'lysate_kind_list', {}, scb.LysateKindList, context);
}