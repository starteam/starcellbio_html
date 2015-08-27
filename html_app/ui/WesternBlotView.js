'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.WesternBlotView = scb.ui.static.WesternBlotView || {};
scb.ui.static.WesternBlotView.TOTAL_TABS =  4;
scb.ui.static.WesternBlotView.TOTAL_STEPS =  5;
scb.ui.static.WesternBlotView.TOTAL_SCROLL =  5;

function resetScrollValue(parsed){
	parsed.experiment.last_scroll =0 ;
    parsed.experiment.last_scroll=document.body.scrollTop;
	return parsed;
}


scb.ui.static.WesternBlotView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var western_blot_id = $(element).attr('western_blot_id');

    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        western_blot_id: western_blot_id,
        view: 'western_blot',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}


scb.ui.static.WesternBlotView.scb_f_western_blot_sample_remove = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var lysate_id = $(element).attr('lane_id');
    if (lysate_id != '') {
        parsed.western_blot.lanes_list.remove(lysate_id);
    }
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.WesternBlotView.scb_f_western_blot_remove = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
 	var id_list = [];
 	for( var x=0; x < parsed.experiment.western_blot_list.list.length; x++){id_list.push(parsed.experiment.western_blot_list.list[x].id);}
    parsed.state.index= id_list.indexOf(parsed.western_blot.id);
    
    
    parsed.experiment.western_blot_list.remove(parsed.western_blot.id);
   
   
    if(parsed.state.index == parsed.experiment.western_blot_list.list.length){
    	parsed.state.index = parsed.state.index -1 ;
    }
    //fix tab indexing for display
    if(parsed.state.index > parsed.experiment.western_blot_list.list.length -scb.ui.static.WesternBlotView.TOTAL_TABS) {
    	
    	if((parsed.experiment.western_blot_list.list.length == scb.ui.static.WesternBlotView.TOTAL_TABS+1 || parsed.experiment.western_blot_list.list.length == scb.ui.static.WesternBlotView.TOTAL_TABS+2) && parsed.experiment.western_blot_list.start_tabs_index <=1)
    		parsed.experiment.western_blot_list.start_tabs_index = parsed.experiment.western_blot_list.start_tabs_index+1;
    	else parsed.experiment.western_blot_list.start_tabs_index = parsed.experiment.western_blot_list.start_tabs_index-1;
    }
    
    
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);


}

scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type = function (element, event) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if($(element).attr('kind')){
		lysate_type=$(element).attr('kind');
	}
	else{
		var lysate_type = $(element).attr('value');
		if (lysate_type == '') {
			return;
		}
	}

    var lysate_id = $(element).attr('lane_id');
    if (lysate_id == '') {
        var cell_treatment_id = $(element).attr('cell_treatment_id');
        parsed.western_blot.lanes_list.start({
            kind: lysate_type,
            cell_treatment_id: cell_treatment_id,
            experiment_id: parsed.experiment.id
        });
		if (event) {
       		scb.ui.static.MainFrame.refresh();
   		}
    }
    else {
        parsed.western_blot.lanes_list.get(lysate_id).kind = lysate_type;
    }

}


scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active = function (element, event) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
	
    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.western_blot.is_cell_treatment_enabled[cell_treatment_id] = val;
   
    $('.scb_f_western_blot_select_lysate_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type(this);
    });
    parsed.western_blot.prep_scroll = $('.scb_s_western_blot_samples_table').scrollTop();
    if (event) {
    		
        scb.ui.static.MainFrame.refresh();
        var rows_count = parsed.western_blot.rows_state();
        if (rows_count.valid > (scb.ui.static.WesternBlotView.MAX_ROWS - 1)) {
            var element = $('.scb_f_western_blot_sample_active[cell_treatment_id="' + cell_treatment_id + '"]');
            var parent = $(element).parent();
            var note = $("<span>" + rows_count.valid + "</span>");
            note.appendTo(parent);
            console.info(parent);
            setTimeout(function () {
                $(note).detach();
            }, 500);
        }
    }
}



scb.ui.static.WesternBlotView.scb_s_western_blot_selected = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    if($(element).text().length <=1){
    	 scb.ui.static.MainFrame.refresh();
    }
    else{
    parsed.western_blot.name = $(element).val();
    }

}

