function (doc){
	if (doc._id.substr(0,6) === "inside"){
		emit(doc._id,{
			"chorename": doc.chorename,
			"finishby": doc.finishby,
			"urgency": doc.urgency,
			"recurring": doc.recurring,
			"difficulty": doc.difficulty,
			"chorenotes": doc.chorenotes
		});
	}
	
};