'use strict';

if( typeof (scb.ui ) == 'undefined') {
	scb.ui = {};
}
scb.ui.static = scb.ui.static || {};
scb.ui.static.HomepageView = scb.ui.static.HomepageView || {} ;

scb.ui.static.HomepageView.select_list_item = function(element,workarea,aria)
{
	$('.learn_more_dynamic').attr('value', $(element).attr('value'));
	$('.scb_s_homepage_experimental_design_bullet_item').attr('aria-selected', false);
	$(element).attr('aria-selected', true);
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
    	var url = "static/ref_lib/full_library.html#"+pop_string;
		var popoutWindow =window.open("static/ref_lib/full_library.html#"+pop_string);

    });
    
    scb.utils.off_on(workarea, 'click', '.scb_f_create_student_account', function (e) {
    		
            $(workarea).append(scb_auth.signup({}));
            scb.utils.off_on(workarea, 'click', '.scb_f_signup_close_button', function () {
                $('.scb_s_signup_dialog').detach();
            });
            $('.scb_f_signup_iframe').load(function(){
				var iframe = $('.scb_f_signup_iframe').get(0);
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
				
				var iframe = $('.scb_f_signup_iframe').contents();
				iframe.find('input[type="checkbox"]').css('height', '12px');
				iframe.find('input[type="radio"][value="student"]').attr('checked', 'checked');
				
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
							
						   $('.scb_f_signup_iframe').hide();
						   $('.scb_f_signup_iframe').load(function(){
						   	  var profile = $('.scb_f_signup_iframe').contents().get(0);
						   	  if(profile.body.textContent.indexOf('confirmed') >0){
						   	  	  parent.document.location.reload();
									
							   	  }
							   	  
							   	  else{
							   	 		 $(mask).remove();
							   	  	   $('.scb_f_signup_iframe').show();
							   	  	   if($('.scb_f_signup_iframe').contents().find('.login_submit').length >0)
							   	  	   	$('.scb_f_signup_iframe').contents().find('#errorMsg').html('Incorrect username or password. Try again');
							   	  	   
							   	  }
						   });
					});
			});
        
    });



	scb.utils.off_on(workarea, 'click', '.scb_s_homepage_see_more_button', function (e) {
       	alert( "under construction!");
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_create_instructors_account', function (e) {
        
    		
            $(workarea).append(scb_auth.signup({}));
            scb.utils.off_on(workarea, 'click', '.scb_f_signup_close_button', function () {
                $('.scb_s_signup_dialog').detach();
            });
            $('.scb_f_signup_iframe').load(function(){
            	
				var iframe = $('.scb_f_signup_iframe').get(0);
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
				
				var iframe = $('.scb_f_signup_iframe').contents();
				iframe.find('input[type="checkbox"]').css('height', '12px');
				iframe.find('input[type="radio"][value="instructor"]').attr('checked', 'checked');
				iframe.find('#div_id_course_code').css('display', 'none');
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
							
						   $('.scb_f_signup_iframe').hide();
						   $('.scb_f_signup_iframe').load(function(){
						   	  var profile = $('.scb_f_signup_iframe').contents().get(0);
						   	  if(profile.body.textContent.indexOf('confirmed') >0){
						   	  	  parent.document.location.reload();
									
							   	  }
							   	  
							   	  else{
							   	 		 $(mask).remove();
							   	  	   $('.scb_f_signup_iframe').show();
							   	  	   if($('.scb_f_signup_iframe').contents().find('.login_submit').length >0)
							   	  	   	$('.scb_f_signup_iframe').contents().find('#errorMsg').html('Incorrect username or password. Try again');
							   	  	   
							   	  }
						   });
					});
			});
        
    
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
			global_template : gstate.context.master_model,
			context: gstate.context
		}));
        scb.ui.static.HomepageView.select_list_item($('.scb_s_homepage_experimental_design_bullet_item').first(),gstate.workarea,false);
        document.title = "Home - StarCellBio";
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

function inConstructionError(){
				$('html').css('overflow', 'hidden');
				$('body').prepend(scb_experiment_setup.general_error_overlay());

				$.jqDialog.alert("In Construction", 
					function() {	
							$('html').css('overflow', 'visible');
							$('.error_overlay').remove();
							scb.ui.static.MainFrame.refresh();
					/* callback function for 'OK' button*/ });
				$('.jqDialog_header').remove();		
				$('#jqDialog_box').prepend(scb_experiment_setup.experiment_error());
				$('#jqDialog_box').attr('role', 'alertdialog');
				return;
}