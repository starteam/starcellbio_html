'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.AssignmentView = function scb_ui_AssignmentView(gstate) {
	var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);

	self.show = function(state) {
		var workarea = state.workarea;
		workarea.html(scb_assignment.main({
            global_template : gstate.context.master_model,
            context: gstate.context,
			t : state.assignment.template,
            assignment: state.assignment
		}));
        document.title = state.assignment.name + " - StarCellBio" ;

	}
}