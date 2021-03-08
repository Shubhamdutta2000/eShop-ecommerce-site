import OrderModel from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

//  @purpose: POST customer and charges with stripe
//  @access:  Private
//  @route:   POST /order/stripePayment
export const makePaymentWithStripe = asyncHandler(async (req, res) => {
  const { token, orderId } = req.body;
  const newStripe = new stripe(process.env.STRIPE_SECRET_KEY);

  console.log(process.env.STRIPE_SECRET_KEY);

  console.log(token);
  try {
    // generate unique id for not charging the user again
    const idempotencyKey = uuidv4();

    const order = await OrderModel.findById(orderId);

    const customer = await newStripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await newStripe.charges.create(
      {
        amount: parseInt(order.totalPrice) * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Payment with Stripe",
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotencyKey }
    );
    res
      .status(200)
      .json({ message: "Success", charge: charge, customer: customer });
  } catch (error) {
    res.status(404);
    next(error);
  }
});
