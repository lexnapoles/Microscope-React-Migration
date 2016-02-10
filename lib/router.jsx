FlowRouter.route('/posts/:_id', { 
	name: 'postPage',
	action() {
		ReactLayout.render(App, {main: <PostPageContainer />});
	}
});

FlowRouter.route('/posts/:_id/edit', {
	name: 'postEdit',
	action() {
		ReactLayout.render(App, {main: <PostEditContainer />});
	}
});

FlowRouter.route('/submit', {
	name: 'postSubmit',
	action() {
		ReactLayout.render(App, {main: <PostSubmitContainer />});
	}
});

FlowRouter.route('/', {
	name: 'home',
	action() {
		ReactLayout.render(App, {main: <Pagination />});
	}
});

FlowRouter.route('/new', { 
	name: 'newPosts',
	action() {
		ReactLayout.render(App, {main: <Pagination />});
	}

});

FlowRouter.route('/best', { 
	name: 'bestPosts',
	action() {
		ReactLayout.render(App, {main: <Pagination />});
	}
});

FlowRouter.notFound = {
	action() {
		ReactLayout.render(App, {main: <NotFound />});
	}
};
