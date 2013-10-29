// $(window).keydown(function(e) {
//     switch (e.keyCode) {
//         case 13: searchUG();
//     }
// });
//$('.help_search_input').focus();


//hide the native search bar
$('.scb_f_help_search_bar').hide();

$('.scb_s_ug_home').hide();
//function to redirect popout link to the new page
function popoutGuide(){
	//window.open('', '_blank');
	var popout_string = "";
	var visible=	$('u:visible');
	if(visible.length ==1)
	{	
		if(!$(visible).attr('class'))
			popout_string = $('*:visible ').parent('.scb_s_help_sublink').attr('class').split(' ')[1];
		else
			popout_string = $(visible).attr('class');
	}
	else{
		popout_string = $($('u:visible ')[0]).attr('class');
	}
	
	popout_string = popout_string.replace(/_/g, '-');
	var popoutWindow =window.open("full_guide.html#"+popout_string);
	//the timeout is needed, because the javascript has to load first, 
	//and then you can use the hash to the anchor
	setTimeout( function(){popoutWindow.location = "full_guide.html#"+popout_string; }, 20);
	
}

//This sets up the user guide
$.get( "user_guide.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	var body = htmlObject.getElementsByClassName("body")[0];
	var links = body.getElementsByClassName('SCB-Heading1AllCaps');
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
					text = text + '&#9;<div class="scb_s_help_sublink"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>' + next.textContent.trim()+'</u></span><br/></div>';				}
			}
			next = next.nextSibling;
			
		}
		
		var lnk = document.createElement('span');
		lnk.className = 'scb_s_main_help_link';
		lnk.style.textTransform = 'uppercase';
		lnk.innerHTML = '<p/><u class="scb_s_main_section_'+i+'">'+$(links[i]).text()+"</u>" + "<p/>";
		var div = document.createElement('div');
		div.className = 'scb_s_help_section scb_s_help_section_'+i;
		div.innerHTML = text;
		
		
		
		var y = 0;		
		 while(y < div.childNodes.length){
			if(!div.childNodes[y].style){
				$(div.childNodes[y]).wrap('<span></span>');
			}
				
			else if(div.childNodes[y].className=='scb_s_help_sublink'){
				number = number+1;
				$(div.childNodes[y]).addClass('scb_s_help_sublink_' + number);
				var nextC = div.childNodes[y].nextElementSibling;
				while(nextC !=null && nextC.className !="scb_s_help_sublink"){
					$(nextC).addClass('scb_s_help_sub_section_'+number);
					$(nextC).addClass('scb_s_help_link_' + i);
					nextC.style.display = 'none';
					$(div.childNodes[y]).append(nextC);
					nextC = div.childNodes[y].nextElementSibling;
				}
				bindSubItem(div.childNodes[y], number);
			
			}
			else{
				$(div.childNodes[y]).addClass('scb_s_help_sub_section');
				$(div.childNodes[y]).addClass('scb_s_help_link_' + i);
				div.childNodes[y].style.display = 'none';
			}
			y++;

			
		}
		//append the code to the display div
		$('.scb_f_help_display').append(lnk);
		$('.scb_f_help_display').append(div);
		bindItem(lnk, i);
		
	}
	$('.scb_s_help_section > span:contains("")').remove()
}); 


//Bind a click to the main menu links
function bindItem(item, ind) {
		$(item).click(function(){
			if($('.scb_s_help_link_'+ ind).css('display') != 'none')
			 	$('.scb_s_help_link_'+ ind).css('display', 'none');
			 else{
			 	$('.scb_s_help_link_'+ ind).css('display', 'list-item');
			 	}
			$('.scb_s_main_help_link').hide();
			$(item).css('display', 'inline');
			$(item).css('cursor', 'pointer');
			$('.scb_s_help_section').hide();
			$('.scb_s_help_section_'+ind).show();
			if($('.scb_f_help_footer').length >0)
			$('.scb_f_help_footer').remove();
			else{
			//add footer code
			var footer = document.createElement('div')
			footer.className = 'scb_f_help_footer';
			footer.innerHTML = "<input type='button' style='color: blue;' value='Popout' style='float:right;'id='search' onclick='popoutGuide();'> ";
			//footer.style.background = 'rgba(31, 155, 123, .5)'; 
			footer.style.height = '25px';
			$('.scb_f_help_display').append(footer);
			$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width() -15);
			}
		});
		
}

