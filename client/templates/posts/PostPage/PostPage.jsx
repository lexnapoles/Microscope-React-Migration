PostPage = React.createClass({
	propTypes: {
		post: React.PropTypes.object.isRequired,
		comments: React.PropTypes.array.isRequired
	},
	
	render () {
		return (				
			<div className="post-page page">				
				<Post post={this.props.post} />				
				<ul className="comments">				
					<CommentsList comments={this.props.comments} />						
				</ul>
				
				{Meteor.userId()
				 ?	<CommentSubmit />
				 :	<p>Please log in to leave a comment.</p>}
			</div>
		);
	}
});