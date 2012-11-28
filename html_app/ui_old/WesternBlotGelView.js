scb.WesternBlotGelView = function scb_WesternBlotGelView(state) {
	var self = this;

	var workarea = state.workarea;
	var gel = state.gel;

	var panel = $('.workspace', workarea);

	scb.utils.off_on(panel, 'click', '.western_blot_gel_name_text', function() {
		edit_name(this, gel);
	});

	scb.utils.off_on(panel, 'click', '.delete_western_blot_row', function() {
		var model_id = scb.Utils.get_attribute($(this), 'model_id');
		gel.lanes_list.remove(model_id);
		self.show({});
		console.info("Western Blot Lane - Delete." + model_id);
	});

	scb.utils.off_on(panel, 'click', '.duplicate_western_blot_row', function() {
		var model_id = scb.Utils.get_attribute($(this), 'model_id');
		gel.lanes_list.duplicate(model_id);
		self.show({});
		console.info("Western Blot Lane - Duplicate." + model_id);
	});

	scb.utils.off_on(panel, 'click', '.make_western_blot_lysate', function() {
		if(gel.lanes_list.length > 0) {
			gel.lysate_made = true;
			self.show({});
		} else {
			alert("You have not selected any lysates to prepare. Please add samples to 'List of Lysates to Prepare' by clicking on the buttons above.");
		}
	});

	scb.utils.off_on(panel, 'click', '.run_western_blot_sds_gel', function() {
		gel.sdsgelrun = true;
		self.show({});
	});

	scb.utils.off_on(panel, 'click', '.run_western_blot_develop', function() {
		gel.finished = true;
		self.develop_gel();
		console.info("GEL IS " + gel.finished);
		self.show({});
	});

	scb.utils.off_on(panel, 'click', '.western_blot_gel_lysate_row_treatment', function() {
		var model_id = $(this).attr('model_id');
		if(scb.utils.isDefined(model_id)) {
			console.info("EDIT" + model_id);
		}
	});

	scb.utils.off_on(panel, 'click', '.western_blot_gel_lysate_kind_ip', function() {
		var model_id = scb.Utils.get_attribute('model_id');
		var lane_id = $(this).attr('lane_id');
		var lane = gel.lanes_list.get(lane_id);
		lane.ip = $(this).is(':checked');
		console.info(lane_id + " " + $(this).is(':checked'));
		self.show();
	});

	scb.utils.off_on(panel, 'click', '.select_western_blot_lysate_experiment', function() {
		var experiment_id = $('option:selected', this).attr('model_id');
		var lys_exp = state.assignment.experiments.get(experiment_id);
		$('.western_blot_experiment_list', workarea).html(scb_ui.western_blot_experiment_list({
			gel : gel,
			template : state.context.template,
			experiment : lys_exp,
			experiment_list : state.assignment.experiments
		}));
	});


	scb.utils.off_on(panel, 'click', '.add_western_blot_experiment_element', function() {
		if(gel.lanes_list.length >= 12) {
			alert("Maximum number of lanes visible is 12. Please delete some lanes first.");
			return;
		}
		var experiment_id = $(this).attr('experiment_id');
		var treatment_id = $(this).attr('treatment_id');
		var schedule_id = $(this).attr('schedule_id');
		var exp = state.assignment.experiments.get(experiment_id);
		var treat = exp.cell_treatment_list.get(treatment_id);
		var sch = treat.collection_schedule_list.get(schedule_id);

		gel.lanes_list.start({
			experiment_id : experiment_id,
			cell_treatment_id : treatment_id,
			collection_schedule_id : schedule_id
		});
		self.show({});
		console.info("Western Blot Lane - Add - " + experiment_id + " " + treatment_id + " " + schedule_id);

	});

	scb.utils.off_on(panel, 'click', '.add_western_blot_experiment_element_all', function() {
		var experiment_id = $(this).attr('experiment_id');
		// var treatment_id = $(this).attr('treatment_id');
		// var schedule_id = $(this).attr('schedule_id');
		var exp = state.assignment.experiments.get(experiment_id);
		// var treat = exp.cell_treatment_list.get(treatment_id);
		// var sch = treat.collection_schedule_list.get(schedule_id);
		var exp_list = exp.cell_treatment_list.list;
		for(var t in exp_list ) {
			var treat = exp_list[t];
			var treatment_id = treat.id;
			var sch_list = treat.collection_schedule_list.list
			for(s in sch_list ) {
				var sch = sch_list[s];

				var schedule_id = sch.id;
				gel.lanes_list.start({
					experiment_id : experiment_id,
					cell_treatment_id : treatment_id,
					collection_schedule_id : schedule_id
				});
			}

		}
		if(gel.lanes_list.length > 12) {
			alert("Maximum number of lanes visible is 12. Please delete some lanes before proceeding.");
		}
		self.show({});
		console.info("Western Blot Lane - Add - " + experiment_id + " " + treatment_id + " " + schedule_id);

	});

	scb.utils.off_on(panel, 'change', '.making_lysates_row_lysate_kind', function() {
		var lane_id = $(this).attr('model2_id');
		var id = $(':selected', this).attr('model_id');
		gel.lanes_list.get(lane_id).kind = id;
		self.show({});
	});

	scb.utils.off_on(panel, 'change', '.making_lysates_row_primary_anti_body', function() {
		var lane_id = $(this).attr('model2_id');
		var id = $(':selected', this).attr('model_id');
		gel.lanes_list.get(lane_id).ip_primary_anti_body = id;
		self.show({});
	});

	scb.utils.off_on(panel, 'change', '.making_lysates_row_secondary_anti_body', function() {
		var lane_id = $(this).attr('model2_id');
		var id = $(':selected', this).attr('model_id');
		gel.lanes_list.get(lane_id).ip_secondary_anti_body = id;
		self.show({});
	});

	scb.utils.off_on(panel, 'change', '.making_lysates_gel_primary_anti_body', function() {
		var id = $(':selected', this).attr('model_id');
		gel.primary_anti_body = id;
		self.show({});
	});

	scb.utils.off_on(panel, 'change', '.making_lysates_gel_secondary_anti_body', function() {
		var id = $(':selected', this).attr('model_id');
		gel.secondary_anti_body = id;
		self.show({});
	});

	scb.utils.off_on(panel, 'change', '.set_amount_of_protein_loaded', function() {
		var lane_id = $(this).attr('model_id');
		var value = parseFloat($(this).val());
		gel.lanes_list.get(lane_id).amount_of_protein_loaded = value;
		self.show({});
	});

	scb.utils.off_on(panel, 'click', '.add_western_blot_exposure_time', function(e) {
		var exposure = gel.exposure_list.start({

		});
		$('.western_blot_exposure_times', workarea).replaceWith(scb_ui.western_blot_exposure_times({
			gel : gel,
			template : state.context.template
		}));
		gel.exposure_list.selected_id = exposure.id;
		western_blot_time_edit(exposure, $('div:[schedule_id=' + exposure.id + ']', workarea));
		//		self.display_gels(exposure.id);
		//TODO: Need to activate displayed gel correctly!
	});

	scb.utils.off_on(panel, 'click', '.western_blot_duplicate_gel', function(e) {
		
		var name = prompt("New W.B. Exp name?", gel.name + (gel.name.indexOf('(Copy)') == -1 ? " (Copy)" : ""));
		if(name) {
			var new_gel = state.experiment.western_blot_list.duplicate(gel.id);
			new_gel.name = name;
			self.show({});
		}
	});
	function western_blot_time_edit(selected_schedule, element) {
		var collection_time_edit_str = scb_ui.collection_schedule_time_edit({
			schedule : selected_schedule
		});
		var dialog = $('#experiment_setup_row_treatment_edit', workarea);
		dialog.html(collection_time_edit_str);
		scb.Utils.position_div_over($(element), dialog);
		$('#experiment_setup_row_treatment_edit_blackout').show();

		function save() {
			var time = $('.experiment_collection_schedule_field', dialog).val();
			console.info("save " + time);
			selected_schedule.schedule(time);
			$('.western_blot_exposure_times', workarea).replaceWith(scb_ui.western_blot_exposure_times({
				gel : gel,
				template : state.context.template
			}));
			self.display_gels(selected_schedule.id);
			dialog.hide();
			$('#experiment_setup_row_treatment_edit_blackout').hide();
			$('#experiment_setup_row_treatment_edit_blackout').unbind('click');
		}


		$('.experiment_setup_row_treatment_save', dialog).unbind('click').click(function(e) {
			save();
		});
		$('.experiment_setup_row_treatment_cancel', dialog).unbind('click').click(function(e) {
			dialog.hide();
			$('#experiment_setup_row_treatment_edit_blackout').hide();
			$('#experiment_setup_row_treatment_edit_blackout').unbind('click');

		});
		$('.experiment_row_treatment_tools', dialog).show();
		$('.experiment_row_treatment_tools_spacer', dialog).hide();

		$('#experiment_setup_row_treatment_edit_blackout').unbind('click').click(function(e) {
			if(this == e.srcElement) {
				save();
			}
		});
	}


	scb.utils.off_on(panel, 'click', '.western_blot_time_edit', function(e) {
		var element = $(element).parent().parent();
		var schedule_id = scb.Utils.get_attribute($(this), "schedule_id");
		var selected_schedule = gel.exposure_list.get(schedule_id);
		var collection_time_edit_str = scb_ui.collection_schedule_time_edit({
			schedule : selected_schedule
		});
		var dialog = $('#experiment_setup_row_treatment_edit', workarea);
		dialog.html(collection_time_edit_str);
		scb.Utils.position_div_over($(this).parent().parent(), dialog);
		$('#experiment_setup_row_treatment_edit_blackout').show();

		$('.experiment_setup_row_treatment_save', dialog).unbind('click').click(function(e) {
			var time = $('.experiment_collection_schedule_field', dialog).val();
			console.info("save " + time);
			selected_schedule.schedule(time);
			$('.western_blot_exposure_times', workarea).replaceWith(scb_ui.western_blot_exposure_times({
				gel : gel,
				template : state.context.template
			}));
			self.display_gels();
			dialog.hide();
			$('#experiment_setup_row_treatment_edit_blackout').hide();
		});
		$('.experiment_setup_row_treatment_cancel', dialog).unbind('click').click(function(e) {
			dialog.hide();
			$('#experiment_setup_row_treatment_edit_blackout').hide();

		});
		$('.experiment_row_treatment_tools', dialog).show();
		$('.experiment_row_treatment_tools_spacer', dialog).hide();
	});

	scb.utils.off_on(panel, 'click', '.western_blot_time_delete', function(e) {
		var schedule_id = scb.Utils.get_attribute($(this), "schedule_id");
		console.info("Delete schedule id:" + schedule_id);
		gel.exposure_list.remove(schedule_id);
		$('.western_blot_exposure_times', workarea).replaceWith(scb_ui.western_blot_exposure_times({
			gel : gel,
			template : state.context.template
		}));
		self.display_gels();

	});

	scb.utils.off_on(panel, 'click', '.display_western_blot_gel', function(e) {
		var schedule_id = $(this).attr('schedule_id');
		gel.exposure_list.selected_id = schedule_id;
		self.paint_canvas({
			schedule_id : schedule_id,
			canvas_id : 'western_blot_gel_canvas_' + gel.id
		});
	});

	scb.utils.tools_hover('.western_blot_time', workarea);

	scb.utils.tools_hover('.western_blot_gel_name_text', workarea);

	scb.utils.tools_hover('.western_blot_gel_lysate_row', workarea);

	self.display_gels = function(schedule_id) {
		if(gel.finished) {
			var selector = $('.western_blot_gels', workarea);
			selector.html(scb_ui.western_blot_gel_radio({
				gel : gel,
				template : state.context.template
			})).buttonset();
			if(scb.utils.isDefined(gel.exposure_list.selected_id)) {
				self.paint_canvas({
					schedule_id : gel.exposure_list.selected_id,
					canvas_id : 'western_blot_gel_canvas_' + gel.id
				});
			}
		}
	}

	self.show = function(data) {

		$('.workspace', workarea).html(scb_ui.display_western_blot_gel({
			gel : gel,
			template : state.context.template,
			experiment : state.experiment,
			experiment_list : state.assignment.experiments
		}));

		self.display_gels();
		if(!gel.sdsgelrun) {
			$('.western_blot_gel_lysates_list', workarea).sortable({
				update : function(event, ui) {
					var new_order = [];
					$('li', this).each(function() {
						new_order.push($(this).attr('model_id'));
					});
					gel.lanes_list.reorder(new_order);
				}
			});
		}
		scb.utils.call_back(state.context.repaint_sidebar);

	}
	function edit_name(elem, selected_experiment, data) {
		var offset = $(elem).position();
		var top = offset.top + 0;
		var left = offset.left + 0;
		var width = $(elem).width() + 6;
		var height = $(elem).height() + 6;

		var dialog = $('#experiment_setup_row_treatment_edit', workarea);
		dialog.html(scb_ui.experiment_name_text_edit({
			name : selected_experiment.name
		}));
		dialog.css('position', 'absolute').css('top', top + 'px').css('left', left + 'px').css('width', width + 'px').css('height', height + 'px').show().unbind('click');

		$('#experiment_setup_row_treatment_edit_blackout').show();
		$('.experiment_row_treatment_tools', dialog).show();
		$('.experiment_row_treatment_tools_spacer', dialog).hide();

		$('.experiment_name_text_edit_save').unbind('click').click(function() {
			var name = $('.experiment_name_text_edit', dialog).val();
			selected_experiment.name = name;
			$(dialog).hide();
			$('#experiment_setup_row_treatment_edit_blackout').hide();

			self.show({});
		});

		$('.experiment_name_text_edit_cancel').unbind('click').click(function() {
			$(dialog).hide();
			$('#experiment_setup_row_treatment_edit_blackout').hide();
		});
	}


	self.paint_canvas = function(data) {
		if(gel.canvas_data == null) {
			var cstate = {
				time : 0,
				gel : gel,
				lanes_length : gel.lanes_list.list.length
			}
			context = state.context;

			var c = new scb.components.WesternBlot(cstate, context);
			c.initialize_bias();

			gel.canvas_data = {
				background : c.background,
				lane_yslope : c.lane_yslope,
				lane_xoffset : c.lane_xoffset
			}
		}

		var schedule = gel.exposure_list.get(data['schedule_id']);
		if(schedule != null) {
			if(schedule.canvas_data == null) {
				var cstate = {
					time : schedule.schedule_value,
					gel : gel
				}
				context = state.context;

				var c = new scb.components.WesternBlot(cstate, context);
				c.background = gel.canvas_data.background;
				c.lane_yslope = gel.canvas_data.lane_yslope;
				c.lane_xoffset = gel.canvas_data.lane_xoffset;
				c.build_one_tab(cstate);
				var canvas_id = data['canvas_id'];
				c.paint_blot(canvas_id, c.tab);
				schedule.canvas_data = c.tab;
			} else {
				context = state.context;
				var canvas_id = data['canvas_id'];
				var c = new scb.components.WesternBlot(cstate, context);
				c.paint_blot(canvas_id, schedule.canvas_data);
			}
		}
	}

	self.develop_gel = function() {
		var lanes_list = gel.lanes_list.list;
		var template = state.context.template;
		var model = new scb.components.ModelFactory(template);
		for(var lane_index in lanes_list ) {
			var lane = lanes_list[lane_index];
			model.western_blot.compute(lane, gel);
		}
	}
}