'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.MicroscopyView = scb.ui.static.MicroscopyView || {};
scb.ui.static.MicroscopyView.TOTAL_TABS =  4;
scb.ui.static.MicroscopyView.TOTAL_STEPS =  5;

scb.ui.static.MicroscopyView.MAX_BLUR=  16;


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
		init_wb('../images/microscopy/black.jpg');
	}
	else if(state.slide_type != 'IF' && state.microscopy.light_on && !state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, false, draw, state.microscopy_lane.lens_map.src );
			}
			else{
				//state.microscopy_lane.lens_map = new Object();
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, true, false, draw, state.assignment.template.slides[img_sample]);
			}
	}
	else if(state.slide_type != 'IF' && !state.microscopy.light_on && state.microscopy.laser_on){
		init_wb('../images/microscopy/black.jpg');
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
	}
	else if(state.slide_type == 'IF' && !state.microscopy.light_on && !state.microscopy.laser_on){
			init_wb('../images/microscopy/black.jpg');
			disableSlider = true;
	}
	else if(state.slide_type == 'IF' && state.microscopy.light_on && !state.microscopy.laser_on){
		if(state.microscopy_lane.lens_map.brightness >0 ||state.microscopy_lane.lens_map.cache_brightness >0)
			init_wb_mod(state.microscopy_lane.lens_map, '../images/microscopy/white.jpg');
		else
			init_wb_mod(state.microscopy_lane.lens_map, '../images/microscopy/black.jpg');
	}
	else if(state.slide_type == 'IF' && !state.microscopy.light_on && state.microscopy.laser_on){
			if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				state.microscopy_lane.lens_map.brightness = 0;
				state.microscopy_lane.lens_map.cache_brightness = 0;
				init(state.microscopy_lane.lens_map, false, true, draw, state.microscopy_lane.lens_map.src );
			}
			else{
				state.microscopy_lane.lens_map.mag = state.slides[0].mag;
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				state.microscopy_lane.lens_map.brightness = 0;
				state.microscopy_lane.lens_map.cache_brightness = 0;
				init(state.microscopy_lane.lens_map, true, true, draw, state.assignment.template.slides[img_sample]);
			}
			disableSlider = true;
	}
	else if(state.slide_type == 'IF' && state.microscopy.light_on && state.microscopy.laser_on){
		enableIFSlider = true;
		$('#brightdown').prop('disabled', true);
		if(state.microscopy_lane.lens_map && state.microscopy_lane.lens_map.src){
				if(state.microscopy_lane.lens_map.brightness <0 || state.microscopy_lane.lens_map.cache_brightness<0){
					state.microscopy_lane.lens_map.brightness = 0;
					state.microscopy_lane.lens_map.cache_brightness = 0;
				}
				$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
				init(state.microscopy_lane.lens_map, false, true, draw, state.microscopy_lane.lens_map.src );
		}
		else{
			state.microscopy_lane.lens_map.mag = state.slides[0].mag;
			state.microscopy_lane.lens_map.brightness = 0;
			state.microscopy_lane.lens_map.cache_brightness = 0;
			$('.scb_s_microscopy_mag').text(state.microscopy_lane.lens_map.mag);
			init(state.microscopy_lane.lens_map, true, true, draw, state.assignment.template.slides[img_sample]);
		}
		min_brightness=0;
		max_brightness=100;
	}
	if(!disableSlider  && !enableIFSlider){
		min_brightness = -100;
		max_brightness = 100;
	}
	if(state.microscopy.disable_blur){
			$('#fblurup').prop('disabled', true);
			$('#fblurdown').prop('disabled', true);
			$('#blurup').prop('disabled', true);
			$('#blurdown').prop('disabled', true);
	}
	if(state.microscopy.disable_brightness){
	 		$('#brightup').prop('disabled', true);
			$('#brightdown').prop('disabled', true);
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
       for(var index = 0; index < parsed.microscopy.lanes_list.list.length; index++){
			var lane = parsed.microscopy.lanes_list.list[index];
			if(lane.kind == slide_type && cell_treatment_id == lane.cell_treatment_id){
				keys_list = _.keys(parsed.assignment.template.slide_parser[lane.cell_treatment.treatment_list.list[0].collection_id][slide_type])
				matches_list.push(lane.slide_conditions)
			}
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
       if(_.size(parsed.assignment.template.micro_kinds[slide_type].conditions) == 1)
       {
       			parsed.microscopy.lanes_list.start({
       				kind: slide_type,
            		slide_conditions: _.keys(parsed.assignment.template.micro_kinds[slide_type].conditions)[0],
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
    save_and_draw_cache_image_list = [];
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


var img_width;
var img_height;
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

scb.ui.static.MicroscopyView.ARC =  150;

scb.ui.static.MicroscopyView.LENS =  300;
scb.ui.static.MicroscopyView.PICTURE_LIM =  400;

var difference;

var isLeft = false;
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
	if(canvas){
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
	
		var context = canvas.getContext('2d');
		clear_canvas(context, canvas);

		context.fillStyle="#000000";
		context.fillRect(0,0, canvas.width, canvas.height);
		if(state.cache_brightness != state.brightness|| state.cache_blur != state.blur){
			save_and_draw_cache_image(canvas,state);
		}
		else
			context.drawImage(reset_image(state.cache), state.xparam, state.yparam);
	}
	else{
		console.error( "CANVAS IS ERROR! " , canvas ); 
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
	$('#up').click(function(){
			if(caman_lock){
			}
			else{
				draw_lens('y', 10, state, document.getElementById("lens"));
				console.log('up');
			}

	});
	$('#down').click(function(){
			if(caman_lock){
			}
			else{
				draw_lens('y', -10, state, document.getElementById("lens"));
				console.log('down');
			}
	});
	$('#left').click(function(){
			if(caman_lock){
			}
			else{
				draw_lens('x', 10, state, document.getElementById("lens"));
				console.log('left')
			}
	});
	$('#right').click(function(){
			if(caman_lock){
			}
			else{
				draw_lens('x', -10, state, document.getElementById("lens"));
				console.log('right');
			}
	});
	$('#brightup').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
		if(state.brightness >=max_brightness){
				$('#brightup').prop('disabled', true);
		}
		else{
				$('#brightup').prop('disabled', false);
				$('#brightdown').prop('disabled', false);

		}
		modify_state_brightness(5, state);
		}
	});
	$('#brightdown').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
		if(state.brightness <=min_brightness){
				$('#brightdown').prop('disabled', true);
		}
		else{
				$('#brightup').prop('disabled', false);
				$('#brightdown').prop('disabled', false);

		}
		modify_state_brightness(-5, state);
		}
	});
	$('#blurup').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
			if(state.blur >=scb.ui.static.MicroscopyView.MAX_BLUR && !isLeft){
				$('#blurup').prop('disabled', true);
			}
			else {
				$('#fblurup').prop('disabled', false);
				$('#fblurdown').prop('disabled', false);
				$('#blurup').prop('disabled', false);
				$('#blurdown').prop('disabled', false);
			}
		modify_state_blur(4, state, 'up');
		}
	});
	$('#blurdown').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
			if(state.blur >=scb.ui.static.MicroscopyView.MAX_BLUR && isLeft){
				$('#blurdown').prop('disabled', true);
			}
			else {
				$('#fblurup').prop('disabled', false);
				$('#fblurdown').prop('disabled', false);
				$('#blurup').prop('disabled', false);
				$('#blurdown').prop('disabled', false);
			}
		modify_state_blur(-4, state, 'down');
		}
	});
	$('#fblurup').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
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
		modify_state_blur(1, state, 'up');
		}
	});
	$('#fblurdown').click(function(){
		if(caman_lock){
				console.log('nope');
		}
		else{
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
		modify_state_blur(-1, state, 'down');
		}
	});

	console.log('draw');
}



