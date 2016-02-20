PostEditContainer = React.createClass({
	componentWillMount () {
		Session.set('postEditErrors', {});
		Session.set('formData', { url: '', title: '' });
	},

	getInitialState () {
		return {
			setOnceInitialFormInfo: _.once((post) => Session.set('formData', { url: post.url, title: post.title}))
		};
	},
	
	mixins: [ReactMeteorData],
		
	getMeteorData () {		
		
		const id = FlowRouter.getParam("_id"),
			  errorsSessionName = 'postEditErrors',
			  formDataSessionName = 'formData';
			  
		let data = {},
			postHandle = Meteor.subscribe('singlePost', id),
			postReady = postHandle.ready(),	
			post = Posts.findOne(id);
			
		if (postReady) {
			this.state.setOnceInitialFormInfo(post);
			
			Object.assign(data, {
				post: post,
				postReady: postReady,
				errorsSessionName: errorsSessionName,
				formDataSessionName: formDataSessionName,
				errors: Session.get(errorsSessionName),
				formData: Session.get(formDataSessionName)
			});
		}

		return data;
	},
		
	setFormData (event) {
		const field = event.target.name,
		      value = event.target.value,
			  formData = Session.get(this.data.formDataSessionName);
			
		formData[field] = value;
		Session.set(this.data.formDataSessionName, formData);
	},
	
	editPost (postId, post) {		
		errors = validatePost(post);
		
		if (errors.title || errors.url) {
			return Session.set(this.data.errorsSessionName, errors);
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
			? <PostEdit formData={this.data.formData} errors={this.data.errors} editPost={this.editPost} deletePost={this.deletePost} onChange={this.setFormData} />
			: <AccessDenied message={"You are not the author of this post"}/>;		
	},
	
	render () {
		return this.data.postReady 
				? this.getView()
				: <Loading />
	}
});