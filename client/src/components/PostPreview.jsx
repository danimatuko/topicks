import React from "react";
import { Badge } from "react-bootstrap";

const PostPreview = ({ post }) => {
	const { author, topic, title, subjectImage, body, dateOfPost } = post;
	return (
		<div className="d-flex justify-content-between align-items-center mb-4">
			<div>
				<div className="author mb-2 text-muted text-capitalize">{author}</div>
				<h2 className="h4 text-capitalize mb-1 fw-bold">{title}</h2>
				<p className="fw-lighter">CRUD is an ancient paradigm better left behind.</p>
				<div className="d-flex justify-content-between">
					<div>
						<span className="text-muted me-2">{dateOfPost}</span>
						<Badge className="tag border-radius-5  p-2" pill bg="secondary">
							{topic}
						</Badge>
					</div>
					<div>
						<i className="far fa-thumbs-up me-1"></i>
						<i className="far fa-bookmark"></i>
					</div>
				</div>
			</div>

			<div>
				<img src={subjectImage} alt="img" style={{ width: "220px" }} />
			</div>
		</div>
	);
};

export default PostPreview;
