PostSubmitContainer = React.createClass({
	getInitialState () {
		return {
			submitErrorsSessionName: 'postSubmitErrors'
		};
	},

	componentWillMount () {
		Session.set(this.state.submitErrorsSessionName, {});
	},
	
	mixins: [ReactMeteorData],
	
	getMeteorData () {					
		let data = {};
		
		Object.assign(data, {
			session: Session.get(this.state.submitErrorsSessionName)
		});
		
		return data;
	},
	
	insertPost (post) {
		
		var errors = validatePost(post);
		if (errors.title || errors.url) {		
			return Session.set(this.state.submitErrorsSessionName, errors);
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
		return <PostSubmit sessionName={this.state.submitErrorsSessionName} insertPost={this.insertPost} />;		
	}
});