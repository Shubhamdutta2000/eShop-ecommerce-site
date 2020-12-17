import express from "express";
import Products from "../models/productsModel.js";
const router = express.Router();

//  @purpose: Fetch all products
//  @access:  Public
//  @route:   /products

router.get("/", (req, res) => {
  Products.find({}, (err, products) => {
    if (!err) {
      res.json(products);
    }
  });
});

//  @purpose: Fetch all products by category wise
//  @access:  Public
//  @route:   /products/:category

router.get("/:category", (req, res) => {
  Products.find({ category: req.params.category }, (err, products) => {
    if (!err) {
      res.json(products);
    }
  });
});

//  @purpose: Fetch particular product of particular id and category
//  @access:  Public
//  @route:   /products/:category/:id

router.get("/:category/:id", (req, res) => {
  Products.findOne(
    { category: req.params.category, _id: req.params.id },
    (err, product) => {
      if (!err) {
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: "Requested product not found" });
        }
      }
    }
  );
});

export default router;
