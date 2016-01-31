AppHeader = React.createClass({
	propTypes: {
		hasUser: React.PropTypes.bool.isRequired
	},

	render () {
		return (
			<nav className="navbar navbar-default" role="navigation">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href={Helpers.FlowHelpers.pathFor('home')}>Microscope</a>
					</div>					
					{this.props.hasUser ? <PrivateHeader /> : <PublicHeader />}					 
				</div>
		
			</nav>
		)	
	}
});