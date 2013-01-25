'use strict';

scb.MakingLysatesView = function scb_MakingLysatesView(data, context) {
	var self = this;
	var making_lysates_list;
	var selected_making_lysate;
	self.show = function(callback) {
		var workarea = data.workarea;
		making_lysates_list = data.session_list.selected_session().making_lysate_list;
		var selected_making_lysate_id = making_lysates_list.selected_id();
		selected_making_lysate = making_lysates_list.selected();

		$('.workspace', workarea).html(scb_ui.making_lysates({
			list : making_lysates_list,
			current : selected_making_lysate,
			template : context.template
		}));

		context.sidebar.show();
		// $('.sidebar_accordian>.accordian_making_lysates',workarea).html(scb_ui.making_lysates_sidebar({
		// list : making_lysates_list,
		// current : selected_making_lysate,
		// template : context.template,
		// }));


		$('.select_making_lysates', workarea).unbind('click').click(function(e) {
			making_lysates_list.select_id($(this).attr('model_id'));
			self.show(scb.Utils.noop);
		});

		$('.finish_making_lysates', workarea).unbind('click').click(function(e) {
			selected_making_lysate.finished = true;
			var western_blot = context.western_blot.new_using_making_lysates(selected_making_lysate_id);
			self.show(scb.Utils.noop);
		});
		if(selected_making_lysate.finished) {
			$('input:checkbox', workarea).attr('disabled', true);
		} else {
			self.update_row_handlers(callback);
		}
		
		$('.making_lysates_text', workarea).unbind('click').click(function() {
			var offset = $(this).position();
			var top = offset.top + 1;
			var left = offset.left + 1;
			var width = $(this).width() + 6;
			var height = $(this).height() + 6;

			var dialog = $('#experiment_setup_row_treatment_edit', workarea);
			dialog.html(scb_ui.experiment_name_text_edit({
				name : selected_experiment.name
			}));
			dialog.css('position', 'absolute').css('top', top + 'px').css('left', left + 'px').css('width', width + 'px').css('height', height + 'px').show().unbind('click');

			$('.edit_tools', dialog).show();
			$('.edit_tools_spacer', dialog).hide();

			$('.experiment_name_text_edit_save').unbind('click').click(function() {
				var name = $('.experiment_name_text_edit', dialog).val();
				selected_experiment.name(name);
				$(dialog).hide();
				self.show(scb.Utils.noop);
			});

			$('.experiment_name_text_edit_cancel').unbind('click').click(function() {
				$(dialog).hide();
			});
		});

	}

	self.new_using_experiment = function(experiment_setup_id) {
		making_lysates_list = data.session_list.selected_session().making_lysate_list;
		making_lysates_list.new_using_experiment(experiment_setup_id);
	}

	self.update_row_handlers = function() {
		var workarea = data.workarea;
		$('.making_lysates_whole_cell_checkbox', workarea).unbind('click').click(function() {
			var v = scb.Utils.isDefined($(this).attr('checked'));
			var row_id = $(this).attr('lysate_kind_id');
			selected_making_lysate.lysate_kind_list.get(row_id).whole_cell = v;
		});

		$('.making_lysates_cytoplasm_checkbox', workarea).unbind('click').click(function() {
			var v = scb.Utils.isDefined($(this).attr('checked'));
			var row_id = $(this).attr('lysate_kind_id');
			selected_making_lysate.lysate_kind_list.get(row_id).cytoplasm = v;
		});

		$('.making_lysates_nuclear_checkbox', workarea).unbind('click').click(function() {
			var v = scb.Utils.isDefined($(this).attr('checked'));
			var row_id = $(this).attr('lysate_kind_id');
			selected_making_lysate.lysate_kind_list.get(row_id).nuclear = v;
		});

		$('.making_lysates_ip_checkbox', workarea).unbind('click').click(function() {
			var v = scb.Utils.isDefined($(this).attr('checked'));
			var row_id = $(this).attr('lysate_kind_id');
			selected_making_lysate.lysate_kind_list.get(row_id).ip = v;
			var div = $('.ip_value_div', $(this).parent());
			if(v) {
				div.show();
			} else {
				div.hide();
			}
		});
		
		$('.making_lysates_row_primary_anti_body',workarea).unbind('click').click(function(){
			var lysate_kind_id = $(this).attr('model2_id');
			var model_id = $('option:selected',$(this)).attr('model_id');
			selected_making_lysate.lysate_kind_list.get(lysate_kind_id).ip_primary_anti_body = model_id;

		});

		$('.making_lysates_row_secondary_anti_body',workarea).unbind('click').click(function(){
			var lysate_kind_id = $(this).attr('model2_id');
			var model_id = $('option:selected',$(this)).attr('model_id');
			selected_making_lysate.lysate_kind_list.get(lysate_kind_id).ip_secondary_anti_body = model_id;
			
			
		});

	}
}