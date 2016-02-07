Errors = new Mongo.Collection(null);

throwError = function(message) {
	Errors.insert({message: message});
};

ErrorsHelpers = (() => {	
	const errorMessage = function(sessionName ,field) {
		return Session.get(sessionName)[field];
	};

	const errorClass = function (field) {
		return !!Session.get(sessionName)[field] ? 'has-error' : '';
	};
	
	return {
		errorMessage: errorMessage,
		errorClass: errorClass
	}
})();

