import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/////////////////////////////////////////    MATERIAL UI    ////////////////////////////////
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
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
import { useStyle } from "./customStyle/LoginScreen";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

const LoginScreen = ({ history, location }) => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, isAuthenticated } = login;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();
    //DISPATCH LOGIN
    dispatch(loginUser(email, password));
  };

  return (
    <>
      <Paper elevation={12} className={classes.paper}>
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
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              placeholder="Email Address"
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon className={classes.lockIcon} />
                </InputAdornment>
              }
              labelWidth={70}
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
                  <LockIcon className={classes.lockIcon} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
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
              labelWidth={70}
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
                <Link to="/register" variant="body2">
                  Register
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default LoginScreen;
