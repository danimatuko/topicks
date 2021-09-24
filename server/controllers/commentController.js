import Comment from "../models/Comment.js";

export const getPostComments = async (req, res) => {
	const postId = req.params.id;

	try {
		const comments = await Comment.find({ postId: postId });
		res.status(200).json(comments);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const addComment = async (req, res) => {
	const postId = req.params.id;
	const { userId, author, commentBody, dateOfComment } = req.body;

	try {
		let comment = new Comment({
			userId,
			postId,
			author,
			commentBody,
			dateOfComment
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

	try {
		let updatedComment = {
			userId,
			author,
			commentBody,
			dateOfComment
		};

		updatedComment = await Comment.findByIdAndUpdate(
			{
				_id: commentId
			},
			updatedComment,
			{
				new: true
			}
		);

		if (!updatedComment) throw new Error("Comment not found");

		res.status(200).json(updatedComment);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const deleteComment = async (req, res) => {
	const commentId = req.params.cid;

	try {
		await Comment.findByIdAndRemove({ _id: commentId });
		res.status(200).json("Comment deleted");
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};
