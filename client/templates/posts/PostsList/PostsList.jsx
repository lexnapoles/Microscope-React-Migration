PostsList = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return !this.props.hasMorePosts;
  },

	propTypes: {
		posts: React.PropTypes.array.isRequired,		
		hasMorePosts: React.PropTypes.bool.isRequired,
		loadMore: React.PropTypes.func.isRequired
	},
	
	renderPosts () {
		return this.props.isReady
				? this.props.posts.map((post) => (<Post key={post._id} post={post} />))
				: <Loading />;
	},	
	
	loadMore (e) {
		e.preventDefault();
		
		this.props.loadMore();
	},
	
	render () {
		return (				
			<div className="posts page">
				<div className="wrapper">
					{this.renderPosts()}
				</div>			
				{this.props.hasMorePosts
					? <a className="load-more" onClick={this.loadMore} href="#">Load more</a>											
					: ''}			
			</div>
		);
	}
});