import dotenv from "dotenv";
import path from "path";
///    Configuring all .env files   ///
dotenv.config();
import colors from "colors";
import express from "express";
// import morgan from "morgan";
import dbConnection from "./backened/config/db.js";
import cors from "cors";

import { NotFound, errorhandler } from "./backened/middleware/errorHandling.js";

import HomeRouter from "./backened/routes/homeRouter.js";
import ProductRoutes from "./backened/routes/productRoutes.js";
import UserRoutes from "./backened/routes/userRouter.js";
import OrderRoutes from "./backened/routes/OrderRoutes.js";
import stripePaymentRoute from "./backened/routes/stripePaymentRoute.js";
import UploadRoute from "./backened/routes/uploadRoutes.js";

dbConnection();

const app = express();

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(cors());

app.use(express.json());

///    Routes      ///
app.use("/", HomeRouter);
app.use("/products", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/orders", OrderRoutes);
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use("/payment/stripe", stripePaymentRoute);
app.use("/upload", UploadRoute);

// file upload
const __dirname = path.resolve();
app.use("/myuploads", express.static(path.join(__dirname, "/myuploads")));

///    For error handling   ///
app.use(NotFound);
app.use(errorhandler);

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`.magenta
      .bold
  );
});
