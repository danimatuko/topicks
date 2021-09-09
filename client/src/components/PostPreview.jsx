import React from "react";
import { Badge } from "react-bootstrap";

const PostPreview = () => {
	return (
		<div className="d-flex justify-content-between mb-4">
			<div>
				<div className="author mb-3 text-muted">Dani Matuko</div>
				<h2 className="h4">Why Are You Still Creating CRUD Apis?</h2>
				<p>CRUD is an ancient paradigm better left behind.</p>
				<div>
					<span className="text-muted me-2"> 11 Jul</span>
					<Badge className="tag border-radius-5  p-2" pill bg="secondary">
						Technology
					</Badge>
				</div>
			</div>

			<div>
				<img
					src="https://miro.medium.com/max/700/1*sWcfZpIgUnPCz4lhQTb7Cw.jpeg"
					alt="img"
					style={{ width: "320px" }}
				/>
			</div>
		</div>
	);
};

export default PostPreview;
