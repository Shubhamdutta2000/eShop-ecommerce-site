import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StripeCheckoutButton from "react-stripe-checkout";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/actions/orderAction";
import { ORDER_PAY_RESET } from "../redux/actionTypes/orderConstants";
import Loader from "./Loader";

export const StripeCheckout = ({ orderId }) => {
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

  const [paid, setPaid] = useState(null);

  // if paid successfully reset
  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
    }
  }, [dispatch, successPay]);

  // make payment through stripe by post request data to backend
  const makePayment = (token) => {
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    };
    return fetch("http://localhost:5000/payment/stripe", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ token, orderId }),
    })
      .then((response) => {
        console.log(response.json());
        // update order to paid
        dispatch(payOrder(orderId, paid));
        alert(
          "Transaction completed by " + orders.user.name + " through stripe"
        );
      })
      .catch((err) => console.log(err));
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
            color="primary"
          >
            Pay With Stripe
          </Button>
        </StripeCheckoutButton>
      )}
    </>
  );
};
