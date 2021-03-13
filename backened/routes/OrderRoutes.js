import express from "express";
import { adminCheck, authProtect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getAllOrders,
  updateOrderToDelivered, //for admin user
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(authProtect, adminCheck, getAllOrders) // for admin user
  .post(authProtect, addOrderItems);
router.route("/myorders").get(authProtect, getMyOrders);
router.route("/:id").get(authProtect, getOrderById);
router.route("/:id/payment").put(authProtect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(authProtect, adminCheck, updateOrderToDelivered);

export default router;
