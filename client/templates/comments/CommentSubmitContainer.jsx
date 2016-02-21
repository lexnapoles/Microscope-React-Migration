CommentSubmitContainer = React.createClass({
	getInitialState () {
		return {
			comment: '',
			errors: ''
		};
	},

	submitComment (event) {
		event.preventDefault();

		const comment = {
			body: this.state.comment,
			postId: FlowRouter.getParam("_id")
		};

		if (this.isValidComment(comment)) {
			Meteor.call('commentInsert', comment,
				(error) => {
					if (error) {
						throwError(error.reason);
					}
					else {
						this.setState({errors: ''});
					}
				}
			);

			this.setState({comment: ''});
		}
	},

	isValidComment (comment) {
		if (comment.body.length === 0) {
			this.state.errors = 'Please write some content';
			this.setState({errors: this.state.errors});

			return false;
		}

		return true;
	},

	handleTextChange (event) {
		event.preventDefault();

		const value = event.target.value;

		this.state.comment = value;
		return this.setState({comment: this.state.comment});
	},

	render () {
		return <CommentSubmit comment={this.state.comment} errors={this.state.errors} submitComment={this.submitComment} onChange={this.handleTextChange} />
	}
});