PostEditForm = React.createClass({
	propTypes: {
		editPost: React.PropTypes.func.isRequired,
		deletePost: React.PropTypes.func.isRequired,
		formData: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render () {
		return (
			<form className="main form page" onSubmit={this.props.editPost}>
				<Input
					name="url"
					label="URL"
					onChange={this.props.onChange}
					value={this.props.formData.url}
					error={this.props.errors.url} />
				<br />

				<Input
					name="title"
					label="Title"
					onChange={this.props.onChange}
					value={this.props.formData.title}
					error={this.props.errors.title} />

				<input type="submit" value="Submit" className="btn btn-primary submit" />
				<hr />

				<a className="btn btn-danger delete" onClick={this.props.deletePost} href="#">Delete post</a>

			</form>
		);
	}
});