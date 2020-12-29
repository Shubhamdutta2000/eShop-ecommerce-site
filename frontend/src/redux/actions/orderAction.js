import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from "../actionTypes/orderConstants";

import axios from "axios";
//////////////////////////////    ACTIONS    ///////////////////////////////

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

/////////////////////////////    ACTION CREATOR    ///////////////////////////

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
