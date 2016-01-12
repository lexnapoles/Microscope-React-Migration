Template.postEdit.onCreated(function () {	
	Session.set('postEditErrors', {});
	
	Template.instance().id = Router.current().params._id;
	
	let template = this;
	template.autorun(function() {
		template.subscribe('singlePost', Template.instance().id);
	});
});

Template.postEdit.helpers({
	data: function() { 
		return Posts.findOne(Template.instance().id);
	},
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	
	errorClass: function (field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
});

Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
			
		var currentPostId = Template.instance().id;
		
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
		}
		
		var errors = validatePost(postProperties);
		if (errors.title || errors.url) {
			return Session.set('postEditErrors', errors);
		}
		
		Meteor.call('postEdit', currentPostId, postProperties, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			
			if (result.postExists) {
				 throwError('This link has already been posted');
			}
			
			Router.go('postPage', {_id: result._id});						
		});	
	},
	
	'click .delete': function(e) {
		e.preventDefault();
		
		if (confirm("Delete this posts?")) {
			var currentPostId = Template.instance().id;
			Posts.remove(currentPostId);
			Router.go('home');
		}
	}
});