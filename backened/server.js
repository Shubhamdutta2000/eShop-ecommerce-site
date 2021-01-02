import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import dbConnection from "./config/db.js";

import { NotFound, errorhandler } from "./middleware/errorHandling.js";

import ProductRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRouter.js";
import OrderRoutes from "./routes/OrderRoutes.js";

////////////    Configuring all .env files   /////////////
dotenv.config();
dbConnection();

const app = express();

app.use(express.json());

////////////   base route (for testing)     //////////////
app.get("/", (req, res) => {
  res.send("API works Fine");
});

////////////    Routes      //////////////
app.use("/products", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/orders", OrderRoutes);
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

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
