Template.postPage.onCreated(function() {
	Template.instance().id = FlowRouter.getParam("_id");
	
	let template = this;
	template.autorun(function() {
		template.subscribe('singlePost', Template.instance().id);
		template.subscribe('comments', Template.instance().id);
	});
	
	template.post = function() {
		return Posts.findOne(Template.instance().id);
	}
});

Template.postPage.helpers({
	post:  function() { 
		return Template.instance().post(); 
	},
	comments: function() {
		return Comments.find({postId: Template.instance().id});
	}
});