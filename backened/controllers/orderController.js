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

  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No order found");
    return;
  } else {
    const order = new OrderModel({
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

//  @purpose: get order by id
//  @access:  Private
//  @route:   GET /order/:id

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

//  @purpose: UPDATE order model to paid
//  @access:  Private
//  @route:   UPDATE /order/:id/payment

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.update_time,
      emailAddress: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});
