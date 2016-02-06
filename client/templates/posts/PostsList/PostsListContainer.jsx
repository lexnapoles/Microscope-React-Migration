PostListContainer = React.createClass({
	getInitialState () {
		return {
			increment: 5,
			limit: 5,
			bestPosts:  {sort: {votes: -1, submitted: -1, _id: -1}},
			newPosts: {sort: {submitted: -1, _id: -1}}
		}		
	},
	
	mixins: [ReactMeteorData],
	
	getMeteorData () {			
		let data = {},
		    id = FlowRouter.getParam("_id"),
			limit = this.state.limit,
			sortOptions = FlowRouter.getRouteName() === "bestPosts" ? this.state.bestPosts : this.state.newPosts,
			options = Object.assign(sortOptions, {limit: limit}),
			loaded = (this.state.limit > this.state.increment) ? this.state.limit : 0,
			postsHandle = Meteor.subscribe('posts', options);
			postsReady = postsHandle.ready();

		data.postsReady = postsReady;
		
		if (postsReady) {				
			Object.assign(data, {
				posts: Posts.find({}, options).fetch(),
				hasMorePosts: Posts.find({}, options).count() >= limit,
			});						
			
			//this.props.loadPost()
			
		}
			
		return data;
	},
	
	loadMore () {
		let limit = this.state.limit;		
		limit += this.state.increment;
		
		this.setState({limit: limit});							
	},
		
	render () {		
		return (postsReady)
				? <PostsList posts={this.data.posts} hasMorePosts={this.data.hasMorePosts} loadMore={this.loadMore} />
				: <SpinnerView /> 			
	}
});
