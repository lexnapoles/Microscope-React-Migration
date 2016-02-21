App = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
		let data = {};

		Object.assign(data, {
			loggingIn: AuthHelpers.loggingIn(),
			hasUser: AuthHelpers.hasUser(),
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
					{this.data.loggingIn ? <Loading /> : this.getView()}
				</div>
			</div>
		)
	}
});