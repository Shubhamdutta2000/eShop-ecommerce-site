import express from "express";

import {
  authUser,
  registerUser,
  apiUser,
  getUserProfile,
} from "../controllers/userController.js";

import authProtect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(apiUser);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(authProtect, getUserProfile);

export default router;
