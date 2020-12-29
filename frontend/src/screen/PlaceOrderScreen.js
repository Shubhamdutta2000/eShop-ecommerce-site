import React from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
///////////////////////////     MATERIAL UI   ////////////////////////////////

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import ErrMess from "../components/ErrMessage";

///////////////////////////    REDUX     ///////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions/cartAction";

import CheckoutStepper from "../components/CheckoutStepper";
import { Button } from "react-bootstrap";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },

    divider: {
      marginBottom: "0.5rem",
      marginTop: "0.3rem",
    },
    avatar: {
      width: "5rem",
      height: "5rem",
      marginRight: "1.4rem",
    },
    paper: {
      marginBottom: "1.8rem",
      padding: "0.4rem 1rem 1rem 0",
    },
    list_item: {
      marginLeft: "2.4rem",
    },

    order_link: {
      "a:hover": {
        textDecoration: "none",
      },
    },
  })
);

const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  /////////////////////  Items Price   ////////////////////
  cart.itemsPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  ////////////////////   Shipping Price  /////////////////////////////
  cart.shippingPrice = (cart.itemsPrice > 150 ? 100 : 0).toFixed(2);

  //////////////////////  Tax Price  /////////////////////////////
  cart.taxPrice = ((cart.itemsPrice * 25) / 100).toFixed(2);

  /////////////////////   TOTAL PRICE  /////////////////////////////
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  /////////////////  REMOVE ORDER FROM CART   //////////////
  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  //////////////////  PLACE ORDER   //////////////////////
  const placeOrderHandler = () => {
    console.log("order");
  };

  return (
    <>
      <CheckoutStepper step={3} />

      <Grid container spacing={4}>
        {/*/////////////////////   LEFT SIDE    ///////////////////////////////////*/}
        <Grid item lg={8}>
          <Paper className={classes.paper} elevation={6}>
            <List className={classes.list}>
              <ListItem className={classes.list_item}>
                <Typography color="primary" variant="h5" component="h3">
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
                <Typography color="primary" variant="h5" component="h3">
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
                              variant="body2"
                              component="span"
                            >
                              {item.qty} x {item.price} ={" "}
                              {(item.qty * item.price).toFixed(2)}
                            </Typography>
                          }
                        />
                      </Link>
                      <ListItemSecondaryAction>
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

        {/*/////////////////////   RIGHT SIDE    ///////////////////////////////////*/}
        <Grid item lg={4} sm={12}>
          <Paper elevation={6}>
            <List>
              <ListItem className={classes.list_item}>
                <Typography color="primary" variant="h4" component="h3">
                  <strong>ORDER SUMMARY</strong>
                </Typography>
              </ListItem>

              <Divider variant="inset" component="br" />

              <ListItem>
                <Grid container>
                  <Grid item lg={6} sm={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Items</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} sm={6}>
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
                  <Grid item lg={6} sm={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Shipping</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} sm={6}>
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
                  <Grid item lg={6} sm={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Tax</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} sm={6}>
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
                  <Grid item lg={6} sm={6}>
                    <Typography color="primary" varient="h6" component="h6">
                      <strong>Total</strong>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} sm={6}>
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
                  disabled={cartItems.length == 0}
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
