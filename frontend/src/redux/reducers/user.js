import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../actionTypes/userConstants";

export const userLoginReducer = (
  state = { loading: false, isAuthenticated: false, user: {}, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case USER_LOGIN_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
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
