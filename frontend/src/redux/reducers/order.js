import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILED,
  ORDER_PAY_RESET,
  LIST_MY_ORDER_REQUEST,
  LIST_MY_ORDER_SUCCESS,
  LIST_MY_ORDER_FAILED,
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
    error: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };

    case ORDER_DETAILS_SUCCESS:
      return {
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

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const myOrdersReducer = (
  state = { loading: false, orders: null, error: null },
  action
) => {
  switch (action.type) {
    case LIST_MY_ORDER_REQUEST:
      return { loading: true };

    case LIST_MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case LIST_MY_ORDER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
