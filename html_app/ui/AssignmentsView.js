'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.AssignmentsView = function scb_ui_AssignmentsView(gstate) {
	var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);

	self.show = function(state) {
		window.assignments = assignments;
		var workarea = gstate.workarea;
		workarea.html(scb_assignments.main({
			global_template : gstate.context.master_model,
			assignments : assignments
		}));
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(),gstate.workarea);
        document.title = "Assignments - StarCellBio"
	}

}