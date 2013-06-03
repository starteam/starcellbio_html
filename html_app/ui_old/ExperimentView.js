//'use strict';

scb.experiment_setup_treatment_display = function(opt_data, opt_sb) {
	var output = opt_sb || new soy.StringBuilder();
	var experiment = opt_data.selected_experiment;
	var template = opt_data.template;
	var cell_treatment = opt_data.cell_treatment;

	var array_height = template.ui_configuration.experiment_setup_resolution_height;
	var screen_duration = template.ui_configuration.experiment_setup_duration;
	var array = [];
	for (var i = 0; i < array_height; i++) {
		array[i] = 0;
	}

	function isAvailable(array, from, to, level) {
		for (var cnt = from; cnt < to; cnt++) {
			if ((array[cnt] & level) == level) {
				return false;
			}
		}
		return true;
	}

	function fillAvailable(array, from, to, level) {
		for (var cnt = from; cnt < to; cnt++) {
			array[cnt] = (array[cnt] | level)
		}
	}

	var width = template.ui_configuration.experiment_setup_column_width || 150;
	var height = template.ui_configuration.experiment_setup_physical_height || 600;
	var treatment_list = cell_treatment.treatment_list.list;
	var treatment_height = 50;
	for (var i in treatment_list ) {
		var treatment = treatment_list[i];
		var top_fraction = treatment.schedule_value / screen_duration;
		var duration_fraction = treatment.duration_value / screen_duration;

		// step 1: fill array
		var from = top_fraction * array_height;
		var to = (top_fraction + duration_fraction) * array_height;
		to = to > from ? to : from + (50 / height * array_height);
		var level = 0;
		while (!isAvailable(array, from, to, Math.pow(2, level)) && level < 4) {
			level++;
		}

		if (level == 4) {
			alert("CAN NOT RENDER WITHOUT OVERLAP");
			level = 1;
		}

		fillAvailable(array, from, to, Math.pow(2, level));

		output.append("<div class='esv_treatment' style='position:absolute;top:" + Math.round(top_fraction * 100) + "%;height:" + treatment_height + "px;left:" + (width * level) + "px'>");
		output.append(scb_ui.experiment_setup_treatment({
			selected_experiment : experiment,
			template : template,
			treatment : treatment,
			cell_treatment_id : cell_treatment.id
		}, output));
		output.append("</div>");

	}

	var element_height = 15;
	var collection_schedule_list = cell_treatment.collection_schedule_list.list;
	for (var i in collection_schedule_list) {
		var collection_schedule = collection_schedule_list[i];
		var top_fraction = collection_schedule.schedule_value / screen_duration;

		// step 1: fill array
		var from = top_fraction * array_height;
		var to = from + (element_height / height * array_height);
		var level = 0;
		while (!isAvailable(array, from, to, Math.pow(2, level)) && level < 4) {
			level++;
		}

		if (level == 4) {
			alert("CAN NOT RENDER WITHOUT OVERLAP");
			level = 1;
		}

		fillAvailable(array, from, to, Math.pow(2, level));

		output.append("<div class='esv_collection' style='position:absolute;top:" + Math.round(top_fraction * 100) + "%;height:" + element_height + "px;left:" + (width * level) + "px'>");
		output.append(scb_ui.experiment_setup_collection({
			collection_schedule : collection_schedule
		}, output));
		output.append("</div>");

	}

	output.append("string");
	return opt_sb ? '' : output.toString();
}

scb.callback_test = function(a, b) {
	console.info('callback test');
	console.info(a);
	console.info(b);
}

