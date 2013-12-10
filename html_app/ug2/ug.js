//hide the native search bar
$('.scb_f_help_search_bar').hide();
var total=0;
$('.scb_s_ug_home').hide();
last_element_offset = 0;
//function to redirect popout link to the new page, NOT USED, code redone in MainFrame for new handler
function popoutGuide(){
	//window.open('', '_blank');
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
	setTimeout( function(){popoutWindow.location = "full_guide.html#"+popout_string; },50);
	
}


//This sets up the user guide
$.get( "user_guide.html", function(data) {
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
					//SHLOKA
					nextC.style.display = 'none';
					$(div.childNodes[y]).append(nextC);
					nextC = div.childNodes[y].nextElementSibling;
				}
				bindSubItem(div.childNodes[y], number);
			
			}
			else{
				$(div.childNodes[y]).addClass('scb_s_help_sub_section');
				if($(div.childNodes[y]).prop('tagName')=='SPAN')
					$(div.childNodes[y]).addClass('span_tag');
				else
					$(div.childNodes[y]).addClass('list_tag');
				$(div.childNodes[y]).addClass('special');
				$(div.childNodes[y]).addClass('scb_s_help_link_' + i);
				//SHLOKA
				div.childNodes[y].style.display = 'none';
			}
			y++;

			
		}
		//append the code to the display div
		$('.scb_f_help_display').append(lnk);
		$('.scb_f_help_display').append(div);
		bindItem(lnk, i);
		
	}
	$('.scb_f_help_display > span:contains("")').each(function() {
    	if(this.className== "")
    		$(this).remove();
	});
	$('.scb_s_help_section > span:contains("")').each(function() {
    	if(this.className == "")
    		$(this).remove();
	});
// 	$('strong').each(function(){
// 		$(this).parent().html($(this).html());
// 	});
// 	
	$('.scb_s_help_sublink').append('<br/>')
	$('.scb_s_help_sublink > li').css('margin-left', '35px');
	$('.scb_s_help_section').css('margin-left', '17px');
	
	$('.scb_s_help_sublink').show();
	$('.special').append('<br/>');
	$('.scb_s_help_link_2').append("<br/>");
	fixImages();

}); 


//Bind a click to the main menu links
function bindItem(item, ind) {
		$(item).click(function(){
			if( $('.scb_s_help_section_'+ind).children().children('li').css('display')=='none'|| $('.scb_s_help_section_'+ind).children().css('display')=='none' || $('.scb_s_help_section_'+ind).children('li').css('display')=='none'){
				//$('.scb_s_help_section_'+ind +' .scb_s_section_active').attr('class', 'scb_s_section_inactive');
				$(item).children().attr('onclick', 'false');
				last_element_offset = $(window).scrollTop();
				if($('.scb_s_help_link_'+ ind).css('display') != 'none')
					$('.scb_s_help_link_'+ ind).css('display', 'none');
			 	else{
					$('.scb_s_help_link_'+ ind+'.list_tag').css('display', 'list-item');
					$('.scb_s_help_link_'+ ind+'.span_tag').css('display', 'inline');
				}
				
				//$('.special').css('margin-left', '40px');
				$('.scb_s_main_help_link').hide();
				$(item).css('display', 'inline');
				$(item).css('cursor', 'pointer');
				$('.scb_s_help_section').hide();
				$('.scb_s_help_section_'+ind).show();
				$('p').attr('class', 'scb_s_section_inactive');
				if($('.scb_f_help_footer').length >0)
					$('.scb_f_help_footer').remove();
				else{
				//add footer code
				var footer = document.createElement('div')
				footer.className = 'scb_f_help_footer';
				footer.innerHTML = "<input type='button' style='color: blue;' value='Popout' style='float:right;'id='popout' onclick='popoutGuide();'> ";
				//footer.style.background = 'rgba(31, 155, 123, .5)'; 
				footer.style.height = '25px';
				$('.scb_f_help_display').append(footer);
				$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width() -15);
				}
					window.scrollTo(0);
				//$('.scb_s_help_section_'+ind +' .scb_s_section_inactive').css('margin-left', '-40px');
				$('.scb_s_help_section_'+ind +' .scb_s_section_active').css('margin-left', '-40px');

			}
			else{
				return;
			}	

		});
		
}

