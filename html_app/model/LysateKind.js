'use strict';// strict mode to eliminate some common bugs

scb.LysateKindList = function scb_LysateKindList(data, context) {
	var self = this;

	scb.ModelHelpers.common_list_code(self, data, scb.LysateKind, context, self);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		var ret = new scb.LysateKind(d, context);
		data.list.push(d);
		return ret;
	}
}

scb.LysateKind = function scb_LysateKind(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);
	scb.Utils.initialize_accessor_field(self, data, "whole_cell", false, null, context);
	scb.Utils.initialize_accessor_field(self, data, "cytoplasm", false, null, context);
	scb.Utils.initialize_accessor_field(self, data, "nuclear", false, null, context);
	scb.Utils.initialize_accessor_field(self, data, "ip", false, null, context);
	scb.Utils.initialize_accessor_field(self, data, "ip_primary_anti_body", "", null, context);


	scb.Utils.initialize_field(data, 'experiment_id', "");
	scb.Utils.initialize_field(data, 'cell_treatment_id', "");
	scb.Utils.initialize_field(data, 'collection_time_id', "");
	scb.Utils.initialize_field(data, 'ip_secondary_anti_body', "");

	var experiment = context.js_model.current_session.experiment_setup_list.get(data.experiment_id);
	var cell_treatment = experiment.cell_treatment_list.get(data.cell_treatment_id);
	var collection_time = experiment.collection_schedule_list.get(data.collection_time_id);

	self.cell_line_id = cell_treatment.cell_line();
	self.treatment_list = [];
	for (var ti in cell_treatment.treatment_list.list ) {
		var tid = cell_treatment.treatment_list.list[ti].id;
		var treatment = cell_treatment.treatment_list.get(tid);
		var drug_list = treatment.drug_list;
		var drugs = [];
		for (var di in drug_list.list ) {
			var dit = drug_list.list[di].id;
			var drug = drug_list.get(dit);
			var name = drug.drug_name;
			var concentration = drug.drug_concentration();
			drugs.push({
				name : name,
				concentration : concentration
			});
		}
		self.treatment_list.push({
			schedule : treatment.schedule,
			temperature : treatment.temperature,
			drug_list : drugs
		});
	}
	self.collection_time = collection_time.schedule();

	self.lysates = function() {
		var ret = [];
		var template = {
			lysate_kind_id : self.id
		};
		var kinds = ['whole_cell', 'cytoplasm', 'nuclear'];
		for (var i in kinds ) {
			if (data[kinds[i]]) {
				var t = _.clone(template);
				t.kind = kinds[i];
				ret.push(t);
			}
		}
		if (data.ip) {
			var t = _.clone(template);
			t.kind = 'ip';
			t.ip_primary_anti_body = data.ip_primary_anti_body;
			ret.push(t);
		}
		return ret;
	}

	self.__defineGetter__('empty', function() {
		var kinds = ['whole_cell', 'cytoplasm', 'nuclear', 'ip'];
		for (var i in kinds ) {
			if (data[kinds[i]]) {
				return false;
			}
		}
		return true;
	});
}