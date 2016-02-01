PostEdit = React.createClass({
	propTypes: {
		post:  React.PropTypes.object.isRequired
	},

	componentDidMount () {
		Session.set('postEditErrors', {});
	},
	
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	
	errorClass: function (field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	},
	
	editPost (event) {		
		event.preventDefault();
			
		const currentPostId = this.props.post._id,
			  postProperties = {						
				url: this.refs.url.value,
				title: this.refs.title.value
			  },
			  errors = validatePost(postProperties);
		
		if (errors.title || errors.url) {
			return Session.set('postEditErrors', errors);
		}
		
		Meteor.call('postEdit', currentPostId, postProperties, function(error, result) {
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
		if (confirm("Delete this posts?")) {
			const currentPostId = this.props.post._id;
			Posts.remove(currentPostId);
			FlowRouter.go('/');
		}
	},
	
	render () {
		const post = this.props.post,
			  sessionName = 'postEditErrors';
		
		return (		
			<form className="main form page" onSubmit={this.editPost}>
				<div className={"form-group " + ErrorsHelpers.errorClass(sessionName, 'url')}>
					<label className="control-label" htmlFor="url">URL</label>
					<div className="controls">
						<input name="url" ref="url" id="url" type="text" value={post.url} placeholder="Your URL" className="form-control" />
						<span className="help-block">{ErrorsHelpers.errorMessage(sessionName, 'url')}</span>
					</div>
				</div>
				<div className={"form-group " + ErrorsHelpers.errorClass(sessionName, 'title')}>
					<label className="control-label" htmlFor="title">Title</label>
					<div className="controls">
						<input name="title" ref="title" id="title" type="text" value={post.title} placeholder="Name your post" className="form-control" />		
						<span className="help-block">{ErrorsHelpers.errorMessage(sessionName, 'title')}</span>
					</div>
				</div>
				<input type="submit" value="Submit" className="btn btn-primary submit" />
				<hr />
				<a className="btn btn-danger delete" onClick={this.deletePost} href="#">Delete post</a>
			</form>
		);
	}
});