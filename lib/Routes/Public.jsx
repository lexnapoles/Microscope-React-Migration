const publicRoutes = FlowRouter.group({name: 'public'});

publicRoutes.route('/', {
	name: 'home',
	action() {
		ReactLayout.render(App, {main: <Pagination />});
	}
});

publicRoutes.route('/new', { 
	name: 'newPosts',
	action() {
		ReactLayout.render(App, {main: <Pagination />});
	}

});

publicRoutes.route('/best', { 
	name: 'bestPosts',
	action() {
		ReactLayout.render(App, {main: <Pagination />});
	}
});

publicRoutes.route('/posts/:_id', { 
	name: 'postPage',
	action() {
		ReactLayout.render(App, {main: <PostPageContainer />});
	}
});

