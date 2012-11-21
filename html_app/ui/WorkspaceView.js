scb.ui.WorkspaceView = function scb_WorkspaceView(state) {
	var self = this;
	var workarea = state.workarea;
	var assignment;
	var experiment;
	var show_view = '';
	var show_sub_view = '';

	scb.utils.off_on($(workarea), 'click', '.select_experiment', function() {
		var model_id = $(this).attr('model_id');
		if (model_id == '') {
			model_id = null;
		}
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		// self.show({
		// view : 'master',
		// });
		self.show_sidebar();
		self.show({
			view : 'cultures'
		});

	});

	scb.utils.off_on($(workarea), 'click', '.select_facs', function() {
		var model_id = $(this).attr('model_id');
		if (model_id == '') {
			model_id = null;
		}
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		var sub_model_id = $(this).attr('sub_model_id');

		self.show_sidebar();
		self.show({
			view : 'facs',
			subview : sub_model_id
		});
	});


	scb.utils.off_on($(workarea), 'click', '.select_facs_common', function() {
		var model_id = $(this).attr('model_id');
		if (model_id == '') {
			model_id = null;
		}
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		var sub_model_id = $(this).attr('sub_model_id');

		self.show_sidebar();
		self.show({
			view : 'facs_common',
		});
	});

	scb.utils.off_on($(workarea), 'click', '.new_facs', function() {
		var model_id = $(this).attr('model_id');
		if (model_id == '') {
			model_id = null;
		}
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		var facs = experiment.facs_list.start({});
		self.show_sidebar();
		self.show({
			view : 'facs',
			subview : facs.id
		});
	});
	
	

	scb.utils.off_on($(workarea), 'click', '.add_new_experiment', function() {
		var name = prompt("Experiment name?", assignment.experiments.next_name());
		if (name) {
			var model_id = assignment.experiments.start({}).id;
			assignment.experiments.selected_id = model_id;
			experiment = assignment.experiments.selected;
			experiment.name = name;
			// self.show({
			// view : 'master',
			// });
			self.show_sidebar();
			self.show({
				view : 'cultures'
			});
		}
	});

	scb.utils.off_on($(workarea), 'click', '.new_western_blot_sidebar', function() {
		var model_id = $(this).attr('model_id');
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		var wb = experiment.western_blot_list.start({});
		self.show({
			view : 'western_blot',
			subview : wb.id
		});

	});

	scb.utils.off_on($(workarea), 'click', '.select_experimental_setup', function() {
		var model_id = $(this).attr('model_id');
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		self.show_sidebar();
		self.show({
			view : 'cultures'
		});
	});

	scb.utils.off_on($(workarea), 'click', '.select_western_blot_common', function() {
		var model_id = $(this).attr('model_id');
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		self.show({
			view : 'western_blot_common'
		})
	});

	scb.utils.off_on($(workarea), 'click', '.select_western_blot', function() {
		var model_id = $(this).attr('model_id');
		var sub_model_id = $(this).attr('sub_model_id');
		assignment.experiments.selected_id = model_id;
		experiment = assignment.experiments.selected;
		self.show({
			view : 'western_blot',
			subview : sub_model_id
		})
	});

	scb.utils.off_on($(workarea), 'click', '.remove_western_blot_gel', function() {
		var r = confirm("Delete Western Blot Gel?");
		if (r) {
			var model_id = scb.Utils.get_attribute($(this), 'model_id');
			experiment.western_blot_list.remove(model_id);
			self.show({
				view : 'cultures'
			});
		}
	});

	scb.utils.tools_hover('.experiment_name_text', workarea);

	scb.utils.off_on($(workarea), 'click', '.experiment_name_text', function() {
		edit_experiment_name(this, experiment);
	});

	scb.utils.off_on($(workarea), 'click', '.hide_sidebar', function() {

	});

	self.show_sidebar = function() {
		$('.sidebar', workarea).html(scb_ui.left_sidebar({
			assignment : assignment
		}));
	}

	state.context.repaint_sidebar = self.show_sidebar;

	self.show = function(data) {
		assignment = data.assignment || assignment;
		state.context.template = assignment.template;

		workarea.html(scb_ui.main_frame({
			assignment : assignment
		}));

		data.view = data.view || show_view;
		data.subview = data.subview || show_sub_view;
		if (data.view == 'cultures') {
			if (assignment.experiments.selected_id) {
				show_experimental_setup();
			}
		}
		if (data.view == 'western_blot') {
			var id = data.subview;
			var experiment = assignment.experiments.selected;
			var western_blot_list = experiment.western_blot_list;
			var western_blot = western_blot_list.get(id);
			show_western_blot_gel(western_blot);
		}
		if (data.view == 'western_blot_common') {
			$('.workspace', $(workarea)).html("HERE WILL COME WESTERN BLOT COMPARE FUNCTION");
		}
		if (data.view == 'facs') {
			var id = data.subview;
			var experiment = assignment.experiments.selected;
			var facs_list = experiment.facs_list;
			var facs = facs_list.get(id);
			show_facs(facs);
			//			$('.workspace', $(workarea)).html("HERE WILL COME FACS");
		}
		if (data.view == 'facs_common') {
			show_facs_common(facs);
		}

		show_view = data.view;
		show_sub_view = data.subview;

	}
	function edit_experiment_name(elem, selected_experiment) {
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

	function show_experimental_setup() {
		var experimental_setup = new scb.ExperimentView({
			workarea : state.workarea,
			context : state.context,
			experiment : experiment,
			template : assignment.template,
			on_finish : function() {
				self.show({
					view : 'cultures'
				});
			},
			on_western_blot : function() {
				var wb = experiment.western_blot_list.start({});
				self.show({
					view : 'western_blot',
					subview : wb.id
				});
			},
			on_facs : function() {
				self.show({
					view : 'facs',
				});
			},
			on_microscopy : function() {
				throw "EXCEPTION: on_microscopy NOT YET IMPLEMENTED";
			}
		});
		experimental_setup.show(scb.utils.noop);
	}

	function show_western_blot_gel(western_blot_gel) {
		var western_blot_gel_view = new scb.WesternBlotGelView({
			workarea : state.workarea,
			context : state.context,
			experiment : experiment,
			gel : western_blot_gel,
			assignment : assignment
		});
		western_blot_gel_view.show(scb.utils.noop);
	}

	function show_facs(facs) {
		var facs_view = new scb.ui.FacsOneView({
			workarea : state.workarea,
			context : state.context,
			experiment : experiment,
			assignment : assignment,
			facs: facs,
		});
		facs_view.show(scb.utils.noop);
	}

	function show_facs_common(facs) {
		var facs_view = new scb.ui.FacsView({
			workarea : state.workarea,
			context : state.context,
			experiment : experiment,
			assignment : assignment,
			facs: facs,
		});
		facs_view.show(scb.utils.noop);
	}

}
