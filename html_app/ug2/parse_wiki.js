
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
				//bindToggle($(nextN).children('span'));
				$(nextN).children('a').attr('name', 'scb-s-help-sublink-'+counter);
				counter++;
				nextN.style.textIndent = '50px';
				var nextL = nextN.nextElementSibling;
				while(nextL != null && nextL.className!='subheading' && nextL.className!='heading'){
					//nextL.style.marginLeft = '100px';
					//nextL.style.color = 'red';
					//nextL.style.display = 'none';
					var temp = nextL.nextElementSibling;
					$(nextN).append(nextL);
					nextL = temp;
				}
				next = nextN.nextElementSibling;
				$(nextN.previousElementSibling).append(nextN);
			}
			else if((nextN.tagName == 'P' && nextN.previousElementSibling.className =='heading') || nextN.tagName == 'UL' || nextN.tagName == 'OL' || nextN.className == 'SCB-Normal'){
				//nextN.style.display = 'none';
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
	$('.body').prepend('<span class="ug_table_of_contents">Table of Contents</span>');
	
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
	$('.heading span>a').after('&nbsp;');
	$('.body strong').css('color', 'black !important');
});

//toggle visibility of children, not used currently because toggle is made inactive
function bindToggle(item){
	$(item).click(function(){
		$(item).parent().children().toggle();
	});


}

function fixImages(){
		
	$('img[src="../media/uploads/scb_icon_trash.png"]').attr('src', '../../../images/user_guide/scb_ug_trash.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').attr('src', '../../../images/user_guide/scb_ug_envelope.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').attr('src', '../../../images/user_guide/scb_ug_cabinet.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').attr('src', '../../../images/user_guide/scb_ug_book.png');
	$('img[src="../media/uploads/scb_icons_copy.png"]').attr('src', '../../../images/user_guide/scb_ug_copy.png');
	
	//screenshots
	$('img[src="../media/uploads/scb_homepage_-_try_an_experiment.png"]').attr('src', '../../../images/user_guide/scb_homepage_try.png');
	$('img[src="../media/uploads/scb_sign_in_window.png"]').attr('src', '../../../images/user_guide/scb_sign_in.png');
	$('img[src="../media/uploads/scb_sign_up_window.png"]').attr('src', '../../../images/user_guide/scb_sign_up.png');
	$('img[src="../media/uploads/scb_top_menu_bar.png"]').attr('src', '../../../images/user_guide/scb_top_menu_bar.png');
	
	
	$('img[src="../media/uploads/scb_assignments_page_-_usability_test.png"]').attr('src', '../../../images/user_guide/scb_assignments_page_usability_test.png');
	$('img[src="../media/uploads/scb_navigation_tool_bar_-_select_technique_western_blotting_selected.png"]').attr('src', '../../../images/user_guide/scb_nav_toolbar_western.png');
	
	
	$('img[src="../media/uploads/scb_experiments_design_page.png"]').attr('src', '../../../images/user_guide/scb_design.png');
	$('img[src="../media/uploads/scb_setup_page_-_add_multiple_rows_window_with_samples_selected.png"]').attr('src', '../../../images/user_guide/scb_setup_add_multiple_rows.png');
	$('img[src="../media/uploads/scb_setup_page_-_with_samples_in_setup_table-2.png"]').attr('src', '../../../images/user_guide/scb_setup_with_samples.png');
	
	
	$('img[src="../media/uploads/scb_select_techniques_page-2.png"]').attr('src', '../../../images/user_guide/scb_select_techniques.png');
	$('img[src="../media/uploads/scb_experiment_dropdown_menu-2-cropped.png"]').attr('src', '../../../images/user_guide/scb_dropdown_western.png');
	$('img[src="../media/uploads/scb_western_progress_bar.png"]').attr('src', '../../../images/user_guide/scb_western_progress_bar.png');
	$('img[src="../media/uploads/scb_western_sample_prep.png"]').attr('src', '../../../images/user_guide/scb_western_sample_prep.png');
	$('img[src="../media/uploads/scb_western_samples_window.png"]').attr('src', '../../../images/user_guide/scb_western_samples_window.png');
	
	$('img[src="../media/uploads/scb_western_blotting_step.png"]').attr('src', '../../../images/user_guide/scb_western_step.png');
	$('img[src="../media/uploads/scb_western_develop_step.png"]').attr('src', '../../../images/user_guide/scb_western_develop.png');
	$('img[src="../media/uploads/scb_western_protein_measurement_tool_tip-cropped.png"]').attr('src', '../../../images/user_guide/scb_western_protein_tool_tip.png');
	$('img[src="../media/uploads/scb_western_reprobing.png"]').attr('src', '../../../images/user_guide/scb_western_probing.png');
	$('img[src="../media/uploads/scb_experiment_dropdown_menu_-flow-cropped.png"]').attr('src', '../../../images/user_guide/scb_dropdown_flow.png');
	$('img[src="../media/uploads/scb_flow_progress_bar.png"]').attr('src', '../../../images/user_guide/scb_flow_progress.png');
	$('img[src="../media/uploads/scb_flow_sample_prep.png"]').attr('src', '../../../images/user_guide/scb_flow_sample_prep.png');
	$('img[src="../media/uploads/scb_flow_samples_window_and_run_samples_step.png"]').attr('src', '../../../images/user_guide/scb_flow_run_samples.png');
	$('img[src="../media/uploads/scb_flow_analysis_step_with_segments_drawn_-_whole_page.png"]').attr('src', '../../../images/user_guide/scb_flow_analysis.png');
	
	
	
	
}