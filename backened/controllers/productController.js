import Products from "../models/productsModel.js";

// for handling exceptions inside of async express routes
import asyncHandler from "express-async-handler";

//  @purpose: Fetch all products
//  @access:  Public
//  @route:   GET /products
const getAllProducts = asyncHandler(async (req, res, next) => {
  // For Search
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  try {
    const products = await Products.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(404);
    next(error);
  }

  // For pagination
  // const pageSize = 10; // total no. of products in 1 page
  // const pageNumber = Number(req.query.pageNumber) || 1; // page number to search

  // const totalProducts = await Products.countDocuments({ ...keyword });
  // const products = await Products.find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (pageNumber - 1));

  // res.json({
  //   products: products,
  //   page: pageNumber,
  //   pages: Math.ceil(totalProducts / pageSize),
  // });
});

//  @purpose: Fetch all products by category wise
//  @access:  Public
//  @route:   GET /products/:category
const getProductsByCategory = asyncHandler(async (req, res, next) => {
  try {
    const products = await Products.find({ category: req.params.category });
    if (products) {
      res.json(products);
    } else {
      res.status(404);
      const err = new Error("Category of Product Not Found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: Fetch particular product of particular id and category
//  @access:  Public
//  @route:   GET /products/:category/:id
const getProductsByCategoryAndId = asyncHandler(async (req, res, next) => {
  try {
    const product = await Products.findOne({
      category: req.params.category,
      _id: req.params.id,
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      const err = new Error("Product Not Found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @desc    Delete a product
// @route   DELETE /products/:category/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a new product
// @route   POST /products
// @access  Private/Admin
const createSampleProduct = asyncHandler(async (req, res, next) => {
  try {
    const sampleProduct = new Products({
      name: "Sample",
      image: "/image/category/sample.jpg",
      price: 0,
      user: req.user._id,
      brand: "Sample brand",
      category: "SampleCategory",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdSampleProduct = await sampleProduct.save();
    res.status(201).json(createdSampleProduct);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @desc    update product
// @route   PUT /products/:category/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    brand,
    category,
    price,
    image,
    countInStock,
    description,
  } = req.body;
  try {
    const product = await Products.findOne({
      category: req.params.category,
      _id: req.params.id,
    });
    if (product) {
      product.name = name;
      product.brand = brand;
      product.category = category;
      product.price = price;
      product.image = image;
      product.countInStock = countInStock;
      product.description = description;

      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      res.status(404);
      const err = new Error("Product Not Found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: Craete new Reviews
//  @access:  Private
//  @route:   POST /products/:category/:id/reviews
const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  try {
    const product = await Products.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (p) => p.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        const err = new Error("Product already reviewed");
        next(err);
      }
      console.log(req.user.name);
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviews added succesfully" });
    } else {
      res.status(404);
      const err = new Error("Product not found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

export {
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryAndId,
  deleteProduct,
  updateProduct,
  createSampleProduct,
  createProductReview,
};
