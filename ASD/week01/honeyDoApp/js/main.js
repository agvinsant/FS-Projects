//Adam Vinsant
//ASD 1210
//Week 1
//main.js

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

	/*	var myForm = $('#choreForm');  //Code commented out because using my own validate function
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(this.key);
		}
	});*/
	
	// Global Variables
		urgencyValue;
	var	errMsg = $('#errors'),  
    	choreForm = $('#choreForm'),
		displayButton = $('#displayButton'),
		clearButton = $('#clearButton'),
		submitButton = $('#submitButton');
		
		//Event Handlers
		clearButton.on("click", clearLocal);
		submitButton.on("click", validate);
		displayButton.on("click", getData);
		
	
	// Getting the value of the radio input types	
	var getSelectedRadio= function() {
        var radios = $('#urgency').val();
        for(var i=0; i<radios.length; i++) {
            if(radios[i].checked) {
                urgencyValue = radios[i].val();
            }
        }
    };
	
	// fills local storage with JSON Data
	var autofillData = function (){
			for(var n in json){
				var id = Math.floor(Math.random()*100000001);
				localStorage.setItem(id,JSON.stringify(json[n]));
			}
	};
	
	// Deletes individual items in list
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
	
	var editItem = function() {
		// Getting data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// populating the form with data from local storage
		$('#choretype').val() = item.choretype[1];		//change id's to fit html and form type
		$('#chorename').val() = item.chorename[1];		//change id's to fit html and form type
		$('#finishby').val() = item.finishby[1];			//change id's to fit html and form type
		var radios = $('#urgency').val();
		for(var i=0; i<radios.length; i++) {
		    if(radios[i].val() == "Yes" && item.urgency[1] == "Yes") {		//Change id tags to fit html
			    radios[i].attr("checked", "checked");
		    }else if(radios[i].val() === "No" && item.urgency[1] == "No") {
			    radios[i].attr("checked", "checked");
		}
	    
		};
		
		$('#difficulty').val() = item.difficulty[1];		//Change to fit html and form type
		$('#chorenotes').val() = item.chorenotes[1];
		
		var editSubmit = $('#submitButton');
		//remove the initial listener from the input submitButton
		editSubmit.unbind("click");;
		//change submitButton value to Edit button
		editSubmit.val("Edit Chore");		//change to fit form type
		
		// save key value established in this function as a property of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.on("click", validate);
		editSubmit.key = this.key;
    };
	
	var validate = function(e){
			var getChoreType = $('#choretype').val();	//change var's and id's to fit form type
			var getChoreName = $('#chorename').val();
			var getFinishBy  = $('#finishby').val();
			
			//reset error messages
			$(".error").hide();
			$('#errors').empty();
			getChoreType.css("border","none");
			getChoreName.css("border","none");  
			getFinishBy.css("border","none");
		
			
			
			//Get Error messages for empty required field
			var messageArray = [];
			
			//Chore Type validation
			if(getChoreType.value === "Select Chore Type") {		//Change to fit form type
				var typeError = "!!!Please choose a chore type!!!";
				getChoreType.css("border","3px solid red");
				messageArray.push(typeError);
			}
			
			//Chore Name Validation
			if(getChoreName.value === "") {
				var choreNameError = "!!!Please enter a chore name!!!";		//Change to fit form type
				getChoreName.css("border","3px solid red");
				messageArray.push(choreNameError);
			}
			
			//Finish By Validation
			if(getFinishBy.value === "") {
				var finishByError = "!!!Please enter a finish date!!!";		//Change to fit form type
				getFinishBy.css("border","3px solid red");
				messageArray.push(finishByError);
			}
			
			// Display errors if any on the screen.
			if(messageArray.length >=1) {
				for(var i=0, j= messageArray.length; i<j; i++) {
					var text = document.createElement('li');
					text.innerHTML = messageArray[i];
					errMsg.appendChild(text);
				}
			e.preventDefault();
			return false;
			}else{
				storeData(this.key);
			}
			
	  };
	  
	  var makeItemLinks = function(key, linksLi) {
	    //add edit single item link
	    var editLink = $('a');
	    editLink.href = '#additem';
	    editLink.key = key;
	    var editText = "Edit Chore";		
	    editLink.attr("class", "editLink");
	    editLink.on('click', editItem);
	    editLink.html(editText);
	    linksLi.append(editLink);
	    
	    // delete Link
	    var deleteLink = $('a');
	    deleteLink.href = "#";
	    deleteLink.key = key;
	    var deleteText = "Delete Chore";		
	    deleteLink.attr("class", "deleteLink");
	    deleteLink.on('click', deleteItem);
	    deleteLink.html(deleteText);
	    linksLi.append(deleteLink);
	    
	};
	
	//Saving Data to Local Storage
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
	
	// Getting Data from Local Storage and Displaying in a new page		
	var getData = function(){
		// tells function if the data is empty then you will be alerted and will revert back to form with display button missing
		if(localStorage.length === 0) {
			alert('There are no chores at this time so default data was added.');		
		//toggleControls("off");
		autoFillData(); //delete this for working model. uncomment toggleControls function above.
		}
		
		$('<div id="items"></div>').appendTo('#showList');
		$('<ul class="chorelist"></ul>').appendTo('#items');
		
		for (var i=0, len=localStorage.length; i<len; i++) {
				$('<li class="eachchore"></li>').appendTo('.chorelist');
				var linksLi = $('<li></li>');
				var key = localStorage.key(i);
            	var value = localStorage.getItem(key);
				
				// Convert string from local storage into object
				var makeSubList = $('<ul id="each"></ul>');
				makeSubList.appendTo('.eachchore');
				getImage(object.choretype[1], makeSubList);
				for(var n in object) {
					var makeSubLi = $('<li></li>');
					var optSubText = object[n][0] + " " +object[n][1];
					makeSubLi.appendTo('#each');
					linksLi.appendTo('#each');	
				};
			makeItemLinks(localStorage.key(i), linksLi); // Create the edit and delete buttons/links for each item in local storage
		};
	};
	
	//Get image for catagory being displayed
    var getImage = function(typeName, makeSubList) {
		var imageLi = $('div')
				.attr('align', 'left')	
				.append('#items li a' + key);

			var newImg = $('img')
				.attr("src", "images/" + typeName + ".jpg")
				.append("#imageLi" + key);
	
    };
	
	

	
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




