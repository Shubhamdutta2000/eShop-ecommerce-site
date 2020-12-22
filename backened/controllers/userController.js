import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

import generateToken from "../utils/tokenGeneration.js";

import bcrypt from "bcrypt";
// @purpose:   Register new user and get token
// @route:  POST /user/register
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);

    throw new Error("Invaid User data");
  }
});

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

// @purpose:   Display all users (only for testing)
// @route:  GET /user
// @access  Public

const apiUser = asyncHandler(async (req, res) => {
  const users = await UserModel.find();

  res.json(users);
});

export { authUser, apiUser, getUserProfile, registerUser };
