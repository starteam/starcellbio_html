scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.FacsView = scb.ui.static.FacsView || {};
scb.ui.static.FacsView.TOTAL_TABS =  4;
scb.ui.static.FacsView.TOTAL_STEPS =  5;
scb.ui.static.FacsView.TOTAL_SCROLL =  5;




scb.ui.static.FacsView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var facs_id = $(element).attr('facs_id');
    var facs_lane_id = $(element).attr('facs_lane_id');


    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        facs_id: facs_id,
        facs_lane_id: facs_lane_id,
        view: 'facs',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}

scb.ui.static.FacsView.scb_f_facs_sample_active = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
	
    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.facs.is_cell_treatment_enabled[cell_treatment_id] = val;
    $('.scb_f_facs_select_lysate_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this);
    })
    
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_f_facs_select_lysate_type = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var sample_kind = $(element).attr('value');
    if (sample_kind == '') {
        return;
    }
    var lane_id = $(element).attr('lane_id');
    if (lane_id == '') {
        var cell_treatment_id = $(element).attr('cell_treatment_id');
        var lane = parsed.facs.lanes_list.start({
            kind: sample_kind,
            cell_treatment_id: cell_treatment_id,
            experiment_id: parsed.experiment.id
        });
        $(element).attr('lane_id', lane.id);
        $(element).attr('lane_kind', 'existing');
        if (event) {
            scb.ui.static.MainFrame.refresh();
        }
    }
    else {
        parsed.facs.lanes_list.get(lane_id).kind = sample_kind;
    }

}

scb.ui.static.FacsView.scb_f_facs_prepare_lysates = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var rows_state = parsed.facs.rows_state();
    if (rows_state && rows_state.valid < 1) {
        	$('html').css('overflow', 'hidden');

    	$('body').prepend(scb_experiment_setup.general_error_overlay());


    	$.jqDialog.alert("Please select at least 1 sample to prepare.", function() {	
    	$('html').css('overflow', 'visible');
					$('.error_overlay').remove();/* callback function for 'OK' button*/ });
    	$('.jqDialog_header').remove();
		$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
		$('#jqDialog_box').attr('role', 'alertdialog');
    }
    else{
    	parsed.facs.sample_prepared = true;
    	scb.ui.static.MainFrame.refresh();
    }
}


