import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

///////////////////////////     MATERIAL UI   ////////////////////////////////

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ErrMess from "../components/ErrMessage";
import Loader from "../components/Loader";

///////////////////////////    REDUX     ///////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../redux/actions/orderAction";
import { ORDER_PAY_RESET } from "../redux/actionTypes/orderConstants";

import axios from "axios";

import { Container } from "@material-ui/core";

/////////////////////////////   STRIPE       ////////////////////////////////////
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51I5RESIXupbB6992cECX1BzSr2LVrsGHxTLTdc6UVFNgFO0lIhYjL7ioWNAGC0GVmXPzOvD0UCORT1Rkh5UX0KQW00LMpqyNlP"
);

///////////////////////////    CUSTOM STYLES     ///////////////////////////////
import { useStyles } from "./customStyle/PlaceOrderScreen";

const OrderScreen = ({ match }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [paymentResult, setPaymentResult] = useState({});

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, orders, error } = orderDetails;

  console.log(loading);

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;

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

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrMess varient="danger">{error}</ErrMess>
  ) : (
    <>
      <br />
      <Typography variant="h4" component="h2" color="textSecondary">
        ORDER {orders._id}
      </Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        {/*/////////////////////   LEFT SIDE    ///////////////////////////////////*/}
        <Grid item md={8} xs={12}>
          <Paper className={classes.paper} elevation={6}>
            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography color="primary" variant="h5" component="h3">
                  <strong>SHIPPING DETAILS</strong>
                </Typography>
              </ListItem>
              <Divider variant="fullWidth" className={classes.divider} />

              <ListItem className={classes.list_item}>
                <Typography color="textPrimary" varient="p" component="h6">
                  <strong className={classes.shipping}>Name: </strong>
                  {orders.user.name}
                  <br />
                  <br />
                  <strong className={classes.shipping}>Email: </strong>
                  <a
                    className={classes.email}
                    href={orders.user.email}
                    target="_blank"
                  >
                    {orders.user.email}
                  </a>
                  <br />
                  <br />
                  <strong>Address: </strong>
                  <span className="ml-4">{orders.shippingAddress.address}</span>
                  <br />
                  <span className="ml-5 pl-5">
                    {orders.shippingAddress.city}
                  </span>

                  <br />
                  <span className="ml-5 pl-5">
                    {orders.shippingAddress.country},
                  </span>

                  <br />
                  <span className="ml-5 pl-5">
                    {orders.shippingAddress.postalCode}
                  </span>
                </Typography>
              </ListItem>
              <div className={classes.message}>
                {orders.isDelivered ? (
                  <ErrMess varient="success">
                    Delivered at {orders.deliveredAt}
                  </ErrMess>
                ) : (
                  <ErrMess varient="error">Not Delivered</ErrMess>
                )}
              </div>
            </List>

            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography color="primary" variant="h5" component="h3">
                  <strong>PAYMENT METHOD</strong>
                </Typography>
              </ListItem>
              <Divider variant="fullWidth" className={classes.divider} />

              <ListItem className={classes.list_item}>
                <Typography color="textPrimary" varient="p" component="h6">
                  {orders.paymentMethod}
                </Typography>
              </ListItem>
              <div className={classes.message}>
                {orders.isPaid ? (
                  <ErrMess varient="success">Paid on {orders.paidAt}</ErrMess>
                ) : (
                  <ErrMess varient="error">Not Paid</ErrMess>
                )}
              </div>
            </List>
          </Paper>

          <Paper className={classes.paper} elevation={6}>
            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography color="primary" variant="h5" component="h3">
                  <strong>ORDER DETAILS</strong>
                </Typography>
              </ListItem>
            </List>

            {!orders.orderItems.length ? (
              <Container maxWidth="md">
                <ErrMess varient="info">
                  No order <Link to="/">Keep Shopping</Link>
                </ErrMess>
              </Container>
            ) : (
              <List>
                {orders.orderItems.map((item, index) => (
                  <div key={index}>
                    <ListItem
                      className={classes.list_item}
                      alignItems="flex-start"
                    >
                      <ListItemAvatar>
                        <Avatar
                          className={classes.avatar}
                          alt={item.name}
                          variant="square"
                          src={item.image}
                        />
                      </ListItemAvatar>
                      <Link
                        className={classes.order_link}
                        to={`/products/${item.category}/${item.product}`}
                      >
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <Typography
                              color="primary"
                              variant="body2"
                              component="span"
                            >
                              {item.qty} x {item.price} ={" "}
                              {(item.qty * item.price).toFixed(2)}
                            </Typography>
                          }
                        />
                      </Link>
                      <ListItemSecondaryAction className={classes.qty}>
                        Qty: {item.qty}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      className={classes.divider}
                      component="li"
                    />
                  </div>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/*/////////////////////   RIGHT SIDE    ///////////////////////////////////*/}
        <Grid item md={4} xs={12}>
          <Paper elevation={6}>
            <List>
              <ListItem>
                <Typography
                  className={classes.order_summary}
                  color="primary"
                  variant="h4"
                  component="h3"
                >
                  <strong>ORDER SUMMARY</strong>
                </Typography>
              </ListItem>

              <Divider variant="inset" component="br" />

              <ListItem>
                <Grid container>
                  <Grid item lg={6} xs={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Items Price</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${orders.itemsPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <Divider
                variant="fullWidth"
                className={classes.divider}
                component="li"
              />

              <ListItem>
                <Grid container>
                  <Grid item lg={6} xs={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Delivery Charge</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${orders.shippingPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <Divider
                variant="fullWidth"
                className={classes.divider}
                component="li"
              />

              <ListItem>
                <Grid container>
                  <Grid item lg={6} xs={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Tax Price</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${orders.taxPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <Divider
                variant="fullWidth"
                className={classes.divider}
                component="li"
              />

              <ListItem>
                <Grid container>
                  <Grid item lg={6} xs={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Total Price</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${orders.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <Divider variant="fullWidth" component="br" />

              {/*////////////////////    STRIPE BUTTON    ///////////////////////// */}

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
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
