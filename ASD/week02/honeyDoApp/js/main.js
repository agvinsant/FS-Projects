//Adam Vinsant
//ASD 1210
//Week 1
//main.js

$('#home').on('pageinit', function(){
    //code needed for home page goes here
	
});    
        
$('#additem').on('pageinit', function(){
		console.log('item is visable');
       
	 var validate = function(){  
	   var myForm = $('#choreForm');  //Code commented out because using my own validate function
            delete $.validator.methods.date;
			myForm.validate({
            invalidHandler: function(form, validator) {
            },
            submitHandler: function() {
        var data = myForm.serializeArray();
            storeData(data);
        }
    	});
      }
    // moved these variables here to fix scope issues
      
      var  choreForm = $('#choreForm');
		
	var opt= ["Select Chore Type", "Inside", "Outside", "Errand", "Make Phone Call", "Pay Bill"];  //For New App...Change this to fit to new HTML	
    
    // Getting the value of the radio input types    
    var getSelectedRadio = function() {
        
		var radios = $('input:radio[name=urgency]:checked').val();
        
		console.log(radios);
		return radios;
    }
    
   
    
    
    //Saving Data to Local Storage
    var storeData = function(data){
       var id = Math.floor(Math.random()*10000001);
        /*if(!key){
            
        }else{
            id = key;
        };*/
        console.log(data);
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
        changePage('displayList');
        getData();
		
		console.log('storeData works');
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
        editSubmit.off();
        //change submitButton value to Edit button
        editSubmit.val("Edit Chore");        //change to fit form type
        
        // save key value established in this function as a property of the editSubmit event
        // so we can use that value when we save the data we edited.
        editSubmit.on("click", validate);
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
  		//edit link
		var editLink = $('<a href="#additem" class="editLink">Edit Chore</a>');
		editLink.key = key;
		editLink.on('click', editItem).appendTo(linksLi);
		
        
        // delete Link
		var deleteLink = $('<a href="#" class="deleteLink">Delete Chore</a>');
		deleteLink.key = key;
		deleteLink.on('click', deleteItem).appendTo(linksLi);
		console.log('makeItemLinks works');
        
    }
    
    
    // Getting Data from Local Storage and Displaying in a new page        
    var getData = function(){
        // tells function if the data is empty then you will be alerted and will revert back to form with display button missing
        if(localStorage.length === 0) {
            alert('There are no chores at this time.');        
       
           // autoFillData(); //delete this for working model. uncomment toggleControls function above.
        }
        console.log('getData works');
        
        for (var i=0, len=localStorage.length; i<len; i++) {
                var listItem = $('<li class="eachChore"></li>').appendTo('#chorelist');
                     var key = localStorage.key(i);
                     var value = localStorage.getItem(key);
                     var obj = JSON.parse(value);
                     
                     for(var n in obj){
                         $('<p>' + obj[n][0] + obj[n][1] + '</p>').appendTo(listItem);
                     }
                     var linksLi = $('<li id="links"></li>');
                     linksLi.appendTo(listItem);
     
           makeItemLinks(localStorage.key(i), linksLi); 
        }
		
    }
    
/*//Get image for catagory being displayed
    var getImage = function(typeName, makeSubList) {
                var imageLi = $('li');
		makeSubList.append(imageLi);
		var newImage = $('img');
		newImage.attr("src","images/" + typeName + ".gif");
		imageLi.append(newImage);
		
    }*/
   
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
    
    var changePage = function(pageID){
            $('#' + pageID).trigger('pageinit');
            $.mobile.changePage($('#' + pageID),{transition:'slide'});
                
            
    }
    
    // Global Variables
   
  
    var clearButton = $('#clearButton');
	clearButton.on("click", clearLocal);
    var submitButton = $('#submitButton');
	submitButton.on("click", validate);

        
        
        
        
    
    

    
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

	
	// Calling and loading JSON Data
	 $('#jsonButton').on('click',function(){
                $('#showData').empty();
                $('<p>').html('JSON Data Imported').appendTo('#showData');
                $.ajax({
                    url:"xhr/data.json",
                    type: 'GET',
                    dataType: 'json',
                    success: function(response){
                       console.log(response);
                       for(var i=0, j=response.chores.length;i<j;i++){
                               console.log(j);
							   var chores = response.chores[i];
                               $(''+
								  '<div id="items" style="padding:10px" data-role="fieldcontain">'+
										'<p>Chore Type: '+ chores.choretype +'</p>'+
										'<p>Chore Name: '+ chores.chorename +'</p>'+
										'<p>Finish By: '+ chores.finishby +'</p>'+
										'<p>Is this chore urgent?: '+ chores.urgency +'</p>'+
										'<p>Is this a recurring chore?: '+ chores.recurring +'</p>'+
										'<p>Difficulty: '+ chores.difficulty +'</p>'+
										'<p>Chore Notes: '+ chores.chorenotes +'</p>'+
								   '</div>'
                                 ).appendTo('#showData');
                       }
                    }
                })
			
    });
    
	// Calling and loading XML data
	$('#xmlButton').on('click',function(){
                $('#showData').empty();
                $('<p>').html('XML Data Imported').appendTo('#showData');
                $.ajax({
                    url:"xhr/data.xml",
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                       console.log(xml);
                       $(xml).find("item").each(function(){
						var type = $(this).find('type').text();
						var name = $(this).find('name').text();
						var finishby = $(this).find('finishby').text();
						var urgency = $(this).find('urgency').text();
						var recurring = $(this).find('recurring').text();
						var difficulty = $(this).find('difficulty').text();
						var notes = $(this).find('notes').text();
						
                            $(''+
								  '<div id="items" style="padding:10px" data-role="fieldcontain">'+
										'<p>Chore Type: '+ type +'</p>'+
										'<p>Chore Name: '+ name +'</p>'+
										'<p>Finish By: '+ finishby +'</p>'+
										'<p>Is this chore urgent: '+ urgency +'</p>'+
										'<p>Is this a recurring chore: '+ recurring +'</p>'+
										'<p>Difficulty: '+ difficulty +'</p>'+
										'<p>Chore Notes: '+ notes +'</p>'+
								   '</div>'
                                 ).appendTo('#showData');
                 	  })
				 }
			})
		});
		
	// Calling and loading CSV data
	$('#csvButton').on('click', function(){
			$('#showData').empty();
			$('<p>').html('CSV Data Loaded').appendTo('#showData');
			$.ajax({
				type: "GET",
				url: "xhr/data.csv",
				dataType: "text",
				success: function(data) {
					var line = data.split('\n');
					for (var i = 1, x = line.length; i < x; i++) {
						var obj = line[i];
						var item = obj.split(',');
						var itemList = $(''+
								  '<div id="items" style="padding:10px" data-role="fieldcontain">'+
										'<p>Chore Type: '+ item[0] +'</p>'+
										'<p>Chore Name: '+ item[1] +'</p>'+
										'<p>Finish By: '+ item[2] +'</p>'+
										'<p>Is this chore urgent: '+ item[3] +'</p>'+
										'<p>Is this a recurring chore: '+ item[4] +'</p>'+
										'<p>Difficulty: '+ item[5] +'</p>'+
										'<p>Chore Notes: '+ item[6] +'</p>'+
								   '</div>'
                                 ).appendTo('#showData');
							
				}		
				console.log(data)
			}
		})
	});











