import React from "react";
import { Badge, Container } from "react-bootstrap";
import Post from "../stores/PostStore";

const RecommandedTopics = ({ setPostsByTopic }) => {
	const TOPICS = [
		"Music",
		"Money",
		"Bussiness",
		"Technology",
		"Programming",
		"Gaming",
		"Art",
		"Sports",
		"Politics",
		"History"
	];

	const getPostsByTopic = async (topic) => {
		try {
			const { data } = await Post.getPostsByTopic(topic);
			setPostsByTopic({
				topic: topic,
				posts: data
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="recommended-topics">
			<h2 className="h5 mb-4 fw-bold">Recommended topics</h2>
			<div className="d-flex flex-wrap">
				{TOPICS.map((topic) => (
					<Badge
						key={topic}
						className="topic tag border-radius-5  p-2 m-1"
						pill
						bg="secondary"
						data-topic={topic}
						onClick={(e) => getPostsByTopic(e.target.dataset.topic)}
					>
						{topic}
					</Badge>
				))}
			</div>
			<hr />
		</Container>
	);
};

export default RecommandedTopics;
