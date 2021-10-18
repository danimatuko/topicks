import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import Post from "../stores/PostStore";
import Comment from "../stores/CommentStore";
import { StoreContext } from "../stores/RootStore";

const PostRow = ({ post, index, editable, setIsDeleted }) => {
	const { _id, topic, title, subjectImage, dateOfPost, likes } = post;
	const [commentsCount, setCommentsCount] = useState(0);
	const { user } = useContext(StoreContext);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await Comment.getAll(_id);
				setCommentsCount(data.length);
			} catch (error) {
				console.log(error);
			}
		})();
	});

	const history = useHistory();

	const rowClickHandler = (e) => {
		history.push(`/posts/${_id}`);
	};

	const deleteHandler = async () => {
		const token = user.token;
		try {
			await Post.delete(_id, token);
			setIsDeleted(true);
		} catch (error) {
			console.log(error);
		}
	};

	const options = (e) => {
		// disable the onClick event of the row if the opitons button is clicked
		e.stopPropagation();
	};
	return (
		<tr onClick={(e) => rowClickHandler(e)} style={{ cursor: "pointer" }}>
			{editable && (
				<td onClick={(e) => options(e)}>
					<DropdownButton
						title={<i className="fas fa-ellipsis-v text-secondary"></i>}
						className="table-row-dropdown"
					>
						<Dropdown.Item as={Link} to={`/post/edit/${_id}`}>
							Edit
						</Dropdown.Item>
						<Dropdown.Item onClick={deleteHandler}>Delete</Dropdown.Item>
					</DropdownButton>
				</td>
			)}

			<td>{index + 1}</td>
			<td>
				<Image src={subjectImage} width="80px" height="50px" />
			</td>
			<td>{title}</td>
			<td>{dateOfPost}</td>
			<td>{topic}</td>
			<td>23</td>
			<td>{likes}</td>
			<td>{commentsCount}</td>
		</tr>
	);
};

export default PostRow;
