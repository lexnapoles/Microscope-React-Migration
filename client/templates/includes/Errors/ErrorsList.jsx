ErrorsList = React.createClass({
	propTypes: {
		errors: React.PropTypes.array.isRequired
	},
	
	renderErrors: function () {
		return this.props.errors.map( function (elem) {
			return <Error key={elem._id} error={elem} />
		})
	},
	
	render () {
		return (
			<div className="errors">
				{this.renderErrors()}
			</div>
		);
	}
});