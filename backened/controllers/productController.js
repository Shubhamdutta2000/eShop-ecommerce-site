import Products from "../models/productsModel.js";

// for handling exceptions inside of async express routes
import asyncHandler from "express-async-handler";

//  @purpose: Fetch all products
//  @access:  Public
//  @route:   GET /products

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

//  @purpose: Fetch all products by category wise
//  @access:  Public
//  @route:   GET /products/:category

const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Products.find({ category: req.params.category });
  if (products) {
    res.json(products);
  } else {
    res.status(404);

    throw new Error("Category of Product Not Found");
  }
});

//  @purpose: Fetch particular product of particular id and category
//  @access:  Public
//  @route:   GET /products/:category/:id

const getProductsByCategoryAndId = asyncHandler(async (req, res) => {
  const product = await Products.findOne({
    category: req.params.category,
    _id: req.params.id,
  });

  if (product) {
    res.json(product);
  } else {
    res.status(404);

    throw new Error("Product Not Found");
  }
});

export { getAllProducts, getProductsByCategory, getProductsByCategoryAndId };
