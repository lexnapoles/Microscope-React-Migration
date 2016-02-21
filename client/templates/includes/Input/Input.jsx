Input = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.string,
		error: React.PropTypes.string
	},

	hasError () {
		if (this.props.error && this.props.error.length > 0) {
			return 'has-error';
		}
		return '';
	},

	render () {
		return (
			<div className={"form-group " + this.hasError()}>
				<label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
				<div className="controls">
					<input name={this.props.name}
								 type="text"
								 className="form-control"
								 ref={this.props.name}
								 id={this.props.name}
								 value={this.props.value}
								 onChange={this.props.onChange}
								 placeholder={this.props.placeholder} />
					<span className="help-block">{this.props.error}</span>
				</div>
			</div>
		);
	}
});