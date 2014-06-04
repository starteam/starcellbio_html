'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.NotebookView = scb.ui.static.NotebookView || {};
scb.ui.static.NotebookView.TOTAL_TABS =  4;
scb.ui.static.NotebookView.TOTAL_STEPS =  5;


scb.ui.static.NotebookView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var experiment_id = $(element).attr('notebook_id');


    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        notebook_id: notebook_id,
        view: 'notebook',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}

scb.ui.static.NotebookView.scb_s_microscopy_lens_draw_slide = function(state){
	
	var model = new scb.components.ModelFactory(state.context.template);
	model.microscopy.compute(state);
	var img_sample = state.slides[0].hash;
	
	var enableIFSlider = false;
	if(state.microscopy_lane.current_slides.length == 0){
		state.microscopy_lane.current_slides = state.slides;
	}
	if(state.slide_type == 'Dye'){
	$('.scb_s_microscopy_if').prop('disabled', false);
	}
	else if(state.slide_type == 'IHC'){
	$('.scb_s_microscopy_if').prop('disabled', false);
	}
	else if(state.slide_type == 'IF'){
		if((state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.if_type ) || (!state.microscopy_lane.lens_map.action  && state.slides.length > 1 )){
			if(state.microscopy_lane.current_slides.length != 1){
				$('.scb_s_microscopy_if').prop('disabled', false);
				if($('.scb_s_microscopy_if[checked="checked"]').length > 0){
					var selected_filter = $('.scb_s_microscopy_if[checked="checked"]').prop('title').toLowerCase();
						$('.scb_f_microscopy_'+selected_filter).prop('checked', 'checked');
						state.microscopy.red_enabled = false;
						state.microscopy.blue_enabled = false;
						state.microscopy.green_enabled = false;
						state.microscopy.merge_enabled = false;
						if(selected_filter == 'all')
							selected_filter = 'merge';
						state.microscopy[selected_filter+'_enabled'] = true;
						state.microscopy_lane.lens_map.if_type = selected_filter;
						img_sample = $.grep(state.microscopy_lane.current_slides, function(e){ return e.if_type == selected_filter; })[0].hash;
				}
				else{
					if((state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.if_type == 'red') ){
							set_filters('red', state);
					}
					else if((state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.if_type == 'green')){
							set_filters('green', state);
					}
					else if((state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.if_type == 'blue')){
							set_filters('blue', state);
					}
					else if((state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.if_type == 'merge')){
							set_filters('all', state);
					}
					else if (state.slides[0].if_type =='red'){
							set_filters('red',state);
							state.microscopy_lane.lens_map.if_type = 'red';
					}
					else if (state.slides[0].if_type =='green'){
							set_filters('green',state);
							state.microscopy_lane.lens_map.if_type = 'green';
					}
					else if (state.slides[0].if_type =='blue'){
							set_filters('blue',state);
							state.microscopy_lane.lens_map.if_type = 'blue';
					}
					else if (state.slides[0].if_type =='merge'){
							set_filters('all',state);
							state.microscopy_lane.lens_map.if_type = 'merge';
					}
					else{
							set_filters('red',state);
							state.microscopy_lane.lens_map.if_type = 'red';
					}
				}
			}
			else{
				var color = state.microscopy_lane.current_slides[0].if_type;
				if(color =='merge')
					color = 'all';
				set_filters(color, state);
			}
		}
		else{
		
			//how to categorize a single IF slide and initialize the filter state
			if(state.slides[0].if_type == 'red' ){
				set_filters('red',state);
				state.microscopy_lane.lens_map.if_type = 'red';
				$('.scb_s_microscopy_red').prop('disabled', false);
				}
			else if(state.slides[0].if_type == 'green'){
				set_filters('green',state);
				state.microscopy_lane.lens_map.if_type = 'green';
				$('.scb_s_microscopy_green').prop('disabled', false);
				}
			else if(state.slides[0].if_type == 'blue'){
				set_filters('blue',state);
				state.microscopy_lane.lens_map.if_type = 'blue';
				$('.scb_s_microscopy_blue').prop('disabled', false);
				}
			else if(state.slides[0].if_type == 'merge'){
				set_filters('all',state);
				state.microscopy_lane.lens_map.if_type = 'merge';
				$('.scb_s_microscopy_all').prop('disabled', false);
			}
		}
	}
		
	if(state.microscopy.light_on){
			$('#brightup').prop('disabled', false);
			$('#brightdown').prop('disabled', false);
	}
	else{
			$('#brightup').prop('disabled', true);
			$('#brightdown').prop('disabled', true);
	}
	
	if(state.slide_type != 'IF' && !state.microscopy.light_on && !state.microscopy.laser_on){
		init_wb('/images/microscopy/black.jpg');
		disableSlider = true;
		if_light_on_and_laser_on = false;
	}
	
	else if(state.slide_type != 'IF' && state.microscopy.light_on && !state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, false, draw, state.microscopy_lane.lens_map.src );
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, true, false, draw, state.assignment.template.slides[img_sample]);
			}
			disableSlider = false;
			if_light_on_and_laser_on = false;
	}
	
	else if(state.slide_type != 'IF' && !state.microscopy.light_on && state.microscopy.laser_on){
		init_wb('/images/microscopy/black.jpg');
		disableSlider = true;
		if_light_on_and_laser_on = false;
	}
	
	else if(state.slide_type != 'IF' && state.microscopy.light_on && state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, false, draw, state.microscopy_lane.lens_map.src );
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, true, false,  draw, state.assignment.template.slides[img_sample]);
			}
			disableSlider = false;
			if_light_on_and_laser_on = false;
	}
	
	else if(state.slide_type == 'IF' && !state.microscopy.light_on && !state.microscopy.laser_on){
			init_wb('/images/microscopy/black.jpg');
			disableSlider = true;
			if_light_on_and_laser_on = false;
	}
	
	else if(state.slide_type == 'IF' && state.microscopy.light_on && !state.microscopy.laser_on){
		if(state.microscopy_lane.lens_map.brightness >1 )
			init_wb_mod(state.microscopy_lane.lens_map, '/images/microscopy/white.jpg');
		else
			init_wb_mod(state.microscopy_lane.lens_map, '/images/microscopy/black.jpg');
		disableSlider = false;
		enableIFSlider = true;
		min_brightness = scb.ui.static.NotebookView.WHITE_MIN_BRIGHTNESS;
		max_brightness = scb.ui.static.NotebookView.WHITE_MAX_BRIGHTNESS;
		if_light_on_and_laser_on = true;
	}
	
	else if(state.slide_type == 'IF' && !state.microscopy.light_on && state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				state.microscopy_lane.lens_map.brightness = scb.ui.static.NotebookView.WHITE_MIN_BRIGHTNESS;
				init(state.microscopy_lane.lens_map, false, true, draw, state.microscopy_lane.current_slides.length != 1 ? state.assignment.template.slides[img_sample]: state.microscopy_lane.lens_map.src );
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				state.microscopy_lane.lens_map.brightness = scb.ui.static.NotebookView.WHITE_MIN_BRIGHTNESS;
				init(state.microscopy_lane.lens_map, true, true, draw, state.assignment.template.slides[img_sample]);
			}
		disableSlider = true;
		min_brightness=scb.ui.static.NotebookView.WHITE_MIN_BRIGHTNESS;
		max_brightness=scb.ui.static.NotebookView.WHITE_MAX_BRIGHTNESS;
		if_light_on_and_laser_on = true;
	}
	
	else if(state.slide_type == 'IF' && state.microscopy.light_on && state.microscopy.laser_on){
	disableSlider = false;
		enableIFSlider = true;
		if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
 				if(state.microscopy_lane.lens_map.brightness <1){
				}
				$('#brightdown').prop('disabled', true);
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, true, draw, state.microscopy_lane.current_slides.length != 1 ? state.assignment.template.slides[img_sample]: state.microscopy_lane.lens_map.src );
		}
		else{
			state.microscopy_lane.lens_map.mag = state.slides[0].mag;
			$('#brightdown').prop('disabled', true);
			$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
			init(state.microscopy_lane.lens_map, true, true, draw, state.assignment.template.slides[img_sample]);
		}
		min_brightness=scb.ui.static.NotebookView.WHITE_MIN_BRIGHTNESS;
		max_brightness=scb.ui.static.NotebookView.WHITE_MAX_BRIGHTNESS;
		if_light_on_and_laser_on = true;
		
	}
	if(!disableSlider  && !enableIFSlider){
		min_brightness = scb.ui.static.NotebookView.NORMAL_MIN_BRIGHTNESS;
		max_brightness = scb.ui.static.NotebookView.NORMAL_MAX_BRIGHTNESS;
	}
	disableBlur = state.microscopy.disable_blur;
	disableBrightness = state.microscopy.disable_brightness;
	if(state.microscopy.disable_blur){
			$('#fblurup').prop('disabled', true);
			$('#fblurdown').prop('disabled', true);
			$('#blurup').prop('disabled', true);
			$('#blurdown').prop('disabled', true);
	}
	if(state.microscopy.disable_brightness){
	 		$('#brightup').prop('disabled', true);
			$('#brightdown').prop('disabled', true);
			$('.scb_s_microscopy_brightness_focus_middle').children().attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
	}
}

