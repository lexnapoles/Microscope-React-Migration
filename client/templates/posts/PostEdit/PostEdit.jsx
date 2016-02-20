PostEdit = React.createClass({
	propTypes: {
		post: React.PropTypes.object.isRequired,
		editPost: React.PropTypes.func.isRequired,
		deletePost: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
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
			<form className="main form page">
				<Input
                    name="url"
                    label="url"
                    onChange={this.props.onChange}
                    value={this.props.post.url}
                    error={this.props.errors.url} />
				<br />
				
				<Input
                    name="title"
                    label="title"
                    onChange={this.props.onChange}
                    value={this.props.post.title}
                    error={this.props.errors.title} />
				
				<input type="submit" value="Submit" className="btn btn-primary submit" onClick={this.editPost}/>				
				<hr />
				
				<a className="btn btn-danger delete" onClick={this.deletePost} href="#">Delete post</a>

			</form>
		);
	}
});