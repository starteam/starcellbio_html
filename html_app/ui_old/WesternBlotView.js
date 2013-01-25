'use strict';

scb.WesternBlotView = function scb_WesternBlotView(data, context) {
	var self = this;

	var western_blot_list;
	var selected_western_blot;
	self.show = function(callback) {
		var workarea = data.workarea;
		western_blot_list = data.session_list.selected_session().western_blot_list;
		var selected_western_blot_id = western_blot_list.selected_id;
		selected_western_blot = western_blot_list.selected();

		$('.workspace', workarea).html(scb_ui.western_blot({
			current : selected_western_blot,
			template : context.template,
			making_lysates_list : context.js_model.current_session.making_lysate_list
		}));

		$('.western_blot_add_lysate_button', workarea).unbind('click').click(function(e) {
			var kind = $(this).attr('kind');
			var lysate_kind_id = $(this).attr('lysate_kind_id');
			var making_lysate_id = $(this).attr('making_lysate_id');
			selected_western_blot.lanes_list.start({
				making_lysate_id : making_lysate_id,
				lysate_kind_id : lysate_kind_id,
				kind : kind
			});
			console.info(kind + " " + lysate_kind_id + " " + making_lysate_id);
			self.show(scb.Utils.noop);
		});

		$('.delete_western_blot_lane', workarea).unbind('click').click(function(e) {
			var model_id = $(this).attr('model_id');
			selected_western_blot.lanes_list.remove(model_id);
			self.show(scb.Utils.noop);
		});

		$('.western_blot_display_lysate_select', workarea).unbind('click').click(function(e) {
			var lysate_id = $('select.western_blot_display_lysate_select option:selected').attr('lysate_id');
			selected_western_blot.display_lysates_id = lysate_id;
			self.show(scb.Utils.noop);
		});

		$('.western_blot_run_sds_button', workarea).unbind('click').click(function(e) {
			selected_western_blot.sdsgelrun = true;
			self.show(scb.Utils.noop);
		});
		context.sidebar.show();

		$('.western_blot_develop_button', workarea).unbind('click').click(function(e) {
			selected_western_blot.finished = true;
			self.show(scb.Utils.noop);
		});
		
		$('.add_western_blot_exposure_time', workarea).unbind('click').click(function(e) {
			selected_western_blot.exposure_list.start({});
			$('.western_blot_exposure_times', workarea).replaceWith(scb_ui.western_blot_exposure_times({
				gel : selected_western_blot,
				template : state.template
			}));
			self.update_collection_handlers(workarea, selected_experiment, callback);
		});

		scb.utils.call_back(callback);

//		self.update_collection_handlers(workarea, selected_western_blot, scb.Utils.noop);
	}

	self.update_collection_handlers = function(workarea, selected_experiment, callback) {
		scb.Utils.tools_hover($('.collection_schedule_time', workarea));

		$('.experiment_row_treatment_edit', workarea).unbind('click').click(function(e) {
			var schedule_id = scb.Utils.get_attribute($(this), "schedule_id");
			console.info("Edit schedule id:" + schedule_id);
			var selected_schedule = selected_experiment.exposure_list.get(schedule_id);
			var collection_time_edit_str = scb_ui.collection_schedule_time_edit({
				schedule : selected_schedule
			});
			var dialog = $('#dialog_edit', workarea);
			dialog.html(collection_time_edit_str);
			scb.Utils.position_div_over($(this).parent().parent(), dialog);
			$('.experiment_setup_row_treatment_save', dialog).unbind('click').click(function(e) {
				var time = $('.experiment_collection_schedule_field', dialog).val();
				console.info("save " + time);
				selected_schedule.schedule(time);
				$('.experiment_collection_times', workarea).replaceWith(scb_ui.western_blot_exposure({
					current : selected_experiment,
					template : context.template
				}));
				self.update_collection_handlers(workarea, selected_experiment, callback);
				dialog.hide();
			});
			$('.experiment_setup_row_treatment_cancel', dialog).unbind('click').click(function(e) {
				dialog.hide();

			});
			$('.experiment_row_treatment_tools', dialog).show();
			$('.experiment_row_treatment_tools_spacer', dialog).hide();

		});

		$('.experiment_row_treatment_delete', workarea).unbind('click').click(function(e) {
			var schedule_id = scb.Utils.get_attribute($(this), "schedule_id");
			console.info("Delete schedule id:" + schedule_id);
			selected_experiment.exposure_list.remove(schedule_id);
			$('.experiment_collection_times', workarea).replaceWith(scb_ui.western_blot_exposure({
				current : selected_experiment,
				template : context.template
			}));
			self.update_collection_handlers(workarea, selected_experiment, callback);
		});

		$('.add_schedule', workarea).unbind('click').click(function(e) {
			selected_experiment.exposure_list.start({});
			$('.experiment_collection_times', workarea).replaceWith(scb_ui.western_blot_exposure({
				current : selected_experiment,
				template : context.template
			}));
			self.update_collection_handlers(workarea, selected_experiment, callback);
		});
		callback();
	}

	self.new_using_making_lysates = function(making_lysates_id) {
		western_blot_list = data.session_list.selected_session().western_blot_list;
		western_blot_list.new_using_making_lysates(making_lysates_id);
	}
}