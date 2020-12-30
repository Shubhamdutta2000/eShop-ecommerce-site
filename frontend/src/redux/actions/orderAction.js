import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
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

/////////////////////////////    ACTION CREATOR    ///////////////////////////

//////////////    ORDER CREATE    ///////////////
export const createOrder = (order) => async (dispatch, getState) => {
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
    const { data } = await axios.post("/orders", order, config);

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
export const getOrderDetails = (id) => async (dispatch, getState) => {
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
    const { data } = await axios.get(`orders/${id}`, config);

    dispatch(addOrderDetails(data));
  } catch (error) {
    orderDetailsFailed(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