scb.ExperimentView = function scb_ExperimentView(state) {
	var self = this;
	var workarea = state.workarea;
	var selected_experiment;

	scb.utils.off_on($(workarea), 'click', '.add_new_experiment_row', function() {

		var template = state.template;

		function add_new_experiment_row_dialog_apply(template_key) {
			console.info("add_new_experiment_row_dialog_apply:" + template_key);
			var protocol_template = template.experiment_templates.treatment_protocol_template[template_key];
			console.info(protocol_template);
			var row = selected_experiment.cell_treatment_list.start({
				cell_line : scb.utils.any_key(state.context.template.cell_lines),
				treatment_list : scb.utils.clone_and_clear(scb.utils.get(protocol_template, ['treatment_list'], {})),
				collection_schedule_list : scb.utils.clone_and_clear(scb.utils.get(protocol_template, ['collection_schedule_list'], {
					list : []
				})),
				stimulation_time : protocol_template.stimulation_time
			});
			var str = scb_ui.experiment_setup_row({
				row : row,
				template : state.template,
				selected_experiment : selected_experiment
			});
			$('ul', $(this).parent()).append($(str));
			self.update_row_handlers(scb.Utils.noop);
			self.update_collection_handlers(workarea, selected_experiment, scb.Utils.noop);

			self.show(scb.Utils.noop);
		}

		var key_count = template.experiment_templates.treatment_protocol_template ? _.keys(template.experiment_templates.treatment_protocol_template).length : 0;
		if (key_count == 0) {
			alert("Model does not have any templates. Please add templates or disable this button.");
		} else if (key_count == 1) {
			add_new_experiment_row_dialog_apply(_.keys(template.experiment_templates.treatment_protocol_template)[0]);
		} else {
			var d = $('.add_new_experiment_rows_dialog:first');
			//d.remove();
			d.html(scb_ui.add_new_experiment_row_dialog({
				template : template,
			}));

			scb.utils.off_on(d, 'click', '.add_new_experiment_row_dialog_apply', function() {
				var template_key = $('input:radio[name=add_new_experiment_row_dialog]:checked', d).attr('value');
				add_new_experiment_row_dialog_apply(template_key);
				console.info('.add_new_experiment_row_dialog_apply:' + template_key);
				d.dialog('destroy');
				$('.add_new_experiment_row_dialog:not(:last)').remove();
			});
			d.dialog({
				close : function() {
					$(this).dialog('destroy');
				}
			});
		}

	});

	scb.utils.off_on($(workarea), 'click', '.add_new_experiment_rows', function() {
		var d = $('.add_new_experiment_rows_dialog:first');
		var template = state.template;
		d.html(scb_ui.add_new_experiment_rows_dialog({
			template : template,
			concentrations : template.drugs[template.drug_template.drug_id].concentrations,
			drug_id : template.drug_template.drug_id,
			concentration_id : null
		}));
		// first pop-up dialog with drug & list of concentrations
		scb.utils.off_on(d, 'change', '.experiment_setup_row_treatment_drug_edit_drug_field', function() {
			var value = $(this).val();
			d.html(scb_ui.add_new_experiment_rows_dialog({
				template : template,
				concentrations : template.drugs[value].concentrations,
				drug_id : value,
				concentration_id : null
			}));
		});
		scb.utils.off_on(d, 'click', '.add_new_experiment_rows_dialog_apply', function() {
			console.info('.add_new_experiment_rows_dialog_apply');
			var drug_id = $('.experiment_setup_row_treatment_drug_edit_drug_field', d).val();
			var concentration_array = _.uniq(_.map($('.add_new_experiment_rows_dialog_concentrations:checkbox:checked'), function(e) {
				return $(e).attr('value');
			}));
			console.info(concentration_array);
			for (var c in concentration_array ) {
				var concentration_id = concentration_array[c];
				var row = selected_experiment.cell_treatment_list.start({});
				var add_treatment = row.treatment_list.start();
				var add_drug = add_treatment.drug_list.list[0];
				add_drug.drug_id = drug_id;
				add_drug.concentration_id = concentration_id;
			}
			self.update_row_handlers(scb.Utils.noop);
			self.update_collection_handlers(workarea, selected_experiment, scb.Utils.noop);
			d.dialog('destroy');
			$('.add_new_experiment_rows_dialog:not(:last)').detach();
			self.show(scb.Utils.noop);
		});
		d.dialog();
	});

	scb.utils.off_on($(workarea), 'click', '.finish_experiment_setup', function() {
		// ok, here we finish it; make an making lysate & populate with data from here (all the data from here)
		if (selected_experiment.cell_treatment_list.length == 0) {
			alert("Please add at least one row with cell lines.");
			return;
		}
		// if(selected_experiment.collection_schedule_list.length == 0) {
		// alert("Please add at least one collection time.");
		// return;
		// }
		selected_experiment.setup_finished = true;
		scb.utils.call_back(state.on_finish);
	});

	scb.utils.off_on($(workarea), 'click', '.new_western_blot', function() {
		scb.utils.call_back(state.on_western_blot);
	});

	if (state.template.ui_configuration.treatments_options_edit != false) {
		scb.utils.tools_hover('.experiment_row_treatment', workarea);
	} else {
		scb.utils.tools_hover_off('.experiment_row_treatment', workarea);
	}
	if (state.template.ui_configuration.experiment_setup_edit_cell_line != false) {
		scb.utils.tools_hover('.experiment_row_cell_line', workarea);
	}
	if (!scb.utils.get(state, ['context', 'template', 'ui_configuration', 'collection_times_fixed'], false)) {
		scb.utils.tools_hover('.collection_schedule_time', workarea);
	}
	scb.utils.off_on($(workarea), 'click', '.delete_experiment_row', function() {
		var r = confirm("Delete?");
		if (r) {
			var row_id = scb.Utils.get_attribute($(this), 'row_id');
			selected_experiment.cell_treatment_list.remove(row_id);
			self.show(scb.Utils.noop);
		}
	});

	scb.utils.off_on($(workarea), 'click', '.duplicate_experiment_row', function() {
		var row_id = scb.Utils.get_attribute($(this), 'row_id');
		selected_experiment.cell_treatment_list.duplicate(row_id);
		self.show(scb.Utils.noop);
	});

	scb.utils.off_on($(workarea), 'click', '.add_experiment_row_treatment', function() {
		var cell_treatment_id = $(this).attr('row_id');
		selected_experiment.cell_treatment_list.selected_id = cell_treatment_id;
		var selected_cell_treatment = selected_experiment.cell_treatment_list.selected;
		var treatment = selected_cell_treatment.treatment_list.start();
		var str = scb_ui.experiment_setup_row_treatment({
			treatment : treatment,
			template : state.template,
			cell_treatment_id : cell_treatment_id,
			selected_experiment : selected_experiment
		});
		$(str).insertBefore($(this));
		$(this).replaceWith(scb_ui.add_experiment_row_treatment({
			row : selected_cell_treatment,
			template : state.template
		}));
		self.update_row_handlers(scb.Utils.noop);
		console.info("Adding row");
	});
	var dialog = $('#experiment_setup_row_treatment_edit', workarea);

	self.show = function(callback) {
		selected_experiment = state.experiment;
		var selected_experiment_id = selected_experiment.id;

		$('.workspace', workarea).html(scb_ui.experiment_setup({
			selected_experiment : selected_experiment,
			template : state.template
		}));

		if (selected_experiment == null) {
			callback();
			return;
		}

		if (selected_experiment.setup_finished != true) {
			self.update_row_handlers(scb.Utils.noop);
			self.update_collection_handlers(workarea, selected_experiment, scb.Utils.noop);
		} else {
			scb.utils.tools_hover_off('.experiment_row_treatment', workarea);
			scb.utils.tools_hover_off('.experiment_row_cell_line', workarea);
			scb.utils.tools_hover_off('.collection_schedule_time', workarea);
		}

		scb.utils.call_back(callback);
	}

	self.hide = function(callback) {
		scb.utils.call_back(callback);
	}

	self.update_row_handlers = function(callback) {
		var workarea = state.workarea;

		$('.experiment_row', workarea).unbind('hover').hover(function() {
			$('.toolbox_experiment_row', $(this)).show();
			var elem = $('.add_experiment_row_treatment', $(this));
			var row_id = elem.attr('row_id');
			if (scb.utils.isDefined(row_id)) {
				console.info(row_id + " " + selected_experiment.cell_treatment_list.get(row_id));

				if (selected_experiment.cell_treatment_list.get(row_id).treatment_list.length != 0) {
					$('.add_experiment_row_treatment', $(this)).show();
				}
			}
			//css('float','right').css('display','inline-block');
		}, function() {
			$('.toolbox_experiment_row', $(this)).hide();
			var elem = $('.add_experiment_row_treatment', $(this));
			var row_id = elem.attr('row_id');
			if (scb.utils.isDefined(row_id)) {
				if (selected_experiment.cell_treatment_list.get(row_id).treatment_list.length != 0) {
					$('.add_experiment_row_treatment', $(this)).hide();
				}
			}
			//css('display','none');
		});

		$('.toolbox_experiment_row', workarea).hide();

		/* EDIT CELL LINE */

		if (state.template.ui_configuration.experiment_setup_edit_cell_line != false) {

			$('.experiment_row_cell_line', workarea).unbind('click').click(function(e) {
				var ui_cellline = this;
				var treatment_id = $(this).parent().attr('row_id');
				selected_experiment.cell_treatment_list.selected_id = treatment_id;
				var selected_treatment = selected_experiment.cell_treatment_list.selected;

				var offset = $(this).position();
				var top = offset.top + 1;
				var left = offset.left + 1;
				var width = $(this).width() + 6;
				var height = $(this).height() + 6;

				var dialog = $('#experiment_setup_row_treatment_edit', workarea);
				dialog.html(scb_ui.experiment_setup_row_cellline_edit({
					treatment : selected_treatment,
					template : state.template
				}));
				dialog.css('position', 'absolute').css('top', top + 'px').css('left', left + 'px').css('width', width + 'px').css('height', height + 'px').show().unbind('click');
				$('#experiment_setup_row_treatment_edit_blackout').show();

				function save_cell_line() {
					var cell_line_id = $('select.experiment_setup_row_cellline_edit_field option:selected', dialog).val();
					selected_treatment.cell_line(cell_line_id);
					close_cell_line();
				}

				function close_cell_line() {
					$(ui_cellline).html(scb_ui.experiment_setup_row_cell_line({
						row : selected_treatment,
						template : state.template,
						selected_experiment : selected_experiment
					}));
					self.update_row_handlers(scb.Utils.noop);
					dialog.hide();
					$('#experiment_setup_row_treatment_edit_blackout').hide();
					$('.experiment_row_treatment_edit', dialog).unbind('click');
					$('#experiment_setup_row_treatment_edit_blackout').unbind('click');
				}


				$('#experiment_setup_row_treatment_edit_blackout').unbind('click').click(function(e) {
					if (this == e.srcElement) {
						save_cell_line();
					}
				});

				$('.cell_line_save', dialog).unbind('click').click(save_cell_line);
				$('.cell_line_cancel', dialog).unbind('click').click(close_cell_line);

				$('.experiment_row_treatment_tools', dialog).show();
				$('.experiment_row_treatment_tools_spacer', dialog).hide();

			});
		}
		/*
		 * Experiment row delete
		 */
		$('.experiment_row_treatment_delete', $('.experiment_rows', workarea)).unbind('click').click(function(e) {
			var ui_treatment = this;
			var treatment_id = scb.utils.get_attribute(this, 'treatment_id');
			var cell_treatment_id = scb.utils.get_attribute(this, 'cell_treatment_id');
			selected_experiment.cell_treatment_list.selected_id = cell_treatment_id;
			var selected_cell_treatment = selected_experiment.cell_treatment_list.selected;
			selected_cell_treatment.treatment_list.remove(treatment_id);
			self.show({});
		});

		if (state.template.ui_configuration.treatments_options_edit != false) {

			$('.experiment_row_treatment', workarea).unbind('click').click(function(e) {
				var ui_treatment = this;
				var treatment_id = $(this).attr('treatment_id');
				var cell_treatment_id = $(this).attr('cell_treatment_id');
				selected_experiment.cell_treatment_list.selected_id = cell_treatment_id;
				var selected_cell_treatment = selected_experiment.cell_treatment_list.selected;
				selected_cell_treatment.treatment_list.selected_id = treatment_id;
				var selected_treatment = selected_cell_treatment.treatment_list.selected;
				// var offset = $(this).position();
				// var top = offset.top + 3;
				// var left = offset.left + 3;
				// var width = $(this).width() + 6;
				// var height = $(this).height() + 6;

				var dialog = $('#experiment_setup_row_treatment_edit', workarea);
				dialog.html(scb_ui.experiment_setup_row_treatment_edit({
					treatment : selected_treatment,
					template : state.template
				}));
				scb.utils.position_div_over($(this), dialog);
				//			dialog.css('position', 'absolute').css('top', top + 'px').css('left', left + 'px').css('width', width + 'px').css('min-height', height + 'px').show().unbind('click');
				$('#experiment_setup_row_treatment_edit_blackout').show();
				$('body').css('overflow', 'hidden');

				function save_treatments() {
					var schedule_text = $('input.experiment_row_treatment_schedule_field').val();
					var duration_text = $('input.experiment_row_treatment_duration_field').val();

					var temp = $('select.experiment_row_treatment_temperature_field option:selected', dialog).val();

					if (state.context.template.ui_configuration.treatment_options_edit_schedule) {
						selected_treatment.schedule = schedule_text;
						selected_treatment.duration = duration_text;
					}
					selected_treatment.temperature = temp;

					var drugs = [];
					$('.experiment_setup_row_treatment_drug_edit', dialog).each(function(e) {
						var ui_drug = $(this);
						var drug_id = $('select.experiment_setup_row_treatment_drug_edit_drug_field option:selected', ui_drug).val();
						var concentration_id = $('select.experiment_setup_row_treatment_drug_edit_concentrations_field option:selected', ui_drug).val();
						drugs.push(new scb.Drug({
							drug_id : drug_id,
							concentration_id : concentration_id
						}, state.context));
					});

					selected_treatment.drug_list.set_list(drugs);
					close_treatments();
				}

				function close_treatments() {
					dialog.hide();
					$('#experiment_setup_row_treatment_edit_blackout').hide();
					$('body').css('overflow', 'auto');

					$(ui_treatment).replaceWith(scb_ui.experiment_setup_row_treatment({
						treatment : selected_treatment,
						template : state.template,
						cell_treatment_id : cell_treatment_id,
						selected_experiment : selected_experiment
					}));
					$('#experiment_setup_row_treatment_edit_blackout').unbind('click');
					$('.experiment_row_treatment_edit', dialog).unbind('click');
					self.update_row_handlers(scb.Utils.noop);
				}


				$('#experiment_setup_row_treatment_edit_blackout').unbind('click').click(function(e) {
					if (this == e.srcElement) {
						save_treatments();
					}
				});

				$('.experiment_row_treatment_edit', dialog).unbind('click').click(save_treatments);
				$('.experiment_row_treatment_delete', dialog).unbind('click').click(close_treatments);

				self.update_treatment_handlers(dialog, scb.Utils.noop);
				$('.experiment_row_treatment_tools', dialog).show();
				$('.experiment_row_treatment_tools_spacer', dialog).hide();

			});
		}
	}

	self.update_collection_handlers = function(workarea, selected_experiment, callback) {

		function edit_collection_time(schedule_id, element) {
			var row_id = scb.Utils.get_attribute($(element), "row_id");
			console.info("Edit schedule id:" + schedule_id + " " + row_id);
			var row = selected_experiment.cell_treatment_list.get(row_id);
			var selected_schedule = row.collection_schedule_list.get(schedule_id);
			var collection_time_edit_str = scb_ui.collection_schedule_time_edit({
				schedule : selected_schedule
			});
			var dialog = $('#experiment_setup_row_treatment_edit', workarea);
			dialog.html(collection_time_edit_str);
			scb.utils.position_div_over($(element), dialog);
			$('#experiment_setup_row_treatment_edit_blackout').show();
			$('body').css('overflow', 'hidden');

			function save_time() {
				var time = $('.experiment_collection_schedule_field', dialog).val();
				selected_schedule.schedule(time);
				// $('.experiment_collection_times', workarea).replaceWith(scb_ui.experiment_collection_times({
				element.parent().replaceWith(scb_ui.experiment_collection_times({
					selected_experiment : row,
					template : state.template
				}));
				self.update_collection_handlers(workarea, selected_experiment, callback);
				close_time();
			}

			function close_time() {
				dialog.hide();
				$('#experiment_setup_row_treatment_edit_blackout').hide().unbind('click');
				$('body').css('overflow', 'auto');
			}


			$('#experiment_setup_row_treatment_edit_blackout').unbind('click').click(function(e) {
				if (this == e.srcElement) {
					save_time();
				}
			});

			$('.experiment_setup_row_treatment_save', dialog).unbind('click').click(save_time);
			$('.experiment_setup_row_treatment_cancel', dialog).unbind('click').click(close_time);
			$('.experiment_row_treatment_tools', dialog).show();
			$('.experiment_row_treatment_tools_spacer', dialog).hide();

		}


		$('.experiment_row_treatment_delete', $('.experiment_collection_times', workarea)).unbind('click').click(function(e) {
			var row_id = scb.Utils.get_attribute($(this), "row_id");
			var row = selected_experiment.cell_treatment_list.get(row_id);
			var schedule_id = scb.Utils.get_attribute($(this), "schedule_id");
			console.info("Delete schedule id:" + schedule_id);
			row.collection_schedule_list.remove(schedule_id);
			$('.experiment_collection_times', workarea).replaceWith(scb_ui.experiment_collection_times({
				selected_experiment : row,
				template : state.template
			}));
			self.update_collection_handlers(workarea, selected_experiment, callback);
		});

		$('.experiment_row_treatment_edit', workarea).unbind('click').click(function(e) {
			var schedule_id = scb.Utils.get_attribute($(this), "schedule_id");
			edit_collection_time(schedule_id, $(this).parent().parent());
		});
		if (!scb.utils.get(state, ['context', 'template', 'ui_configuration', 'collection_times_fixed'], false)) {
			$('.collection_schedule_time', workarea).unbind('click').click(function(e) {
				var schedule_id = $(this).attr("schedule_id");
				edit_collection_time(schedule_id, $(this));
			});
		}
		$('.add_experiment_collection_times', workarea).unbind('click').click(function(e) {
			var row_id = scb.Utils.get_attribute($(this), "row_id");
			var row = selected_experiment.cell_treatment_list.get(row_id);
			var new_schedule = row.collection_schedule_list.start({});
			var container = $(this).parent().replaceWith(scb_ui.experiment_collection_times({
				selected_experiment : row,
				template : state.template
			}));
			self.update_collection_handlers(workarea, selected_experiment, callback);
			var element = $('.collection_schedule_time[schedule_id="' + new_schedule.id + '"]', workarea);
			edit_collection_time(new_schedule.id, element);
		});
		callback();
	}

	self.update_treatment_handlers = function(dialog, callback) {

		$('.add_experiment_row_treatment_drug', dialog).unbind('click').click(function(e) {
			var str = scb_ui.experiment_setup_row_treatment_drug_edit({
				template : state.template,
				concentrations : state.template.drugs[state.template.drug_template.drug_id].concentrations,
				drug_id : state.template.drug_template.drug_id,
				concentration_id : state.template.drug_template.concentration_id
			});
			$(str).insertBefore($(this));
			$(dialog).css('height', parseInt($(dialog).css('height')) + 35)
			self.update_treatment_handlers(dialog, scb.Utils.noop);
		});

		$('.experiment_setup_row_treatment_drug_edit_drug_field', dialog).change(function(e) {
			console.info("CHANGE!");
			var div = $(this).parent();
			var drug_id = $(this).val();
			var concentrations = $('.experiment_setup_row_treatment_drug_edit_concentrations_field', div);
			concentrations.replaceWith(scb_ui.experiment_setup_row_treatment_drug_edit_concentrations({
				template : state.template,
				concentrations : state.template.drugs[drug_id].concentrations
			}));
		});

		$('.experiment_setup_row_treatment_drug_edit_delete', dialog).unbind('click').click(function(e) {
			if ($('.experiment_setup_row_treatment_drug_edit_delete', dialog).parent().length == 1) {
				alert("Treatment has to have at least one drug.");
				return;
			}
			var div = $(this).parent();
			$(div).remove();
		});
		scb.utils.call_back(callback);
	}
}
