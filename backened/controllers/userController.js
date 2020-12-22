import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

import generateToken from "../utils/tokenGeneration.js";

// @purpose:   Auth user and get token
// @route:  POST /user/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user && (await user.checkPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);

    throw new Error("Invalid email or password");
  }
});

// @purpose:   Get User Profile
// @route:  GET /user/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  res.json(user);
});

export { authUser, apiUser, getUserProfile };

// @purpose:   Display all users (only for testing)
// @route:  GET /user
// @access  Public

const apiUser = asyncHandler(async (req, res) => {
  const users = await UserModel.find();

  res.json(users);
});