//Bind a click to main menu sublinks
function bindSubItem(item, ind) {
	$(item).click(function(){
		if($(item).parent().prev().css('display')!='none' && $(item).children('li').css('display') !='none'){
			$(item).children().css('color', 'black');
			return;
		}
		else{
			$(item).children('span').css('color', 'blue');
			if($('.scb_s_help_sub_section_'+ ind).css('display') != 'none')
				$('.scb_s_help_sub_section_'+ ind).css('display', 'none');
			 else{
				$('.scb_s_help_sub_section_'+ ind).css('display', 'list-item');
				}
			
			$('.scb_s_main_help_link').hide();
			$('.scb_s_help_sublink').hide();
			$(item).css('display', 'inline');
			$(item).css('cursor', 'pointer');
			if($('.scb_f_help_footer').length >0)
				$('.scb_f_help_footer').remove();
			else{
				//add footer code
				var footer = document.createElement('div')
				footer.className = 'scb_f_help_footer';
				footer.innerHTML = "<input type='button' style='color: blue;' value='Popout' style='float:right;'id='search' onclick='popoutGuide();'> ";
				//footer.style.background = 'rgba(31, 155, 123, .5)'; 
				footer.style.height = '25px';
				$('.scb_f_help_display').append(footer);
				$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width() -15);
			}
		}
	});
}


//Main function; clear the current state of the user guide and search for terms.
function searchUG(){
	mainUG();
	
	var counter = 0; 
	var elements = [];
	var search_string = "*"
	if($(".help_search_input").val()=="")
		alert('A phrase was not typed. Please type a value before searching.');
	else{
	var searchTerms = $(".help_search_input").val().trim().split(' ');
	for(var x =0; x < searchTerms.length ; x++){
		search_string = search_string+ ":contains('"+searchTerms[x]+"')";
	}
	var list= $(search_string);
	if(list.length == 0)
	alert("I\'m sorry we can\'t find that word");
	else{
	for (var i = 1; i < list.length; i++) {
		if (!list[i - 1].contains(list[i])) {
			elements.push(list[i - 1]);
			$( list[i - 1]).css( "display", 'list-item' );
		}
		
	}
	if(elements.length == 0){
		$( list[list.length-1]).css( "display", 'list-item' );
	}
	
	highlightSearchTerms($('.help_search_input').val(), true, true,null, null)

	var display_str = counter+1;
	
	var font_list =[]
	
	for(var y=0; y<$('font').length; y++){
		if($($('font')[y]).closest('li').css('display') !='none'){
			font_list.push($('font')[y]);
		}
	}
	var string = display_str+' of ' + font_list.length;
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
		string = display_str+' of ' + font_list.length;
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
		string = display_str+' of ' + font_list.length;
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
	footer.innerHTML = "<input type='button' style='color: blue;' value='Popout' style='float:right;'id='search' onclick='popoutGuide();'> ";
	//footer.style.background = 'rgba(31, 155, 123, .5)'; 
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
	$('.scb_s_main_help_link').css('display', 'inline');
	$('.scb_s_help_sublink >span').show();
	$('li').hide();
	$('.scb_s_help_sublink').parent().show();
	$('.scb_s_help_sublink').show();
	$('.scb_s_main_help_link').css('cursor', 'pointer');
	$('.scb_f_help_footer').remove();
	//$('.scb_f_help_search_bar').css('position', 'static');
	$('.scb_f_help').css('overflow-x', 'hidden');
	
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
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
  
  return newText;
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
  
  var bodyText = document.body.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
  }
  
  document.body.innerHTML = bodyText;
  return true;
}
