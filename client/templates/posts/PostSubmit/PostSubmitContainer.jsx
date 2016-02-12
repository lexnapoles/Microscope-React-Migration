PostSubmitContainer = React.createClass({
	componentWillMount: () => Session.set('postSubmitErrors', {}),
	
	mixins: [ReactMeteorData],
	
	getMeteorData () {			
		const errorsSessionName = 'postSubmitErrors';
		
		let data = {};
		
		Object.assign(data, {
			sessionName: errorsSessionName,
			session: Session.get(errorsSessionName)
		});
		
		return data;
	},
	
	insertPost (post) {
		
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
		return <PostSubmit sessionName={this.data.sessionName} insertPost={this.insertPost} />;		
	}
});