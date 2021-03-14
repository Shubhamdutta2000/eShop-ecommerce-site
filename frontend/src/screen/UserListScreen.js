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

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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
import { deleteUser, listUsers } from "../redux/actions/userAction";

const UserListScreen = ({ history, API }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  ///  USER INFO REDUCER ///
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  ///  USER LIST REDUCER  ///
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  ///  USER DELETE REDUCER  ///
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(API));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, API]);

  // delete user
  const handleUserDelete = (userId) => {
    if (window.confirm("Are you sure to delete this user??")) {
      dispatch(deleteUser(API, userId));
    }
  };

  ///     GO BACK      ///
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {/* /// add custom title in User List Screen / */}
      <Meta title="eShop Admin: User List" />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Admin
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Users
          </li>
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light mt-2 mb-4">
        Go Back
      </Button>

      <h1 className={classes.heading}>Users</h1>
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
                      Name
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      Email
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      Admin
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontSize: "1rem" }}
                      align="right"
                    ></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <StyledTableRow key={user._id}>
                          <StyledTableCell
                            className={classes.tableCol}
                            component="th"
                            scope="row"
                          >
                            {user._id}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {user.name}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {user.email}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {user.isAdmin ? (
                              <CheckIcon className={classes.check} />
                            ) : (
                              <CloseIcon
                                color="error"
                                className={classes.cross}
                              />
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {/* Edit user detail */}
                            <Link to={`/admin/user/${user._id}/edit`}>
                              <Tooltip title="Edit">
                                <IconButton aria-label="edit">
                                  <EditIcon color="inherit" />
                                </IconButton>
                              </Tooltip>
                            </Link>

                            {/* Delete user detail */}
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleUserDelete(user._id)}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            {users && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
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

export default UserListScreen;
