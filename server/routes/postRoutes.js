import express from "express";
import { createPost, getAllposts } from "../controllers/postController.js";
const router = express.Router();

router.post("/", createPost);
router.get("/", getAllposts);

export default router;
