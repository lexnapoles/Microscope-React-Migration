AuthHelpers = (() => {
	const loggingIn = () => Meteor.loggingIn();

	const hasUser = () => !!Meteor.user();

	const ownsDocument = (userId, doc) => doc && doc.userId === userId;

	const ownPost = (userId) => userId === Meteor.userId();

	return {
		loggingIn: loggingIn,
		hasUser: hasUser,
		ownsDocument: ownsDocument,
		ownPost: ownPost
	};
})();



