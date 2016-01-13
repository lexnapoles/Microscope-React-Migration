Meteor.publish('posts', function(options) {
	check(options, {
		sort: Object, 
		limit: Number
	});
	return Posts.find({}, options);
});

Meteor.publish('newFivePosts', function() {
	return Posts.find({}, {sort: {submitted: -1, _id: -1}, limit: 5});
});


Meteor.publish('singlePost', function(id) {
	check(id, String);
	return Posts.find(id);
});

Meteor.publish('comments', function(postId) {
	check(postId, String);
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
	 return Notifications.find({userId: this.userId, read: false});
});