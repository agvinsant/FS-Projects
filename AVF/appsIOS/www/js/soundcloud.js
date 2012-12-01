// soundcloud API

var playSound = function(genre){
		SC.get('/tracks', {
			genres: genre,
			bpm: {
				from:100	
			}
		},
		function(tracks) {
			var random = Math.floor(Math.random() * 49);
			SC.oEmbed(tracks[random].uri, 
			{ auto_play:true },
			document.getElementById('target'));	
		});
	};
	
window.onload = function(){
	SC.initialize({
		client_id:'70712bdef1eadea40006b6409b8b8af7'	
	});
	var menuLinks = document.getElementsByClassName('genre');
	for (var i=0, j=menuLinks.length; i<j; i++){
			var menuLink = menuLinks[i];
			menuLink.onClick = function(e){
					e.preventDefault();
					playSound(menuLink.innerHTML);
				};
		}
};