scb.ui.static.WesternBlotView.scb_f_western_blot_prepare_lysates = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var rows_state = parsed.western_blot.rows_state();
    if (rows_state.valid > scb.ui.static.WesternBlotView.MAX_ROWS) {
        $('html').css('overflow', 'hidden');
        $('body').prepend(scb_experiment_setup.general_error_overlay());
        $('#jqDialog_box').css('width', '450px');
        $.jqDialog.alert(scb_western_blot.wb_sample_error(),
            function() { /* callback function for 'OK' button*/
                $('#jqDialog_box').css('width', '');
                $('html').css('overflow', 'visible');
                $('.error_overlay').remove()});
        $('.jqDialog_header').remove();
        $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
        $('#jqDialog_box').attr('role', 'alertdialog');

    } else if(rows_state.valid === scb.ui.static.WesternBlotView.MAX_ROWS){
        $('#jqDialog_box').css('width', '450px');
        $.jqDialog.confirm(scb_western_blot.wb_15_samples_error(),
            function() { /* callback function for 'YES' button */
                $('html').css('overflow', 'visible');
                $('.error_overlay').remove();
                parsed.western_blot.lysate_prepared = true;
                scb.ui.static.MainFrame.refresh();
            },
            function() { /* callback function for 'NO' button */
                $('.error_overlay').remove();
                $('html').css('overflow', 'visible');
            }
        );
        $('.jqDialog_header').remove();
        $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());

    } else if (rows_state.valid < 1) {
    	$('html').css('overflow', 'hidden');
    	$('body').prepend(scb_experiment_setup.general_error_overlay());

        $.jqDialog.alert("Please select at least 1 lysate to prepare.", function() {
            $('html').css('overflow', 'visible');
            $('.error_overlay').remove(); /* callback function for 'OK' button*/
        });
 		$('.jqDialog_header').remove();
		$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
		$('#jqDialog_box').attr('role', 'alertdialog');
    }
    else {
        parsed.western_blot.lysate_prepared = true;
        window.scrollTo(0, 0);
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.WesternBlotView.scb_s_western_blot_load_marker = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.western_blot.lanes_list.start({
            id: 'marker',
            name: 'Marker',
            cell_treatment_id: "marker_treatment",
            experiment_id: parsed.experiment.id
    });
    parsed.western_blot.marker_loaded = true;
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.WesternBlotView.populate_wells = function (rows, state) {
    state.western_blot.wells_loaded = true;
    var canvas = $('.scb_s_western_blot_gel', '.scb_s_western_blot_view').get(0);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    var g = canvas.getContext('2d');

    function getImage(index) {
        return $('img', '.scb_wells')[index];
    }

    g.drawImage(getImage(15), 0, 0);

    var i = 0;
    _.each(rows, function (elem, index, array) {
        if (elem.is_sample_enabled) {
            g.drawImage(getImage(i++), 0, 0);
        }
    });
    if (state.western_blot.marker_loaded) {
        g.drawImage(getImage(i), 0, 0);
    }
}

scb.ui.static.WesternBlotView.draw_wells=function(rows,state){
    var canvas =  $('.scb_s_western_blot_gel', '.scb_s_western_blot_view').get(0);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    var g = canvas.getContext('2d');

    function getImage(index) {
        return $('img', '.scb_wells')[index];
    }

    g.drawImage(getImage(15), 0, 0);
}





scb.ui.static.WesternBlotView.scb_s_western_blot_choose_gel_type_input = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.western_blot.gel_type = $(element).val();
    scb.ui.static.MainFrame.refresh();
}


