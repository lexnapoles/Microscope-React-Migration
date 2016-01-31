ErrorsListContainer = React.createClass({
	mixins: [ReactMeteorData],
		
	getMeteorData() {		
		let data = {};

		Object.assign(data, {
			errors: Errors.find().fetch()
		});
		
		return data;
	},
	
	render () {
		return (
			<ErrorsList errors={this.data.errors} />
		);
	}
});