PostEditContainer = React.createClass({
	componentWillMount () {
		Session.set('postEditErrors', {});
	},
		
	mixins: [ReactMeteorData],
		
	getMeteorData () {		
		let data = {},
			id = FlowRouter.getParam("_id"),
			postHandle = Meteor.subscribe('singlePost', id),
			postReady = postHandle.ready(),
			sessionName = "postEditErrors";
		
				
		if (postReady) {
			Object.assign(data, {
				post: Posts.findOne(id),
				postReady: postReady,
				sessionName: sessionName, 
				errors: Session.get(sessionName)
			});
		}

		return data;
	},
	
	editPost (postId, post) {		

		errors = validatePost(post);
		
		if (errors.title || errors.url) {
			return Session.set(this.data.sessionName, errors);
		}
		
		Meteor.call('postEdit', postId, post, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			
			if (result.postExists) {
				 throwError('This link has already been posted');
			}
			
			FlowRouter.go('/posts/:_id', {_id: result._id});						
		});	
	},
	
	deletePost (postId) {
		Posts.remove(postId);
		FlowRouter.go('/');		
	},
	
	getView () {
		return AuthHelpers.ownPost(this.data.post.userId)
			? <PostEdit post={this.data.post} errors={this.data.errors} editPost={this.editPost} deletePost={this.deletePost} />
			: <AccessDenied message={"You are not the author of this post"}/>;		
	},
	
	render () {
		return this.data.postReady 
				? this.getView()
				: <Loading />
	}
});