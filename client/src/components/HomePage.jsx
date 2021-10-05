import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import Post from "../stores/PostStore";
import Hero from "./Hero";
import PostPreview from "./PostPreview";
import RecommandedTopics from "./RecommandedTopics";
import { StoreContext } from "../stores/RootStore";
import { Link } from "react-router-dom";
import Paginate from "./Paginate";

const HomePage = ({ match, location }) => {
	const [latestPosts, setLatestPosts] = useState(null);
	const [mostLikedPosts, setMostLikedPosts] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [allPosts, setAllPosts] = useState(null);
	const pageNumber = location.search.split("=")[1] || 1;

	useContext(StoreContext);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await Post.getLatestPosts();
				setIsLoading(false);
				setLatestPosts(data);
			} catch (error) {}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await Post.getMostLikedPosts();
				setIsLoading(false);
				setMostLikedPosts(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const getAllPosts = async () => {
		try {
			const { data } = await Post.getAllPosts(pageNumber);
			setAllPosts(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllPosts(); 
		// eslint-disable-next-line
	}, [pageNumber]);

	return (
		<>
			<Hero />
			<Container>
				<Row className="my-5 d-flex justify-content-between">
					<Col md={6}>
						{allPosts ? (
							<Link
								as={Button}
								className="text-dark"
								to="#"
								onClick={() => setAllPosts(null)}
							>
								<i className="fas fa-times"></i> All Posts
							</Link>
						) : (
							<Link
								as={Button}
								className="text-dark"
								to="#"
								onClick={() => getAllPosts()}
							>
								View All Posts
							</Link>
						)}

						{allPosts ? (
							<Row className="mt-3" key={pageNumber}>
								<h2 className="display-4 my-4 fw-bold text-secondary">All Posts</h2>
								{isLoading ? (
									<Spinner animation="border" className="d-block mx-auto" />
								) : (
									allPosts &&
									allPosts.posts.map((post) => (
										<PostPreview key={post._id} post={post} />
									))
								)}

								<Paginate
									total={allPosts.totalPages}
									page={allPosts.page}
									path={"posts"}
								/>
							</Row>
						) : (
							<>
								<Row className="mt-3">
									<h2 className="display-4 my-4 fw-bold text-secondary">
										Latest
									</h2>
									{isLoading ? (
										<Spinner animation="border" className="d-block mx-auto" />
									) : (
										latestPosts &&
										latestPosts.map((post) => (
											<PostPreview key={post._id} post={post} />
										))
									)}
								</Row>
								<Row>
									<h2 className="display-4 mb-4 fw-bold text-secondary">
										Most Liked
									</h2>
									{isLoading ? (
										<Spinner animation="border" className="d-block mx-auto" />
									) : (
										mostLikedPosts &&
										mostLikedPosts.map((post) => (
											<PostPreview key={post._id} post={post} />
										))
									)}
								</Row>
							</>
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
};

export default HomePage;
