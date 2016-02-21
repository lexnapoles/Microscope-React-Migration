CommentSubmit = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired,
		comment: React.PropTypes.string.isRequired,
		submitComment: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	hasError () {
		if (this.props.errors && this.props.errors.length > 0) {
			return 'has-error';
		}
		return '';
	},

	render () {
		return (
			<form name="comment" className="comment-form form" onSubmit={this.props.submitComment} >
				<div className={"form-group " + this.hasError()}>
					<div className="controls">
						<label htmlFor="body">Comment on this post</label>
						<textarea name="body" ref="body" id="body" className="form-control" rows="3" value={this.props.comment} onChange={this.props.onChange}></textarea>
						<span className="help-block">{this.props.errors}</span>
					</div>
				</div>
				<button type="submit" className="btn btn-primary" >Add Comment</button>
			</form>
		);
	}
});