PostEditPage = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData () {
		const postId = FlowRouter.getParam("_id");

		let data = {},
				postHandle = Meteor.subscribe('singlePost', postId),
				postReady = postHandle.ready(),
				post = Posts.findOne(postId);

		if (postReady) {
			Object.assign(data, {
				post: post,
				postReady: postReady
			});
		}

		return data;
	},

	getView () {
		return AuthHelpers.ownPost(this.data.post.userId)
			? <PostEditContainer post={this.data.post} />
			: <AccessDenied message={"You are not the author of this post"}/>;
	},

	render () {
		return this.data.postReady
			? this.getView()
			: <Loading />
	}
});