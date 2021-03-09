import express from "express";

import {
  authUser,
  registerUser,
  apiUser,
  getUserProfile,
  updateUserProfile,
  checkAuth,
} from "../controllers/userController.js";

import authProtect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(apiUser);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(authProtect, getUserProfile)
  .put(authProtect, updateUserProfile);
router.route("/auth").get(authProtect, checkAuth);

export default router;
