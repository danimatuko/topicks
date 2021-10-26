import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const register = async (req, res) => {
	const { first_name, last_name, email, password, confirmPassword, role } = req.body;
	if (first_name === "" || last_name === "" || email === "" || password === "" || role === "") {
		res.status(400);
		throw new Error("All fields are required");
	}
	if (password !== confirmPassword) {
		res.status(400);
		throw new Error("Passwords must match!");
	}
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User alerdy exist");
	} else {
		// hash the password before saving the user in the database
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		let user = new User({
			first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
			last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1),
			email,
			password: encryptedPassword
		});

		user = await user.save();

		const token = generateToken(user._id, first_name, last_name, user.role);

		if (user) {
			res.status(201).json({
				id: user._id,
				first_name,
				last_name,
				email,
				role: user.role,
				token
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id, user.first_name, user.last_name, user.role);
		res.status(200).json({
			id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			role: user.role,
			activity: {
				favoraites: user.activity.favoraites,
				likedPosts: user.activity.likedPosts,
				savedForLater: user.activity.savedForLater
			},
			profileImage: user.profileImage,
			token
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
};

export const getUserById = async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	res.json(user);
};

export const changeProfileImage = async (req, res) => {
	let user = await User.findById(req.params.id);
	if (!user) throw new Error("User not found");

	if (user._id.toString() === req.user.id) {
		user.set({
			profileImage: req.body.profileImage
		});
		user = await user.save();
		// update profile image in the user's posts
		await Post.updateMany(
			{ userId: req.params.id },
			{ $set: { profileImage: req.body.profileImage } }
		);
		// update profile image in the user's comments
		await Comment.updateMany(
			{ userId: req.params.id },
			{ $set: { profileImage: req.body.profileImage } }
		);
		res.status(200).json(user.profileImage);
	} else {
		res.status(401);
		throw new Error("You are not allowed to modify this data");
	}
};
