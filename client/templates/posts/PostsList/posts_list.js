/*Meteor.startup(function () {
	Meteor.subscribe("newFivePosts");
});

Template.postsList.onCreated(function () {
	const INCREMENT = 5,
		  sortOptions = {
				bestPosts:  {sort: {votes: -1, submitted: -1, _id: -1}},
				newPosts: {sort: {submitted: -1, _id: -1}}
		  };
		  
	let template = this;
	
	_.extend(template, {
		increment: INCREMENT,
		loaded: new ReactiveVar(0),
		limit: new ReactiveVar(INCREMENT),
		getTemplateSortOptions: () => {
				const routeName = FlowRouter.getRouteName();		
				
				return routeName === "bestPosts"
					   ? sortOptions.bestPosts
					   : sortOptions.newPosts
		},
		subscriptionOptions: (limit) => {
			return _.extend(template.getTemplateSortOptions(), {limit: limit});
		}
	});

	template.autorun(function () {
		var limit = template.limit.get(),
			subscription = template.subscribe('posts', template.subscriptionOptions(limit));
		
		if (subscription.ready()) {
			template.loaded.set(limit);
		}
	});
	
	template.posts = function() {
		return Posts.find({}, template.subscriptionOptions());
	}
});

Template.postsList.onRendered(function () {
	this.find('.wrapper')._uihooks = {
			insertElement: function (node, next) {
				$(node)
					.hide()
					.insertBefore(next)
					.fadeIn();
			},
			
			removeElement: function (node, next) {
				$(node).fadeOut(function() {
					$(this).remove();
				});
			},
			
			moveElement: function (node, next) {
				var $node = $(node), $next = $(next);
				var oldTop = $node.offset().top;
				var height = $node.outerHeight(true);
				
				var $inBetween = $next.nextUntil(node);
				if ($inBetween.length === 0) {
					$inBetween = $node.nextUntil(next);
				}
				
				$node.insertBefore(next);
				
				var newTop = $node.offset().top;
				
				$node
					.removeClass('animate')
					.css('top', oldTop - newTop);
				
				$inBetween
					.removeClass('animate')
					.css('top', oldTop < newTop ? height : -1 * height);
					
				$node.offset();
				
				$node.addClass('animate').css('top', 0);
				$inBetween.addClass('animate').css('top',0);
			}
	}
});

Template.postsList.events({
	'click .load-more': function (event, template) {
		event.preventDefault();
		
		var limit = template.limit.get();
		
		limit += template.increment;
		template.limit.set(limit);
	}
});
Template.postsList.helpers({
	posts () {
		return Template.instance().posts();
	},
	
	hasMorePosts () {
		return Template.instance().posts().count() >= Template.instance().limit.get();
	},
	
	Post () {
		return Post;
	}
});
*/