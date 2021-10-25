import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Post from "../stores/PostStore";
import PostPreview from "./PostPreview";

const SearchResults = ({ location, match }) => {
	let keyWords = location.search.split("=")[1]?.replace("%", " ");
	const [results, setResults] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const fetchResults = async () => {
		try {
			setisLoading(true);
			const { data } = await Post.searchPosts(keyWords);
			setResults(data);
			setisLoading(false);
		} catch (error) {
			setisLoading(false);
			console.log(error);
		}
	};

	useEffect(
		() => keyWords !== "" && fetchResults(),
		// eslint-disable-next-line
		[keyWords]
	);

	return (
		<Container>
			<Row className="my-5 d-flex justify-content-center">
				<Col md={8}>
					<div className="my-4">
						<h1 className="h3 fw-bold text-secondary">
							{results.length || "No"} results for{" "}
							<span className="">"{keyWords}"</span>
						</h1>
						{isLoading ? (
							<Spinner animation="border" className="d-block mx-auto" />
						) : (
							<div className="my-5">
								<Row className="mt-3">
									{results.length > 0 &&
										results.map((post) => (
											<PostPreview key={post._id} post={post} />
										))}
								</Row>
							</div>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SearchResults;
