
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
	$(main_headers).wrap('<div class="heading"><a href=#></a></div>');
	var subheaders = $('.SCB-Heading1');
	var lists = $('ul');
	$(subheaders).wrap('<div class = "subheading"><a href=#></a></div>');
	
	for(var x = 0; x < subheaders.length; x++){
		
		subheaders[x].style.textIndent = '50px';
		var nextL = subheaders[x].parentElement.parentElement.nextSibling;
		while(nextL !=null && nextL.className !="subheading"){
			if(nextL.nodeName=='#text'){
			}
			else{
			nextL.style.display = 'none';
			$(subheaders[x].parentElement.parentElement).append(nextL);
			}
			nextL = nextL.nextElementSibling;
		}
	}
	
	for(var x = 0; x < lists.length; x++){
		lists[x].style.marginLeft = '100px';
		
	}
	$('.heading').closest('.subheading');
	});
