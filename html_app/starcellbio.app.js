'use strict';
// this is first thing executed (after JQuery, thus I can setup workspaces here...)

var console = console || {
	info : function() {
	}
};
var scb = scb || {};

function starcellbio(jquery_selector_main, master_model) {
	try{
	var workarea = $(jquery_selector_main);
	//TODO: index should use approprate master model, at this stage I'll just user window.master_model as a starting point.
	// master model is JSON creature, context is JavaScript creature; thus master_model needs to be savable, whereas context will not be.
	var init_model = master_model.assignments ? master_model : master_model_data;
	window.master_model = init_model;
	for(var i in init_model.assignments.list ) {
		if( _.keys(init_model.assignments.list[i].template).length == 0 )
		{
			init_model.assignments.list[i].template = MASTER_TEMPLATE;
		}
	}
	scb.Utils.initialize_field(init_model, 'templates', [MASTER_TEMPLATE]);
	scb.Utils.initialize_field(init_model, 'sessions', {});

	var context = new scb.Context();
	context.ui = workarea;
	context.master_model = init_model;

	window.master_context = context;

	scb.Utils.initialize_field(context, 'js_model', {});
	var main_frame = new scb.ui.MainFrame(init_model, context);
	} catch( err ) {
		if( document.documentMode < 9 )
		{
			alert( "Only IE9+, Safari 5+, Chromium and Firefox 10+ are supported, please upgrade your browser ");
		}
		alert( "Unable to run due to an error: " + err ) ;
	}
}

scb.Context = function scb_Context() {
	var self = this;

	self['_event_map'] = {};

	self.register = function(name, fn) {
		scb.Utils.initialize_field(self['_event_map'], name, []);
		self['_event_map'][name].push(fn);
	}

	self.unregister = function(name, fn) {
		scb.Utils.initialize_field(self['_event_map'], name, []);
		console.info("UNREGISTER NOT YET IMPLEMENTED");
	}

	self.invoke = function(name) {
		scb.Utils.initialize_field(self['_event_map'], name, []);
		var array = self['_event_map'][name];
		for(var i in array ) {
			var fn = array[i];
			fn();
		}
	}

	self.fire = self.invoke;
}