import express from "express";

import { authUser, apiUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(apiUser);
router.route("/login").post(authUser);

export default router;
