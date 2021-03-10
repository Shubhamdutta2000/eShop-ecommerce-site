import express from "express";
import { authProtect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(authProtect, addOrderItems);
router.route("/myorders").get(authProtect, getMyOrders);
router.route("/:id").get(authProtect, getOrderById);
router.route("/:id/payment").put(authProtect, updateOrderToPaid);

export default router;
