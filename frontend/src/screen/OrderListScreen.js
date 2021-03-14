import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

/// Component  ///
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

/// Custom Style  ///
import {
  useStyles,
  StyledTableCell,
  StyledTableRow,
} from "./customStyle/listScreen";

///  REDUX  ///
import { useDispatch, useSelector } from "react-redux";
import { listAllOrders } from "../redux/actions/orderAction";

const OrderListScreen = ({ history, API }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  ///  USER INFO REDUCER ///
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  ///  ALL ORDERS REDUCER  ///
  const allOrders = useSelector((state) => state.allOrders);
  const { loading, error, orders } = allOrders;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders(API));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, API]);

  ///     GO BACK      ///
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {/* /// add custom title in dmin OrderList Screen / */}
      <Meta title="eShop Admin: Order List" />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Admin
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            ORDERS
          </li>
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light mt-2 mb-4">
        Go Back
      </Button>

      <h1 className={classes.heading}>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Paper elevation={20}>
            <TableContainer className={classes.tableContainer}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className={classes.tableHead} align="left">
                      ID
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      AMOUNT
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      USER
                    </StyledTableCell>
                    {/* <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      ADDRESS
                    </StyledTableCell> */}
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      DATE
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      PAYMENT METHOD
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      PAID
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      DELIVERED
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    ></StyledTableCell>
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
                          <StyledTableCell
                            className={classes.tableCol}
                            component="th"
                            scope="row"
                          >
                            {order._id}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            component="th"
                            scope="row"
                          >
                            ${order.totalPrice}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {order.user && order.user.name.split(" ")[0]}
                          </StyledTableCell>
                          {/* <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.postalCode},{" "}
                            {order.shippingAddress.country}
                          </StyledTableCell> */}
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {order.createdAt.substring(0, 10)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {order.paymentMethod}
                          </StyledTableCell>

                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {order.isPaid ? (
                              <>
                                <CheckIcon className={classes.check} />
                                {order.paidAt.substring(0, 10)}
                              </>
                            ) : (
                              <CloseIcon
                                color="error"
                                className={classes.cross}
                              />
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {order.isDelivered ? (
                              <>
                                <CheckIcon className={classes.check} />
                                {order.deliveredAt.substring(0, 10)}
                              </>
                            ) : (
                              <CloseIcon
                                color="error"
                                className={classes.cross}
                              />
                            )}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {/*Order details (redirect to order screen and can marked as delivered) */}
                            <Link to={`/orders/${order._id}`}>
                              <Button color="primary">Details</Button>
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
        </>
      )}
    </>
  );
};

export default OrderListScreen;
