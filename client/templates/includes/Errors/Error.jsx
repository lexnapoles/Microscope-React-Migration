Error = React.createClass({
	propTypes: {
		error: React.PropTypes.object.isRequired
	},

	componentDidMount () {
		Meteor.setTimeout(() => Errors.remove(this.props.error._id), 3000);
	},

	render () {
		const error = this.props.error;
		return (
			<div className="alert alert-danger" role="alert">
				<button type="button" className="close" data-dismiss="alert">&times;</button>
				{error.message}
			</div>
		);
	}
});