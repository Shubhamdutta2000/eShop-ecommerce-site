import express from 'express';

import {
  createProductReview,
  createSampleProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryAndId,
  updateProduct
} from '../controllers/productController.js';
import { adminCheck, authProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(authProtect, adminCheck, createSampleProduct); // for admin user

router.route('/:category').get(getProductsByCategory); // not used

router
  .route('/:category/:id')
  .get(getProductsByCategoryAndId)
  .put(authProtect, adminCheck, updateProduct) // for admin user
  .delete(authProtect, adminCheck, deleteProduct); // for admin user
router.route('/:category/:id/reviews').post(authProtect, createProductReview);

export default router;
