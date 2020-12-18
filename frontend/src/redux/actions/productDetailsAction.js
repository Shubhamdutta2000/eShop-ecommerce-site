import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from "../actionTypes/productDetailsConstants";

import axios from "axios";

//////////////////////      ACTIONS    /////////////////////////////

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

///////////////////////   ACTION CREATOR    ///////////////////////////

export const listProductDetails = (category, id) => async (dispatch) => {
  try {
    dispatch(reqProduct());

    const { data } = await axios.get(`/products/${category}/${id}`);

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
