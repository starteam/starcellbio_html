'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}

scb.ui.ProfileView = function scb_ui_ProfileView(gstate) {
    var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
	var courses = _.groupBy(assignments.list, function (assignment) {
		return (assignment.course);
	});
	
    self.show = function (state) {
        window.assignments = assignments;
        var workarea = gstate.workarea;
        $.ajax({
			type: "GET",
			url: 'scb/get_courses.js',
			success: function(data){
				eval(data);
				var listing = new Array();
				for(var y = 0; y < get_courses_result.length; y++){
					listing.push(JSON.parse(get_courses_result[y]));
				}
				var model = gstate.context.master_model;

				model.assignments = {
					list: listing
				};
				model.assignments.selected_id = listing[0].id;
				gstate.context.master_model.assignments = model.assignments;
				self.assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
				self.courses = _.groupBy(self.assignments.list, function (assignment) {
					return (assignment.course);
				});
				workarea.html(scb_profile.main({
					global_template: gstate.context.master_model,
					assignments: self.assignments,
					context: gstate.context,
					courses: self.courses,
				}));	
			}
		});

        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(), gstate.workarea);
        document.title = "Assignments - StarCellBio"
    }

}