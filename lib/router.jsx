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
		ReactLayout.render(App, {main: <PostSubmit />});
	}
});

FlowRouter.route('/', {
	name: 'home',
	action() {
		ReactLayout.render(App, {main: <PostListContainer />});
	}
});

FlowRouter.route('/new', { 
	name: 'newPosts',
	action() {
		ReactLayout.render(App, {main: <PostListContainer />});
	}

});

FlowRouter.route('/best', { 
	name: 'bestPosts',
	action() {
		ReactLayout.render(App, {main: <PostListContainer />});
	}
});

FlowRouter.notFound = {
	action() {
		ReactLayout.render(App, {main: <NotFound />});
	}
};
