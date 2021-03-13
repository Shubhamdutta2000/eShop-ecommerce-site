import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILED,
  ORDER_PAY_RESET,
  LIST_MY_ORDER_REQUEST,
  LIST_MY_ORDER_SUCCESS,
  LIST_MY_ORDER_FAILED,
  LIST_MY_ORDER_RESET,
  LIST_ALL_ORDER_REQUEST,
  LIST_ALL_ORDER_SUCCESS,
  LIST_ALL_ORDER_FAILED,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_FAILED,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
} from "../actionTypes/orderConstants";

// create order reducer
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
    case CREATE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

// get order details by id of particular user reducer
export const orderDetailsReducer = (
  state = {
    loading: true,
    orders: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_DETAILS_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

// update order to paid reducer
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

// get my orders of particular user reducer
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

    case LIST_MY_ORDER_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

//  get all orders reducer (for admin user)
export const allOrdersReducer = (
  state = { loading: false, orders: null, error: null },
  action
) => {
  switch (action.type) {
    case LIST_ALL_ORDER_REQUEST:
      return { loading: true };

    case LIST_ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case LIST_ALL_ORDER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// update order to delivered reducer
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
