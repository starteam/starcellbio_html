//'use strict';

scb.ui = scb.ui || {};

scb.ui.MainFrame = function scb_ui_MainFrame(master_model, context) {
    var self = this;
    context.main_frame = self;
    self.sections = {};

    var assignments = new scb.AssignmentList(master_model.assignments, context);

    //assignments.selected_id = 'assignment_tufts';
    //TODO: DEBUG REMOVE
    window._assigments = assignments;

    self.current_tab = {
        hide:scb.Utils.noop,
        show:scb.Utils.noop
    };

    var workarea = context.ui;
    workarea.css({
        'height':'100%'
    });

    scb.utils.off_on(workarea, 'click', '.save_master_model', function () {
        var tmp;
        try {
        tmp = assignments.selected.experiments.selected_id;
        }catch(ex){}
        try {
            assignment.selected.experiments.selected_id = null;
        } catch (ex) {
        }
        localStorage.setItem("scb_master_model", JSON.stringify(master_model));
        try {
            assignment.experiments.selected_id = tmp;
        } catch (ex) {
        }
        alert("Save");
    });

    scb.utils.off_on(workarea, 'click', '.load_master_model', function () {
        var master_model = JSON.parse(localStorage.getItem("scb_master_model"));
        master_model_data = master_model;
        starcellbio(context.ui, master_model);
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

    self.sections.assignments = new scb.ui.AssignmentsView({
        workarea:workarea,
        context:context
    });

    self.sections.assignment = new scb.ui.AssignmentView({
        workarea:workarea,
        context:context
    });

    self.sections.workarea = new scb.ui.WorkspaceView({
        workarea:workarea,
        context:context
    })

    self.update_hash = function (state) {
        if (!state.onhashchange) {
            $.bbq.pushState(state, 2);
        }
    }
    self.show = function (state) {
        state = state || {
            view:'assignments'
        }
        console.info(JSON.stringify(state));

        if (state.view == 'assignments') {
            assignments.selected_id = state.assignment_id ? state.assignment_id : null;
            self.update_hash(state);
            self.sections.assignments.show({
                workarea: workarea,
                assignments:assignments
            });
        }
        if (state.view == 'assignment') {
            self.update_hash(state);
            assignments.selected_id = state.assignment_id ? state.assignment_id : null;
            self.sections.assignment.show({
                workarea:workarea,
                assignment:assignments.selected,
                template:context.template
            });
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
    }

    $(window).bind('hashchange', function (e) {
        var state = $.deparam(location.hash.replace(/^#/, ''), true);
        state.onhashchange = true;
        state.view = state.view || 'assignments';
        self.show(state);
    });

    (function () {
        var state = $.deparam(location.hash.replace(/^#/, ''), true);
        state.onhashchange = true;
        state.view = state.view || 'assignments';
        self.show(state);
    })();

    // init is really not used any more I'll need to move on...
    self.init = function () {

        /* initialize UI for workarea */
        var workarea = context.ui;
        workarea.css({
            'height':'100%'
        });

        workarea.html(scb_ui.main_frame());

        workarea.layout({
            applyDefaultStyles:true,
            north__minSize:50,
            center__paneSelector:'.inner-center',
            west__paneSelector:'.inner-west',
            east__paneSelector:'.inner-east'
        });

        var sidebar = new scb.Sidebar({
            sections:self.sections,
            session_list:session_list,
            workarea:workarea
        }, context);
        context.sidebar = sidebar;

        /* initialize DASHBOARD tab */
        self.sections.dashboard = new scb.DashboardView({
            workarea:workarea,
            session_list:session_list,
            templates:master_model.templates
        }, context);

        context.dashboard = self.sections.dashboard;
        /* initialize EXPERIMENT SETUP tab */
        self.sections.experiment = new scb.ExperimentView({
            workarea:workarea,
            session_list:session_list,
            templates:master_model.templates
        }, context);
        context.experiment = self.sections.experiment;

        /* initialize MAKING LYSATES tab */
        self.sections.making_lysates = new scb.MakingLysatesView({
            workarea:workarea,
            session_list:session_list,
            templates:master_model.templates
        }, context);
        context.making_lysates = self.sections.making_lysates

        /* initialize WESTERN BLOT tab */
        self.sections.western_blot = new scb.WesternBlotView({
            workarea:workarea,
            session_list:session_list,
            templates:master_model.templates
        }, context);
        context.western_blot = self.sections.western_blot;

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
