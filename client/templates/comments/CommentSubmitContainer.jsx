CommentSubmitContainer = React.createClass({
	componentWillMount() {
		Session.set('commentSubmitErrors', {});
	},
	
	mixins: [ReactMeteorData],
		
	getMeteorData () {		
		let data = {},			
			sessionName = "commentSubmitErrors";	
				
		Object.assign(data, {
			sessionName: sessionName, 
			session: Session.get(sessionName)
		});		

		return data;
	},
	
	submitComment (comment) {
		let errors = {};
		
		if (!comment.body) {
			errors.body = 'Please write some content';
			return Session.set('commentSubmitErrors', errors);
		}
		
		Meteor.call('commentInsert', comment, 
			(error) => {
				if (error) {
					throwError(error.reason);
				}
				else {
					Session.set(this.data.sessionName, {});
				}
			}
		);
	},
	
	render () {
		return <CommentSubmit sessionName={this.data.sessionName} submitComment={this.submitComment}/>
	}		

});