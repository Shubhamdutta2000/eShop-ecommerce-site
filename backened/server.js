import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import dbConnection from "./config/db.js";

import ProductRoutes from "./routes/productRoutes.js";

////////////    Configuring all .env files   /////////////
dotenv.config();
dbConnection();

const app = express();

app.get("/", (req, res) => {
  res.send("API works Fine");
});

app.use("/products", ProductRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`.magenta
      .bold
  );
});
