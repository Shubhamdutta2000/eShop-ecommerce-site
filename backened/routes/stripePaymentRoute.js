import express from "express";
import { makePaymentWithStripe } from "../controllers/stripePaymentController.js";
import { authProtect } from "../middleware/authMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.route("/").post(authProtect, makePaymentWithStripe);

export default router;
