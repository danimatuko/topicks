import React from "react";
import { useHistory } from "react-router-dom";

import { Image } from "react-bootstrap";

const PostRow = ({ post, index }) => {
	const { _id, topic, title, subjectImage, dateOfPost, likes } = post;

	const history = useHistory();

	const handleClick = () => {
		history.push(`/posts/${_id}`);
	};

	return (
		<tr onClick={handleClick} style={{ cursor: "pointer" }}>
			<td>{index + 1}</td>
			<td>
				<Image src={subjectImage} width="80px" height="50px" />
			</td>
			<td>{title}</td>
			<td>{dateOfPost}</td>
			<td>{topic}</td>
			<td>23</td>
			<td>{likes}</td>
			<td>16</td>
		</tr>
	);
};

export default PostRow;
