import { Button } from "@material-ui/core";
import React from "react";
import StripeCheckoutButton from "react-stripe-checkout";
import axios from "axios";

// REDUX
import { useSelector } from "react-redux";

export const StripeCheckout = () => {
  // User Login Credentials
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  // make payment through stripe by post request data to backend
  const makePayment = async (token) => {
    try {
      const { data } = await axios.post("/payment/stripe", token, {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StripeCheckoutButton
        stripeKey=""
        token={makePayment}
        amount={50 * 100}
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
