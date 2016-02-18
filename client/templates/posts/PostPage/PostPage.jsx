PostPage = React.createClass({
	propTypes: {
		post: React.PropTypes.object,
		comments: React.PropTypes.array,
		hasPost: React.PropTypes.number.isRequired
	},
	
	renderPostAndComments ()  {
		return (
			<div className="post-page page">				
				<Post post={this.props.post} />				
				<ul className="comments">				
					<CommentsList comments={this.props.comments} />						
				</ul>
				
				{this.props.hasUser
				 ?	<CommentSubmitContainer />
				 :	<p>Please log in to leave a comment.</p>}
			</div>
		);
	},
	
	render () {
		return this.props.hasPost
				? this.renderPostAndComments()
				: <NotFound />;
		
	}
});