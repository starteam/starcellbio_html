$(window).keydown(function(e) {
    switch (e.keyCode) {
        case 13: searchUG();
    }
});

$('.help_search_input').focus();
$('.scb_f_help').css('max-height', $('.scb_f_help_display').width()+80);

// $(".scb_f_help").resizable({containment: "#container"}).resize(function()
// {
//     var bodyHeight = $(this).height() - 110;
//     $('.scb_f_help_display').css('height', bodyHeight + "px");
//     $(".scb_f_help").css('top', '0px');
//     $(".scb_f_help").css('left', '0px');
//     $(".scb_f_help").css('position', 'relative');
//     $('.scb_f_help_footer').width($('.scb_f_help_search_bar').width());
// 
// });



// $(window).scroll(function () {
//    $('.scb_f_help_search_bar').css('position', 'absolute');
// });
//drag: function( event, ui ) {$('.scb_f_help_search_bar').css('position', 'static');}, 

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
		div.className = 'scb_s_help_section';
		div.innerHTML = text;
		for(var y = 0; y < div.childNodes.length; y++){
			if(!div.childNodes[y].style)
				$(div.childNodes[y]).wrap('<span class = "scb_f_help_sub_heading"></span>');
			$(div.childNodes[y]).addClass('scb_s_help_sub_section')
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
// 			if($('.scb_s_main_help_link').css('display') == 'none' && $('font').length ==0)
// 				return false;
// 			else{
			//$('.scb_s_help_link_'+ lnk.className ).css('display', 'inline');
			//$('.scb_s_help_link_'+ ind).toggle();
			if($('.scb_s_help_link_'+ ind).css('display') != 'none')
			 	$('.scb_s_help_link_'+ ind).css('display', 'none');
			 else{
			 	$('.scb_s_help_link_'+ ind).css('display', 'list-item');
			 	}
			$('.scb_s_main_help_link').toggle();
			$(item).css('display', 'inline');
			$(item).css('cursor', 'pointer');
			if($('.scb_f_help_footer').length >0)
			$('.scb_f_help_footer').remove();
			else{
			var footer = document.createElement('div')
			footer.className = 'scb_f_help_footer';
			footer.innerHTML = "<input type='button' value='Home' style='color: blue;' id='search' onclick='mainUG();'> <input type='button' style='color: blue;' value='Popout' style='float:right;'id='search' onclick='return true;'> ";
			//footer.style.background = 'rgba(31, 155, 123, .5)'; 
			footer.style.height = '25px';
			$('.scb_f_help_display').append(footer);
			$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width() -15);
			}
		});
		
}


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
	//var list = $("*:contains('"+ $('.help_search_input').val()+"')");
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
	
	//console.log(elements);
	highlightSearchTerms($('.help_search_input').val(), true, true,null, null)

	var display_str = counter+1;
	var string = display_str+' of ' + $('font').length;
	$($('font')[counter]).css('background-color', 'orange');
	
  	$('.scb_display_search_count').text(string);
  	
  	$('.scb_f_ug_down_button').click(function(){
  		$($('font')[counter]).css('background-color', 'yellow');
  		counter = counter +1;
  		$($('font')[counter]).css('background-color', 'orange');
  		var display_str = counter+1;
		string = display_str+' of ' + $('font').length;
		$('.scb_display_search_count').text(string);
	 	var offset = $($('font')[counter]).offset()
	 	$('.scb_f_help').scrollTop(offset);
  	});
  	
  	
  	
  	$('.scb_f_ug_up_button').click(function(){
  		$($('font')[counter]).css('background-color', 'yellow');
  		counter = counter -1;
  		$($('font')[counter]).css('background-color', 'orange');
  		var display_str = counter+1;
		string = display_str+' of ' + $('font').length;
		$('.scb_display_search_count').text(string);
		var offset = $($('font')[counter]).offset()
	 	$('.scb_f_help').scrollTop(offset);
  	});
  	
  	
  	
  	//drag: function( event, ui ) {$('.scb_f_help_search_bar').css('position', 'static');}, 
  	
	$('.scb_f_help').draggable({handle:'.scb_f_help_search_bar'});
	for(var x = 0; x< $('.scb_s_main_help_link').length; x++){
		bindItem($('.scb_s_main_help_link')[x], x);
		$($('.scb_s_main_help_link')[x]).css('cursor', 'pointer');
	}
	var footer = document.createElement('div')
	footer.className = 'scb_f_help_footer';
	footer.innerHTML = "<input type='button' value='Home' style='color: blue;' id='search' onclick='mainUG();'> <input type='button' style='color: blue;' value='Popout' style='float:right;'id='search' onclick='return true;'> ";
	//footer.style.background = 'rgba(31, 155, 123, .5)'; 
	footer.style.height = '25px';
	$('.scb_f_help_display').append(footer);
	$('.scb_f_help_footer').width($('.scb_f_help_search_bar').width()-15);
	//$('.help_search_input').focus();
	}
	}
}



function mainUG(){
	$('.help_search_input').focus();
	$('.scb_f_help font').each(function() {
    	$(this).replaceWith($(this).text());
	});
	$('.scb_s_main_help_link').css('display', 'inline');
	$('.scb_s_help_sub_section').hide();
	$('.scb_s_main_help_link').css('cursor', 'pointer');
	$('.scb_f_help_footer').remove();
	//$('.scb_f_help_search_bar').css('position', 'static');
	$('.scb_f_help').css('overflow-x', 'hidden');
	
}




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
