if ( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.FacsView = function scb_ui_AssignmentsView(state) {
	var self = this;
	var workarea = state.workarea;
	var experiment = state.experiment;
	var facs_list = experiment.facs_list;
	var facs = state.facs;

	self.show = function() {
		$('.workspace', workarea).html(scb_ui.display_facs_list({
			facs_list : facs_list
		}));
		scb.utils.call_back(state.context.repaint_sidebar);
	}
}