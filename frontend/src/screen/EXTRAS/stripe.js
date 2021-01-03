/////////////////////////////   STRIPE       ////////////////////////////////////
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51I5RESIXupbB6992cECX1BzSr2LVrsGHxTLTdc6UVFNgFO0lIhYjL7ioWNAGC0GVmXPzOvD0UCORT1Rkh5UX0KQW00LMpqyNlP"
);

useEffect(() => {
  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);

  if (query.get("success")) {
    setMessage("Order placed! -- Thanks for shopping");
    dispatch(payOrder(orderId));
  }

  if (query.get("canceled")) {
    setMessage(
      "Order canceled -- continue to shop around and checkout when you're ready."
    );
  }

  dispatch(getOrderDetails(orderId));
}, [dispatch]);

////////////////////////    STRIPE PAY NOW   /////////////////////////////
const stripeCheckoutHandler = async (event) => {
  const stripe = await stripePromise;

  const { data } = await axios.post("/create-checkout-session", {
    totalPrice: orders.totalPrice.toFixed(),
    user: orders.user._id,
    name: orders.user.name,
    email: orders.user.email,
    line1: orders.shippingAddress.address.substring(0, 9),
    line2: orders.shippingAddress.address.substring(10, 18),
    city: orders.shippingAddress.city,
    country: orders.shippingAddress.country,
    postal_code: orders.shippingAddress.postalCode,
    orderId: orders._id,
  });

  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({
    sessionId: data.id,
  });

  setPaymentResult(result);

  if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
};

console.log(paymentResult);

{
  /*////////////////////    STRIPE BUTTON    ///////////////////////// */
}

<ListItem>
  {message.substring(6, 14) == "canceled" ? (
    <ErrMess varient="error">{message}</ErrMess>
  ) : message ? (
    <ErrMess varient="success">{message}</ErrMess>
  ) : (
    <Button
      variant="contained"
      className={classes.button}
      color="primary"
      id="checkout-button"
      role="link"
      onClick={stripeCheckoutHandler}
    >
      Pay Now
    </Button>
  )}
</ListItem>;
