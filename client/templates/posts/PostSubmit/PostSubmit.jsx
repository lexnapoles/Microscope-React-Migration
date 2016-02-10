PostSubmit = React.createClass({
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
				<form className="main form page" onSubmit={this.onSubmit}>
					<div className={"form-group " + ErrorsHelpers.errorClass(this.props.sessionName, 'url')}>
						<label className="control-label" htmlFor="url">URL</label>										
							<div className="controls">
								<input name="url" ref="url" id="url" type="text"  placeholder="Write the url of the post" className="form-control" />				
								<span className="help-block">{ ErrorsHelpers.errorMessage(this.props.sessionName, 'url')}</span>
							</div>																
					</div>
					<div className={"form-group " + ErrorsHelpers.errorClass(this.props.sessionName, 'title')}>
						<label className="control-label" htmlFor="title">Title</label>
						<div className="controls">
							<input name="title" ref="title" id="title" type="text" placeholder="Name your post" className="form-control" />				
							<span className="help-block">{ErrorsHelpers.errorMessage(this.props.sessionName, 'title')}</span>
						</div>
					</div>
					<input type="submit" value="Submit" className="btn btn-primary" />
				</form>
		)
	}
});
