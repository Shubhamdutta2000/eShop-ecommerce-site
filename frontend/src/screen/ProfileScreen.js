import React, { useState, useEffect } from "react";

////////////////////////////////    MATERIAL UI   ////////////////////////////////////
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

/////////////////////////////////    REDUX     //////////////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../redux/actions/userAction";
import { listMyOrders } from "../redux/actions/orderAction";

///////////////////////////////////     CUSTOM STYLE    ///////////////////////////////
import {
  useStyles,
  CssTextField,
  StyledTableCell,
  StyledTableRow,
} from "./customStyle/ProfileScreen";

import Message from "../components/ErrMessage";
import Loader from "../components/Loader";

const ProfileScreen = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //////////////////////   LOGIN REDUCER    ///////////////////
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  //////////////////////    USER PROFILE REDUCER    /////////////////
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  ///////////////////   UPDATE USER PROFILE REDUCER    ////////////////
  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = updateProfile;

  ///////////////////   MY ORDERS REDUCER    ////////////////
  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
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
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
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

      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <h2>Profile</h2>
          {loading && <Loader />}
          <form className={classes.root}>
            <CssTextField
              id="outlined-name"
              label="Name"
              value={name}
              multiline
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <CssTextField
              id="outlined-email"
              label="Email"
              value={email}
              multiline
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CssTextField
              type="password"
              autoComplete="current-password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CssTextField
              type="password"
              autoComplete="current-password"
              id="outlined-password"
              type="password"
              required
              label="Confirm Password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/*//////////////////////     VALIDATION ERROR MESSAGE     ////////////////////////*/}

            {error && <Message varient="error">{error}</Message>}
            {message && <Message varient="error">{message}</Message>}

            {success && (
              <Message varient="success">Profile Updated Successfully</Message>
            )}
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
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message varient="danger">{errorOrders}</Message>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">DATE</StyledTableCell>
                    <StyledTableCell align="right">TOTAL</StyledTableCell>
                    <StyledTableCell align="right">PAID</StyledTableCell>
                    <StyledTableCell align="right">DELIVERED</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <StyledTableRow key={order._id}>
                      <StyledTableCell component="th" scope="row">
                        {order._id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.createdAt.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.totalPrice}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.paidAt.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.deliveredAt.substring(0, 10)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileScreen;
