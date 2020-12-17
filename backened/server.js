import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import dbConnection from "./config/db.js";

import { NotFound, errorhandler } from "./middleware/errorHandling.js";

import ProductRoutes from "./routes/productRoutes.js";

////////////    Configuring all .env files   /////////////
dotenv.config();
dbConnection();

const app = express();

////////////   base route (for testing)     //////////////
app.get("/", (req, res) => {
  res.send("API works Fine");
});

////////////    Routes      //////////////
app.use("/products", ProductRoutes);

///////////    For error handling   //////////////
app.use(NotFound);
app.use(errorhandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`.magenta
      .bold
  );
});
