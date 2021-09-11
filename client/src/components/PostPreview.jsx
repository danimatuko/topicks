import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostPreview = ({ post }) => {
	const { _id, author, topic, title, subjectImage, dateOfPost } = post;
	return (
		<div className="d-flex justify-content-between align-items-center mb-4">
			<div>
				<Link to={`/posts/${_id}`} className="text-decoration-none text-dark">
					<div className="author mb-2 text-muted text-capitalize">{author}</div>
					<h2 className="h4 text-capitalize mb-1 fw-bold">{title}</h2>
					<p className="fw-lighter">CRUD is an ancient paradigm better left behind.</p>
				</Link>
				<div className="d-flex justify-content-between">
					<div>
						<span className="text-muted me-2">{dateOfPost}</span>
						<Badge className="tag border-radius-5 p-2" pill bg="secondary">
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
				<Link to={`/posts/${_id}`} className="text-decoration-none text-dark">
					<img
						src={subjectImage}
						alt="img"
						style={{ width: "220px", height: "150px", objectFit: "cover" }}
					/>
				</Link>
			</div>
		</div>
	);
};

export default PostPreview;
