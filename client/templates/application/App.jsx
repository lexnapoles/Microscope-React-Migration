App = React.createClass({
	mixins: [ReactMeteorData],
		
	getMeteorData() {		
		let data = {};

		Object.assign(data, {		
			loggingIn: Meteor.loggingIn(),
			hasUser: !!Meteor.user(),
			isPublic (route) {
				let publicRoutes = ['home', 'newPosts','bestPosts', 'postPage'];
				
				return publicRoutes.indexOf(route) > -1;
			},
			canView () {
				return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
			}
		});
		
		return data;
	},
	
	loading () {
		return <div className="spinner"><SpinnerView /></div>;
	},
	
	getView () {
		return this.data.canView() 
				? this.props.main 
				: <AccessDenied />;
	},
	
	render () {
		return (
			<div className="container">			
				<AppHeader hasUser={this.data.hasUser} />
				<ErrorsListContainer />
		
				<div id="main">
					{this.data.loggingIn ? this.loading() : this.getView()}
				</div>
			</div>
		)
	}
});