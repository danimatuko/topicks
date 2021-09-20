import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
	const { userId, author, topic, title, subjectImage, body, dateOfPost } = req.body;

	if (title === "" || topic === "" || body === "") {
		res.status(400);
		throw new Error("Fill the required fields");
	}

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
export const getLatestPosts = async (req, res) => {
	try {
		const latestPosts = await Post.find().sort({ _id: -1 }).limit(3);
		res.status(200).json(latestPosts);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
};

export const getMostLikedposts = async (req, res) => {
	try {
		const mostLikedposts = await Post.find().sort({ likes: -1 }).limit(3);
		res.status(200).json(mostLikedposts);
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

export const saveForLater = async (req, res) => {
	const { postId, userId } = req.body;

	const user = await User.findOne({ _id: userId });
	const alreadySaved = user.activity.savedForLater.includes(postId);

	if (alreadySaved) {
		const index = user.activity.savedForLater.indexOf(postId);
		user.activity.savedForLater.splice(index, 1);
	} else {
		user.activity.savedForLater.push(postId);
	}

	await user.save();

	res.status(200).json({
		savedForLater: user.activity.savedForLater
	});
};

export const getReadingList = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id });

	if (user) {
		let readingList = user.activity.savedForLater;
		readingList = await Post.find({ _id: { $in: readingList } });
		return res.status(200).json(readingList);
	}

	res.status(500);
	throw new Error(error);
};

export const getUserPosts = async (req, res) => {
	const posts = await Post.find({ userId: req.params.id });
	if (posts) {
		return res.status(200).json(posts);
	}
	res.status(500);
	throw new Error(error);
};
