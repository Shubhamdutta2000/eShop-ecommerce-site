import UserModel from "../models/userModel.js";
import resetPasswordModel from "../models/resetPasswordModel.js";
import asyncHandler from "express-async-handler";
import resetPassword_mailer from "../mailers/resetPassword_mailer.js";
import { v4 as uuidv4 } from "uuid";

import { generateAccessToken } from "../utils/tokenGeneration.js";

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
        token: generateAccessToken(user._id),
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
        token: generateAccessToken(user._id),
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

// @purpose:  To Check if jwt expires or not
// @route:  GET /user/auth
// @access  Private
const checkAuth = (req, res) => {
  res.json({ message: "Authenticated" });
};

///   FOR ADMIN USERS   ///

// @purpose:   Display all users
// @route:  GET /users
// @access  Private only admin
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @purpose:   Display user by id
// @route:  GET /user/:id
// @access  Private only admin
const getUserById = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
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

// @purpose:   DELETE user by id
// @route:  GET /user/:id
// @access  Private only admin
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json(user);
    } else {
      res.status(404);
      const err = new Error("User not found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(err);
  }
});

// @purpose:   DELETE user by id
// @route:  GET /user/:id
// @access  Private only admin
const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
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

///   FORGET PASSWORD   ///

// @purpose:   email verification for reset password
// @route:  POST /email-verify
// @access Public
const emailVerification = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    const accessToken = uuidv4();
    const resetPassword = new resetPasswordModel({
      user: user._id,
      accessToken: accessToken,
      isValid: true,
    });

    await resetPassword.save();

    const resetPasswordReq = await resetPasswordModel
      .findOne({ user: user._id })
      .populate("user");
    console.log(resetPasswordReq);
    // Sending Mail
    resetPassword_mailer(resetPasswordReq);

    res.json({ accessToken: resetPassword.accessToken });
  } catch (error) {
    res.status(404);
    next(error);
  }
});

// @purpose:   reset password
// @route:  POST /reset-password/:accessToken
// @access Private
const passwordReset = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  try {
    const resetPasswordToken = await resetPasswordModel.findOne({
      accessToken: req.params.accessToken,
    });

    if (resetPasswordToken.isValid) {
      const user = await (
        await UserModel.findOne({ _id: resetPasswordToken.user })
      ).populate("User");
      if (user) {
        user.password = password;
        user.save();
        res.status(200);
        res.json({
          message: `${user.name} Password Reset successfully`,
        });

        // delete reset password token
        await resetPasswordToken.deleteOne({ user: user._id });
      } else {
        res.status(404);
        const err = new Error("User not Found");
        next(err);
      }
    } else {
      res.json({
        message: `Token expired`,
      });
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  checkAuth,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  emailVerification,
  passwordReset,
};