function full_modify_cache(state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	context.fillStyle="#000000";
	context.fillRect(0,0, canvas.width, canvas.height);
	save_and_draw_cache_image(canvas, state)
}

function clear_canvas(ctx, canvas){
 	ctx.save()
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.restore();

}

function reset_cache(){
	console.info( "RESET_CACHE");
	var old_canvas = document.getElementById('spy');
	old_canvas.parentNode.removeChild(old_canvas);
	var new_canvas = document.createElement('canvas');
	new_canvas.id = 'spy';
	new_canvas.style.visibility='hidden';
	new_canvas.width = img_width;
	new_canvas.height = img_height;
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
	document.body.appendChild(new_canvas);
	var ctx = new_canvas.getContext('2d');
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0, new_canvas.width, new_canvas.height);
	return [new_canvas, ctx];	
}
function reset_canvas(){
	console.info( "RESET_CANVAS");
	var old_canvas = document.getElementById('lens');
	var width = old_canvas.width;
	var height = old_canvas.height;
	old_canvas.parentNode.removeChild(old_canvas);
	var new_canvas = document.createElement('canvas');
	new_canvas.id = 'lens';
	new_canvas.width = width;
	new_canvas.height = height;
	var samples_area = $('body').find('.scb_s_microscopy_slide_content')[0];
	samples_area.insertBefore(new_canvas,samples_area.firstChild);
	var ctx = new_canvas.getContext('2d');
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0, new_canvas.width, new_canvas.height);
	ctx.beginPath();
	ctx.arc(scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.ARC , 0, Math.PI *2, false);
	ctx.clip();
	return [new_canvas, ctx];	
}



