import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
	const { userId, author, topic, title, subjectImage, body, dateOfPost } = req.body;
	try {
		let post = new Post({
			userId,
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
		res.status(500);
		throw new Error(error);
	}
};

export const getAllposts = async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(200).json(posts);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const getPostById = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id });
		res.status(200).json(post);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const like = async (req, res) => {
	const { postId, userId } = req.body;

	const user = await User.findOne({ _id: userId });
	const alreadyLiked = user.activity.likedPosts.includes(postId);

	const post = await Post.findById({ _id: postId });

	if (alreadyLiked) {
		post.likes -= 1;
		const index = user.activity.likedPosts.indexOf(postId);
		user.activity.likedPosts.splice(index, 1);
	} else {
		post.likes += 1;
		user.activity.likedPosts.push(postId);
	}

	await user.save();
	await post.save();

	res.status(200).json({
		postId: post._id,
		likes: post.likes,
		likedPosts: user.activity.likedPosts
	});
};
