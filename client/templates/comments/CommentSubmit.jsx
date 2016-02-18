CommentSubmit = React.createClass({
	submitComment (event) {
		event.preventDefault();
		
		const comment = {
			body: this.refs.body.value,
			postId: FlowRouter.getParam("_id")
			};
		
		this.props.submitComment(comment);
		
		this.refs.body.value = '';
	},
	
	render () {
		const sessionName = this.props.sessionName;
		
		return (
		 	<form name="comment" className="comment-form form" onSubmit={this.submitComment}>				
				<div className={"form-group " + ErrorsHelpers.errorClass(sessionName, 'body')}>
					<div className="controls">					
						<label htmlFor="body">Comment on this post</label>
						<textarea name="body" ref="body" id="body" className="form-control" rows="3"></textarea>
						<span className="help-block">{ErrorsHelpers.errorMessage(sessionName, 'body')}</span>				
					</div>				
				</div>	
				<button type="submit" className="btn btn-primary">Add Comment</button>
			</form>
		);
	}
});