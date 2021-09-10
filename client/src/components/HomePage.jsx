import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Post from "../Models/Post";
import Hero from "./Hero";
import PostPreview from "./PostPreview";
import RecommandedTopics from "./RecommandedTopics";

const HomePage = () => {
	const [latestPosts, setLatestPosts] = useState(null);

	useEffect(async () => {
		const { data } = await Post.getAllPosts();
		setLatestPosts(data);
	}, []);

	return (
		<>
			<Hero />
			<Container>
				<Row className="my-5 d-flex justify-content-between">
					<Col md={6}>
						<h2 className="display-4 mb-4 fw-bold text-secondary">Latest</h2>
						{latestPosts &&
							latestPosts
								.filter((latestPosts, index) => index < 3)
								.map((post) => <PostPreview key={post._id} post={post} />)}
					</Col>
					<Col md={4} className="border-start">
						<RecommandedTopics />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default HomePage;
