//hide the native search bar
$('.scb_f_help_search_bar').hide();
var total=0;
$('.scb_s_ug_home').hide();
last_element_offset = 0;

//function to redirect popout link to the new page, NOT USED, code redone in MainFrame for new handler
function popoutGuide(){
	var popout_string = "";
	var visible=	$('.scb_s_section_inactive:visible');
	if(visible.length ==1)
	{	
		if($(visible).attr('class') == 'scb_s_section_inactive')
			popout_string = $('*:visible').closest('.scb_s_help_sublink').attr('class').split(' ')[1];
		else
			popout_string = $(visible).attr('class');
	}
	else{
		popout_string = $($('span:visible')[0]).attr('class');
	}
	
	popout_string = popout_string.replace(/_/g, '-');
	if($('.scb_s_section_inactive').length ==0)
		popout_string =="";
	var popoutWindow =window.open("full_guide.html#"+popout_string);
	//the timeout is needed, because the javascript has to load first, 
	//and then you can use the hash to the anchor
	
}


//This sets up the user guide
$.get( "/static/ug2/user_guide.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	var body = htmlObject.getElementsByClassName("body")[0];
	var links = body.getElementsByClassName('SCB-Heading1Allcaps');
	
	var sublinks = [];
	var number = 0;
	//Go through all headings and begin parsing, sublinks and sections, and creating wrappers
	for(var i=0; i<links.length; i++){
		var text = "";
		var next = links[i].nextSibling;
		while(next != null && (next.nodeName == '#text' || next.className !="SCB-Heading1Allcaps")){
			if(next.nodeName == '#text'){
			}
			else{
				if(next.className !="SCB-Heading1")
					text= text + $(next).html();
				else{
					text = text + '&#9;<div class="scb_s_help_sublink"><span class="scb_s_section_active">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>' + next.innerHTML.trim()+'</span></span><br/></div>';}
			}
			next = next.nextSibling;
			
		}
		
		var lnk = document.createElement('span');
		lnk.className = 'scb_s_main_help_link';
		lnk.style.textTransform = 'uppercase';
		lnk.innerHTML = '<p class="scb_s_section_active"><span  class="scb_s_main_section_'+i+'">'+$(links[i]).text()+"</span></p>" + "<p/>";
		var div = document.createElement('div');
		div.className = 'scb_s_help_section scb_s_help_section_'+i;
		if(i==6 || i==7){
			console.log(text);
		}
		div.innerHTML = text;
		
		
		
		var y = 0;		
		 while(y < div.childNodes.length){
			if(div.childNodes[y].nodeName == '#text' ||(!div.childNodes[y].style && i!=6 && i!=7)){
				$(div.childNodes[y]).wrap('<span></span>');
			}
				
			else if(div.childNodes[y].className=='scb_s_help_sublink'){
				number = number+1;
				$(div.childNodes[y]).addClass('scb_s_help_sublink_' + number);
				var nextC = div.childNodes[y].nextElementSibling;
				while(nextC !=null && nextC.className !="scb_s_help_sublink"){
					$(nextC).addClass('scb_s_help_sub_section_'+number);
					$(nextC).addClass('special');
					$(nextC).append('<br/>');
					$(nextC).addClass('scb_s_help_link_' + i);
					
					if($(nextC).prop('tagName')=='SPAN')
						$(nextC).addClass('span_tag');
					else
						$(nextC).addClass('list_tag');
					nextC.style.display = 'none';
					$(div.childNodes[y]).append(nextC);
					nextC = div.childNodes[y].nextElementSibling;
				}
				$(div.childNodes[y]).wrap("<a class='anchors' href='#scb_s_help_sublink_"+number+"'></a>");
			}
			else{
				$(div.childNodes[y]).addClass('scb_s_help_sub_section');
				if($(div.childNodes[y]).prop('tagName')=='SPAN')
					$(div.childNodes[y]).addClass('span_tag');
				else
					$(div.childNodes[y]).addClass('list_tag');
				$(div.childNodes[y]).addClass('special');
				$(div.childNodes[y]).addClass('scb_s_help_link_' + i);
				div.childNodes[y].style.display = 'none';
			}
			y++;

			
		}
		
		$('a').not('.anchors').addClass('intextlink');
		//append the code to the display div
		$('.scb_f_help_display').append(lnk);
		$('.scb_f_help_display').append(div);
		$(lnk).wrap("<a class='anchors' href='#scb_s_main_section_"+i+"'></a>");
		
	}
	$('.scb_f_help_display > span:contains("")').each(function() {
    	if(this.className== "")
    		$(this).remove();
	});
	$('.scb_s_help_section > span:contains("")').each(function() {
    	if(this.className == "")
    		$(this).remove();
	});
	$('.scb_s_help_sublink').append('<br/>')
	$('.scb_s_help_sublink > li').css('margin-left', '35px');
	$('.scb_s_help_section').css('margin-left', '17px');
	
	$('.scb_s_help_sublink').show();
	$('.special').append('<br/>');
	$('.scb_s_help_link_2').append("<br/>");
	
	fixImages();
}); 




