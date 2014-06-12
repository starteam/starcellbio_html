'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.NotebookView = scb.ui.static.NotebookView || {};
scb.ui.static.NotebookView.TOTAL_TABS =  4;
scb.ui.static.NotebookView.TOTAL_STEPS =  5;


scb.ui.static.NotebookView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var notebook_id = $(element).attr('notebook_id');
    var section_id = $(element).attr('section_id');


    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        notebook_id: notebook_id,
        section_id: section_id,
        view: 'notebook',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}

scb.ui.static.NotebookView.scb_f_notebook_text_button = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	parsed.notebook.edit_text = true;
	parsed.notebook.edit_image = false;
	//tinyMCE.activeEditor.getContent()
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.NotebookView.scb_f_notebook_image_button = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	
	parsed.notebook.edit_image = true;
	parsed.notebook.edit_text = false;

	if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}


scb.ui.static.NotebookView.scb_f_notebook_save_text_button = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    if (event) {
        scb.ui.static.MainFrame.refresh();
        
    }
}

scb.ui.static.NotebookView.scb_f_notebook_image_close_button = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	
	parsed.notebook.edit_image = false;

    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.NotebookView.scb_f_notebook_image_insert_open_button = function(element){


    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.NotebookView.scb_f_notebook_save_text_button = function (element) {
	var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	
	parsed.section.elements.start({type: 'text',
		data: tinyMCE.activeEditor.getContent()
	 });

	parsed.notebook.edit_text = false;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.NotebookView.scb_f_notebook_image_insert_close_button = function(element){



    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.NotebookView.scb_f_notebook_add_section_button = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
    parsed = resetScrollValue(parsed);
	var new_section = parsed.notebook.sections.start({
		assignment_id: parsed.assignment.id, 
		experiment_id: parsed.experiment.id, 
		notebook_id: parsed.notebook.id
	});
	parsed.notebook.sections.selected_id = new_section.id;
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.NotebookView.scb_f_notebook_experiment_design_link = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
    parsed = resetScrollValue(parsed);
    var image_id = $(element).attr('image_id');
    
    
    var current_experiment = parsed.assignment.experiments.get(image_id);
    parsed.notebook.image_experiment_id = current_experiment.id;
    
    var selected_experiment = parsed.notebook.selected_experiment;
    
	
	
	parsed.section.elements.start({type: 'image',
		view: 'experiment_design',
		experiment_id: current_experiment.id
	 });
    parsed.experiment.last_view = 'notebook';
    scb.ui.static.MainFrame.refresh();
}



scb.ui.static.NotebookView.scb_f_notebook_experiment_setup_link = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
    parsed = resetScrollValue(parsed);
    var image_id = $(element).attr('image_id');
    
    
    var current_experiment = parsed.assignment.experiments.get(image_id);
    parsed.notebook.image_experiment_id = current_experiment.id;
    
    var selected_experiment = parsed.notebook.selected_experiment;
    
	
	var headings = scb.ui.static.ExperimentSetupView.headings(parsed.assignment.template.ui.experiment_setup.table);
	var rows = scb.ui.static.ExperimentSetupView.rows(current_experiment.cell_treatment_list.list, headings, parsed.assignment.template);
	_.each(rows, function(e){delete e.treatment });
	
	parsed.section.elements.start({type: 'image',
		view: 'experiment_setup',
		experiment_id: current_experiment.id,
		headings: headings,
		rows: rows
	 });
     parsed.experiment.last_view = 'notebook';
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.NotebookView.scb_f_notebook_wb_link = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var image_id = $(element).attr('image_id');
    var wb_id = $(element).attr('wb_id');
    var e_id = $(element).attr('e_id');
    var current_experiment = parsed.assignment.experiments.get(e_id);
    var western_blot = current_experiment.western_blot_list.get(wb_id);
    var gel = current_experiment.western_blot_list.get(wb_id).gel_list.get(image_id);
    
    
    parsed.notebook.image_western_blot_id = western_blot.id;
    parsed.notebook.image_experiment_id = current_experiment.id;
    parsed.notebook.image_western_blot_gel_id = gel.id;
    
    
    
	var rows = western_blot.rows_state().rows;
	_.each(rows, function(e){
		delete e.cell_treatment;
		e.lane_id = e.lane.id;
		e.lane_name = e.lane.kinds[e.lane.kind].name;
		e.is_valid = e.is_valid ? true: false;
		delete e.lane;
	
	});
	    
    parsed.section.elements.start({type: 'image',
		view: 'western_blot',
		experiment_id: current_experiment.id,
		western_blot_id: western_blot.id,
		gel_id: gel.id,
		rows: rows,
		exposure_time: scb.utils.print_time_w_seconds(gel.exposure_time)
	 });
     parsed.experiment.last_view = 'notebook';
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.NotebookView.scb_f_notebook_facs_link = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var image_id = $(element).attr('image_id');
    var facs_id = $(element).attr('facs_id');
    var e_id = $(element).attr('e_id');
    var current_experiment = parsed.assignment.experiments.get(e_id);
    var facs = current_experiment.facs_list.get(facs_id);
    var lane = current_experiment.facs_list.get(facs_id).lanes_list.get(image_id);
    
    parsed.notebook.image_facs_id = facs.id;
    parsed.notebook.image_experiment_id = current_experiment.id;
    parsed.notebook.image_facs_lane_id = lane.id;
    

	    
    parsed.section.elements.start({type: 'image',
		view: 'facs',
		experiment_id: current_experiment.id,
		facs_id: facs.id,
		facs_lane_id: lane.id
	 });
     parsed.experiment.last_view = 'notebook';
    scb.ui.static.MainFrame.refresh();
}



scb.ui.static.NotebookView.scb_f_notebook_micro_link = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var image_id = $(element).attr('image_id');
    var microscopy_id = $(element).attr('micro_id');
    var e_id = $(element).attr('e_id');
    var current_experiment = parsed.assignment.experiments.get(e_id);
    var microscopy = current_experiment.microscopy_list.get(microscopy_id);
    var lane = current_experiment.microscopy_list.get(microscopy_id).lanes_list.get(image_id);
    
    parsed.notebook.image_microscopy_id = microscopy.id;
    parsed.notebook.image_experiment_id = current_experiment.id;
    parsed.notebook.image_microscopy_lane_id = lane.id;
    

	    
    parsed.section.elements.start({type: 'image',
		view: 'microscopy',
		experiment_id: current_experiment.id,
		microscopy_id: microscopy.id,
		microscopy_lane_id: lane.id
	 });
     parsed.experiment.last_view = 'notebook';
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.NotebookView.scb_f_notebook_section = function(element){
	var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	
	parsed.notebook.section_selected = parsed.section.id;
	scb.ui.static.MainFrame.refresh();
}












scb.ui.static.NotebookView.scb_f_microscopy_sample_inactive_all = function (element) {
	$('.scb_f_microscopy_sample_active').each(function(e){
		var element = this;
		$(element).attr('checked', false);
		scb.ui.static.NotebookView.scb_f_microscopy_sample_active(element);
	});    
    scb.ui.static.MainFrame.refresh();

}



scb.ui.static.NotebookView.scb_s_microscopy_slide_tab = function(element){
	var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	
	if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    
    parsed.microscopy.lane_selected = parsed.microscopy_lane.id;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.NotebookView.scb_s_microscopy_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	if(parsed.microscopy.enable_samples){
		if (parsed.redisplay) {
			alert("INVALID ELEMENT!");
		}
	   if (parsed.microscopy.samples_finished) {
			$('li', $(element).parent()).removeClass('scb_s_microscopy_sample_selected');
			$(element).addClass('scb_s_microscopy_sample_selected');
			parsed.microscopy.lane_selected = parsed.microscopy_lane.id;
			parsed.microscopy.scroll = $('.scb_s_microscopy_choose_samples_order_list').scrollTop();
			scb.ui.static.MainFrame.refresh();
	   }
   }
}


scb.ui.static.NotebookView.scb_s_microscopy_right_microscopy = function(element, event){
	var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);

	parsed.microscopy.parent.start_tabs_index = parsed.microscopy.parent.start_tabs_index +1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.NotebookView.scb_s_microscopy_add_microscopy= function(element, event){
	var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);

	console.log(parsed.microscopy.parent.start_tabs_index);
	console.log(parsed.microscopy.parent.list.length);
	if(parsed.microscopy.parent.list.length==scb.ui.static.NotebookView.TOTAL_TABS){
		parsed.microscopy.parent.start_tabs_index = 1;
	}
	else if (parsed.microscopy.parent.list.length >scb.ui.static.NotebookView.TOTAL_TABS)
		parsed.microscopy.parent.start_tabs_index = parsed.microscopy.parent.length-(scb.ui.static.NotebookView.TOTAL_TABS-1);
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.NotebookView.scb_f_microscopy_note_close_button= function (element) {
		var parsed = scb.ui.static.NotebookView.parse(element);
	    var note = $(element).attr('note');
    	note = '.' +note;	
		$(note).slideUp('400', function(){
			parsed.microscopy.navigation_show_state  = $('.scb_s_microscopy_tools_navigation_followup', '.scb_s_microscopy_view').is(":visible");
			parsed.microscopy.samples_show_state  = $('.scb_s_microscopy_tools_samples_followup', '.scb_s_microscopy_view').is(":visible");
			//scb.ui.static.MainFrame.refresh();
		});
		
}

scb.ui.static.NotebookView.scb_f_microscopy_tools_toggle = function (element) {
	var parsed = scb.ui.static.NotebookView.parse(element);
	var note = $(element).attr('note');
    note = '.' +note;	
	$(note).slideDown('400', function(){
		parsed.microscopy.navigation_show_state  = $('.scb_s_microscopy_tools_navigation_followup', '.scb_s_microscopy_view').is(":visible");
		parsed.microscopy.samples_show_state  = $('.scb_s_microscopy_tools_samples_followup', '.scb_s_microscopy_view').is(":visible");
		//scb.ui.static.MainFrame.refresh();
	});
	
}

scb.ui.static.NotebookView.register = function (workarea) {


    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_text_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_text_button(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_image_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_image_button(this, e);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_image_close_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_image_close_button(this);
    });
    
       
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_save_text_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_save_text_button(this);
    });
 
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_image_insert_open_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_image_insert_open_button(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_image_insert_close_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_image_insert_close_button(this);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_add_section_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_add_section_button(this);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_experiment_design_link', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_experiment_design_link(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_experiment_setup_link', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_experiment_setup_link(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_wb_link', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_wb_link(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_facs_link', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_facs_link(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_micro_link', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_micro_link(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_section', function (e) {
    	if(e.target.className.indexOf('scb_s_notebook_section') > -1){
        scb.ui.static.NotebookView.scb_f_notebook_section(this);
        }
    });
    
    
    
    
    scb.utils.off_on(workarea, 'click', '.scb_s_notebook_choose_samples_order_list>li', function (e) {
        scb.ui.static.NotebookView.scb_s_notebook_choose_samples_order_list_select(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_sample_inactive_all', function (e, ui){
    	scb.ui.static.NotebookView.scb_f_notebook_sample_inactive_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_sample_remove', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_sample_remove(this);
    });
	    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_tools_toggle', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_tools_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_notebook_note_close_button', function (e) {
    	scb.ui.static.NotebookView.scb_f_notebook_note_close_button(this);
    });
	scb.utils.off_on(workarea, 'mouseup', document, function(e,ui){
    	var container = $(".scb_f_controls_note");
		container.slideUp(); // hide
    });
    scb.utils.off_on(workarea, 'click','.scb_f_controls_note', function(e,ui){
    	e.stopPropagation();
    });
    scb.utils.off_on(workarea, 'click','.scb_f_info_icon', function(e,ui){
    	e.stopPropagation();
    	var note = $(this).attr('note');
    	note = '.' +note;
    	if($(note).is(":visible"))
    		$(note).slideUp();
    	else $(note).slideDown();
    });

}

scb.ui.static.NotebookView.draw_slides = function (workarea) {
    $('.scb_s_microscopy_slide_content', '.scb_s_microscopy_view').each(function () {

        var slide = $(this);
        var parsed = scb.ui.static.NotebookView.parse(this);
        	parsed = resetScrollValue(parsed);

        parsed.slide = slide;
        scb.ui.static.NotebookView.scb_s_microscopy_lens_draw_slide(parsed);
    })
}

scb.ui.NotebookView = function scb_ui_NotebookView(gstate) {
    var self = this;

    self.show = function (state) {
    	var workarea = gstate.workarea;
        var template = state.assignment.template;

        var kind = 'sample_prep';
		
		var last_step=10;
        var prev_step=10;
        
        workarea.html(scb_notebook.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            context: gstate.context,
            notebook: state.notebook,
            section: state.section,
            t: template,
			last_step: state.experiment.last_step == 0 ? last_step :state.experiment.last_step,
			prev_step: state.experiment.prev_step == 0 ? prev_step : state.experiment.prev_step,
        }));
        
//         _.each(state.notebook.sections.list, function(s){
//         	if(s){
//         		_.each(s.elements.list, function(e){
// 					if(e.view=='facs'){
// // 						$($(".scb_s_notebook_section[section_id='"+s.id+"'] > .scb_s_notebook_text_section .scb_s_facs_chart")[x]).attr('facs_lane_id', e.lane_id);
// // 						$($(".scb_s_notebook_section[section_id='"+s.id+"'] > .scb_s_notebook_text_section .scb_s_facs_chart")[x]).attr('facs_id', e.facs_id);
// 					}
// 					if(e.view=='microscopy'){
// // 						$($(".scb_s_notebook_section[section_id='"+s.id+"'] > .scb_s_notebook_text_section .scb_s_microscopy_slide_content")[x]).attr('microscopy_lane_id', s.elements[x].lane_id);
// // 						$($(".scb_s_notebook_section[section_id='"+s.id+"'] > .scb_s_notebook_text_section .scb_s_microscopy_slide_content_lens_outline")[x]).attr('id', 'scb_s_microscopy_slide_content_lens_outline_'+s.elements[x].lane_id);
// 					}
// 				
//         	});
//         	}
//         });
        
        document.body.scrollTop = state.experiment.last_scroll;
        if(state.notebook.edit_text){
        
			tinymce.init({
				selector: "textarea.scb_s_notebook_text_edit",
				menubar: false,
				toolbar_items_size: 'small',
				toolbar: "fontselect | fontsizeselect | bold italic underline | bullist numlist | outdent indent | link unlink"
			 });
		 }
        
        scb.ui.static.WesternBlotGelView.scb_s_western_blot_gel_paint_all(workarea, gstate, state);
        scb.ui.static.MicroscopyView.draw_slides(workarea);
        scb.ui.static.FacsView.charts(workarea);

        
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
