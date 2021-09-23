import React from "react";
import Comment from "./Comment";

const Comments = () => {
	return (
		<div className="commentes w-75 mx-auto my-5 pb-3">
			<h2 className="display-6 mb-5">Comments (3)</h2>
			<Comment />
			<Comment />
			<Comment />
		</div>
	);
};

export default Comments;
