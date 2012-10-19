function (doc){
	if (doc._id.substr(0,15) === "Make Phone Call"){
		emit(doc._id,{
			"chorename": doc.chorename,
			"finishby": doc.finishby,
			"urgency": doc.urgency,
			"recurring": doc.recurring,
			"difficulty": doc.difficulty,
			"chorenotes": doc.chorenotes,
			"_id":doc._id,
			"_rev":doc._rev
		});
	}
	
};