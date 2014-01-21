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
	console.log('draw slide');	
	//var model = new scb.components.ModelFactory(state.context.template);
	//model.microscopy.compute(state);
	//console.log(state.color);
	//init(lens_map, draw, 'images/microscopy/'+state.color+'.jpg');
	init(lens_map, draw, 'images/microscopy/blue.jpg');
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
    var slide_id = $(element).attr('lane_id');
    if (slide_id == '') {
       var cell_treatment_id = $(element).attr('cell_treatment_id');
        parsed.microscopy.lanes_list.start({
            kind: slide_type,
            cell_treatment_id: cell_treatment_id,
            experiment_id: parsed.experiment.id
        });
    }
    else {
    	parsed.microscopy.lanes_list.get(slide_id).kind = slide_type;
    }
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
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

    	$.jqDialog.confirm("No samples selected. Would you like to continue?",
			function() {    
					parsed.microscopy.slide_prepared = true;
					window.scrollTo(0, 0);
					$('html').css('overflow', 'visible');
					$('.error_overlay').remove();
					scb.ui.static.MainFrame.refresh();
    		},// callback function for 'YES' button
			function() {
					$('html').css('overflow', 'visible');
					$('.error_overlay').remove();
					return;
			}// callback function for 'NO' button
		);
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
    //TODO: 1st things first -- we needs to save NEW order
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
    $('#lens').remove();
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.MicroscopyView.scb_s_microscopy_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
   if (parsed.microscopy.samples_finished) {
        $('li', $(element).parent()).removeClass('scb_s_microscopy_sample_selected');
        $(element).addClass('scb_s_microscopy_sample_selected');
        parsed.microscopy.lane_selected = parsed.microscopy_lane.id;
        scb.ui.static.MainFrame.refresh();
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

var lens_map = new Object();

var caman;

var arc = 150;

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
	var context = canvas.getContext('2d');
	clear_canvas(context, canvas);
	if(state['cache']['brightness'] != state['brightness'] || state['cache']['blur'] != state['blur']){
		save_and_draw_cache_image(canvas,state);
	}
	else
		//insert special method that listens for borders to rerender new portion of image
		context.drawImage(reset_image(state['cache']['image']), state['xparam'], state['yparam']);

	switch(param)
	{
		case 'x':
		  state['xparam'] = state['xparam'] + addition ;
		  break;
		case 'y':
		  state['yparam'] = state['yparam'] + addition ;
		  break;
		default:
		  break;
	}
}

function updateLensPosition(state,canvas, microslide_top, microslide_left){
	var context = canvas.getContext('2d');
	clear_canvas(context, canvas);
	
	//Make sure to handle state later when you can test it
	var taddition = ((microslide_top*10)/0.3);
	var laddition = (((microslide_left-difference))/0.3)*10;
	context.drawImage(reset_image(state['cache']['image']), state['xparam'], state['yparam']);
	console.log(laddition);
	console.log(microslide_left);
	state['xparam'] = -laddition ;
	state['yparam'] = -taddition ;

}

function draw(state){
	var canvas=document.getElementsByTagName("canvas")[0];
	

	
	
	document.onkeydown=function (e) {
		e = e || window.event;
		if(state.action =='rendering'){
				console.log('nope');
		}
		else{
			if (e.keyCode == '37') {
				// l arrow
				e.preventDefault();
				draw_lens('x', 10, state, document.getElementsByTagName("canvas")[0]);
				if(parseInt($('.circle_lens').css('left'))-0.3 <= difference);
					$('.circle_lens').css('left', parseFloat($('.circle_lens').css('left'))-0.3+'px'); 
				console.log('left')
			}
			else if (e.keyCode == '38') {
				// u arrow
				e.preventDefault();
				draw_lens('y', 10, state, document.getElementsByTagName("canvas")[0]);
				if(parseInt($('.circle_lens').css('top'))-0.3 <= $('.microslide').height());
					$('.circle_lens').css('top', parseFloat($('.circle_lens').css('top'))-0.3+'px'); 
				console.log('up');
			}
			else if (e.keyCode == '39') {
				// r arrow
				e.preventDefault();
				draw_lens('x', -10, state, document.getElementsByTagName("canvas")[0]);
				if(parseInt($('.circle_lens').css('left'))+0.3 <=  difference+ $('.microslide').width());
					$('.circle_lens').css('left', parseFloat($('.circle_lens').css('left'))+0.3+'px'); 
				
				console.log('right');
			}
			else if (e.keyCode == '40') {
				// d arrow
				e.preventDefault();
				draw_lens('y', -10, state, document.getElementsByTagName("canvas")[0]);
				if(parseInt($('.circle_lens').css('top'))+0.3 >= 0);
					$('.circle_lens').css('top', parseFloat($('.circle_lens').css('top'))+0.3+'px'); 
				
				console.log('down');
			}
		}
	};
	$('#brightup').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_brightness(5, state);
	});
	$('#brightdown').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_brightness(-5, state);
	});
	$('#blurup').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(10, state, 'up');
	});
	$('#blurdown').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(-10, state, 'down');
	});
	$('#fblurup').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(5, state, 'up');
	});
	$('#fblurdown').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(-5, state, 'down');
	});
	$('#scb_s_navigation_button_choose_slide_button').click(function(){
		var string = $("form input[type='radio']:checked").val();
		var canvases = document.getElementsByTagName('canvas');
		while(canvases.length>0){
			var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
			samples_area.removeChild(canvases[0]);
		}
		init(lens_map, draw, string);
	});
	console.log('draw');
}






