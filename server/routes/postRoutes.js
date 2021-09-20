import express from "express";
const router = express.Router();

import {
	createPost,
	getAllposts,
	getLatestPosts,
	getMostLikedposts,
	getPostById,
	getReadingList,
	getUserPosts,
	like,
	saveForLater
} from "../controllers/postController.js";

router.post("/", createPost);
router.post("/like", like);
router.post("/read-later", saveForLater);

router.get("/", getAllposts);
router.get("/latest", getLatestPosts);
router.get("/most-liked", getMostLikedposts);
router.get("/:id", getPostById);
router.get("/user/:id", getUserPosts);
router.get("/user/reading-list/:id", getReadingList);

export default router;
