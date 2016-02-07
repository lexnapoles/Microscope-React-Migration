PostsList = React.createClass({
	propTypes: {
		posts: React.PropTypes.array.isRequired,		
		hasMorePosts: React.PropTypes.bool.isRequired,
		loadMore: React.PropTypes.func.isRequired
	},
	
	renderPosts () {
		return this.props.posts.map((post) => 
			(<Post key={post._id} post={post} />)
		);
	},	
	
	render () {
		return (				
			<div className="posts page">
				<div className="wrapper">
					{this.renderPosts()}
				</div>			
				{this.props.hasMorePosts
					? <a className="load-more" onClick={this.props.loadMore} href="#">Load more</a>											
					: ''}			
			</div>
		);
	}
});