import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
	{
		author: {
			type: String,
			required: true
		},
		topic: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		subjectImage: {
			type: String
		},
		body: {
			type: String,
			required: true
		},
		dateOfPost: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
