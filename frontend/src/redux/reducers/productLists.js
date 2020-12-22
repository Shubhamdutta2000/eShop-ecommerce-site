import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
} from "../actionTypes/productListConstants";

export const productListsReducer = (
  state = { loading: false, products: [], error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [], error: null };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: null,
      };

    case PRODUCT_LIST_FAILED:
      return { loading: false, products: [], error: action.payload };

    default:
      return state;
  }
};
