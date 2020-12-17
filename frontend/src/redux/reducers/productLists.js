import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
} from "../actionTypes/productConstants";

export const productList = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [], error: [] };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: [],
      };

    case PRODUCT_LIST_FAILED:
      return { loading: false, products: [], error: action.payload };

    default:
      return state;
  }
};
