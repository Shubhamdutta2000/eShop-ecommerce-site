import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

import generateAccessToken from "../utils/tokenGeneration.js";

import bcrypt from "bcrypt";
// @purpose:   Register new user and get access_token and refresh token
// @route:  POST /user/register
// @access  Public

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      res.status(400);
      const err = new Error("User already exists");
      next(err);
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
        isAdmin: user.isAdmin,
        access_token: generateAccessToken(user._id),
      });
    } else {
      res.status(404);
      const err = new Error("Invaid User data");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @purpose:   Auth user and get access_token and refresh token
// @route:  POST /user/login
// @access  Public

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user && (await user.checkPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        access_token: generateAccessToken(user._id),
      });
    } else {
      res.status(401);
      const err = new Error("Invalid email or password");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @purpose:   Get User Profile
// @route:  GET /user/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @purpose:   UPDATE User Profile
// @route:  UPDATE /user/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        access_token: generateAccessToken(updatedUser._id),
      });
    } else {
      res.status(404);
      const err = new Error("User not found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @purpose:   Display all users (only for testing)
// @route:  GET /user
// @access  Public

const apiUser = asyncHandler(async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

export { authUser, apiUser, getUserProfile, registerUser, updateUserProfile };
