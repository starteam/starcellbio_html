'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}
scb.ui.static = scb.ui.static || {};
scb.ui.static.HomepageView = scb.ui.static.HomepageView || {} ;

scb.ui.static.HomepageView.select_list_item = function(element,workarea,aria)
{
    var name = 'experimental_design_'+$(element).attr('data-id');
    var template =  scb_homepage[name];
        if( template )
        {
            $('.scb_s_homepage_experimental_design_list_info',workarea).html(template({})).attr('aria-live',aria?'polite':'off');
            $('.scb_s_homepage_experimental_design_bullet_item').removeClass('scb_s_homepage_experimental_design_bullet_item_selected');
            $(element).addClass('scb_s_homepage_experimental_design_bullet_item_selected');

        }
        else
        {
            $('.scb_s_homepage_experimental_design_list_info',workarea).html(" can not found " + name );

        }
}

scb.ui.static.HomepageView.register = function(workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_s_homepage_experimental_design_bullet_item', function (e) {
        scb.ui.static.HomepageView.select_list_item(this,workarea,true);
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_create_instructors_account', function (e) {
        alert( "under construction!");
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_create_student_account', function (e) {
    	$(workarea).append(scb_auth.signup({}));
        //document.location = '/accounts/signup';
        
		scb.utils.off_on(workarea, 'click', '.scb_f_signup_close_button', function () {
			$('.scb_s_signup_dialog').detach();
		});
        $('.iframe').load(function(){

				var iframe = $('.iframe').contents();

				iframe.find(".primaryAction").click(function(){
						   $('.iframe').load(function(){
						   	  var profile = $('.iframe').contents();
						   	  console.log(profile);
						   	  if(profile[0].body.textContent.indexOf('profile') >0){
						   	  	  scb.ui.static.MainFrame.refresh({view: 'profile'});
							   	  }
						   });
					   
					});
			});
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_instructor_resources', function (e) {
        alert( "under construction!");
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_try_an_experiment', function (e) {
        scb.ui.static.MainFrame.clear_NO_PROMPT();
    });

};

scb.ui.HomepageView = function scb_ui_HomepageView(gstate) {
	var self = this;

	self.show = function(state) {
		var workarea = gstate.workarea;
		workarea.html(scb_homepage.main({
			global_template : gstate.context.master_model
		}));
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(),gstate.workarea,false);
        document.title = "Home - StarCellBio";
	}

}