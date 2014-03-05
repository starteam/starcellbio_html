function getUG(){
$.get( "user_guide.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	document.body.innerHTML = data;
	
	document.body.innerHTML= document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, "");
	$('.header-small').remove();
	$('.related').remove();
	$('.footer').remove();
	$('.sphinxsidebar').remove();
	$('.SCB-Heading1Allcaps:contains("")').each(function() {
    	if(this.textContent== "")
    		$(this).remove();
	});
	var main_headers = $('.SCB-Heading1Allcaps');
	$(main_headers).wrap('<div class="heading"><a></a></div>');
	var subheaders = $('.SCB-Heading1');
	var lists = $('ul');
	$(subheaders).wrap('<div class = "subheading"><a></a></div>');
	
	
	main_headers = $('.heading');
	subheaders = $('.subheading');
	
	
	//first attach everything to headings
	var counter = 1;
	for (var y=0; y<main_headers.length; y++){
		var nextN = main_headers[y].nextElementSibling;
		$(main_headers[y]).children('a').attr('name', 'scb-s-main-section-'+y); 
		//bindToggle($(main_headers[y]).children('span'));
		while(nextN!=null && nextN.className!='heading'){
			var next = nextN.nextElementSibling;
			if(nextN.className =='subheading'){
				$(nextN).children('a').attr('name', 'scb-s-help-sublink-'+counter);
				counter++;
				nextN.style.textIndent = '50px';
				var nextL = nextN.nextElementSibling;
				while(nextL != null && nextL.className!='subheading' && nextL.className!='heading'){
					var temp = nextL.nextElementSibling;
					$(nextN).append(nextL);
					nextL = temp;
				}
				next = nextN.nextElementSibling;
				$(nextN.previousElementSibling).append(nextN);
			}
			else if((nextN.tagName == 'P' && nextN.previousElementSibling.className =='heading') || nextN.tagName == 'UL' || nextN.tagName == 'OL' || nextN.className == 'SCB-Normal'){
				$(nextN.previousElementSibling).append(nextN);
			}
			nextN=next;
		
		}
	}
	


	
	$('.heading').clone().prependTo('.body').attr('class', 'title');
	$('.title').children('.subheading').children('ul').remove();
	$('.title').children('p').remove();
	$('.title').children('ol').remove();
	$('.title').children('.subheading').children('p').remove();
	$('.title').children('ul').remove()
	$('.title > .subheading').attr('class', 'subtitle');
	$('.subtitle > a').each(function(){  $(this).html($(this).text());});
	$('.title > .SCB-Normal').remove();
	$('.body').prepend('<span class="ug_table_of_contents">Table of Contents</span><p/>');
	
	$('.title > a').each(function(){
		$(this).attr('href', '#' +$(this).attr('name')); 
		$(this).attr('name', '');
	});
	
	$('.subtitle > a').each(function(){
		$(this).attr('href', '#'+$(this).attr('name')); 
		$(this).attr('name', '');
	});
	
	
	
	var back_to_top= document.createElement('a');
	back_to_top.href = "#";
	back_to_top.className = "back_to_top";
	back_to_top.style.color = 'blue';
	back_to_top.innerHTML='Back to Top<br/><br/>';
	$('.heading').append(back_to_top);
	$('.subheading').append(back_to_top);
	$('.heading >.subheading').parent().children('.back_to_top').remove();
	var divider = document.createElement('span')
	divider.className = 'ug_dividing_line';
	$('.subheading').append(divider);
	$('.heading').append(divider);
	fixImages();
	$($('.title')[6]).after('<br/><div class="dividing_line"></div>');
	
	$('.body strong').append('&nbsp;');
	$('.SCB-Heading1Allcaps strong').css('color','#316f94');
	$('.SCB-Heading1 span').css('color', '#316f94');
	$('.subheading').children().not('a').find('strong').prepend('&nbsp;');
	$('.heading span>a').after('&nbsp;');
	$('.body strong').css('color', 'black !important');
	$('.body').prepend('<span class="ug_main_title">User Guide</span><br/>');

	$('a[href="#scb-s-help-sublink-23"]').next().remove();
	var x = window.location.hash; 
	window.location.hash = ''; 
	setTimeout( function() { window.location.hash = x ;} , 20); 
}).done(function() { window.hash = window.location.hash});
}
//toggle visibility of children, not used currently because toggle is made inactive
function bindToggle(item){
	$(item).click(function(){
		$(item).parent().children().toggle();
	});


}

