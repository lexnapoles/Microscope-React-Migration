NotificationItem = React.createClass({
    notificationPostPath() {
        "use strict";
        return FlowRouter.path("postPage", {_id: this.props.notification.postId});
    },

    render() {
        "use strict";
		let id = this.props.notification._id;
		
        return (
            <li>
                <a href={this.notificationPostPath()} onClick={this.props.onClick.bind(null, id)}>
                    <strong>{this.props.notification.commenterName}</strong> commented on your post
                </a>
            </li>
        );
    }
});