//Bind a click to main menu sublinks
function bindSubItem(item, ind) {
	$(item).click(function(){
		if($(item).children('span').length + $(item).children('li').length >1  && $(item).parent().prev().css('display')=='none'){
			return;
				///($(item).parent().prev().css('display')!='none' && $(item).children('.special').css('display')  !='none')||
		}
		else{
			last_element_offset = $(window).scrollTop();
			$(item).first().children('span').first().attr('class', 'scb_s_section_inactive');
			$(item).first().children('span').first().css('margin-left' ,'-20px');
			
// 			if($('.scb_s_help_sub_section_'+ ind).css('display') != 'none')
// 				$('.scb_s_help_sub_section_'+ ind).css('display', 'none');
// 			 else{
// 				
					$('.scb_s_help_sub_section_'+ ind+'.list_tag').css('display', 'list-item');
					$('.scb_s_help_sub_section_'+ ind+'.span_tag').css('display', 'inline');
// 				}
			//$('.special').css('margin-left', '40px');
			$('.scb_s_main_help_link').hide();
			$('.scb_s_help_sublink').hide();
			if($(item).parent().prev().text().trim() == 'EXPERIMENTS'){
				$(item).parent().children('span').hide();
				$(item).parent().children('li').hide();
			}
			$(item).css('display', 'inline');
			$(item).css('cursor', 'pointer');
			if($('.scb_f_help_footer').length >0)
				$('.scb_f_help_footer').remove();
			else{
				//add footer code
				var footer = document.createElement('div')
				footer.className = 'scb_f_help_footer';
				footer.innerHTML = "<input type='button' style='color: blue;' value='Popout' style='float:right;'id='popout' onclick='popoutGuide();'> ";
				//footer.style.background = 'rgba(31, 155, 123, .5)'; 
				footer.style.height = '25px';
				$('.scb_f_help_display').append(footer);
				$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width() -15);
			}
				window.scrollTo(0);
		}
		
	});
}


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
		// OVERWRITES old selecor
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
	
	highlightSearchTerms($('.help_search_input').val(), false, true,null, null);
	var list= $(search_string);
	list = $(list).filter('.special')
	
	for (var i = 0; i < list.length; i++) {
			elements.push(list[i]);
			console.log(list[i]);
			$( list[i]).closest('.list_tag').css( "display", 'list-item' );
			$( list[i]).closest('.span_tag').css( "display", 'inline' );
		
	}

	if(elements.length == 0){
		$( list[list.length-1]).css( "display", 'list-item' );
	}
	

	var display_str = counter+1;
	
	var font_list =[]
	var list_counter = 1;
	for(var y=0; y<$('font').length; y++){
		if($($('font')[y]).closest('li').css('display') !='none'  || $($('font')[y]).closest('span').css('display') !='none'){
			$($('font')[y]).wrap('<a></a>');
			$($('font')[y]).parent().attr('name', 'ug_'+list_counter);
			list_counter++;
			font_list.push($('font')[y]);
		}
	}
	
	var string = display_str+' of ' + total;
	$(font_list[counter]).css('background-color', 'orange');
	
  	$('.scb_display_search_count').text(string);
  	
  	
  	//add a click listener to the down and up button for the userguide.
  	$('.scb_f_ug_down_button').click(function(){
  		if(counter+2 > font_list.length || counter+2 < 1)
  		return;
  		else{
  		$(font_list[counter]).css('background-color', 'yellow');
		counter = counter +1;
  		$(font_list[counter]).css('background-color', 'orange');
  		var display_str = counter+1;
  		document.location.hash='#ug_'+display_str;
		string = display_str+' of ' + total;
		$('.scb_display_search_count').text(string);
	 	var offset = $(font_list[counter]).offset()
	 	$('.scb_f_help').scrollTop(offset);
	 	}
  	});
  	
  	
  	
  	$('.scb_f_ug_up_button').click(function(){
  		if(counter > font_list.length || counter < 1)
  		return;
  		else{
  		$(font_list[counter]).css('background-color', 'yellow');
  		counter = counter -1;
  		$(font_list[counter]).css('background-color', 'orange');
  		var display_str = counter+1;
  		document.location.hash='#ug_'+display_str;
		string = display_str+' of ' + total;
		$('.scb_display_search_count').text(string);
		var offset = $(font_list[counter]).offset()
	 	$('.scb_f_help').scrollTop(offset);
	 	}
  	});
  	
  	//Add footer code.
	for(var x = 0; x< $('.scb_s_main_help_link').length; x++){
		bindItem($('.scb_s_main_help_link')[x], x);
		$($('.scb_s_main_help_link')[x]).css('cursor', 'pointer');
	}
	for(var x = 0; x< $('.scb_s_help_sublink').length; x++){
		bindSubItem($('.scb_s_help_sublink')[x], x+1);
		$($('.scb_s_help_sublink')[x]).css('cursor', 'pointer');
	}
	var footer = document.createElement('div')
	footer.className = 'scb_f_help_footer';
	footer.innerHTML = "<input type='button' style='color: blue;' value='Popout' style='float:right;'id='popout' onclick='popoutGuide();'> ";
	footer.style.height = '25px';
	$('.scb_f_help_display').append(footer);
	$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width()-15);
	//$('.help_search_input').focus();
	}
	}
}

