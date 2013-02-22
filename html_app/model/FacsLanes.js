'use strict';

scb.FacsLaneList = function scb_FacsLaneList(data, context,parent) {
	var self = this;
	self.parent = parent;

	scb.Utils.initialize_field(data, 'list', []);

	Object.defineProperty(self, "list", {
		get : function() {
			var ret = [];
			for (var i in data.list ) {
				var d = data.list[i];
				ret.push(new scb.FacsLane(d, context,self));
			}
			return ret;
		}
	});

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		var ret = new scb.FacsLane(d, context,self);
		data.list.push(d);
		return ret;
	}

	self.ensure_experiment_lanes_for_experiment = function(experiment_id) {
		var assignment = context.js_model.current_assignment;
		var experiment = assignment.experiments.get(experiment_id);
		var ctl = experiment.cell_treatment_list.list;
		for (var cti in ctl ) {
			var ct = ctl[cti];
			var csl = ct.collection_schedule_list.list;
			for (var csi in csl ) {
				var cs = csl[csi];
				var list = self.filter(experiment.id, ct.id, cs.id);
				if (list.length == 0) {
					self.start({
						experiment_id : experiment_id,
						cell_treatment_id : ct.id,
						collection_schedule_id : cs.id,
					});
				}
			}
		}
	}

	self.duplicate = function(id) {
		var orig = _.find(data.list, function(e) {
			return e.id == id;
		});
		if (scb.utils.isDefined(orig)) {
			var clone = scb.utils.clone_and_clear(orig)
			return self.start(clone);
		}
	}

	self.remove = function(id) {
		var new_list = _.reject(data.list, function(s) {
			return s.id == id
		});
		data.list.length = 0;
		for (var i in new_list ) {
			data.list.push(new_list[i]);
		}
		console.info(data.list);
	}

	self.get = function(id) {
		return new scb.FacsLane(_.find(data.list, function(e) {
			return e.id == id;
		}), context,self);
	}

	self.reorder = function(new_order) {
		var new_list = [];
		for (var i in new_order ) {
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
		for (var i in all ) {
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

	scb.utils.accessor2_custom(self, 'length', function() {
		return data.list.length;
	}, scb.utils.read_only_exception);

    scb.ModelHelpers.grouped_list(self,'cell_treatment_id');
}

scb.FacsLane = function scb_FacsLane(data, context,parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);
    scb.Utils.initialize_accessor_field(self, data, 'kind', null,null, context);

//	scb.Utils.initialize_accessor_field(self, data, 'preparation_list', {list:[]}, scb.FacsLanePreparationList, context);
//	scb.Utils.initialize_accessor_field(self, data, 'enabled', false,null, context);
//	scb.Utils.initialize_accessor_field(self, data, 'collection_schedule_id', null,null, context);
	scb.Utils.initialize_accessor_field(self, data, 'cell_treatment_id', null,null, context);

	scb.Utils.initialize_field(data, 'experiment_id', self.parent.parent.parent.parent);

	scb.utils.accessor2_custom(self, 'experiment', function() {
		var assignment = context.js_model.current_assignment;
		var experiment = assignment.experiments.get(data.experiment_id);
		return experiment;
	}, scb.utils.noop);

	scb.utils.accessor2_custom(self, 'cell_treatment', function() {
		return self.experiment.cell_treatment_list.get(data.cell_treatment_id);
	}, scb.utils.noop);

	scb.utils.accessor2_custom(self, 'collection_schedule', function() {
		return self.cell_treatment.collection_schedule_list.get(data.collection_schedule_id);
	}, scb.utils.noop);

    scb.utils.accessor2_custom(self, 'kinds', function () {
            return context.template.facs_kinds;
        }, scb.utils.noop);

}