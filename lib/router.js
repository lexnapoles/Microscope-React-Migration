FlowRouter.route('/posts/:_id', { 
	name: 'postPage',
	action() {
		BlazeLayout.render('app', {main: 'postPage'});
	}
});

FlowRouter.route('/posts/:_id/edit', {
	name: 'postEdit',
	action() {
		BlazeLayout.render('app', {main: 'postEdit'});
	}
});

FlowRouter.route('/submit', {
	name: 'postSubmit',
	action() {
		BlazeLayout.render('app', {main: 'postSubmit'});
	}
});

FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('app', {main: 'postsList'});
	}
});

FlowRouter.route('/new', { 
	name: 'newPosts',
	action() {
		BlazeLayout.render('app', {main: 'postsList'});
	}

});

FlowRouter.route('/best', { 
	name: 'bestPosts',
	action() {
		BlazeLayout.render('app', {main: 'postsList'});
	}
});

FlowRouter.notFound = {
	action() {
		BlazeLayout.render('app', {main: 'notFound'});
	}
};
