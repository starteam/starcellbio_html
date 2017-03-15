'use strict';

scb.WesternBlotLaneList = function scb_WesternBlotLaneList(data, context, parent) {
  var self = this;
  self.parent = parent;
  scb.ModelHelpers.common_list_code(self, data, scb.WesternBlotLane, context, self);


  self.start = function(d) {
    d = (typeof (d) == 'undefined' ? {} : d);
    var ret = new scb.WesternBlotLane(d, context, self);
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
      for (var x in data.list) {
        if (data.list[x].id == new_id) {
          data.list[x].order_id = parseInt(i);
          new_list.push(data.list[x]);
        }
      //             	if(new_id == 'marker'){
      //             		new_list.push(data.list[x]);
      //             	}
      }
    }
    if (new_list.length == data.list.length) {
      //|| ($.inArray("marker", new_list) && new_list.length == data.list.length+1)
      data.list = new_list;
    } else {
      throw "NEW ORDER LENGTH != ORDER_LENGTH";
    }
  };

  scb.ModelHelpers.grouped_list(self, 'cell_treatment_id');
}

scb.WesternBlotLane = function scb_WesternBlotLane(data, context, parent) {
  var self = this;
  self.parent = parent;
  scb.ModelHelpers.common_entry_code(self, data, context);
  scb.Utils.initialize_accessor_field(self, data, 'kind', _.keys(context.template.lysate_kinds)[0], null, context);
  scb.Utils.initialize_accessor_field(self, data, 'ip', false, null, context);
  //    scb.Utils.initialize_accessor_field(self, data, 'amount_of_protein_loaded', context.template.ui_configuration.amount_of_protein_loaded, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'marks', [], null, context);
  scb.Utils.initialize_accessor_field(self, data, 'cell_treatment_id', null, null, context);
  scb.Utils.initialize_accessor_field(self, data, 'collection_schedule_id', null, null, context);

  scb.Utils.initialize_accessor_field(self, data, 'order_id', 0, null, context);
  //    if (context.template.ui_configuration.lysate_display_ip) {
  //        scb.Utils.initialize_accessor_field(self, data, 'ip_primary_anti_body', _.keys(context.template.ip_primary_anti_body)[0], null, context);
  //        scb.Utils.initialize_accessor_field(self, data, 'ip_secondary_anti_body', _.keys(context.template.ip_secondary_anti_body)[0], null, context);
  //    }


  scb.Utils.initialize_field(data, 'experiment_id', null);

  scb.Utils.accessor2(self, 'making_lysate_id', data);
  scb.utils.accessor2_custom(self, 'experiment', function() {
    var experiment = self.parent.parent.parent.parent;
    return experiment;
  }, scb.utils.noop);

  scb.utils.accessor2_custom(self, 'cell_treatment', function() {
    return self.experiment.cell_treatment_list.get(data.cell_treatment_id);
  }, scb.utils.noop);

  scb.utils.accessor2_custom(self, 'collection_schedule', function() {
    return self.cell_treatment.collection_schedule_list.get(data.collection_schedule_id);
  }, scb.utils.noop);

  scb.utils.accessor2_custom(self, 'kinds', function() {
    return context.template.lysate_kinds;
  }, scb.utils.noop);

}