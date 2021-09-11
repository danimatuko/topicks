import express from "express";
import { createPost, getAllposts, getPostById } from "../controllers/postController.js";
const router = express.Router();

router.post("/", createPost);
router.get("/", getAllposts);
router.get("/:id", getPostById);

export default router;
