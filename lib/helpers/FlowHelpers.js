FlowHelpers = (() => {
	//https://themeteorchef.com/snippets/using-flow-router-with-react/
	const pathFor = (path, params) => {
		const query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
		return FlowRouter.path( path, params, query );
	};

	const currentRoute = (route) => {
		FlowRouter.watchPathChange();
		return FlowRouter.current().route.name === route ? 'active' : '';
	};

	const activeRouteClass = (...args) => {
		const active = _.any(args, (name) =>
		FlowRouter.getRouteName() === name);

		return active && 'active';
	}

	return {
		pathFor: pathFor,
		currentRoute: currentRoute,
		activeRouteClass: activeRouteClass
	};
})();