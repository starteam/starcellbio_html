$(window).keydown(function(e) {
    switch (e.keyCode) {
        case 13: searchUG();
    }
});

	$('.help_search_input').focus();


$('.scb_f_help').draggable({handle:'.scb_f_help_search_bar'});
$.get( "user_guide.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	var body = htmlObject.getElementsByClassName("body")[0];
	var links = body.getElementsByClassName('SCB-Heading1AllCaps');
	for(var i=0; i<links.length; i++){
		var text = "";
		var next = links[i].nextSibling;
		while(next != null && (next.nodeName == '#text' || next.className !="SCB-Heading1Allcaps")){
			if(next.nodeName == '#text'){
			}
			else{
			text= text + $(next).html();
			}
			next = next.nextSibling;
			
		}
		
		var lnk = document.createElement('span');
		lnk.className = 'scb_s_main_help_link';
		lnk.style.textTransform = 'uppercase';
		lnk.innerHTML = '<u>'+$(links[i]).text()+"</u>" + "<p/>";
		var div = document.createElement('div');
// 		div.className = 'scb_s_help_link_' + i;
		div.innerHTML = text;
		for(var y = 0; y < div.childNodes.length; y++){
			if(!div.childNodes[y].style)
				$(div.childNodes[y]).wrap('<span class = "scb_f_help_sub_heading"></span>');
			$(div.childNodes[y]).addClass('scb_s_help_link_' + i)
			div.childNodes[y].style.display = 'none';
		}
		$('.scb_f_help_display').append(lnk);
		$('.scb_f_help_display').append(div);
		bindItem(lnk, i);
		
	}
	
}); 

function bindItem(item, ind) {
		$(item).click(function(){
			if($('.scb_s_main_help_link').css('display') == 'none')
				return false;
			else{
			//$('.scb_s_help_link_'+ lnk.className ).css('display', 'inline');
			//$('.scb_s_help_link_'+ ind).toggle();
			if($('.scb_s_help_link_'+ ind).css('display') != 'none')
			 	$('.scb_s_help_link_'+ ind).css('display', 'none');
			 else{
			 	$('.scb_s_help_link_'+ ind).css('display', 'list-item');
			 	}
			$('.scb_s_main_help_link').toggle();
			$(item).css('display', 'inline');
			$(item).css('cursor', 'default');
			$('body').off('click', item);
			}
		});
		
}


function expandDiv(item){
	$(item).click(function(){
			$(item).siblings().css('display', 'inline');
			$('.scb_s_main_help_link').toggle();
			$($(item).closest('div').prev()).css('display', 'inline');
			$($(item).parent('div').prev()).css('cursor', 'default');
		});
		
}


function searchUG(){
	mainUG();
	var elements = [];
	var list = $("*:contains('"+ $('.help_search_input').val()+"')");
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
	//console.log(elements);
	highlightSearchTerms($('.help_search_input').val(), true, true,null, null)
	$('.scb_f_help font').css('cursor', 'pointer');
	for(var x = 0; x < elements.length; x++){
		
		expandDiv($('.scb_f_help font')[x]);
	}
	$('.scb_f_help').draggable({handle:'.scb_f_help_search_bar'});
	//$('.help_search_input').focus();
	}
}



function mainUG(){
	$('.help_search_input').focus();
	$('.scb_f_help font').each(function() {
    	$(this).replaceWith($(this).text());
	});
	$('.scb_s_main_help_link').css('display', 'inline');
	$('.scb_s_main_help_link').css('cursor', 'pointer');
	// $('body').on('click', '.scb_s_main_help_link');
	for(var x = 0; x< $('.scb_s_main_help_link').length; x++){
		$('.scb_s_help_link_'+ x).css('display', 'none');
		bindItem($('.scb_s_main_help_link')[x], x);
	}
}




function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  // the highlightStartTag and highlightEndTag parameters are optional
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font style='color:black; background-color:yellow;'>";
    highlightEndTag = "</font>";
  }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
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
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        // skip anything inside a <script> block
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


/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)
{
  // if the treatAsPhrase parameter is true, then we should search for 
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
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
