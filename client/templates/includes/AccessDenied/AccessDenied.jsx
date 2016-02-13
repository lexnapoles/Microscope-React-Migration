AccessDenied = React.createClass({
	propTypes: {
		message: React.PropTypes.string
	},
		render () {
		return (
			<div className="access-denied page jumbotron">
				<h2>Access Denied</h2>
				{this.props.message 
				 ? <p>{"You can't get there! " + this.props.message}</p>		
				 : <p>You can't get there! Please log in</p>}
			</div>
		)
	}
});