function full_modify_cache(state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	save_and_draw_cache_image(canvas, state)
}

function clear_canvas(ctx, canvas){
 	ctx.save()
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();

}

function reset_cache(){
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
	return [new_canvas, ctx];	
}
function reset_canvas(){
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
	ctx.beginPath();
	ctx.arc(150, 150, arc, 0, Math.PI *2, false);
	ctx.clip();
	return [new_canvas, ctx];	
}

//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init(state, draw, image_source){
	var img = document.createElement('IMG');
	var canvas = document.createElement('canvas');
	var controls = document.getElementById('scb_s_microscopy_lens_controls');
	var slide = document.createElement('IMG');
	slide.className='microslide';
	
	canvas.id = 'lens';
	var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
	if(samples_area){
		samples_area.appendChild(canvas);
	
		samples_area.appendChild(controls);

		var ctx = canvas.getContext('2d');
		var canvas_hidden = document.createElement('canvas');
		canvas_hidden.id = 'spy';
		canvas_hidden.style.visibility='hidden';
		var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
		document.body.appendChild(canvas_hidden);
		state['action'] = 'loading image';
		$('.scb_s_microscope_status').text(state['action']);
		caman = Caman("#lens");
		img.src = image_source;
		slide.src = image_source;
		$('#scb_s_micro_slide').append(slide);
		img.onload= function (){
			var container = $(".microslide")[0];
			var slide = $("#scb_s_micro_slide")[0];
			difference = container.getBoundingClientRect().left-slide.getBoundingClientRect().left;
			$('.circle_lens').css('left', difference+'px');
			ctx.save();
			img_width = img.width;
			img_height = img.height;	
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);	
			var img2string=canvas.toDataURL(0,0, img.width, img.height);
			canvas.width = 300;
			canvas.height = 300;
			
			initialize_state(state, img2string);
			var randomblur = Math.round(Math.ceil(Math.random()*100) / 10) * 10;
			console.log(randomblur);
			state['blur'] = randomblur;

			ctx.beginPath();
			ctx.arc(150, 150, arc, 0, Math.PI *2, false);
			ctx.clip();
			Caman(canvas, img, function () {
				this.stackBlur(state['blur']);
				this.render(function(){
				});
			});
			ctx.drawImage(img, 0, 0);
			draw(state);
			$('.circle_lens').draggable({ 
			handle:'.circle_lens', 
			containment: "#scb_s_micro_slide",
			drag: function() {
				updateLensPosition(state, document.getElementsByTagName("canvas")[0], parseFloat($('.circle_lens').css('top')), parseFloat($('.circle_lens').css('left')))
			},
			stop: function() {
				updateLensPosition(state, document.getElementsByTagName("canvas")[0], parseFloat($('.circle_lens').css('top')), parseFloat($('.circle_lens').css('left')))
			}
      		});
		}
	}

}

