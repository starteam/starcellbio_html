'use strict';

scb.DashboardView = function scb_DashboardView(data, context) {
	var self = this;

	this.show = function(callback) {
		var workarea = data.workarea;
		$('.workspace', workarea).html(scb_ui.dashboard());

		context.sidebar.show();
		
		$('.workspace>.dashboard', workarea).hide().slideDown('fast');

		$('.dashboard>.create_new_session').click(function() {
			// CREATE NEW SESSION
			data.session_list.start(data.templates[0]);			
			self.show(scb.Utils.noop);
		});
		
		$('.select_session').click(function() {
			data.session_list.select_session_id($(this).attr('session'));
			//self.show(scb.Utils.noop);			
			context.invoke( 'show_experiment' ) ;
		});
		callback();
	}

	this.hide = function(callback) {
		var workarea = data.workarea;
		$('.workspace>.dashboard', workarea).slideUp('fast', function() {
			$('.workspace', workarea).html('');
			callback();
		});
	}
}