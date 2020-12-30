import express from "express";
import Protect from "../middleware/authMiddleware.js";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(Protect, addOrderItems);
router.route("/:id").get(Protect, getOrderById);

export default router;
