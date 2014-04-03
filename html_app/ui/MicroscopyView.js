'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.MicroscopyView = scb.ui.static.MicroscopyView || {};
scb.ui.static.MicroscopyView.TOTAL_TABS =  4;
scb.ui.static.MicroscopyView.TOTAL_STEPS =  5;



scb.ui.static.MicroscopyView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var microscopy_id = $(element).attr('microscopy_id');
    var microscopy_lane_id = $(element).attr('microscopy_lane_id');


    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        microscopy_id: microscopy_id,
        microscopy_lane_id: microscopy_lane_id,
        view: 'microscopy',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}

scb.ui.static.MicroscopyView.scb_s_microscopy_lens_draw_slide = function(state){
	
	var model = new scb.components.ModelFactory(state.context.template);
	model.microscopy.compute(state);
	var img_sample = state.slides[0].hash;
	var disableSlider = false;
	var enableIFSlider = false;
	if(state.microscopy_lane.current_slides.length == 0){
		state.microscopy_lane.current_slides = state.slides;
	}
	if(state.slide_type == 'Dye'){
	$('.scb_s_microscopy_if').prop('disabled', false);
	//set_filters('red', state);
	}
	else if(state.slide_type == 'IHC'){
	$('.scb_s_microscopy_if').prop('disabled', false);
	//set_filters('red', state);
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
	}
	else if(state.slide_type != 'IF' && state.microscopy.light_on && !state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, false, draw, state.microscopy_lane.lens_map.src );
				//init(state.microscopy_lane.lens_map, false, false, draw, state.assignment.template.slides[img_sample] );
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, true, false, draw, state.assignment.template.slides[img_sample]);
			}
	}
	else if(state.slide_type != 'IF' && !state.microscopy.light_on && state.microscopy.laser_on){
		init_wb('/images/microscopy/black.jpg');
	}
	else if(state.slide_type != 'IF' && state.microscopy.light_on && state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, false, draw, state.microscopy_lane.lens_map.src );
				//init(state.microscopy_lane.lens_map, false, false, draw, state.assignment.template.slides[img_sample] );
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, true, false,  draw, state.assignment.template.slides[img_sample]);
			}
	}
	else if(state.slide_type == 'IF' && !state.microscopy.light_on && !state.microscopy.laser_on){
			init_wb('/images/microscopy/black.jpg');
			disableSlider = true;
	}
	else if(state.slide_type == 'IF' && state.microscopy.light_on && !state.microscopy.laser_on){
		if(state.microscopy_lane.lens_map.brightness >1 )
			init_wb_mod(state.microscopy_lane.lens_map, '/images/microscopy/white.jpg');
		else
			init_wb_mod(state.microscopy_lane.lens_map, '/images/microscopy/black.jpg');
	}
	else if(state.slide_type == 'IF' && !state.microscopy.light_on && state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				//state.microscopy_lane.lens_map.brightness = 1;
				
				init(state.microscopy_lane.lens_map, false, true, draw, state.microscopy_lane.current_slides.length != 1 ? state.assignment.template.slides[img_sample]: state.microscopy_lane.lens_map.src );
				//init(state.microscopy_lane.lens_map, false, true, draw, state.assignment.template.slides[img_sample]);
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				//state.microscopy_lane.lens_map.brightness = 1;
				init(state.microscopy_lane.lens_map, true, true, draw, state.assignment.template.slides[img_sample]);
			}
			disableSlider = true;
			min_brightness=1;
			max_brightness=11;
	}
	else if(state.slide_type == 'IF' && state.microscopy.light_on && state.microscopy.laser_on){
		enableIFSlider = true;
		$('#brightdown').prop('disabled', true);
		if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
 				if(state.microscopy_lane.lens_map.brightness <1){
 					//state.microscopy_lane.lens_map.brightness = 1;
				}
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, true, draw, state.microscopy_lane.current_slides.length != 1 ? state.assignment.template.slides[img_sample]: state.microscopy_lane.lens_map.src );
				//init(state.microscopy_lane.lens_map, false, true, draw, state.assignment.template.slides[img_sample]);
		}
		else{
			state.microscopy_lane.lens_map.mag = state.slides[0].mag;
 			//state.microscopy_lane.lens_map.brightness = 1;
			$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
			init(state.microscopy_lane.lens_map, true, true, draw, state.assignment.template.slides[img_sample]);
		}
		min_brightness=1;
		max_brightness=11;
	}
	if(!disableSlider  && !enableIFSlider){
		min_brightness = 0;
		max_brightness = 11;
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

function set_filters(name, state){
		state.microscopy.red_enabled = false;
		state.microscopy.blue_enabled = false;
		state.microscopy.green_enabled = false;
		state.microscopy.merge_enabled = false;
		$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_'+name.charAt(0).toUpperCase() + name.slice(1)+'.png');
		$('.scb_f_microscopy_'+name).prop('checked', 'checked');
		if(name == 'all')
			name = 'merge';
		state.microscopy[name+'_enabled'] = true;		
}

scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
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
			keys_list = _.keys(parsed.assignment.template.slide_parser[lane.cell_treatment.treatment_list.list[0].collection_id][slide_type])
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
				return;
				
		}
       if(_.size(parsed.assignment.template.micro_kinds[slide_type].conditions) == 1 || _.size(parsed.assignment.template.slide_parser[parsed.experiment.cell_treatment_list.get(cell_treatment_id).treatment_list.list[0].collection_id][slide_type])==1)
       {
       			parsed.microscopy.lanes_list.start({
       				kind: slide_type,
            		slide_conditions: _.keys(parsed.assignment.template.slide_parser[parsed.experiment.cell_treatment_list.get(cell_treatment_id).treatment_list.list[0].collection_id][slide_type])[0], //_.keys(parsed.assignment.template.micro_kinds[slide_type].conditions)[0],
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

scb.ui.static.MicroscopyView.scb_f_microscopy_select_conditions = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
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
				return;
				
			}
				
       }
    	parsed.microscopy.lanes_list.get(slide_id).slide_conditions = slide_conditions;

    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_remove = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    parsed.experiment.last_scroll=document.body.scrollTop;
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

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.microscopy.is_cell_treatment_enabled[cell_treatment_id] = val;
    $('.scb_f_microscopy_select_slide_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type(this);
    });
    parsed.microscopy.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();
    if (event) {
        var rows_count = parsed.microscopy.rows_state();
        scb.ui.static.MainFrame.refresh();
        if (rows_count.valid > (scb.ui.static.MicroscopyView.MAX_ROWS - 1)) {
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

scb.ui.static.MicroscopyView.scb_f_microscopy_remove = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
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
    if(parsed.state.index > parsed.experiment.microscopy_list.list.length -scb.ui.static.MicroscopyView.TOTAL_TABS) {
    	
    	if((parsed.experiment.microscopy_list.list.length == scb.ui.static.MicroscopyView.TOTAL_TABS+1 || parsed.experiment.microscopy_list.list.length == scb.ui.static.MicroscopyView.TOTAL_TABS+2) && parsed.experiment.microscopy_list.start_tabs_index <=1)
    		parsed.experiment.microscopy_list.start_tabs_index = parsed.experiment.microscopy_list.start_tabs_index+1;
    	else parsed.experiment.microscopy_list.start_tabs_index = parsed.experiment.microscopy_list.start_tabs_index-1;
    }
    
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.MicroscopyView.scb_s_microscopy_selected = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.microscopy.name = $(element).text();
}

scb.ui.static.MicroscopyView.scb_f_microscopy_prepare_slides = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
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
    }
    else{
        parsed.microscopy.slide_prepared = true;
        window.scrollTo(0, 0);
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.MicroscopyView.scb_s_microscopy_choose_gel_type_input = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.microscopy.gel_type = $(element).val();
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active_all = function (element) {
    $('.scb_f_microscopy_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', true);
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_inactive_all = function (element) {
	$('.scb_f_microscopy_sample_active').each(function(e){
		var element = this;
		$(element).attr('checked', false);
		scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active(element);
	});    
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.MicroscopyView.scb_f_microscopy_load_slides = function(element){

    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;

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

scb.ui.static.MicroscopyView.scb_s_microscopy_slide_tab = function(element){
	var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
	
	if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    
    parsed.microscopy.lane_selected = parsed.microscopy_lane.id;
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.MicroscopyView.scb_s_microscopy_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
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

scb.ui.static.MicroscopyView.scb_s_microscopy_left_microscopy = function(element, event){
	var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;

	parsed.microscopy.parent.start_tabs_index = parsed.microscopy.parent.start_tabs_index -1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.MicroscopyView.scb_s_microscopy_right_microscopy = function(element, event){
	var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;

	parsed.microscopy.parent.start_tabs_index = parsed.microscopy.parent.start_tabs_index +1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.MicroscopyView.scb_s_microscopy_add_microscopy= function(element, event){
	var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;

	console.log(parsed.microscopy.parent.start_tabs_index);
	console.log(parsed.microscopy.parent.list.length);
	if(parsed.microscopy.parent.list.length==scb.ui.static.MicroscopyView.TOTAL_TABS){
		parsed.microscopy.parent.start_tabs_index = 1;
	}
	else if (parsed.microscopy.parent.list.length >scb.ui.static.MicroscopyView.TOTAL_TABS)
		parsed.microscopy.parent.start_tabs_index = parsed.microscopy.parent.length-(scb.ui.static.MicroscopyView.TOTAL_TABS-1);
	scb.ui.static.MainFrame.refresh(parsed.state);
}


//Caman.DEBUG = ('console' in window);

///////////////////
/*
structure of the state object

orig - contains original image
brightness - contains brightness level on original image
blur -
blur - 
xparam - x offset for full image
yparam - y offset for full image
cache - 
	brightness
	image
*/
//////////////////


var caman;
var img_width;
var img_height;
scb.ui.static.MicroscopyView.ARC =  150;
scb.ui.static.MicroscopyView.LENS =  300;
scb.ui.static.MicroscopyView.PICTURE_LIM =  400;
scb.ui.static.MicroscopyView.MAX_BLUR=  4;
var difference;

var isLeft = false;
var inDarkenSection = true;
var disableBlur = false;
var disableBrightness = false;

var caman_lock = false;
var min_brightness = 0;
var max_brightness = 11;

/*

First call init 

The init method should first get the canvas, get the context, and create an image element
You set the image source and then you call the image onload function. The image onload function should do everything as before
set up the canvas store the image data and then redisplay the canvas

The next point of contention is the callback

you pass a callback function to the method so that it calls the draw method immediately after the original


*/

function draw_lens(param, addition, state, canvas){
	console.log(state.xparam);
	console.log(state.yparam);
	if(state.xparam > 350){
		$('#left').prop('disabled', true);
	}
	else{
		$('#left').prop('disabled', false);

	}
	if(state.xparam < -img_width){
		$('#right').prop('disabled', true);
	}
	else{
		$('#right').prop('disabled', false);

	}
	if(state.yparam > 350){
		$('#up').prop('disabled', true);
	}
	else{
		$('#up').prop('disabled', false);

	}
	if(state.yparam < -img_height){
		$('#down').prop('disabled', true);
	}
	else{
		$('#down').prop('disabled', false);

	}
	if(true){
		switch(param)
		{
			case 'x':
			  state.xparam = state.xparam + addition;
			  break;
			case 'y':
			  state.yparam = state.yparam + addition;
			  break;
			default:
			  break;
		}
	
		
		

		var outline =  $('body').find('.scb_s_microscopy_slide_content_lens_outline')[0];
		var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
			$('#svg').css('left',state.xparam+'px');
			$('#svg').css('top',state.yparam+'px');
			
			$('#scb_s_microscopy_slide_content_lens_outline svg image').attr('transform',"matrix(1,0,0,1,"+state.xparam+","+state.yparam+")" );
			//$('#scb_s_microscopy_slide_content_lens_outline svg image').attr('transform',state.yparam);
	}
	else{
		console.error( "ERROR IN DRAW! "); 
		debugger;
	}


}

function draw(state){
	var canvas=document.getElementById("lens");
	
	
	document.onkeydown=function (e) {
		e = e || window.event;
		if(caman_lock){
				console.log('nope');
		}
		else{
			if (e.keyCode == '37' && $('#left').prop('disabled') == false) {
				// l arrow
				e.preventDefault();
				draw_lens('x', 10, state, document.getElementById("lens"));
				console.log('left')
			}
			else if (e.keyCode == '38' && $('#up').prop('disabled')== false) {
				// u arrow
				e.preventDefault();
				draw_lens('y', 10, state,document.getElementById("lens"));
				console.log('up');
			}
			else if (e.keyCode == '39' && $('#right').prop('disabled')== false) {
				// r arrow
				e.preventDefault();
				draw_lens('x', -10, state, document.getElementById("lens"));

				console.log('right');
			}
			else if (e.keyCode == '40' && $('#down').prop('disabled')== false) {
				// d arrow
				e.preventDefault();
				draw_lens('y', -10, state, document.getElementById("lens"));
				
				console.log('down');
			}
		}
	};

	var mouseStillDown_up = false;
	var mouseStillDown_down = false;
	var mouseStillDown_left = false;
	var mouseStillDown_right = false;

	$('#up').mousedown(function(){
			if(caman_lock){
			}
			else{
				mouseStillDown_up = true;
				moveUp();
			}

	});
	$('#down').mousedown(function(){
			if(caman_lock){
			}
			else{
				mouseStillDown_down = true;
				moveDown();
			}
	});
	$('#left').mousedown(function(){
			if(caman_lock){
			}
			else{
				mouseStillDown_left = true;
				moveLeft();
			}
	});
	$('#right').mousedown(function(){
			if(caman_lock){
			}
			else{
				mouseStillDown_right = true;
				moveRight();
			}
	});
	



	$('#up').mouseup(function(event) {
		mouseStillDown_up = false;
	});
	
	$('#down').mouseup(function(event) {
		mouseStillDown_down = false;
	});
	
	$('#left').mouseup(function(event) {
		mouseStillDown_left = false;
	});
	
	$('#right').mouseup(function(event) {
		mouseStillDown_right = false;
	});
	
	
	function moveUp() {
		if (!mouseStillDown_up) { return; } // we could have come back from
										 // SetInterval and the mouse is no longer down
		
				draw_lens('y', 10, state, document.getElementById("lens"));
				console.log('up');

		if (mouseStillDown_up) { setTimeout(moveUp, 100); }
	}
	
	function moveDown() {
		if (!mouseStillDown_down) { return; } // we could have come back from
										 // SetInterval and the mouse is no longer down
		
				draw_lens('y', -10, state, document.getElementById("lens"));
				console.log('down');

		if (mouseStillDown_down) { setTimeout(moveDown, 100); }
	}


	
	function moveLeft() {
		if (!mouseStillDown_left) { return; } // we could have come back from
										 // SetInterval and the mouse is no longer down
		
				draw_lens('x', 10, state, document.getElementById("lens"));
				console.log('left');

		if (mouseStillDown_left) { setTimeout(moveLeft, 100); }
	}


	
	function moveRight() {
		if (!mouseStillDown_right) { return; } // we could have come back from
										 // SetInterval and the mouse is no longer down
		
				draw_lens('x', -10, state, document.getElementById("lens"));
				console.log('right');

		if (mouseStillDown_right) { setTimeout(moveRight, 100); }
	}


	
	
	
	
	
	
	
	
	$('#brightup').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
		if($('#svg image').attr('xlink:href') == '/images/microscopy/black.jpg'){
				if(state.brightness >=250){
					$('#brightup').prop('disabled', true);
			}
			else{
					$('#brightup').prop('disabled', false);
					$('#brightdown').prop('disabled', false);

			}	
				state.brightness = state.brightness +5;
		}
		else{
			if(state.brightness >=max_brightness){
					$('#brightup').prop('disabled', true);
			}
			else{
					$('#brightup').prop('disabled', false);
					$('#brightdown').prop('disabled', false);

			}	

				if(state.brightness >=1)
					 state.brightness = state.brightness + 1;
				else state.brightness = state.brightness + 0.1;

				console.log(state.brightness);
				console.log('brightup');
				var svg =document.getElementById("svg");

			}
			
				$('#lensfilter #brightness #b_red').attr('slope', state.brightness+'');
				$('#lensfilter #brightness #b_green').attr('slope', state.brightness+'');
				$('#lensfilter #brightness #b_blue').attr('slope', state.brightness+'');
				
				$('#filter1  #b_red').attr('slope', state.brightness+'');
				$('#filter1  #b_green').attr('slope', state.brightness+'');
				$('#filter1  #b_blue').attr('slope', state.brightness+'');
				change_brightness_lines(state.brightness, false);
		}
	});
	$('#brightdown').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
				if($('#svg image').attr('xlink:href') == '/images/microscopy/black.jpg'){
				if(state.brightness <=250){
					$('#brightup').prop('disabled', true);
			}
			else{
					$('#brightup').prop('disabled', false);
					$('#brightdown').prop('disabled', false);

			}	
				state.brightness = state.brightness -5;
		}
		else{
		if(state.brightness <=min_brightness){
				$('#brightdown').prop('disabled', true);
		}
		else{
				$('#brightup').prop('disabled', false);
				$('#brightdown').prop('disabled', false);

		}

			if(state.brightness <=1)
				 state.brightness = state.brightness - 0.1;
			else state.brightness = state.brightness - 1;

			console.log(state.brightness);
			console.log('brightdown');
			var svg =document.getElementById("svg");
		}
		
			$('#lensfilter #brightness #b_red').attr('slope', state.brightness+'');
			$('#lensfilter #brightness #b_green').attr('slope', state.brightness+'');
			$('#lensfilter #brightness #b_blue').attr('slope', state.brightness+'');
			
			$('#filter1  #b_red').attr('slope', state.brightness+'');
			$('#filter1  #b_green').attr('slope', state.brightness+'');
			$('#filter1  #b_blue').attr('slope', state.brightness+'');
			change_brightness_lines(state.brightness, false);
		}
	});
	$('#blurup').click(function(){
			if(state.blur >=scb.ui.static.MicroscopyView.MAX_BLUR && !isLeft){
				$('#blurup').prop('disabled', true);
			}
			else {
				$('#fblurup').prop('disabled', false);
				$('#fblurdown').prop('disabled', false);
				$('#blurup').prop('disabled', false);
				$('#blurdown').prop('disabled', false);
			}

		modify_state_blur(1, state, 'up');
	});
	$('#blurdown').click(function(){
			if(state.blur >=scb.ui.static.MicroscopyView.MAX_BLUR && isLeft){
				$('#blurdown').prop('disabled', true);
			}
			else {
				$('#fblurup').prop('disabled', false);
				$('#fblurdown').prop('disabled', false);
				$('#blurup').prop('disabled', false);
				$('#blurdown').prop('disabled', false);
			}
		
		modify_state_blur(-1, state, 'down');
	});
	$('#fblurup').click(function(){
			if(state.blur >=scb.ui.static.MicroscopyView.MAX_BLUR && !isLeft){
				$('#fblurup').prop('disabled', true);
				$('#blurup').prop('disabled', true);
			}
			else {
				$('#fblurup').prop('disabled', false);
				$('#fblurdown').prop('disabled', false);
				$('#blurup').prop('disabled', false);
				$('#blurdown').prop('disabled', false);
			}
			
		modify_state_blur(0.25, state, 'up');
	});
	$('#fblurdown').click(function(){
			if(state.blur >=scb.ui.static.MicroscopyView.MAX_BLUR && isLeft){
				$('#fblurdown').prop('disabled', true);
				$('#blurdown').prop('disabled', true);
			}
			else {
				$('#fblurup').prop('disabled', false);
				$('#fblurdown').prop('disabled', false);
				$('#blurup').prop('disabled', false);
				$('#blurdown').prop('disabled', false);
			}
		
		modify_state_blur(-0.25, state, 'down');
	});

	console.log('draw');
}


function change_brightness_lines(brightness_value, brightness_disabled){
		if(brightness_disabled){
			$('.scb_s_microscopy_brightness_focus_middle').children().attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
		}
		else{
			var list_of_lines = $('.scb_s_microscopy_brightness_focus_middle').children();		
			if (brightness_value > 0)
				$(list_of_lines[0]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[0]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.1 )
				$(list_of_lines[1]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[1]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.2 )
				$(list_of_lines[2]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[2]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.3 )
				$(list_of_lines[3]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[3]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.4 )
				$(list_of_lines[4]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[4]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.5 )
				$(list_of_lines[5]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[5]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.6 )
				$(list_of_lines[6]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[6]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.7 )
				$(list_of_lines[7]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[7]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 0.8 )
				$(list_of_lines[8]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[8]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			
			
			if (brightness_value > 0.9 )
				$(list_of_lines[9]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[9]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 1 )
				$(list_of_lines[10]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[10]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value >2)
				$(list_of_lines[11]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[11]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value >3 )
				$(list_of_lines[12]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[12]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 4 )
				$(list_of_lines[13]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[13]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 5 )
				$(list_of_lines[14]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[14]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 6 )
				$(list_of_lines[15]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[15]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 7 )
				$(list_of_lines[16]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[16]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
			if (brightness_value > 8 )
				$(list_of_lines[17]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Green.png');
			else
				$(list_of_lines[17]).attr('src', 'images/microscopy/Brightness/Brightness_Line_Gray.png');
		}
}
///////////////////////////////////////////////////////////////////////////////////////////
	
///////////////////////////////////////////////////////////////////////////////////////////


//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init(state, isNew, isIF, draw, image_source){
	



	$('#spy').remove();
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	var image_dimensions = document.createElement('img');
	image_dimensions.src = image_source;
	image_dimensions.style.visibility = 'hidden';
	$(document).append(image_dimensions);
	var outline =  $('body').find('.scb_s_microscopy_slide_content_lens_outline')[0];
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
	if(samples_area){
		
		$(samples_area).append(controls);
		//scb_s_microscopy_slide_content_lens_outline
		image_dimensions.onload= function (){
			
			$('#svg image').attr('xlink:href', image_source);
			if(Math.ceil(image_dimensions.width/scb.ui.static.MicroscopyView.PICTURE_LIM) <= 1 || Math.ceil(image_dimensions.height/scb.ui.static.MicroscopyView.PICTURE_LIM) <= 1){
				$('#svg image').attr('width',image_dimensions.width+'px'); 
				$('#svg image').attr('height', image_dimensions.height+'px'); 	
				
				}
			else{			
				img_width = scb.ui.static.MicroscopyView.PICTURE_LIM;

				var height_proportion = Math.ceil((scb.ui.static.MicroscopyView.PICTURE_LIM*image_dimensions.height)/image_dimensions.width);

				img_height = height_proportion;
				$('#svg image').attr('width',img_width+'px'); 
				$('#svg image').attr('height', img_height+'px');
				
				image_dimensions.height=img_height;
				image_dimensions.width =img_width;	
			}
			if(isNew){
				initialize_state(state, image_source);
				if(!disableBlur){
					var randomblur = Math.round(Math.ceil(Math.random()*4) / 1) * 1;
					var randomside = Math.round(Math.ceil(Math.random()*2));
					if(randomside == 1){
						isLeft = false;
					}
					else{
						isLeft = true;
					}
					state.blur = randomblur;
				}
				var randomxparam = Math.ceil(Math.random() * (150 - -(image_dimensions.width-150)) + -(image_dimensions.width-150));
				var randomyparam = Math.ceil(Math.random() * (150 - -(image_dimensions.height-150)) + -(image_dimensions.height-150));
				state.xparam = randomxparam;
				state.yparam = randomyparam;
				state.src = image_dimensions.src;
			}
			else{

				state.src = image_dimensions.src;
			}
			if(isIF){
			}
			Raphael.st.draggable = function() {
				var me = this,
					lx = 0,
					ly = 0,
					ox = state.xparam,
					oy = state.yparam,
					moveFnc = function(dx, dy) {
						lx = dx + ox;  // add the new change in x to the drag origin
						ly = dy + oy;  // do the same for y
						me.transform('t' + lx + ',' + ly);
					},
					startFnc = function() {	
						if(state.isFirstDrag){
							state.isFirstDrag = false;
						}
						else{
							//if first time, then 0 otherwise make it state.xparam
							ox = state.xparam;
							oy = state.yparam;
						}
						//me.transform('t' + state.xparam + ',' + state.yparam);
					},
					endFnc = function() {
						ox = lx;
						oy = ly;
						state.xparam = lx;
						state.yparam = ly;
					};

				this.drag(moveFnc, startFnc, endFnc);
			};

			var paper = Raphael(document.getElementById('scb_s_microscopy_slide_content_lens_outline'));
			var mySet=paper.set();
			var filter1 = paper.filterCreate("filter1");
			var blur1 = Raphael.filterOps.feGaussianBlur({id: 'blur', stdDeviation: state.blur, "in": "SourceGraphic"});
			filter1.appendOperation(blur1);
			var ct1 = Raphael.filterOps.feComponentTransfer({
				feFuncR: {type: "linear", slope: state.brightness, id: 'b_red'},
				feFuncG: {type: "linear", slope: state.brightness, id: 'b_green'}, 
				feFuncB: {type: "linear", slope:state.brightness, id: 'b_blue'}	
			}); 
			filter1.appendOperation(ct1);
			var image = paper.image(image_source, 0, 0,image_dimensions.width, image_dimensions.height);
			
			image.filterInstall(filter1);

			mySet.push(image);
			mySet.draggable();
			
			
			state.action = 'initialized';
			$('#svg').css('left',state.xparam+'px');
			$('#svg').css('top',state.yparam+'px');
			$('#scb_s_microscopy_slide_content_lens_outline svg image').attr('transform',"matrix(1,0,0,1,"+state.xparam+","+state.yparam+")" );
// 
// 			$('#lensfilter #brightness #b_red').attr('slope', state.brightness+'');
// 			$('#lensfilter #brightness #b_green').attr('slope', state.brightness+'');
// 			$('#lensfilter #brightness #b_blue').attr('slope', state.brightness+'');
			change_brightness_lines(state.brightness, disableBrightness);
			//$('#lensfilter #focus')[0].setAttribute('stdDeviation', state.blur);
			draw(state);	
			   

		}
	}

}

    function drawImage(imageObj) { 
        var stage = new Kinetic.Stage({
          container: "container",
          width: 578,
          height: 200
        });
        var layer = new Kinetic.Layer();

        // darth vader
        var darthVaderImg = new Kinetic.Image({
          image: imageObj,
          x: 100,
          y: 30,
          width: 200,
          height: 137,
          draggable: true
        });

        // add cursor styling
        darthVaderImg.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
        });
        darthVaderImg.on('mouseout', function() {
          document.body.style.cursor = 'default';
        });

        layer.add(darthVaderImg);
        stage.add(layer);
      }



function initialize_state(state, image_source){

	state.brightness= 1;
	state.xparam = -250;
	state.yparam =-250;
	state.blur = 0;
	state.action = 'start';

	$('.scb_s_microscope_status').text(state.action);
	
}

function copy_state(current_state, new_state, new_state_source){
	new_state.brightness = current_state.brightness;
	new_state.xparam = current_state.xparam;
	new_state.yparam = current_state.yparam;
	new_state.blur = current_state.blur;
	new_state.action = 'start';
	new_state.src = new_state_source;
	$('.scb_s_microscope_status').text(new_state.action);
	return new_state;
	
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//////////////////ORIGINAL FUNCTIONS/////////////////////////


function modify_state_blur(addition, state, direction){
	caman_lock = true;
	var svg =document.getElementById("svg");
	if(state.blur >scb.ui.static.MicroscopyView.MAX_BLUR){
		state.blur = scb.ui.static.MicroscopyView.MAX_BLUR;
	}
	else if (state.blur <-scb.ui.static.MicroscopyView.MAX_BLUR){
		state.blur = -scb.ui.static.MicroscopyView.MAX_BLUR;
	}
	if (state.blur == 0 && direction =='up'){
		isLeft = false;
		var canvas = document.getElementById('lens');
		state.blur = state.blur +  Math.abs(addition);
	}
	else if (state.blur == 0 && direction =='down'){
		isLeft = true;
		var canvas = document.getElementById('lens');
		state.blur = state.blur +  Math.abs(addition);
	}
	else if(isLeft){
		var canvas = document.getElementById('lens');
		state.blur = state.blur +  -addition;
	}
	else {
		var canvas = document.getElementById('lens');
		state.blur = state.blur +  addition;
		
	}
// 	$('#lensfilter #focus')[0].setAttribute('stdDeviation', state.blur);
	$('#filter1 *[in="SourceGraphic"]')[0].setAttribute('stdDeviation', state.blur);
	caman_lock = false;
}

function reset_image(img2string){
	var image = document.createElement('img');
	image.src = img2string;
	return image;
}


scb.ui.static.MicroscopyView.scb_f_microscopy_note_close_button= function (element) {
		var parsed = scb.ui.static.MicroscopyView.parse(element);
	    var note = $(element).attr('note');
    	note = '.' +note;	
		$(note).slideUp('400', function(){
			parsed.microscopy.navigation_show_state  = $('.scb_s_microscopy_tools_navigation_followup').is(":visible");
			parsed.microscopy.samples_show_state  = $('.scb_s_microscopy_tools_samples_followup').is(":visible");
			//scb.ui.static.MainFrame.refresh();
		});
		
}

scb.ui.static.MicroscopyView.scb_f_microscopy_tools_toggle = function (element) {
	var parsed = scb.ui.static.MicroscopyView.parse(element);
	var note = $(element).attr('note');
    note = '.' +note;	
	$(note).slideDown('400', function(){
		parsed.microscopy.navigation_show_state  = $('.scb_s_microscopy_tools_navigation_followup').is(":visible");
		parsed.microscopy.samples_show_state  = $('.scb_s_microscopy_tools_samples_followup').is(":visible");
		//scb.ui.static.MainFrame.refresh();
	});
	
}

////////////////////
////////////////////
////////////////////
////////////////////

scb.ui.static.MicroscopyView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_select_slide_type', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_select_conditions', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_select_conditions(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_sample_active', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_remove', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_remove(this);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_microscopy_selected', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_selected(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_load_slides', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_load_slides(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_left_microscopy', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_left_microscopy(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_right_microscopy', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_right_microscopy(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_slide_tab', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_slide_tab(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_add_microscopy', function (e, ui) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_add_microscopy(this);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_laser', function (e) {
    	
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        	parsed.experiment.last_scroll=document.body.scrollTop;

		if($(this).attr('checked') =='checked'){
		
			parsed.microscopy.laser_on = true;
		}
		else{
					parsed.microscopy.laser_on = false;
		}
		        scb.ui.static.MainFrame.refresh();

    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_light', function (e) {
    	
        var parsed = scb.ui.static.MicroscopyView.parse(this);
	parsed.experiment.last_scroll=document.body.scrollTop;

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
        scb.ui.static.MicroscopyView.scb_s_microscopy_choose_samples_order_list_select(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_prepare_slides', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_prepare_slides(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_active_all', function (e, ui) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_inactive_all', function (e, ui){
    	scb.ui.static.MicroscopyView.scb_f_microscopy_sample_inactive_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_remove', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_remove(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_red', function (e, ui){
    	
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        	parsed.experiment.last_scroll=document.body.scrollTop;
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = true;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = false;
			$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_Red.png');
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
					$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_Red.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}
		}
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_blue', function (e, ui){
    	
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        	parsed.experiment.last_scroll=document.body.scrollTop;
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = true;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = false;
			$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_Blue.png');
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
					$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_Blue.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}
		}
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_green', function (e, ui){
    	
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        	parsed.experiment.last_scroll=document.body.scrollTop;
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = true;
					parsed.microscopy.merge_enabled = false;
			$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_Green.png');
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
					$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_Green.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}    
		}
	});
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_all', function (e, ui){
    	
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        	parsed.experiment.last_scroll=document.body.scrollTop;
		if( parsed.microscopy_lane.kind != 'IF' ){
							parsed.microscopy.red_enabled = false;
					parsed.microscopy.blue_enabled = false;
					parsed.microscopy.green_enabled = false;
					parsed.microscopy.merge_enabled = true;
			$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_All.png');
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
					$('.scb_s_microscopy_filter').prop('src', 'images/microscopy/Filter_Slider_All.png');
					var new_state = copy_state(parsed.microscopy_lane.lens_map, scb.LensMap, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash])
					init(parsed.microscopy_lane.lens_map, false, true, draw, parsed.assignment.template.slides[parsed.microscopy.selected_lane.current_slides[x].hash]);
					break;
				}
			}
		}    
		});
	    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_tools_toggle', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_tools_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_note_close_button', function (e) {
    	scb.ui.static.MicroscopyView.scb_f_microscopy_note_close_button(this);
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

scb.ui.static.MicroscopyView.draw_slides = function (workarea) {
    $('.scb_s_microscopy_slide_content').each(function () {

        var slide = $(this);
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        	parsed.experiment.last_scroll=document.body.scrollTop;

        parsed.slide = slide;
        scb.ui.static.MicroscopyView.scb_s_microscopy_lens_draw_slide(parsed);
    })
}


//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init_wb(image_source){
	
	$('#spy').remove();
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
	if(samples_area){
		$(samples_area).append(controls);
		$('#svg image').attr('width', '400px');
		$('#svg image').attr('height', '400px');
		$('#svg').css('top', '-50px');
		$('#svg image').attr('xlink:href', image_source);

	}

}

