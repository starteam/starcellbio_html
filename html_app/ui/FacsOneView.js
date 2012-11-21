if ( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}

scb.ui.FacsOneView = function scb_ui_FacsOneView(state) {
	var self = this;
	var workarea = state.workarea;
	var experiment = state.experiment;
	var facs_list = experiment.facs_list;
	var facs = state.facs;
	facs.lanes_list.ensure_experiment_lanes_for_experiment(experiment.id);

	self.update_selects = function() {
		$('.facs_select1', workarea).each(function(i, html_select) {
			var jq_select = $(html_select);
			var row = $(html_select).attr('data-row');
			var prep = $(html_select).attr('data-preparation');
			var lane = facs.lanes_list.get(row);
			var preparation = lane.preparation_list.get(prep);
			var treatment = preparation.treatment;
			var index = -1;
			$('option', jq_select).each(function(i, elem) {
				console.info(preparation.treatment + " " + elem);
				if (elem.value == preparation.treatment) {
					index = i;
				}
			});
			console.info(preparation.treatment + " " + index)
			html_select.selectedIndex = index;
		});

		$('.facs_select2', workarea).each(function(i, html_select) {
			var jq_select = $(html_select);
			var row = $(html_select).attr('data-row');
			var prep = $(html_select).attr('data-preparation');
			var tret = $(html_select).attr('data-treatment');
			var lane = facs.lanes_list.get(row);
			var preparation = lane.preparation_list.get(prep);
			var treatment = preparation.treatment;
			var index = -1;
			$('option', jq_select).each(function(i, elem) {
				console.info(preparation.sub_treatment + " " + elem);
				if (elem.value == preparation.sub_treatment) {
					index = i;
				}
			});
			console.info(preparation.sub_treatment + " " + index)
			html_select.selectedIndex = index;
		});

	}

	self.generate_one_graph = function(state) {
		var preparation = state.preparation;
		var lane = state.lane;
		var jq_ui = state.jq_ui;

		if (!preparation.chart_data) {
			function cell_pos_to_dna(i) {
				var g1 = 5. / 16;
				var s = 7. / 16;
				var g2 = 3. / 16;
				var m = 1. / 16;
				if (i < g1) {
					return 1
				};
				if (i < (s + g1)) {
					return 1 + (i - g1) / s;
				}
				return 2;
			}
			
			function prob_dist_fn(dist)
			{
				return jstat.dnorm(dist,0,.08);
			}

			// each .1% of cell cycle has 1000 cells
			var cells = [];
			var total_cells = 0;
			for (var i = 0; i < 1000; i++) {
				cells.push(0);
			}			
			for (var i = 0; i < 1000; i++) {
				var cells_in_cell = 1000;
				cells[i]=cells_in_cell;
				total_cells += cells_in_cell;
			}
			// calculate dna content
			var array = [];
			for (var i = 0; i < 3000; i++) {
				array[i] = 0;
			}
			var normalize = 0;
			for (var i = 0; i < cells.length; i++) {
				var pos = i / cells.length;
				var amt = cells[i] / total_cells;
				var dna = cell_pos_to_dna(pos);
				// round to 3 decimal points in .1% steps
				for( var dist = -.5 ; dist < .5 ; dist += 0.001 )
				{
				var dna_prom = Math.floor((dist+dna) * 1000 );
				var pp = amt*prob_dist_fn(dist);
					array[dna_prom] += pp;
					normalize += pp;					
				}
			}
			var array2 = [];
			for (var i = 0; i < array.length; i++) {
				var p = array[i];
				array2.push([i / 1000, p/normalize]);
			}
			console.info(array);
			preparation.chart_data = [{
				label : 'dna_content',
				data : array2,
			}];
		}
		var options = {};

		$.plot(jq_ui, preparation.chart_data, options);
	};

	self.generate_charts = function() {
		$('.facs_chart', workarea).each(function(e) {
			var lane_id = $(this).attr('data-row_id');
			var preparation_id = $(this).attr('data-preparation_id');
			var lane = facs.lanes_list.get(lane_id);
			var preparation = lane.preparation_list.get(preparation_id);
			self.generate_one_graph({
				lane : lane,
				preparation : preparation,
				jq_ui : $(this)
			});
		});
	}

	self.show = function() {
		$('.workspace', workarea).html(scb_ui.display_facs({
			facs : facs,
			facs_lanes : facs.lanes_list.list,
			template : state.context.template
		}));
		self.update_selects();

		scb.utils.off_on($(workarea), 'click', '.facs_lane_select', function() {
			var id = $(this).attr('id');
			var selected = $(this).attr('checked');
			if (id) {
				var obj = facs.lanes_list.get(id);
				obj.enabled = !obj.enabled;
				self.show();
			}
		});

		scb.utils.off_on($(workarea), 'click', '.facs_kind_radio', function() {
			var id = $(this).attr('id');
			var row_id = $(this).attr('data-row');
			var preparation_id = $(this).attr('data-preparation');

			var lane = facs.lanes_list.get(row_id);
			var value = $(this).attr('value');
			if (scb.utils.isDefined(lane)) {
				var preparation = scb.utils.isDefined(preparation_id) ? lane.preparation_list.get(preparation_id) : null;
				if (scb.utils.isUndefined(preparation)) {
					preparation = lane.preparation_list.start({});
					console.info("START" + preparation.id);
				}
				preparation.kind = value;
				self.show();
			}
		});

		scb.utils.off_on($(workarea), 'change', '.facs_select1', function() {
			var id = $(this).attr('id');
			var row_id = $(this).attr('data-row');
			var preparation_id = $(this).attr('data-preparation');

			var lane = facs.lanes_list.get(row_id);
			var value = $(this).attr('value');
			if (scb.utils.isDefined(lane)) {
				var preparation = scb.utils.isDefined(preparation_id) ? lane.preparation_list.get(preparation_id) : null;
				if (scb.utils.isDefined(preparation)) {
					preparation.treatment = value;
				}
				self.show();
			}
		});

		scb.utils.off_on($(workarea), 'change', '.facs_select2', function() {
			var id = $(this).attr('id');
			var row_id = $(this).attr('data-row');
			var preparation_id = $(this).attr('data-preparation');
			var tret = $(this).attr('data-treatment');

			var lane = facs.lanes_list.get(row_id);
			var value = $(this).attr('value');
			if (scb.utils.isDefined(lane)) {
				var preparation = scb.utils.isDefined(preparation_id) ? lane.preparation_list.get(preparation_id) : null;
				if (scb.utils.isDefined(preparation)) {
					preparation.sub_treatment = value;
				}
				self.show();
			}
		});

		scb.utils.off_on($(workarea), 'click', '.facs_remove_preparataion', function() {
			var id = $(this).attr('id');
			var row_id = $(this).attr('data-row');
			var preparation_id = $(this).attr('data-preparation');

			var lane = facs.lanes_list.get(row_id);
			if (scb.utils.isDefined(lane)) {
				lane.preparation_list.remove(preparation_id);
				self.show();
			}
		});

		scb.Utils.off_on($(workarea), 'click', '.facs_finish_sample_prep', function() {
			facs.prepared = true;
			self.show();
		});

		if (facs.prepared) {
			self.generate_charts();
		}
	}
}