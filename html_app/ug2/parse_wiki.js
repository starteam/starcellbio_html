
$.get( "user_guide.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	document.body.innerHTML = data;
	
	document.body.innerHTML= document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, "");
	$('.header-small').remove();
	$('.related').remove();
	$('.footer').remove();
	$('.sphinxsidebar').remove();
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
			else if(nextN.tagName == 'UL' || nextN.className == 'SCB-Normal'){
				//nextN.style.display = 'none';
				$(nextN.previousElementSibling).append(nextN);
			}
			nextN=next;
		
		}
	}
	

	//indent bullets
	for(var x = 0; x < lists.length; x++){
		lists[x].style.marginLeft = '100px';
		
	}
	
	$('.heading').clone().prependTo('.body').attr('class', 'title');
	$('.title').children('.subheading').children('ul').remove();
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
	back_to_top.style.color = 'dodgerblue';
	back_to_top.innerHTML='Back to Top<br/><br/>';
	$('.heading').append(back_to_top);
	$('.subheading').append(back_to_top);
	$('.heading >.subheading').parent().children('.back_to_top').remove();
	var divider = document.createElement('span')
	divider.className = 'ug_dividing_line';
	$('.subheading').append(divider);
	
	
	
	
});

//toggle visibility of children, not used currently because toggle is made inactive
function bindToggle(item){
	$(item).click(function(){
		$(item).parent().children().toggle();
	});


}