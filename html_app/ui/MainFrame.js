//'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};

scb.ui.static.MainFrame = scb.ui.static.MainFrame || {};

scb.ui.static.MainFrame.update_hash = function (state) {
    console.info("update_hash " + state.onhashchange);
    console.info($.bbq.getState());
    console.info(state);

    if (!state.onhashchange) {
        delete state.onhashchange;
        var History = window.History;
        if (!History.enabled) {
            return;
        }
        History.discardedState();
        History.discardedState();
        History.pushState(state, 2, "/#" + $.param(state));
    }
}


scb.ui.MainFrame = function scb_ui_MainFrame(master_model, context) {
    var self = this;
    var pending_save = false;
    context.main_frame = self;
    self.sections = {};

    var assignments = new scb.AssignmentList(master_model.assignments, context);

    scb.ui.static.MainFrame.ensure_auth_context = function () {
        context = context || {};
        context.auth = context.auth || {};
    }
    scb.ui.static.MainFrame.validate_state = function (state) {
        var ret = {
            redisplay: false
        };

        if (state.assignment_id) {
            var assignment = assignments.get(state.assignment_id);
            if (assignment) {
                assignments.selected_id = assignment.id;
                ret.assignment = assignment;

                if (state.experiment_id) {
                    var experiment = assignment.experiments.get(state.experiment_id);
                    if (experiment) {
                        assignment.experiments.selected_id = experiment.id;
                        ret.experiment = experiment;
                        if (state.western_blot_id) {
                            var western_blot = experiment.western_blot_list.get(state.western_blot_id);
                            if (western_blot) {
                                ret.western_blot = western_blot;
                                if (state.western_blot_gel_id && western_blot) {
                                    var western_blot_gel = western_blot.gel_list.get(state.western_blot_gel_id);
                                    ret.western_blot_gel = western_blot_gel;
                                }
                            }
                        }
                        if (state.cell_treatment_id) {
                            var cell_treatment = experiment.cell_treatment_list.get(state.cell_treatment_id);
                            if (cell_treatment) {
                                ret.cell_treatment = cell_treatment;
                                if (state.treatment_id && cell_treatment) {
                                    var treatment = cell_treatment.treatment_list.get(state.treatment_id);
                                    ret.treatment = treatment;
                                }
                            }
                        }
                        if (state.facs_id) {
                            var facs = experiment.facs_list.get(state.facs_id);
                            if (facs) {
                                ret.facs = facs;
                                if (state.facs_lane_id && facs) {
                                    var facs_lane = facs.lanes_list.get(state.facs_lane_id)
                                    ret.facs_lane = facs_lane;
                                }
                            }
                        }
                        if (state.microscopy_id) {
                        	var microscopy = experiment.microscopy_list.get(state.microscopy_id);
                        	if(microscopy) {
                        		ret.microscopy = microscopy;
                        	}
							if (state.microscopy_lane_id && microscopy) {
								var microscopy_lane = microscopy.lanes_list.get(state.microscopy_lane_id)
								ret.microscopy_lane = microscopy_lane;
							}
                        }

                    }
                    else {
                        // if experiment_id is invalid go to assignment
                        $('html').css('overflow', 'hidden');
                        
    					$('body').prepend(scb_experiment_setup.general_error_overlay());

					
                        $.jqDialog.alert('Experiment ' + state.experiment_id + ' does not exist.', function() {	
                        		$('html').css('overflow', 'visible');
                        		$('.error_overlay').remove();/* callback function for 'OK' button*/ });
                        $('.jqDialog_header').remove();
                        $('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Error</h1>");

                        state.onhashchange = false;
                        state.view = 'assignments';
                        delete state.experiment_id;
                        scb.ui.static.MainFrame.update_hash(state);
                        ret.redisplay = true;
                        ret.redisplay_state = state;
                    }
                }
            }
            else {
                // if assignment_id is invalid go to assignments
                $('html').css('overflow', 'hidden');
                
    				$('body').prepend(scb_experiment_setup.general_error_overlay());

                $.jqDialog.alert('Assignment ' + state.assignment_id + ' does not exist.', function() {	
                	$('html').css('overflow', 'visible');
					$('.error_overlay').remove();/* callback function for 'OK' button*/ });
            	$('.jqDialog_header').remove();
            	$('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Error</h1>");

                state.onhashchange = false;
                state.view = 'assignments';
                delete state.assignment_id;
                scb.ui.static.MainFrame.update_hash(state);
                ret.redisplay = true;
                ret.redisplay_state = state;
            }
        }
        if (ret.redisplay == false && state.skip_hash_update != true) {
            scb.ui.static.MainFrame.update_hash(state);
        }
        ret.context = context;
        return ret;
    }

    //TODO: DEBUG REMOVE
    window._assigments = assignments;

    self.current_tab = {
        hide: scb.Utils.noop,
        show: scb.Utils.noop
    };

    var workarea = context.ui;
    workarea.css({
        'height': '100%'
    });

    scb.ui.static.HomepageView.register(workarea);
	scb.ui.static.AssignmentsView.register(workarea);
    scb.ui.static.ExperimentDesignView.register(workarea);
    scb.ui.static.ExperimentSetupView.register(workarea);
    scb.ui.static.WesternBlotView.register(workarea);
    scb.ui.static.MicroscopyView.register(workarea);
    scb.ui.static.WesternBlotGelView.register(workarea);
    scb.ui.static.SelectTechniqueView.register(workarea);
    scb.ui.static.FacsView.register(workarea);

    scb.ui.static.MainFrame.in_ajax = false;
    scb.ui.static.MainFrame.show_in_ajax = false;
    scb.ui.static.MainFrame.show_in_ajax_message = '';

    scb.ui.static.MainFrame.in_ajax_display = function () {
        var saving = $('#saving');
        if (scb.ui.static.MainFrame.show_in_ajax) {
            saving.show();
            $('#saving_message', saving).html(scb.ui.static.MainFrame.show_in_ajax_message);
        }
        else {
            saving.hide();
        }
    }
    scb.ui.static.MainFrame.save = function () {
        var tmp;
        try {
            tmp = assignments.selected.experiments.selected_id;
        } catch (ex) {
        }
        try {
            assignment.selected.experiments.selected_id = null;
        } catch (ex) {
        }
        var model_string = JSON.stringify(master_model);
        if (localStorage.getItem("scb_master_model") != model_string) {
            master_model.timestamp = (new Date()).getTime();
            model_string = JSON.stringify(master_model);
            try {
                localStorage.setItem("scb_master_model", model_string);
                if (!scb.ui.static.MainFrame.in_ajax) {
                    scb.ui.static.MainFrame.in_ajax = true;
                    scb.ui.static.MainFrame.show_in_ajax = true;
                    scb.ui.static.MainFrame.show_in_ajax_message = '';
                    scb.ui.static.MainFrame.in_ajax_display();
                    scb.utils.server.call(model_string, function (state) {
                        scb.ui.static.MainFrame.in_ajax = false;
                        scb.ui.static.MainFrame.show_in_ajax = !state.success;
                        scb.ui.static.MainFrame.show_in_ajax_message = !state.success ? 'Failed, will retry in 30 seconds.' : '';
                        scb.ui.static.MainFrame.in_ajax_display();
                    });
                }
            }
            catch (e) {
            }
        }
        try {
            assignment.experiments.selected_id = tmp;
        } catch (ex) {
        }
    };

    scb.ui.static.MainFrame.load = function () {
        var master_model = JSON.parse(localStorage.getItem("scb_master_model"));
        starcellbio(context.ui, master_model);
    }

    scb.ui.static.MainFrame.clear_NO_PROMPT = function () {
        $.ajax({url: '/accounts/logout/', async: false, timeout: 5 });
        self.show({view: 'assignments'});
        master_model = master_model_data;
        scb.ui.static.MainFrame.save();
        starcellbio(context.ui, master_model);
    }

    scb.ui.static.MainFrame.clear = function () {
        var r = prompt("This will restart whole assignment. Your saved data will be lost. Type: 'YES' to proceed.");
        if (r == 'YES') {
            self.show({view: 'assignments'});
            master_model = master_model_data;
            scb.ui.static.MainFrame.save();
            starcellbio(context.ui, master_model);
        }
        else {
        	$('html').css('overflow', 'hidden');
        	
    			$('body').prepend(scb_experiment_setup.general_error_overlay());

        	$.jqDialog.alert("Operation canceled!\n If you wanted to clear everything type YES in previous dialog.", 
        		function() {$('html').css('overflow', 'visible');	
					$('.error_overlay').remove();/* callback function for 'OK' button*/ });;
			$('.jqDialog_header').remove();
			$('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Error:</h1>");

        }
    }


    scb.utils.off_on(workarea, 'click', '.save_master_model', function () {
        scb.ui.static.MainFrame.save();
        alert("Save");
    });

    scb.utils.off_on(workarea, 'click', '.load_master_model', function () {
        scb.ui.static.MainFrame.load();
    });

    scb.utils.off_on(workarea, 'click', '.clear_master_model', function () {
        scb.ui.static.MainFrame.clear();
    });


    scb.utils.off_on(workarea.parent(), 'click', '.remove_experiment', function () {
    	$('html').css('overflow', 'hidden');
    	
    	$('body').prepend(scb_experiment_setup.general_error_overlay());

    	$.jqDialog.confirm("Delete experiment?",
			function() { 
				$('html').css('overflow', 'visible');  
					$('.error_overlay').remove();
				var model_id = scb.Utils.get_attribute($(this), 'experiment_id');
				assignments.selected.experiments.remove(model_id);
				assignments.selected.experiments.selected_id = null;
				self.show({});
    		},// callback function for 'YES' button
			function() {
					$('html').css('overflow', 'visible');
					$('.error_overlay').remove();
					return;
			}		// callback function for 'NO' button
		);
		$('.jqDialog_header').remove();
		$('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Delete experiment?</h1>");

    });
    
    
    
    
   	//HANDLER FOR CONTACT BUTTON AND IFRAME
    scb.utils.off_on(workarea.parent(), 'click', '.scb_f_contact', function (evt) {
    	$(workarea).append(scb_contact.contact({}));
    	
    	$(workarea).prepend(scb_common.contact_overlay());

    	scb.utils.off_on(workarea, 'click', '.scb_f_contact_close_button', function () {
                $('.scb_s_contact_dialog').detach();
                
					$('.contact_overlay').remove();
        });
		$('iframe').load(function(){
				$('.scb_s_contact_dialog').draggable({ handle:'.scb_s_feedback_form'});
				var iframe = document.getElementsByTagName('iframe')[0];
				var content = (iframe.contentDocument || iframe.contentWindow);
				content.body.style.fontSize = '90%';
				content.body.style.fontFamily = 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif';
			    var inputs = content.getElementsByTagName('button');
 				$(inputs).css('font-family', 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif');
				var fieldset = content.querySelectorAll('fieldset');
				var texts = content.querySelectorAll('input');
				$(texts).attr('placeholder', '');
				$(texts).css('font-family', 'Trebuchet MS, sans-serif');
				
				var iframe = $('.iframe').contents();
				iframe.find('input[type="checkbox"]').css('height', '12px');
			
				var fieldset = content.querySelectorAll('fieldset');
				$(fieldset).css('border', '0');
				$('iframe').contents().find(".scb_f_contact_submit_button").click(function(e){
					$('iframe').load(function(){
						  var profile = $('iframe').contents();
						  if(profile[0].body.textContent.indexOf('you for your feedback.') >0){
							  parent.document.location.reload();
							  }
					});
				});
		});
    });
    
    
    
    
		//HANDLER FOR USER_GUIDE BUTTON AND IFRAME
	scb.utils.off_on(workarea.parent(), 'click', '.scb_f_user_guide', function (evt) {
		var iframe_history=['#'];
		var currentPush = false;
    	$('body').append(scb_userguide.userguide({}));
    	$("#closesearch").hide();
    	$(".scb_s_ug_home").addClass('scb_s_ug_home_disabled');
    	$('.scb_s_ug_home').attr('disabled', 'disabled');
    	scb.utils.off_on('body', 'click', '.scb_f_ug_close_button', function () {
                $('.scb_f_ug_help_search_bar').detach();
        });
        $(function() {
			$(".scb_f_ug_help_search_bar").mousemove(function(e) {
				var myPos = $(this).offset();
				myPos.bottom = $(this).offset().top + $(this).outerHeight();
				myPos.right = $(this).offset().left + $(this).outerWidth();

				if (myPos.bottom > e.pageY && e.pageY > myPos.bottom -20 && myPos.right > e.pageX && e.pageX > myPos.right - 20) {
					$(this).css({ cursor: "nwse-resize" });
				}
				else {
					$(this).css({ cursor: "" });
				}
			});
   		 });
   		 
		$('iframe').load(function(){
			$('.scb_f_ug_help_search_bar').width($('iframe').contents().find('.scb_f_help_display').width()+20);
			$('iframe').width($('iframe').contents().find('.scb_f_help').width()+20);
			$('iframe').height($('iframe').contents().find('.scb_f_help').height()+20);
			$('.scb_f_ug_help_search_bar').draggable({ handle:'.user_guide_title'});
			$('iframe').contents().find('body').css('font-family', "Trebuchet MS, Helvetica, Arial, Verdana, sans-serif");
			$('iframe').contents().find("#popout").hide();
			$('iframe').contents().click(function(event) {
				if(event.target.className !='scb_s_ug_home' && event.target.id !='search'){
				if(iframe_history.length ==0){
					iframe_history=['#'];
				}
				$(".scb_s_ug_home").removeClass('scb_s_ug_home_disabled');
    			$('.scb_s_ug_home').removeAttr('disabled');
				if($('iframe').contents().find("#popout").length >0){
					$('iframe').contents().find("#popout").hide();
				}
				var anchor_element = $(event.target).closest('.anchors')
				if(event.target.className == 'intextlink')
					anchor_element = $(event.target)
				var anchor_hash = $(anchor_element).attr('href');
				var window_location=window.location.toString()+'/static/ug2/help.html'+anchor_hash;
						hashchange_function(anchor_hash, anchor_element[0]);
						iframe_history.push(anchor_hash);
						currentPush=true;
						//console.log(iframe_history);
						$(".scb_s_ug_back").removeClass('scb_s_ug_back_disabled');
						$('.scb_s_ug_back').removeAttr('disabled');
						event.preventDefault();
				}
			});
			
			$('#search').click(function(){
					$('iframe').ready(function(){
    					$("#closesearch").show();
						$('iframe').contents().find(".help_search_input").val($(".help_search_input").val());
						$('iframe').contents().find("#search").click();
					});
			});
			
			$('.help_search_input').keypress( function(e) {
				var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
				if(key == 13) {
					e.preventDefault();
					console.log($(".help_search_input").val());
					$('#search').click();
				}
			});
			

			$(".scb_s_ug_home").click(function(){
				iframe_history.push('#');
				currentPush = true;
				$('iframe').contents().find(".scb_s_ug_home").click();
				$(".scb_s_ug_home").addClass('scb_s_ug_home_disabled');
    			$('.scb_s_ug_home').attr('disabled', 'disabled');
    			$(".scb_s_ug_back").removeClass('scb_s_ug_back_disabled');
    			$('.scb_s_ug_back').removeAttr('disabled');
    					$("#closesearch").hide();
    					$(".help_search_input").val("");	
			});
			
			
			$(".scb_s_ug_back").click(function(){
				var back_url = iframe_history.pop();
				if(currentPush){
					back_url = iframe_history.pop();
				}
				currentPush=false;
    			
    			if(back_url){
    				if(back_url =="#")
    					$('iframe').contents().find(".scb_s_ug_home").click();
    				else
    					$('iframe').contents().find('a[href="'+back_url+'"]').click();
// 					$('iframe')[0].contentWindow.location.hash =back_url;
				}
				else{
					$(".scb_s_ug_back").addClass('scb_s_ug_back_disabled');
					$('.scb_s_ug_back').attr('disabled', 'disabled');
					
					$(".scb_s_ug_home").addClass('scb_s_ug_home_disabled');
    				$('.scb_s_ug_home').attr('disabled', 'disabled');
				}
			});
			
			console.info('clicked main popout', $('.main_popout'));
			
			$(".main_popout").click(function(){
					var popout_string = "";
					var visible=	$('iframe').contents().find('.scb_s_section_inactive:visible');
					if(visible.length ==1)
					{	
						if($(visible).attr('class') == 'scb_s_section_inactive')
							popout_string = $('iframe').contents().find('*:visible ').closest('.scb_s_help_sublink').attr('class').split(' ')[1];
						else
							popout_string = $(visible).attr('class');
					}
					else{
						popout_string = $($('iframe').contents().find('span:visible')[0]).attr('class');
					}
	
					popout_string = popout_string.replace(/_/g, '-');
					if($('iframe').contents().find('.scb_s_section_inactive').length ==0)
						popout_string ="";
					try
 					 {
  							var popoutWindow =window.open("static/ug2/full_guide.html#"+popout_string);
  					}
					catch(err)
  					{
  							var popoutWindow =window.open("ug2/full_guide.html#"+popout_string);
  					}
					
			});
			
			$("#closesearch").click(function(){
				$('.help_search_input').val('');
    			$("#closesearch").hide();
				$(".scb_s_ug_home").click();
			});

		});
		
    });

	//HANDLER FOR LOGIN BUTTON AND IFRAME
    scb.utils.off_on(workarea.parent(), 'click', '.scb_f_login', function (evt) {
        scb.ui.static.MainFrame.ensure_auth_context();
        if (get_courses_result.is_auth) {
        	
        	window.location = '/accounts/logout/';
        }
        else {
            $(workarea).append(scb_auth.login({}));
            scb.utils.off_on(workarea, 'click', '.scb_f_login_close_button', function () {
                $('.scb_s_login_dialog').detach();
            });
            $('.iframe').load(function(){
				var iframe = document.getElementsByTagName('iframe')[0];
				var content = (iframe.contentDocument || iframe.contentWindow);
				content.body.style.fontSize = '90%';
				content.body.style.fontFamily = 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif';
			    var inputs = content.getElementsByTagName('button');
 				$(inputs).css('font-family', 'Trebuchet MS, Helvetica, Arial, Verdana, sans-serif');
				var fieldset = content.querySelectorAll('fieldset');
				$(fieldset).children().wrap('<p></p>');
				var texts = content.querySelectorAll('input');
				$(texts).attr('placeholder', '');
				$(texts).css('font-family', 'Trebuchet MS, sans-serif');
				
				var iframe = $('.iframe').contents();
				iframe.find('input[type="checkbox"]').css('height', '12px');
				iframe.find('a:contains("Member")').click(function(){
					$('.iframe').load(function(){
						
						$('.scb_s_login_form > div').text('Sign Up');
						$('.scb_s_login_dialog').addClass('scb_s_signup_dialog');
						$('.iframe').css('height', '482px'); 
					});
				});
				iframe.find('a:contains("Password")').click(function(){
					$('.iframe').load(function(){
						
						$('.scb_s_login_form > div').text('Reset Password');
					});
				});
				
				iframe.find('a:contains("Back")').click(function(){
					$('.iframe').load(function(){
						
						$('.scb_s_login_form > div').text('Sign In');
					});
				});
				
				iframe.find(".auth_submit_button").click(function(){
						   var mask = document.createElement('div');
						   mask.className='overlay';
						   $(mask).css({'width': '100%','height': '100%','position': 'fixed', 'z-index': '993', 'background': 'rgba(125,125,125,0.7)', 'visibility': 'visible'});
					       $('body').prepend(mask);
					       var progress_icon = document.createElement('img');
					       progress_icon.src = '../../../images/homepage/ajax_loader.gif';
					       progress_icon.style.marginLeft = '50%';
					       progress_icon.style.marginTop= '50%';

					       $('.overlay').append(progress_icon);
							
						   $('.iframe').hide();
						   $('.iframe').load(function(){
						   	  var profile = $('.iframe').contents();
						   	  if(profile[0].body.textContent.indexOf('confirmed') >0){
						   	  	  parent.document.location.reload();
									
							   	  }
							   	  
							   	  else{
							   	 		 $(mask).remove();
							   	  	   $('.iframe').show();
							   	  	   if($('.iframe').contents().find('.login_submit').length >0)
							   	  	   	$('.iframe').contents().find('#errorMsg').html('Incorrect username or password. Try again');
							   	  	   
							   	  }
						   });
					});
			});
        }
        evt.preventDefault();
    });


    self.sections.homepage = new scb.ui.HomepageView({
        workarea: workarea,
        context: context
    });
    self.sections.assignments = new scb.ui.AssignmentsView({
        workarea: workarea,
        context: context
    });
	

    self.sections.experiment_design = new scb.ui.ExperimentDesignView({
        workarea: workarea,
        context: context
    });

    self.sections.experiment_setup = new scb.ui.ExperimentSetupView({
        workarea: workarea,
        context: context
    });

    self.sections.facs = new scb.ui.FacsView({
        workarea: workarea,
        context: context
    });

    self.sections.select_technique = new scb.ui.SelectTechniqueView({
        workarea: workarea,
        context: context
    });

    self.sections.western_blot = new scb.ui.WesternBlotView({
        workarea: workarea,
        context: context
    })
    
    self.sections.microscopy = new scb.ui.MicroscopyView({
    	workarea: workarea,
    	context: context
    });

    self.sections.western_blot_gel = new scb.ui.WesternBlotGelView({
        workarea: workarea,
        context: context
    })


    self.sections.workarea = new scb.ui.WorkspaceView({
        workarea: workarea,
        context: context
    })


    self.show = function (state) {
        state = state || {
            view: 'homepage'
        }
        if (state.onhashchange) {
            window.scrollTo(0, 0);
        }
        scb.ui.static.MainFrame.save();
        console.info(JSON.stringify(state));
        var parsed = scb.ui.static.MainFrame.validate_state(state);
        if (parsed.redisplay) {
            self.show(parsed.redisplay_state);
            return;
        }
        if (state.view == 'homepage') {
            self.sections.homepage.show({
                workarea: workarea
            });
        }
        if (state.view == 'assignments') {
            if (!parsed.assignment) {
                state.assignment_id = assignments.selected_id ? assignments.selected_id : get_courses_result.is_selected;
                state.onhashchange = false;
                self.show(state);
                return;
            }

            assignments.selected_id = state.assignment_id ? state.assignment_id : null;
            scb.ui.static.MainFrame.update_hash(state);
            self.sections.assignments.show({
                workarea: workarea,
                assignments: assignments
            });
        }
        if (state.view == 'experiment_design') {
            if (!parsed.experiment) {
                delete state.onhashchange;
                var experiment = parsed.assignment.experiments.start({});
                state.experiment_id = experiment.id;
                var History = window.History;
                if (History.enabled) {
                    History.replaceState("New Experiment", "New Experiment", '#' + $.param(state));
                }
                state.onhashchange = true;
                self.show(state);
                return;
            }
            self.sections.experiment_design.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment
            });
        }
        if (state.view == 'experiment_setup') {
            self.sections.experiment_setup.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                mode: 'readwrite',
                last_view: 'experiment_setup',
            });
        }
        if (state.view == 'experiment_run') {

            self.sections.experiment_setup.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                mode: 'readonly',
                last_view: 'experiment_run',
            });
        }
        if (state.view == 'facs') {
			var id_list = [];
			for( var x=0; x < parsed.experiment.facs_list.list.length; x++){id_list.push(parsed.experiment.facs_list.list[x].id);}
			
            if (!parsed.facs) {
            	if(state.facs_id && id_list.indexOf(state.facs_id)<0 && parsed.experiment.facs_list.list.length >0){
            		parsed.facs = parsed.experiment.facs_list.list[state.index];

            	}
            	else{
					delete state.onhashchange;
					var facs = parsed.experiment.facs_list.start({});
					state.facs_id = facs.id;
					var History = window.History;
					if (History.enabled) {
						History.replaceState("New FACS", "New FACS", '#' + $.param(state));
					}
					state.onhashchange = true;
					self.show(state);
					return;
                }
            }
            self.sections.facs.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                facs: parsed.facs
            });
        }
        if (state.view == 'select_technique') {

            self.sections.select_technique.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment
            });

        }
        if (state.view == 'western_blot') {
			
			var id_list = [];
			for( var x=0; x < parsed.experiment.western_blot_list.list.length; x++){id_list.push(parsed.experiment.western_blot_list.list[x].id);}

            if ( !parsed.western_blot ) {
            	if(state.western_blot_id && id_list.indexOf(state.western_blot_id)<0 && parsed.experiment.western_blot_list.list.length >0){
            		parsed.western_blot = parsed.experiment.western_blot_list.list[state.index];

            	}
            	else{
					var western_blot = parsed.experiment.western_blot_list.start({});
					state.western_blot_id = western_blot.id;
					var History = window.History;
					if (History.enabled) {
						History.replaceState("New WB", "New WB", '#' + $.param(state));
					}

					state.onhashchange = true;
					self.show(state);
					return;
                }
            } 
            
            if (parsed.western_blot.is_transfered) {
                state.view = 'western_blot_gel';
                state.onhashchange = false;
                self.show(state);
                return;
            }
            
            
            self.sections.western_blot.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                western_blot: parsed.western_blot
            });
        }
        if (state.view == 'microscopy'){


			var id_list = [];
			for( var x=0; x < parsed.experiment.microscopy_list.list.length; x++){id_list.push(parsed.experiment.microscopy_list.list[x].id);}
			
            if (!parsed.microscopy) {
            	if(state.microscopy_id && id_list.indexOf(state.microscopy_id)<0 && parsed.experiment.microscopy_list.list.length >0){
            		parsed.microscopy = parsed.experiment.microscopy_list.list[state.index];

            	}
            	else{
					delete state.onhashchange;
					var microscopy = parsed.experiment.microscopy_list.start({});
					state.microscopy_id = microscopy.id;
					var History = window.History;
					if (History.enabled) {
						History.replaceState("New FACS", "New FACS", '#' + $.param(state));
					}
					state.onhashchange = true;
					self.show(state);
					return;
                }
            }
            self.sections.microscopy.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                microscopy: parsed.microscopy
            });
        }
        if (state.view == 'western_blot_gel') {

            if (!parsed.western_blot) {
                state.onhashchange = false;
                state.view = 'select_technique';
                self.show(state);
                return;
            }
            if (!parsed.western_blot.is_transfered) {
                state.view = 'western_blot';
                state.onhashchange = false;
                self.show(state);
                return;
            }
            if (!parsed.western_blot_gel) {
                var gel_id = parsed.western_blot.last_gel;
                if (!gel_id) {
                    gel = parsed.western_blot.gel_list.start({});
                    parsed.western_blot.last_gel = gel.id;
                    gel_id = gel.id;
                }
                state.western_blot_gel_id = gel_id;
                state.onhashchange = false;
                self.show(state);
                return;
            }
            self.sections.western_blot_gel.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                western_blot: parsed.western_blot,
                western_blot_gel: parsed.western_blot_gel
            });
        }
        if (state.view == 'experiment_last') {

            if (parsed.experiment) {
                state.view = parsed.experiment.last_view ? parsed.experiment.last_view : 'experiment_design';
                self.show(state);
            }
            else {
            	$('html').css('overflow', 'hidden');
            	
    			$('body').prepend(scb_experiment_setup.general_error_overlay());

            	$.jqDialog.alert("Experiment does not exist", function() {	$('html').css('overflow', 'visible');
					$('.error_overlay').remove();/* callback function for 'OK' button*/ });
            	$('.jqDialog_header').remove();
            	$('#jqDialog_box').prepend("<h1 class='jqDialog_header'>Error</h1>");
                if (parsed.assignment) {
                    self.show({
                        view: 'assignments',
                        assignment: parsed.assignment
                    });
                }
                else {
                    self.show({
                        view: 'assignments'
                    });
                }
            }
        }
        if (get_courses_result.is_auth) {
            $('.scb_s_login_status').text('SIGN OUT');
            $('.scb_f_try_an_experiment').click();
        }
        scb.ui.static.MainFrame.pending_save(parsed);
        scb.ui.static.MainFrame.in_ajax_display();

    }
    
    scb.ui.static.MainFrame.pending_save = function(parsed){
    	if(!pending_save){
    		setTimeout(function() {
    			pending_save = false;
    			console.log('believe');
    			var token = 0;
    			if(typeof post_state_result === 'undefined')
    				token = get_courses_result.token;
    			else
    				token = post_state_result.token;
    			post_obj = {'token': token, 'model': parsed.context.master_model}
    			console.log(post_obj);
    			$.ajax({
					type: "POST",
					url: 'scb/post_state.js',
					data: JSON.stringify(post_obj),
					success: function (data){
						console.log(data);
					}
				});
    		}, 5000);
    		pending_save = true;
    	}
    }
    scb.ui.static.MainFrame.refresh = function (navigation_state) {
        var state = navigation_state || $.deparam(location.hash.replace(/^#/, ''), true);
        state.onhashchange = false;
        state.view = state.view || 'homepage';
        self.show(state);
    }

    $(window).bind('hashchange', function (e) {
        var state = $.deparam(location.hash.replace(/^#/, ''), true);
        state.onhashchange = true;
        state.view = state.view || 'homepage';
        self.show(state);
    });

    (function () {
        var state = $.deparam(location.hash.replace(/^#/, ''), true);
        state.onhashchange = true;
        state.view = state.view || 'homepage';
        self.show(state);
    })();

    // init is really not used any more I'll need to move on...
    self.init = function () {

        /* initialize UI for workarea */
        var workarea = context.ui;
        workarea.css({
            'height': '100%'
        });

        workarea.html(scb_ui.main_frame());

        workarea.layout({
            applyDefaultStyles: true,
            north__minSize: 50,
            center__paneSelector: '.inner-center',
            west__paneSelector: '.inner-west',
            east__paneSelector: '.inner-east'
        });

        var sidebar = new scb.Sidebar({
            sections: self.sections,
            session_list: session_list,
            workarea: workarea
        }, context);
        context.sidebar = sidebar;

        /* initialize DASHBOARD tab */
        self.sections.dashboard = new scb.DashboardView({
            workarea: workarea,
            session_list: session_list,
            templates: master_model.templates
        }, context);

        context.dashboard = self.sections.dashboard;
        /* initialize EXPERIMENT SETUP tab */
        self.sections.experiment = new scb.ExperimentView({
            workarea: workarea,
            session_list: session_list,
            templates: master_model.templates
        }, context);
        context.experiment = self.sections.experiment;

        /* initialize MAKING LYSATES tab */
        self.sections.making_lysates = new scb.MakingLysatesView({
            workarea: workarea,
            session_list: session_list,
            templates: master_model.templates
        }, context);
        context.making_lysates = self.sections.making_lysates

        /* initialize WESTERN BLOT tab */
        self.sections.western_blot = new scb.WesternBlotView({
            workarea: workarea,
            session_list: session_list,
            templates: master_model.templates
        }, context);
        context.western_blot = self.sections.western_blot;
        
        /* initialize MICROSCOPY tab */

        self.sections.microscopy = new scb.MicroscopyView({
        	workarea: workarea,
        	session_list: session_list,
        	templates: master_model.templates
        }, context);
        context.microscopy=self.sections.microscopy

        sidebar.show();
        /* click on sidebar to display DASHBOARD */
        $('.sidebar_accordian>h3>.a_accordian_dashboard', workarea).click(function (e) {
            self.current_tab.hide(function () {
                self.sections.dashboard.show(function () {
                    self.current_tab = self.sections.dashboard;
                });
            });
        });
        /* click on sidebar to display EXPERIMENT_SETUP */
        $('.sidebar_accordian>h3>.a_accordian_experiment_setup', workarea).click(function (e) {
            self.current_tab.hide(function () {
                self.sections.experiment.show(function () {
                    self.current_tab = self.sections.experiment;
                });
            })
        });
        /* click on sidebar to display MAKING_LYSATES */
        $('.sidebar_accordian>h3>.a_accordian_making_lysates', workarea).click(function (e) {
            self.current_tab.hide(function () {
                self.sections.making_lysates.show(function () {
                    self.current_tab = self.sections.making_lysates;
                });
            })
        });
        /* click on sidebar to display WESTERN_BLOT */
        $('.sidebar_accordian>h3>.a_accordian_western_blot', workarea).click(function (e) {
            self.current_tab.hide(function () {
                self.sections.western_blot.show(function () {
                    self.current_tab = self.sections.western_blot;
                });
            })
        });
        /* as part of init display DASHBOARD tab */
        self.sections.dashboard.show(function () {
            self.current_tab = self.sections.dashboard;
        });
    };
    /* register with context SHOW_EXPERIMENT event */
    context.register('show_experiment', function () {
        self.current_tab.hide(function () {
            self.sections.experiment.show(function () {
                self.current_tab = self.sections.experiment;
            });
        })
    });
    /* register with context SHOW_MAKING_LYSATES event */
    context.register('show_making_lysates', function () {
        self.current_tab.hide(function () {
            self.sections.making_lysates.show(function () {
                self.current_tab = self.sections.making_lysates;
            });
        })
    });
};