//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init(state, isNew, isIF, draw, image_source){
	$('#spy').remove();
		$('#lens').remove();

	var img = document.createElement('IMG');
	var canvas = document.createElement('canvas');
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	
	canvas.id = 'lens';
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
	if(samples_area){
		samples_area.appendChild(canvas);
	
		samples_area.appendChild(controls);

		var ctx = canvas.getContext('2d');
		canvas.width = scb.ui.static.MicroscopyView.LENS;
		canvas.height = scb.ui.static.MicroscopyView.LENS;
		ctx.fillRect(0,0, canvas.width, canvas.height);

		var canvas_hidden = document.createElement('canvas');
		canvas_hidden.id = 'spy';
		canvas_hidden.style.visibility='hidden';
		var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
		document.body.appendChild(canvas_hidden);
		state.action = 'loading image';
		$('.scb_s_microscope_status').text(state.action);
		if(!state.disable_blur && !state.disable_brightness)
			caman = Caman("#lens");
		else
			debugger;
		img.src = image_source;
		img.onload= function (){
			ctx.save();
			if(Math.ceil(img.width/scb.ui.static.MicroscopyView.PICTURE_LIM) <= 1 || Math.ceil(img.height/scb.ui.static.MicroscopyView.PICTURE_LIM) <= 1){
				
			img_width = img.width;
			img_height = img.height;	
			canvas.width = img.width;
			canvas.height = img.height;
			}
			else{
			img_width = scb.ui.static.MicroscopyView.PICTURE_LIM;
			canvas.width = scb.ui.static.MicroscopyView.PICTURE_LIM;                 
			
			var height_proportion = Math.ceil((scb.ui.static.MicroscopyView.PICTURE_LIM*img.height)/img.width);
				
			img_height = height_proportion;
			canvas.height = height_proportion;
			}
			ctx.drawImage(img, 0, 0, img_width, img_height);	
			var img2string=canvas.toDataURL(0,0, img.width, img.height);
			canvas.width = scb.ui.static.MicroscopyView.LENS;
			canvas.height = scb.ui.static.MicroscopyView.LENS;
			if(isNew){
				initialize_state(state, img2string, img.src);
				if(!state.disable_blur){
					var randomblur = Math.round(Math.ceil(Math.random()*16) / 4) * 4;
					var randomside = Math.round(Math.ceil(Math.random()*2));
					if(randomside == 1)
						isLeft = false;
					else
						isLeft = true;
					console.log(randomblur);
					state.blur = randomblur;
				}
				var randomxparam = Math.ceil(Math.random() * (150 - -(img_width-150)) + -(img_width-150));
				var randomyparam = Math.ceil(Math.random() * (150 - -(img_height-150)) + -(img_height-150));
				state.xparam = randomxparam;
				state.yparam = randomyparam;
				state.src = img.src;
			}
			else{
				state.orig =img2string;
				state.display = img2string;
				state.cache = img2string;
				state.src = img.src;
			}
			if(isIF){
				state.orig = img2string;
				state.display = img2string;
				state.cache = img2string;
			}
			state.action = 'initialized';
			
			save_and_draw_cache_image(canvas,state);

			draw(state);

		}
	}

}