scb.ui.static.NotebookView.scb_f_microscopy_select_slide_type = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    parsed.microscopy.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var slide_type = $(element).attr('value');
    if (slide_type == '') {
        return;
    }
    var matches_list = [];
    var keys_list = [];
    var slide_id = $(element).attr('lane_id');
    if (slide_id == '') {
       var cell_treatment_id = $(element).attr('cell_treatment_id');
		var lanes = _.filter(parsed.microscopy.lanes_list.list, function(lane) {return lane.kind == slide_type && cell_treatment_id == lane.cell_treatment_id});
		var i = lanes.length; //or 10
		while(i--){
			var lane = lanes[i];
			keys_list = parsed.assignment.id == 'assignment_706_2014_ps2' ? _.keys(lane.cell_treatment.treatment_list.first.microscope) : _.keys(parsed.assignment.template.slide_parser[lane.cell_treatment.treatment_list.first.collection_id][slide_type])
			matches_list.push(lane.slide_conditions)
		}
		matches_list = jQuery.unique( matches_list );
		keys_list = jQuery.unique( keys_list );
		if(keys_list.length > 0 && $(matches_list).not(keys_list).length == 0 && $(keys_list).not(matches_list).length == 0){
				
				$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("You've already selected this slide option.", 
					function() {	
							$('html').css('overflow', 'visible');
							$('.error_overlay').remove();
							scb.ui.static.MainFrame.refresh();
					/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
				
		}
       if(_.size(parsed.assignment.template.micro_kinds[slide_type].conditions) == 1 || 
       	  _.size(parsed.assignment.template.slide_parser[parsed.experiment.cell_treatment_list.get(cell_treatment_id).treatment_list.first.collection_id][slide_type])==1 || 
       	  _.size(_.filter(parsed.experiment.cell_treatment_list.list , function(lane){ return lane.id == cell_treatment_id; })[0].treatment_list.first.microscope) == 1
       	  )
       {
       		var slide_conditions_val = ''
       		if(_.size(parsed.assignment.template.micro_kinds[slide_type].conditions) == 1 ){
       			slide_conditions_val = _.keys(parsed.assignment.template.micro_kinds[slide_type].conditions)[0]
       		}
       		else if(  _.size(parsed.assignment.template.slide_parser[parsed.experiment.cell_treatment_list.get(cell_treatment_id).treatment_list.first.collection_id][slide_type])==1){
       			slide_conditions_val = _.keys(parsed.assignment.template.slide_parser[parsed.experiment.cell_treatment_list.get(cell_treatment_id).treatment_list.first.collection_id][slide_type])[0]
       		}

       		else if(  _.size(_.filter(parsed.experiment.cell_treatment_list.list , function(lane){ return lane.id == cell_treatment_id; })[0].treatment_list.first.microscope) == 1){
       			slide_conditions_val = _.keys(_.filter(parsed.experiment.cell_treatment_list.list , function(lane){ return lane.id == cell_treatment_id; })[0].treatment_list.first.microscope)[0]
       		}
       			parsed.microscopy.lanes_list.start({
       				kind: slide_type,
            		slide_conditions: slide_conditions_val,
            		cell_treatment_id: cell_treatment_id,
           			experiment_id: parsed.experiment.id
        		});
       }
       else{
        	parsed.microscopy.lanes_list.start({
           		kind: slide_type,
            	cell_treatment_id: cell_treatment_id,
            	experiment_id: parsed.experiment.id
        	});
        }
    }
    else {
    	parsed.microscopy.lanes_list.get(slide_id).kind = slide_type;
    }
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.NotebookView.scb_f_microscopy_select_conditions = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
	        parsed.microscopy.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var slide_conditions = $(element).attr('value');
    if (slide_conditions == '') {
        return;
    }
    var slide_id = $(element).attr('lane_id');
       var cell_treatment_id = $(element).attr('cell_treatment_id');
       for( var index = 0; index < parsed.microscopy.lanes_list.list.length; index++){
			var lane = parsed.microscopy.lanes_list.list[index];
			if(lane.slide_conditions == slide_conditions && lane.kind == parsed.microscopy.lanes_list.get(slide_id).kind && lane.cell_treatment_id == cell_treatment_id){
				$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("You've already selected this slide option.", 
					function() {	$('html').css('overflow', 'visible');
			
							$('.error_overlay').remove();
							parsed.microscopy.lanes_list.remove(slide_id);
					/* callback function for 'OK' button*/ 
				scb.ui.static.MainFrame.refresh();});
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
				
			}
				
       }
    	parsed.microscopy.lanes_list.get(slide_id).slide_conditions = slide_conditions;

    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.NotebookView.scb_f_microscopy_sample_remove = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
    parsed = resetScrollValue(parsed);
        parsed.microscopy.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var lysate_id = $(element).attr('lane_id');
    if (lysate_id != '') {
        parsed.microscopy.lanes_list.remove(lysate_id);
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.NotebookView.scb_f_microscopy_sample_active = function (element, event) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.microscopy.is_cell_treatment_enabled[cell_treatment_id] = val;
    $('.scb_f_microscopy_select_slide_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_select_slide_type(this);
    });
    parsed.microscopy.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();
    if (event) {
        var rows_count = parsed.microscopy.rows_state();
        scb.ui.static.MainFrame.refresh();
        if (rows_count.valid > (scb.ui.static.NotebookView.MAX_ROWS - 1)) {
            var element = $('.scb_f_microscopy_sample_active[cell_treatment_id="' + cell_treatment_id + '"]');
            var parent = $(element).parent();
            var note = $("<span>" + rows_count.valid + "</span>");
            note.appendTo(parent);
            console.info(parent);
            setTimeout(function () {
                $(note).detach();
            }, 500);
        }
    }
}

scb.ui.static.NotebookView.scb_f_microscopy_remove = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
	var id_list = [];
 	for( var x=0; x < parsed.experiment.microscopy_list.list.length; x++){id_list.push(parsed.experiment.microscopy_list.list[x].id);}
    parsed.state.index= id_list.indexOf(parsed.microscopy.id);
    parsed.experiment.microscopy_list.remove(parsed.microscopy.id);
    if(parsed.state.index == parsed.experiment.microscopy_list.list.length){
    	parsed.state.index = parsed.state.index -1 ;
    }
    //fix tab indexing for display
    if(parsed.state.index > parsed.experiment.microscopy_list.list.length -scb.ui.static.NotebookView.TOTAL_TABS) {
    	
    	if((parsed.experiment.microscopy_list.list.length == scb.ui.static.NotebookView.TOTAL_TABS+1 || parsed.experiment.microscopy_list.list.length == scb.ui.static.NotebookView.TOTAL_TABS+2) && parsed.experiment.microscopy_list.start_tabs_index <=1)
    		parsed.experiment.microscopy_list.start_tabs_index = parsed.experiment.microscopy_list.start_tabs_index+1;
    	else parsed.experiment.microscopy_list.start_tabs_index = parsed.experiment.microscopy_list.start_tabs_index-1;
    }
    
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.NotebookView.scb_s_microscopy_selected = function (element) {
    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.microscopy.name = $(element).text();
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

scb.ui.static.NotebookView.scb_f_microscopy_sample_active_all = function (element) {
    $('.scb_f_microscopy_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', true);
        scb.ui.static.NotebookView.scb_f_microscopy_sample_active(element);
    });
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

scb.ui.static.NotebookView.scb_f_microscopy_load_slides = function(element){

    var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.microscopy.samples_finished = true;
    parsed.microscopy.lane_selected = scb.utils.get(parsed.microscopy.lanes_list.list, [0, 'id']);
    if(parsed.microscopy.lanes_list.list[0].kind =='IF'){
    	parsed.microscopy.laser_on = true;
    	parsed.microscopy.light_on =false;
    }
    else{
    	parsed.microscopy.laser_on = false;
    	parsed.microscopy.light_on = true;
    }
    $('#lens').remove();
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

scb.ui.static.NotebookView.scb_s_microscopy_left_microscopy = function(element, event){
	var parsed = scb.ui.static.NotebookView.parse(element);
	parsed = resetScrollValue(parsed);

	parsed.microscopy.parent.start_tabs_index = parsed.microscopy.parent.start_tabs_index -1;
	scb.ui.static.MainFrame.refresh(parsed.state);
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
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_select_slide_type', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_select_slide_type(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_select_conditions', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_select_conditions(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_sample_active', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_remove', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_remove(this);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_microscopy_selected', function (e) {
        scb.ui.static.NotebookView.scb_s_microscopy_selected(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_load_slides', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_load_slides(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_left_microscopy', function (e) {
        scb.ui.static.NotebookView.scb_s_microscopy_left_microscopy(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_right_microscopy', function (e) {
        scb.ui.static.NotebookView.scb_s_microscopy_right_microscopy(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_slide_tab', function (e) {
        scb.ui.static.NotebookView.scb_s_microscopy_slide_tab(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_add_microscopy', function (e, ui) {
        scb.ui.static.NotebookView.scb_s_microscopy_add_microscopy(this);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_laser', function (e) {
    	
        var parsed = scb.ui.static.NotebookView.parse(this);
        	parsed = resetScrollValue(parsed);

		if($(this).attr('checked') =='checked'){
		
			parsed.microscopy.laser_on = true;
		}
		else{
					parsed.microscopy.laser_on = false;
		}
		        scb.ui.static.MainFrame.refresh();

    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_light', function (e) {
    	
        var parsed = scb.ui.static.NotebookView.parse(this);
	parsed = resetScrollValue(parsed);

		if($(this).attr('checked') =='checked'){
			parsed.microscopy.light_on = true;

		}
		else{
			parsed.microscopy.light_on = false;

			
		}
		if(!parsed.microscopy.light_on){
			$('#brightup').prop('disabled', true);
			
			$('#brightdown').prop('disabled', true);
		}
		else{
			$('#brightup').prop('disabled', false);
			
			$('#brightdown').prop('disabled', false);
		}
		        scb.ui.static.MainFrame.refresh();

    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_choose_samples_order_list>li', function (e) {
        scb.ui.static.NotebookView.scb_s_microscopy_choose_samples_order_list_select(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_prepare_slides', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_prepare_slides(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_active_all', function (e, ui) {
        scb.ui.static.NotebookView.scb_f_microscopy_sample_active_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_inactive_all', function (e, ui){
    	scb.ui.static.NotebookView.scb_f_microscopy_sample_inactive_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_remove', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_sample_remove(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_red', function (e, ui){
    	
        var parsed = scb.ui.static.NotebookView.parse(this);
        	parsed = resetScrollValue(parsed);
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = true;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = false;
			$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_Red.png');
			return;
		}
		else if(parsed.microscopy_lane.kind == 'IF' && !parsed.microscopy_lane.lens_map.if_type){
			$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("No available image for this filter", 
					function() {	
							$('html').css('overflow', 'visible');
							$('.error_overlay').remove();
					/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
		}
		else{
			for(var x = 0; x < parsed.microscopy.selected_lane.current_slides.length; x ++){
				if(parsed.microscopy.selected_lane.current_slides[x].if_type == 'red'){
					parsed.microscopy.red_enabled = true;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = false;
					parsed.microscopy.selected_lane.lens_map.if_type = 'red';
					draw_lens('x', 0,parsed.microscopy.selected_lane.lens_map, document.getElementById("lens"));
					$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_Red.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}
		}
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_blue', function (e, ui){
    	
        var parsed = scb.ui.static.NotebookView.parse(this);
        	parsed = resetScrollValue(parsed);
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = true;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = false;
			$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_Blue.png');
			return;
		}
		else if(parsed.microscopy_lane.kind == 'IF' && !parsed.microscopy_lane.lens_map.if_type){
			$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("No available image for this filter", 
					function() {	
							$('html').css('overflow', 'visible');
							$('.error_overlay').remove();
					/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
		}
		else{
	    	for(var x = 0; x < parsed.microscopy.selected_lane.current_slides.length; x ++){
				if(parsed.microscopy.selected_lane.current_slides[x].if_type == 'blue'){
					parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = true;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = false;
					parsed.microscopy.selected_lane.lens_map.if_type = 'blue';
					draw_lens('x', 0,parsed.microscopy.selected_lane.lens_map, document.getElementById("lens"));
					$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_Blue.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}
		}
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_green', function (e, ui){
    	
        var parsed = scb.ui.static.NotebookView.parse(this);
        	parsed = resetScrollValue(parsed);
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = true;
					parsed.microscopy.merge_enabled = false;
			$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_Green.png');
			return;
		}
		else if(parsed.microscopy_lane.kind == 'IF' && !parsed.microscopy_lane.lens_map.if_type){
			$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("No available image for this filter", 
					function() {	
							$('html').css('overflow', 'visible');
							$('.error_overlay').remove();
					/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
		}
		else{
	    	for(var x = 0; x < parsed.microscopy.selected_lane.current_slides.length; x ++){
				if(parsed.microscopy.selected_lane.current_slides[x].if_type == 'green'){
					parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = true;
					parsed.microscopy.merge_enabled = false;
					parsed.microscopy.selected_lane.lens_map.if_type = 'green';
					draw_lens('x', 0,parsed.microscopy.selected_lane.lens_map, document.getElementById("lens"));
					$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_Green.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}    
		}
	});
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_all', function (e, ui){
    	
        var parsed = scb.ui.static.NotebookView.parse(this);
        	parsed = resetScrollValue(parsed);
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = true;
			$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_All.png');
			return;
		}
		else if(parsed.microscopy_lane.kind == 'IF' && !parsed.microscopy_lane.lens_map.if_type){
			$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("No available image for this filter", 
					function() {	
							$('html').css('overflow', 'visible');
							$('.error_overlay').remove();
					/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
		}
		else{
	    	for(var x = 0; x < parsed.microscopy.selected_lane.current_slides.length; x ++){
				if(parsed.microscopy.selected_lane.current_slides[x].if_type == 'merge'){
					parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = true;
					parsed.microscopy.selected_lane.lens_map.if_type = 'merge';
					draw_lens('x', 0,parsed.microscopy.selected_lane.lens_map, document.getElementById("lens"));
					$('.scb_s_microscopy_filter', '.scb_s_microscopy_view').prop('src', 'images/microscopy/Filter_Slider_All.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}
		}    
		});
	    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_tools_toggle', function (e) {
        scb.ui.static.NotebookView.scb_f_microscopy_tools_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_note_close_button', function (e) {
    	scb.ui.static.NotebookView.scb_f_microscopy_note_close_button(this);
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
            t: template,
			last_step: state.experiment.last_step == 0 ? last_step :state.experiment.last_step,
			prev_step: state.experiment.prev_step == 0 ? prev_step : state.experiment.prev_step,
        }));
        
        
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
