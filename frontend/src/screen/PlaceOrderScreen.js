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

///    REDUX     ///
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions/cartAction";
import { createOrder } from "../redux/actions/orderAction";
import { CREATE_ORDER_RESET } from "../redux/actionTypes/orderConstants";

///  COMPONENTS   ///
import ErrMess from "../components/Message";
import CheckoutStepper from "../components/CheckoutStepper";
import Meta from "../components/Meta";

///    CUSTOM STYLES     ///
import { useStyles } from "./customStyle/PlaceOrderScreen";

const PlaceOrderScreen = ({ history, API, isMobile }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // User Login Credentials
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  // cart details
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  ///  Items Price   ///
  cart.itemsPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  ///   Shipping Price  ///
  cart.shippingPrice = (cart.itemsPrice > 150 ? 100 : 0).toFixed(2);

  ///  Tax Price  ///
  cart.taxPrice = ((cart.itemsPrice * 25) / 100).toFixed(2);

  ///   TOTAL PRICE  ///
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  ///  REMOVE ORDER FROM CART   ///
  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const placeOrder = useSelector((state) => state.order);
  const { order, success } = placeOrder;

  ///  PLACE ORDER   ///
  const placeOrderHandler = () => {
    dispatch(
      createOrder(API, {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      history.push(`/orders/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [dispatch, history, order, success, userInfo, API]);

  return (
    <>
      {/* /// add custom title in Place Order Screen / */}
      <Meta title="Place Order" />
      <CheckoutStepper step={3} />
      <Grid container spacing={4}>
        {/* ///   LEFT SIDE    /// */}
        <Grid item md={8} xs={12}>
          <Paper className={classes.paper} elevation={6}>
            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography
                  color="primary"
                  variant={isMobile ? "h6" : "h5"}
                  component="h3"
                >
                  <strong>SHIPPING DETAILS</strong>
                </Typography>
              </ListItem>
              <ListItem className={classes.list_item}>
                <Typography color="textPrimary" varient="p" component="h6">
                  {shippingAddress.address},
                  <br />
                  {shippingAddress.city},
                  <br />
                  {shippingAddress.country},
                  <br />
                  {shippingAddress.postalCode}
                </Typography>
              </ListItem>
            </List>

            <Divider variant="fullWidth" className={classes.divider} />

            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography
                  color="primary"
                  variant={isMobile ? "h6" : "h5"}
                  component="h3"
                >
                  <strong>PAYMENT METHOD</strong>
                </Typography>
              </ListItem>
              <ListItem className={classes.list_item}>
                <Typography color="textPrimary" varient="p" component="h6">
                  {paymentMethod}
                </Typography>
              </ListItem>
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

            {!cartItems.length ? (
              <Container maxWidth="md">
                <ErrMess varient="info">
                  Your Cart Is Empty <Link to="/">Keep Shopping</Link>
                </ErrMess>
              </Container>
            ) : (
              <List>
                {cartItems.map((item, index) => (
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
                      <ListItemSecondaryAction
                        style={
                          isMobile
                            ? { marginTop: "2.2rem", marginRight: "-1.8rem" }
                            : {}
                        }
                      >
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
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
                      <strong>Items</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${cart.itemsPrice}
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
                      <strong>Shipping</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${cart.shippingPrice}
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
                      <strong>Tax</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${cart.taxPrice}
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
                      <strong>Total</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={6}>
                    <Typography color="textPrimary" varient="p" component="h6">
                      ${cart.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <Divider variant="fullWidth" component="br" />

              <ListItem>
                <Button
                  className="btn-block p-2"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  PLACE ORDER
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
