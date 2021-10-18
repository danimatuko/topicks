import Comment from "../models/Comment.js";

export const getPostComments = async (req, res) => {
	const postId = req.params.id;

	try {
		const comments = await Comment.find({ postId: postId }).sort({ createdAt: -1 });
		res.status(200).json(comments);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const addComment = async (req, res) => {
	const postId = req.params.id;
	const { userId, author, commentBody, dateOfComment, profileImage } = req.body;
	if (commentBody === "") throw new Error("Comment can't be empty");

	try {
		let comment = new Comment({
			userId,
			postId,
			author,
			commentBody,
			dateOfComment,
			profileImage
		});

		comment = await comment.save();

		res.status(201).json(comment);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const editComment = async (req, res) => {
	const commentId = req.params.cid;
	const { userId, author, commentBody, dateOfComment } = req.body;

	const comment = await Comment.findById(commentId);
	if (!comment) throw new Error("You are not allowed to modify this data");

	if (req.user.id === comment.userId.toString()) {
		comment.set({
			commentBody: commentBody,
			dateOfComment: dateOfComment
		});

		const updatedComment = await comment.save();
		res.status(200).json(updatedComment);
	} else {
		res.status(401);
		throw new Error("You are not allowed to modify this data");
	}
};

export const deleteComment = async (req, res) => {
	const commentId = req.params.cid;

	try {
		const comment = await Comment.findOne({ _id: commentId });

		if (comment.userId.toString() === req.user.id) {
			if (!comment) {
				res.status(404);
				throw "Comment not found";
			}
			await comment.remove();
			return res.status(200).json("Comment deleted");
		}
		throw new Error("You are not allowed to modify this data");
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};