scb.ui.static.WesternBlotView.scb_s_western_blot_run_gel_and_transfer = function (element) {
    var parsed = scb.ui.static.WesternBlotView.parse(element);
    parsed = resetScrollValue(parsed);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    	parsed.western_blot.is_transfered = true;
    	//TODO: before repaint need to do steps in animation...
    	scb.ui.static.MainFrame.refresh();


}
scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active_all = function (element) {
    $('.scb_f_western_blot_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', true);
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.WesternBlotView.scb_f_western_blot_sample_inactive_all = function (element) {
	$('.scb_f_western_blot_sample_active').each(function(e){
		var element = this;
		$(element).attr('checked', false);
		scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active(element);
	});    
    scb.ui.static.MainFrame.refresh();

}



scb.ui.static.WesternBlotView.scb_s_western_blot_left_western_blot = function(element, event){
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	parsed = resetScrollValue(parsed);
	parsed.western_blot.parent.start_tabs_index = parsed.western_blot.parent.start_tabs_index -1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.WesternBlotView.scb_s_western_blot_right_western_blot = function(element, event){
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	parsed = resetScrollValue(parsed);
	parsed.western_blot.parent.start_tabs_index = parsed.western_blot.parent.start_tabs_index +1;
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.WesternBlotView.scb_s_western_blot_add_western_blot= function(element, event){
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	parsed = resetScrollValue(parsed);
	console.log(parsed.western_blot.parent.start_tabs_index);
	console.log(parsed.western_blot.parent.list.length);
	if(parsed.western_blot.parent.list.length==scb.ui.static.WesternBlotView.TOTAL_TABS){
		parsed.western_blot.parent.start_tabs_index = 1;
	}
	else if (parsed.western_blot.parent.list.length >scb.ui.static.WesternBlotView.TOTAL_TABS)
		parsed.western_blot.parent.start_tabs_index = parsed.western_blot.parent.length-(scb.ui.static.WesternBlotView.TOTAL_TABS-1);
	scb.ui.static.MainFrame.refresh(parsed.state);
}

scb.ui.static.WesternBlotView.scb_s_western_blot_choose_samples_list_item = function (element) {
	
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	parsed = resetScrollValue(parsed);
	var new_order = [];
	var list = $('.scb_s_western_blot_choose_samples_order_list', '.scb_s_western_blot_view').get(0);
	var children =$(list.children);

	for(var v = 0; v < children.length; v ++){
		$(list).append($(children[v]));
		if($(children[v]).attr('class').indexOf('ui-sortable-helper') > -1){
			$('.ui-sortable-placeholder').text($(children[v]).text());
			$('.ui-sortable-placeholder').css('visibility', 'visible');
			$('.ui-sortable-placeholder').attr('id', $(children[v]).attr('id'));
			$('.ui-sortable-placeholder').attr('class', 'scb_s_western_blot_choose_samples_list_item');
		
		}
	}
	for(var v=0; v<children.length; v++){
		if($(children[v]).attr('class').indexOf('ui-sortable-helper') <= -1)
			new_order[v] = $(children[v]).attr('id');
	}
	for(var v=0; v<new_order.length; v++){
		if(new_order[v] == undefined)
			new_order.splice(v, 1);
	}
	console.log(new_order);
	parsed.western_blot.lanes_list.reorder(new_order);
}


scb.ui.static.WesternBlotView.scb_s_western_blot_sort_up_button = function (element) {
	
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	parsed = resetScrollValue(parsed);
	var new_order = [];
	var list = $('.scb_s_western_blot_choose_samples_order_list', '.scb_s_western_blot_view').get(0);
	var children =$(list.children);
	var v=0;
	while(v<children.length){
		if($(children[v]).attr('id')== $(element).attr('id')){
			var temp= new_order[v-1];
			new_order[v-1] =  $(children[v]).attr('id');
			new_order[v]=temp;
			v++;
		}
		else{
			new_order[v] = $(children[v]).attr('id');
			v++;
		}
	}
	console.log(new_order);
	parsed.western_blot.lanes_list.reorder(new_order);
}


scb.ui.static.WesternBlotView.scb_s_western_blot_sort_down_button = function (element) {
	
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	parsed = resetScrollValue(parsed);
	var new_order = [];
	var list = $('.scb_s_western_blot_choose_samples_order_list', '.scb_s_western_blot_view').get(0);
	var children =$(list.children);
	var v=0;
	while(v<children.length){
		if($(children[v]).attr('id')== $(element).attr('id')){
			var value= $(children[v+1]).attr('id');
			new_order[v+1] =  $(children[v]).attr('id');
			new_order[v]=value;
			v=v+2;
		}
		else{
			new_order[v] = $(children[v]).attr('id');
			v++;
		}
	}
	console.log(new_order);
	parsed.western_blot.lanes_list.reorder(new_order);
}

scb.ui.static.WesternBlotView.scb_f_western_blot_note_close_button= function (element) {
		var parsed = scb.ui.static.WesternBlotView.parse(element);
	    var note = $(element).attr('note');
    	note = '.' +note;	
		$(note).slideUp('400', function(){
			parsed.western_blot.measure_show_state  = $('.scb_s_western_blot_tools_measure_followup').is(":visible");
			parsed.western_blot.samples_show_state  = $('.scb_s_western_blot_tools_samples_followup').is(":visible");
			scb.ui.static.MainFrame.refresh();
		});
		
}

scb.ui.static.WesternBlotView.scb_f_western_blot_tools_toggle = function (element) {
	var parsed = scb.ui.static.WesternBlotView.parse(element);
	var note = $(element).attr('note');
    note = '.' +note;	
	$(note).slideDown('400', function(){
		parsed.western_blot.measure_show_state  = $('.scb_s_western_blot_tools_measure_followup').is(":visible");
		parsed.western_blot.samples_show_state  = $('.scb_s_western_blot_tools_samples_followup').is(":visible");
		scb.ui.static.MainFrame.refresh();
	});
	
}


scb.ui.static.WesternBlotView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_select_lysate_type', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_select_lysate_type(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_sample_remove', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_remove(this);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_western_blot_sample_active', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_remove', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_remove(this);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_western_blot_selected', function (e) {
    	$('.scb_s_western_blot_selected').text($('.scb_s_western_blot_selected').attr('value'));
        scb.ui.static.WesternBlotView.scb_s_western_blot_selected(this);
    });
    scb.utils.off_on(workarea, 'keydown', '.scb_s_western_blot_selected', function (e) {
    	if ($('.scb_s_western_blot_selected').text().length> 10) {
    		$('.scb_s_western_blot_selected').text()
    		e.preventDefault();
    		 this.textContent= this.textContent.substring(0, this.textContent.length-1)
    		 return false;
    		 
    	}
	
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_prepare_lysates', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_prepare_lysates(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_load_marker', function (e) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_load_marker(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_load_all', function (e) {
        var parsed = scb.ui.static.WesternBlotView.parse(this);
        var rows_state = parsed.western_blot.rows_state();
        console.log(rows_state.valid);
        if (!parsed.western_blot.marker_loaded &&
            rows_state.valid !== scb.ui.static.WesternBlotView.MAX_ROWS) {
            $('html').css('overflow', 'hidden');
            $('body').prepend(scb_experiment_setup.general_error_overlay());


            $.jqDialog.confirm("The protein size marker has not been added to your samples. Would you like to continue?",
                function () {
                    $('html').css('overflow', 'visible');
                    $('.error_overlay').remove();
                    parsed = resetScrollValue(parsed);
                    scb.ui.static.WesternBlotView.populate_wells(rows_state.rows, parsed);

                    scb.ui.static.MainFrame.refresh();
                },// callback function for 'YES' button
                function () {
                    $('.error_overlay').remove();
                    $('html').css('overflow', 'visible');
                    return;
                } // callback function for 'NO' button
            );
            $('.jqDialog_header').remove();
            $('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
            $('#jqDialog_box').attr('role', 'alertdialog');


        } else {
            var parsed = scb.ui.static.WesternBlotView.parse(this);
            parsed = resetScrollValue(parsed);
            scb.ui.static.WesternBlotView.populate_wells(parsed.western_blot.rows_state().rows, parsed);
        }
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_choose_gel_type_input', function (e, ui) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_choose_gel_type_input(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_run_gel_and_transfer', function (e, ui) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_run_gel_and_transfer(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_left_western_blot', function (e) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_left_western_blot(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_right_western_blot', function (e) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_right_western_blot(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_sample_active_all', function (e, ui) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_sample_active_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_add_western_blot', function (e, ui) {
        scb.ui.static.WesternBlotView.scb_s_western_blot_add_western_blot(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_tools_toggle', function (e) {
        scb.ui.static.WesternBlotView.scb_f_western_blot_tools_toggle(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_note_close_button', function (e) {
    	scb.ui.static.WesternBlotView.scb_f_western_blot_note_close_button(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_western_blot_sample_inactive_all', function (e, ui){
    	scb.ui.static.WesternBlotView.scb_f_western_blot_sample_inactive_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_wb_up_button', function (e, ui){
		var item = $('.markedLi');
     	var prev = item.prev();
		if (prev.length == 0)
				return;
		prev.css('z-index', 999).css('position','relative').animate({ top: item.height() }, 250);
		item.css('z-index', 1000).css('position', 'relative').animate({ top: '-' + prev.height() }, 300, function () {
			prev.css('z-index', '').css('top', '').css('position', '');
			item.css('z-index', '').css('top', '').css('position', '');
			item.insertBefore(prev);
		});
    	scb.ui.static.WesternBlotView.scb_s_western_blot_sort_up_button($('.markedLi', '.scb_s_western_blot_view').get(0));
   	});
   	
   	scb.utils.off_on(workarea, 'click', '.scb_f_wb_down_button', function (e, ui){
		var item = $('.markedLi');
		 var next = item.next();
		if (next.length == 0)
			return;
		next.css('z-index', 999).css('position', 'relative').animate({ top: '-' + item.height() }, 250);
		item.css('z-index', 1000).css('position', 'relative').animate({ top: next.height() }, 300, function () {
			next.css('z-index', '').css('top', '').css('position', '');
			item.css('z-index', '').css('top', '').css('position', '');
			item.insertAfter(next);
		});
    	scb.ui.static.WesternBlotView.scb_s_western_blot_sort_down_button($('.markedLi', '.scb_s_western_blot_view').get(0));


   	});


    scb.utils.off_on(workarea, 'click', '.scb_s_western_blot_gel_tab', function (e, ui) {
        var link = $('a', $(this));
        var href = link.attr('href');
        if( href )
        {
            document.location = href;
            e.preventDefault();
        }
    });
    scb.utils.off_on(workarea, 'mouseup', '.scb_s_western_blot_choose_samples_list_item', function(e, ui){
    	scb.ui.static.WesternBlotView.scb_s_western_blot_choose_samples_list_item(this);
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


scb.ui.static.WesternBlotView.MAX_ROWS = 15;

scb.ui.WesternBlotView = function scb_ui_WesternBlotView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;
        var rows_state = state.western_blot.rows_state();

        var kind = 'sample_prep';
        if (state.western_blot.lysate_prepared) {
            kind = 'prepare_gel';
        }

        var can_prepare_lysate = rows_state.valid > 0;
		
		state.experiment.last_technique_view = 'western_blot';
        	
		
        workarea.html(scb_western_blot.main({
            global_template: gstate.context.master_model,
            t: template,
            assignment: state.assignment,
            experiment: state.experiment,
            western_blot: state.western_blot,
            rows: rows_state.rows,
            context: gstate.context,
            rows_valid: rows_state.valid,
			last_step: state.experiment.last_step,
			prev_step: state.experiment.prev_step,
            kind: kind,
            kinds: template.lysate_kinds,
            can_prepare_lysate: can_prepare_lysate
        }));
        if (kind == 'sample_prep'){
        	 $('.scb_s_western_blot_samples_table').scrollTop(state.western_blot.prep_scroll);
        }
        state.experiment.prev_step=4;
        if(state.experiment.last_step >= scb.ui.static.WesternBlotView.TOTAL_STEPS)
			state.experiment.last_step = scb.ui.static.WesternBlotView.TOTAL_STEPS+1;
		state.experiment.last_technique = 'WESTERN BLOT';
		state.experiment.last_id = state.western_blot.id;
		state.experiment.last_param = 'western_blot_id';
		
		document.body.scrollTop = state.experiment.last_scroll;
        if(state.western_blot.parent.start_tabs_index <= 0){
			state.western_blot.parent.start_tabs_index = 0;
			$('.scb_s_western_blot_left_western_blot').prop('disabled', true);
			$('.scb_s_western_blot_right_western_blot').prop('disabled', false);
		}
		else $('.scb_s_western_blot_left_western_blot').prop('disabled', false);
		
		if(state.western_blot.parent.start_tabs_index + scb.ui.static.WesternBlotView.TOTAL_TABS -1 ==state.western_blot.parent.list.length-1){
			$('.scb_s_western_blot_right_western_blot').prop('disabled', true);
			$('.scb_s_western_blot_left_western_blot').prop('disabled', false);
		}
		else $('.scb_s_western_blot_right_western_blot').prop('disabled', false);
        
        
        document.title = "Western Blot - StarCellBio";

        
        if(kind != 'sample_prep') {
        	$('.scb_s_western_blot_video_box_wrapper').remove();
        }
        else {
            if (_.keys(template.lysate_kinds).length == 1) {
                $('button.scb_f_western_blot_sample_remove').hide();
            	//strange bug where clicks not reflected in place, hitting cancel button corrects this problem.  
            }            
        }
        if (kind == 'prepare_gel') {
            if(state.western_blot.wells_loaded) {
                scb.ui.static.WesternBlotView.populate_wells(rows_state.rows, state);
            } else {
                scb.ui.static.WesternBlotView.draw_wells(rows_state.rows, state);
            }
            if(rows_state.valid === scb.ui.static.WesternBlotView.MAX_ROWS){
                $(".scb_s_western_blot_add_marker_wrapper").css('opacity','.25').children().prop('disabled', true);
            }

        }

        if (state.western_blot.gel_type == null) {
            $('.scb_s_western_blot_samples_area').children().not('.scb_s_western_blot_choose_gel_type').not('.scb_s_western_blot_gel_type_info').not('.scb_f_wb_gel_type_followup').css('opacity', '.25');
            $('.scb_s_western_blot_samples_area button').not('.scb_s_western_blot_gel_type_info').prop('disabled', true);
            $('.scb_s_western_blot_samples_area button').not('.scb_s_western_blot_gel_type_info').css('cursor', 'default');
            $('.scb_s_western_blot_samples_gel_area').css('opacity', '.25');
            $('canvas', $('.scb_s_western_blot_samples_gel_area')).hide();
        }

		state.western_blot.parent.selected_id = state.western_blot.id;

        state.experiment.last_view = 'western_blot';
		if(!state.western_blot.wells_loaded){
			$('ol.scb_s_western_blot_choose_samples_order_list').sortable();
		}
		else{
			$('.scb_s_western_blot_choose_samples_list_item').removeClass('scb_s_western_blot_sortable_item');
			$('.scb_s_western_blot_choose_samples_list_item').removeClass('scb_s_movable_item');
		}
		
		_.each($(".scb_s_experiment_step_button"), function (e) {
			if(!$(e).hasClass('scb_s_experiment_step_visited')) 
				$(e).attr('title', 'To use this button, start a new '+$(e).text()+' Experiment.');
			else $(e).removeAttr('title');
    	});
        var stopVideo = function (player) {
            var vidSrc = player.prop('src');
            player.prop('src', ''); // to force it to pause
            player.prop('src', vidSrc);
        };


        $(".scb_s_western_blot_selected").keypress(function (e) {
            return e.which != 13;
        });
        var elem = document.getElementById('slider');
        window.mySwipe = Swipe(elem, {
            continuous: false,
            disableScroll: true,
            transitionEnd: function (index, element) {
                var current_video = $($(element).find('iframe')[0]).attr('id');
                _.each($(element).parent().children(), function (video) {
                    if ($($(video).find('iframe')[0]).attr('id') !== current_video) {
                        stopVideo($($(video).find('iframe')[0]));
                    }

                });
                $('.slider_dots li').attr('class', '');
                $($('.slider_dots li')[index]).attr('class', 'on');
            }
        });
        /* Click on the slider dots
         $('#nav li').on('click', function () {
         $('.slider_dots li').attr('class','');
         $($('.slider_dots li')[$(this).index()]).attr('class','on');
         window.mySwipe.slide($(this).index(), 200);
         });
         */
        $('.slider_dots li').css('cursor', 'default');


		if(!state.western_blot.wells_loaded){
		$('body').mousedown(function(e){
			if($(e.target).parents('.scb_s_western_blot_samples_area').length ==1){
				if($(e.target).hasClass('scb_s_western_blot_sortable_item')){
				$('.markedLi').removeClass('markedLi');
    			$(e.target).addClass('markedLi');
    			}
			}
			else
				$('.markedLi').removeClass('markedLi');
		});
		}
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