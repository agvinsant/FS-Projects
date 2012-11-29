$('#searchButton').on("click", function() {
	
			var searchString = $('#searchString').val();
		
		$.ajax({
			url:'https://.twitter.com/search?q='+searchString+'&src=typd',
			dataType: 'jsonp',
			success: function(_json){
					$('#twitList ul').remove();
					$('#twitList').append('<ul></ul>');
					var $listItems = $('#twitList').find('ul');
					$.each(_json.results, function(key){
							var html = '<img class="twitIcon" src="'+ _json.results[key].profile_image_url+'"/>';
							html += '<div class="twitBody">'+_json.results[key].text+'</div>';
							html += '<p class="pItalics">From: '+_json.results[key].from_user + ' Created: '+_json.results[key].created_at+'</p>';
							$listItems.append('<li>'+ html + '</li>');
						});
	
					}
		});
	
});

