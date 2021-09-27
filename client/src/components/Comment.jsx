import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import parse from "html-react-parser";

const Comment = ({ comment }) => {
	return (
		<div className="comment mb-5 ">
			<Row className="flex-column gy-1" style={{ backgroundColor: "" }}>
				<Col>
					<div className="d-flex justify-content-between" style={{ width: "145px" }}>
						<Image
							width="40px"
							height="40px"
							src="https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png"
							roundedCircle
						/>
						<div>
							<div className="fw-bold">{comment.author}</div>
							<small className="d-block">{comment.dateOfComment}</small>
						</div>
					</div>
				</Col>
				<Col>
					<div className="comment-content ps-5">{parse(comment.commentBody)}</div>
				</Col>
			</Row>
		</div>
	);
};

export default Comment;
