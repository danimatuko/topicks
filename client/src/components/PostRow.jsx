import React from "react";
import { useHistory } from "react-router-dom";

import { Dropdown, DropdownButton, Image } from "react-bootstrap";

const PostRow = ({ post, index }) => {
	const { _id, topic, title, subjectImage, dateOfPost, likes } = post;

	const history = useHistory();

	const handleClick = (e) => {
		history.push(`/posts/${_id}`);
	};
	const options = (e) => {
		e.stopPropagation();
		console.log("options");
	};
	return (
		<tr onClick={(e) => handleClick(e)} style={{ cursor: "pointer" }}>
			<td onClick={(e) => options(e)}>
				<DropdownButton
					title={<i className="fas fa-ellipsis-v text-secondary"></i>}
					className="table-row-dropdown"
				>
					<Dropdown.Item>Edit</Dropdown.Item>
					<Dropdown.Item>Delete</Dropdown.Item>
				</DropdownButton>
			</td>
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

const OptionsIcon = () => <i className="fas fa-ellipsis-v"></i>;

export default PostRow;
