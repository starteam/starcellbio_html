'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorExperimentSetupPage3View = scb.ui.static.InstructorExperimentSetupPage3View || {};



scb.ui.static.InstructorExperimentSetupPage3View.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}

scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_remove_row = function(element, workarea){
	var parsed = scb.ui.static.InstructorExperimentSetupPage3View.parse(element);
	var treatment_id = $(element).attr('treatment_id');
	var delete_row = null;
	_.each(parsed.assignment.template.ui.add_multiple_dialog, function(strain){
		if(strain.rows){
			var delete_row = _.filter(strain.rows, function(row){
				return row.treatment_id == treatment_id;
			});
			if(delete_row.length > 0)
				strain.rows = _.without(strain.rows, delete_row[0]);
			
		}
	
	});
	
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_save_assignment_button = function(element, workarea){

	var parsed = scb.ui.static.InstructorExperimentSetupPage3View.parse(element);
	
	scb.ui.static.InstructorFrame.pending_save(parsed);
	
	
	var state = {
		assignment_id: parsed.assignment.id,
		view: 'experiment_setup_page4',
		skip_hash_update: true
	};
				   
	scb.ui.static.InstructorFrame.refresh(state);
}


scb.ui.static.InstructorExperimentSetupPage3View.register = function(workarea) {

    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_page3_save_assignment_button', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_save_assignment_button(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_page3_remove_row', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_remove_row(this, e);
    });
    
    
    
};

scb.ui.static.InstructorExperimentSetupPage3View.rows = function(dialog){
	var rows =[];
	_.each(dialog.order, function(strain){
		_.each(dialog[strain].rows, function(row){
			var insert_row = {treatment_id:row.treatment_id, row: []};
			_.each(row.cells, function(cell){
				if(cell.kind=='text')
					insert_row.row.push(cell.text);
				
			});
			rows.push(insert_row);
		});
	});
	rows = rows.sort(
		function(a, b){
			if( a.row[0] > b.row[0]) return 1;
			if( a.row[0] < b.row[0]) return -1;
			if(a.row[0] == b.row[0]) return 0;
		}
	);
	return rows;
}

scb.ui.InstructorExperimentSetupPage3View = function scb_ui_InstructorExperimentSetupPage3View(gstate) {
    var self = this;
    var assignments = new scb.AssignmentList(gstate.context.master_model.assignments, gstate.context);
    var courses = _.groupBy(assignments.list, function (assignment) {
        return (assignment.course);
    });
    self.show = function (state) {
        window.assignments = assignments;
        var workarea = gstate.workarea;
        var last_step=1;
        var prev_step;
        
        var kind = 'select_course';
        
        if(assignments.selected.course_prepared){
        	kind = 'create_assignment';
        }
        
        
        if(assignments.selected.experiments.selected !=null)
        	prev_step=assignments.selected.experiments.selected.prev_step;
        else prev_step = null;
        
        var rows = scb.ui.static.InstructorExperimentSetupPage3View.rows(assignments.selected.template.ui.add_multiple_dialog);
        
        
        
        workarea.html(scb_instructor_experiment_setup_page3.main({
            global_template: gstate.context.master_model,
            assignments: assignments,
            last_step: last_step,
            prev_step: prev_step,
            kind: kind,
            headings: assignments.selected.template.ui.add_multiple_dialog.headings, 
            rows: rows,
            assignment: assignments.selected,
            context: gstate.context,
            courses: courses,
        }));
        
        document.title = "Assignments - StarCellBio"
            $('.scb_s_ref_info_link').click(function(){
        	$('.scb_assignments_header_link_wrapper[value="Reference Material"]').click();
        });


		$('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: 0
			});
		$(window).resize(function(){

			$('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: ($(window).height() - $('#main').outerHeight())/2
			});

		});

    }

}