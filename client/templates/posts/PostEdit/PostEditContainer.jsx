PostEditContainer = React.createClass({
	propTypes: {
		post: React.PropTypes.object.isRequired
	},
	
	getInitialState () {
		return {
			formData: { url: this.props.post.url, title:  this.props.post.title },
			errors: {}
		};
	},
	
	isValidPost (post) {
		const errors = validatePost(post);
		
		if (errors.title || errors.url) {		
			this.setState({errors: errors});
			return false;
		}
		
		return true;
	},
	
	setFormData (event) {	
		const field = event.target.name,
			  value = event.target.value;

        this.state.formData[field] = value;
        return this.setState({formData: this.state.formData});
	},
	
	editPost (event) {		
		event.preventDefault();
			
		const post = this.state.formData,
			  postId = this.props.post._id;

		if (this.isValidPost(post)) {
			Meteor.call('postEdit', postId, post, function(error, result) {
				if (error) {
					return throwError(error.reason);
				}
				
				if (result.postExists) {
					 throwError('This link has already been posted');
				}
				
				FlowRouter.go('/posts/:_id', {_id: result._id});						
			});	
		}
	},
	
	deletePost (event) {
		event.preventDefault();
	
		if (confirm("Delete this posts?")) {		
			Posts.remove(this.props.post._id);
			FlowRouter.go('/');		
		}
	},
	
	render () {
		return <PostEditForm formData={this.state.formData} errors={this.state.errors} editPost={this.editPost} deletePost={this.deletePost} onChange={this.setFormData} />
	}
});