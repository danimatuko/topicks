import express from "express";
const router = express.Router();

import {
	createPost,
	deletePost,
	getAllposts,
	getLatestPosts,
	getMostLikedposts,
	getPostById,
	getPosts,
	getPostsByTopic,
	getReadingList,
	getUserPosts,
	like,
	saveForLater,
	updatePost
} from "../controllers/postController.js";

router.post("/", createPost);
router.post("/like", like);
router.post("/read-later", saveForLater);

router.put("/:id", updatePost);

//router.get("/", getAllposts);
router.get("/", getPosts);
router.get("/latest", getLatestPosts);
router.get("/most-liked", getMostLikedposts);
router.get("/topic=:topic", getPostsByTopic);

router.get("/:id", getPostById);
router.get("/user/:id", getUserPosts);
router.get("/user/reading-list/:id", getReadingList);

router.delete("/:id", deletePost);

export default router;
