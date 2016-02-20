PostSubmit = React.createClass({
	propTypes: {
		insertPost: React.PropTypes.func.isRequired,
		formData: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},
	
	onSubmit (e) {
		e.preventDefault();
		
		const post = Object.assign({}, {
			url: this.refs.url.value,
			title: this.refs.title.value		
		});
				
		this.props.insertPost(post);
	},
	
	render () {		
		return (				
				<form className="main form page">
					<Input
						name="url"
						label="URL"
						onChange={this.props.onChange}
						value={this.props.formData.url}
						error={this.props.errors.url} />
					<br />
				
					<Input
						name="title"
						label="Title"
						onChange={this.props.onChange}
						value={this.props.formData.title}
						error={this.props.errors.title} />
				
					<input type="submit" value="Submit" className="btn btn-primary submit" onClick={this.insertPost}/>		
					
					
				</form>
				
				
		)
	}
});

