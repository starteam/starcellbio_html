// $.get( "ref_library.html", function(data) {
// 	var htmlObject = document.createElement('div');
// 	htmlObject.innerHTML = data;
// 	document.body.innerHTML = data;
// });


$.get( "ref_library.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	document.body.innerHTML = data;
	$('.SCBTOC1 > a')[1].href= $('.SCBTOC1 > a')[1].href.replace("Section", '');
	$('.SCBTOC2').css('margin-left', '25px');
	$('.SCBTOC3').css('margin-left', '50px');
	$('.SCBTOC4').css('margin-left', '75px');
	document.body.innerHTML= document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, "");
	$('.header-small').remove();
	$('.related').remove();
	$('.footer').remove();
	$('.sphinxsidebar').remove();
	var main_headersp = $('.SCB-Heading1Allcaps');
	$(main_headersp).wrap('<div class="heading"><a></a></div>');
	var subheadersp = $('.SCB-Heading1');
	var lists = $('ul');
	$(subheadersp).wrap('<div class = "subheading"><a></a></div>');
	
	
	var main_headers = $('.heading');
	var subheaders = $('.subheading');
	
	
	//first attach everything to headings
	var counter = 0;
	for (var y=0; y<main_headers.length; y++){
		var nextN = main_headers[y].nextElementSibling;
		$(main_headers[y]).children('a').attr('name', $(main_headersp[y]).text().replace(/\s/g,'') ); 
		//bindToggle($(main_headers[y]).children('span'));
		while(nextN!=null && nextN.className!='heading'){
			var next = nextN.nextElementSibling;
			if(nextN.className =='subheading'){
				//bindToggle($(nextN).children('span'));
				$(nextN).children('a').attr('name', $(subheadersp[counter]).text().trim().replace(/([A-Z]\.)|[\.\(\)\s\d]/g,''));
				counter++;
				nextN.style.textIndent = '50px';
				var nextL = nextN.nextElementSibling;
				while(nextL != null && nextL.className!='subheading' && nextL.className!='heading'){
					nextL.style.marginLeft = '100px';
					//nextL.style.color = 'red';
					//nextL.style.display = 'none';
					var temp = nextL.nextElementSibling;
					$(nextN).append(nextL);
					nextL = temp;
				}
				next = nextN.nextElementSibling;
				$(nextN.previousElementSibling).append(nextN);
			}
			else if(nextN.tagName == 'UL' || nextN.className == 'SCB-Normal'){
				//nextN.style.display = 'none';
				$(nextN.previousElementSibling).append(nextN);
			}
			nextN=next;
		
		}
	}
	
	var heading3 = $('.SCB-Heading3');
	for(var x=0; x < heading3.length; x++){
		$(heading3[x]).wrap('<a></a>');
		$(heading3[x]).parent().attr('name', $(heading3[x]).text().trim().replace(/([A-Z]\.)|[\.\(\)\s\d]/g,''));
		
		if($(heading3[x]).text().indexOf('General')> -1)
			if($(heading3[x]).parent().parent().first().children().first().text().indexOf('Western') > -1)
					$(heading3[x]).parent().attr('name', 'WB'+$(heading3[x]).parent().attr('name'));
			if($(heading3[x]).parent().parent().first().children().first().text().indexOf('Flow') > -1 && $(heading3[x]).text().indexOf('Experimental')<-1)
					$(heading3[x]).parent().attr('name', 'FC'+$(heading3[x]).parent().attr('name'));


			
		
	}
	
	
		
	var heading5 = $('.SCB-Heading5');
	for(var x=0; x < heading5.length; x++){
		$(heading5[x]).wrap('<a></a>');
		$(heading5[x]).parent().attr('name', $(heading5[x]).text().trim().replace(/([A-Z]\.)|[\.\(\)\s\d]/g,''));
		
		if($(heading5[x]).parent().parent().first().children().first().text().indexOf('Flow') > -1)
				$(heading5[x]).parent().attr('name', 'FC'+$(heading5[x]).parent().attr('name'));

	}

	//indent bullets
	for(var x = 0; x < lists.length; x++){
		lists[x].style.marginLeft = '100px';
		
	}
	var footnotes = $('.SCB-Footer');
	for(var x=0; x< footnotes.length; x++){
		var anchor_node = $(footnotes[x]).children('a')[0];
		$(anchor_node).css('text-decoration', 'none');
		$(anchor_node).css('color', 'black');
		$(anchor_node).attr('name', $(anchor_node).attr('href').replace(/\#|(ref)/g, ''));
	}
}).done(function() { window.location = window.location.href});

//toggle visibility of children, not used currently because toggle is made inactive
function bindToggle(item){
	$(item).click(function(){
		$(item).parent().children().toggle();
	});


}