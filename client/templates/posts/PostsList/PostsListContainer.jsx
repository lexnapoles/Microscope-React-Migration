PostListContainer = React.createClass({
	componentWillMount () {
		Meteor.subscribe("newFivePosts");
	},
	
	getInitialState () {
		return {
			bestPosts:  {sort: {votes: -1, submitted: -1, _id: -1}},
			newPosts: {sort: {submitted: -1, _id: -1}}		
		}		
	},
	
	mixins: [ReactMeteorData],
	
	getMeteorData () {			
		let data = {},
		    id = FlowRouter.getParam("_id"),
			sortOptions = FlowRouter.getRouteName() === "bestPosts" ? this.state.bestPosts : this.state.newPosts,
			limit = this.props.limit,
			subOptions = this.options(sortOptions, limit),
			postsReady = Meteor.subscribe('posts', subOptions).ready();

		data.postsReady = postsReady;
		
		if (postsReady) {				
			this.props.postsReadyToLoad();
			let postsOptions = this.options(sortOptions, this.props.loaded);
			
			Object.assign(data, {
				posts: Posts.find({}, postsOptions).fetch(),
				hasMorePosts: Posts.find({}, postsOptions).count() >= limit,
				hasUser: AuthHelpers.hasUser(),
				previousRoute: FlowRouter.getRouteName()
			});														
		}
			
		return data;
	},

	options (sortOptions, limit) {
		return Object.assign(sortOptions, {limit: limit})
	},

	render () {		
		return <PostsList posts={this.data.posts} hasMorePosts={this.data.hasMorePosts} loadMore={this.props.loadMore} isReady={this.data.postsReady} />;				
	}
});