function initialize_state(state, img2string, image_source){

	state.orig =img2string;
	state.display= img2string;
	state.brightness= 0;
	state.xparam = -250;
	state.yparam =-250;
	state.blur = 0;
	state.action = 'start';
	state.cache_brightness = 0;
	state.cache_blur = 0;
	state.cache = img2string;

	$('.scb_s_microscope_status').text(state.action);
	
}

function copy_state(current_state, new_state, new_state_source){
	new_state.brightness = current_state.brightness;
	new_state.xparam = current_state.xparam;
	new_state.yparam = current_state.yparam;
	new_state.blur = current_state.blur;
	new_state.action = 'start';
	new_state.cache_brightness = current_state.cache_brightness;
	new_state.cache_blur = current_state.cache_blur;
	new_state.src = new_state_source;
	$('.scb_s_microscope_status').text(new_state.action);
	return new_state;
	
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//////////////////ORIGINAL FUNCTIONS/////////////////////////

var caman_lock = false;

var save_and_draw_cache_image_list = [];
function save_and_draw_cache_image(canvas, state){
	var ctx = canvas.getContext('2d');
	if(state.disable_blur && state.disable_brightness){
	}
	else{
		caman_lock = true;
		save_and_draw_cache_image_list.push({ canvas:canvas, state:state });
		if(save_and_draw_cache_image_list.length != 1)
		{
			return;
		}
		var elements = reset_cache();
		var canvas_hidden = elements[0]; 
		var spy_ctx = elements[1];
		var spy_img;
		var my_img = reset_image(state.display);
		Caman(canvas_hidden, my_img, function () {
		//PROBLEM FOR LOURDES STARTS HERE
		//HOUDINI
			if(!state.disable_brightness){
			this.brightness(state.brightness);
			console.log('bright');
			}
			if(!state.disable_blur){
				this.stackBlur(state.blur);
				if(state.blur >0){
					this.stackBlur(state.blur);
					console.log('blur');
				}
			}
			this.render(function(){
				console.log('before image');
				state.action ='before image saved';
				spy_img= Canvas2Image.saveAsPNG(canvas_hidden, true); 
				if( spy_img.src == 'data:,' ) { 
					console.error( "SPY IMAGE IS ERROR! " , spy_img ); 
					debugger;
				}
				state.action = 'rendered';
				console.log('rendered'); 
				var hidden_canvas = canvas_hidden;
				hidden_canvas.width= 0;
				hidden_canvas.height=0;
				$('#lens_pending').remove();
			
				$('.scb_s_microscope_status').text(state.action);
				state.cache = spy_img.src ;
				state.cache_brightness = state.brightness;
				state.cache_blur = state.blur;
				document.documentElement.style.overflow='scroll';
				draw_lens('y', 0, state, document.getElementById('lens'));			
				if(save_and_draw_cache_image_list.length > 1)
				{
					console.info( "save_and_draw_cache_image_list.length: "+ save_and_draw_cache_image_list.length, save_and_draw_cache_image_list);
					var last = save_and_draw_cache_image_list.pop();
					save_and_draw_cache_image_list = [];
					save_and_draw_cache_image( last.canvas, last.state);
				}
				save_and_draw_cache_image_list = [];
				caman_lock = false;
			});
			console.log('rendering...');
			state.action = 'rendering';
			var progress_icon = document.createElement('img');
			progress_icon.src = '../../../images/homepage/ajax_loader.gif';
			progress_icon.style.marginLeft = '50%';
			progress_icon.id = 'lens_pending';
			$('.scb_s_microscopy_samples_slide_area').append(progress_icon);
			$('.scb_s_microscope_status').text(state['action']);	

		});
	
		spy_ctx.drawImage(my_img, 0, 0);
	}
	canvas.width = scb.ui.static.MicroscopyView.LENS;
	canvas.height = scb.ui.static.MicroscopyView.LENS;
	ctx.beginPath();
	ctx.arc(scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.ARC , 0, Math.PI *2, false);
	ctx.clip();	

	ctx.fillStyle="#000000";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(reset_image(state.cache), state.xparam, state.yparam);

}

var min_brightness = -100;
var max_brightness = 100;

function modify_state_brightness(addition, state){
	if(!state.disable_brightness){
		caman_lock = true;
		var elements = reset_canvas();
		var canvas = elements[0]; 
		var context = elements[1];
		//state['brightness'] = state['brightness'] + addition;
	
		state.brightness =  state.brightness + addition;
		if(state.brightness >= max_brightness)
			state.brightness = max_brightness;
		else if (state.brightness <=min_brightness)
			state.brightness = min_brightness;
		console.log('brightness');
		console.log(state.brightness);
		if(!state.disable_blur){
			console.log('blur');
			console.log(state.blur);
		}
		console.log('addition');
		console.log(addition);
		var my_img = reset_image(state.display);
		Caman(canvas, my_img, function () {
			this.brightness(state.brightness);
			if(!state.disable_blur)
				this.stackBlur(state.blur);
			this.render(function(){
				state.action = 'bright';

				console.log('bright');
			
				$('.scb_s_microscope_status').text(state.action);
			
				$('#lens_pending').remove();
				caman_lock = false;
			});
		
			console.log('rendering...');
			state.action = 'rendering';
			var progress_icon = document.createElement('img');
			progress_icon.src = '../../../images/homepage/ajax_loader.gif';
			progress_icon.style.marginLeft = '50%';
			progress_icon.id = 'lens_pending';

			$('.scb_s_microscopy_samples_slide_area').append(progress_icon);
			$('.scb_s_microscope_status').text(state.action);

		});
		context.beginPath();
		context.arc(scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.ARC , 0, Math.PI *2, false);
		context.clip();	
		context.drawImage(my_img, state.xparam, state.yparam);
	}

}


function modify_state_blur(addition, state, direction){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	console.log('blur');
	console.log(state.blur);
	console.log('addition');
	console.log(addition);
	
	if(state.blur >scb.ui.static.MicroscopyView.MAX_BLUR){
		state.blur = scb.ui.static.MicroscopyView.MAX_BLUR;
	}
	else if (state.blur <-scb.ui.static.MicroscopyView.MAX_BLUR){
		state.blur = -scb.ui.static.MicroscopyView.MAX_BLUR;
	}
	if (state.blur == 0 && direction =='up'){
		isLeft = false;
		blur_helper(state, context, canvas, Math.abs(addition));
	}
	else if (state.blur == 0 && direction =='down'){
		isLeft = true;
		blur_helper(state, context, canvas, Math.abs(addition));
	}
	else if(isLeft){
		blur_helper(state,context, canvas, -addition);
	}
	else {
		blur_helper(state,context, canvas, addition);
	}
}

function reset_image(img2string){
	var image = document.createElement('img');
	image.src = img2string;
	return image;
}



function blur_helper(state, context, canvas, addition){
	if(!state.disable_blur){
		caman_lock = true;
		state.display = state.orig;
		state.blur = state.blur + addition;
		Caman(canvas, reset_image(state.display), function () {
			if(!state.disable_brightness){
				this.brightness(state.brightness);
			}
			this.stackBlur(state.blur);
			this.render(function(){
				state.action = 'blur';
				console.log('stackblur');
				$('.scb_s_microscope_status').text(state.action);
				$('#lens_pending').remove();
				caman_lock = false;
			});
			console.log('rendering...');
			state.action = 'rendering';
			var progress_icon = document.createElement('img');
			progress_icon.src = '../../../images/homepage/ajax_loader.gif';
			progress_icon.style.marginLeft = '50%';
			progress_icon.id = 'lens_pending';

			$('.scb_s_microscopy_samples_slide_area').append(progress_icon);
		
			$('.scb_s_microscope_status').text(state.action);
		});
		context.fillStyle="#000000";
		context.fillRect(0,0, canvas.width, canvas.height);
		context.beginPath();
		context.arc(scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.ARC , 0, Math.PI *2, false);
		context.clip();	
		context.drawImage(reset_image(state.orig), state.xparam, state.yparam);
	}
}
////////////////////
////////////////////
////////////////////
////////////////////


scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show = function (show) {
    var jqDiv = $('.scb_s_microscopy_instructions_followup');
    scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state = show;
    if (show)  jqDiv.slideDown(); else  jqDiv.slideUp();
    
        $('.scb_s_microscopy_instructions_followup_toggle').blur();
}

//called status because state is already used, maintains open/close state of instructions
scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_status = function (show) {
    var jqDiv = $('.scb_s_microscopy_instructions_followup');
    scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state = show;
    if (show)  jqDiv.show(); else  jqDiv.hide();
    
    
        $('.scb_s_microscopy_instructions_followup_toggle').blur();
}


scb.ui.static.MicroscopyView.scb_f_controls_close_button= function (element) {
	    scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state = false;
	    var jqDiv = $('.scb_s_microscopy_instructions_followup');

	    jqDiv.slideUp();

}

scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_followup_toggle = function (element) {
    scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show($('.scb_s_microscopy_instructions_followup').is(':hidden'));
}


scb.ui.static.MicroscopyView.scb_f_microscopy_note_close_button= function (element) {
		var parsed = scb.ui.static.MicroscopyView.parse(element);
	    var note = $(element).attr('note');
    	note = '.' +note;	
		$(note).slideUp('400', function(){
			parsed.microscopy.navigation_show_state  = $('.scb_s_microscopy_tools_navigation_followup').is(":visible");
			parsed.microscopy.samples_show_state  = $('.scb_s_microscopy_tools_samples_followup').is(":visible");
			scb.ui.static.MainFrame.refresh();
		});
		
}

scb.ui.static.MicroscopyView.scb_f_microscopy_tools_toggle = function (element) {
	var parsed = scb.ui.static.MicroscopyView.parse(element);
	var note = $(element).attr('note');
    note = '.' +note;	
	$(note).slideDown('400', function(){
		parsed.microscopy.navigation_show_state  = $('.scb_s_microscopy_tools_navigation_followup').is(":visible");
		parsed.microscopy.samples_show_state  = $('.scb_s_microscopy_tools_samples_followup').is(":visible");
		scb.ui.static.MainFrame.refresh();
	});
	
}

scb.ui.static.MicroscopyView.register = function (workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_instructions_followup_toggle', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_followup_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_controls_close_button', function (e) {
    	scb.ui.static.MicroscopyView.scb_f_controls_close_button(this);
    });
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
//    scb.utils.off_on(workarea, 'click', '.scb_f_save_button', function (e, ui) {
//    var parsed = scb.ui.static.MicroscopyView.parse(this);
//        	parsed.experiment.last_scroll=document.body.scrollTop;
//        draw_lens('x', 0,parsed.microscopy.selected_lane.lens_map, document.getElementsByTagName("canvas")[0]);
//    });
    
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
		$('#lens').remove();
	var img = document.createElement('IMG');
	var canvas = document.createElement('canvas');
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	canvas.id = 'lens';
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
			canvas.width = scb.ui.static.MicroscopyView.LENS;
		canvas.height = scb.ui.static.MicroscopyView.LENS;
	if(samples_area){
		samples_area.appendChild(canvas);
		samples_area.appendChild(controls);
		var ctx = canvas.getContext('2d');
		var canvas_hidden = document.createElement('canvas');
		canvas_hidden.id = 'spy';
		canvas_hidden.style.visibility='hidden';
		var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
		document.body.appendChild(canvas_hidden);
		caman = Caman("#lens");
		img.src = image_source;
		img.onload= function (){
			ctx.save();
			img_width = img.width;
			img_height = img.height;	
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);	
			var img2string=canvas.toDataURL(0,0, img.width, img.height);
			canvas.width = scb.ui.static.MicroscopyView.LENS;
			canvas.height = scb.ui.static.MicroscopyView.LENS;
			var randomblur = Math.round(Math.ceil(Math.random()*100) / 10) * 10;
			console.log(randomblur);
			ctx.beginPath();
			ctx.arc(scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.ARC , 0, Math.PI *2, false);
			ctx.clip();
			ctx.drawImage(img, 0, 0);
			ctx.restore();
		}
	}

}




