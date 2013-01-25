'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.HomepageView = function scb_ui_HomepageView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = gstate.workarea;
		workarea.html(scb_homepage.main({
			global_template : gstate.context.master_model
		}));
	}

}