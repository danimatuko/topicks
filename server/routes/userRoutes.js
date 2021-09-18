import express from "express";
import { getUserById, login, register } from "../controllers/userController.js";
const router = express.Router();

// REGISTER
router.post("/", register);
// LOGIN
router.post("/login", login);
// GET USER BY ID
router.get("/:id", getUserById);

export default router;
