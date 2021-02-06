import React, { useEffect } from "react";
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
import { Container } from "@material-ui/core";

//////////////////////////////    / Components   ////////////////////////
import ErrMess from "../components/ErrMessage";
import Loader from "../components/Loader";
import { StripeCheckout } from "../components/StripeCheckout";
import { PayPalCheckout } from "../components/PayPalCheckout";

///////////////////////////    REDUX     ///////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderAction";

///////////////////////////    CUSTOM STYLES     ///////////////////////////////
import { useStyles } from "./customStyle/PlaceOrderScreen";

const OrderScreen = ({ match }) => {
  const classes = useStyles();

  const orderId = match.params.id;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, orders, error } = orderDetails;

  // PAYPAL PAYMENT INTEGRATION
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successPay]);

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
                    rel="noreferrer"
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

              {/*/// PAYPAL BUTTON or STRIPE BUTTON showed if order is not paid  ///*/}
              {!orders.isPaid && (
                <ListItem>
                  <Grid item lg={12}>
                    {orders.paymentMethod === "PayPal" ? (
                      <PayPalCheckout orderId={orderId} />
                    ) : orders.paymentMethod === "Stripe" ? (
                      <StripeCheckout />
                    ) : null}
                  </Grid>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
