PostsList = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return !this.props.hasMorePosts;
	},

	propTypes: {
		posts: React.PropTypes.array,
		hasMorePosts: React.PropTypes.bool,
		loadMore: React.PropTypes.func.isRequired,
		isReady: React.PropTypes.bool.isRequired
	},

	renderPosts () {
		if (this.props.isReady) {
			let	posts = this.props.posts.map((post) => (<Post key={post._id} post={post} />));
			const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

			return (
				<ReactCSSTransitionGroup component="div" transitionName="postAnimation" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{posts}
				</ReactCSSTransitionGroup>
			);
		}

		return <Loading />;
	},

	loadMore (e) {
		e.preventDefault();

		this.props.loadMore();
	},

	render () {
		return (
			<div className="posts page">
				{this.renderPosts()}

				{this.props.hasMorePosts
					? <a className="load-more" onClick={this.loadMore} href="#">Load more</a>
					: ''}
			</div>
		);
	}
});