//Main function; clear the current state of the user guide and search for terms.
function searchUG(){
	mainUG();
	
	total = 0;
	var counter = 0; 
	var elements = [];
	var search_string = "*"
	if($(".help_search_input").val()=="")
		alert('A phrase was not typed. Please type a value before searching.');
	else{
	var searchTerms = $(".help_search_input").val().trim().split(' ');
	jQuery.expr[':'].contains = function(a, i, m) {
	  return jQuery(a).text().toUpperCase()
		  .indexOf(m[3].toUpperCase()) >= 0;
	};
	for(var x =0; x < searchTerms.length ; x++){
		search_string = search_string+ ":contains('"+searchTerms[x]+"')";
	}
	var list= $(search_string);
	if(list.length == 0)
		$('.scb_display_search_count').text('0 of 0');
		//alert("I\'m sorry we can\'t find that word");
	else{
	
	var list= $(search_string);
	list = $(list).filter('.special')
	var search_sections = [];
	for (var i = 0; i < list.length; i++) {
			elements.push(list[i]);
			var classnames = $(list[i]).attr('class').split(/\s+/);
			for (index = 0; index < classnames.length; index++) {
				if(classnames[index].indexOf('help_link') >0 )
					search_sections.push('scb_s_main_section_' +parseInt(classnames[index].match(/\d+$/)));
				if(classnames[index].indexOf('help_sub_section') >0 )
					search_sections.push('scb_s_help_sublink_' +parseInt(classnames[index].match(/\d+$/)));
			}
			console.log(list[i]);
		
	}
 	search_sections = $.unique(search_sections);
 	$('.scb_s_main_help_link').css('display', 'none');
 	$('.scb_s_help_sublink').hide();
 	for(var i = 0; i < search_sections.length; i++){
 		if($('.'+search_sections[i]).closest('.scb_s_main_help_link').length > 0 )
 			$('.'+search_sections[i]).closest('.scb_s_main_help_link').css('display', 'inline');
 		if($('.'+search_sections[i]).closest('.scb_s_help_sublink').length >0)
 			$('.'+search_sections[i]).closest('.scb_s_help_sublink').show();
 	}
 	console.log(search_sections);

	}
	}
	
}


