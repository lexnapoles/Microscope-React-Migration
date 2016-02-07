App = React.createClass({
	mixins: [ReactMeteorData],
		
	getMeteorData() {		
		let data = {};

		Object.assign(data, {		
			hasUser: !!Meteor.user()
		});
		
		return data;
	},
	
	
	render () {
		return (
			<div className="container">			
				<AppHeader hasUser={this.data.hasUser} />
				<ErrorsListContainer />
		
				<div id="main">
					{this.props.main}
				</div>
			</div>
		)
	}
});