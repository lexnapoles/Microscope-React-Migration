PostPageContainer = React.createClass({
	mixins: [ReactMeteorData],
		
	getMeteorData () {		
		let data = {},
			id = FlowRouter.getParam("_id"),
			postHandle = Meteor.subscribe('singlePost', id),			
			commentsHandle = Meteor.subscribe('comments', id),
			postReady = postHandle.ready(),
			commentsReady =  commentsHandle.ready();
			
		Object.assign(data, {
			postReady: postReady,
			commentsReady: commentsReady
		});

		if (postReady && commentsReady) {
			Object.assign(data, {
				post: Posts.findOne(id),
				hasPost:  Posts.find({_id: id}).count(),
				comments: Comments.find({postId: id}).fetch()
			});
		}
		
		return data;
	},
	
	render () {
		return this.data.postReady && this.data.commentsReady
				? <PostPage post={this.data.post} hasPost={this.data.hasPost} comments={this.data.comments} />
				: <SpinnerView />;
	}
});