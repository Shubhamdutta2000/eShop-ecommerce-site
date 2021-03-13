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
  USER_CHECK_TOKEN_REQUEST,
  USER_CHECK_TOKEN_SUCCESS,
  USER_CHECK_TOKEN_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
} from "../actionTypes/userConstants";

import { LIST_MY_ORDER_RESET } from "../actionTypes/orderConstants";

///*     ACTION      ///

/// LOGIN  ///
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

///  REGISTER  ///
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

///  USER DETAILS  ///
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

///  UPDATE USER DETAILS  ///
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

///*   FOR ADMIN USER    ///

/// USER LIST  ///
const userListReq = () => ({
  type: USER_LIST_REQUEST,
});

const userListSuccess = (users) => ({
  type: USER_LIST_SUCCESS,
  payload: users,
});

const userListFailed = (err) => ({
  type: USER_LIST_FAILED,
  payload: err,
});

///  DELETE USER  ///
const userDeleteReq = () => ({
  type: USER_DELETE_REQUEST,
});

const userDeleteSuccess = () => ({
  type: USER_DELETE_SUCCESS,
});

const userDeleteFailed = (err) => ({
  type: USER_DELETE_FAILED,
  payload: err,
});

///  UPDATE USER  ///
const userUpdateReq = () => ({
  type: USER_UPDATE_REQUEST,
});

const userUpdateSuccess = (user) => ({
  type: USER_UPDATE_SUCCESS,
  payload: user,
});

const userUpdateFailed = (err) => ({
  type: USER_UPDATE_FAILED,
  payload: err,
});

///*    ACTION CREATOR    ///

///    LOGIN    ///
export const loginUser = (API, email, password) => async (dispatch) => {
  try {
    dispatch(loginReq());

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${API}/user/login`,
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

///    LOGOUT    ///
export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({ type: LIST_MY_ORDER_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
};

///    REGISTER    ///
export const registerUser = (API, name, email, password) => async (
  dispatch
) => {
  try {
    dispatch(registerReq());

    const config = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${API}/user/register`,
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

///    USER DETAILS (PROFILE)   ///
export const getUserDetails = (API, id) => async (dispatch, getState) => {
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
    const { data } = await axios.get(`${API}/user/${id}`, config);

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

///    UPDATE USER DETAILS (PROFILE)   ///
export const updateUserProfile = (API, user) => async (dispatch, getState) => {
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
    const { data } = await axios.put(`${API}/user/profile`, user, config);

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

/// USER AUTH TOKEN CHECK  ///
export const checkUserAuthToken = (API) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CHECK_TOKEN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const token = userInfo && userInfo.token;

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${API}/user/auth`, config);

    dispatch({
      type: USER_CHECK_TOKEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(
      dispatch({
        type: USER_CHECK_TOKEN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

///*   FOR ADMIN USER   ///

/// USER LIST  ///
export const listUsers = (API) => async (dispatch, getState) => {
  try {
    dispatch(userListReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const token = userInfo && userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${API}/user`, config);

    dispatch(userListSuccess(data));
  } catch (error) {
    dispatch(
      userListFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

/// USER DELETE  ///
export const deleteUser = (API, userId) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const token = userInfo && userInfo.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${API}/user/${userId}`, config);

    dispatch(userDeleteSuccess());
  } catch (error) {
    dispatch(
      userDeleteFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

/// USER UPDATE  ///
export const updateUser = (API, userId, user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const token = userInfo && userInfo.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`${API}/user/${userId}`, user, config);

    dispatch(userUpdateSuccess(data));
  } catch (error) {
    dispatch(
      userUpdateFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
