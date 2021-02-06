import { Button } from "@material-ui/core";
import React from "react";
import StripeCheckoutButton from "react-stripe-checkout";

export const StripeCheckout = () => {
  const makePayment = (token) => {};
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
