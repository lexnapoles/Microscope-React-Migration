Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/posts/:_id', { 
	name: 'postPage'
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit'
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/', {
	name: 'home',
	template: 'postsList'
});

Router.route('/new', { 
	name: 'newPosts',
	template: 'postsList'
});

Router.route('/best', { 
	name: 'bestPosts',
	template: 'postsList'
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});