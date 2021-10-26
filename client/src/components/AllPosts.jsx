import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Post from "../stores/PostStore";
import PostPreview from "./PostPreview";
import Paginate from "./Paginate";
import { StoreContext } from "../stores/RootStore";

const AllPosts = ({ location }) => {
	const [allPosts, setAllPosts] = useState(null);
	const pageNumber = Number(location.search.split("=")[1] || 1);
	const [isLoading, setIsLoading] = useState(true);
	useContext(StoreContext);

	useEffect(() => {
		getAllPosts();
		// eslint-disable-next-line
	}, [pageNumber]);

	// limited number of results (pagination)
	const getAllPosts = async () => {
		console.log("getAllPosts");

		try {
			const { data } = await Post.getAllPosts(pageNumber);
			console.log(data);
			setAllPosts(data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container>
			<Row className="my-5 d-flex justify-content-center">
				<Col md={8}>
					{allPosts && (
						<Row className="mt-3" key={pageNumber}>
							<h2 className="display-6 mb-5 fw-bold text-secondary">All Posts</h2>
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
								path="posts"
							/>
						</Row>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default AllPosts;
