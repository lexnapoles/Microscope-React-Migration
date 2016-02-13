AuthHelpers = (() => {	
	const loggingIn = () => Meteor.loggingIn();
	
	const hasUser = () => !!Meteor.user();

	const ownPost = (userId) => userId === Meteor.userId();

	return {	
		loggingIn: loggingIn,
		hasUser: hasUser,	
		ownPost: ownPost
	};
})();



