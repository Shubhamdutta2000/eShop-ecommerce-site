import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
} from "../actionTypes/orderConstants";

export const createOrderReducer = (
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

export const orderDetailsReducer = (
  state = {
    order: null,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
