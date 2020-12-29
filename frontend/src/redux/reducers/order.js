import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from "../actionTypes/orderConstants";

export const orderReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    order: null,
  },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };

    case CREATE_ORDER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
