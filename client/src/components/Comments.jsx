import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = () => {
	return (
		<div className="commentes w-75 mx-auto my-5 pb-3">
			<h2 className="display-6 mb-5">Comments (3)</h2>
			<h3 className="h5 fw-light">Add Your Comment</h3>
			<CommentForm />
			<Comment />
			<Comment />
			<Comment />
		</div>
	);
};

export default Comments;
