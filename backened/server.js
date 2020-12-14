const dotenv = require("dotenv");

const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/", (req, res) => {
  res.send("API works Fine");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:category", (req, res) => {
  product = products.filter((p) => p.category == req.params.category);

  res.json(product);
});

app.get("/products/:category/:id", (req, res) => {
  product = products.find(
    (p) => p.category == req.params.category && p._id == req.params.id
  );

  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`);
});
