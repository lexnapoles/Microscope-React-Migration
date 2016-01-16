FlowRouter.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

FlowRouter.route('/posts/:_id', { 
	name: 'postPage',
	action(params) {
		BlazeLayout.render('app', {main: 'postPage'});
	}
});

FlowRouter.route('/posts/:_id/edit', {
	name: 'postEdit',
	action(id) {
		BlazeLayout.render('app', {main: 'postEdit'});
	}
});

FlowRouter.route('/submit', {name: 'postSubmit'});

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

FlowRouter.onBeforeAction('dataNotFound', {only: 'postPage'});