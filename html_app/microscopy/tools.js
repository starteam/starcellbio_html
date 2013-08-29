importScripts("caman.full.js");

var bright = function (canvas, img){
	Caman(canvas, img, function () {
		this.brightness(50);
		this.render(function(){	
			console.log('render');
		});
		
		console.log('rendering...');

	});
}

function noise() {
    return Math.random() * 0.5 + 0.5;
};

function colorDistance(scale, dest, src) {
    return (scale * dest + (1 - scale) * src);
};

var processSepia = function (binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var r = binaryData[i];
        var g = binaryData[i + 1];
        var b = binaryData[i + 2];

        binaryData[i] = colorDistance(noise(), (r * 0.393) + (g * 0.769) + (b * 0.189), r);
        binaryData[i + 1] = colorDistance(noise(), (r * 0.349) + (g * 0.686) + (b * 0.168), g);
        binaryData[i + 2] = colorDistance(noise(), (r * 0.272) + (g * 0.534) + (b * 0.131), b);
    }
};