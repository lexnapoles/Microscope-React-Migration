FlowRouter.route('/posts/:_id', { 
	name: 'postPage',
	action() {
		ReactLayout.render(App, {main: <PostPage />});
	}
});

FlowRouter.route('/posts/:_id/edit', {
	name: 'postEdit',
	action() {
		ReactLayout.render(App, {main: <PostEdit />});
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
		ReactLayout.render(App, {main: <PostList />});
	}
});

FlowRouter.route('/new', { 
	name: 'newPosts',
	action() {
		ReactLayout.render(App, {main: <PostList />});
	}

});

FlowRouter.route('/best', { 
	name: 'bestPosts',
	action() {
		ReactLayout.render(App, {main: <PostList />});
	}
});

FlowRouter.notFound = {
	action() {
		ReactLayout.render(App, {main: <NotFound />});
	}
};
