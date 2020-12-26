import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userAction";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.4),
      width: "90%",
    },
  },
  button: {
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const ProfileScreen = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      //DISPATCH UPDATE
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            PROFILE
          </li>
        </ol>
      </nav>

      {/*//////////////////////////////////////     GRID       ////////////////////////////////////// */}

      <Grid container spacing={4}>
        <Grid item sm={4} xs={12}>
          <h2>Profile</h2>
          {loading && <Loader />}
          <form className={classes.root} autoComplete="off">
            <TextField
              id="outlined-name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />

            <TextField
              id="outlined-email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              id="outlined-password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              id="outlined-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />

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
              Update
            </Button>
          </form>
        </Grid>
        <Grid item sm={8} xs={12}>
          <h2>My Orders</h2>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileScreen;
