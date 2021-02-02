import express from "express";

import {
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryAndId,
  createProductReview,
} from "../controllers/productController.js";
import authProtect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:category").get(getProductsByCategory);
router.route("/:category/:id").get(getProductsByCategoryAndId);
router.route("/:category/:id/reviews").post(authProtect, createProductReview);
export default router;
