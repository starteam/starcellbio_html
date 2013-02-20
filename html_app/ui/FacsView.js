


scb.ui.FacsView = function scb_ui_FacsView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = gstate.workarea;
		workarea.html(scb_facs.main({
			global_template : gstate.context.master_model
		}));
        document.title = "FACS - StarCellBio";
	}
}