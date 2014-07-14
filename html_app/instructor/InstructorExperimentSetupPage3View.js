'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorExperimentSetupPage3View = scb.ui.static.InstructorExperimentSetupPage3View || {};

scb.ui.static.InstructorExperimentSetupPage3View.SORT_TOTAL =  4;


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

scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_sort_button = function(element, workarea){
		var parsed = scb.ui.static.InstructorExperimentSetupPage3View.parse(element);
	  $.jqDialog.content(scb_instructor_experiment_setup_page3.sort_window({assignment: parsed.assignment}));
	  $('.scb_f_sort_close_button').click(function(){
	  if($('.scb_s_sort_dialog').length >0){
			$('.scb_s_sort_dialog').remove();
			$('.overlay').remove();
			$('#jqDialog_box').hide();
		}
	  });
	  
	  $('.scb_f_experiment_setup_page3_sort').click(function(){
	  	parsed.assignment.sort = [];
	  	_.each($('.scb_f_experiment_setup_page3_sort_row'), function(key,value,list){
	  		var index = value+1;
	  		if($('.scb_f_experiment_setup_page3_checkbox_sort'+index, key).attr('checked')){
	  			var sort_object = {}
	  			sort_object['sort'] = $('.scb_f_experiment_setup_page3_field_sort'+index, key).val();
	  			sort_object['sort_type'] = $('.scb_f_experiment_setup_page3_type_sort'+index, key).val();
	  			parsed.assignment.sort.push(sort_object);
	  		}
	  	});
		if($('.scb_s_sort_dialog').length >0){
			$('.scb_s_sort_dialog').remove();
			$('.overlay').remove();
			$('#jqDialog_box').hide();
		}
	  	
	  	scb.ui.static.InstructorFrame.refresh();
	  });
	  
	  


}

scb.ui.static.InstructorExperimentSetupPage3View.scb_f_sort_close_button = function(element, workarea){
		var parsed = scb.ui.static.InstructorExperimentSetupPage3View.parse(element);

		
}

scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_sort = function(element, workarea){
		var parsed = scb.ui.static.InstructorExperimentSetupPage3View.parse(element);

}

scb.ui.static.InstructorExperimentSetupPage3View.register = function(workarea) {

    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_page3_save_assignment_button', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_save_assignment_button(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_page3_remove_row', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_page3_remove_row(this, e);
    });
    
    
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_sort_button', function (e) {
    	scb.ui.static.InstructorExperimentSetupPage3View.scb_f_experiment_setup_sort_button(this, e);
    });
    
   
    
   
    
};

scb.ui.static.InstructorExperimentSetupPage3View.rows = function(dialog, sort_order){
	var rows =[];
	var headings = dialog.headings;
	var sorting_conditions = [];
	for(var x = 0 ; x < sort_order.length ; x++){
		for(var y = 0; y < headings.length; y++){
			if(sort_order[x]['sort'] == headings[y]){
				sorting_conditions.push([y-1, sort_order[x]['sort_type']]);
			}
		}
	}
	
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
			if(a.treatment_id == 'zh1zia4i'|| b.treatment_id =='zh1zia4i'){
				console.log('foundit');
			}
			if(sort_order.length <=0){
				if( a.row[0] > b.row[0]) return  1;
				if( a.row[0] < b.row[0]) return -1;
				if(a.row[0] == b.row[0]) return 0;
			}
			if(sort_order.length >=1){
				if( a.row[sorting_conditions[0][0]] > b.row[sorting_conditions[0][0]]) return sorting_conditions[0][1] == 'Ascending'? 1: -1;
				if( a.row[sorting_conditions[0][0]] < b.row[sorting_conditions[0][0]]) return sorting_conditions[0][1] == 'Ascending' ? -1: 1;
// 				if(a.row[sorting_conditions[0][0]] == b.row[sorting_conditions[0][0]]) return 0;
			}
			if(sort_order.length >=2){
				if( a.row[sorting_conditions[1][0]] > b.row[sorting_conditions[1][0]]) return sorting_conditions[1][1] == 'Ascending'? 1: -1;
				if( a.row[sorting_conditions[1][0]] < b.row[sorting_conditions[1][0]]) return sorting_conditions[1][1] == 'Ascending' ? -1: 1;
// 				if(a.row[sorting_conditions[1][0]] == b.row[sorting_conditions[1][0]]) return 0;
			}
			if(sort_order.length >=3){
				if( a.row[sorting_conditions[2][0]] > b.row[sorting_conditions[2][0]]) return sorting_conditions[2][1] == 'Ascending'? 1: -1;
				if( a.row[sorting_conditions[2][0]] < b.row[sorting_conditions[2][0]]) return sorting_conditions[2][1] == 'Ascending' ? -1: 1;
// 				if(a.row[sorting_conditions[2][0]] == b.row[sorting_conditions[2][0]]) return 0;
			}
			if(sort_order.length >=4){
				if( a.row[sorting_conditions[3][0]] > b.row[sorting_conditions[3][0]]) return sorting_conditions[3][1] == 'Ascending'? 1: -1;
				if( a.row[sorting_conditions[3][0]] < b.row[sorting_conditions[3][0]]) return sorting_conditions[3][1] == 'Ascending' ? -1: 1;
// 				if(a.row[sorting_conditions[3][0]] == b.row[sorting_conditions[3][0]]) return 0;
			}
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
        
        var rows = scb.ui.static.InstructorExperimentSetupPage3View.rows(assignments.selected.template.ui.add_multiple_dialog, assignments.selected.sort);
        
        
        
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