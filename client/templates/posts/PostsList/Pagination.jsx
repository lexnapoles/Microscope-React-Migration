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
		
	loadPosts () {
		const loaded = this.state.loaded,
			  limit = this.state.limit;
		
		if (this.state.limit > this.state.increment) {
			this.setState({loaded: loaded + limit});
		}			
	},
	
	render () {
		return (				
			<PostListContainer limit={this.state.limit} />
		);
	}
});