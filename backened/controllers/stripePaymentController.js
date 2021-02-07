import OrderModel from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

import stripe from "stripe";
import { v4 } from "uuid";

const newStripe = new stripe("SECRET_KEY");

//  @purpose: UPDATE order model to paid with stripe
//  @access:  Private
//  @route:   POST /order/stripePayment
export const makePaymentWithStripe = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    // generate unique id for not charging the user again
    const idempotencyKey = uuid();

    const orders = await OrderModel.find();

    const customer = await newStripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await newStripe.charges.create(
      {
        amount: orders.totalPrice,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
        },
      },
      { idempotencyKey }
    );
    res
      .status(200)
      .json({ message: "Success", charge: charge, customer: customer });
  } catch (error) {
    res.status(404).json(error);
  }
});
