NotificationsList = React.createClass({		
	propTypes: {
		notificationsCount: React.PropTypes.number,
		notifications:  React.PropTypes.array
	},
	
	notificationPostPath(postId) {
        return FlowRouter.path("postPage", {_id: postId});
    },
		
	updateNotification (id) {	
			Notifications.update(id, {$set: {read: true}});			
	},
		
	renderNotification (notification) {
		let id = notification._id;
				
		return (
			<li key={id}>
				<a href={this.notificationPostPath(notification.postId)} onClick={this.updateNotification.bind(null, id)}>
					<strong>{notification.commenterName}</strong> commented on your post
				</a>
			</li>
		);						
	},	
		
	renderNotificationsBadge () {
		let count = this.props.notificationsCount;		
		
		return count
				?  <span className="badge badge-inverse">{count}</span>
				: '';
	},
	
	render() {
		return (
			<div className="dropdown">	
				<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					Notifications
					{this.renderNotificationsBadge()}
					<b className="caret"></b>
				</a>
				<ul className="notification dropdown-menu">
					{this.props.notificationsCount 
					 ? this.props.notifications.map(this.renderNotification)
					 : <li><span>No Notifications</span></li>}				
				</ul>
			</div>
		);
	}
});