import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

///   FILE UPLOAD   ///
import { multerStorage } from "../imageUpload/multerStorage";
import { firebaseStorage } from "../imageUpload/firebaseStorage";

///    MATERIAL UI    ///
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ButtonMui from "@material-ui/core/Button";

///      MATERIAL UI ICONS     ///
import AttachMoney from "@material-ui/icons/AttachMoney";
import Description from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import BusinessIcon from "@material-ui/icons/Business";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShopIcon from "@material-ui/icons/Shop";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalMall from "@material-ui/icons/LocalMall";

///     REDUX     ///
import { useSelector, useDispatch } from "react-redux";
import {
  listProductDetails,
  updateProduct,
} from "../redux/actions/productDetailsAction";
import { PRODUCT_UPDATE_RESET } from "../redux/actionTypes/productDetailsConstants";

///  COMPONENT  ///
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

///     CUSTOM STYLE    ///
import { useStyle } from "./customStyle/allFormsScreen";

const ProductEditScreen = ({ history, match, API }) => {
  const classes = useStyle();
  const UPLOAD_TYPE = process.env.REACT_APP_UPLOAD_TYPE;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  ///  USER LOGIN REDUCER  ///
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  ///  PRODUCT DETAILS REDUCER (by id) ///
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;

  ///  UPDATE PRODUCT DETAILS REDUCER (by id) ///
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const productId = match.params.id;
  const productCategory = match.params.category;

  ///  get product details and reset update details and push to productScreen on successUpdate  ///
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      dispatch(listProductDetails(API, productCategory, productId));
    }
  }, [
    dispatch,
    API,
    userInfo,
    productId,
    productCategory,
    history,
    successUpdate,
  ]);

  useEffect(() => {
    if (product || !product.image) {
      setName(product.name);
      setCategory(product.category);
      setBrand(product.brand);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  ///   GO BACK    ///
  const goBack = () => {
    history.goBack();
  };

  ///  update product details  ///
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct(API, productCategory, {
        _id: product._id,
        name: name,
        category: category,
        brand: brand,
        price: price,
        image: image,
        countInStock: countInStock,
        description: description,
      })
    );
  };

  ///  handle upload image  ///
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    // Upload images locally
    if (UPLOAD_TYPE === "multer") {
      await multerStorage(API, file, setUploading, setImage);
    }
    // upload images in firebase storage
    else if (UPLOAD_TYPE === "firebase") {
      await firebaseStorage(file, category, setUploading, setImage);
    }
  };

  return (
    <>
      {/* /// add custom title in Admin Productedit Screen / */}
      <Meta title="eShop Admin: Product Edit" />
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/admin/productlist">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit
          </li>
        </ol>
      </nav>
      <Grid container spacing={2}>
        <Grid item md={1}>
          {/* GO BACK */}
          <Button onClick={goBack} className="btn btn-light mt-1">
            Go Back
          </Button>
        </Grid>
        <Grid item md={11}>
          <Paper elevation={14} className={classes.paperProductEdit}>
            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon />
            </Avatar>
            <Typography className={classes.heading} component="h1" variant="h5">
              Edit Product
            </Typography>
            <br />

            {/* ///    LOADER    /// */}
            {loading && <Loader />}
            {loadingUpdate && <Loader />}

            <Grid container spacing={10} direction="row" justify="space-evenly">
              <Grid item md={6} xs={12}>
                {/* Product Name */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-name">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    placeholder="Enter Name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <ShopIcon className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={56}
                  />
                </FormControl>

                {/* Product Category */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-category">
                    Category
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-category"
                    placeholder="Enter Category"
                    required
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <LocalMall className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={84}
                  />
                </FormControl>

                {/* Product Brand */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-brand">
                    Brand
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-brand"
                    placeholder="Enter Brand"
                    required
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <BusinessIcon className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={54}
                  />
                </FormControl>

                {/* Product Price */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-brand">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-price"
                    placeholder="Enter Price"
                    required
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoney className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={50}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                {/* Product image */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-brand">
                    Image
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-image"
                    placeholder="Enter Image url"
                    required
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <ImageIcon className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={60}
                  />
                  {/* UPLOAD IMAGE */}
                  <input
                    id="upload-image"
                    name="upload-image"
                    className={classes.uploadButton}
                    type="file"
                    onChange={handleUploadImage}
                  />
                  {uploading && <Loader />}
                </FormControl>

                {/* Product CountInStock */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-countInStock">
                    Count In Stock
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-countInStock"
                    placeholder="Enter Count In Stock"
                    required
                    type="text"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <ShoppingCartIcon className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={132}
                  />
                </FormControl>

                {/* Product Description */}
                <FormControl
                  variant="outlined"
                  className={classes.inputProduct}
                >
                  <InputLabel htmlFor="outlined-adornment-brand">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-description"
                    placeholder="Enter Description"
                    required
                    multiline
                    rows={4}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Description className={classes.icon} />
                      </InputAdornment>
                    }
                    labelWidth={106}
                  />
                </FormControl>
              </Grid>
              {successUpdate && <Message>updated Successfully</Message>}
              {errorUpdate && <Message>{errorUpdate}</Message>}
              <ButtonMui
                className={classes.buttonProduct}
                onClick={submitHandler}
                size="large"
                variant="contained"
                color="primary"
              >
                UPDATE
              </ButtonMui>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductEditScreen;
