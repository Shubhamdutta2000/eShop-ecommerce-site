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
  LIST_MY_ORDER_REQUEST,
  LIST_MY_ORDER_SUCCESS,
  LIST_MY_ORDER_FAILED,
} from "../actionTypes/orderConstants";

import axios from "axios";
//////////////////////////////    ACTIONS    ///////////////////////////////

/////////////   ORDER CREATE    ///////////////
const reqOrder = () => ({
  type: CREATE_ORDER_REQUEST,
});

const addOrder = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

const orderFailed = (error) => ({
  type: CREATE_ORDER_FAILED,
  payload: error,
});

/////////////   Order Details   ///////////////
const reqOrderDetails = () => ({
  type: ORDER_DETAILS_REQUEST,
});

const addOrderDetails = (order) => ({
  type: ORDER_DETAILS_SUCCESS,
  payload: order,
});

const orderDetailsFailed = (error) => ({
  type: ORDER_DETAILS_FAILED,
  payload: error,
});

// /////////////   PAY Order   ///////////////
const reqPayOrder = () => ({
  type: ORDER_PAY_REQUEST,
});

const addPayOrder = (order) => ({
  type: ORDER_PAY_SUCCESS,
  payload: order,
});

const payOrderFailed = (error) => ({
  type: ORDER_PAY_FAILED,
  payload: error,
});

/////////////   MY ORDERS   ///////////////
const reqMyOrders = () => ({
  type: LIST_MY_ORDER_REQUEST,
});

const addMyOrders = (order) => ({
  type: LIST_MY_ORDER_SUCCESS,
  payload: order,
});

const myOrdersFailed = (error) => ({
  type: LIST_MY_ORDER_FAILED,
  payload: error,
});

/////////////////////////////    ACTION CREATOR    ///////////////////////////

//////////////    ORDER CREATE    ///////////////
export const createOrder = (API, order) => async (dispatch, getState) => {
  try {
    dispatch(reqOrder());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${API}/orders`, order, config);

    dispatch(addOrder(data));
  } catch (error) {
    orderFailed(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

//////////////    ORDER DETAILS    ///////////////
export const getOrderDetails = (API, id) => async (dispatch, getState) => {
  try {
    dispatch(reqOrderDetails());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/orders/${id}`, config);

    dispatch(addOrderDetails(data));
  } catch (error) {
    orderDetailsFailed(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// //////////////    PAY ORDER AND UPDATE ORDER TO PAID    ///////////////
export const payOrder = (API, orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(reqPayOrder());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${API}/orders/${orderId}/payment`,
      paymentResult,
      config
    );

    dispatch(addPayOrder(data));
  } catch (error) {
    payOrderFailed(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

//////////////    LIST MY ORDERS (PARTICULAR USER)    ///////////////
export const listMyOrders = (API) => async (dispatch, getState) => {
  try {
    dispatch(reqMyOrders());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/orders/myorders`, config);

    dispatch(addMyOrders(data));
  } catch (error) {
    myOrdersFailed(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
