validatePost = function (post) {
	var errors = {};

	if (!post.title) {
		errors.title = "Please fill in a headline";
	}

	if (!post.url) {
		errors.url = "Please fill in a URL";
	}

	return errors;
};

Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function(userId, post) { return AuthHelpers.ownsDocument(userId, post); },
	remove: function(userId, post) { return AuthHelpers.ownsDocument(userId, post); }
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});
Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var errors = validatePost(postAttributes);
		if (errors.title || errors.url) {
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
		}

		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	},

	postEdit: function(postId, postProperties) {
		check(postId, String);
		check(postProperties, {
			title: String,
			url: String,
		});

		var errors = validatePost(postProperties);
		if (errors.title || errors.url) {
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
		}


		var postWithSameLink = Posts.findOne({url: postProperties.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		Posts.update(postId, {$set: postProperties});

		return {
			_id: postId
		}
	},

	upvote: function(postId) {
		check(this.userId, String);
		check(postId, String);

		var affected = Posts.update({
			_id: postId,
			upvoters: {$ne: this.userId}
		}, {
			$addToSet: {upvoters: this.userId},
			$inc: {votes: 1}
		});

		if (!affected)  {
			throw new Meteor.Error('invalid', "You weren't able to upvote that post");
		}
	}
});








