import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

///    MATERIAL UI   ///
import Grid from "@material-ui/core/Grid";
import MaterialButton from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DoneIcon from "@material-ui/icons/Done";
import TablePagination from "@material-ui/core/TablePagination";

///    REDUX     ///
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
  userLogout,
} from "../redux/actions/userAction";
import { listMyOrders } from "../redux/actions/orderAction";

///     CUSTOM STYLE    ///
import {
  useStyles,
  CssTextField,
  StyledTableCell,
  StyledTableRow,
} from "./customStyle/ProfileScreen";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

const ProfileScreen = ({ history, API }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();

  ///   LOGIN REDUCER    ///
  const login = useSelector((state) => state.userLogin);
  const { userInfo } = login;

  ///    USER PROFILE REDUCER    ///
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  ///   UPDATE USER PROFILE REDUCER    ///
  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = updateProfile;

  ///   MY ORDERS REDUCER    ///
  const myOrdersList = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrdersList;

  // redirect to login page if not logged in and set name & email field in form
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    // logout if jwt expire
    else if (error === "jwt expired") {
      alert("Logged Out!! Again log in to view profile");
      dispatch(userLogout());
    }
  }, [dispatch, userInfo, user, history, error]);

  // fetch user details (even after update) and fetch all orders
  useEffect(() => {
    dispatch(getUserDetails(API, "profile"));
    dispatch(listMyOrders(API));
  }, [dispatch, API]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      //DISPATCH UPDATE
      dispatch(updateUserProfile(API, { id: user._id, name, email, password }));
    }
  };

  ///     GO BACK      ///
  const goBack = () => {
    history.goBack();
  };
  return (
    <>
      {/* /// add custom title in User Profile / */}
      <Meta title="User profile" />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            PROFILE
          </li>
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light mt-2 mb-4">
        Go Back
      </Button>

      {/*//////////////////////////////////////     GRID       ////////////////////////////////////// */}

      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <h2 className={classes.heading}>PROFILE</h2>
          {loading && <Loader />}
          <form className={classes.form}>
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
            <MaterialButton
              className={classes.button}
              onClick={submitHandler}
              size="large"
              variant="contained"
              color="primary"
            >
              Update
            </MaterialButton>
          </form>
        </Grid>

        <Grid item sm={8} xs={12}>
          <h2 className={classes.heading}>MY ORDERS</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message varient="danger">{errorOrders}</Message>
          ) : (
            <Paper elevation={8} className={classes.table}>
              <TableContainer className={classes.table}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">ORDER ID</StyledTableCell>
                      <StyledTableCell align="center">DATE</StyledTableCell>
                      <StyledTableCell align="center">TOTAL</StyledTableCell>
                      <StyledTableCell align="center">PAID</StyledTableCell>
                      <StyledTableCell align="center">
                        DELIVERED
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders &&
                      orders
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((order) => (
                          <StyledTableRow key={order._id}>
                            <StyledTableCell component="th" scope="row">
                              {order._id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {order.createdAt.substring(0, 10)}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {order.totalPrice}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {order.isPaid ? (
                                <div>
                                  <DoneIcon color="primary"></DoneIcon>
                                  &nbsp; &nbsp;
                                  <span>{order.paidAt.substring(0, 10)}</span>
                                </div>
                              ) : (
                                <i
                                  className="fa fa-times"
                                  style={{ color: "#f44336" }}
                                ></i>
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                              ) : (
                                <i
                                  className="fa fa-times"
                                  style={{ color: "#f44336" }}
                                ></i>
                              )}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              <Link to={`/orders/${order._id}`}>
                                <MaterialButton
                                  className={classes.details}
                                  variant="outlined"
                                  color="primary"
                                >
                                  DETAILS
                                </MaterialButton>
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {orders && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={(event, newPage) => setPage(newPage)}
                  onChangeRowsPerPage={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileScreen;
