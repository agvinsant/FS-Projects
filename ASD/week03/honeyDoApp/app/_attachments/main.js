//Adam Vinsant
//ASD 1210
//Week 1
//main.js
        
$('#additem').on('pageinit', function(){
		console.log('item is visable');
       

});

/*var urlVars = function(){
	var urlData = $($.mobile.activePage).data('url');
	var urlParts = urlData.split('?');
	var urlPairs = urlParts.split('&');
	var urlValues = {};
	for (var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};*/
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
};

 //Saving Data to Local Storage
 var storeData = function(data){ 
     console.log(data);
     
     var item= {};
         item.choretype = $('#choretype').val();
         item.chorename = $('#chorename').val();
         item.finishby  = $('#finishby').val();
         item.urgency   = $('#urgency').val();
         item.difficulty= $('#difficulty').val();
         item.recurring = $('#recurring').val();
         item.chorenotes= $('#chorenotes').val();
         item["_id"]= item.choretype+":"+item.chorename;
     $.couch.db("asdproject").saveDoc(item, {
     		success: function(data) {
     			console.log(data);
     			 
     		},
     		error: function(status){
     			console.log(status);
     		}
     });
     //alert("Chore Saved");
     changePage('home');
		//window.location.reload();
		console.log('storeData works');
 };

	


 var changePage = function(pageID){
         $('#' + pageID).trigger('pageinit');
         $.mobile.changePage($('#' + pageID),{transition:'slide'});
 };
 
 // Global Variables
 var submitButton = $('#submitButton');
	submitButton.on("click", validate);



// THIS METHOD BROKE EVERYTHING I HAD DONE SO I AM DOING IT A DIFFERENT WAY
/*$(document).on('pageshow', function(){
	var id = $(this).attr('href');
	console.log(id);
	var idCall = id.substr(1);
	console.log(idCall);
	$.couch.db('asdproject').openDoc(idCall, {
		success: function(data){
			var idVal = data._id;
			var revVal = data._rev;
			var editLink = $('.editLink');
			editLink.on('click', function(){
				$.couch.db('asdproject').saveDoc(idCall, {
					success: function(data){
						console.log(data);
						$('#choretype').val(choretype);
						$('#chorename').val(chorename);
						$('#finishby').val(finishby);
						$('#urgency').val(urgency);
						$('#recurring').val(recurring);
						$('#difficulty').val(difficulty);
						$('#chorenotes').val(chorenotes);
						
						var editSubmit = $('#submitButton');
						editSubmit.off();
						editSubmit.on('click', validate);
						
					},
					error:function(status){
						console.log(status);
					}
				});
			});
			
		}
	});
	
	var deleteLink= $('.deleteLink');
	deleteLink.on('click', function(){
		
		var chores = {
			_id: idVal,
			_rev: revVal
		};
		$.couch.db('asdproject').removeDoc(chores, {
			success: function(data){
				console.log(data);
				var ask = confirm("Are you really finished with this chore?");
					if(ask){
						alert('Chore was deleted!');
						window.location.reload();
					}else{
						alert("Chore was NOT deleted!");
					}
			},
			error: function(status){
				console.log(status);
			}
		});
	});
	
});	

*/
// THIS METHOD BROKE EVERYTHING SO I AM TRYING IT A DIFFERENT WAY SEE BELOW

var editItem = function(data){
	var id = $(this).attr('href');
	console.log(id);
	var idCall = id.substr(1);
	$.couch.db('asdproject').openDoc(idCall, {
		success: function(data){
			$.couch.db('asdproject').saveDoc(idCall, {
				success: function(data){
					console.log(data);
					$('#choretype').val(choretype);
					$('#chorename').val(chorename);
					$('#finishby').val(finishby);
					$('#urgency').val(urgency);
					$('#recurring').val(recurring);
					$('#difficulty').val(difficulty);
					$('#chorenotes').val(chorenotes);
					
					var editSubmit = $('#submitButton');
					editSubmit.off();
					editSubmit.on('click', validate);
					
				},
				error:function(status){
					console.log(status);
				}
			});
		}
	});
};
	
	
var deleteItem = function(data){
	var id = $(this).attr('href');
	console.log(id);
	var idCall= id.substr(1); 
	var idVal = data._id;
	var revVal = data._rev;
	
	var chores = {
			_id: idVal,
			_rev: revVal
		};
		$.couch.db('asdproject').removeDoc(chores, {
			success: function(data){
				console.log(data);
				var ask = confirm("Are you really finished with this chore?");
					if(ask){
						alert('Chore was deleted!');
						window.location.reload();
					}else{
						alert("Chore was NOT deleted!");
					}
			},
			error: function(status){
				console.log(status);
			}
		});
};
	


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
										'<ul data-role="listview data-inset="true" class="itemLinks">'+
											'<li><a href="#'+item["_id"]+'" class="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#'+item["_id"]+'" class="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#errands" data-theme="b"><h3>Back to Errand Runs</h3></a></li>'+
										'</ul>'+
								   '</li>'
	                           ).appendTo('#errandItems');
				});
				//$('.editLink').on('click', editItem);
				//$('.deleteLink').on('click', deleteItem);
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
											'<li><a href="#'+item["_id"]+'" class="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#'+item["_id"]+'" class="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#inside" data-theme="b"><h3>Back to Inside Chores</h3></a></li>'+
										'</ul>'+
								   '</li>'
	                           ).appendTo('#insideItems');
				});
			//	$('.editLink').on('click', editItem);
			//	$('.deleteLink').on('click', deleteItem);
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
											'<li><a href="#'+item["_id"]+'" class="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#'+item["_id"]+'" class="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#outside" data-theme="b"><h3>Back to Outside Chores</h3></a></li>'+
										'</ul>'+
								   '</li>'
	                           ).appendTo('#outsideItems');
				});
			//	$('.editLink').on('click', editItem);
			//	$('.deleteLink').on('click', deleteItem);
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
											'<li><a href="#'+item["_id"]+'" class="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
											'<li><a href="#'+item["_id"]+'" class="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
											'<li><a href="#phoneCalls" data-theme="b"><h3>Back to Make Phone Call items</h3></a></li>'+
										'</ul>'+
								  '</li>'
	                           ).appendTo('#phoneItems');
				});
			//	$('.editLink').on('click', editItem);
			//	$('.deleteLink').on('click', deleteItem);
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
										'<li><a href="#'+item["_id"]+'" class="editLink" data-theme="b"><h3>Edit Chore</h3></a></li>'+
										'<li><a href="#'+item["_id"]+'" class="deleteLink" data-theme="b"><h3>Delete Chore</h3></a></li>'+
										'<li><a href="#payBill" data-theme="b"><h3>Back to Pay Bill items</h3></a></li>'+
									'</ul>'+
							   '</li>'
                         ).appendTo('#payItems');				
				});
			//	$('.editLink').on('click', editItem);
			//	$('.deleteLink').on('click', deleteItem);
				$('#payItems').listview('refresh');
			}
	});
});











