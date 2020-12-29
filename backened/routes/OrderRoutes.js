import express from "express";
import Protect from "../middleware/authMiddleware.js";
import { addOrderItems } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(Protect, addOrderItems);

export default router;
