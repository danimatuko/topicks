import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		},
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
		},
		likes: {
			type: Number,
			default: 0
		},
		profileImage: {
			type: String,
			default:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeQlsruJMdFTjMK9OkGZY527BXOvbGDWWHg&usqp=CAU"
		}
	},
	{
		timestamps: true
	}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
