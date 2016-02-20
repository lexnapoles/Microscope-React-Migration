PostEditContainer = React.createClass({
	getInitialState () {
		return {
			errorsSessionName: 'postEditErrors',
			formDataSessionName: 'formData',
			postId: FlowRouter.getParam("_id")
		};
	},
	
	componentWillMount () {
		Session.set(this.state.errorsSessionName, {});
		Session.set(this.state.formDataSessionName, { url: '', title: '' });
	},

	mixins: [ReactMeteorData],
		
	getMeteorData () {				
		let data = {},
			postHandle = Meteor.subscribe('singlePost', this.state.postId),
			postReady = postHandle.ready(),	
			post = Posts.findOne(this.state.postId);
			
		if (postReady) {
			this.setInitialFormData(post); 
			
			Object.assign(data, {			
				post: post,
				postReady: postReady,
				errors: Session.get(this.state.errorsSessionName),
				formData: Session.get(this.state.formDataSessionName)
			});
		}

		return data;
	},
		
	setInitialFormData (post) {
		const session = Session.get(this.state.formDataSessionName);
		
		if (session.url.length === 0 && session.title.length === 0) {
			Session.set('formData', { url: post.url, title: post.title})
		}
	},
	
	setFormData (event) {
		const field = event.target.name,
		      value = event.target.value,
			  formDataSessionName  = this.state.formDataSessionName,
			  formData = Session.get(formDataSessionName);
			
		formData[field] = value;
		Session.set(formDataSessionName, formData);
	},
	
	editPost (event) {		
		event.preventDefault();
			
		const post = this.data.formData;			  

		errors = validatePost(post);
		
		if (errors.title || errors.url) {
			return Session.set(this.state.errorsSessionName, errors);
		}
		
		Meteor.call('postEdit', this.state.postId, post, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			
			if (result.postExists) {
				 throwError('This link has already been posted');
			}
			
			FlowRouter.go('/posts/:_id', {_id: result._id});						
		});	
	},
	
	deletePost (event) {
		event.preventDefault();
	
		if (confirm("Delete this posts?")) {		
			Posts.remove(this.state.postId);
			FlowRouter.go('/');		
		}
	},
	
	getView () {
		return AuthHelpers.ownPost(this.data.post.userId)
			? <PostEdit formData={this.data.formData} errors={this.data.errors} editPost={this.editPost} deletePost={this.deletePost} onChange={this.setFormData} />
			: <AccessDenied message={"You are not the author of this post"}/>;		
	},
	
	render () {
		return this.data.postReady 
				? this.getView()
				: <Loading />
	}
});