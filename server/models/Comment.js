import mongoose from "mongoose";

export const commentSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Post"
		},
		author: {
			type: String,
			required: true
		},
		dateOfComment: {
			type: String,
			required: true
		},
		commentBody: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
