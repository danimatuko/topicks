import React, { useEffect, useState } from "react";
import { Badge, Container, Spinner } from "react-bootstrap";
import Post from "../stores/Post";
import parse from "html-react-parser";

const PostPage = ({ match }) => {
	const [post, setPost] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const limitImagesWidth = () => {
		document
			.querySelectorAll("img")
			.forEach((img) => img.setAttribute("style", "max-width:100%;object-fit:cover;"));
	};

	useEffect(() => {
		(async () => {
			const { data } = await Post.get(match.params.id);
			setIsLoading(false);
			setPost(data);
		})();
	}, [match.params.id]);

	// if the user post an image larger then the page container resize the image
	limitImagesWidth();

	return isLoading ? (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "75vh" }}
		>
			<Spinner animation="border" />)
		</div>
	) : (
		<Container>
			<div className="post w-75 m-auto my-5">
				<h1 className="display-3">React useRef Hook</h1>
				<div className="d-flex justify-content-between">
					<div>
						<div className="author mb-2 text-muted text-capitalize fw-bold">
							{post && post.author}
						</div>
						<span className="text-muted me-2">{post && post.dateOfPost}</span>
					</div>
					<div>
						<Badge className="tag border-radius-5  p-2 me-2" pill bg="secondary">
							{post && post.topic}
						</Badge>
						<i className="far fa-thumbs-up me-1"></i>
						<i className="far fa-bookmark"></i>
					</div>
				</div>
				<div className="body mt-5">{post && parse(post.body)}</div>
			</div>
		</Container>
	);
};

export default PostPage;
