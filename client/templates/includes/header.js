Template.header.helpers({
	activeRouteClass() {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		
		var active = _.any(args, function(name) {
			return FlowRouter.getRouteName() === name;
		});
		
		return active && 'active';
	},
	
	NotificationsContainer() {
		return NotificationsContainer;
	}
});