function hashchange_function(new_hash, anchor_element){
	 if(new_hash.indexOf('scb_s_main_section') > -1){
  		var txt = new_hash.replace("#", "");
  		var ind = txt.match(/\d/g);
  			ind = ind.join("");
  		var item = $('.'+txt, anchor_element).parents('.scb_s_main_help_link');
  		var body = $(anchor_element).parents('body')[0];
  		mainUG(body);
  		if( $('.scb_s_help_section_'+ind, body).children().children().children('li').css('display')=='none' 
  				|| $('.scb_s_help_section_'+ind, body).children().css('display')=='none' 
  				|| $('.scb_s_help_section_'+ind, body).children().children().css('display')=='none' 
  				|| $('.scb_s_help_section_'+ind, body).children('li').css('display')=='none'){
				$(item, body).children().attr('onclick', 'false');
				last_element_offset = $(body).scrollTop();
				if($('.scb_s_help_link_'+ ind, body).css('display') != 'none')
					$('.scb_s_help_link_'+ ind, body).css('display', 'none');
			 	else{
					$('.scb_s_help_link_'+ ind+'.list_tag', body).css('display', 'list-item');
					$('.scb_s_help_link_'+ ind+'.span_tag', body).css('display', 'inline');
				}
				
				$('.scb_s_main_help_link', body).hide();
				$(item).css('display', 'inline');
				$(item).css('cursor', 'pointer');
				$('.scb_s_help_section', body).hide();
				$('.scb_s_help_section_'+ind, body).show();
				$('p', body).attr('class', 'scb_s_section_inactive');
				if($('.scb_f_help_footer', body).length >0)
					$('.scb_f_help_footer', body).remove();
				else{
					var footer = document.createElement('div')
					footer.className = 'scb_f_help_footer';
					footer.innerHTML = "<input type='button' style='color: blue; display:none;' value='Popout' style='float:right;'id='popout' onclick='popoutGuide();'> ";
					footer.style.height = '25px';
					$('.scb_f_help_display', body).append(footer);
					$('.scb_f_help_footer', body).width($('.scb_f_help_search_bar').width() -15);
				}
				$(body).scrollTop(0);
				$('.scb_s_help_section_'+ind +' .scb_s_section_active', body).css('margin-left', '-40px');

			}
			else{
				return;
			}	

  	}
  	else if(new_hash.indexOf('scb_s_help_sublink')>-1){
  			var txt = new_hash.replace("#", "");
  			var ind = txt.match(/\d/g);
  			ind = ind.join("");
  			var item = $('.'+txt, anchor_element);
  			var body = $(anchor_element).parents('body')[0];
  			mainUG(body);
			if($(item, body).children('span').length + $(item, body).children('li').length >1  && $(item, body).parent().children().prev().css('display')=='none'){
						return;
					}
					else{
						last_element_offset = $(body).scrollTop();
						$(item, body).first().children('span').first().attr('class', 'scb_s_section_inactive');
						$(item, body).first().children('span').first().css('margin-left' ,'-23px');

								$('.scb_s_help_sub_section_'+ ind+'.list_tag', body).css('display', 'list-item');
								$('.scb_s_help_sub_section_'+ ind+'.span_tag', body).css('display', 'inline');
						$('.scb_s_main_help_link', body).hide();
						$('.scb_s_help_sublink', body).hide();
						if($(item, body).parent().prev().text().trim() == 'EXPERIMENTS'){
							$(item, body).parent().children('span').hide();
							$(item, body).parent().children('li').hide();
						}
						$(item, body).css('display', 'inline');
						$(item, body).css('cursor', 'pointer');
						if($('.scb_f_help_footer', body).length >0)
							$('.scb_f_help_footer', body).remove();
						else{
							var footer = document.createElement('div')
							footer.className = 'scb_f_help_footer';
							footer.innerHTML = "<input type='button' style='color: blue; display:none;' value='Popout' style='float:right;'id='popout' onclick='popoutGuide();'> ";
							footer.style.height = '25px';
							$('.scb_f_help_display', body).append(footer);
							$('.scb_f_help_footer', body).width($('.scb_f_help_search_bar', body).width() -15);
						}
							$(body).scrollTop(0);
					}
		}
		else if(new_hash != '#' && new_hash != ''){
			var item = $('a[name="'+new_hash.substr(1)+'"]').closest('.scb_s_help_sublink');
			var ind = $(item).attr('class').match(/\d/g).join("");
			var body = $(anchor_element).parents('body')[0];
			mainUG(body);
			console.log(new_hash);
			last_element_offset = $(body).scrollTop();
			$(item, body).first().children('span').first().attr('class', 'scb_s_section_inactive');
			$(item, body).first().children('span').first().css('margin-left' ,'-23px');

					$('.scb_s_help_sub_section_'+ ind+'.list_tag', body).css('display', 'list-item');
					$('.scb_s_help_sub_section_'+ ind+'.span_tag', body).css('display', 'inline');
			$('.scb_s_main_help_link', body).hide();
			$('.scb_s_help_sublink', body).hide();
			if($(item, body).parent().prev().text().trim() == 'EXPERIMENTS'){
				$(item, body).parent().children('span').hide();
				$(item, body).parent().children('li').hide();
			}
			$(item, body).css('display', 'inline');
			$(item, body).css('cursor', 'pointer');
			if($('.scb_f_help_footer', body).length >0)
				$('.scb_f_help_footer', body).remove();
			else{
				var footer = document.createElement('div')
				footer.className = 'scb_f_help_footer';
				footer.innerHTML = "<input type='button' style='color: blue; display:none;' value='Popout' style='float:right;'id='popout' onclick='popoutGuide();'> ";
				footer.style.height = '25px';
				$('.scb_f_help_display', body).append(footer);
				$('.scb_f_help_footer', body).width($('.scb_f_help_search_bar', body).width() -15);
			}
				$(body).scrollTop(0);
		}
	
		else	mainUG();
}

