FlowRouter.notFound = {
	action() {
		ReactLayout.render(App, {main: <NotFound />});
	}
};
