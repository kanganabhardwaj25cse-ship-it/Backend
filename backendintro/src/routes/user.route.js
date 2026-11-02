import express from "express";
import {loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";

const router = express.Router();

// Register user
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;