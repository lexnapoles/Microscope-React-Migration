Pagination = React.createClass({
	getInitialState () {
		return {
			increment: 5,
			limit: 5,
			loaded: 0
		};
	},

	loadMore () {
		let limit = this.state.limit;

		limit += this.state.increment;

		this.setState({limit: limit});
	},

	readyToLoad () {
		const limit = this.state.limit,
					loaded = this.state.loaded;

		if (limit !== loaded) {
			this.setState({loaded: limit});
		}
	},

	render () {
		return (
			<PostListContainer loaded={this.state.loaded} limit={this.state.limit} loadMore={this.loadMore} postsReadyToLoad={this.readyToLoad}/>
		);
	}
});