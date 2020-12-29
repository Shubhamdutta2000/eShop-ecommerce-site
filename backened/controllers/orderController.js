import OrderModel from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//  @purpose: create new orders
//  @access:  Private
//  @route:   POST /order

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (!orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No order found");
    return;
  } else {
    const order = new OrderMpdel({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
