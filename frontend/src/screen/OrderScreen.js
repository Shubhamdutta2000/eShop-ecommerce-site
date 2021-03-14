import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

///     MATERIAL UI   ///
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
import Container from "@material-ui/core/Container";

///    Components   ///
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { StripeCheckout } from "../components/StripeCheckout";
import { PayPalCheckout } from "../components/PayPalCheckout";

///    REDUX     ///
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, deliverOrder } from "../redux/actions/orderAction";
import { ORDER_DELIVER_RESET } from "../redux/actionTypes/orderConstants";

///    CUSTOM STYLES     ///
import { useStyles } from "./customStyle/PlaceOrderScreen";
import "../styles/Screen/OrderScreen.css";
import OrderScreenSkeleton from "./skeletons/OrderScreenSkeleton";

const OrderScreen = ({ match, history, API, isMobile }) => {
  const classes = useStyles();
  const orderId = match.params.id;

  const dispatch = useDispatch();

  // User Login Credentials reducer
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  // Order details reducer
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, orders, error } = orderDetails;

  // PAYMENT INTEGRATION (update order to paid) reducer
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  // Update order to deliver reducer
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(API, orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, userInfo, history, API]);

  const handleDeliver = () => {
    dispatch(deliverOrder(API, orderId));
  };

  return loading ? (
    <OrderScreenSkeleton />
  ) : error ? (
    <Message varient="danger">{error}</Message>
  ) : (
    <>
      {/* /// add custom title in Order Screen / */}
      <Meta title="Order Screen" />
      <br />
      <Typography
        variant={isMobile ? "h6" : "h4"}
        component="h4"
        color="textSecondary"
      >
        <span
          style={isMobile ? { display: "flex", justifyContent: "center" } : {}}
        >
          ORDER
        </span>{" "}
        {orders._id}
      </Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        {/* ///   LEFT SIDE    // */}
        <Grid item md={8} xs={12}>
          <Paper className={classes.paper} elevation={6}>
            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography
                  color="primary"
                  variant={isMobile ? "h6" : "h4"}
                  component="h3"
                >
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
                  <Message varient="success">
                    Delivered at {orders.deliveredAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message varient="error">Not Delivered</Message>
                )}
              </div>
            </List>

            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography
                  color="primary"
                  variant={isMobile ? "h6" : "h4"}
                  component="h3"
                >
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
                  <Message varient="success">
                    Paid on {orders.paidAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message varient="error">Not Paid</Message>
                )}
              </div>
            </List>
          </Paper>

          <Paper className={classes.paper} elevation={6}>
            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography
                  color="primary"
                  variant={isMobile ? "h5" : "h4"}
                  component="h3"
                >
                  <strong>ORDER DETAILS</strong>
                </Typography>
              </ListItem>
            </List>

            {!orders.orderItems.length ? (
              <Container maxWidth="md">
                <Message varient="info">
                  No order <Link to="/"> Keep Shopping</Link>
                </Message>
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
                              variant={isMobile ? "span" : "body2"}
                              component="span"
                            >
                              {item.qty} x {item.price} ={" "}
                              {(item.qty * item.price).toFixed(2)}
                            </Typography>
                          }
                        />
                      </Link>
                      {!isMobile ? (
                        <ListItemSecondaryAction className={classes.qty}>
                          Qty: {item.qty}
                        </ListItemSecondaryAction>
                      ) : null}
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

        {/* ///   RIGHT SIDE    /// */}
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
              {!orders.isPaid ? (
                <ListItem>
                  <Grid item xs={12}>
                    {orders.paymentMethod === "PayPal" ? (
                      <PayPalCheckout orderId={orderId} API={API} />
                    ) : orders.paymentMethod === "Stripe" ? (
                      <StripeCheckout orderId={orderId} API={API} />
                    ) : null}
                  </Grid>
                </ListItem>
              ) : (
                userInfo &&
                !userInfo.isAdmin && (
                  <Message>Payment Done Successfully</Message>
                )
              )}
              <ListItem>
                {/*/// Marked As Delivered BUTTON showed if order is not delivered and if admin user  ///*/}
                {userInfo &&
                  userInfo.isAdmin &&
                  orders.isPaid &&
                  !orders.isDelivered && (
                    <>
                      <Button
                        className="btn-block p-2 order_deliver_button"
                        onClick={handleDeliver}
                      >
                        MARKED AS DELIVERED
                      </Button>
                      {loadingDeliver && <Loader />}
                    </>
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
