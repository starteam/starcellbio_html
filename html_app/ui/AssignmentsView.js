'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}

scb.ui.AssignmentsView = function scb_ui_AssignmentsView(gstate) {
    var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
    var courses = _.groupBy(assignments.list, function (assignment) {
        return (assignment.course);
    });
    self.show = function (state) {
        window.assignments = assignments;
        var workarea = gstate.workarea;
        var last_step;
        if(assignments.selected && assignments.selected.experiments.list.length >0)
        	last_step = assignments.selected.experiments.selected.last_step;
        else
        	last_step=1;
        workarea.html(scb_assignments.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            context: gstate.context,
            courses: courses,
        }));
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(), gstate.workarea);
        document.title = "Assignments - StarCellBio"
    }

}