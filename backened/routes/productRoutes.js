import express from "express";
import Products from "../models/productsModel.js";

// for handling exceptions inside of async express routes
import asyncHandler from "express-async-handler";

const router = express.Router();

//  @purpose: Fetch all products
//  @access:  Public
//  @route:   GET /products

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.json(products);
  })
);

//  @purpose: Fetch all products by category wise
//  @access:  Public
//  @route:   GET /products/:category

router.get(
  "/:category",
  asyncHandler(async (req, res) => {
    const products = await Products.find({ category: req.params.category });
    if (products) {
      res.json(products);
    } else {
      res
        .status(404)
        .json({ message: "Requested caegory of products not found" });
    }
  })
);

//  @purpose: Fetch particular product of particular id and category
//  @access:  Public
//  @route:   GET /products/:category/:id

router.get(
  "/:category/:id",
  asyncHandler(async (req, res) => {
    const product = await Products.findOne({
      category: req.params.category,
      _id: req.params.id,
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Requested product not found" });
    }
  })
);

export default router;