//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init_wb_mod(state, image_source){
	
	$('#spy').remove();
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
	if(samples_area){
		$(samples_area).append(controls);
		$('#svg image').attr('width', '400px');
		$('#svg image').attr('height', '400px');
		$('#svg').css('top', '-50px');
		$('#svg image').attr('xlink:href', image_source);
			draw(state);
	}

}

scb.ui.MicroscopyView = function scb_ui_MicroscopyView(gstate) {
    var self = this;

    self.show = function (state) {
    	var workarea = gstate.workarea;
        var template = state.assignment.template;
        var rows_state = state.microscopy.rows_state();

        var can_prepare_slide = rows_state.valid > 0;

        var kind = 'sample_prep';
        if (state.microscopy.slide_prepared) {
        	 kind = 'prepare_slide';
        }
        
        state.experiment.last_technique_view = 'microscopy';
        var warning_visible = $('.scb_s_microscopy_load_followup').is(":visible");
        workarea.html(scb_microscopy.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            context: gstate.context,
            microscopy: state.microscopy,
            t: template,
            rows: rows_state.rows,
            rows_valid: rows_state.valid,
			last_step: state.experiment.last_step,
			prev_step: state.experiment.prev_step,
            kind: kind,
            kinds: template.micro_kinds,
            can_prepare_slide: can_prepare_slide
        }));
        
        if (kind == 'sample_prep'){
        	$('.scb_s_western_blot_samples_table').scrollTop(state.microscopy.prep_scroll);
        }
        state.experiment.prev_step=6;
        
        if(state.experiment.last_step >= scb.ui.static.MicroscopyView.TOTAL_STEPS)
			state.experiment.last_step = scb.ui.static.MicroscopyView.TOTAL_STEPS+1;
		state.experiment.last_technique = 'MICROSCOPY';
		state.experiment.last_id = state.microscopy.id;
		state.experiment.last_param = 'microscopy_id';

		document.body.scrollTop = state.experiment.last_scroll;
		state.experiment.last_view = 'microscopy';
		document.title = "Microscopy - StarCellBio";
		
		state.microscopy.parent.selected_id = state.microscopy.id;
		
		if(state.microscopy.parent.start_tabs_index <= 0){
			state.microscopy.parent.start_tabs_index = 0;
			$('.scb_s_microscopy_left_microscopy').prop('disabled', true);
			$('.scb_s_microscopy_right_microscopy').prop('disabled', false);
		}
		else $('.scb_s_microscopy_left_microscopy').prop('disabled', false);
		
		if(state.microscopy.parent.start_tabs_index + scb.ui.static.MicroscopyView.TOTAL_TABS-1 ==state.microscopy.parent.list.length-1){
			$('.scb_s_microscopy_right_microscopy').prop('disabled', true);
			$('.scb_s_microscopy_left_microscopy').prop('disabled', false);
		}
		else $('.scb_s_microscopy_right_microscopy').prop('disabled', false);

        if (kind == 'sample_prep') {
            if (_.keys(template.micro_kinds).length == 1) {
                $('button.scb_f_microscopy_sample_remove').hide();
            }

        }
        else{
			$('.scb_s_western_blot_progress_gray_bar').children().each(function () { console.log($(this).css('left'));
    			$(this).css('left', parseInt($(this).css('left'))-5+'px');
			});
			$('.scb_s_western_blot_progress_bar').css('top', '30px');
		}
		if(!state.microscopy.light_on){
			$('#brightup').prop('disabled', true);
			
			$('#brightdown').prop('disabled', true);
		}

        if (state.microscopy.samples_finished) {
            //debugger;
            if(!state.microscopy.warning_fired || warning_visible){
				$('.scb_s_microscopy_load_followup').show();
				$('.scb_s_microscopy_load_followup>.scb_f_controls_close_button').click(function(){
					$('.scb_s_microscopy_load_followup').fadeOut();
					state.microscopy.enable_samples = true;
				});
				state.microscopy.warning_fired = true;
			}

        }
        
        
        if (state.microscopy.samples_finished) {
        	scb.ui.static.MicroscopyView.draw_slides(workarea);
        $('.scb_s_microscopy_choose_samples_order_list').scrollTop(state.microscopy.scroll);
        }
        else{
        init_wb('../images/microscopy/black.jpg');
            $( ".scb_s_microscopy_brightness_slider" ).slider({
			  value:0,
			  min: -100,
			  max: 100,
			  step: 5,
			  slide: function( event, ui ) {
			  }
			});
        }

		_.each($(".scb_s_experiment_step_button"), function (e) {
			if(!$(e).hasClass('scb_s_experiment_step_visited')) 
				$(e).attr('title', 'To use this button, start a new '+$(e).text()+' Experiment.');
			else $(e).removeAttr('title');
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
