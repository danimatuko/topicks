import express from "express";
const router = express.Router();
import auth from "../middlewares/authMiddleware.js";

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

router.post("/", auth, createPost);
router.post("/like", auth, like);
router.post("/read-later", auth, saveForLater);

router.put("/:id", auth, updatePost);

//router.get("/", getAllposts);
router.get("/", getPosts);
router.get("/latest", getLatestPosts);
router.get("/most-liked", getMostLikedposts);
router.get("/topic=:topic", getPostsByTopic);

router.get("/:id", getPostById);
router.get("/user/:id", getUserPosts);
router.get("/user/reading-list/:id", auth, getReadingList);

router.delete("/:id", auth, deletePost);

export default router;
