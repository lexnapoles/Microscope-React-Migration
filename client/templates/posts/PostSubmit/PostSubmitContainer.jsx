PostSubmitContainer = React.createClass({
	getInitialState () {
		return {
			formData: { url: '', title: '' },
			errors: {}
		};
	},

	insertPost (event) {
		event.preventDefault();

		const post = this.state.formData;

		if (this.isValidPost(post)) {
			Meteor.call('postInsert', post, function(error, result) {
				if (error) {
					return throwError(error.reason);
				}

				if (result.postExists) {
					throwError('This link has already been posted');
				}

				FlowRouter.go('/posts/:_id', {_id: result._id});
			});
		}
	},

	isValidPost (post) {
		const errors = validatePost(post);

		if (errors.title || errors.url) {
			this.setState({errors: errors});
			return false;
		}

		return true;
	},

	setFormData (event) {
		const field = event.target.name,
					value = event.target.value;

		this.state.formData[field] = value;
		return this.setState({formData: this.state.formData});
	},

	render () {
		return <PostSubmit insertPost={this.insertPost} errors={this.state.errors} onChange={this.setFormData} formData={this.state.formData}/>;
	}
});