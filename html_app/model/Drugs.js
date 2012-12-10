'use strict';

scb.DrugList = function scb_DrugList(data, context,parent) {
	var self = this;
	self.parent = parent;

	scb.ModelHelpers.common_list_code(self, data, scb.Drug, context);

	self.start = function(d) {
		d = ( typeof (d) == 'undefined' ? {} : d);
		var ret = new scb.Drug(d, context);
		data.list.push(d);
		return ret;
	}

	self.start_default = function(d) {
		d = context.template.drug_template ? context.template.drug_template : d ;
		d = d ? d : {} ;
		d = scb.Utils.clone_and_clear(d);
		var ret = new scb.Drug(d, context,self);
		data.list.push(d);
		return ret;		
	}

	self.set_list = function(drug_list) {
		data.list.length = 0;
		for(var i in drug_list) {
			var drug = drug_list[i];
			data.list.push(drug._data);
		}
	}
}

scb.Drug = function scb_Drug(data, context,parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);

	scb.Utils.initialize_field(data, 'drug_id', null);
	scb.Utils.initialize_field(data, 'concentration_id', null);

	scb.Utils.initialize_accessor_field(self, data, 'drug_id', null, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'concentration_id', null, null, context);

	scb.utils.accessor2_custom(self, 'drug_name', function() {
		return data.drug_id != null ? context.template.drugs[data.drug_id].name : '';
	}, scb.utils.read_only_exception);

    scb.utils.accessor2_custom(self, 'drug_concentration' , function() {
		return data.concentration_id != null ? context.template.concentrations[data.concentration_id].name : '';
	}, scb.utils.read_only_exception);

	scb.Utils.accessor_toString(self.drug_id);
	scb.Utils.accessor_toString(self.concentration_id);
}