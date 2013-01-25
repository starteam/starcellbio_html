'use strict';

scb.Sidebar = function scb_ui_Sidebar(data, context) {
	var self = this;
	this.data = data;

	self.show = function(callback) {
		var workarea = data.workarea;

		// SIDEBAR - display list of sessions
		$('.sidebar_accordian>.accordian_dashboard', workarea).html(scb_ui.dashboard_sidebar({
			session_list : data.session_list.list,
			selected_session_id : data.session_list.selected_session_id()
		}));

		// SIDEBAR - display list of experiment setups
		var experiment_list = data.session_list.selected_session().experiment_setup_list;
		var selected_experiment_id = experiment_list.selected_experiment_id();
		var selected_experiment = experiment_list.selected_experiment();

		$('.sidebar_accordian>.accordian_experiment_setup', workarea).html(scb_ui.experiment_sidebar({
			experiment_list : experiment_list,
			selected_experiment_id : selected_experiment_id
		}));

		$('.create_new_experiment').click(function() {
			// CREATE NEW SESSION
			experiment_list.start({});
			data.sections.experiment.show(scb.Utils.noop);
		});

		$('.select_experiment').click(function(e) {
			experiment_list.select_experiment_id($(this).attr('experiment'));
			data.sections.experiment.show(scb.Utils.noop);
		});
		// SIDEBAR - display list of making lysates
		var making_lysates_list = data.session_list.selected_session().making_lysate_list;
		var selected_making_lysate_id = making_lysates_list.selected_id();
		var selected_making_lysate = making_lysates_list.selected();

		$('.sidebar_accordian>.accordian_making_lysates', workarea).html(scb_ui.making_lysates_sidebar({
			list : making_lysates_list,
			current : selected_making_lysate,
			template : context.template
		}));

		$('.select_making_lysates', workarea).unbind('click').click(function(e) {
			making_lysates_list.select_id($(this).attr('model_id'));
			data.sections.making_lysates.show(scb.Utils.noop);
		});
		// SIDEBAR - display list of western blots
		var western_blot_list = data.session_list.selected_session().western_blot_list;
		var selected_western_blot_id = western_blot_list.selected_id;
		var selected_western_blot = western_blot_list.selected();

		$('.sidebar_accordian>.accordian_western_blots', workarea).html(scb_ui.western_blot_sidebar({
			list : western_blot_list,
			current : selected_western_blot,
			template : context.template
		}));

		$('.select_western_blot', workarea).unbind('click').click(function(e) {
			western_blot_list.selected_id = $(this).attr('model_id');
			data.sections.western_blot.show(scb.Utils.noop);
		});
	}
}