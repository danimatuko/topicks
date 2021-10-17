import express from "express";
import { changeProfileImage, getUserById, login, register } from "../controllers/userController.js";
const router = express.Router();
import auth from "../middlewares/authMiddleware.js";

// REGISTER
router.post("/", register);
// LOGIN
router.post("/login", login);
// GET USER BY ID
router.get("/:id", getUserById);
// CHANGE PROFILE IMAGE
router.put("/:id/profile-image", auth, changeProfileImage);

export default router;
