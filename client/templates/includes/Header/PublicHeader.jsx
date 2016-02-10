PublicHeader = React.createClass({
	render () {
		return (
			<div className="collapse navbar-collapse" id="navigation">
				<ul className="nav navbar-nav">
					<li className={Helpers.FlowHelpers.activeRouteClass('home', 'newPosts')}>
						<a href={Helpers.FlowHelpers.pathFor('newPosts')}>New</a>
					</li>
					<li className={Helpers.FlowHelpers.activeRouteClass('bestPosts')}>
						<a href={Helpers.FlowHelpers.pathFor('bestPosts')}>Best</a>
					</li>		
				</ul>				
				<ul>
					<AccountsUIWrapper />
				</ul>								
			</div> 					
		)	
	}
});