import express from "express";
import Protect from "../middleware/authMiddleware.js";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryAndId,
  createProductReview,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:category").get(getProductsByCategory);
router.route("/:category/:id").get(getProductsByCategoryAndId);
router.route("/:category/:id/reviews").post(Protect, createProductReview);

export default router;
