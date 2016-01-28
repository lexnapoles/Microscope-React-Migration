PrivateHeader = React.createClass({
	propTypes: {
		hasUser: React.PropTypes.bool.isRequired
	},
	
	activeRouteClass(...args) {		
		const active = _.any(args, function(name) {
			return FlowRouter.getRouteName() === name;
		});
		
		return active && 'active';
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
					<div className="collapse navbar-collapse" id="navigation">
						<ul className="nav navbar-nav">
							<li className={this.activeRouteClass('home', 'newPosts')}>
								<a href={Helpers.FlowHelpers.pathFor('newPosts')}>New</a>
							</li>
							<li className={this.activeRouteClass('bestPosts')}>
								<a href={Helpers.FlowHelpers.pathFor('bestPosts')}>Best</a>
							</li>
							<li className={this.activeRouteClass('postSubmit')}>
								<a href={Helpers.FlowHelpers.pathFor('postSubmit')}>Submit Post</a>
							</li>												
							<NotificationsListContainer />					
						</ul>

						<ul>
							<AccountsUIWrapper />
						</ul>						
							
					</div> 
					
				</div>
			
			</nav>
		)	
	}
});