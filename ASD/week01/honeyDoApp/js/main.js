$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#choreForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(this.key);
		}
	});

	var getSelectedRadio= function() {
        var radios = document.forms[0].urgency;
        for(var i=0; i<radios.length; i++) {
            if(radios[i].checked) {
                urgencyValue = radios[i].value;
            }
        }
    }
	
	var storeData = function(key){
		if(!key){
			var id = Math.floor(Math.random()*10000001);
		}else{ 
			id=key;
		}
		getSelectedRadio();
		var item= {};
			item.choretype = ['Chore Type:', $('#choretype').val()];
			item.chorename = ['Chore Name:', $('#chorename').val()];
			item.finishby  = ['Finish By:', $('#finishby').val()];
			item.urgency   = ['Is this chore Urgent?:', urgencyValue];
			item.difficulty= ["Difficulty:", $('#difficulty').val()];
			item.recurring = ["Is this a recurring chore?:", $('#recurring').val()];
			item.chorenotes= ["Chore Notes:", $('#chorenotes').val()];
			
		localStorage.setItem(id, JSON.stringify(item));
		alert("Chore Saved");
	}; 
			
	var getData = function(){
		if(localStorage.length === 0) {
			alert('There are no chores at this time so default data was added.');		
			autoFillData(); //delete this for working model.
			
			$('<ul class='choreList' id='choreList'></ul>').appendTo('#showList');
			
			for (var i=0, len=localStorage.length; i<len; i++) {
				$('<li class='eachChore' id='eachChore'></li>').appendTo('#choreList');
				var linksLi = $('<li></li>');
				var key = localStorage.key(i);	
				var value = localStorage.getItem(key);
				var object = JSON.parse(value);
				var makeSubList = $('<ul id='subList'></ul>');
				$('#eachChore').append(makeSubList);
				getImage(object.choretype[1], makeSubList);
				for(var n in object) {
					$('<li id='obj'></li>').appendTo('#subList');
					var optSubText = object[n][0] + " " + object[n][1];
					$('#obj').html(optSubText);
					$('#subList').append(linksLi);
				}
				makeItemLinks(localStorage.key(i), linksLi);
			}
			
		}
	};
			
	var autofillData = function (){
			for(var n in json){
				var id = Math.floor(Math.random()*100000001);
				localStorage.setItem(id,JSON.stringify(json[n]));
			}
	};
	
	var deleteItem = function (){
		var ask = confirm("Are you sure you want to delete this chore?"); 	
			if(ask){
				localStorage.removeItem(this.key);
				window.location.reload();
			}else{
				alert("Chore was not deleted!");	
				window.location.reload();
				return false;
			}			
	};
													
	var clearLocal = function(){
		if(localStorage.length === 0) {
			alert('There is no data to clear.');
		} else {
			localStorage.clear();
			alert('All chores are deleted.');
			window.location.reload();
			return false;
		}
	};
	
	$("#submitButton").on('click', storeData);
    $("#displayButton").on('click', getData);
    $("#clearButton").on('click', clearLocal);
	
});

$('#displayLink').on('pageinit', function(){
	//code needed for home page goes here
});

$('#construction').on('pageinit', function(){
	//code needed for home page goes here
});

$('#about').on('pageinit', function(){
	//code needed for home page goes here
});	




