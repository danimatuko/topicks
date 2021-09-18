import React from "react";
import { Badge, Container } from "react-bootstrap";

const RecommandedTopics = () => {
	return (
		<Container>
			<h2 className="h5 mb-4 fw-bold">Recommended topics</h2>
			<div className="d-flex flex-wrap">
				<Badge className="tag border-radius-5  p-2 m-1" pill bg="secondary">
					Technology
				</Badge>
				<Badge className="tag border-radius-5  p-2 m-1" pill bg="secondary">
					Technology
				</Badge>
				<Badge className="tag border-radius-5  p-2 m-1" pill bg="secondary">
					Technology
				</Badge>
				<Badge className="tag border-radius-5  p-2 m-1" pill bg="secondary">
					Technology
				</Badge>
				<Badge className="tag border-radius-5  p-2 m-1" pill bg="secondary">
					Technology
				</Badge>
				<Badge className="tag border-radius-5  p-2 m-1" pill bg="secondary">
					Technology
				</Badge>
			</div>
			<hr />
		</Container>
	);
};

export default RecommandedTopics;
