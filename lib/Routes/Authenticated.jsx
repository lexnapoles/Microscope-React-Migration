const authenticatedRoutes = FlowRouter.group({name: 'authenticated'})

authenticatedRoutes.route('/posts/:_id/edit', {
	name: 'postEdit',
	action() {
		ReactLayout.render(App, {main: <PostEditPage />});
	}
});


authenticatedRoutes.route('/submit', {
	name: 'postSubmit',
	action() {
		ReactLayout.render(App, {main: <PostSubmitContainer />});
	}
});