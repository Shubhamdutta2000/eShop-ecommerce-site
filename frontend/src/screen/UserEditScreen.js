import React, { useEffect, useState } from "react";

///    MATERIAL UI    ///
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

///      MATERIAL UI ICONS     ///
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";

///     REDUX     ///
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userAction";

///     CUSTOM STYLE    ///
import { useStyle } from "./customStyle/allFormsScreen";

import Message from "../components/Message";
import Loader from "../components/Loader";

const UserEditScreen = ({ history, match, API }) => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const userId = match.params.id;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails(API, userId));
    }
  }, [dispatch, API, userId, userInfo, history]);

  useEffect(() => {
    if (userInfo && user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [userInfo, user]);

  const submitHandler = (event) => {
    //     event.preventDefault();
    //     // DISPATCH REGISTER
    //     if (password === confirmPassword) {
    //       dispatch(getUser(API, name, email, password));
    //     } else {
    //       setMessage("Password does not match");
    //     }
  };

  return (
    <Paper elevation={14} className={classes.paper}>
      <Avatar className={classes.avatar}>
        <PeopleIcon />
      </Avatar>
      <Typography className={classes.heading} component="h1" variant="h5">
        Edit User
      </Typography>

      {/* ///    LOADER    /// */}
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
                <PeopleIcon className={classes.icon} />
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
                <EmailIcon className={classes.icon} />
              </InputAdornment>
            }
            labelWidth={40}
          />
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              name="Is Admin"
              color="primary"
            />
          }
          label="Is Admin"
        />

        {/* ///     VALIDATION ERROR MESSAGE     /// */}

        {error && <Message varient="error">{error}</Message>}
        {message && <Message varient="error">{message}</Message>}

        <Button
          className={classes.button}
          onClick={submitHandler}
          size="large"
          variant="contained"
          color="primary"
        >
          UPDATE
        </Button>
      </form>
    </Paper>
  );
};

export default UserEditScreen;
