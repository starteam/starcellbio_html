'use strict';

scb.FacsLanePreparationList = function scb_FacsLanePreparationList(data, context, parent) {
  var self = this;
  self.parent = parent;
  scb.ModelHelpers.common_list_code(self, data, scb.FacsLanePreparation, context, self);

  self.start = function(d) {
    d = (typeof (d) == 'undefined' ? {} : d);
    var ret = new scb.FacsLanePreparation(d, context, self);
    data.list.push(d);
    return ret;
  };

  self.duplicate = function(id) {
    var orig = _.find(data.list, function(e) {
      return e.id == id;
    });
    if (scb.utils.isDefined(orig)) {
      var clone = scb.utils.clone_and_clear(orig)
      return self.start(clone);
    }
  };

  self.reorder = function(new_order) {
    var new_list = [];
    for (var i in new_order) {
      var new_id = new_order[i];
      new_list.push(_.find(data.list, function(e) {
        return e.id == new_id
      }));
    }
    if (new_list.length == data.list.length) {
      data.list = new_list;
    } else {
      throw "NEW ORDER LENGTH != ORDER_LENGTH";
    }
  }

  self.filter = function(experiment_id, cell_treatment_id, collection_schedule_id) {
    var all = self.list;
    var ret = [];
    for (var i in all) {
      var x = all[i];
      if (x.experiment.id == experiment_id && x.cell_treatment.id == cell_treatment_id && x.collection_schedule.id == collection_schedule_id) {
        ret.push(x);
      }
    }
    return ret;
  }

  self.reset = function() {
    data.list = [];
  }
}

scb.FacsLanePreparation = function scb_FacsLanePreparation(data, context, parent) {
  var self = this;
  self.parent = parent;

  scb.ModelHelpers.common_entry_code(self, data, context);
  scb.Utils.initialize_accessor_field(self, data, 'kind', null, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'treatment', null, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'sub_treatment', null, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'chart_data', null, null, context);
}