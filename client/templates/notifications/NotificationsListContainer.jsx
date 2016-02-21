NotificationsListContainer = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
		"use strict";
		let data = {},
				handle = Meteor.subscribe('notifications');

		if (handle.ready()) {
			Object.assign(data, {
				notifications: Notifications.find({userId: Meteor.userId(), read: false}).fetch(),
				notificationsCount: Notifications.find({userId: Meteor.userId(), read: false}).count()
			});
		}

		return data;
	},

	render() {
		"use strict";
		return(
			<NotificationsList notificationsCount={this.data.notificationsCount} notifications={this.data.notifications} />
		);
	}
});