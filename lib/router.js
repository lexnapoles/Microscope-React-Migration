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

PostsListController = RouteController.extend({
	template: 'postsList',
	sortOptions: function() {
		return {sort: this.sort};
	}
});

NewPostsController = PostsListController.extend({
	sort: {submitted: -1, _id: -1}
});

BestPostsController = PostsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1}
});

Router.route('/', {
	name: 'home',
	controller: NewPostsController
});

Router.route('/new', { name: 'newPosts'});

Router.route('/best', { name: 'bestPosts'});

var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		}
		else {
			this.render('accessDenied');
		}
	}
	else {
		this.next();
	}	
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});