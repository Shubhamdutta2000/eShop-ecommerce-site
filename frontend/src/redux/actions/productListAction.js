import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
} from "../actionTypes/productConstants";

/////////////////////    ACTIONS    ///////////////////////////////

const reqProducts = () => ({
  type: PRODUCT_LIST_REQUEST,
});

const addProducts = (products) => ({
  type: PRODUCT_LIST_SUCCESS,
  payload: products,
});

const productsFailed = (errMess) => ({
  type: PRODUCT_LIST_FAILED,
  payload: errMess,
});

////////////////////     ACTION CREATOR     ////////////////////////

export const listProducts = () => async (dispatch) => {
  try {
    dispatch(reqProducts());
    const { data } = await axios.get("/products");

    dispatch(addProducts(data));
  } catch (error) {
    dispatch(
      productsFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
