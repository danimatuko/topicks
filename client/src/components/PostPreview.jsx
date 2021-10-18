import { runInAction } from "mobx";
import React, { useContext } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreContext } from "../stores/RootStore";
import { observer } from "mobx-react";

const PostPreview = observer(({ post }) => {
	const { _id, author, topic, title, subjectImage, dateOfPost } = post;
	const { user } = useContext(StoreContext);

	const handleLike = async () => {
		try {
			const { data } = await user.like(_id);
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
			const { data } = await user.bookMark(_id);
			runInAction(() => {
				user.activity.savedForLater = data.savedForLater;
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="d-flex justify-content-between align-items-center mb-4">
			<div style={{ flex: 3 }}>
				<Link to={`/posts/${_id}`} className="text-decoration-none text-dark">
					<img src={post.profileImage} className="author-image me-1 mb-2" alt="" />
					<span className="author mb-2 text-muted text-capitalize">{author}</span>
					<h2 className="h5 text-capitalize mb-1 fw-bold">{title}</h2>
					<p className="fw-lighter">CRUD is an ancient paradigm better left behind.</p>
				</Link>
				<div className="d-flex flex-wrap justify-content-between align-items-center">
					<div>
						<span className="text-muted me-2">{dateOfPost}</span>
						<Badge className="tag border-radius-5 p-2" pill bg="secondary">
							{topic}
						</Badge>
					</div>
					<div className="me-3">
						<div className="d-inline-block align-middle">
							<span className="me-1">
								<span className="me-1">{post && post.likes > 0 && post.likes}</span>
								{user.activity.likedPosts.includes(_id) ? (
									<i
										className="unlike fas fa-thumbs-up  me-1 fs-5"
										onClick={handleLike}
									></i>
								) : (
									<i
										className="like far fa-thumbs-up me-1 fs-5"
										onClick={handleLike}
									></i>
								)}
							</span>
							<span className="me-1">
								{user.activity.savedForLater.includes(_id) ? (
									<i
										className="bookmark fas fa-bookmark fs-5"
										onClick={handleBookMark}
									></i>
								) : (
									<i
										className="bookmark far fa-bookmark fs-5"
										onClick={handleBookMark}
									></i>
								)}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div style={{ flex: "1", height: "100%" }}>
				<Link to={`/posts/${_id}`} className="text-decoration-none text-dark">
					<img
						src={subjectImage}
						alt="img"
						style={{ width: "190px", height: "100%", objectFit: "cover" }}
					/>
				</Link>
			</div>
		</div>
	);
});

export default PostPreview;
