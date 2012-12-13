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
$('.camera').on('click', function(){
	
	var  cameraSuccess = function(imageURI) {
		var image = document.getElementById('myImage');
		image.src = imageURI;
	};
	
	 var cameraFail = function(message) {
		alert('Failed because: ' + message);
	};
	
	navigator.camera.getPicture(cameraSuccess, cameraFail, { quality: 50, 
    destinationType: Camera.DestinationType.FILE_URI }); 

});

//  Cordova Geolocation Functions... Gets your current geolocation and displays the info. more functions to come
$('#geolocation').on('click', function(){
	var geoSuccess = function(position) {
    $('#geoInfo').html('Latitude: '          + position.coords.latitude          + '<br/>' +
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
		$('#heading').html('Heading: ' + heading.magneticHeading);
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

// Accelerometer

$('#accelerometer').on('click', function(){
	var accSuccess = function(acceleration) {
    $('#accInfo').html('Acceleration X: ' + acceleration.x + '<br/>' +
					  'Acceleration Y: ' + acceleration.y + '<br/>' +
					  'Acceleration Z: ' + acceleration.z + '<br/>' +
					  'Timestamp: '      + acceleration.timestamp + '<br/>');
	};
	
	var accError= function() {
		alert('There is something wrong!');
	};
	
	navigator.accelerometer.getCurrentAcceleration(accSuccess, accError);
});

// Geolocation and wunderground.com Radar Mashup

$('#mapMe').on('click', function(){
	
		var mapSuccess = function(position){
			var element = $('mapView');
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var location = latitude+','+longitude; 
			var mapImg = 'http://api.wunderground.com/api/054337f30a764ea2/animatedradar/image.gif?centerlat="+latitude+"&centerlon="+longitude+"&radius=50&width=480&height=480&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50';
			element.html('<img src="'+mapImg+'">');
		};
		
		var mapFail = function(error) {
			alert('code: '    + error.code    + '\n' +
          			'message: ' + error.message + '\n');
    	};
		
		navigator.geolocation.getCurrentPosition(mapSuccess, mapFail);	
});

// wunderground.com weather stats and Geolocation w/ camera option

$('#weather').on('click', function(){
	
	var condition = function(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var location = latitude+","+longitude;	
		
		$.ajax({
			   url : 'http://api.wunderground.com/api/054337f30a764ea2/geolookup/conditions/q/' + location +'.json',
			   dataType : "jsonp",
			   success : function(weather) {
			   //console.log(weather);
			   var condition_pic = weather.current_observation.icon_url;
			   var city = weather.location.city;
			   var state = weather.location.state;
			   var temp = weather.current_observation.temp_f;
			   var humidity = weather.current_observation.relative_humidity;
			   var wind_speed = weather.current_observation.wind_mph;
			   var wind_dir = weather.current_observation.wind_dir;
			   var wind_gust = weather.current_observation.wind_gust_mph;
			   
			   $( ' ' +
			   		'<center><section>' +
						'<ul>' +
							'<li><img src="' + condition_pic + '" /></li>' +
							'<li><p>' + city + ', ' + state + '</p></li>' +
							'<li><p>Current temp: ' + temp + '°F' + '</p></li>' +
							'<li><p>Humidity: ' + humidity + '</p></li>' +
							'<li><p>Wind Speed: ' + wind_speed + '</p></li>' +
							'<li><p>Wind Direction: ' + wind_dir + '</p></li>' +
							'<li><p>Wind Gusts: ' + wind_gust + 'MPH' + '</p></li>' +
						'</ul>' +
					'</section></center>'	
				).appendTo('#forcast');
			 }
		});
	 };
	 
	 var weatherError = function(){
		alert('There was an error');	 
	};
	
	navigator.geolocation.getCurrentPosition(condition, weatherError);
});















