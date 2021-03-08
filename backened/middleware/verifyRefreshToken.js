import { response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

// verify with refresh token
const verifyRefreshToken = (refresh_token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_KEY,
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token.id);
      }
    );
  });
};

export default verifyRefreshToken;
