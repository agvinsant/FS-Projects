//Adam Vinsant
//ASD 1210
//Week 1
//main.js

$('#home').on('pageinit', function(){
    //code needed for home page goes here
});    
        
$('#additem').on('pageinit', function(){
		console.log('item is visable');
       var myForm = $('#choreForm');  //Code commented out because using my own validate function
            delete $.validator.methods.date;
			myForm.validate({
            invalidHandler: function(form, validator) {
            },
            submitHandler: function() {
        var data = myForm.serializeArray();
            storeData(this.key);
        }
    });
    // moved these variables here to fix scope issues
    var    errMsg = $('#errors'),  
        choreForm = $('#choreForm');
		
	var opt= ["Select Chore Type", "Inside", "Outside", "Errand", "Make Phone Call", "Pay Bill"],  //For New App...Change this to fit to new HTML
        urgencyValue;	
    
    // Getting the value of the radio input types    
    var getSelectedRadio = function() {
        
		var radios = $('input:radio[name=urgency]:checked').val();
        
		console.log(radios);
		return radios;
    }
    
   
    
    
    //Saving Data to Local Storage
    var storeData = function(key){
        if(!key){
            var id = Math.floor(Math.random()*10000001);
        }else{
            id = key;
        };
        getSelectedRadio();
        var item= {};
            item.choretype = ['Chore Type:', $('#choretype').val()];
            item.chorename = ['Chore Name:', $('#chorename').val()];
            item.finishby  = ['Finish By:', $('#finishby').val()];
           // item.urgency   = ['Is this chore Urgent?:', getSelectedRadios()];
            item.difficulty= ["Difficulty:", $('#difficulty').val()];
            item.recurring = ["Is this a recurring chore?:", $('#recurring').val()];
            item.chorenotes= ["Chore Notes:", $('#chorenotes').val()];
            
        localStorage.setItem(id, JSON.stringify(item));
        alert("Chore Saved");
		
		console.log('storeData works');
    }
    
    //Get image for catagory being displayed
    var getImage = function(typeName, makeSubList) {
        var imageLi = $('div')
                .attr('align', 'left')    
                .append('#items li a' + key);

            var newImg = $('img')
                .attr("src", "images/" + typeName + ".jpg")
                .append("#imageLi" + key);
				
				console.log('getImage works');
    }
    
    // fills local storage with JSON Data
    var autoFillData = function (){
            for(var n in json){
                var id = Math.floor(Math.random()*100000001);
                localStorage.setItem(id,JSON.stringify(json[n]));
				
            };
			console.log('autofillData works');
    }

	var editItem = function() {
        // Getting data from local storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        // populating the form with data from local storage
        $('#choretype').val(item.choretype[1]);        //change id's to fit html and form type
        $('#chorename').val(item.chorename[1]);        //change id's to fit html and form type
        $('#finishby').val(item.finishby[1]);            //change id's to fit html and form type
        var radios = $('#urgency').val();
        for(var i=0; i<radios.length; i++) {
            if(radios[i].val() == "Yes" && item.urgency[1] == "Yes") {        //Change id tags to fit html
                radios[i].attr("checked", "checked");
            }else if($(radios[i]).val() === "No" && item.urgency[1] == "No") {
                radios[i].attr("checked", "checked");
        	}
        
        }
        $('#recurring').val(item.recurring[1]);
        $('#difficulty').val(item.difficulty[1]);        //Change to fit html and form type
        $('#chorenotes').val(item.chorenotes[1]);
        
        var editSubmit = $('#submitButton');
        //remove the initial listener from the input submitButton
        editSubmit.off("click", storeData);
        //change submitButton value to Edit button
        editSubmit.val("Edit Chore");        //change to fit form type
        
        // save key value established in this function as a property of the editSubmit event
        // so we can use that value when we save the data we edited.
        editSubmit.on("click", storeData);
        editSubmit.key = this.key;
		console.log('editItem works');
    }
   
   
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
			console.log('deleteItem works');           
    }
	
	// Make edit and delete links for each chore
      var makeItemLinks = function(key, linksLi) {
        //add edit single item link
        var editLink = $('a');
        editLink.attr("href","#additem");
        editLink.key = key;
        var editText = "Edit Chore";        
        editLink.addClass("editLink")
        	.on('click', editItem)
        	.html(editText);
        linksLi.append(editLink);
        
        // delete Link
        var deleteLink = $('a');
        deleteLink.attr("href","#");
        deleteLink.key = key;
        var deleteText = "Delete Chore";        
        deleteLink.addClass("deleteLink")
			.on('click', deleteItem)
        	.html(deleteText);
        linksLi.append(deleteLink);
		
		console.log('makeItemLinks works');
        
    }
    
    // Getting Data from Local Storage and Displaying in a new page        
    var getData = function(){
        // tells function if the data is empty then you will be alerted and will revert back to form with display button missing
        if(localStorage.length === 0) {
            alert('There are no chores at this time so default data was added.');        
       
            autoFillData(); //delete this for working model. uncomment toggleControls function above.
        }
        
        var makeDiv = $('<div id="items"></div>');
        makeDiv.appendTo('#showList');
        var makeList = $('ul');
        makeList.addClass("chorelist")
        	.appendTo('#items');
        
        for (var i=0, len=localStorage.length; i<len; i++) {
                var eachChore = $('li');
                eachChore.addClass('eachChore')
               		.appendTo('.chorelist');
                var linksLi = $('li');
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                
                // Convert string from local storage into object
                var object = JSON.parse(value);
                var makeSubList = $('<ul id="each"></ul>');
                makeSubList.appendTo('.eachchore');
                getImage(object.choretype[1], makeSubList);
                for(var n in object) {
                    var makeSubLi = $('li');
                    var optSubText = object[n][0] + " " +object[n][1];
                    makeSubLi.appendTo('#each')
						.html(optSubText);
                    linksLi.appendTo('#each');    
                }
            makeItemLinks(localStorage.key(i), linksLi); // Create the edit and delete buttons/links for each item in local storage
        }
		console.log('getData works');
    }
   
    //Clear Local Storage                                                
    var clearLocal = function(){
        if(localStorage.length === 0) {
            alert('There is no data to clear.');
        } else {
            localStorage.clear();
            alert('All chores are deleted.');
            window.location.reload();
            return false;
        }
		console.log('clearLocal works');
    }
      
      
    
    // Global Variables
   
    var displayButton = $('#displayButton');
	displayButton.on("click", getData);
    var clearButton = $('#clearButton');
	clearButton.on("click", clearLocal);
    var submitButton = $('#submitButton');
	submitButton.on("click", storeData);
        
        //Event Handlers
        
        
        
        
    
    

    
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

	
	//Validate function
/*    var validate = function(e){
            var getChoreType = $('#choretype');    //change var's and id's to fit form type
            var getChoreName = $('#chorename');
            var getFinishBy  = $('#finishby');
            
            //reset error messages
            $(".error").hide();
            $('#errors').empty();
            getChoreType.css("border","none");
            getChoreName.css("border","none");  
            getFinishBy.css("border","none");
        
            
            
            //Get Error messages for empty required field
            var messageArray = [];
            
            //Chore Type validation
            if(getChoreType.val("Select Chore Type")){        //Change to fit form type
                var typeError = "!!!Please choose a chore type!!!";
                getChoreType.css("border","3px solid red");
                messageArray.push(typeError);
            };
            
            //Chore Name Validation
            if(getChoreName.val("")){
                var choreNameError = "!!!Please enter a chore name!!!";        //Change to fit form type
                getChoreName.css("border","3px solid red");
                messageArray.push(choreNameError);
            };
            
            //Finish By Validation
            if(getFinishBy.val("")){
                var finishByError = "!!!Please enter a finish date!!!";        //Change to fit form type
                getFinishBy.css("border","3px solid red");
                messageArray.push(finishByError);
            };
            
            // Display errors if any on the screen.
            if(messageArray.length >=1) {
                for(var i=0, j= messageArray.length; i<j; i++) {
                    var text = document.createElement('li');
                    text.innerHTML = messageArray[i];
                    errMsg.appendChild(text);
                };
            e.preventDefault();
            return false;
            }else{
                storeData(this.key);
            };
          console.log('validate function works');   
      };*/
      
	 











