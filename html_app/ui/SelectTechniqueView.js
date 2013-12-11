'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.SelectTechniqueView = scb.ui.static.SelectTechniqueView || {};

scb.ui.static.SelectTechniqueView.wbparse = function (element) {
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


scb.ui.static.SelectTechniqueView.fparse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var facs_id = $(element).attr('facs_id');

    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        facs_id: facs_id,
        view: 'facs',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}


scb.ui.static.SelectTechniqueView.mparse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var microscopy_id = $(element).attr('microscopy_id');

    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        microscopy_id: microscopy_id,
        view: 'microscopy',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}



scb.ui.static.SelectTechniqueView.disable_techniques = function (state) {
    var template = state.template;
    var workarea = state.workarea;

    var techniques = template.ui.experimental_design.techniques;

    $('.scb_f_select_technique').addClass('scb_s_select_technique_disabled');
    _.each(techniques, function (e) {
        if (e == 'wb') {
            $('.scb_s_select_technique_western_blot').removeClass('scb_s_select_technique_disabled');
        }
        else if (e == 'facs') {
            $('.scb_s_select_technique_flow').removeClass('scb_s_select_technique_disabled');
        }
        else if (e == 'micro') {
           $('.scb_s_select_technique_micro').removeClass('scb_s_select_technique_disabled');

        }
    });
    $('a','.scb_s_select_technique_disabled').removeAttr('href').css('cursor','default');
}


scb.ui.static.SelectTechniqueView.scb_s_select_technique_open_western_blot = function(element, event){
	var parsed = scb.ui.static.SelectTechniqueView.wbparse(element);
	var blot = $.grep(parsed.experiment.western_blot_list.list, function(e){ return e.id == $(element).attr('western_blot_id'); });
	var i = 0;
	while( (element = element.previousSibling) != null ) 
  		i++;
	if(i/2 >= parsed.experiment.western_blot_list.length-5)
		parsed.experiment.western_blot_list.start_tabs_index = parsed.experiment.western_blot_list.length -5;
	else 		
  		parsed.experiment.western_blot_list.start_tabs_index = i/2;

}


scb.ui.static.SelectTechniqueView.scb_s_select_technique_open_facs = function(element, event){
	var parsed = scb.ui.static.SelectTechniqueView.fparse(element);
	var blot = $.grep(parsed.experiment.facs_list.list, function(e){ return e.id == $(element).attr('facs_id'); });
	var i = 0;
	while( (element = element.previousSibling) != null ) 
  		i++;
	if(i/2 >= parsed.experiment.facs_list.length-5)
		parsed.experiment.facs_list.start_tabs_index = parsed.experiment.facs_list.length -5;
	else 		
  		parsed.experiment.facs_list.start_tabs_index = i/2;

}

scb.ui.static.SelectTechniqueView.scb_s_select_technique_open_microscopy = function(element, event){
	var parsed = scb.ui.static.SelectTechniqueView.mparse(element);
	var blot = $.grep(parsed.experiment.microscopy_list.list, function(e){ return e.id == $(element).attr('microscopy_id'); });
	var i = 0;
	while( (element = element.previousSibling) != null ) 
  		i++;
	if(i/2 >= parsed.experiment.microscopy_list.length-5)
		parsed.experiment.microscopy_list.start_tabs_index = parsed.experiment.microscopy_list.length -5;
	else 		
  		parsed.experiment.microscopy_list.start_tabs_index = i/2;

}


scb.ui.static.SelectTechniqueView.register = function (workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_s_select_technique_open_western_blot', function (e) {
        scb.ui.static.SelectTechniqueView.scb_s_select_technique_open_western_blot(this);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_select_technique_open_facs', function (e) {
        scb.ui.static.SelectTechniqueView.scb_s_select_technique_open_facs(this);
    });
    
    scb.utils.off_on(workarea, 'click', '.scb_s_select_technique_open_microscopy', function (e) {
        scb.ui.static.SelectTechniqueView.scb_s_select_technique_open_microscopy(this);
    });
    
     scb.utils.off_on(workarea, 'click', '.learn_more_western_blot', function (e) {
		var popoutWindow =window.open("static/ref_lib/full_library.html#WesternBlotting");
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#WesternBlotting"; },60);

    });
    
    
    scb.utils.off_on(workarea, 'click', '.learn_more_facs', function (e) {
    	var popoutWindow =window.open("static/ref_lib/full_library.html#FlowCytometry");
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#FlowCytometry"; },60);

    });
    
    scb.utils.off_on(workarea, 'click', '.learn_more_microscopy', function (e) {
        var popoutWindow =window.open("static/ref_lib/full_library.html#Microscopy");
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#Microscopy"; },60);

    });
}




scb.ui.SelectTechniqueView = function scb_ui_SelectTechniqueView(gstate) {
    var self = this;
	
    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;

        workarea.html(scb_select_technique.main({
            global_template: gstate.context.master_model,
            t: template,
            context: gstate.context,
			last_step: state.experiment.last_step,
			prev_step: state.experiment.prev_step,
            assignment: state.assignment,
            experiment: state.experiment
        }));
        state.experiment.prev_step=3;
        if(state.experiment.last_step > 5)
			state.experiment.last_step = 6;
		else
			state.experiment.last_step = 5;

        state.experiment.last_view = 'select_technique';
		
    	$("body").css("overflow", "auto");
        scb.ui.static.SelectTechniqueView.disable_techniques({template: template, workarea: workarea});
        
		_.each($(".scb_s_experiment_step_button"), function (e) {
			if($(e).css('background-color')=='rgb(213, 220, 228)') 
				$(e).attr('title', 'To use this button, start a new '+$(e).text()+' Experiment.');
			else $(e).removeAttr('title');
    	});
    }

}