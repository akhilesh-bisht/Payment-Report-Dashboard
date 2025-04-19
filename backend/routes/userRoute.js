import express from "express";
import { loginUser, logoutUser } from "../controllers/user.controller.js";

const router = express.Router();

// Login User
router.post("/login", loginUser);

//  Logout User
router.post("/logout", logoutUser);

export default router;
