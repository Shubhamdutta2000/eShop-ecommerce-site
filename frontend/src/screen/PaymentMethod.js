import React, { useState, useEffect } from "react";

/////////////////////////////////////////    MATERIAL UI    ////////////////////////////////
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Avatar, Button } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import CheckoutStepper from "../components/CheckoutStepper";

////////////////////////////////////////     REDUX          /////////////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { addPaymentMethod } from "../redux/actions/cartAction";

///////////////////////////////////////     CUSTOM STYLE    /////////////////////////////////////
import { useStyle } from "./customStyle/allFormsScreen";
import { Link } from "react-router-dom";

const PaymentMethodScreen = ({ history }) => {
  const classes = useStyle();

  ////////////////////     REDUX  REDUCER of Shipping Address   ////////////////////
  const shippingAdd = useSelector((state) => state.cart);
  const { shippingAddress } = shippingAdd;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  // User Login Credentials
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  // Redirect to loginScreen on logout
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    /////////////////////////      DISPATCH PAYMENT METHOD and push to /placeorder   ////////////////
    dispatch(addPaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  /////////////////////    GO BACK      ////////////////////////
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <CheckoutStepper step={2} />
      <Paper elevation={14} className={classes.paper}>
        <div onClick={goBack}>
          <ArrowBackIosIcon className={classes.back} />
        </div>

        <Avatar className={classes.avatar}>
          <AccountBalanceIcon />
        </Avatar>
        <Typography className={classes.heading} component="h1" variant="h5">
          Payment Method
        </Typography>

        <form className={classes.form}>
          <FormControl component="fieldset" className={classes.input}>
            {/* <FormLabel className={classes.selectLabel} component="legend">
              Select Method
            </FormLabel> */}
            <RadioGroup
              aria-label="payment method"
              name="payment method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="PayPal"
                control={<Radio required />}
                label="PayPal"
              />
              <FormControlLabel
                value="Stripe"
                control={<Radio required />}
                label="Stripe"
              />
            </RadioGroup>
          </FormControl>

          <Button
            className={classes.button}
            onClick={submitHandler}
            size="large"
            variant="contained"
            color="primary"
          >
            CONTINUE
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default PaymentMethodScreen;
