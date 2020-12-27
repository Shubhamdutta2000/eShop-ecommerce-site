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
import { registerUser } from "../redux/actions/userAction";

///////////////////////////////////////     CUSTOM STYLE    /////////////////////////////////////
import { useStyle } from "./customStyle/LoginRegisterScreen";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

const RegisterScreen = ({ history, location }) => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    false
  );
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const register = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, isAuthenticated } = register;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    //DISPATCH REGISTER
    if (password == confirmPassword) {
      dispatch(registerUser(name, email, password));
    } else {
      setMessage("Password does not match");
    }
  };

  return (
    <Paper elevation={14} className={classes.paper}>
      <Avatar className={classes.avatar}>
        <PeopleIcon />
      </Avatar>
      <Typography className={classes.heading} component="h1" variant="h5">
        Sign Up
      </Typography>

      {/*///////////////////////////////    LOADER    /////////////////////////////////////////*/}
      {loading && <Loader />}

      <form className={classes.form}>
        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            placeholder="Your Name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <PeopleIcon className={classes.lockIcon} />
              </InputAdornment>
            }
            labelWidth={45}
          />
        </FormControl>

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
            labelWidth={40}
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

        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-confirmPassword">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirmPassword"
            placeholder="Confirm Password"
            required
            type={confirmPasswordVisibility ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon className={classes.lockIcon} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setConfirmPasswordVisibility(!confirmPasswordVisibility)
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {confirmPasswordVisibility ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={135}
          />
        </FormControl>

        {/*//////////////////////     VALIDATION ERROR MESSAGE     ////////////////////////*/}

        {error && <Message varient="error">{error}</Message>}
        {message && <Message varient="error">{message}</Message>}

        <Button
          className={classes.button}
          onClick={submitHandler}
          size="large"
          variant="contained"
          color="primary"
        >
          Register
        </Button>

        <Grid container>
          <Grid item>
            <Typography component="h5" className={classes.register}>
              Already Registered? &nbsp;
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                variant="body2"
              >
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default RegisterScreen;