$(window).on('hashchange', function(e) {
	if(e.currentTarget.location.pathname.indexOf('help.html') >0)
	 	hashchange_function(location.hash, $('a[href="'+location.hash+'"]')[0]);
});







//Clears the screen and returns the menu to default view
function mainUG(body){
	$('.help_search_input', body).focus();
	$('.scb_f_help font', body).each(function() {
    	$(this, body).replaceWith($(this, body).text());
	});
	

	$('.scb_s_section_inactive', body).addClass('scb_s_section_active');
	$('.scb_s_section_active', body).css('margin-left', '0px');
	$('.scb_s_section_inactive', body).removeClass('scb_s_section_inactive');
	$('.scb_s_main_help_link', body).css('display', 'inline');
	$('.scb_s_help_sublink >span', body).show();
	$('.special', body).hide();
	$('.scb_s_help_sublink', body).parent().parent().show();
	$('.scb_s_help_sublink', body).show();
	$('.scb_s_main_help_link', body).css('cursor', 'pointer');
	$('.scb_f_help_footer', body).remove();
	//$('.scb_f_help_search_bar').css('position', 'static');
	$('.scb_f_help', body).css('overflow-x', 'hidden');
	$(body).scrollTop(last_element_offset);
	last_element_offset=0;
	
}






