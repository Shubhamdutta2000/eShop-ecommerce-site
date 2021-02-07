import { Button } from "@material-ui/core";
import React from "react";
import StripeCheckoutButton from "react-stripe-checkout";

// REDUX
import { useDispatch, useSelector } from "react-redux";

export const StripeCheckout = ({ orderId }) => {
  // Order details
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orders } = orderDetails;

  // User Login Credentials
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  // make payment through stripe by post request data to backend
  const makePayment = (token) => {
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
        console.log(response);
        // call further methods
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <StripeCheckoutButton
        stripeKey="pk_test_51I5RESIXupbB6992wlpKBGWX0sOqC5TAq1LOGvxMJgeGFyaSkaGuSSSZpsTsUgFQXa7biHpODdBn2oeKWrqDb5dU00cXtFqWnc"
        token={makePayment}
        amount={orders.totalPrice * 100}
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
    </>
  );
};
