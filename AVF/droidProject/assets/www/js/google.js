// Google Search API
window.onload= function(){
	var googleSearch = function() {
		var cx = '009199787958900042941:l193dzdz8y4';
		var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
		gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
			'//www.google.com/cse/cse.js?cx=' + cx;
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
	  };
	  
	  googleSearch();
}






      