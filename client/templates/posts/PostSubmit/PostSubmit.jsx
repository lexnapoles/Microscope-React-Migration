PostSubmit = React.createClass({
	componentDidMount: () => Session.set('postSubmitErrors', {}),
	
	errorMessage: (field) => Session.get('postSubmitErrors')[field],	
	
	errorClass: (field) => !!Session.get('postSubmitErrors')[field] ? 'has-error' : '',
	
	insertPost (event) {
		event.preventDefault();
			
		var post = {
			url: this.refs.url.value,
			title: this.refs.title.value
		};
		
		var errors = validatePost(post);
		if (errors.title || errors.url) {
			return Session.set('postSubmitErrors', errors);
		}
		
		Meteor.call('postInsert', post, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			
			if (result.postExists) {
				 throwError('This link has already been posted');
			}
			
			FlowRouter.go('/posts/:_id', {_id: result._id});					
		});
	},
	
	render () {
		return (				
				<form className="main form page">
					<div className={"form-group " + this.errorClass('url')}>
						<label className="control-label" htmlFor="url">URL</label>										
							<div className="controls">
								<input name="title" ref="title" id="title" type="text" value="" placeholder="Name your post" className="form-control" />				
								<span class="help-block">{this.errorMessage('title')}</span>
							</div>																
					</div>
					<div className={"form-group " + this.errorClass('title')}>
						<label className="control-label" htmlFor="title">Title</label>
						<div className="controls">
							<input name="title" ref="title" id="title" type="text" value="" placeholder="Name your post" className="form-control" />				
							<span className="help-block">{this.errorMessage('title')}</span>
						</div>
					</div>
					<input type="submit" value="Submit" className="btn btn-primary" onSubmit={this.insertPost} />
				</form>
		)
	}
});