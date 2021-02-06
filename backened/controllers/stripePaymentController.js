import stripe from "stripe";
import OrderModel from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//  @purpose: UPDATE order model to paid with stripe
//  @access:  Private
//  @route:   POST /order/stripePayment

export const makePaymentWithStripe = asyncHandler(async (req, res) => {});
