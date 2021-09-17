import express from "express";
import { createPost, getAllposts, getPostById,like } from "../controllers/postController.js";
const router = express.Router();

router.post("/like", like);
router.post("/", createPost);
router.get("/", getAllposts);
router.get("/:id", getPostById);

export default router;