function fixImages(){
	$('img[src="../media/uploads/scb_icon_trash.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_icon_trash.png"]').attr('src', '../../../images/user_guide/scb_ug_trash.png');
		
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').addClass('resize_contact');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').attr('src', '../../../images/user_guide/scb_ug_envelope.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').attr('src', '../../../images/user_guide/scb_ug_cabinet.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').attr('src', '../../../images/user_guide/scb_ug_book.png');
	$('img[src="../media/uploads/scb_icons_copy.png"]').addClass('resize_copy');
	$('img[src="../media/uploads/scb_icons_copy.png"]').attr('src', '../../../images/user_guide/scb_ug_copy.png');

	
	//screenshots
	$('img[src="../media/uploads/scb_homepage_-_try_an_experiment.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_homepage_-_try_an_experiment.png"]').attr('src', '../../../images/user_guide/scb_homepage_try.png');
	$('img[src="../media/uploads/scb_sign_in_window.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_sign_in_window.png"]').attr('src', '../../../images/user_guide/scb_sign_in.png');
	$('img[src="../media/uploads/scb_sign_up_window.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_sign_up_window.png"]').attr('src', '../../../images/user_guide/scb_sign_up.png');
	$('img[src="../media/uploads/scb_top_menu_bar.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_top_menu_bar.png"]').attr('src', '../../../images/user_guide/scb_top_menu_bar.png');
	
	$('img[src="../media/uploads/scb_assignments_page_-_usability_test.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_assignments_page_-_usability_test.png"]').attr('src', '../../../images/user_guide/scb_assignments_page_usability_test.png');
	$('img[src="../media/uploads/scb_navigation_tool_bar_-_select_technique_western_blotting_selected.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_navigation_tool_bar_-_select_technique_western_blotting_selected.png"]').attr('src', '../../../images/user_guide/scb_nav_toolbar_western.png');
	
	$('img[src="../media/uploads/scb_experiments_design_page.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_experiments_design_page.png"]').attr('src', '../../../images/user_guide/scb_design.png');
	$('img[src="../media/uploads/scb_setup_page_-_add_multiple_rows_window_with_samples_selected.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_setup_page_-_add_multiple_rows_window_with_samples_selected.png"]').attr('src', '../../../images/user_guide/scb_setup_add_multiple_rows.png');
	$('img[src="../media/uploads/scb_setup_page_-_with_samples_in_setup_table-2.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_setup_page_-_with_samples_in_setup_table-2.png"]').attr('src', '../../../images/user_guide/scb_setup_with_samples.png');
	
	$('img[src="../media/uploads/scb_select_techniques_page-2.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_select_techniques_page-2.png"]').attr('src', '../../../images/user_guide/scb_select_techniques.png');
	$('img[src="../media/uploads/scb_experiment_dropdown_menu-2-cropped.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_experiment_dropdown_menu-2-cropped.png"]').attr('src', '../../../images/user_guide/scb_dropdown_western.png');
	$('img[src="../media/uploads/scb_western_progress_bar.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_progress_bar.png"]').attr('src', '../../../images/user_guide/scb_western_progress_bar.png');
	$('img[src="../media/uploads/scb_western_sample_prep.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_sample_prep.png"]').attr('src', '../../../images/user_guide/scb_western_sample_prep.png');
	$('img[src="../media/uploads/scb_western_samples_window.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_samples_window.png"]').attr('src', '../../../images/user_guide/scb_western_samples_window.png');
	
	$('img[src="../media/uploads/scb_western_blotting_step.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_blotting_step.png"]').attr('src', '../../../images/user_guide/scb_western_step.png');
	$('img[src="../media/uploads/scb_western_develop_step.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_develop_step.png"]').attr('src', '../../../images/user_guide/scb_western_develop.png');
	$('img[src="../media/uploads/scb_western_protein_measurement_tool_tip-cropped.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_protein_measurement_tool_tip-cropped.png"]').attr('src', '../../../images/user_guide/scb_western_protein_tool_tip.png');
	$('img[src="../media/uploads/scb_western_reprobing.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_western_reprobing.png"]').attr('src', '../../../images/user_guide/scb_western_probing.png');
	$('img[src="../media/uploads/scb_experiment_dropdown_menu_-flow-cropped.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_experiment_dropdown_menu_-flow-cropped.png"]').attr('src', '../../../images/user_guide/scb_dropdown_flow.png');
	$('img[src="../media/uploads/scb_flow_progress_bar.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_flow_progress_bar.png"]').attr('src', '../../../images/user_guide/scb_flow_progress.png');
	$('img[src="../media/uploads/scb_flow_sample_prep.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_flow_sample_prep.png"]').attr('src', '../../../images/user_guide/scb_flow_sample_prep.png');
	$('img[src="../media/uploads/scb_flow_samples_window_and_run_samples_step.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_flow_samples_window_and_run_samples_step.png"]').attr('src', '../../../images/user_guide/scb_flow_run_samples.png');
	$('img[src="../media/uploads/scb_flow_analysis_step_with_segments_drawn_-_whole_page.png"]').addClass('resize_img');
	$('img[src="../media/uploads/scb_flow_analysis_step_with_segments_drawn_-_whole_page.png"]').attr('src', '../../../images/user_guide/scb_flow_analysis.png');
	

}
