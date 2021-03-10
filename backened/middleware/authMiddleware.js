import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

// verify with access token
const authProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
      console.log(decoded);

      // store UserModel (- password) to req.user
      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        res.status(404);
        const err = new Error("Unauthorised");
        next(err);
      } else {
        // token expired
        res.status(404);
        next(error);
      }
    }
  } else {
    res.status(401);
    const error = new Error("Not Authorized, No token is present");
    next(error);
  }
};

const adminCheck = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    const err = new Error("Not authorised as admin");
    next(err);
  }
};

export { authProtect, adminCheck };
