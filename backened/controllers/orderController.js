import OrderModel from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//  @purpose: create new orders
//  @access:  Private
//  @route:   POST /orders
export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  try {
    if (orderItems && orderItems.length == 0) {
      res.status(400);
      const err = new Error("No order found");
      next(err);
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
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: get order by id
//  @access:  Private
//  @route:   GET /orders/:id
export const getOrderById = asyncHandler(async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      const err = new Error("Order not Found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: UPDATE order model to paid with payapl
//  @access:  Private
//  @route:   UPDATE /orders/:id/payment
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      // paymentResult according to type of payment method
      order.paymentResult =
        order.paymentMethod === "PayPal"
          ? {
              id: req.body.id,
              status: req.body.status,
              updateTime: req.body.update_time,
              emailAddress: req.body.payer.email_address,
            }
          : order.paymentMethod === "Stripe"
          ? {
              id: req.body.charge.id,
              status: req.body.charge.status,
              receipt_email: req.body.charge.receipt_email,
              receipt_url: req.body.charge.receipt_url,
            }
          : null;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      const err = new Error("Order not Found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: GET logged in user orders
//  @access:  Private
//  @route:   GET /orders/myorders
export const getMyOrders = asyncHandler(async (req, res, next) => {
  try {
    const order = await OrderModel.find({ user: req.user._id });
    res.json(order);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: GET all orders
//  @access:  Private/Admin
//  @route:   GET /orders
export const getAllOrders = asyncHandler(async (req, res, next) => {
  try {
    const order = await OrderModel.find({}).populate("user", "_id, name");
    res.json(order);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

//  @purpose: UPDATE order model to delivered
//  @access:  Private/Admin
//  @route:   UPDATE /orders/:id/deliver
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.status(201);
      res.json(updatedOrder);
    } else {
      res.status(404);
      const err = new Error("Order not Found");
      next(err);
    }
  } catch (error) {
    res.status(404);
    next(error);
  }
});
