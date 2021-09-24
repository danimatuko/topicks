import express from "express";
import {
	addComment,
	deleteComment,
	editComment,
	getPostComments
} from "../controllers/commentController.js";
const router = express.Router({ mergeParams: true });


router.get("/", getPostComments);

router.post("/", addComment);

router.put("/:cid", editComment);

router.delete("/:cid", deleteComment);

export default router;
