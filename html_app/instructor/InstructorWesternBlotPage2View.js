'use strict';

if (typeof (scb.ui ) == 'undefined') {
    scb.ui = {};
}


scb.ui.static = scb.ui.static || {};
scb.ui.static.InstructorWesternBlotPage2View = scb.ui.static.InstructorWesternBlotPage2View || {};



scb.ui.static.InstructorWesternBlotPage2View.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');


    var state = {
        assignment_id: assignment_id,
        view: 'assignments',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.InstructorFrame.validate_state(state);

    return parsed;
}



scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_page2_save_assignment_button = function(element, workarea){

	var parsed = scb.ui.static.InstructorWesternBlotPage2View.parse(element);
	
	scb.ui.static.InstructorFrame.pending_save(parsed);
	
	
	var state = {
		assignment_id: parsed.assignment.id,
		view: 'western_blot_page3',
		skip_hash_update: true
	};
				   
	scb.ui.static.InstructorFrame.refresh(state);
}

scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_primary_anti_body_list_item = function(element, workarea){
	var parsed = scb.ui.static.InstructorWesternBlotPage2View.parse(element);
	var anti_body_id = $(element).attr('anti_body_id') ? $(element).attr('anti_body_id'):  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		if(!parsed.assignment.template.primary_anti_body[anti_body_id]){
		
		parsed.assignment.template.primary_anti_body[anti_body_id] = {
                    name: $(element).val(),
                    secondary: [],
                    marks: [],
                    total_marks: [],
                    whole_marks:[],
                    nuclear_marks: [],
                    cyto_marks: [],
                    gel_name: $(element).val()
                };
        }
        else{
        parsed.assignment.template.primary_anti_body[anti_body_id] = {
                    name: $(element).val(),
                    secondary: parsed.assignment.template.primary_anti_body[anti_body_id].secondary,
                    marks: parsed.assignment.template.primary_anti_body[anti_body_id].marks,
                    whole_marks:parsed.assignment.template.primary_anti_body[anti_body_id].whole_marks,
                    total_marks: parsed.assignment.template.primary_anti_body[anti_body_id].total_marks,
                    nuclear_marks: parsed.assignment.template.primary_anti_body[anti_body_id].nuclear_marks,
                    cyto_marks: parsed.assignment.template.primary_anti_body[anti_body_id].cyto_marks,
                    gel_name: $(element).val()
                };
        }

	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_secondary_anti_body_list_item = function(element, workarea){
	var parsed = scb.ui.static.InstructorWesternBlotPage2View.parse(element);
	var idExists=false; 
	var existing_id = '';
	_.each(parsed.assignment.template.secondary_anti_body, function(key, value, list){ 
		if(key.name==$.trim($(element).val())){
			 existing_id = value;
			idExists=true;
		}
	});
	var secondary_id = idExists ? existing_id:  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	var anti_body_id = $(element).attr('anti_body_id') ? $(element).attr('anti_body_id'):  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	
	parsed.assignment.template.secondary_anti_body[secondary_id] = {name: $(element).val()};;

	
	
	
	if(!parsed.assignment.template.primary_anti_body[anti_body_id]){
		
		parsed.assignment.template.primary_anti_body[anti_body_id] = {
                    name: '',
                    secondary: [secondary_id],
                    marks: [],
                    whole_marks:[],
                    total_marks: [],
                    nuclear_marks: [],
                    cyto_marks: [],
                    gel_name: ''
                };
        }
        else{
        parsed.assignment.template.primary_anti_body[anti_body_id] = {
                    name: parsed.assignment.template.primary_anti_body[anti_body_id].name,
                    secondary:[secondary_id],
                    marks: parsed.assignment.template.primary_anti_body[anti_body_id].marks,
                    whole_marks:parsed.assignment.template.primary_anti_body[anti_body_id].whole_marks,
                    total_marks: parsed.assignment.template.primary_anti_body[anti_body_id].total_marks,
                    nuclear_marks: parsed.assignment.template.primary_anti_body[anti_body_id].nuclear_marks,
                    cyto_marks: parsed.assignment.template.primary_anti_body[anti_body_id].cyto_marks,
                    gel_name: parsed.assignment.template.primary_anti_body[anti_body_id].gel_name
                };
        }
        
        	scb.ui.static.InstructorFrame.refresh();

}
scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_add_primary_anti_body = function(element, workarea){
	var parsed = scb.ui.static.InstructorWesternBlotPage2View.parse(element);
	var anti_body_id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	
	parsed.assignment.template.primary_anti_body[anti_body_id] = {
                    name: '',
                    secondary: [],
                    marks: [],
                    whole_marks:[],
                    total_marks: [],
                    nuclear_marks: [],
                    cyto_marks: [],
                    gel_name: ''
                };
    	scb.ui.static.InstructorFrame.refresh();

}


scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_page2_remove_row = function(element, workarea){
	var parsed = scb.ui.static.InstructorWesternBlotPage2View.parse(element);
	var anti_body_id = $(element).attr('anti_body_id');
	delete parsed.assignment.template.primary_anti_body[anti_body_id];

	
	scb.ui.static.InstructorFrame.refresh();

}

scb.ui.static.InstructorWesternBlotPage2View.register = function(workarea) {

    
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page2_save_assignment_button', function (e) {
    	scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_page2_save_assignment_button(this, e);
    });
    
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_primary_anti_body_list_item', function (e) {
    	scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_primary_anti_body_list_item(this, e);
    });
    
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_secondary_anti_body_list_item', function (e) {
    	scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_secondary_anti_body_list_item(this, e);
    });
    
    
    
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_add_primary_anti_body', function (e) {
    	scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_add_primary_anti_body(this, e);
    });
    
    
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_page2_remove_row', function (e) {
    	scb.ui.static.InstructorWesternBlotPage2View.scb_f_western_blot_page2_remove_row(this, e);
    });
    
    
    
  
};



scb.ui.static.InstructorWesternBlotPage2View.rows = function(dialog){
	var rows =[];
	var headings = dialog.headings;
	_.each(dialog.order, function(strain){
		_.each(dialog[strain].rows, function(row){
			var insert_row = {treatment_id:row.treatment_id, row: []};
			_.each(row.cells, function(cell){
				if(cell.kind=='text')
					insert_row.row.push(cell.text);
				else
					insert_row.row.push('cell_plate');
				
			});
			rows.push(insert_row);
		});
	});

	return rows;
}

scb.ui.InstructorWesternBlotPage2View = function scb_ui_InstructorWesternBlotPage2View(gstate) {
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
        
        var rows = scb.ui.static.InstructorWesternBlotPage2View.rows(assignments.selected.template.ui.add_multiple_dialog);

        workarea.html(scb_instructor_western_blot_page2.main({
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