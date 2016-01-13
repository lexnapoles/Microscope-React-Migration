Meteor.startup(function () {
	Meteor.subscribe("newFivePosts");
});

Template.postsList.onCreated(function () {
	let template = this;
	
	template.increment = 5;
	template.loaded = new ReactiveVar(0);
	template.limit = new ReactiveVar(template.increment);
	
	template.autorun(function () {
		var limit = template.limit.get(),
			options = _.extend(Router.current().sortOptions(), { limit : limit });
		
		var subscription =  template.subscribe('posts', options);
		
		if (subscription.ready()) {
			template.loaded.set(limit);
		}
	});
	
	template.posts = function() {
		var options = _.extend(Router.current().sortOptions(), { limit : template.loaded.get() });
		return Posts.find({}, options);
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
	posts: function () {
		return Template.instance().posts();
	},
	hasMorePosts: function () {
		return Template.instance().posts().count() >= Template.instance().limit.get();
	}
});