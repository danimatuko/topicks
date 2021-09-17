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
	const { postId, userId, isLiked } = req.body;
	const user = await updateUserLikes(userId, postId);
	const post = await updatePostLikes(postId, isLiked, user.alreadyLiked);
	res.status(200).json({
		id: post._id,
		likeResult: post.likeResult,
		likes: post.likes,
		likedPosts: user.activity.likedPosts
	});
};

const updatePostLikes = async (id, isLiked, alreadyLiked) => {
	try {
		let post = await Post.findById({ _id: id });
		if (isLiked == "true" && !alreadyLiked) {
			post.likes = post.likes += 1;
			post.likeResult = "like";
			post = await post.save();
			return post;
		} else {
			post.likes = post.likes -= 1;
			post.likeResult = "disLike";
			post = await post.save();
			return post;
		}

		// post.likes = isLiked == "true" && !alreadyLiked ? (post.likes += 1) : (post.likes -= 1);
		// post = await post.save();
		// post.likeResult = isLiked;
		// return post;
	} catch (error) {
		throw new Error(error);
	}
};

const updateUserLikes = async (userId, postId) => {
	try {
		let user = await User.findById({ _id: userId });
		const alreadyLiked = user.activity.likedPosts.find((id) => id == postId);

		if (alreadyLiked) {
			user.activity.likedPosts = user.activity.likedPosts.filter((id) => id !== postId);
			user = await user.save();
			// add info if user already liked the post to update the post likes properly
			user.alreadyLiked = alreadyLiked;
			return user;
		} else {
			user.activity.likedPosts.push(postId);
			user = await user.save();
			return user;
		}
	} catch (error) {
		throw new Error(error);
	}
};