function fixImages(){
	$('img[src="../media/uploads/starcellbio/scb_icon_trash.png"]').addClass('resize_icon_popout');
	$('img[src="../media/uploads/starcellbio/scb_icon_trash.png"]').attr('src', '../../../images/user_guide/scb_ug_trash.png');
	
	$('img[src="../media/uploads/starcellbio/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').addClass('resize_icon_popout');
	$('img[src="../media/uploads/starcellbio/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').attr('src', '../../../images/user_guide/scb_ug_envelope.png');
			
	$('img[src="../media/uploads/starcellbio/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').addClass('resize_icon_popout');
	$('img[src="../media/uploads/starcellbio/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').attr('src', '../../../images/user_guide/scb_ug_cabinet.png');
	
	$('img[src="../media/uploads/starcellbio/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').addClass('resize_icon_popout');
	$('img[src="../media/uploads/starcellbio/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').attr('src', '../../../images/user_guide/scb_ug_book.png');
	
	$('img[src="../media/uploads/starcellbio/scb_icons_copy.png"]').addClass('resize_icon_popout');
	$('img[src="../media/uploads/starcellbio/scb_icons_copy.png"]').attr('src', '../../../images/user_guide/scb_ug_copy.png');
	
	//screenshots
	$('img[src="../media/uploads/starcellbio/scb_homepage_.png"]').attr('src', '../../../images/user_guide/SCB_Homepage.png');
	
	$('img[src="../media/uploads/starcellbio/scb_sign_in_window_.png"]').attr('src', '../../../images/user_guide/SCB_Sign_In_Window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_sign_up_window_.png"]').attr('src', '../../../images/user_guide/SCB_Sign_Up_Window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_top_menu_bar_.png"]').attr('src', '../../../images/user_guide/SCB_Top_Menu_bar.png');
	
	$('img[src="../media/uploads/starcellbio/scb_assignments_page_-_usability_test_.png"]').attr('src', '../../../images/user_guide/SCB_Assignments_Page_-_Usability_Test.png');
	
	$('img[src="../media/uploads/starcellbio/scb_navigation_-_microscopy_active.png"]').attr('src', '../../../images/user_guide/SCB_Navigation_-_Microscopy_active.png');
	
	$('img[src="../media/uploads/starcellbio/scb_experiments_design_page_.png"]').attr('src', '../../../images/user_guide/SCB_Experiments_Design_Page.png');
	
	$('img[src="../media/uploads/starcellbio/scb_add_samples_window_-_samples_selected.png"]').attr('src', '../../../images/user_guide/SCB_Add_Samples_window_-_samples_selected.png');
	
	$('img[src="../media/uploads/starcellbio/scb_setup_page.png"]').attr('src', '../../../images/user_guide/SCB_Setup_Page.png');
	
	$('img[src="../media/uploads/starcellbio/scb_confirm_set-up_window.png"]').attr('src', '../../../images/user_guide/SCB_Confirm_Set-up_window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_select_techniques_page.png"]').attr('src', '../../../images/user_guide/SCB_Select_Techniques_page.png');
	
	$('img[src="../media/uploads/starcellbio/scb_experiment_dropdown_menu_-_western_-_cropped__.png"]').attr('src', '../../../images/user_guide/SCB_Experiment_dropdown_menu_-_western_-_cropped.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_sample_prep.png"]').attr('src', '../../../images/user_guide/SCB_Western_Sample_prep.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_sample_prep_-_option_2.png"]').attr('src', '../../../images/user_guide/SCB_Western_Sample_Prep_-_Option_2.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_samples_window_.png"]').attr('src', '../../../images/user_guide/SCB_Western_Samples_window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_samples_window_-_marker_added_and_re-ordered.png"]').attr('src', '../../../images/user_guide/SCB_Western_Samples_window_-_Marker_added_and_re-ordered.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_load.png"]').attr('src', '../../../images/user_guide/SCB_Western_load1.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_blot_cropped.png"]').attr('src', '../../../images/user_guide/SCB_Western_blot_cropped.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_develop.png"]').attr('src', '../../../images/user_guide/SCB_Western_Develop.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_protein_measurement_tool_tip_-_cropped_-_small_tabbed_window_.png"]').attr('src', '../../../images/user_guide/SCB_Western_protein_measurement_tool_tip_-_cropped_-_small_tabbed_window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_western_reprobing_-_small_tabbed_window_.png"]').attr('src', '../../../images/user_guide/SCB_Western_reprobing_-_small_tabbed_window1.png');
	
	$('img[src="../media/uploads/starcellbio/scb_flow_sample_prep_-_2.png"]').attr('src', '../../../images/user_guide/SCB_Flow_Sample_Prep_-_2.png');
	
	$('img[src="../media/uploads/starcellbio/scb_flow_sample_prep_-_samples_selected.png"]').attr('src', '../../../images/user_guide/SCB_Flow_Sample_Prep_-_samples_selected.png');
	
	$('img[src="../media/uploads/starcellbio/scb_flow_samples_window.png"]').attr('src', '../../../images/user_guide/SCB_Flow_Samples_window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_flow_analyze_-_large_tabbed_window.png"]').attr('src', '../../../images/user_guide/SCB_Flow_Analyze_-_large_tabbed_window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_flow_analysis_tool.png"]').attr('src', '../../../images/user_guide/SCB_Flow_Analysis_Tool.png');
	
	$('img[src="../media/uploads/starcellbio/scb_select_techniques_page_-_microscopy_available.png"]').attr('src', '../../../images/user_guide/SCB_Select_Techniques_Page_-_microscopy_available.png');
	
	$('img[src="../media/uploads/starcellbio/scb_microscopy_sample_prep_page_-_large_tabbed_window.png"]').attr('src', '../../../images/user_guide/SCB_Microscopy_Sample_Prep_page_-_large_tabbed_window.png');
	
	$('img[src="../media/uploads/starcellbio/scb_microscopy_sample_prep_page_-_samples_selected_-_whole_page.png"]').attr('src', '../../../images/user_guide/SCB_Microscopy_Sample_Prep_page_-_samples_selected_-_whole_page.png');
	
	$('img[src="../media/uploads/starcellbio/scb_microscopy_analyze_-_with_note.png"]').attr('src', '../../../images/user_guide/SCB_Microscopy_Analyze_-_with_note.png');
	
	$('img[src="../media/uploads/starcellbio/scb_microscopy_small_tabbed_window_only.png"]').attr('src', '../../../images/user_guide/SCB_Microscopy_small_tabbed_window_only.png');


}