App = React.createClass({
	render () {
		return (
			<div className="container">			
				<PublicHeader />
				<ErrorsListContainer />
		
				<div id="main">
					{this.props.main}
				</div>
			</div>
		)
	}
});