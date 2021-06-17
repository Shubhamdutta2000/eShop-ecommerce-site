import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/////////////////////////////////////////    MATERIAL UI    ////////////////////////////////
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button } from "@material-ui/core";

///////////////////////////////////////      MATERIAL UI ICONS     ///////////////////////////////
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";

////////////////////////////////////////     REDUX          /////////////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

///////////////////////////////////////     CUSTOM STYLE    /////////////////////////////////////
import { useStyle } from "./customStyle/allFormsScreen";

import CheckoutStepper from "../components/CheckoutStepper";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

const LoginScreen = ({ isMobile, history, location, API }) => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = login;

  //    FOR SHIPPING PAGE REDIRECT OR HOME   //
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // if user logged in redirect to particular query ('register', 'cart', 'shipping')
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();
    //DISPATCH LOGIN
    dispatch(loginUser(API, email, password));
  };

  return (
    <>
      {/* /// add custom title in Login Screen / */}
      <Meta title="eShop Login" />
      {redirect === "shipping" ? <CheckoutStepper step={0} /> : null}

      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={false} md={3}>
          <img
            src="/assets/images/auth/add_to_cart.svg"
            className={isMobile ? classes.display : classes.image}
            alt="Login"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={0}>
          <Paper elevation={14} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
            <Typography className={classes.heading} component="h1" variant="h5">
              Sign in
            </Typography>

            {/*///////////////////////////////    LOADER    /////////////////////////////////////////*/}
            {loading && <Loader />}

            <form className={classes.form}>
              <FormControl variant="outlined" className={classes.input}>
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  placeholder="Email Address"
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon className={classes.icon} />
                    </InputAdornment>
                  }
                  labelWidth={54}
                />
              </FormControl>

              <FormControl variant="outlined" className={classes.input}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  placeholder="Password"
                  required
                  type={passwordVisibility ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon className={classes.icon} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibility)
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {passwordVisibility ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={90}
                />
              </FormControl>

              {/*//////////////////////     VALIDATION ERROR MESSAGE     ////////////////////////*/}
              {error && <Message varient="error">{error}</Message>}

              <Button
                className={classes.button}
                onClick={submitHandler}
                size="large"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Typography component="h5" className={classes.register}>
                    Haven't Registered yet? &nbsp;
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : "/register"
                      }
                      variant="body2"
                    >
                      Register
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={false} sm={false} md={3}>
          <img
            src="/assets/images/auth/payments.svg"
            className={isMobile ? classes.display : classes.image2}
            alt="Login"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
