CommentsList = React.createClass({
	propTypes: {
		comments:  React.PropTypes.array.isRequired
	},
		
	renderComment ({_id, author, submitted, body}) {	
		return (
			<li key={_id}>
				<h4>
					<span className="author">{author}</span>
					<span className="date">  on {submitted.toString()}</span>
				</h4>
				<p>{body}</p>
			</li>
		);
	},
	
	render() {				
		return (
			<div>
				{this.props.comments.map(this.renderComment)}
			</div>
		);	
	}
});