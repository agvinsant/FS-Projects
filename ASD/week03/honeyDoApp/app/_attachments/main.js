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
        console.log(data);
        getSelectedRadio();
        var item= {};
            item.choretype = [$('#choretype').val()];
            item.chorename = [$('#chorename').val()];
            item.finishby  = [$('#finishby').val()];
           // item.urgency   = [getSelectedRadios()];
            item.difficulty= [$('#difficulty').val()];
            item.recurring = [$('#recurring').val()];
            item.chorenotes= [$('#chorenotes').val()];
            
        $.couch.db("asdproject").saveDoc(item, {
        		success: function(data) {
        			console.log(data);
        		},
        		error: function(status){
        			console.log(status);
        		}
        });
        alert("Chore Saved");
        changePage('home');
        //getData();
		
		console.log('storeData works');
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
	
/*	// Make edit and delete links for each chore
      var makeItemLinks = function(key, linksLi) {
  		//edit link
		var editLink = $('<a href="#additem" id="editLink">Edit Chore</a>');
		editLink.key = key;
		editLink.on('click', editItem).appendTo(linksLi);
		
        
        // delete Link
		var deleteLink = $('<a href="#" id="deleteLink">Delete Chore</a>');
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
		
    }*/
    
    var changePage = function(pageID){
            $('#' + pageID).trigger('pageinit');
            $.mobile.changePage($('#' + pageID),{transition:'slide'});
    }
    
    // Global Variables
   
  
    
    var submitButton = $('#submitButton');
	submitButton.on("click", validate);
});

$('#errands').on('pageinit', function(){
	$.couch.db('asdproject').view('honeydoapp/errands', {
			success:function(data){
				$('#errandItems').empty();
				$.each(data.rows, function(index, chore){
					var item = (chore.value || chore.doc);
					console.log(chorename);
							$(''+
								  '<li>'+										
										'<p><strong>Chore Name: </strong>'+ item.chorename +'</p>'+
										'<p><strong>Finish By: </strong>'+ item.finishby +'</p>'+
										'<p><strong>Is this chore urgent?: </strong>'+ item.urgency +'</p>'+
										'<p><strong>Is this a recurring chore?: </strong>'+ item.recurring +'</p>'+
										'<p><strong>Difficulty: </strong>'+ item.difficulty +'</p>'+
										'<p><strong>Chore Notes: </strong>'+ item.chorenotes +'</p>'+
										'<ul data-role="listview data-inset="true">'+
											'<li><a href="#additem" id="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#" id="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#errands" data-theme="b"><h3>Back to Errand Runs</h3></a></li>'+
										'</ul>'+
								   '</li>'
	                           ).appendTo('#errandItems');
				});
				$('#errandItems').listview('refresh');
			}
	});
});

$('#inside').on('pageinit', function(){
	$.couch.db('asdproject').view('honeydoapp/inside', {
			success:function(data){
				$('#insideItems').empty();
				$.each(data.rows, function(index, chore){
					var item = (chore.value || chore.doc);
					console.log(chorename);
							$(''+
								  '<li>'+										
										'<p><strong>Chore Name: </strong>'+ item.chorename +'</p>'+
										'<p><strong>Finish By: </strong>'+ item.finishby +'</p>'+
										'<p><strong>Is this chore urgent?: </strong>'+ item.urgency +'</p>'+
										'<p><strong>Is this a recurring chore?: </strong>'+ item.recurring +'</p>'+
										'<p><strong>Difficulty: </strong>'+ item.difficulty +'</p>'+
										'<p><strong>Chore Notes: </strong>'+ item.chorenotes +'</p>'+
										'<ul data-role="listview data-inset="true">'+
											'<li><a href="#additem" id="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#" id="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#inside" data-theme="b"><h3>Back to Inside Chores</h3></a></li>'+
										'</ul>'+
								   '</li>'
	                           ).appendTo('#insideItems');
				});
				$('#insideItems').listview('refresh');
			}
	});
});

$('#outside').on('pageinit', function(){
	$.couch.db('asdproject').view('honeydoapp/outside', {
			success:function(data){
				$('#outsideItems').empty();
				$.each(data.rows, function(index, chore){
					var item = (chore.value || chore.doc);
					console.log(chorename);
							$(''+
								  '<li>'+										
										'<p><strong>Chore Name: </strong>'+ item.chorename +'</p>'+
										'<p><strong>Finish By: </strong>'+ item.finishby +'</p>'+
										'<p><strong>Is this chore urgent?: </strong>'+ item.urgency +'</p>'+
										'<p><strong>Is this a recurring chore?: </strong>'+ item.recurring +'</p>'+
										'<p><strong>Difficulty: </strong>'+ item.difficulty +'</p>'+
										'<p><strong>Chore Notes: </strong>'+ item.chorenotes +'</p>'+
										'<ul data-role="listview data-inset="true">'+
											'<li><a href="#additem" id="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#" id="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#outside" data-theme="b"><h3>Back to Outside Chores</h3></a></li>'+
										'</ul>'+
								   '</li>'
	                           ).appendTo('#outsideItems');
				});
				$('#outsideItems').listview('refresh');
			}
	});
});

$('#phoneCalls').on('pageinit', function(){
	$.couch.db('asdproject').view('honeydoapp/phoneCalls', {
			success:function(data){
				$('#phoneItems').empty();
				$.each(data.rows, function(index, chore){
					var item = (chore.value || chore.doc);
					console.log(chorename);
							$(''+
								  '<li>'+										
								  		'<p><strong>Chore Name: </strong>'+ item.chorename +'</p>'+
										'<p><strong>Finish By: </strong>'+ item.finishby +'</p>'+
										'<p><strong>Is this chore urgent?: </strong>'+ item.urgency +'</p>'+
										'<p><strong>Is this a recurring chore?: </strong>'+ item.recurring +'</p>'+
										'<p><strong>Difficulty: </strong>'+ item.difficulty +'</p>'+
										'<p><strong>Chore Notes: </strong>'+ item.chorenotes +'</p>'+
										'<ul data-role="listview data-inset="true">'+
											'<li><a href="#additem" id="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#" id="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#phoneCalls" data-theme="b"><h3>Back to Make Phone Call items</h3></a></li>'+
										'</ul>'+
								  '</li>'
	                           ).appendTo('#phoneItems');
				});
				$('#phoneItems').listview('refresh');
			}
	});
});

$('#payBill').on('pageinit', function(){
	$.couch.db('asdproject').view('honeydoapp/paybill', {
			success:function(data){
				$('#payItems').empty();
				$.each(data.rows, function(index, chore){
					var item = (chore.value || chore.doc);
					$(''+
							  '<li>'+										
									'<p><strong>Chore Name: </strong>'+ item.chorename +'</p>'+
									'<p><strong>Finish By: </strong>'+ item.finishby +'</p>'+
									'<p><strong>Is this chore urgent?: </strong>'+ item.urgency +'</p>'+
									'<p><strong>Is this a recurring chore?: </strong>'+ item.recurring +'</p>'+
									'<p><strong>Difficulty: </strong>'+ item.difficulty +'</p>'+
									'<p><strong>Chore Notes: </strong>'+ item.chorenotes +'</p>'+
									'<ul data-role="listview data-inset="true">'+
										'<li><a href="#additem" id="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
										'<li><a href="#" id="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
										'<li><a href="#payBill" data-theme="b"><h3>Back to Pay Bill items</h3></a></li>'+
									'</ul>'+
							   '</li>'
                         ).appendTo('#payItems');				
				});
				$('#payItems').listview('refresh');
			}
	});
});











