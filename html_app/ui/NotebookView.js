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
	
	parsed.section.elements.push({'type': 'text',
		'data': tinyMCE.activeEditor.getContent()
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











scb.ui.static.NotebookView.scb_f_microscopy_prepare_slides = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    var rows_state = parsed.microscopy.rows_state();
    if (rows_state && rows_state.valid < 1) {
    	$('html').css('overflow', 'hidden');
    	
    	$('body').prepend(scb_experiment_setup.general_error_overlay());
		if($('.scb_f_microscopy_sample_active:checked').length > 0){
		
		$.jqDialog.alert("Please select a slide type for at least one sample.", function() {	
    	$('html').css('overflow', 'visible');
					$('.error_overlay').remove();/* callback function for 'OK' button*/ return;});

		}
		
		else{
		
		$.jqDialog.alert("No samples selected.", function() {	
    	$('html').css('overflow', 'visible');
					$('.error_overlay').remove();/* callback function for 'OK' button*/ return;});
		}
		$('.jqDialog_header').remove();
		$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
		$('#jqDialog_box').attr('role', 'alertdialog');
    }
    else{
        parsed.microscopy.slide_prepared = true;
        window.scrollTo(0, 0);
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.NotebookView.scb_s_microscopy_choose_gel_type_input = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.microscopy.gel_type = $(element).val();
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
    scb.utils.off_on(workarea, 'change', '.scb_f_notebook_save_text_button', function (e) {
        scb.ui.static.NotebookView.scb_f_notebook_save_text_button(this, e);
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
    
    
    
    scb.utils.off_on(workarea, 'click', '.scb_s_notebook_slide_tab', function (e) {
        scb.ui.static.NotebookView.scb_s_notebook_slide_tab(this);
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
        
        document.body.scrollTop = state.experiment.last_scroll;
        if(state.notebook.edit_text){
        
			tinymce.init({
				selector: "textarea.scb_s_notebook_text_edit",
				menubar: false,
				toolbar_items_size: 'small',
				toolbar: "fontselect | fontsizeselect | bold italic underline | bullist numlist | outdent indent | link unlink"
			 });
		 }
        
        
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
