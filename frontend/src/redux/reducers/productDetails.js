import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from "../actionTypes/productDetailsConstants";

export const productDetails = (
  state = { loading: false, product: {}, error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {}, error: null };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: null };

    case PRODUCT_DETAILS_FAILED:
      return { loading: false, product: {}, error: action.payload };
    default:
      return state;
  }
};
