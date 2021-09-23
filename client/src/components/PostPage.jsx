import React, { useContext, useEffect, useState } from "react";
import { Badge, Container, Spinner } from "react-bootstrap";
import Post from "../stores/PostStore";
import parse from "html-react-parser";
import { StoreContext } from "../stores/RootStore";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import Comments from "./Comments";

const PostPage = observer(({ match }) => {
	const [isLoading, setIsLoading] = useState(true);
	const { user, post } = useContext(StoreContext);

	const limitImagesWidth = () => {
		document
			.querySelectorAll("img")
			.forEach((img) => img.setAttribute("style", "max-width:100%;object-fit:cover;"));
	};

	const handleLike = async () => {
		try {
			const { data } = await user.like(post.id);
			runInAction(() => {
				post.likes = data.likes;
				user.activity.likedPosts = data.likedPosts;
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleBookMark = async () => {
		try {
			const { data } = await user.bookMark(post.id);
			runInAction(() => {
				user.activity.savedForLater = data.savedForLater;
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const { data } = await Post.getPostById(match.params.id);
				runInAction(() => {
					post.id = data._id;
					post.userId = data.userId;
					post.author = data.author;
					post.topic = data.topic;
					post.title = data.title;
					post.subjectImage = data.subjectImage;
					post.body = data.body;
					post.likes = data.likes;
				});
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [match.params.id, post]);

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
		<Container className="mt-5">
			<div className="post w-75 mx-auto py-5">
				<h1 className="display-3">{post && post.title}</h1>
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
						<div className="d-inline-block align-middle">
							<span className="me-1">
								<span className="me-1">{post && post.likes > 0 && post.likes}</span>
								{user.activity.likedPosts.includes(post.id) ? (
									<i
										className="unlike fas fa-thumbs-up  me-1 fs-4"
										onClick={handleLike}
									></i>
								) : (
									<i
										className="like far fa-thumbs-up me-1 fs-4"
										onClick={handleLike}
									></i>
								)}
							</span>
							<span className="me-1">
								{user.activity.savedForLater.includes(post.id) ? (
									<i
										className="bookmark fas fa-bookmark fs-4"
										onClick={handleBookMark}
									></i>
								) : (
									<i
										className="bookmark far fa-bookmark fs-4"
										onClick={handleBookMark}
									></i>
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="body mt-5">{post && parse(post.body)}</div>
			</div>

			<Comments />
		</Container>
	);
});

export default PostPage;