function initialize_state(state, img2string){
	state['orig'] =img2string;
	state['display'] = img2string;
	state['brightness'] = 0;
	state['xparam'] = 0;
	state['yparam'] = 0;
	state['blur'] = 0;
	state['action'] = 'start';
	state['cache'] = new Object();
	state['cache']['brightness'] = 0;
	state['cache']['blur'] = 0;
	state['cache']['image'] = img2string;
	
	$('.scb_s_microscope_status').text(state['action']);
	$("input").attr("disabled", true);
	
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//////////////////ORIGINAL FUNCTIONS/////////////////////////


function save_and_draw_cache_image(canvas, state){
	var ctx = canvas.getContext('2d');
	var elements = reset_cache();
	var canvas_hidden = elements[0]; 
	var spy_ctx = elements[1];
	var img = reset_image(state['display']);
	var spy_img;
	Caman(canvas_hidden, img, function () {
		this.brightness(state['brightness']);
		console.log('bright');
		this.stackBlur(state['blur']);
		if(state['blur']>0){
			this.stackBlur(state['blur']);
			console.log('blur');
		}
		this.render(function(){
			console.log('before image');
			state['action']='before image saved';
			spy_img= Canvas2Image.saveAsPNG(canvas_hidden, true); 
			//Canvas2Image.saveAsPNG(canvas_hidden, false, 100, 100); 
			state['action'] = 'rendered';
			console.log('rendered'); 
			var hidden_canvas = document.getElementById('spy');
			hidden_canvas.width= 0;
			hidden_canvas.height=0;
			$('.scb_s_microscope_status').text(state['action']);
			state['cache']['image'] = spy_img.src ;
			state['cache']['brightness'] = state['brightness'];
			state['cache']['blur'] = state['blur'];
			
			document.documentElement.style.overflow='scroll';
			//document.body.style.overflow='scroll';
			var samples_area =  $('body').find('.scb_s_microscopy_slide_content')[0];
			samples_area.style.overflow = 'hidden';
			samples_area.style.height = '100%';
			var e = jQuery.Event("keydown");
			e.which = 40;
			e.keyCode = 40;
			$(document.body).trigger(e);
		});
		console.log('rendering...');
		state['action'] = 'rendering';
	
		$('.scb_s_microscope_status').text(state['action']);	

	});
	
	spy_ctx.drawImage(img, 0, 0);
	canvas.width = 300;
	canvas.height = 300;
	ctx.beginPath();
	ctx.arc(150, 150, arc, 0, Math.PI *2, false);
	ctx.clip();	
	ctx.drawImage(reset_image(state['cache']['image']), state['xparam'], state['yparam']);
}


function modify_state_brightness(addition, state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	state['brightness'] = state['brightness'] + addition;
	if(state['brightness'] >= 100)
		state['brightness'] = 100;
	else if (state['brightness'] <=-100)
		state['brightness'] = -100;
	console.log('brightness');
	console.log(state['brightness']);
	console.log('blur');
	console.log(state['blur']);
	console.log('addition');
	console.log(addition);
	Caman(canvas, reset_image(state['display']), function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			state['action'] = 'bright';

			console.log('bright');
			
			$('.scb_s_microscope_status').text(state['action']);
		});
		
		console.log('rendering...');
		state['action'] = 'rendering';
		
		$('.scb_s_microscope_status').text(state['action']);

	});
	context.beginPath();
	context.arc(150, 150, arc, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(reset_image(state['display']), state['xparam'], state['yparam']);

}


function modify_state_blur(addition, state, direction){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	console.log('blur');
	console.log(state['blur']);
	console.log('addition');
	console.log(addition);
	
	if(state['blur'] >100){
		state['blur'] = 100;
	}
	else if (state['blur'] <-100){
		state['blur'] = -100;
	}
	if (state['blur'] == 0 && direction =='up'){
		isLeft = false;
		blur_helper(state, context, canvas, Math.abs(addition));
	}
	else if (state['blur'] == 0 && direction =='down'){
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
	state['display'] = state['orig'];
	state['blur'] = state['blur'] + addition;
	Caman(canvas, reset_image(state['display']), function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			state['action'] = 'blur';

			console.log('stackblur');
			
			$('.scb_s_microscope_status').text(state['action']);
		});
	
		console.log('rendering...');
		state['action'] = 'rendering';
		
		$('.scb_s_microscope_status').text(state['action']);


	});
	context.beginPath();
	context.arc(150, 150, arc, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(reset_image(state['orig']), state['xparam'], state['yparam']);
}


scb.ui.static.MicroscopyView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_select_slide_type', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type(this, e);
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
    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_add_microscopy', function (e, ui) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_add_microscopy(this);
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
}

scb.ui.static.MicroscopyView.draw_slides = function (workarea) {
    $('.scb_s_microscopy_slide_content').each(function () {

        var slide = $(this);
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        parsed.slide = slide;
        scb.ui.static.MicroscopyView.scb_s_microscopy_lens_draw_slide(parsed);
   //     parsed.microscopy_lane.lens_map = lens_map;
    })
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
        
        
        if (state.microscopy.samples_finished) {
        	scb.ui.static.MicroscopyView.draw_slides(workarea);
        }
        else
        init(lens_map, draw, '../images/microscopy/black.jpg');

		_.each($(".scb_s_experiment_step_button"), function (e) {
			if(!$(e).hasClass('scb_s_experiment_step_visited')) 
				$(e).attr('title', 'To use this button, start a new '+$(e).text()+' Experiment.');
			else $(e).removeAttr('title');
    	});	
    }
}