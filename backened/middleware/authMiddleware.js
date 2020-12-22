import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

//////////////////    VERIFY USER LOGGED IN BY CHECKING token is there or not in header     /////////////////
const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded);

      // store UserModel (- password) to req.user
      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(404);

      throw new Error("Not Authorized, token failed");
    }

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized and no token is present");
    }
  }
};

export default authMiddleware;
