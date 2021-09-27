import React, { useContext } from "react";
import { Image, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import parse from "html-react-parser";
import { StoreContext } from "../stores/RootStore";
import CommentModel from "../stores/CommentStore";

const Comment = ({ comment, setIsDeleted }) => {
	const { user } = useContext(StoreContext);

	const deleteComment = async () => {
		try {
			await CommentModel.delete(comment._id, comment.postId);
			setIsDeleted(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="comment mb-5 ">
			<Row className="flex gy-1" style={{ backgroundColor: "" }}>
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
					<div className="comment-content ps-5">{parse(comment.commentBody)}</div>
				</Col>
				<Col className="text-end">
					{user.id === comment.userId && (
						<DropdownButton
							title={<i className="fas fa-ellipsis-v text-secondary"></i>}
							className="table-row-dropdown"
						>
							<Dropdown.Item>Edit</Dropdown.Item>
							<Dropdown.Item onClick={deleteComment}>Delete</Dropdown.Item>
						</DropdownButton>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default Comment;
