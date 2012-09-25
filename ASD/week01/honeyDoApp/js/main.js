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
			storeData(data);
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
	
	var autofillData = function (){
			for(var n in json){
				var id = Math.floor(Math.random()*100000001);
				localStorage.setItem(id,JSON.stringify(json[n]));
			}
	};

	var getData = function(){
			
	};
			
	var storeData = function(data){
					
	}; 
			
	var deleteItem = function (){
		var ask = confirm("Are you sure you want to delete this chore?"); 	//Change to fit form type
			if(ask){
				localStorage.removeItem(this.key);
				window.location.reload();
			}else{
				alert("Chore was not deleted!");	//change to fit form type
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

//The functions below can go inside or outside the pageinit function for the page in which it is needed.




