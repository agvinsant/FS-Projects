//Adam Vinsant
//ASD 1210
//Week 1
//main.js

$('#home').on('pageinit', function(){
	

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

	// Calling inside chores function. Displays on Inside chores window
	$('#insideButton').on('click', function(){
		$.ajax({
			"url":'/asdproject/_all_docs?include_docs=true&startkey="inside-1"&endkey="inside-zzz"',
			"dataType": "json",
			"success":function(data){
				$.each(data.rows, function(index, chore){
					var chorename = chore.doc.chorename;
					var finishby = chore.doc.finishby;
					var urgency = chore.doc.urgency;
					var recurring = chore.doc.recurring;
					var difficulty = chore.doc.difficulty;
					var chorenotes = chore.doc.chorenotes;
					console.log(chorename);
					$(''+
						  '<li>'+										
								'<p>Chore Name: '+ chorename +'</p>'+
								'<p>Finish By: '+ finishby +'</p>'+
								'<p>Is this chore urgent?: '+ urgency +'</p>'+
								'<p>Is this a recurring chore?: '+ recurring +'</p>'+
								'<p>Difficulty: '+ difficulty +'</p>'+
								'<p>Chore Notes: '+ chorenotes +'</p>'+
						   '</li>'
                       ).appendTo('#insideItems');
				});
				$('#insideItems').listview('refresh');
			}
		});
	});

	//Calling Outside chore function
	$('#outsideButton').on('click', function(){
		$.ajax({
			"url":'/asdproject/_all_docs?include_docs=true&startkey="outside-1"&endkey="outside-zzz"',
			"dataType": "json",
			"success":function(data){
				$.each(data.rows, function(index, chore){
					var chorename = chore.doc.chorename;
					var finishby = chore.doc.finishby;
					var urgency = chore.doc.urgency;
					var recurring = chore.doc.recurring;
					var difficulty = chore.doc.difficulty;
					var chorenotes = chore.doc.chorenotes;
					console.log(chorename);
					$(''+
						  '<li>'+										
								'<p>Chore Name: '+ chorename +'</p>'+
								'<p>Finish By: '+ finishby +'</p>'+
								'<p>Is this chore urgent?: '+ urgency +'</p>'+
								'<p>Is this a recurring chore?: '+ recurring +'</p>'+
								'<p>Difficulty: '+ difficulty +'</p>'+
								'<p>Chore Notes: '+ chorenotes +'</p>'+
						   '</li>'
                       ).appendTo('#outsideItems');
				});
				$('#outsideItems').listview('refresh');
			}
		});
	});
	


//Call errand item functions
$('#errandsButton').on('click', function(){
	$.ajax({
		"url":'/asdproject/_all_docs?include_docs=true&startkey="errand-1"&endkey="errand-zzz"',
		"dataType": "json",
		"success":function(data){
			$.each(data.rows, function(index, chore){
				var chorename = chore.doc.chorename;
				var finishby = chore.doc.finishby;
				var urgency = chore.doc.urgency;
				var recurring = chore.doc.recurring;
				var difficulty = chore.doc.difficulty;
				var chorenotes = chore.doc.chorenotes;
				console.log(chorename);
						$(''+
							  '<li>'+										
									'<p>Chore Name: '+ chorename +'</p>'+
									'<p>Finish By: '+ finishby +'</p>'+
									'<p>Is this chore urgent?: '+ urgency +'</p>'+
									'<p>Is this a recurring chore?: '+ recurring +'</p>'+
									'<p>Difficulty: '+ difficulty +'</p>'+
									'<p>Chore Notes: '+ chorenotes +'</p>'+
							   '</li>'
                           ).appendTo('#errandItems');
			});
			$('#errandItems').listview('refresh');
		}
	});
});

//Calling Phone Call functions.
$('#phoneButton').on('click', function(){
	$.ajax({
		"url":'/asdproject/_all_docs?include_docs=true&startkey="phonecall-1"&endkey="phonecall-zzz"',
		"dataType": "json",
		"success":function(data){
			$.each(data.rows, function(index, chore){
				var chorename = chore.doc.chorename;
				var finishby = chore.doc.finishby;
				var urgency = chore.doc.urgency;
				var recurring = chore.doc.recurring;
				var difficulty = chore.doc.difficulty;
				var chorenotes = chore.doc.chorenotes;
				console.log(chorename);
				$(''+
					  '<li>'+										
							'<p>Chore Name: '+ chorename +'</p>'+
							'<p>Finish By: '+ finishby +'</p>'+
							'<p>Is this chore urgent?: '+ urgency +'</p>'+
							'<p>Is this a recurring chore?: '+ recurring +'</p>'+
							'<p>Difficulty: '+ difficulty +'</p>'+
							'<p>Chore Notes: '+ chorenotes +'</p>'+
					   '</li>'
                   ).appendTo('#phoneItems');
			});
			$('#phoneItems').listview('refresh');
		}
	});
});

//Calling paybill function
$('#payButton').on('click', function(){
	$.ajax({
		"url":'/asdproject/_all_docs?include_docs=true&startkey="paybill-1"&endkey="paybill-zzz"',
		"dataType": "json",
		"success":function(data){
			$.each(data.rows, function(index, chore){
				var chorename = chore.doc.chorename;
				var finishby = chore.doc.finishby;
				var urgency = chore.doc.urgency;
				var recurring = chore.doc.recurring;
				var difficulty = chore.doc.difficulty;
				var chorenotes = chore.doc.chorenotes;
				console.log(chorename);
				$(''+
					  '<li>'+										
							'<p>Chore Name: '+ chorename +'</p>'+
							'<p>Finish By: '+ finishby +'</p>'+
							'<p>Is this chore urgent?: '+ urgency +'</p>'+
							'<p>Is this a recurring chore?: '+ recurring +'</p>'+
							'<p>Difficulty: '+ difficulty +'</p>'+
							'<p>Chore Notes: '+ chorenotes +'</p>'+
					   '</li>'
                   ).appendTo('#payItems');
			});
			$('#payItems').listview('refresh');
		}
	});
});











