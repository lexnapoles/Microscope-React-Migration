PublicHeader = React.createClass({
	render () {
		return (
			<div className="collapse navbar-collapse" id="navigation">
				<ul className="nav navbar-nav">
					<li className={FlowHelpers.activeRouteClass('home', 'newPosts')}>
						<a href={FlowHelpers.pathFor('newPosts')}>New</a>
					</li>
					<li className={FlowHelpers.activeRouteClass('bestPosts')}>
						<a href={FlowHelpers.pathFor('bestPosts')}>Best</a>
					</li>
				</ul>
				<ul>
					<AccountsUIWrapper />
				</ul>
			</div>
		)
	}
});
