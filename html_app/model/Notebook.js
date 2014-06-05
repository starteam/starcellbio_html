'use strict';// strict mode to eliminate some common bugs


scb.Notebook = function scb_Notebook(data, context, parent) {
    var self = this;
    self.parent = parent;
    scb.ModelHelpers.common_entry_code(self, data, context);

 	scb.Utils.initialize_accessor_field(self, data, 'scroll', 0, null, context);
 	scb.Utils.initialize_accessor_field(self, data, 'edit_text', false, null, context);
	scb.Utils.initialize_accessor_field(self, data, 'edit_image', false, null, context);
	scb.Utils.initialize_accessor_field(self,data,'sections',{},scb.NotebookSectionList,context);



	


}