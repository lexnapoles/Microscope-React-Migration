Template.layout.onCreated(function() {
	this.subscribe('notifications');
});

Template.layout.onRendered(function() {
	this.find('#main')._uihooks = {
		insertElement: function (node, next) {
			$(node)
				.hide()
				.insertBefore(next)
				.fadeIn();
	
		},
		
		removeElement: function (node,text) {
			$(node).fadeOut(function() {
				$(this).remove();
			});
		}
	};
});