//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init_wb_mod(state, image_source){
	
	$('#spy').remove();
		$('#lens').remove();
	var img = document.createElement('IMG');
	var canvas = document.createElement('canvas');
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	canvas.id = 'lens';
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
			canvas.width = scb.ui.static.MicroscopyView.LENS;
		canvas.height = scb.ui.static.MicroscopyView.LENS;
	if(samples_area){
		samples_area.appendChild(canvas);
		samples_area.appendChild(controls);
		var ctx = canvas.getContext('2d');
		var canvas_hidden = document.createElement('canvas');
		canvas_hidden.id = 'spy';
		canvas_hidden.style.visibility='hidden';
		var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
		document.body.appendChild(canvas_hidden);
		caman = Caman("#lens");
		img.src = image_source;
		img.onload= function (){
			ctx.save();
			img_width = img.width;
			img_height = img.height;	
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);	
			var img2string=canvas.toDataURL(0,0, img.width, img.height);
			
			state.orig =img2string;
			state.display = img2string;
			state.cache = img2string;
			canvas.width = scb.ui.static.MicroscopyView.LENS;
			canvas.height = scb.ui.static.MicroscopyView.LENS;
			ctx.beginPath();
			ctx.arc(scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.LENS/2 , scb.ui.static.MicroscopyView.ARC , 0, Math.PI *2, false);
			ctx.clip();
			ctx.drawImage(img, 0, 0);
			ctx.restore();
			draw(state);
		}
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
		
		if (scb.utils.isDefined(scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state)) {
            if (!scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state) {
                $('.scb_s_microscopy_instructions_followup').hide();
                scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_status(false);
            } else {
                scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_status(scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state);
            }
        }
        if (state.microscopy.samples_finished) {
            //debugger;
            if(!state.microscopy.warning_fired){
				$('.scb_s_microscopy_load_followup').show();
				$('.scb_s_microscopy_load_followup>.scb_f_controls_close_button').click(function(){
					$('.scb_s_microscopy_load_followup').fadeOut();
					state.microscopy.enable_samples = true;
				});
				state.microscopy.warning_fired = true;
			}
        	if (!scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state) {
                $('.scb_s_microscopy_instructions_followup').hide();
                scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_status(false);
            } else {
                scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_status(scb.ui.static.MicroscopyView.scb_s_microscopy_instructions_show_state);
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
				top: ($(window).height() - $('#main').outerHeight())/2
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
