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
                        		//SHLOKA
                        	}
// 							if (state.facs_lane_id && facs) {
// 								var facs_lane = facs.lanes_list.get(state.facs_lane_id)
// 								ret.facs_lane = facs_lane;
// 							}
                        }

                    }
                    else {
                        // if experiment_id is invalid go to assignment
                        alert('Experiment ' + state.experiment_id + ' does not exist.');
                        state.onhashchange = false;
                        state.view = 'assignment';
                        delete state.experiment_id;
                        scb.ui.static.MainFrame.update_hash(state);
                        ret.redisplay = true;
                        ret.redisplay_state = state;
                    }
                }
            }
            else {
                // if assignment_id is invalid go to assignments
                alert('Assignment ' + state.assignment_id + ' does not exist.');
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

    //assignments.selected_id = 'assignment_tufts';
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
    scb.ui.static.ExperimentDesignView.register(workarea);
    scb.ui.static.ExperimentSetupView.register(workarea);
    scb.ui.static.WesternBlotView.register(workarea);
    scb.ui.static.MicroscopyView.register(workarea);
    scb.ui.static.WesternBlotGelView.register(workarea);
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
            alert("Operation canceled!\n If you wanted to clear everything type YES in previous dialog.");
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
        var r = confirm("Delete experiment?");
        if (r) {
            var model_id = scb.Utils.get_attribute($(this), 'experiment_id');
            assignments.selected.experiments.remove(model_id);
            assignments.selected.experiments.selected_id = null;
            self.show({});
        }
    });

    scb.utils.off_on(workarea.parent(), 'click', '.scb_f_login', function (evt) {
        scb.ui.static.MainFrame.ensure_auth_context();
        if (context.auth.logged_in) {
            $(workarea).append(scb_auth.logout({}));
            scb.utils.off_on(workarea, 'click', '.scb_f_logout_close_button', function () {
                $('.scb_s_logout_dialog').detach();
            });
            scb.utils.off_on(workarea, 'click', '.scb_f_logout_button', function () {
                //TODO: here comes the flow with sign-in dialog
                context.auth.logged_in = false;
                scb.ui.static.MainFrame.refresh({view: 'homepage'});
            });
        }
        else {
            $(workarea).append(scb_auth.login({}));
            scb.utils.off_on(workarea, 'click', '.scb_f_login_close_button', function () {
                $('.scb_s_login_dialog').detach();
            });
            scb.utils.off_on(workarea, 'click', '.scb_f_login_button', function () {
                context.auth.logged_in = true;
                scb.ui.static.MainFrame.refresh({view: 'assignments'});
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

    self.sections.assignment = new scb.ui.AssignmentView({
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
                state.assignment_id = assignments.selected_id ? assignments.selected_id : assignments.list[0].id;
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
        if (state.view == 'assignment') {
            if (parsed.assignment) {
                self.sections.assignment.show({
                    workarea: workarea,
                    assignment: parsed.assignment
                });
            }
            else {
                self.show({view: 'assignments'})
            }
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
            //TODO: if no experiment than error
            self.sections.experiment_setup.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                mode: 'readwrite',
                last_view: 'experiment_setup'
            });
        }
        if (state.view == 'experiment_run') {
            self.sections.experiment_setup.show({
                workarea: workarea,
                assignment: parsed.assignment,
                experiment: parsed.experiment,
                mode: 'readonly',
                last_view: 'experiment_run'
            });
        }
        if (state.view == 'facs') {
            if (!parsed.facs) {
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
            if (!parsed.western_blot) {
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
        	if(!parsed.microscopy) {
        		var microscopy = parsed.experiment.microscopy_list.start({});
        		state.microscopy_id=microscopy.id;
        		var History = window.History;
        		if (History.enabled){
        			History.replaceState("New MICRO", "New MICRO", '#' + $.param(state));
        		}
        		state.onhashchange.true;
        		self.show(state);
        		return;
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
                alert("Experiment does not exist");
                if (parsed.assignment) {
                    self.show({
                        view: 'assignment',
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

//		var assignment = assignments.selected;
//		if(assignment == null) {
////			self.sections.assignments.show();
//		} else if( master_model.ui.view == 'assignments')
//        {
//            $.bbq.pushState({
//                view: master_model.ui.view
//            });
////            self.sections.assignments.show();
//        }
//        else {
//			// var sidebar = new scb.Sidebar({
//			// sections : self.sections,
//			// assignment : assignment,
//			// workarea : workarea,
//			// }, context);
//			// context.sidebar = sidebar;
//
//			self.sections.workarea.show({
//				assignment : assignment,
//				template : context.template
//				//	sidebar:sidebar,
//			});
//
//		}
        if (context.auth && context.auth.logged_in) {
            $('.scb_s_login_status').attr('src', 'images/header/scb_signout_text.png');
        }

        scb.ui.static.MainFrame.in_ajax_display();

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
            //$('.sidebar_accordian>.accordian_experiment_setup', workarea).html("exp set " + new Date());
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
