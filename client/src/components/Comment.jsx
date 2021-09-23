import React from "react";
import { Image, Row, Col } from "react-bootstrap";

const Comment = () => {
	return (
		<div className="comment mb-5">
			<Row className="flex-column gy-1" style={{ backgroundColor: "" }}>
				<Col>
					<div className="d-flex justify-content-between" style={{ width: "120px" }}>
						<Image
							width="40px"
							height="40px"
							src="https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png"
							roundedCircle
						/>
						<div>
							<span className="fw-bold">Jhon Doe</span>
							<small className="d-block">23.9.2021</small>
						</div>
					</div>
				</Col>
				<Col>
					<div className="comment-content">
						Great experience as always with Andrei courses, he knows how to explains the
						concepts from base to advanced for a deep understanding, amazing
						presentation!
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Comment;
