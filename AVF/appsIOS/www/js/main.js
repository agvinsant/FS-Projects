// Adam Vinsant
// AVF 1212
// main.js

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
                               '<li class="name">' + item.from_user_name +'</li>' +
                               '<li class="tweet">' + item.text + '</li>' +
                               '<li class="created">' + item.created_at + '</li>' +
                               '</ul>' +
                               '</section>'
                               ).appendTo('#twitList');
                             }
                             }
                             });
                      
                      });

//twitter GeoSearch API...NEED TO FIX SOMETHING IN THE LOOP...

$('#geoButton').on("click", function() {
                   $('#geoList').empty();
                   var geoString = $('#geoString').val();
                   
                   
                   $.ajax({
                          url:'https://api.twitter.com/1/geo/search.json?query='+geoString,
                          dataType: 'jsonp',
                          success: function(twitter){
                          for (var i=0, j=twitter.results.length; i<j; i++) {
                          var item = twitter.results[i];
                          
                          $(' ' +
                            '<section>'+
                            '<ul>' +
                            '<li class="name">' + item.name +'</li>' +
                            '<li class="name">' + item.country_code + '</li>' +
                            '<li class="name">' + item.country + '</li>' +
                            '<li class="name">' + item.full_name + '</li>' +
                            '</ul>' +
                            '</section>'
                            ).appendTo('#geoList');
                          }
                          }
                          });
                   
                   });

// Cordova Camera functions
$('#camera').on('click', function(){
	navigator.camera.getPicture(cameraSuccess, cameraFail, { quality: 50, 
    destinationType: Camera.DestinationType.FILE_URI }); 

	function cameraSuccess(imageURI) {
		var image = document.getElementById('myImage');
		image.src = imageURI;
	}
	
	function cameraFail(message) {
		alert('Failed because: ' + message);
	}
});

//  Cordova Geolocation Functions... Gets your current geolocation and displays the info. more functions to come
$('#geolocation').on('click', function(){
	var geoSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '<br/>' +
          'Longitude: '         + position.coords.longitude         + '<br/>' +
          'Altitude: '          + position.coords.altitude          + '<br/>' +
          'Accuracy: '          + position.coords.accuracy          + '<br/>' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
          'Heading: '           + position.coords.heading           + '<br/>' +
          'Speed: '             + position.coords.speed             + '<br/>' +
          'Timestamp: '         + position.timestamp                + '<br/>');
	};

	function geoError(error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	}
	
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
});

// Compass Functions... Gets your current heading... more functions to come
$('#compass').on('click', function(){
	function compassSuccess(heading) {
		alert('Heading: ' + heading.magneticHeading);
	};

	function compassError(error) {
		alert('CompassError: ' + error.code);
	};
	
	navigator.compass.getCurrentHeading(compassSuccess, compassError);
});

// Notification alert functions...more functions to come

$('#notification').on('click', function(){
	function alertCancelled() {
    	alert("Thanks for playing");
	}
	
	navigator.notification.alert(
		'Who is the winner, your the winner!',  // message
		alertCancelled,         // callback
		'All Done',            // title
		'Exit'                  // buttonName
	);
});















