import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionTypes/userConstants";

///////////////////////////     LOGIN REDUCER    ///////////////////////////////

export const userLoginReducer = (
  state = {
    loading: false,
    isAuthenticated: false,
    userInfo: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

///////////////////////////     REGISTER REDUCER    ///////////////////////////////

export const userRegisterReducer = (
  state = {
    loading: false,
    isAuthenticated: false,
    userInfo: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, error: null };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
