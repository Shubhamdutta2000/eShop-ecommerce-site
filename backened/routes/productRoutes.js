import express from "express";

import {
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryAndId,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:category").get(getProductsByCategory);
router.route("/:category/:id").get(getProductsByCategoryAndId);

export default router;
