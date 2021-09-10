import Post from "../models/Post.js";

export const createPost = async (req, res) => {
	const { author, topic, title, subjectImage, body, dateOfPost } = req.body;
	try {
		let post = new Post({
			author: author,
			title: title,
			topic: topic,
			subjectImage: subjectImage,
			body: body,
			dateOfPost: dateOfPost
		});

		post = await post.save();

		res.status(201).json(post);
	} catch (error) {
		res.json(error.message);
	}
};

export const getAllposts = async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(200).json(posts);
	} catch (error) {
		res.json(error.message);
	}
};
