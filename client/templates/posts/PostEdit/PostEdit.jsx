PostEdit = React.createClass({
	propTypes: {
		post: React.PropTypes.object.isRequired,
		editPost: React.PropTypes.func.isRequired,
		deletePost: React.PropTypes.func.isRequired
	},

	editPost (event) {		
		event.preventDefault();
			
		const postId = this.props.post._id,			
		      post = Object.assign({}, {
					url: this.refs.url.value,
					title: this.refs.title.value
				});
		
		this.props.editPost(postId, post);
	},
	
	deletePost (event) {
		event.preventDefault();
	
		if (confirm("Delete this posts?")) {		
			this.props.deletePost(this.props.post._id)
		}
	},
	
	render () {
		const post = this.props.post,
			  sessionName = this.props.sessionName;
		
		return (		
			<form className="main form page" onSubmit={this.editPost}>
				<div className={"form-group " + ErrorsHelpers.errorClass(sessionName, 'url')}>
					<label className="control-label" htmlFor="url">URL</label>
					<div className="controls">
						<input name="url" ref="url" id="url" type="text" placeholder={post.url ? post.url : "Your URL"} className="form-control" />
						<span className="help-block">{ErrorsHelpers.errorMessage(sessionName, 'url')}</span>
					</div>
				</div>
				<div className={"form-group " + ErrorsHelpers.errorClass(this.props.sessionName, 'title')}>
					<label className="control-label" htmlFor="title">Title</label>
					<div className="controls">
						<input name="title" ref="title" id="title" type="text" placeholder={post.title ? post.title : "Name your post"} className="form-control" />		
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