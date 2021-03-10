import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILED,
  USER_DETAILS_RESET,
  USER_CHECK_TOKEN_REQUEST,
  USER_CHECK_TOKEN_SUCCESS,
  USER_CHECK_TOKEN_FAILED,
  USER_CHECK_TOKEN_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAILED,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_RESET,
} from "../actionTypes/userConstants";

///    LOGIN REDUCER    ///

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

///     REGISTER REDUCER    ///

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

///   USER PROFILE DETAILS   ///

export const userDetailsReducer = (
  state = { loading: false, user: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_DETAILS_RESET:
      return {
        user: null,
      };
    default:
      return state;
  }
};

///   UPDATE USER PROFILE DETAILS   ///

export const userUpdateProfileReducer = (
  state = { loading: false, userInfo: null, error: null, success: false },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      };

    case USER_UPDATE_PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

/// CHECK AUTH TOKEN  ///
export const userAuthToken = (state = {}, action) => {
  switch (action.type) {
    case USER_CHECK_TOKEN_REQUEST:
      return { loading: true };
    case USER_CHECK_TOKEN_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case USER_CHECK_TOKEN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_CHECK_TOKEN_RESET:
      return {};

    default:
      return state;
  }
};

///*  FOR ADMIN USER   ///

// user list reducer
export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case USER_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

// user delete reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case USER_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// user update reducer
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };

    case USER_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
