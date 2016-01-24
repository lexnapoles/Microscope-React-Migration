NotificationsManager = React.createClass({
	renderNotifications () {		
		if (this.props.notificationsCount) {	
			return this.props.notifications.map((elem, i) => 
					<NotificationItem key={elem._id} notification={elem} onClick={this.updateNotification}/>
				);
		}
		else {
			return <li><span>No Notifications</span></li>;	
		}
	},	
		
	updateNotification (id) {	
			Notifications.update(id, {$set: {read: true}});			
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
					{this.renderNotifications()}				
				</ul>
			</div>
		);
	}
});