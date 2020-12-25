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
} from "../actionTypes/userConstants";

////////////////////////////////////////     ACTION      //////////////////////////////////////////

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

//////////////////////////////////////////     ACTION CREATOR    ///////////////////////////////////

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

    const { userInfo } = getState().userLogin;
    const config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    };
    const { data } = axios.get(`/user/${id}`, config);

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
