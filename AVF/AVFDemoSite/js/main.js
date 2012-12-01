
//twitter API
$('#searchButton').on("click", function() {
			$('#twitList').empty();
			var searchString = $('#searchString').val();
			
		
		$.ajax({
			url:'http://search.twitter.com/search.json?q='+searchString,
			dataType: 'jsonp',
			success: function(twitter){
					for (var i=0, j=twitter.results.length; i<j; i++) {
							var item = twitter.results[i];
							
							$(' ' + 
									'<section>'+
										'<ul>' +
											'<li><img id="profileImg" src="' +item.profile_image_url+ '"/></li>'+
											'<li>' + item.from_user_name +'</li>' +
											'<li>' + item.text + '</li>' +
											'<li>' + item.created_at + '</li>' +
										'</ul>' +
									'</section>'
							).appendTo('#twitList');
					}
			}
		});
	
});

