'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}
scb.ui.static = scb.ui.static || {};
scb.ui.static.HomepageView = scb.ui.static.HomepageView || {} ;
scb.ui.static.HomepageView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_s_homepage_experimental_design_bullet_item', function (e) {
        var name = 'experimental_design_'+$(this).attr('data-id');
        var template =  scb_homepage[name];
            if( template )
            {
                $('.scb_s_homepage_experimental_design_list_info',workarea).html(template({}));
            }
            else
            {
                $('.scb_s_homepage_experimental_design_list_info',workarea).html(" can not found " + name );

            }
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_create_instructors_account', function (e) {
        alert( "under construction!");
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_create_student_account', function (e) {
        alert( "under construction!");
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_instructor_resources', function (e) {
        alert( "under construction!");
    });

};

scb.ui.HomepageView = function scb_ui_HomepageView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = gstate.workarea;
		workarea.html(scb_homepage.main({
			global_template : gstate.context.master_model
		}));
	}

}