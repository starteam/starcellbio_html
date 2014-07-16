'use strict';
// this is first thing executed (after JQuery, thus I can setup workspaces here...)

var console = console || {
    info: function () {
    },
    log: function (){
    }
};
var scb = scb || {};

function starcellbio(jquery_selector_main, master_model) {
    try {
        var workarea = $(jquery_selector_main);
        //TODO: index should use approprate master model, at this stage I'll just user window.master_model as a starting point.
        // master model is JSON creature, context is JavaScript creature; thus master_model needs to be savable, whereas context will not be.
        var master_model_local = JSON.parse(localStorage.getItem("scb_master_model"));
        if( master_model_local )
        {
            master_model = master_model_local;
        }
        
        
        if(get_user_result.account_type == '' || get_user_result.account_type == 'student'){
        $.ajax({
			type: "GET",
			url: '../scb/get_student_courses.js',
		}).done(function() {
			get_student_courses_result.list = fix_assignment_models(get_student_courses_result.list);
		   	master_model.assignments = get_student_courses_result;
			var init_model = master_model.assignments ? master_model : master_model_data;
			window.master_model = init_model;
			for (var i in init_model.assignments.list) {
				if (_.keys(init_model.assignments.list[i].template).length == 0) {
					init_model.assignments.list[i].template = MASTER_TEMPLATE;
				}
			}
			scb.Utils.initialize_field(init_model, 'templates', [MASTER_TEMPLATE]);
			scb.Utils.initialize_field(init_model, 'sessions', {});

			var context = new scb.Context();
			context.ui = workarea;
			context.master_model = init_model;

			window.master_context = context;

			scb.Utils.initialize_field(context, 'js_model', {});
			scb.utils.accessor2_custom(context, 'template', function () {
				return context.js_model.current_assignment.template;
			}, scb.utils.read_only_exception);
			var main_frame = new scb.ui.MainFrame(init_model, context);
		});
        	
        }
        else if(get_user_result.account_type == 'instructor'){
        	 $.ajax({
			type: "GET",
			url: '../scb/get_instructor_assignments.js',
			}).done(function() {
				get_instructor_assignments_result.view_list = fix_assignment_models(get_instructor_assignments_result.list);
				var assignment = null;
				var new_assignments_list = []
				 _.each(get_instructor_assignments_result.list, function (e) {
				 	if(e.access == 'Public'){
						e.data.permission = 'Public';
						e.data.operation = 'view';
						e.data.students = e.students;
						new_assignments_list.push(e.data);
				 	}
				 	else if(e.access == 'Private'){
						e.data.permission = 'Private';
						e.data.operation = 'edit';
						e.data.students = e.students;
						new_assignments_list.push(e.data);
				 	}
				 	else if(e.access == 'Archived'){
						e.data.permission = 'Archived';
						e.data.operation = 'view';
						e.data.students = e.students;
						new_assignments_list.push(e.data);
				 	}
				});
				get_instructor_assignments_result.list= new_assignments_list;

				master_model.assignments = get_instructor_assignments_result;
				
				var init_model = master_model.assignments ? master_model : master_model_data;
				window.master_model = init_model;
				for (var i in init_model.assignments.list) {
					if (_.keys(init_model.assignments.list[i].template).length == 0) {
						init_model.assignments.list[i].template = MASTER_TEMPLATE;
					}
				}
				scb.Utils.initialize_field(init_model, 'templates', [MASTER_TEMPLATE]);
				scb.Utils.initialize_field(init_model, 'sessions', {});

				var context = new scb.Context();
				context.ui = workarea;
				context.master_model = init_model;

				window.master_context = context;

				scb.Utils.initialize_field(context, 'js_model', {});
				scb.utils.accessor2_custom(context, 'template', function () {
					return context.js_model.current_assignment.template;
				}, scb.utils.read_only_exception);
				var main_frame = new scb.ui.InstructorFrame(init_model, context);
			});
        }
       
    } catch (err) {
        if (document.documentMode < 9) {
            alert("Only IE9+, Safari 5+, Chromium and Firefox 10+ are supported, please upgrade your browser ");
        }
        alert("Unable to run due to an error: " + err);
    }
}

scb.Context = function scb_Context() {
    var self = this;

    self['_event_map'] = {};

    self.register = function (name, fn) {
        scb.Utils.initialize_field(self['_event_map'], name, []);
        self['_event_map'][name].push(fn);
    }

    self.unregister = function (name, fn) {
        scb.Utils.initialize_field(self['_event_map'], name, []);
        console.info("UNREGISTER NOT YET IMPLEMENTED");
    }

    self.invoke = function (name) {
        scb.Utils.initialize_field(self['_event_map'], name, []);
        var array = self['_event_map'][name];
        for (var i in array) {
            var fn = array[i];
            fn();
        }
    }

    self.fire = self.invoke;
}