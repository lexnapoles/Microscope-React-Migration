PostPageContainer = React.createClass({
	mixins: [ReactMeteorData],
		
	getMeteorData () {		
		let data = {},
			id = FlowRouter.getParam("_id"),
			postHandle = Meteor.subscribe('singlePost', id),
			commentsHandle = Meteor.subscribe('comments', id);
		
		if (postHandle.ready() && commentsHandle.ready()) {
			Object.assign(data, {
				post: Posts.findOne(id).fetch(),
				comments: Comments.find({postId: id}).fetch()
			});
		}
		
		return data;
	},
	
	render () {
		return (
			<PostPage post={this.data.post} comments={this.data.comments} />
		);
	}
});