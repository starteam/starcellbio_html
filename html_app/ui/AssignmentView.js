'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.AssignmentView = function scb_ui_AssignmentView(gstate) {
	var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);

	self.show = function(state) {
		var workarea = state.workarea;
		var last_step;
		if(assignments.selected && assignments.selected.experiments.list.length >0)
        	last_step = assignments.selected.experiments.selected.last_step;
        else
        	last_step=state.assignment.experiments.last_step;
		workarea.html(scb_assignment.main({
            global_template : gstate.context.master_model,
            context: gstate.context,
            last_step: last_step,
			t : state.assignment.template,
            assignment: state.assignment
		}));
		//state.assignments.last_step = 2;
        document.title = state.assignment.name + " - StarCellBio" ;

	}
}