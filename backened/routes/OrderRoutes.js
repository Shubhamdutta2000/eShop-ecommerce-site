import express from 'express';

import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered, //for admin user
  updateOrderToPaid
} from '../controllers/orderController.js';
import { adminCheck, authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(authProtect, adminCheck, getAllOrders) // for admin user
  .post(authProtect, addOrderItems);
router.route('/myorders').get(authProtect, getMyOrders);
router.route('/:id').get(authProtect, getOrderById);
router.route('/:id/payment').put(authProtect, updateOrderToPaid);
router.route('/:id/deliver').put(authProtect, adminCheck, updateOrderToDelivered);

export default router;
