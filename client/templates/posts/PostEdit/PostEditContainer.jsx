PostEditContainer = React.createClass({
	mixins: [ReactMeteorData],
		
	getMeteorData () {		
		let data = {},
			id = FlowRouter.getParam("_id"),
			postHandle = Meteor.subscribe('singlePost', id);
		
		if (postHandle.ready()) {
			Object.assign(data, {
				post: Posts.findOne(id).fetch()
			});
		}
		
		return data;
	},
	
	render () {
		return (
			<PostEdit post={this.data.post} />
		);
	}
});