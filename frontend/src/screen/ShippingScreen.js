import React, { useEffect, useState } from "react";

///    MATERIAL UI    ///
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button } from "@material-ui/core";

///      MATERIAL UI ICONS     ///
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import FiberPinIcon from "@material-ui/icons/FiberPin";
import LanguageIcon from "@material-ui/icons/Language";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

///     REDUX       ///
import { useSelector, useDispatch } from "react-redux";
import { addShippingAddress } from "../redux/actions/cartAction";

///   COMPONENT   ///
import CheckoutStepper from "../components/CheckoutStepper";
import Meta from "../components/Meta";

///     CUSTOM STYLE    ///
import { useStyle } from "./customStyle/allFormsScreen";

const ShippingScreen = ({ history }) => {
  const classes = useStyle();

  ///     REDUX  REDUCER   ///
  const shippingAdd = useSelector((state) => state.cart);
  const { shippingAddress } = shippingAdd;

  ///    SHIPPING ADDRESS STATE (DEFAULT: FROM LOCAL STORAGE)    ///
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

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
    //DISPATCH SHIPPING ADDRESS
    dispatch(addShippingAddress({ address, city, postalCode, country }));
    history.push("/paymentMethod");
  };

  ///    GO BACK      ///
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {/* /// add custom title in Shipping Screen / */}
      <Meta title="Shipping Address" />
      <CheckoutStepper step={1} />
      <Paper elevation={14} className={classes.paper}>
        <div onClick={goBack}>
          <ArrowBackIosIcon className={classes.back} />
        </div>
        <Avatar className={classes.avatar}>
          <LocalShippingIcon />
        </Avatar>
        <Typography className={classes.heading} component="h1" variant="h5">
          Shipping Address
        </Typography>

        <form className={classes.form}>
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-address">
              Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              placeholder="Your Address"
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LocationOnIcon className={classes.icon} />
                </InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>

          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-city">City</InputLabel>
            <OutlinedInput
              id="outlined-adornment-city"
              placeholder="Your City"
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LocationCityIcon className={classes.icon} />
                </InputAdornment>
              }
              labelWidth={30}
            />
          </FormControl>

          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-postalCode">
              Postal Code
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-postalCode"
              placeholder="Postal Code"
              required
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FiberPinIcon className={classes.icon} />
                </InputAdornment>
              }
              labelWidth={90}
            />
          </FormControl>

          <FormControl variant="outlined" className={classes.input}>
            <InputLabel htmlFor="outlined-adornment-confirmPassword">
              Country
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-country"
              placeholder="Your Country"
              required
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LanguageIcon className={classes.icon} />
                </InputAdornment>
              }
              labelWidth={58}
            />
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

export default ShippingScreen;
