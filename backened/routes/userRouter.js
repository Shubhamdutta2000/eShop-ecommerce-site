import express from "express";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  checkAuth,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { authProtect, adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(authProtect, getUserProfile)
  .put(authProtect, updateUserProfile);
router.route("/auth").get(authProtect, checkAuth);

///   FOR ADMIN USER   ///
router.route("/").get(authProtect, adminCheck, getUsers);
router
  .route("/:id")
  .get(authProtect, adminCheck, getUserById)
  .put(authProtect, adminCheck, updateUser)
  .delete(authProtect, adminCheck, deleteUser);

export default router;
