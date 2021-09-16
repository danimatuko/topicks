import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Post from "../stores/PostStore";
import Hero from "./Hero";
import PostPreview from "./PostPreview";
import RecommandedTopics from "./RecommandedTopics";
import { observer } from "mobx-react";
import { StoreContext } from "../stores/RootStore";

const HomePage = observer(() => {
	const [latestPosts, setLatestPosts] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const store = useContext(StoreContext);

	useEffect(() => {
		(async () => {
			const { data } = await Post.getAllPosts();
			setIsLoading(false);
			setLatestPosts(data);
		})();
	}, []);

	return (
		<>
			<Hero />
			<Container>
				<Row className="my-5 d-flex justify-content-between">
					<Col md={6}>
						<h2 className="display-4 mb-4 fw-bold text-secondary">Latest</h2>
						{isLoading ? (
							<Spinner animation="border" className="d-block mx-auto" />
						) : (
							latestPosts &&
							latestPosts
								.filter((latestPosts, index) => index < 10)
								.map((post) => <PostPreview key={post._id} post={post} />)
						)}
					</Col>
					<Col md={4} className="border-start">
						<RecommandedTopics />

						<Container>
							<h2 className="h5 mb-4 mt-4 fw-bold">Reading List</h2>
							<p>
								Click the<i className="far fa-bookmark mx-1"></i>
								on any story to easily add it to your reading list or a custom list
								that you can share.
							</p>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
});

export default HomePage;
