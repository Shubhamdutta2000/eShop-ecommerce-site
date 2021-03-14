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
import { Grid } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

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
import { listProducts } from "../redux/actions/productListAction";
import {
  createProduct,
  deleteProduct,
} from "../redux/actions/productDetailsAction";
import { PRODUCT_CREATE_RESET } from "../redux/actionTypes/productDetailsConstants";

const UserListScreen = ({ history, API }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  ///  USER INFO REDUCER ///
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  ///  PRODUCT LIST REDUCER  ///
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  ///  PRODUCT DELETE REDUCER  ///
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  ///  PRODUCT CREATE REDUCER  ///
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts("", API));
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, API]);

  // push to edit screen on creating sample product
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (successCreate) {
      history.push(
        `/admin/product/${createdProduct.category}/${createdProduct._id}/edit`
      );
    }
  }, [dispatch, history, successCreate, createdProduct]);

  // delete product
  const handleDeleteProduct = (category, productId) => {
    if (window.confirm("Are you sure to delete this product??")) {
      dispatch(deleteProduct(API, category, productId));
    }
  };

  // create product
  const handleCreateProduct = () => {
    dispatch(createProduct(API));
  };

  ///     GO BACK      ///
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {/* /// add custom title in Admin ProductList Screen / */}
      <Meta title="eShop Admin: Product List" />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Admin
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Products
          </li>
        </ol>
      </nav>

      <Button onClick={goBack} className="btn btn-light mt-2 mb-4">
        Go Back
      </Button>

      <Grid container>
        <Grid item md={9}>
          <h1 className={classes.heading}>Products</h1>
        </Grid>
        <Grid item md={3}>
          <Button
            onClick={handleCreateProduct}
            className={classes.createProductButton}
          >
            <AddIcon /> Create Product
          </Button>
        </Grid>
      </Grid>

      {/* LOADING OR ERROR VALIDATION FOR SAMPLE PRODUCT CREATE */}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

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
                      NAME
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      PRICE
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableHead}
                      align="right"
                    >
                      CATEGORY
                    </StyledTableCell>
                    <StyledTableCell style={{ fontSize: "1rem" }} align="right">
                      BRAND
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ fontSize: "1rem" }}
                      align="right"
                    ></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products &&
                    products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => (
                        <StyledTableRow key={product._id}>
                          <StyledTableCell
                            className={classes.tableCol}
                            component="th"
                            scope="row"
                          >
                            {product._id}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {product.name}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {product.price}
                          </StyledTableCell>

                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {product.category}
                          </StyledTableCell>

                          <StyledTableCell
                            className={classes.tableCol}
                            align="right"
                          >
                            {product.brand}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {/* Edit product detail */}
                            <Link
                              to={`/admin/product/${product.category}/${product._id}/edit`}
                            >
                              <Tooltip title="Edit">
                                <IconButton aria-label="edit">
                                  <EditIcon color="inherit" />
                                </IconButton>
                              </Tooltip>
                            </Link>

                            {/* Delete product detail */}
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  handleDeleteProduct(
                                    product.category,
                                    product._id
                                  )
                                }
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
            {products && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
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
