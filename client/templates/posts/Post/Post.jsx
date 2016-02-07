Post = React.createClass({
	propTypes: {
		post:  React.PropTypes.object.isRequired
	},
	
	ownPost () {	
		return this.userId === Meteor.userId();
	},
	
	domain () {
		const a = React.createElement("a");
		a.href = this.url;
		return a.hostname;
	},
	
	upvotedClass () {
		const userId = Meteor.userId(),
			  upvoters = this.props.post.upvoters;
				
		return (userId && !_.contains(upvoters, userId))
				?  "btn-primary upvotable"
				: "disabled"				
	},
	
	upvote (event) {
		event.preventDefault();
	
		const upvoteClass = this.refs.upvote.className,
			  postId = this.props.post._id;
		
		if (upvoteClass.indexOf("upvotable") > -1) {
			Meteor.call("upvote", postId);
		}
	},	
	
	render () {	
		const post = this.props.post,
			  postId = post._id;
		
		return (
			<div className="post">
				<a href="#" ref="upvote" className={"upvote btn btn-default " + this.upvotedClass()} onClick={this.upvote} >
					<span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
				</a>
				<div className="post-content">
					<h3><a href={post.url}>{post.title}</a><span>{this.domain()}</span></h3>
					<p>
					  {Helpers.pluralize(post.votes, "Vote")},
					  submitted by {post.author} 					 
					  <a href={Helpers.FlowHelpers.pathFor('postPage', { _id : postId})}> {Helpers.pluralize(post.commentsCount, "comment")}</a>
					  {this.ownPost() 
						? <a href={Helpers.FlowHelpers.pathFor("postEdit", { _id : postId})}>Edit</a>
						: ""}
					</p>
				</div>
				<a href={Helpers.FlowHelpers.pathFor("postPage", { _id : postId})} className="discuss btn btn-default">Discuss</a>
			</div>
		);	
	}
});