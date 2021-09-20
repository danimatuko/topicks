import express from "express";
import {
	createPost,
	getAllposts,
	getLatestPosts,
	getMostLikedposts,
	getPostById,
	getUserPosts,
	like
} from "../controllers/postController.js";
const router = express.Router();

router.post("/", createPost);
router.post("/like", like);

router.get("/", getAllposts);
router.get("/latest", getLatestPosts);
router.get("/most-liked", getMostLikedposts);
router.get("/:id", getPostById);
router.get("/user/:id", getUserPosts);

export default router;