//Clears the screen and returns the menu to default view
function mainUG(){
	$('.help_search_input').focus();
	$('.scb_f_help font').each(function() {
    	$(this).replaceWith($(this).text());
	});
	

	$('.scb_s_section_inactive').addClass('scb_s_section_active');
	$('.scb_s_section_active').css('margin-left', '0px');
	$('.scb_s_section_inactive').removeClass('scb_s_section_inactive');
	$('.scb_s_main_help_link').css('display', 'inline');
	$('.scb_s_help_sublink >span').show();
	//$('li').hide();
	$('.special').hide();
	$('.scb_s_help_sublink').parent().show();
	$('.scb_s_help_sublink').show();
	$('.scb_s_main_help_link').css('cursor', 'pointer');
	$('.scb_f_help_footer').remove();
	//$('.scb_f_help_search_bar').css('position', 'static');
	$('.scb_f_help').css('overflow-x', 'hidden');
	window.scrollTo(0, last_element_offset);
	last_element_offset=0;
	
}

function fixImages(){
	$('img[src="../media/uploads/scb_icon_trash.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_icon_trash.png"]').attr('src', '../../../images/user_guide/scb_ug_trash.png');
		
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0000_18-envelope.png"]').attr('src', '../../../images/user_guide/scb_ug_envelope.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0003_33-cabinet.png"]').attr('src', '../../../images/user_guide/scb_ug_cabinet.png');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').addClass('resize_icon');
	$('img[src="../media/uploads/scb_all_homepage_f_test_0000s_0000s_0000s_0006_96-book.png"]').attr('src', '../../../images/user_guide/scb_ug_book.png');
	$('img[src="../media/uploads/scb_icons_copy.png"]').addClass('resize_img');
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

//Functions taken from http://www.nsftools.com/misc/SearchAndHighlight.htm
function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font style='color:black; background-color:yellow;'>";
    highlightEndTag = "</font>";
  }
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
	 var counter =0;
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          counter ++;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
  
  return [newText, counter];
}

function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)
{
  if (treatAsPhrase) {
    searchArray = [searchText];
  } else {
    searchArray = searchText.split(" ");
  }
  
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    if (warnOnFailure) {
      alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
    }
    return false;
  }
  var counter = 0;
  var bodyText = document.body.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
  	var results =doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
    bodyText = results[0];
    counter = counter +results[1];
  }
  
  document.body.innerHTML = bodyText;
  
  total =counter;
  return true;
}
