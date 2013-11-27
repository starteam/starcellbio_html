'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}
scb.ui.static = scb.ui.static || {};
scb.ui.static.HomepageView = scb.ui.static.HomepageView || {} ;

scb.ui.static.HomepageView.select_list_item = function(element,workarea,aria)
{
	$('.learn_more_dynamic').attr('value', $(element).attr('value'));
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
	
	
    scb.utils.off_on(workarea, 'click', '.learn_more_dynamic', function (e) {
    	var pop_string = $(this).attr('value');
		var popoutWindow =window.open("static/ref_lib/full_library.html#"+pop_string);
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#"+pop_string; },50);

    });
    
    
    scb.utils.off_on(workarea, 'click', '.learn_more_western_blot', function (e) {
		var popoutWindow =window.open("static/ref_lib/full_library.html#WesternBlotting");
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#WesternBlotting"; },50);

    });
    
    
    scb.utils.off_on(workarea, 'click', '.learn_more_facs', function (e) {
    	var popoutWindow =window.open("static/ref_lib/full_library.html#FlowCytometry");
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#FlowCytometry"; },50);

    });
    
    scb.utils.off_on(workarea, 'click', '.learn_more_microscopy', function (e) {
        var popoutWindow =window.open("static/ref_lib/full_library.html#Microscopy");
		setTimeout( function(){popoutWindow.location = "static/ref_lib/full_library.html#Microscopy"; },50);

    });

	scb.utils.off_on(workarea, 'click', '.scb_s_homepage_see_more_button', function (e) {
       	alert( "under construction!");
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_create_instructors_account', function (e) {
        alert( "under construction!");
    });
	
	scb.utils.off_on(workarea, 'click', '.scb_f_contact', function (e){
		
		scb.utils.off_on(workarea, 'click', '.scb_f_contact_close_button', function () {
			$('.scb_s_contact_dialog').detach();
			
			$('.scb_f_contact_submit_button').submit(function(){
				scb_ui.static.MainFrame.refresh();
			});
		});
	});
	
    scb.utils.off_on(workarea, 'click', '.scb_f_create_student_account', function (e) {
    	$(workarea).append(scb_auth.signup({}));
        //document.location = '/accounts/signup';
        
		scb.utils.off_on(workarea, 'click', '.scb_f_signup_close_button', function () {
			$('.scb_s_signup_dialog').detach();
		});
       $('.iframe').load(function(){
				var iframe = document.getElementsByTagName('iframe')[0];
				var content = (iframe.contentDocument || iframe.contentWindow);
				content.body.style.fontSize = '90%';
				content.body.style.fontFamily = "sourcesanspro-bold, Trebuchet MS, Helvetica, Arial, Verdana, sans-serif";
			    var inputs = content.getElementsByTagName('button');
 				$(inputs).css('font-family', 'Trebuchet MS, sans-serif');
				var fieldset = content.querySelectorAll('fieldset');
				$(fieldset).children().wrap('<p></p>');
				var texts = content.querySelectorAll('input');
				$(texts).attr('placeholder', '');
				$(texts).css('font-family', 'Trebuchet MS, sans-serif');
				
				var iframe = $('.iframe').contents();
				iframe.find('input[type="checkbox"]').css('height', '12px');
				iframe.find('a:contains("member")').click(function(){
					$('.iframe').load(function(){
						
						$('.scb_s_login_form > div').text('SIGN UP');
					});
				});
				iframe.find('a:contains("Password")').click(function(){
					$('.iframe').load(function(){
						
						$('.scb_s_login_form > div').text('RESET PASSWORD');
					});
				});
				
				iframe.find('a:contains("Back")').click(function(){
					$('.iframe').load(function(){
						
						$('.scb_s_login_form > div').text('SIGN IN');
					});
				});
				
				iframe.find(".primaryAction").click(function(){
						   $('.iframe').load(function(){
						   	  var profile = $('.iframe').contents();
						   	  //console.log(profile);
						   	  if(profile[0].body.textContent.indexOf('profile') >0){
						   	  	  parent.document.location.reload();
							   	  }
						   });
					});
			});
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_instructor_resources', function (e) {
        alert( "under construction!");
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_try_an_experiment', function (e) {
        //scb.ui.static.MainFrame.clear_NO_PROMPT();
    });

};

scb.ui.HomepageView = function scb_ui_HomepageView(gstate) {
	var self = this;
	self.show = function(state) {
		var workarea = gstate.workarea;
		workarea.html(scb_homepage.main({
			global_template : gstate.context.master_model,
			context: gstate.context
		}));
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(),gstate.workarea,false);
        document.title = "Home - StarCellBio";
	}

}