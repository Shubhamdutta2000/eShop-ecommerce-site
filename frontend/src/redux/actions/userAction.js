import axios from "axios";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILED,
} from "../actionTypes/userConstants";

import { LIST_MY_ORDER_RESET } from "../actionTypes/orderConstants";

/////////////////////////////////////////////     ACTION      ///////////////////////////////////////////////

///////////    LOGIN    ////////////////

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

///////////    REGISTER    ////////////////

const registerReq = () => ({
  type: USER_REGISTER_REQUEST,
});

const newUser = (user) => ({
  type: USER_REGISTER_SUCCESS,
  payload: user,
});

const registerFailed = (err) => ({
  type: USER_REGISTER_FAILED,
  payload: err,
});

///////////    USER DETAILS    ////////////////

const profileReq = () => ({
  type: USER_DETAILS_REQUEST,
});

const getProfile = (user) => ({
  type: USER_DETAILS_SUCCESS,
  payload: user,
});

const profileFailed = (err) => ({
  type: USER_DETAILS_FAILED,
  payload: err,
});

///////////   UPDATE USER DETAILS    ////////////////

const updateProfileReq = () => ({
  type: USER_UPDATE_PROFILE_REQUEST,
});

const updateProfile = (user) => ({
  type: USER_UPDATE_PROFILE_SUCCESS,
  payload: user,
});

const updateProfileFailed = (err) => ({
  type: USER_UPDATE_PROFILE_FAILED,
  payload: err,
});

/////////////////////////////////////////////     ACTION CREATOR    ////////////////////////////////////////

///////////    LOGIN    ////////////////

export const loginUser = (email, password) => async (dispatch) => {
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

    ///////////////////////////////      Remove from localStorage when token expire (time of token expiration)  /////////////////////////
    setTimeout(() => {
      localStorage.removeItem("userInfo");
    }, 3600000);
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

///////////    LOGOUT    ////////////////

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({ type: LIST_MY_ORDER_RESET });
  dispatch({ type: USER_DETAILS_RESET });
};

///////////    REGISTER    ////////////////

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerReq());

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      "/user/register",
      { name, email, password },
      config
    );
    dispatch(newUser(data));
    dispatch(addUser(data));

    localStorage.setItem("userInfo", JSON.stringify(data));

    ///////////////////////////////      Remove from localStorage when token expire (time of token expiration)  /////////////////////////
    setTimeout(() => {
      localStorage.removeItem("userInfo");
    }, 3600000);
  } catch (error) {
    dispatch(
      registerFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

////////////////////    USER DETAILS (PROFILE)   ///////////////////////

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(profileReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/user/${id}`, config);

    dispatch(getProfile(data));
  } catch (error) {
    dispatch(
      profileFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

////////////////////    UPDATE USER DETAILS (PROFILE)   ///////////////////////

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(updateProfileReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/user/profile`, user, config);
    console.log(data);

    dispatch(updateProfile(data));
  } catch (error) {
    dispatch(
      updateProfileFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
