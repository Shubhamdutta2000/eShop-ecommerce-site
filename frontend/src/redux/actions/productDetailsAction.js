import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from "../actionTypes/productDetailsConstants";

import axios from "axios";
const API = process.env.API;

//////////////////////      ACTIONS    /////////////////////////////

// product details
const reqProduct = () => ({
  type: PRODUCT_DETAILS_REQUEST,
});

const addProduct = (product) => ({
  type: PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

const productFailed = (errMess) => ({
  type: PRODUCT_DETAILS_FAILED,
  payload: errMess,
});

//  create products review
const reqProductReview = () => ({
  type: PRODUCT_CREATE_REVIEW_REQUEST,
});

const addProductReview = () => ({
  type: PRODUCT_CREATE_REVIEW_SUCCESS,
});

const productReviewFailed = (errMess) => ({
  type: PRODUCT_CREATE_REVIEW_FAILED,
  payload: errMess,
});

///////////////////////   ACTION CREATOR    ///////////////////////////

// list all product details
export const listProductDetails = (API, category, id) => async (dispatch) => {
  try {
    dispatch(reqProduct());

    const { data } = await axios.get(`${API}/products/${category}/${id}`);

    dispatch(addProduct(data));
  } catch (error) {
    dispatch(
      productFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Create product Review
export const createProductReview = (API, category, id, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(reqProductReview());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const newReview = await axios.post(
      `${API}/products/${category}/${id}/reviews`,
      review,
      config
    );

    dispatch(addProductReview());
  } catch (error) {
    dispatch(
      productReviewFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
