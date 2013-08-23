
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

var map = new Object();


var caman;

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
		full_modify_cache(state);
	}
	else
		context.drawImage(state['cache']['image'], state['xparam'], state['yparam']);

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
var count = 0;

function draw(state){
	var canvas=document.getElementsByTagName("canvas")[0];
	document.onkeydown=function (e) {
		e = e || window.event;
		console.log(state['cache']['blur']);
		console.log(state['blur']);
		
		
		console.log(state['cache']['brightness']);
		console.log(state['brightness']);
		if (e.keyCode == '37') {
			// l arrow
			draw_lens('x', 10, state, document.getElementsByTagName("canvas")[0]);
			console.log('left')
		}
		else if (e.keyCode == '38') {
			// u arrow
			draw_lens('y', 10, state, document.getElementsByTagName("canvas")[0]);
			console.log('up');
		}
		else if (e.keyCode == '39') {
			// r arrow
			draw_lens('x', -10, state, document.getElementsByTagName("canvas")[0]);
			console.log('right');
		}
		else if (e.keyCode == '40') {
			// d arrow
			draw_lens('y', -10, state, document.getElementsByTagName("canvas")[0]);
			console.log('down');
		}
		else if (e.keyCode == '66') {
			modify_state_brightness(5, state);
		}
		else if (e.keyCode == '86') {
			modify_state_brightness(-5, state);
		}
		else if (e.keyCode == '83') {
			modify_state_blur(5, state);
		}
		else if (e.keyCode == '65') {
			modify_state_blur(-5, state);
		}
	};
	
	console.log('draw');
}


function reset_image(img2string){
	var image = document.createElement('img');
	image.src = img2string;
	return image;
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
	Caman(canvas, state['orig'], function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
		});
	});
	context.beginPath();
	context.arc(250, 250, 225, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(state['orig'], state['xparam'], state['yparam']);
	console.log();
	
}


function modify_state_blur(addition, state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	state['blur'] = state['blur'] + addition;
	if(state['blur'] > 100)
		state['blur'] = 100;
	else if (state['blur'] <5)
		state['blur'] = 0;
	Caman(canvas, state['orig'], function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			console.log('stackblur');
		});
	});
	context.beginPath();
	context.arc(250, 250, 225, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(state['orig'], state['xparam'], state['yparam']);
	console.log();
	
}

function modify_state_sharpness(addition, state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	state['blur'] = state['blur'] + addition;
	if(state['blur'] > 100)
		state['blur'] = 100;
	else if (state['blur'] <5)
		state['blur'] = 0;
	Caman(canvas, state['orig'], function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			console.log('stackblur');
		});
	});
	context.beginPath();
	context.arc(250, 250, 225, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(state['orig'], state['xparam'], state['yparam']);
	console.log();
	
}



function full_modify_cache(state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	save_and_draw_cache_image(canvas, state)
}

function save_and_draw_cache_image(canvas, state){
	var ctx = canvas.getContext('2d');
	var elements = reset_cache();
	var canvas_hidden = elements[0]; 
	var spy_ctx = elements[1];
	var img = state['orig'];
	var spy_img;
	Caman(canvas_hidden, img, function () {
		this.brightness(state['brightness']);
		console.log('bright');
		this.stackBlur(state['blur']);
		console.log('blur');
		this.render(function(){
			spy_img= Canvas2Image.saveAsPNG(canvas_hidden, true); 
			//Canvas2Image.saveAsPNG(canvas_hidden, false, 100, 100); 
			console.log('rendered'); 
			state['cache']['image'] = spy_img ;
			state['cache']['brightness'] = state['brightness'];
			state['cache']['blur'] = state['blur'];
			document.body.style.overflow = 'hidden';
			document.body.style.height = '100%';
		});
	});
	
	spy_ctx.drawImage(img, 0, 0);
	canvas.width = 500;
	canvas.height = 500;
	ctx.beginPath();
	ctx.arc(250, 250, 225, 0, Math.PI *2, false);
	ctx.clip();	
	ctx.drawImage(state['cache']['image'], state['xparam'], state['yparam']);
	console.log();
	
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
	document.body.insertBefore(new_canvas,document.body.firstChild);
	var ctx = new_canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(250, 250, 225, 0, Math.PI *2, false);
	ctx.clip();
	return [new_canvas, ctx];	
}
//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init(state, draw){
	var img = document.createElement('IMG');
	var canvas = document.createElement('canvas');
	canvas.id = 'lens';
	document.body.appendChild(canvas);
	var ctx = canvas.getContext('2d');
	var canvas_hidden = document.createElement('canvas');
	canvas_hidden.id = 'spy';
	canvas_hidden.style.visibility='hidden';
	document.body.appendChild(canvas_hidden);
	caman = Caman("#lens");
	img.src = 'hi.jpg';
	img.onload= function (){
		ctx.save();
		img_width = img.width;
		img_height = img.height;	
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);	
		img2string=canvas.toDataURL(0,0, img.width, img.height);
		canvas.width = 500;
		canvas.height = 500;
		ctx.beginPath();
		ctx.arc(250, 250, 225, 0, Math.PI *2, false);
		ctx.clip();
		ctx.drawImage(img, 0, 0);
		initialize_state(state, img2string);
		console.log(img2string);
		draw(state);
	}

}


function initialize_state(state, img2string){
	state['orig'] = reset_image(img2string);
	state['brightness'] = 0;
	state['xparam'] = 0;
	state['yparam'] = 0;
	state['blur'] = 0;
	state['sharpen'] = 0;

	state['cache'] = new Object();
	state['cache']['brightness'] = 0;
	state['cache']['blur'] = 0;
	state['cache']['sharpen'] = 0;
	state['cache']['image'] = reset_image(img2string);
}


init(map, draw);

