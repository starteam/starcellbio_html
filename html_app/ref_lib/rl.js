
function getRL(){

$.get( "ref_library.html", function(data) {
	var htmlObject = document.createElement('div');
	htmlObject.innerHTML = data;
	document.body.innerHTML = data;
	$('.SCBTOC1Allcaps').after("<br/>");
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
	var headers3 = $('.SCB-Heading3');
	var headers5 = $('.SCB-Heading5');
	var lists = $('ul');
	$(subheadersp).wrap('<div class = "subheading"><a></a></div>');
	$(headers3).wrap('<div class = "heading3"></div>');
	$(headers5).wrap('<div class = "heading5"></div>');

	
	var main_headers = $('.heading');
	var subheaders = $('.subheading');
	
	
	//first attach everything to headings
	var counter = 0;
	for (var y=0; y<main_headers.length; y++){
		var nextN = main_headers[y].nextElementSibling;
		$(main_headers[y]).children('a').attr('name', $(main_headersp[y]).text().replace(/\s/g,'') ); 
		while(nextN!=null && nextN.className!='heading'){
			var next = nextN.nextElementSibling;
			if(nextN.className =='subheading'){
				$(nextN).children('a').attr('name', $(subheadersp[counter]).text().trim().replace(/([A-Z]\.)|[\.\(\)\s\d]/g,''));
				counter++;
				nextN.style.textIndent = '0px';
				var nextL = nextN.nextElementSibling;
				while(nextL != null && nextL.className!='subheading' && nextL.className!='heading'){
					if(nextL.className=='heading3'){
						var next3N = nextL.nextElementSibling;
						while(next3N !=null && next3N.className!='heading3' && next3N.className!='subheading' && next3N.className!='heading'){
							if(next3N.className == 'heading5'){
								var next5N = next3N.nextElementSibling;
								while(next5N !=null && next5N.className!='heading5' && next5N.className!='heading3' && next5N.className!='subheading' && next5N.className!='heading'){
									console.log('********'+next5N.className+'***********')
									var temp5=next5N.nextElementSibling;
									next5N.style.marginLeft = '75px';
									$(next3N).append(next5N);
									next5N = temp5;
									temp3 = temp5;
								}
								$(nextL).append(next3N);
								addHyperlink5(next3N);
								next3N = temp5;
							}
							else{
								var temp3 = next3N.nextElementSibling;
								next3N.style.marginLeft = '50px';
								$(nextL).append(next3N);
								next3N = temp3;
							}
						}
						$(nextN).append(nextL);
						addHyperlink(nextL);
						nextL = temp3;
					}
 					else{
						var temp = nextL.nextElementSibling;
						nextL.style.marginLeft = '0px';
						$(nextN).append(nextL);
						nextL = temp;
 					}
				}
				next = nextN.nextElementSibling;
				$(nextN.previousElementSibling).append(nextN);
			}
			else if(nextN.tagName == 'OL' || nextN.className == 'SCB-Normal'){

				$(nextN.previousElementSibling).append(nextN);
			}
			
			nextN=next;
		
		}
	}
	
	var footnote_links = $('a[href="#_ftn1"]')
	for(var x=0; x< footnote_links.length; x++){
		var anchor_node = $(footnote_links[x]);
		if($(anchor_node).text() == '[1]')
			$(anchor_node).attr('href', '#_ftn1');
		else if($(anchor_node).text() == '[2]')
			$(anchor_node).attr('href', '#_ftn2');
	}
			
	var footnote_links = $('a[href="#_ftn2"]')
	for(var x=0; x< footnote_links.length; x++){
		var anchor_node = $(footnote_links[x]);
		if($(anchor_node).text() == '[1]')
			$(anchor_node).attr('href', '#_ftn1');
		else if($(anchor_node).text() == '[2]')
			$(anchor_node).attr('href', '#_ftn2');
		else if($(anchor_node).text() == '[3]')
			$(anchor_node).attr('href', '#_ftn3');
	}

	//indent bullets
	for(var x = 0; x < lists.length; x++){
		lists[x].style.marginLeft = '0px';
		
	}
	var footnotes = $('.SCB-Footer');
	for(var x=0; x< footnotes.length; x++){
		var anchor_node = $(footnotes[x]).children('a')[0];
		if($(anchor_node).text() == '[1]')
			$(anchor_node).attr('href', '#_ftnref1');
		else if($(anchor_node).text() == '[2]')
			$(anchor_node).attr('href', '#_ftnref2');
		else if($(anchor_node).text() == '[3]')
			$(anchor_node).attr('href', '#_ftnref3');
		else if($(anchor_node).text() == '[4]')
			$(anchor_node).attr('href', '#_ftnref4');
		else if($(anchor_node).text() == '[5]')
			$(anchor_node).attr('href', '#_ftnref5');
		$(anchor_node).css('text-decoration', 'none');
		$(anchor_node).css('color', 'black');
		$(anchor_node).attr('name', $(anchor_node).attr('href').replace(/\#|(ref)/g, ''));
	}
	var back_to_top= document.createElement('a');
	back_to_top.href = "#";
	back_to_top.className = "back_to_top";
	back_to_top.style.color = 'blue';
	back_to_top.innerHTML='Back to Top<br/><br/>';
	$('.subheading').append(back_to_top);
	$('.heading3').append(back_to_top);
	$('.heading5').append(back_to_top);
	$('.heading3 >.heading5').parent().children('.back_to_top').remove();
	$('.subheading >.heading3').parent().children('.back_to_top').remove();
	var divider = document.createElement('span')
	divider.className = 'rl_dividing_line';
	$('.subheading').append(divider);
	$($('.SCBTOC1')[2]).after('<br/><div class="dividing_line"></div>');
	$('.body').prepend('<span class="rl_main_title">Library</span>');
	$('p a[name="_ftn1"]').parent().contents().not('a[name="_ftn1"]').wrap("<a target='_blank' href='http://www.ncbi.nlm.nih.gov/pubmed/?term=%5B1%5D+Eslami%2C+A.%2C+Lujan%2C+J.+Western+Blotting%3A+Sample+Preparation+to+Detection.+J.+Vis.+Exp.+(44)%2C+e2359%2C+doi%3A10.3791%2F2359+(2010)'></a>");
	$('.heading3 ul').css('margin-left', '25px');
	var x = window.location.hash; 
	window.location.hash = ''; 
	setTimeout( function() { window.location.hash = x ;} , 20); 
	fixImages();
	
	
}).done(function() { window.hash = window.location.hash});

}

function addHyperlink(parent){
	var element = $(parent).children().first();
	$(element).wrap('<a></a>');
	$(element).parent().attr('name', $(element).text().trim().replace(/([A-Z]\.)|[\.\(\)\s\d]/g,''));
	
	if($(element).text().indexOf('General')> -1)
		if($(element).parent().parent().parent().first().children().first().text().indexOf('Western') > -1)
				$(element).parent().attr('name', 'WB'+$(element).parent().attr('name'));
		if($(element).parent().parent().parent().first().children().first().text().indexOf('Flow') > -1 && $(element).text().indexOf('Experimental')==-1)
				$(element).parent().attr('name', 'FC'+$(element).parent().attr('name'));
// 		if($(element).parent().parent().parent().first().children().first().text().indexOf('Microscopy') > -1 && $(element).text().indexOf('Experimental')==-1)
// 				$(element).parent().attr('name', 'M'+$(element).parent().attr('name'));

}


function addHyperlink5(parent){
			
	var element = $(parent).children().first();
	$(element).wrap('<a></a>');
	$(element).parent().attr('name', $(element).text().trim().replace(/([A-Z]\.)|[\.\(\)\s\d]/g,''));
	
	if($(element).parent().parent().parent().first().children().first().text().indexOf('Flow') > -1)
			$(element).parent().attr('name', 'FC'+$(element).parent().attr('name'));
// 	if($(element).parent().parent().parent().first().children().first().text().indexOf('Microscopy') > -1)
// 			$(element).parent().attr('name', 'M'+$(element).parent().attr('name'));


}

//toggle visibility of children, not used currently because toggle is made inactive
function bindToggle(item){
	$(item).click(function(){
		$(item).parent().children().toggle();
	});


}



function fixImages(){
	$('img[src="../media/uploads/principle_of_high_resolution_sds_gel_electrophoresis.png"]').after('<p/>');
	$('img[src="../media/uploads/principle_of_high_resolution_sds_gel_electrophoresis.png"]').attr('src', '../../../images/ref_lib/principle_of_high_resolution_sds_gel_electrophoresis.png');
	$('img[src="../media/uploads/gel_blue_coomassie.jpg"]').after('<p/>');
	$('img[src="../media/uploads/gel_blue_coomassie.jpg"]').attr('src', '../../../images/ref_lib/gel_blue_coomassie.jpg');
	$('img[src="../media/uploads/antibody.png"]').after('<p/>');
	$('img[src="../media/uploads/antibody.png"]').attr('src', '../../../images/ref_lib/antibody.png');
	$('img[src="../media/uploads/sds-page.jpg"]').after('<p/>');
	$('img[src="../media/uploads/sds-page.jpg"]').attr('src', '../../../images/ref_lib/sds-page.jpg');
}