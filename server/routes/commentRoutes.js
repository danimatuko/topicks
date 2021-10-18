import express from "express";
import auth from "../middlewares/authMiddleware.js";

import {
	addComment,
	deleteComment,
	editComment,
	getPostComments
} from "../controllers/commentController.js";
const router = express.Router({ mergeParams: true });

router.get("/", getPostComments);

router.post("/", auth, addComment);

router.put("/:cid", auth, editComment);

router.delete("/:cid", auth, deleteComment);

export default router;
