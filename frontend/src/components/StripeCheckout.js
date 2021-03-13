import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import StripeCheckoutButton from "react-stripe-checkout";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/actions/orderAction";
import { emptyCart } from "../redux/actions/cartAction";
import { ORDER_PAY_RESET } from "../redux/actionTypes/orderConstants";

import Loader from "./Loader";
import axios from "axios";

// custom style for stripe checkout button
const useStyle = makeStyles(() => ({
  stripeButton: {
    background: "linear-gradient(45deg, #007fe4 30%, #00c3f1 90%)",
    color: "#fff",
  },
}));

export const StripeCheckout = ({ orderId, API }) => {
  const classes = useStyle();

  const dispatch = useDispatch();

  // Order details
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orders } = orderDetails;

  // User Login Credentials
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  // Updated Order after paid
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // if paid successfully reset
  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      // empty cart items
      dispatch(emptyCart());
    }
  }, [dispatch, successPay]);

  // make payment through stripe by post request data to backend
  const makePayment = async (token) => {
    console.log(token);
    try {
      const { data } = await axios.post(
        `${API}/payment/stripe`,
        { token, orderId },
        {
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(data);
      if (data) {
        dispatch(payOrder(API, orderId, data));
        alert(
          "Transaction completed by " + orders.user.name + " through stripe"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingPay ? (
        <Loader />
      ) : (
        <StripeCheckoutButton
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          token={makePayment}
          amount={orders.totalPrice * 100}
          currency="USD"
          name="Pay with Stripe"
          shippingAddress
          billingAddress
        >
          <Button
            style={{ width: "100%" }}
            variant="contained"
            size="large"
            className={classes.stripeButton}
          >
            Pay With Stripe
          </Button>
        </StripeCheckoutButton>
      )}
    </>
  );
};
