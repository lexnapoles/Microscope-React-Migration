CommentSubmit = React.createClass({
	componentWillMount() {
		Session.set('commentSubmitErrors', {});
	},
	
	errorMessage (field) {
		return Session.get('commentSubmitErrors')[field];
	},
	
	errorClass (field) {
		return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
	},
	
	submitForm (event) {
		event.preventDefault();
		
		let text = this.refs.body.value,
			postId = FlowRouter.getParam("_id"),
			comment = {
				body: text,
				postId: postId
			},
			errors = {};
		
		if (!comment.body) {
			errors.body = 'Please write some content';
			return Session.set('commentSubmitErrors', errors);
		}
		
		Meteor.call('commentInsert', comment, 
			(error) => 
				error 
				? throwError(error.reason) 
				: this.refs.body.value = ''
		);
	},
	
	render () {
		return (
		 	<form name="comment" className="comment-form form" onSubmit={this.submitForm}>				
				<div className="form-group {this.errorClass('body')}">
					<div className="controls">					
						<label htmlFor="body">Comment on this post</label>
						<textarea name="body" ref="body" id="body" className="form-control" rows="3"></textarea>
						<span className="help-block">{this.errorMessage('body')}</span>				
					</div>				
				</div>	
				<button type="submit" className="btn btn-primary">Add Comment</button>
			</form>
		);
	}
});