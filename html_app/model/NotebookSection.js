'use strict';// strict mode to eliminate some common bugs

scb.NotebookSectionList = function scb_NotebookSectionList(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_list_code(self, data, scb.NotebookSection, context, self);

	self.start = function(d) {
        d = ( typeof (d) == 'undefined' ? {} : d);
        d.name = d.name || "Section. " + data.counter++;
		var ret = new scb.NotebookSection(d, context, self);
		data.list.push(d);
		return ret;
	}

	
}

scb.NotebookSection = function scb_NotebookSection(data, context, parent) {
	var self = this;
	self.parent = parent;
	scb.ModelHelpers.common_entry_code(self, data, context);
    // experiment_design_fields
    scb.Utils.initialize_accessor_field(self,data,'hypothesis','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'objective','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'technique','',null,context);
    scb.Utils.initialize_accessor_field(self,data,'order_id',0,null,context);
	scb.Utils.initialize_accessor_field(self,data,'elements',{},scb.NotebookElementList,context);
	
	
	
}