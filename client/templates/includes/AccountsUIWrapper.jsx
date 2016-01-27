AccountsUIWrapper = React.createClass({
	componentDidMount() {
		this.view = Blaze.render(Template._loginButtons,
			ReactDOM.findDOMNode(this.refs.container));
	},
	
	componentWillUnmount() {
		Blaze.remove(this.view);
	},
	
	render() {
		return (
			<ul className="accountui nav navbar-nav navbar-right" ref="container">
			</ul>
		);
	}
});