scb.ui.static.FacsView.scb_f_facs_sample_active_all = function (element, event) {
    $('.scb_f_facs_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', 'checked');
        scb.ui.static.FacsView.scb_f_facs_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.scb_f_facs_sample_inactive_all = function (element) {
	$('.scb_f_facs_sample_active').each(function(e){
		var element = this;
		$(element).attr('checked', false);
		scb.ui.static.FacsView.scb_f_facs_sample_active(element);
	});    
    scb.ui.static.MainFrame.refresh();

}


scb.ui.static.FacsView.scb_f_facs_run_samples = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.samples_finished = true;
    parsed.facs.lane_selected = scb.utils.get(parsed.facs.lanes_list.list, [0, 'id']);
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if (parsed.facs.samples_finished) {
        $('li', $(element).parent()).removeClass('scb_s_facs_sample_selected');
        $(element).addClass('scb_s_facs_sample_selected');
        parsed.facs.lane_selected = parsed.facs_lane.id;
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.FacsView.scb_s_facs_selected = function (element) {
    
    var parsed = scb.ui.static.FacsView.parse(element);
    parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if($(element).text().length <=1){
    	 scb.ui.static.MainFrame.refresh();
    }
    else{
    parsed.facs.name = $(element).val();
    }
}

scb.ui.static.FacsView.scb_f_facs_tools_start_analysis = function (element, event) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.facs.show_analysis = true;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_s_facs_single_range_button= function(element, event){
	var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.facs.sample_analysis =  !parsed.facs.sample_analysis;
    scb.ui.static.MainFrame.refresh();
};

scb.ui.static.FacsView.scb_s_facs_double_range_button= function(element, event){
	var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.facs.sample_analysis =  !parsed.facs.sample_analysis;
    scb.ui.static.MainFrame.refresh();
};


// scb.ui.static.FacsView.scb_s_facs_tools_instructions_show = function (show) {
//     var jqDiv = $('.scb_s_facs_tools_instructions_followup');
//     scb.ui.static.FacsView.scb_s_facs_tools_instructions_show_state = show;
//     if (show)  jqDiv.slideDown(); else  jqDiv.slideUp();
//     
//         $('.scb_s_facs_tools_instructions_followup_toggle').html('?');
//         $('.scb_s_facs_tools_instructions_followup_toggle').blur();
// }
// 
// //called status because state is already used, maintains open/close state of instructions
// scb.ui.static.FacsView.scb_s_facs_tools_instructions_show_status = function (show) {
//     var jqDiv = $('.scb_s_facs_tools_instructions_followup');
//     scb.ui.static.FacsView.scb_s_facs_tools_instructions_show_state = show;
//     if (show)  jqDiv.show(); else  jqDiv.hide();
//     
//     
//         $('.scb_s_facs_tools_instructions_followup_toggle').html('?');
//         $('.scb_s_facs_tools_instructions_followup_toggle').blur();
// }


scb.ui.static.FacsView.scb_f_facs_note_close_button= function (element) {
		var parsed = scb.ui.static.FacsView.parse(element);
	    var note = $(element).attr('note');
    	note = '.' +note;	
		$(note).slideUp('400', function(){
			parsed.facs.instructions_show_state  = $('.scb_s_facs_tools_instructions_followup').is(":visible");
			parsed.facs.samples_show_state  = $('.scb_s_facs_tools_samples_followup').is(":visible");
			scb.ui.static.MainFrame.refresh();
		});
		
}

scb.ui.static.FacsView.scb_f_facs_tools_toggle = function (element) {
	var parsed = scb.ui.static.FacsView.parse(element);
	var note = $(element).attr('note');
    note = '.' +note;	
	$(note).slideDown('400', function(){
		parsed.facs.instructions_show_state  = $('.scb_s_facs_tools_instructions_followup').is(":visible");
		parsed.facs.samples_show_state  = $('.scb_s_facs_tools_samples_followup').is(":visible");
		scb.ui.static.MainFrame.refresh();
	});
	
}

scb.ui.static.FacsView.scb_f_facs_analyze_remove_point = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var from = parseFloat($(element).attr('from'));
    var to = parseFloat($(element).attr('to'));
    parsed.facs_lane.canvas_metadata_analysis.points = parsed.facs_lane.canvas_metadata_analysis.points ? parsed.facs_lane.canvas_metadata_analysis.points : [];
    var element = _.find(parsed.facs_lane.canvas_metadata_analysis.points, function (e) {
        return e.from == from && e.to == to;
    });
    parsed.facs_lane.canvas_metadata_analysis.points = _.without(parsed.facs_lane.canvas_metadata_analysis.points, element);
    scb.ui.static.FacsView.reevaluate_metadata(parsed);
    parsed.facs.apply_dna_analysis_to_all = false;
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.FacsView.scb_f_facs_apply_to_all = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.facs.apply_dna_analysis_to_all = $(element).attr('checked') == 'checked';
    if (parsed.facs.apply_dna_analysis_to_all) {
        _.each(parsed.facs.lanes_list.list, function (facs_lane) {
            facs_lane.canvas_metadata_analysis.points = JSON.parse(JSON.stringify(parsed.facs_lane.canvas_metadata_analysis.points));

            scb.ui.static.FacsView.evaluate_chart({
                facs: parsed.facs,
                facs_lane: facs_lane,
                context: parsed.context
            });
        });
        scb.ui.static.MainFrame.refresh();
    }

}

scb.ui.static.FacsView.scb_s_facs_left_facs = function(element, event){
	var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
	parsed.facs.parent.start_tabs_index = parsed.facs.parent.start_tabs_index -1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.FacsView.scb_s_facs_right_facs = function(element, event){
	var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
	parsed.facs.parent.start_tabs_index = parsed.facs.parent.start_tabs_index +1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.FacsView.scb_s_facs_add_facs= function(element, event){
	var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
	if(parsed.facs.parent.list.length==scb.ui.static.FacsView.TOTAL_TABS){
		parsed.facs.parent.start_tabs_index = 1;
	}
	else if (parsed.facs.parent.list.length >scb.ui.static.FacsView.TOTAL_TABS)
		parsed.facs.parent.start_tabs_index = parsed.facs.parent.length-(scb.ui.static.FacsView.TOTAL_TABS-1);
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.FacsView.scb_f_facs_remove = function (element) {
    var parsed = scb.ui.static.FacsView.parse(element);
	parsed.experiment.last_scroll=document.body.scrollTop;
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
	
	var id_list = [];
 	for( var x=0; x < parsed.experiment.facs_list.list.length; x++){id_list.push(parsed.experiment.facs_list.list[x].id);}
    parsed.state.index= id_list.indexOf(parsed.facs.id);
	
	
    parsed.experiment.facs_list.remove(parsed.facs.id);
    
       
    if(parsed.state.index == parsed.experiment.facs_list.list.length){
    	parsed.state.index = parsed.state.index -1 ;
    }
    //fix tab indexing for display
    if(parsed.state.index > parsed.experiment.facs_list.list.length -scb.ui.static.FacsView.TOTAL_TABS) {
    	
    	if((parsed.experiment.facs_list.list.length == scb.ui.static.FacsView.TOTAL_TABS+1 || parsed.experiment.facs_list.list.length == scb.ui.static.FacsView.TOTAL_TABS+2) && parsed.experiment.facs_list.start_tabs_index <=1)
    		parsed.experiment.facs_list.start_tabs_index = parsed.experiment.facs_list.start_tabs_index+1;
    	else parsed.experiment.facs_list.start_tabs_index = parsed.experiment.facs_list.start_tabs_index-1;
    }
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);


}

scb.ui.static.FacsView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_sample_active', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_sample_active_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_active_all(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_sample_inactive_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_sample_inactive_all(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_prepare_lysates', function (e) {
        scb.ui.static.FacsView.scb_f_facs_prepare_lysates(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_single_range_button', function (e) {
        scb.ui.static.FacsView.scb_s_facs_single_range_button(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_double_range_button', function (e) {
        scb.ui.static.FacsView.scb_s_facs_double_range_button(this, e);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_facs_select_lysate_type', function (e) {
        scb.ui.static.FacsView.scb_f_facs_select_lysate_type(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_run_samples', function (e) {
        scb.ui.static.FacsView.scb_f_facs_run_samples(this, e);
    });
   
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_run_samples_short', function (e) {
        scb.ui.static.FacsView.scb_f_facs_run_samples(this, e);
    });
	scb.utils.off_on(workarea, 'click', '.scb_f_facs_remove', function (e) {
        scb.ui.static.FacsView.scb_f_facs_remove(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_choose_samples_order_list>li', function (e) {
        scb.ui.static.FacsView.scb_s_facs_choose_samples_order_list_select(this, e);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_facs_selected', function (e) {
    	$('.scb_s_facs_selected').text($('.scb_s_facs_selected').attr('value'));
        scb.ui.static.FacsView.scb_s_facs_selected(this);
    });    
    scb.utils.off_on(workarea, 'keydown', '.scb_s_facs_selected', function (e) {
    	if ($('.scb_s_facs_selected').text().length<= 10) {
    	}
    	else{    		 
    		$('.scb_s_facs_selected').text();
    		e.preventDefault();
    		 this.textContent= this.textContent.substring(0, this.textContent.length-1)
    		 return false;    		 
    	}	
    });    
	scb.utils.off_on(workarea, 'click', '.scb_s_facs_left_facs', function (e) {
        scb.ui.static.FacsView.scb_s_facs_left_facs(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_right_facs', function (e) {
        scb.ui.static.FacsView.scb_s_facs_right_facs(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_facs_add_facs', function (e, ui) {
        scb.ui.static.FacsView.scb_s_facs_add_facs(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_tools_start_analysis', function (e) {
        scb.ui.static.FacsView.scb_f_facs_tools_start_analysis(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_tools_toggle', function (e) {
        scb.ui.static.FacsView.scb_f_facs_tools_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_note_close_button', function (e) {
    	scb.ui.static.FacsView.scb_f_facs_note_close_button(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_analyze_remove_point', function (e) {
        scb.ui.static.FacsView.scb_f_facs_analyze_remove_point(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_facs_apply_to_all', function (e) {
        scb.ui.static.FacsView.scb_f_facs_apply_to_all(this);
    });
	scb.utils.off_on(workarea, 'mouseup', document, function(e,ui){
    	var container = $(".scb_f_controls_note");
		container.slideUp(); // hide
    });
    scb.utils.off_on(workarea, 'click','.scb_f_controls_note', function(e,ui){
    	e.stopPropagation();
    });
    scb.utils.off_on(workarea, 'click','.scb_f_info_icon', function(e,ui){
    	e.stopPropagation();
    	var note = $(this).attr('note');
    	note = '.' +note;
    	if($(note).is(":visible"))
    		$(note).slideUp();
    	else $(note).slideDown();
    });
}

scb.ui.static.FacsView.reevaluate_metadata = function (state) {
    var facs_lane = state.facs_lane;
    facs_lane.canvas_metadata_analysis.points = facs_lane.canvas_metadata_analysis.points ? facs_lane.canvas_metadata_analysis.points : [];
    facs_lane.canvas_metadata_analysis.ranges = [];
    var ranges = facs_lane.canvas_metadata_analysis.ranges;
    var points = facs_lane.canvas_metadata_analysis.points;
    var raw_data = scb.utils.get(facs_lane, ['canvas_metadata_analysis', 'raw_data', 0], []);
    var data = [];
    points = points.sort(function (a, b) {
        return a.from > b.from;
    });

    var colors = [
        "#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed", 'orange' , 'black' , 'green' , 'violet' , 'purple' , 'pink'
    ];

    var total = 0;
    _.each(raw_data.data, function (e) {
        total += e[1];
    });

    function range(pts) {
        var carray = _.difference(colors, _.pluck(points, 'c'));
        var c = carray.length > 0 ? carray[0] : colors[0];
        var from = pts.from;
        var to = pts.to;
        var horizontal = pts.y;
        pts.c = pts.c || c;
        var range = {
            from: pts.from,
            to: pts.to,
            color: pts.c,
            percentage: 0
        };
        var series = [];
        var percentage = 0;
        _.each(raw_data.data, function (element) {
            var x = element[0];
            if (x >= from && x <= to) {
                series.push(element);
                percentage += element[1];
            }
        });
        range.percentage = Math.round(percentage / total * 100);
        //data.push({data: series, color: pts.c });
        data.push({data: [
            [from, horizontal],
            [from, horizontal+5],
            [from, horizontal+2.5],
            [to - 1, horizontal+2.5],
            [to - 1, horizontal+5],
            [to - 1, horizontal]
        ], grid: {show:false},
        	xaxis: {tickSize: 5},
        	color: pts.c,
            lines: {show: true, fill: false, steps: true, lineWidth: 1},
        });
        ranges.push(range);
    }

    for (var i in points) {
        var pts = points[i];
        if (pts.from > pts.to) {
            var tmp = pts.from;
            pts.from = pts.to;
            pts.to = tmp;
        }
        range(pts);
    }
    data.push({data: raw_data.data, grid: {show:false}, xaxis: {tickSize: 5}, lines: {show: true, fill: false}});
    if (facs_lane.canvas_metadata) {
        facs_lane.canvas_metadata.data = data;
    }
}

scb.ui.static.FacsView.evaluate_chart = function (state) {
    if (!state.facs_lane.canvas_metadata) {
        var canvas_metadata = {
            data: [
                { label: "Foo", data: [
                    [10, Math.random() * 1],
                    [17, Math.random() * -14],
                    [30, Math.random() * 5]
                ] },
                { label: "Bar", data: [
                    [11, Math.random() * 13],
                    [19, Math.random() * 11],
                    [30, Math.random() * -7]
                ] }
            ],
            grid: {show:false},
            xaxis: {tickSize: 5},
            options: {
                series: {
                    lines: { show: true },
                    points: { show: true }
                }
            }
        }
        var model = new scb.components.ModelFactory(state.context.template);
        model.facs.compute(state);

        state.facs_lane.canvas_metadata = state.data ? state.data : canvas_metadata;
        state.facs_lane.canvas_metadata_analysis.raw_data = state.facs_lane.canvas_metadata.data;
    }
    state.facs_lane.canvas_metadata.options.hooks = { bindEvents: [ function (plot, eventHolder) {
        var xaxes = plot.getXAxes()[0];
        var yaxes = plot.getYAxes()[0];
        var sensitivity = 4;

        var click = function (e) {
            var srcElement = e.srcElement || e.target;
            var px = xaxes.c2p(e.clientX - srcElement.getBoundingClientRect().left - plot.pointOffset({x: 0, y: 0}).left);
            var py = yaxes.c2p(e.offsetY);
            var fromy = py;
            px = Math.round(px);
            if (state.facs.sample_analysis) {
                console.info("Click on: " + px + " " + py);
                var point = Math.round(px);
                if (!isNaN(from)) {
                    var to = px;
                    to = to > 0 ? to : 0;
                    if (point_to_edit) {
                        if (Math.abs(point_to_edit.from - from) < sensitivity) {
                            point_to_edit.from = to;
                        } else {
                            point_to_edit.to = to;
                        }
                    }
                    else {
                        state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to), y: Math.round(fromy)});
                    }
                    point_to_edit = null;
                    scb.ui.static.FacsView.reevaluate_metadata(state);
                    state.facs.apply_dna_analysis_to_all = false;
                    from = NaN;
                    $('.scb_s_facs_chart_helper').text('');

                    scb.ui.static.MainFrame.refresh();

                }
            }
        };
        var match = function (px, py) {
            var point = _.find(state.facs_lane.canvas_metadata_analysis.points, function (e) {
                var overlap = (Math.abs(px - e.from) < 4 || Math.abs(px - e.to) < sensitivity) && (Math.abs(py - e.y) < 3);
                return overlap;
            });
            return point;
        }
        var from = NaN;
        var fromy = NaN;
        var from_point = null;
        var point_to_edit = null;
        var move = function (e) {
            var srcElement = e.srcElement || e.target;
            var px = xaxes.c2p(e.clientX - srcElement.getBoundingClientRect().left - plot.pointOffset({x: 0, y: 0}).left);
            var py = yaxes.c2p(e.offsetY);
            px = Math.round(px);
            var button = scb.utils.isDefined(e.buttons) ? e.buttons : e.which;
            console.info(px + " " + from + " " + point_to_edit + " cb=" + button + " b=" + e.button + " bs=" + e.buttons);
            if (state.facs.sample_analysis) {
                window._dump_event = e;
                if (button == 1 && isNaN(from)) {
                    console.info("SET FROM " + px);
                    from = px;
                    from = from > 0 ? from : 0;
                    fromy= py;
                    from_point = {top: (e.clientY - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().left) };

                    var point = match(px, py);
                    point_to_edit = point;
                }
                if (button == 1 && !isNaN(from)) {
                    var to_point = {
                        top: (e.clientY - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().top),
                        left: (e.clientX - $('.scb_s_facs_chart_wrapper')[0].getBoundingClientRect().left)
                    };
                    var left = from_point.left > to_point.left;
                    var styles = {
                        position: 'absolute',
                        top: from_point.top+'px',
                        left: Math.min(from_point.left, to_point.left) + "px",
                        height: '5px',
                        color:point_to_edit? point_to_edit.c : '#808080',
                        background: (point_to_edit ? ( left ? point_to_edit.c : 'white' ) : '#a0a0a0'),
                        width: Math.abs(from_point.left - to_point.left) + "px",
                        'border-left': (point_to_edit ? ( left ? '2px solid ' + point_to_edit.c : '1px solid white' ) : '2px dotted #a0a0a0'),
                        'border-right': (point_to_edit ? ( !left ? '2px solid ' + point_to_edit.c : '1px solid white') : '2px dotted #a0a0a0'),
                        'vertical-align': 'center',
                    }
                    console.info(styles);
                    $('.scb_s_facs_chart_helper').css(styles);
                    if (point_to_edit) {
                        console.info("ew" + px);
                        $(plot.getPlaceholder()).css('cursor', 'ew-resize');
                    }
                    else {
                        console.info("pt" + px);
                        $(plot.getPlaceholder()).css('cursor', 'pointer');
                    }
                }
                if (button == 0 && isNaN(from)) {
                    // is it over line?
                    var point = match(px, py);
                    if (point) {
                        console.info("ew" + px);
                        $(plot.getPlaceholder()).css('cursor', 'ew-resize');
                    }
                    else {
                        console.info("pt" + px);
                        $(plot.getPlaceholder()).css('cursor', 'pointer');
                    }
                    console.info(point);
                }
                if (button == 0 && !isNaN(from)) {
                    // is it over line?
                    console.info("SET TO " + px);
                    var to = px;
                    to = to > 0 ? to : 0;
                    state.facs_lane.canvas_metadata_analysis.points.push({from: Math.round(from), to: Math.round(to), y: Math.round(fromy)});
                    scb.ui.static.FacsView.reevaluate_metadata(state);
                    state.facs.apply_dna_analysis_to_all = false;
                    from = NaN;
                    scb.ui.static.MainFrame.refresh();
                }
            }
        }
        eventHolder.click(click);
        eventHolder.mousemove(move);

    }
    ]
    };
    scb.ui.static.FacsView.reevaluate_metadata(state);
    if (state.chart) {
    	//Canvas is drawn here
        $.plot(state.chart, state.facs_lane.canvas_metadata.data, state.facs_lane.canvas_metadata.options);
    }
};

scb.ui.static.FacsView.charts = function (workarea) {
    $('.scb_s_facs_chart').each(function () {

        var chart = $(this);
        var parsed = scb.ui.static.FacsView.parse(this);
        parsed.experiment.last_scroll=document.body.scrollTop;

        parsed.chart = chart;
        scb.ui.static.FacsView.evaluate_chart(parsed);
    })
}
scb.ui.FacsView = function scb_ui_FacsView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = gstate.workarea;
        var template = state.assignment.template;
        var rows_state = state.facs.rows_state();

        var can_prepare_lysate = rows_state.valid > 0;

        var kind = 'sample_prep';
        if (state.facs.sample_prepared) {
            kind = 'analyze';
            if (state.facs && state.facs.selected_lane) {
                scb.ui.static.FacsView.reevaluate_metadata({facs: state.facs, facs_lane: state.facs.selected_lane});
            }
        }
        
        state.experiment.last_technique_view = 'facs';
        var scroll_num = 0;
        if($('.scb_s_facs_samples_table').length ==0)
        	scroll_num=scb.ui.static.FacsView.TOTAL_SCROLL;
        else
        	scroll_num = $('.scb_s_facs_samples_table')[0].scrollTop;
        	
        workarea.html(scb_facs.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            context: gstate.context,
            facs: state.facs,
            t: template,
            rows: rows_state.rows,
            rows_valid: rows_state.valid,
            kind: kind,
			last_step: state.experiment.last_step,
			prev_step: state.experiment.prev_step,
            kinds: template.facs_kinds,
            can_prepare_lysate: can_prepare_lysate
        }));

        
        if (kind == 'sample_prep'){
        	$('.scb_s_facs_samples_table')[0].scrollTop = scroll_num;
        }
        state.experiment.prev_step=scb.ui.static.FacsView.TOTAL_STEPS;
        if(state.experiment.last_step >= scb.ui.static.FacsView.TOTAL_STEPS)
			state.experiment.last_step = 6;
		state.experiment.last_technique = 'FLOW CYTOMETRY';
		state.experiment.last_id = state.facs.id;
		state.experiment.last_param = 'facs_id';



        document.title = "FACS - StarCellBio";
		
		state.facs.parent.selected_id = state.facs.id;
		state.experiment.last_view = 'facs';
    	state.experiment.last_technique_view = state.experiment.last_view;
		if(state.facs.parent.start_tabs_index <= 0){
			state.facs.parent.start_tabs_index = 0;
			$('.scb_s_facs_left_facs').prop('disabled', true);
			$('.scb_s_facs_right_facs').prop('disabled', false);
		}
		else $('.scb_s_facs_left_facs').prop('disabled', false);
		
		if(state.facs.parent.start_tabs_index + scb.ui.static.FacsView.TOTAL_TABS-1 ==state.facs.parent.list.length-1){
			$('.scb_s_facs_right_facs').prop('disabled', true);
			$('.scb_s_facs_left_facs').prop('disabled', false);
		}
		else $('.scb_s_facs_right_facs').prop('disabled', false);
			
        if (kind == 'sample_prep') {
            if (_.keys(template.lysate_kinds).length == 1) {
                $('button.scb_f_facs_sample_remove').hide();
            }

        }
        if (state.facs.samples_finished) {
            scb.ui.static.FacsView.charts(workarea);
        }
        else {
            $('.scb_s_facs_samples_graph_area').css('opacity', '.25');
            $('.scb_s_facs_samples_graph_area button').prop('disabled', true);
        }

		

		_.each($(".scb_s_experiment_step_button"), function (e) {
			if(!$(e).hasClass('scb_s_experiment_step_visited')) 
				$(e).attr('title', 'To use this button, start a new '+$(e).text()+' Experiment.');
			else $(e).removeAttr('title');
    	});
		$(".scb_s_facs_selected").keypress(function(e){ return e.which != 13; });
		
		if(kind == 'analyze'){
			//correct offset caused in FACS to align all parts of progress bar correctly
			$('.scb_s_western_blot_progress_gray_bar').children().each(function () { console.log($(this).css('left'));
    				$(this).css('left', parseInt($(this).css('left'))-5+'px');
			});
			$('.scb_s_western_blot_progress_bar').addClass('scb_s_facs_bar');
			$('.scb_s_facs_single_range_button').button();
			$('.scb_s_facs_double_range_button').button();
		}
		
        
		document.body.scrollTop = state.experiment.last_scroll;
		
		$('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: 0
			});
		$(window).resize(function(){

			$('#main').css({
				position:'absolute',
				left: ($(window).width() - $('#main').outerWidth())/2,
				top: ($(window).height() - $('#main').outerHeight())/2
			});

		});
    }
}