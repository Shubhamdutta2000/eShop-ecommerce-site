import axios from "axios";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../actionTypes/userConstants";

//////////////////////     ACTION      /////////////////////////

const loginReq = () => ({
  type: USER_LOGIN_REQUEST,
});

const addUser = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

const loginFailed = (err) => ({
  type: USER_LOGIN_FAILED,
  payload: err,
});

//////////////////////     ACTION CREATOR    ///////////////////

export const userLogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(loginReq());

    const config = {
      "Content-Type": "application/json",
    };

    const { data } = await axios.post(
      "/user/login",
      { email, password },
      config
    );

    dispatch(addUser(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      loginFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
