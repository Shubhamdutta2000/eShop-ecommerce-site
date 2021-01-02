import express from "express";
import Protect from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(Protect, addOrderItems);
router.route("/myorders").get(Protect, getMyOrders);
router.route("/:id").get(Protect, getOrderById);
router.route("/:id/payment").put(Protect, updateOrderToPaid);

export default router;
