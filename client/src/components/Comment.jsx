import React, { useContext } from "react";
import { Image, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import parse from "html-react-parser";
import { StoreContext } from "../stores/RootStore";
import CommentModel from "../stores/CommentStore";

const Comment = ({ comment, setIsDeleted, setEditComment }) => {
	const { user } = useContext(StoreContext);
	//	const { userId, author, commentBody, dateOfComment } = comment;

	const editComment = async () => {
		setEditComment(comment.commentBody);
	};

	const deleteComment = async () => {
		try {
			await CommentModel.delete(comment._id, comment.postId, user.token);
			setIsDeleted(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="comment mb-5 ">
			<Row className="flex gy-1" style={{ backgroundColor: "" }}>
				<Col xs={10}>
					<div className="d-flex " style={{ width: "175px" }}>
						<Image
							width="40px"
							height="40px"
							src={comment.profileImage}
							roundedCircle
							className="me-2"
						/>
						<div>
							<div className="fw-bold me-2">{comment.author}</div>
							<small className="d-block">{comment.dateOfComment}</small>
						</div>
					</div>
					<div className="comment-content ps-5">{parse(comment.commentBody)}</div>
				</Col>
				<Col xs={2} className="text-end">
					{user.id === comment.userId && (
						<DropdownButton
							title={<i className="fas fa-ellipsis-v text-secondary"></i>}
							className="table-row-dropdown"
						>
							<Dropdown.Item onClick={editComment}>Edit</Dropdown.Item>
							<Dropdown.Item onClick={deleteComment}>Delete</Dropdown.Item>
						</DropdownButton>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default Comment;
